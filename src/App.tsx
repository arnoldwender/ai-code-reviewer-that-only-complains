/* Main app — orchestrates all review features, personas, easter eggs, sounds, and achievements */
import { useState, useEffect, useCallback, useRef } from 'react';
import { Terminal, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CrtOverlay from './components/CrtOverlay';
import ReviewFeedback from './components/ReviewFeedback';
import IssuesList from './components/IssuesList';
import ScoreBoard from './components/ScoreBoard';
import Verdict from './components/Verdict';
import SeverityMeter from './components/SeverityMeter';
import PersonaSelector from './components/PersonaSelector';
import GlobalCounter from './components/GlobalCounter';
import LineByLineRoast from './components/LineByLineRoast';
import AchievementToast from './components/AchievementToast';
import ShareReportCard from './components/ShareReportCard';
import GitHubPRReview from './components/GitHubPRReview';
import CICDPipeline from './components/CICDPipeline';
import DevDashboard from './components/DevDashboard';
import FakeChangelog from './components/FakeChangelog';
import ProTierCLI from './components/ProTierCLI';
import { COMPLAINTS, FAKE_ISSUES } from './data/reviewData';
import { PERSONAS } from './data/personas';
import { EASTER_EGGS } from './data/easterEggs';
import { ACHIEVEMENTS } from './data/achievements';
import { glitchText, shuffle } from './utils/glitch';
import { playTypingSound, playBuzzerSound, playDramaticSound, playAchievementSound } from './utils/sounds';
import { fireComplaintConfetti } from './utils/confetti';
import { getGlobalCount, incrementGlobalCount, getSessionReviewCount } from './utils/globalCounter';
import type { FakeIssue } from './data/reviewData';
import type { Persona } from './data/personas';
import type { Achievement } from './data/achievements';

type Phase = 'idle' | 'reviewing' | 'done';

/* Active tab in the results section */
type ResultsTab = 'review' | 'pipeline' | 'dashboard';

const BASE_TITLE = 'AI CODE REVIEWER';
const UNLOCKED_KEY = 'acr-unlocked-achievements';
const PERSONAS_USED_KEY = 'acr-personas-used';

export default function App() {
  const [code, setCode] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [complaints, setComplaints] = useState<string[]>([]);
  const [issues, setIssues] = useState<FakeIssue[]>([]);
  const [finalVerdict, setFinalVerdict] = useState('');
  const [title, setTitle] = useState(BASE_TITLE);
  const [persona, setPersona] = useState<Persona>(PERSONAS[0]);
  const [globalCount, setGlobalCount] = useState(getGlobalCount());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);
  const [activeTab, setActiveTab] = useState<ResultsTab>('review');
  const [unlockedIds, setUnlockedIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(UNLOCKED_KEY) || '[]'); } catch { return []; }
  });
  const [_personasUsed, setPersonasUsed] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(PERSONAS_USED_KEY) || '[]'); } catch { return []; }
  });
  const toastQueue = useRef<Achievement[]>([]);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Glitch title effect */
  useEffect(() => {
    const iv = setInterval(() => {
      setTitle(glitchText(BASE_TITLE, 0.12));
      setTimeout(() => setTitle(BASE_TITLE), 120);
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  /* Achievement toast queue — show one at a time with 3s display */
  const showNextToast = useCallback(() => {
    if (toastQueue.current.length === 0) return;
    const next = toastQueue.current.shift()!;
    setActiveToast(next);
    if (soundEnabled) playAchievementSound();
    toastTimer.current = setTimeout(() => {
      setActiveToast(null);
      setTimeout(() => showNextToast(), 300);
    }, 3000);
  }, [soundEnabled]);

  const queueAchievement = useCallback((ach: Achievement) => {
    toastQueue.current.push(ach);
    if (!activeToast) showNextToast();
  }, [activeToast, showNextToast]);

  /* Check and unlock achievements */
  const checkAchievements = useCallback((codeContent: string) => {
    const reviewCount = getSessionReviewCount();
    const currentUnlocked = JSON.parse(localStorage.getItem(UNLOCKED_KEY) || '[]') as string[];

    const ctx = { reviewCount, codeContent, unlockedIds: currentUnlocked };
    const newUnlocks: Achievement[] = [];

    ACHIEVEMENTS.forEach((ach) => {
      if (currentUnlocked.includes(ach.id)) return;
      /* Special case: persona-switcher is checked by tracking used personas */
      if (ach.id === 'persona-switcher') {
        const used = JSON.parse(localStorage.getItem(PERSONAS_USED_KEY) || '[]') as string[];
        if (used.length >= 4) newUnlocks.push(ach);
        return;
      }
      if (ach.condition(ctx)) newUnlocks.push(ach);
    });

    if (newUnlocks.length > 0) {
      const updatedIds = [...currentUnlocked, ...newUnlocks.map((a) => a.id)];
      localStorage.setItem(UNLOCKED_KEY, JSON.stringify(updatedIds));
      setUnlockedIds(updatedIds);
      newUnlocks.forEach((a) => queueAchievement(a));
    }
  }, [queueAchievement]);

  /* Track persona usage */
  const handlePersonaChange = useCallback((p: Persona) => {
    setPersona(p);
    const current = JSON.parse(localStorage.getItem(PERSONAS_USED_KEY) || '[]') as string[];
    if (!current.includes(p.id)) {
      const updated = [...current, p.id];
      localStorage.setItem(PERSONAS_USED_KEY, JSON.stringify(updated));
      setPersonasUsed(updated);
    }
  }, []);

  /* Main review logic */
  const review = useCallback(() => {
    /* Allow empty string for easter egg */
    if (code.trim() === '' && !EASTER_EGGS.find((e) => e.id === 'empty')) return;

    setPhase('reviewing');
    setComplaints([]);
    setIssues([]);
    setActiveTab('review');

    /* Check for easter eggs first */
    const easterEgg = EASTER_EGGS.find((e) => e.detect(code));

    let targetComplaints: string[];
    let targetIssues: FakeIssue[];
    let targetVerdict: string;

    if (easterEgg) {
      targetComplaints = easterEgg.complaints;
      targetIssues = easterEgg.issues;
      targetVerdict = easterEgg.verdict;
    } else {
      /* Mix persona-specific complaints with generic ones */
      const personaComplaints = shuffle(persona.complaints).slice(0, 3);
      const genericComplaints = shuffle(COMPLAINTS).slice(0, 3);
      targetComplaints = shuffle([...personaComplaints, ...genericComplaints]).slice(0, 5);

      /* Issues with persona-specific type prefix */
      targetIssues = shuffle(FAKE_ISSUES).slice(0, 5).map((issue) => ({
        ...issue,
        type: Math.random() > 0.5 ? persona.issuePrefix : issue.type,
      }));

      const personaVerdicts = persona.verdicts;
      targetVerdict = personaVerdicts[Math.floor(Math.random() * personaVerdicts.length)];
    }

    /* Stagger complaints with typing sounds */
    let i = 0;
    const iv = setInterval(() => {
      if (i < targetComplaints.length) {
        setComplaints((prev) => [...prev, targetComplaints[i]]);
        if (soundEnabled) playTypingSound();
        i++;
      } else {
        clearInterval(iv);

        /* Show issues with buzzer sounds */
        targetIssues.forEach((_issue, idx) => {
          setTimeout(() => {
            if (soundEnabled) playBuzzerSound();
          }, idx * 120);
        });

        setIssues(targetIssues);
        setFinalVerdict(targetVerdict);
        setPhase('done');

        /* Dramatic sound for verdict */
        if (soundEnabled) {
          setTimeout(() => playDramaticSound(), 200);
        }

        /* Confetti explosion */
        setTimeout(() => fireComplaintConfetti(), 400);

        /* Increment global counter */
        const newCount = incrementGlobalCount();
        setGlobalCount(newCount);

        /* Check achievements */
        setTimeout(() => checkAchievements(code), 800);
      }
    }, 400);
  }, [code, persona, soundEnabled, checkAchievements]);

  /* Reset for new review */
  const reset = useCallback(() => {
    setPhase('idle');
    setComplaints([]);
    setIssues([]);
    setCode('');
  }, []);

  /* Total issue count for severity meter (complaints + issues) */
  const totalIssueCount = complaints.length + issues.length;

  /* Tab definitions for the results area */
  const TABS: { id: ResultsTab; label: string; icon: string }[] = [
    { id: 'review', label: 'PR REVIEW', icon: '🧐' },
    { id: 'pipeline', label: 'CI/CD', icon: '⚙️' },
    { id: 'dashboard', label: 'METRICS', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-orange font-mono overflow-hidden relative">
      <CrtOverlay />
      <AchievementToast achievement={activeToast} onDismiss={() => setActiveToast(null)} />

      <div className="max-w-[800px] mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-8 border-b border-terminal-orange/20 pb-6">
          <div className="text-[0.62rem] tracking-[6px] text-terminal-orange/30 mb-2 uppercase">
            Arnold Wender Emotional Intelligence Suite
          </div>
          <h1 className="title-glow text-[clamp(1.4rem,5vw,2.5rem)] font-light tracking-[4px] mb-1 flex items-center justify-center gap-3">
            <Terminal className="w-6 h-6 md:w-8 md:h-8 opacity-60" />
            {title}
          </h1>
          <div className="text-[0.68rem] text-terminal-orange/50 tracking-widest">
            v6.6.6 -- POWERED BY ARTIFICIAL DISAPPOINTMENT
          </div>
          <div className="mt-3 flex justify-center gap-6 text-[0.58rem] text-terminal-orange/25 flex-wrap">
            <span>GPT-GRUMPY</span>
            <span>ZERO EMPATHY</span>
            <span>100% HONEST</span>
            <span>GDPR NON-COMPLIANT</span>
          </div>
        </header>

        {/* Global counter */}
        <GlobalCounter count={globalCount} />

        {/* Sound toggle */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-2 text-[0.6rem] text-terminal-orange/30 hover:text-terminal-orange/60 transition-colors duration-200"
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="tracking-wider">{soundEnabled ? 'SOUND ON' : 'SOUND OFF'}</span>
          </button>
        </div>

        {/* Persona selector */}
        <PersonaSelector
          selectedId={persona.id}
          onChange={handlePersonaChange}
          disabled={phase === 'reviewing'}
        />

        {/* Code input */}
        <section className="mb-6">
          <label className="text-[0.62rem] tracking-[3px] text-terminal-orange/50 mb-2 block">
            PASTE YOUR CODE FOR REVIEW:
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={"// paste your code here\n// we will judge it harshly\n// and you personally"}
            className="w-full h-48 bg-terminal-dark border border-terminal-orange/20 text-terminal-orange font-mono text-xs p-3 outline-none resize-none leading-[1.8] transition-all duration-300"
            spellCheck={false}
          />

          {/* Review button with pulsing glow animation */}
          <motion.button
            onClick={review}
            disabled={phase === 'reviewing'}
            className="mt-2 w-full bg-transparent border border-terminal-orange text-terminal-orange font-mono text-sm py-3 tracking-[3px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            animate={
              phase === 'idle'
                ? {
                    boxShadow: [
                      '0 0 20px rgba(255,102,0,0.2)',
                      '0 0 40px rgba(255,102,0,0.3)',
                      '0 0 20px rgba(255,102,0,0.2)',
                    ],
                  }
                : {}
            }
            transition={
              phase === 'idle'
                ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                : {}
            }
            whileHover={phase !== 'reviewing' ? { scale: 1.01, backgroundColor: 'rgba(255,102,0,0.08)' } : {}}
            whileTap={phase !== 'reviewing' ? { scale: 0.99 } : {}}
          >
            {phase === 'reviewing'
              ? 'JUDGING YOUR LIFE CHOICES...'
              : '[ REVIEW MY CODE ]'}
          </motion.button>
        </section>

        {/* Severity meter — shows during and after review */}
        {(phase === 'reviewing' || phase === 'done') && (
          <SeverityMeter issueCount={totalIssueCount} maxIssues={10} />
        )}

        {/* Complaint feed */}
        <ReviewFeedback complaints={complaints} />

        {/* Results section — shown after review completes */}
        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Tab navigation for results views */}
              <div className="flex gap-px mb-4 border border-terminal-orange/15 bg-terminal-orange/10 overflow-hidden">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 text-[0.58rem] tracking-wider py-2.5 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-terminal-dark text-terminal-orange/80 border-b-2 border-terminal-orange/50'
                        : 'bg-terminal-dark/60 text-terminal-orange/30 hover:text-terminal-orange/50 hover:bg-terminal-dark/80'
                    }`}
                  >
                    <span className="mr-1.5">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content — PR Review tab */}
              {activeTab === 'review' && (
                <motion.div
                  key="review-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* GitHub PR Review simulation */}
                  <GitHubPRReview
                    code={code}
                    complaints={complaints}
                    isActive={phase === 'done'}
                  />

                  {/* Line-by-line roast of the pasted code */}
                  <LineByLineRoast code={code} isActive={phase === 'done'} />

                  <IssuesList issues={issues} />
                  <ScoreBoard />
                  <Verdict text={finalVerdict} />
                </motion.div>
              )}

              {/* Tab content — CI/CD Pipeline tab */}
              {activeTab === 'pipeline' && (
                <motion.div
                  key="pipeline-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <CICDPipeline isActive={activeTab === 'pipeline'} />
                  <Verdict text={finalVerdict} />
                </motion.div>
              )}

              {/* Tab content — Dashboard / Metrics tab */}
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <DevDashboard
                    isActive={activeTab === 'dashboard'}
                    currentReviewCount={getSessionReviewCount()}
                  />
                  <ScoreBoard />
                </motion.div>
              )}

              {/* Pro Tier & CLI Mode — always visible below tabs */}
              <ProTierCLI
                complaints={complaints}
                issues={issues}
                verdict={finalVerdict}
                isActive={phase === 'done'}
              />

              {/* Share report card */}
              <ShareReportCard
                issueCount={issues.length}
                complaintCount={complaints.length}
                personaName={persona.name}
                verdict={finalVerdict}
              />

              {/* Fake Changelog */}
              <FakeChangelog />

              {/* Unlocked achievements display */}
              {unlockedIds.length > 0 && (
                <div className="mb-6">
                  <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
                    ACHIEVEMENTS ({unlockedIds.length}/{ACHIEVEMENTS.length}):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ACHIEVEMENTS.map((ach) => {
                      const unlocked = unlockedIds.includes(ach.id);
                      return (
                        <div
                          key={ach.id}
                          className={`px-3 py-2 border text-[0.6rem] ${
                            unlocked
                              ? 'border-terminal-orange/30 bg-terminal-orange/[0.06] text-terminal-orange/70'
                              : 'border-terminal-orange/8 bg-transparent text-terminal-orange/15'
                          }`}
                          title={unlocked ? `${ach.name}: ${ach.description}` : 'Locked'}
                        >
                          <span className="mr-1.5">{unlocked ? ach.icon : '?'}</span>
                          <span className="tracking-wider">{unlocked ? ach.name : '???'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Reset button */}
              <button
                onClick={reset}
                className="w-full bg-transparent border border-terminal-orange/20 text-terminal-orange/40 font-mono text-[0.65rem] py-2.5 tracking-widest transition-all duration-200 hover:border-terminal-orange/40 hover:text-terminal-orange/60 hover:bg-terminal-orange/[0.04]"
              >
                SUBMIT MORE CODE FOR PUNISHMENT
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="border-t border-terminal-orange/10 pt-6 mt-8 text-center text-[0.56rem] text-terminal-orange/20 tracking-widest leading-[2.4]">
          <div>AI CODE REVIEWER IS NOT RESPONSIBLE FOR CAREER CHANGES, EXISTENTIAL CRISES, OR DELETED REPOS</div>
          <div>BUILT BY ARNOLD WENDER -- 18 YEARS OF CLEAN CODE. THIS IS NOT THAT.</div>
          <div className="text-terminal-red/15 mt-1">HTTP 418 -- YOUR CODE IS ALSO A TEAPOT</div>
        </footer>
      </div>
    </div>
  );
}

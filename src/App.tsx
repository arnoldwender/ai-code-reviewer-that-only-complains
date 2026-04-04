import { useState, useEffect, useCallback } from 'react';
import { Terminal } from 'lucide-react';
import CrtOverlay from './components/CrtOverlay';
import ReviewFeedback from './components/ReviewFeedback';
import IssuesList from './components/IssuesList';
import ScoreBoard from './components/ScoreBoard';
import Verdict from './components/Verdict';
import { COMPLAINTS, FAKE_ISSUES } from './data/reviewData';
import type { FakeIssue } from './data/reviewData';
import { glitchText, shuffle } from './utils/glitch';

type Phase = 'idle' | 'reviewing' | 'done';

const BASE_TITLE = 'AI CODE REVIEWER';

export default function App() {
  const [code, setCode] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [complaints, setComplaints] = useState<string[]>([]);
  const [issues, setIssues] = useState<FakeIssue[]>([]);
  const [finalVerdict, setFinalVerdict] = useState('');
  const [title, setTitle] = useState(BASE_TITLE);

  useEffect(() => {
    const iv = setInterval(() => {
      setTitle(glitchText(BASE_TITLE, 0.12));
      setTimeout(() => setTitle(BASE_TITLE), 120);
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  const review = useCallback(() => {
    if (!code.trim()) return;
    setPhase('reviewing');
    setComplaints([]);
    setIssues([]);

    const shuffledComplaints = shuffle(COMPLAINTS).slice(0, 5);
    const shuffledIssues = shuffle(FAKE_ISSUES).slice(0, 5);

    let i = 0;
    const iv = setInterval(() => {
      if (i < shuffledComplaints.length) {
        setComplaints((prev) => [...prev, shuffledComplaints[i]]);
        i++;
      } else {
        clearInterval(iv);
        setIssues(shuffledIssues);
        setFinalVerdict(
          shuffledComplaints[Math.floor(Math.random() * shuffledComplaints.length)]
        );
        setPhase('done');
      }
    }, 400);
  }, [code]);

  const reset = useCallback(() => {
    setPhase('idle');
    setComplaints([]);
    setIssues([]);
    setCode('');
  }, []);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-orange font-mono overflow-hidden relative">
      <CrtOverlay />

      <div className="max-w-[800px] mx-auto px-6 py-8 relative z-10">
        <header className="text-center mb-8 border-b border-terminal-orange/20 pb-6">
          <div className="text-[0.62rem] tracking-[6px] text-terminal-orange/30 mb-2 uppercase">
            Wender Media Emotional Intelligence Suite
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
          <button
            onClick={review}
            disabled={phase === 'reviewing'}
            className="mt-2 w-full bg-transparent border border-terminal-orange text-terminal-orange font-mono text-sm py-3 tracking-[3px] transition-all duration-200 hover:bg-terminal-orange/[0.08] hover:shadow-[0_0_30px_rgba(255,102,0,0.15)] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              boxShadow: phase !== 'reviewing' ? '0 0 20px rgba(255,102,0,0.2)' : 'none',
            }}
          >
            {phase === 'reviewing'
              ? 'JUDGING YOUR LIFE CHOICES...'
              : '[ REVIEW MY CODE ]'}
          </button>
        </section>

        <ReviewFeedback complaints={complaints} />

        {phase === 'done' && (
          <div className="results-section">
            <IssuesList issues={issues} />
            <ScoreBoard />
            <Verdict text={finalVerdict} />

            <button
              onClick={reset}
              className="w-full bg-transparent border border-terminal-orange/20 text-terminal-orange/40 font-mono text-[0.65rem] py-2.5 tracking-widest transition-all duration-200 hover:border-terminal-orange/40 hover:text-terminal-orange/60 hover:bg-terminal-orange/[0.04]"
            >
              SUBMIT MORE CODE FOR PUNISHMENT
            </button>
          </div>
        )}

        <footer className="border-t border-terminal-orange/10 pt-6 mt-8 text-center text-[0.56rem] text-terminal-orange/20 tracking-widest leading-[2.4]">
          <div>AI CODE REVIEWER IS NOT RESPONSIBLE FOR CAREER CHANGES, EXISTENTIAL CRISES, OR DELETED REPOS</div>
          <div>BUILT BY WENDER MEDIA -- 18 YEARS OF CLEAN CODE. THIS IS NOT THAT.</div>
          <div className="text-terminal-red/15 mt-1">HTTP 418 -- YOUR CODE IS ALSO A TEAPOT</div>
        </footer>
      </div>
    </div>
  );
}

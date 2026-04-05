/* CI/CD Pipeline Mockup — fake GitHub Actions workflow with dramatic failure logs */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CICDPipelineProps {
  isActive: boolean;
}

/* Pipeline steps with their statuses */
interface PipelineStep {
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration: string;
  icon: string;
}

/* Dramatic failure log messages */
const FAILURE_LOGS = [
  'ERROR: Code quality check failed with exit code 1',
  '  > Running AI Code Review v6.6.6...',
  '  > Scanning 1 file(s) for signs of intelligence...',
  '  > Intelligence not found.',
  '  > Checking variable names against dictionary of sadness...',
  '  > 47 matches found.',
  '  > Evaluating error handling strategy...',
  '  > Strategy: "hope for the best"',
  '  > Calculating technical debt...',
  '  > Result: OVERFLOW (exceeds 64-bit integer)',
  '  > Consulting AI reviewer...',
  '  > AI reviewer has left the chat.',
  '',
  'FATAL: Review score below deployment threshold (required: 1/10, got: -3/10)',
  'FATAL: Negative scores should not be possible. Your code broke the scoring system.',
  '',
  'Process exited with code 418 (I\'m a teapot)',
];

/* Badge markdown for copy */
const BADGE_MARKDOWN = '![Code Quality](https://img.shields.io/badge/code_quality-concerning-red)';

export default function CICDPipeline({ isActive }: CICDPipelineProps) {
  const [steps, setSteps] = useState<PipelineStep[]>([
    { name: 'Checkout code', status: 'pending', duration: '0s', icon: '📥' },
    { name: 'Install dependencies', status: 'pending', duration: '0s', icon: '📦' },
    { name: 'Run AI Code Review', status: 'pending', duration: '0s', icon: '🤖' },
    { name: 'Deploy to production', status: 'pending', duration: '0s', icon: '🚀' },
  ]);
  const [showLogs, setShowLogs] = useState(false);
  const [visibleLogLines, setVisibleLogLines] = useState<number>(0);
  const [badgeCopied, setBadgeCopied] = useState(false);

  /* Animate pipeline steps running through */
  useEffect(() => {
    if (!isActive) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    /* Step 1: Checkout — starts running immediately */
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s, i) => i === 0 ? { ...s, status: 'running' } : s));
    }, 200));

    /* Step 1: Checkout — completes */
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s, i) => i === 0 ? { ...s, status: 'success', duration: '2s' } : s));
    }, 800));

    /* Step 2: Install — starts */
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s, i) => i === 1 ? { ...s, status: 'running' } : s));
    }, 900));

    /* Step 2: Install — completes */
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s, i) => i === 1 ? { ...s, status: 'success', duration: '14s' } : s));
    }, 1800));

    /* Step 3: AI Review — starts */
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s, i) => i === 2 ? { ...s, status: 'running' } : s));
    }, 1900));

    /* Step 3: AI Review — fails */
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s, i) =>
        i === 2 ? { ...s, status: 'failed', duration: '6m 66s' }
          : i === 3 ? { ...s, status: 'skipped', duration: '—' }
          : s
      ));
      setShowLogs(true);
    }, 3200));

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  /* Stagger failure log lines */
  useEffect(() => {
    if (!showLogs) return;

    let line = 0;
    const iv = setInterval(() => {
      if (line < FAILURE_LOGS.length) {
        setVisibleLogLines(line + 1);
        line++;
      } else {
        clearInterval(iv);
      }
    }, 120);

    return () => clearInterval(iv);
  }, [showLogs]);

  const handleCopyBadge = async () => {
    try {
      await navigator.clipboard.writeText(BADGE_MARKDOWN);
      setBadgeCopied(true);
      setTimeout(() => setBadgeCopied(false), 2000);
    } catch {
      /* Fallback for clipboard API failure */
      setBadgeCopied(true);
      setTimeout(() => setBadgeCopied(false), 2000);
    }
  };

  if (!isActive) return null;

  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        CI/CD PIPELINE:
      </div>

      <div className="border border-terminal-orange/20 bg-terminal-dark overflow-hidden">
        {/* Workflow header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-terminal-orange/10 bg-terminal-orange/[0.03]">
          <svg className="w-4 h-4 text-terminal-orange/40" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM3 3.5a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.5zm3.75-.75a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z" />
          </svg>
          <div className="flex-1">
            <div className="text-[0.68rem] text-terminal-orange/70">AI Code Review / review</div>
            <div className="text-[0.52rem] text-terminal-orange/30">
              Triggered by push to <span className="text-terminal-orange/50">feat/questionable-decisions</span>
            </div>
          </div>
          {/* Status badge */}
          <span className={`text-[0.52rem] tracking-wider px-2 py-1 border ${
            steps[2].status === 'failed'
              ? 'border-terminal-red/40 text-terminal-red/80 bg-terminal-red/[0.08]'
              : 'border-terminal-orange/20 text-terminal-orange/40 bg-terminal-orange/[0.04]'
          }`}>
            {steps[2].status === 'failed' ? 'FAILED' : 'RUNNING'}
          </span>
        </div>

        {/* Pipeline steps */}
        <div className="px-4 py-3 space-y-2">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: step.status === 'pending' ? 0.4 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 text-[0.65rem]"
            >
              {/* Status indicator */}
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {step.status === 'pending' && (
                  <span className="w-3 h-3 border border-terminal-orange/20 rounded-full" />
                )}
                {step.status === 'running' && (
                  <motion.span
                    className="w-3 h-3 border-2 border-terminal-orange/60 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                {step.status === 'success' && (
                  <span className="text-[#44ff44]/70 text-xs">&#10003;</span>
                )}
                {step.status === 'failed' && (
                  <span className="text-terminal-red/80 text-xs font-bold">&#10007;</span>
                )}
                {step.status === 'skipped' && (
                  <span className="text-terminal-orange/25 text-xs">&#10140;</span>
                )}
              </span>

              {/* Step name */}
              <span className={`flex-1 ${
                step.status === 'failed' ? 'text-terminal-red/70' :
                step.status === 'skipped' ? 'text-terminal-orange/25 line-through' :
                step.status === 'success' ? 'text-terminal-orange/60' :
                'text-terminal-orange/40'
              }`}>
                {step.icon} {step.name}
              </span>

              {/* Duration */}
              <span className="text-[0.55rem] text-terminal-orange/25 tabular-nums">
                {step.status !== 'pending' ? step.duration : ''}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Failure log output */}
        <AnimatePresence>
          {showLogs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="border-t border-terminal-orange/10 px-4 py-2 bg-terminal-orange/[0.02]">
                <div className="text-[0.55rem] text-terminal-orange/40 tracking-wider mb-2">
                  FAILURE LOG:
                </div>
                <div className="font-mono text-[0.58rem] leading-[1.9] max-h-[300px] overflow-y-auto">
                  {FAILURE_LOGS.slice(0, visibleLogLines).map((line, idx) => (
                    <div
                      key={idx}
                      className={`${
                        line.startsWith('ERROR') || line.startsWith('FATAL')
                          ? 'text-terminal-red/70 font-bold'
                          : line.startsWith('  >')
                          ? 'text-terminal-orange/40'
                          : 'text-terminal-orange/25'
                      }`}
                    >
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge copy section */}
              <div className="border-t border-terminal-orange/10 px-4 py-3">
                <div className="text-[0.55rem] text-terminal-orange/30 tracking-wider mb-2">
                  ADD THIS BADGE TO YOUR README:
                </div>
                <div className="flex items-center gap-3">
                  {/* Visual badge preview */}
                  <div className="flex items-center h-5 text-[0.5rem] overflow-hidden border border-terminal-orange/10">
                    <span className="bg-terminal-orange/10 text-terminal-orange/50 px-1.5 h-full flex items-center">code quality</span>
                    <span className="bg-terminal-red/20 text-terminal-red/70 px-1.5 h-full flex items-center">concerning</span>
                  </div>
                  <button
                    onClick={handleCopyBadge}
                    className="text-[0.55rem] tracking-wider text-terminal-orange/40 border border-terminal-orange/15 px-2.5 py-1 hover:border-terminal-orange/30 hover:text-terminal-orange/60 transition-all duration-200"
                  >
                    {badgeCopied ? 'COPIED' : 'COPY MARKDOWN'}
                  </button>
                </div>
                <div className="text-[0.5rem] text-terminal-orange/20 mt-2 break-all">
                  {BADGE_MARKDOWN}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* GitHub PR Review Simulation — pixel-perfect GitHub-style PR review UI with devastating content */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GitHubPRReviewProps {
  code: string;
  complaints: string[];
  isActive: boolean;
}

/* Suggested "fixes" that replace real code with absurdity */
const SUGGESTED_CHANGES: { pattern: RegExp; suggestion: string; explanation: string }[] = [
  { pattern: /function\s+\w+/, suggestion: "throw new Error('I give up');", explanation: 'Honesty is the best policy.' },
  { pattern: /const\s+\w+/, suggestion: "const resignation = true;", explanation: 'Suggested simplification.' },
  { pattern: /return/, suggestion: "return undefined; // like your career trajectory", explanation: 'This return value was already meaningless.' },
  { pattern: /if\s*\(/, suggestion: "if (false) { // skip this entire mess", explanation: 'The safest code is code that never runs.' },
  { pattern: /console\.log/, suggestion: "console.error('HELP');", explanation: 'More appropriate severity level.' },
  { pattern: /class\s+/, suggestion: "// This class has been removed for the public good", explanation: 'Preventive maintenance.' },
  { pattern: /import/, suggestion: "// import regret from 'life-choices';", explanation: 'Added missing dependency.' },
  { pattern: /async/, suggestion: "// async? In THIS codebase? Optimistic.", explanation: 'Removed unrealistic expectations.' },
];

/* Threaded review comments that mimic GitHub's conversation style */
const THREAD_COMMENTS = [
  { body: 'This entire function could be replaced by a `return null`. Same outcome, better readability.', resolved: false },
  { body: 'I see you copied this from Stack Overflow. The answer had 3 downvotes.', resolved: false },
  { body: "Marking as 'needs work'. And by 'work' I mean a complete rewrite. In a different language.", resolved: false },
  { body: "I've stared at this for 10 minutes and I still don't understand what you were going for.", resolved: false },
  { body: 'This violates at least 4 SOLID principles. Impressive, given there are only 5.', resolved: false },
  { body: "NAK. Not because it's wrong (it is), but because reviewing it hurt my feelings.", resolved: false },
  { body: "Did you run this before submitting? Did you even LOOK at it before submitting?", resolved: false },
  { body: "I'm going to need a drink before I continue this review.", resolved: false },
];

/* Re-request review responses */
const RE_REQUEST_RESPONSES = [
  "I've seen enough.",
  "No.",
  "Please don't make me look at this again.",
  "I'm going to pretend I didn't see that notification.",
  "My therapist said I should set boundaries. This is one.",
  "Declined. My eyes haven't recovered from the first review.",
  "Error 403: Review access permanently revoked.",
  "I'd rather review a COBOL codebase from 1972.",
];

export default function GitHubPRReview({ code, complaints, isActive }: GitHubPRReviewProps) {
  const [visibleComments, setVisibleComments] = useState<number[]>([]);
  const [reRequestMsg, setReRequestMsg] = useState<string | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const lines = code.split('\n').slice(0, 20);

  /* Find a suggested change that matches the code */
  const matchedSuggestion = SUGGESTED_CHANGES.find((s) => {
    return lines.some((line) => s.pattern.test(line));
  });

  /* Pick random thread comments based on complaint count */
  const [selectedThreads] = useState(() => {
    const shuffled = [...THREAD_COMMENTS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(3, complaints.length));
  });

  /* Stagger comment appearances */
  useEffect(() => {
    if (!isActive) return;
    setVisibleComments([]);
    setReRequestMsg(null);

    let i = 0;
    const iv = setInterval(() => {
      if (i < selectedThreads.length) {
        setVisibleComments((prev) => [...prev, i]);
        i++;
      } else {
        clearInterval(iv);
        /* Show suggestion block after comments */
        setTimeout(() => setShowSuggestion(true), 400);
      }
    }, 500);

    return () => clearInterval(iv);
  }, [isActive, selectedThreads.length]);

  const handleReRequest = () => {
    const msg = RE_REQUEST_RESPONSES[Math.floor(Math.random() * RE_REQUEST_RESPONSES.length)];
    setReRequestMsg(msg);
  };

  if (!isActive) return null;

  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        PULL REQUEST REVIEW:
      </div>

      {/* PR header bar — mimics GitHub's PR review header */}
      <div className="border border-terminal-orange/20 bg-terminal-dark overflow-hidden">

        {/* PR title bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-terminal-orange/10 bg-terminal-orange/[0.03]">
          {/* Merge icon */}
          <svg className="w-4 h-4 text-terminal-red/70 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          </svg>
          <div className="flex-1 min-w-0">
            <span className="text-[0.72rem] text-terminal-orange/80 truncate block">
              feat: questionable-decisions
            </span>
            <span className="text-[0.55rem] text-terminal-orange/30">
              wants to merge 1 commit into <span className="text-terminal-orange/50 bg-terminal-orange/[0.08] px-1 py-0.5 rounded-sm">main</span> from <span className="text-terminal-orange/50 bg-terminal-orange/[0.08] px-1 py-0.5 rounded-sm">feat/questionable-decisions</span>
            </span>
          </div>
          {/* Changes requested badge */}
          <span className="flex-shrink-0 text-[0.55rem] tracking-wider px-2.5 py-1 border border-terminal-red/40 text-terminal-red/80 bg-terminal-red/[0.08]">
            CHANGES REQUESTED
          </span>
        </div>

        {/* Reviewer info */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-terminal-orange/10">
          <span className="text-lg" role="img" aria-label="Reviewer avatar">🧐</span>
          <span className="text-[0.65rem] text-terminal-orange/60">
            <span className="text-terminal-orange/80 font-bold">ai-code-reviewer</span>
            {' '}requested changes <span className="text-terminal-orange/30">just now</span>
          </span>
        </div>

        {/* Diff view — shows code with GitHub-style +/- lines */}
        <div className="border-b border-terminal-orange/10">
          <div className="flex items-center gap-2 px-4 py-2 bg-terminal-orange/[0.02]">
            <span className="text-[0.55rem] text-terminal-orange/40 tracking-wider">FILE CHANGED</span>
            <span className="text-[0.55rem] text-terminal-orange/25 bg-terminal-orange/[0.06] px-1.5 py-0.5 rounded-sm">1</span>
          </div>
          <div className="overflow-x-auto">
            {lines.slice(0, 8).map((line, idx) => (
              <div
                key={idx}
                className={`flex text-[0.62rem] leading-[1.8] px-4 ${
                  idx % 3 === 0
                    ? 'bg-[#1a0000]/40 text-[#ff4444]/70'
                    : idx % 3 === 1
                    ? 'bg-[#001a00]/30 text-[#44ff44]/60'
                    : 'text-terminal-orange/50'
                }`}
              >
                <span className="text-terminal-orange/15 w-8 text-right mr-2 select-none flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-terminal-orange/20 w-4 select-none flex-shrink-0">
                  {idx % 3 === 0 ? '-' : idx % 3 === 1 ? '+' : ' '}
                </span>
                <span className="whitespace-pre">{line || ' '}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Threaded review comments */}
        <div className="px-4 py-3 space-y-3">
          <AnimatePresence>
            {selectedThreads.map((thread, idx) => (
              visibleComments.includes(idx) && (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-terminal-orange/10 bg-terminal-orange/[0.02]"
                >
                  {/* Comment header */}
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-terminal-orange/8 bg-terminal-orange/[0.03]">
                    <span className="text-sm">🧐</span>
                    <span className="text-[0.58rem] text-terminal-orange/60">
                      <span className="font-bold text-terminal-orange/80">ai-code-reviewer</span>
                      {' '}commented on line {Math.floor(Math.random() * 20) + 1}
                    </span>
                  </div>
                  {/* Comment body */}
                  <div className="px-3 py-2.5 text-[0.65rem] text-terminal-orange/60 leading-relaxed">
                    {thread.body}
                  </div>
                  {/* Reaction bar */}
                  <div className="px-3 py-1.5 border-t border-terminal-orange/8 flex gap-3 text-[0.52rem] text-terminal-orange/25">
                    <span className="cursor-pointer hover:text-terminal-orange/50">:-1: {Math.floor(Math.random() * 40) + 5}</span>
                    <span className="cursor-pointer hover:text-terminal-orange/50">:confused: {Math.floor(Math.random() * 15) + 2}</span>
                    <span className="cursor-pointer hover:text-terminal-orange/50">:eyes: {Math.floor(Math.random() * 25) + 3}</span>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Suggested change block */}
        <AnimatePresence>
          {showSuggestion && matchedSuggestion && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mx-4 mb-3 border border-terminal-orange/15 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-terminal-orange/[0.04] border-b border-terminal-orange/10">
                <svg className="w-3.5 h-3.5 text-terminal-orange/40" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M14.064 0a8.75 8.75 0 00-6.187 2.563l-.459.458c-.314.314-.616.641-.904.979H3.31a1.75 1.75 0 00-1.49.833L.11 7.607a.75.75 0 00.418 1.11l3.102.954c.037.051.079.1.124.145l2.429 2.428c.046.046.094.088.145.125l.954 3.102a.75.75 0 001.11.418l2.774-1.707a1.75 1.75 0 00.833-1.49V9.485c.338-.288.665-.59.979-.904l.458-.459A8.75 8.75 0 0016 1.936V1.75A1.75 1.75 0 0014.25 0h-.186z" />
                </svg>
                <span className="text-[0.58rem] text-terminal-orange/50 tracking-wider">SUGGESTED CHANGE</span>
              </div>
              <div className="bg-[#1a0000]/30 px-3 py-2 text-[0.6rem] leading-[1.8]">
                <div className="text-[#ff4444]/50">
                  <span className="text-[#ff4444]/30 mr-2">-</span>
                  <span className="line-through">{lines[0] || 'your code'}</span>
                </div>
                <div className="text-[#44ff44]/60">
                  <span className="text-[#44ff44]/40 mr-2">+</span>
                  {matchedSuggestion.suggestion}
                </div>
              </div>
              <div className="px-3 py-2 text-[0.55rem] text-terminal-orange/40 italic border-t border-terminal-orange/8">
                {matchedSuggestion.explanation}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Re-request review button */}
        <div className="px-4 py-3 border-t border-terminal-orange/10">
          {!reRequestMsg ? (
            <button
              onClick={handleReRequest}
              className="text-[0.6rem] tracking-wider text-terminal-orange/40 border border-terminal-orange/15 px-3 py-1.5 hover:border-terminal-orange/30 hover:text-terminal-orange/60 hover:bg-terminal-orange/[0.03] transition-all duration-200"
            >
              RE-REQUEST REVIEW
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[0.65rem] text-terminal-red/60 italic"
            >
              🧐 ai-code-reviewer: &ldquo;{reRequestMsg}&rdquo;
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

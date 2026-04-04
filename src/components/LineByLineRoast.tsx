/* Line-by-line roast — shows the pasted code with inline complaint annotations */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LineByLineRoastProps {
  code: string;
  isActive: boolean;
}

/* Pool of inline roast comments mapped to code patterns */
const INLINE_ROASTS: { pattern: RegExp; comments: string[] }[] = [
  { pattern: /var\s/, comments: ['var? In THIS economy?', "It's 2026. Use const. Please."] },
  { pattern: /console\.log/, comments: ['Ah yes, printf debugging. The pinnacle of engineering.', 'console.log-driven development detected'] },
  { pattern: /TODO/, comments: ['This TODO has been here since the Mesozoic era.', 'TODO: delete this TODO'] },
  { pattern: /any/, comments: ['TypeScript: strict mode. You: any mode.', "'any' — the white flag of type safety"] },
  { pattern: /eval\(/, comments: ['eval()? Are you building malware or just chaotic?'] },
  { pattern: /==\s/, comments: ['Loose equality? You live dangerously.', '=== exists for a reason'] },
  { pattern: /\!\!/, comments: ['Double bang. The "trust me bro" of type coercion.'] },
  { pattern: /function/, comments: ['A function! How retro.', 'Arrow functions exist, grandpa.'] },
  { pattern: /class\s/, comments: ['A class? What is this, Java?'] },
  { pattern: /\.then\(/, comments: ['Callback chain detected. Welcome to 2016.', 'async/await sends its regards'] },
  { pattern: /setTimeout/, comments: ['setTimeout: the "I\'ll deal with it later" of programming'] },
  { pattern: /innerHTML/, comments: ['innerHTML?! Do you WANT XSS attacks?'] },
  { pattern: /!important/, comments: ['!important — the CSS equivalent of screaming'] },
  { pattern: /catch\s*\(\s*\)/, comments: ['Empty catch block. Problems? What problems?'] },
  { pattern: /\/\/\s*$/, comments: ['An empty comment. Truly poetic.'] },
];

/* Generic roasts for lines that don't match any pattern */
const GENERIC_ROASTS = [
  'I have questions about this line.',
  'Who hurt you when you wrote this?',
  'This line radiates chaos energy.',
  "I'm choosing not to understand this.",
  'Bold. Terrible, but bold.',
  'This is technically valid syntax. Morally, though...',
  'My eye twitched reading this.',
];

function getRoastForLine(line: string): string | null {
  for (const { pattern, comments } of INLINE_ROASTS) {
    if (pattern.test(line)) {
      return comments[Math.floor(Math.random() * comments.length)];
    }
  }
  /* ~40% chance of a generic roast on non-empty lines */
  if (line.trim().length > 2 && Math.random() < 0.4) {
    return GENERIC_ROASTS[Math.floor(Math.random() * GENERIC_ROASTS.length)];
  }
  return null;
}

export default function LineByLineRoast({ code, isActive }: LineByLineRoastProps) {
  const [visibleAnnotations, setVisibleAnnotations] = useState<number[]>([]);
  const lines = code.split('\n').slice(0, 30); /* Cap at 30 lines for display */

  /* Pre-compute which lines get roasted */
  const [annotations] = useState<Map<number, string>>(() => {
    const map = new Map<number, string>();
    lines.forEach((line, idx) => {
      const roast = getRoastForLine(line);
      if (roast) map.set(idx, roast);
    });
    return map;
  });

  /* Stagger annotation appearances */
  useEffect(() => {
    if (!isActive) return;
    setVisibleAnnotations([]);

    const annotatedLines = Array.from(annotations.keys());
    let i = 0;
    const iv = setInterval(() => {
      if (i < annotatedLines.length) {
        setVisibleAnnotations((prev) => [...prev, annotatedLines[i]]);
        i++;
      } else {
        clearInterval(iv);
      }
    }, 350);

    return () => clearInterval(iv);
  }, [isActive, annotations]);

  if (!isActive || lines.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        LINE-BY-LINE ANALYSIS:
      </div>
      <div className="border border-terminal-orange/15 bg-terminal-dark p-3 overflow-x-auto max-h-[400px] overflow-y-auto">
        {lines.map((line, idx) => {
          const hasAnnotation = annotations.has(idx);
          const showAnnotation = visibleAnnotations.includes(idx);

          return (
            <div key={idx} className="relative group">
              {/* Code line */}
              <div className="flex text-[0.65rem] leading-[1.9]">
                <span className="text-terminal-orange/20 w-8 text-right mr-3 select-none flex-shrink-0">
                  {idx + 1}
                </span>
                <span
                  className={`whitespace-pre ${
                    hasAnnotation && showAnnotation
                      ? 'text-terminal-red/80 underline decoration-wavy decoration-terminal-red/40 underline-offset-4'
                      : 'text-terminal-orange/60'
                  }`}
                >
                  {line || ' '}
                </span>
              </div>

              {/* Inline roast annotation */}
              <AnimatePresence>
                {hasAnnotation && showAnnotation && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex text-[0.58rem] leading-[1.6] ml-11 mb-1"
                  >
                    <span className="text-terminal-red/60 mr-2">//</span>
                    <span className="text-terminal-red/50 italic">
                      {annotations.get(idx)}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

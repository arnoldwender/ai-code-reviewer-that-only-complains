/* Pro Tier & CLI Mode — greyed-out pro features and terminal-style output toggle */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProTierCLIProps {
  complaints: string[];
  issues: { type: string; msg: string }[];
  verdict: string;
  isActive: boolean;
}

/* Greyed-out "Pro" features that users can't access */
const PRO_FEATURES = [
  {
    name: 'Enterprise Disappointment Suite',
    description: 'Multi-team code shaming with custom branding',
    price: '$999/mo',
    icon: '🏢',
  },
  {
    name: 'Slack Integration',
    description: 'Shares your code quality score in #general automatically',
    price: '$49/mo',
    icon: '💬',
  },
  {
    name: 'Jira Auto-Filing',
    description: 'Creates tickets titled "Please stop" after every review',
    price: '$29/mo',
    icon: '🎫',
  },
  {
    name: 'Git Blame Analytics',
    description: 'Tracks which developer causes the most reviewer suffering',
    price: '$79/mo',
    icon: '📊',
  },
  {
    name: 'Conference Mode',
    description: 'Projects your worst code on the big screen during standups',
    price: '$199/mo',
    icon: '📽️',
  },
  {
    name: 'AI Therapy Bot',
    description: 'Post-review emotional support (accuracy: questionable)',
    price: '$14.99/mo',
    icon: '🧠',
  },
];

/* Generate CLI-style output from review data */
function generateCLIOutput(
  complaints: string[],
  issues: { type: string; msg: string }[],
  verdict: string
): string[] {
  const lines: string[] = [
    '$ npx ai-code-review@latest --strict --no-mercy',
    '',
    '\x1b[33m  ╔══════════════════════════════════════════╗\x1b[0m',
    '\x1b[33m  ║  AI CODE REVIEWER v6.6.6                ║\x1b[0m',
    '\x1b[33m  ║  Powered by Artificial Disappointment    ║\x1b[0m',
    '\x1b[33m  ╚══════════════════════════════════════════╝\x1b[0m',
    '',
    'Scanning files... done.',
    'Running analysis... done.',
    'Generating complaints... done.',
    '',
    '──────────────────────────────────────────────',
    '  COMPLAINTS',
    '──────────────────────────────────────────────',
    '',
  ];

  complaints.forEach((c, i) => {
    lines.push(`  ${i + 1}. ${c}`);
  });

  lines.push('');
  lines.push('──────────────────────────────────────────────');
  lines.push('  ISSUES');
  lines.push('──────────────────────────────────────────────');
  lines.push('');

  issues.forEach((issue) => {
    lines.push(`  [${issue.type}] ${issue.msg}`);
  });

  lines.push('');
  lines.push('──────────────────────────────────────────────');
  lines.push('  VERDICT');
  lines.push('──────────────────────────────────────────────');
  lines.push('');
  lines.push(`  ${verdict}`);
  lines.push('');
  lines.push('Exit code: 418 (I\'m a teapot)');
  lines.push('');
  lines.push('$ _');

  return lines;
}

export default function ProTierCLI({ complaints, issues, verdict, isActive }: ProTierCLIProps) {
  const [cliMode, setCliMode] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  if (!isActive) return null;

  const cliOutput = generateCLIOutput(complaints, issues, verdict);

  return (
    <div className="mb-6 space-y-6">
      {/* CLI Mode Toggle */}
      <div>
        <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
          OUTPUT MODE:
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCliMode(false)}
            className={`text-[0.6rem] tracking-wider px-3 py-1.5 border transition-all duration-200 ${
              !cliMode
                ? 'border-terminal-orange/40 text-terminal-orange/70 bg-terminal-orange/[0.08]'
                : 'border-terminal-orange/15 text-terminal-orange/30 hover:border-terminal-orange/25'
            }`}
          >
            WEB UI
          </button>
          <button
            onClick={() => setCliMode(true)}
            className={`text-[0.6rem] tracking-wider px-3 py-1.5 border transition-all duration-200 ${
              cliMode
                ? 'border-terminal-orange/40 text-terminal-orange/70 bg-terminal-orange/[0.08]'
                : 'border-terminal-orange/15 text-terminal-orange/30 hover:border-terminal-orange/25'
            }`}
          >
            CLI MODE
          </button>
        </div>
      </div>

      {/* CLI Terminal Output */}
      <AnimatePresence>
        {cliMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border border-terminal-orange/20 bg-black overflow-hidden">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-3 py-2 bg-terminal-orange/[0.04] border-b border-terminal-orange/10">
                <span className="w-2.5 h-2.5 rounded-full bg-terminal-red/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-terminal-orange/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#44ff44]/30" />
                <span className="flex-1 text-center text-[0.5rem] text-terminal-orange/30 tracking-wider">
                  bash -- ai-code-review
                </span>
              </div>
              {/* Terminal body */}
              <div className="p-4 max-h-[400px] overflow-y-auto font-mono text-[0.6rem] leading-[1.8]">
                {cliOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={`whitespace-pre-wrap ${
                      line.startsWith('$')
                        ? 'text-[#44ff44]/60'
                        : line.startsWith('  [')
                        ? 'text-terminal-red/60'
                        : line.includes('════') || line.includes('────') || line.includes('║')
                        ? 'text-terminal-orange/40'
                        : line.startsWith('Exit code')
                        ? 'text-terminal-red/70 font-bold'
                        : 'text-terminal-orange/50'
                    }`}
                  >
                    {/* Strip ANSI codes for display — keep color via CSS */}
                    {line.replace(/\x1b\[\d+m/g, '') || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pro Tier Features — greyed out */}
      <div>
        <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
          PRO FEATURES:
          <span className="ml-2 text-[0.48rem] tracking-wider px-1.5 py-0.5 border border-terminal-orange/15 text-terminal-orange/25 bg-terminal-orange/[0.03]">
            LOCKED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRO_FEATURES.map((feature) => (
            <motion.div
              key={feature.name}
              className="relative border border-terminal-orange/8 bg-terminal-orange/[0.01] p-3 cursor-not-allowed overflow-hidden"
              onMouseEnter={() => setHoveredFeature(feature.name)}
              onMouseLeave={() => setHoveredFeature(null)}
              whileHover={{ borderColor: 'rgba(255,102,0,0.15)' }}
            >
              {/* Locked overlay */}
              <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <span className="text-[0.55rem] text-terminal-orange/40 tracking-wider border border-terminal-orange/20 px-2 py-1 bg-black/80">
                  UPGRADE TO PRO
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-base opacity-30">{feature.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.62rem] text-terminal-orange/30 font-bold tracking-wider truncate">
                    {feature.name}
                  </div>
                  <div className="text-[0.52rem] text-terminal-orange/15 mt-0.5 leading-relaxed">
                    {feature.description}
                  </div>
                </div>
                <span className="text-[0.5rem] text-terminal-orange/15 flex-shrink-0">
                  {feature.price}
                </span>
              </div>

              {/* Tooltip on hover */}
              <AnimatePresence>
                {hoveredFeature === feature.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 px-2 py-1 bg-terminal-dark border border-terminal-orange/20 text-[0.5rem] text-terminal-orange/40 whitespace-nowrap"
                  >
                    Just kidding. There is no Pro tier.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Fake pricing CTA */}
        <div className="mt-3 text-center">
          <button
            className="text-[0.55rem] tracking-wider text-terminal-orange/20 border border-terminal-orange/8 px-4 py-2 cursor-not-allowed"
            disabled
          >
            UPGRADE NOW — $0.00/mo (STILL TOO EXPENSIVE FOR THIS CODE)
          </button>
        </div>
      </div>
    </div>
  );
}

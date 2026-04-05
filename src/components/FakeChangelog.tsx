/* Fake Changelog — "What's New in v6.6.6" with absurd release notes */
import { motion } from 'framer-motion';

const CHANGELOG_ENTRIES = [
  {
    version: '6.6.6',
    date: '2026-04-04',
    tag: 'LATEST',
    changes: [
      { type: 'feat', text: 'Now detects when you copied from Stack Overflow (accuracy: 99.7%)' },
      { type: 'feat', text: 'Added support for reviewing code written by AI reviewing code' },
      { type: 'remove', text: "Removed the 'positive feedback' module (it was never used)" },
      { type: 'fix', text: 'Fixed bug where reviewer occasionally showed mercy' },
      { type: 'perf', text: 'Optimized insult generation pipeline — 3x faster disappointment' },
    ],
  },
  {
    version: '6.6.5',
    date: '2026-03-15',
    tag: null,
    changes: [
      { type: 'feat', text: 'Added CI/CD pipeline integration — blocks deployments with extreme prejudice' },
      { type: 'feat', text: 'Slack integration now shares your code quality score in #general' },
      { type: 'fix', text: 'Fixed false positive where code was accidentally rated "acceptable"' },
      { type: 'security', text: 'Patched vulnerability that allowed self-esteem to persist' },
    ],
  },
  {
    version: '6.6.4',
    date: '2026-02-28',
    tag: null,
    changes: [
      { type: 'feat', text: 'Enterprise Disappointment Suite now supports multi-region sadness' },
      { type: 'remove', text: 'Deprecated the encouragement API (endpoint returned 404 since launch)' },
      { type: 'fix', text: 'Reviewer no longer crashes when code is actually good (edge case, never triggered)' },
      { type: 'docs', text: 'Updated README to include a disclaimer about emotional damage' },
    ],
  },
];

/* Map change types to display labels and colors */
const TYPE_MAP: Record<string, { label: string; color: string }> = {
  feat: { label: 'NEW', color: 'text-[#44ff44]/60 border-[#44ff44]/20 bg-[#44ff44]/[0.06]' },
  fix: { label: 'FIX', color: 'text-terminal-orange/60 border-terminal-orange/20 bg-terminal-orange/[0.06]' },
  remove: { label: 'REMOVED', color: 'text-terminal-red/60 border-terminal-red/20 bg-terminal-red/[0.06]' },
  perf: { label: 'PERF', color: 'text-[#aa88ff]/60 border-[#aa88ff]/20 bg-[#aa88ff]/[0.06]' },
  security: { label: 'SECURITY', color: 'text-[#ff8800]/60 border-[#ff8800]/20 bg-[#ff8800]/[0.06]' },
  docs: { label: 'DOCS', color: 'text-[#4488ff]/60 border-[#4488ff]/20 bg-[#4488ff]/[0.06]' },
};

export default function FakeChangelog() {
  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        CHANGELOG:
      </div>

      <div className="border border-terminal-orange/20 bg-terminal-dark overflow-hidden">
        {CHANGELOG_ENTRIES.map((entry, entryIdx) => (
          <motion.div
            key={entry.version}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: entryIdx * 0.15 }}
            className={entryIdx > 0 ? 'border-t border-terminal-orange/10' : ''}
          >
            {/* Version header */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-terminal-orange/[0.02]">
              <span className="text-[0.72rem] text-terminal-orange/70 font-bold tracking-wider">
                v{entry.version}
              </span>
              <span className="text-[0.52rem] text-terminal-orange/25">
                {entry.date}
              </span>
              {entry.tag && (
                <span className="text-[0.48rem] tracking-wider px-1.5 py-0.5 border border-[#44ff44]/20 text-[#44ff44]/50 bg-[#44ff44]/[0.06]">
                  {entry.tag}
                </span>
              )}
            </div>

            {/* Change list */}
            <div className="px-4 py-2.5 space-y-1.5">
              {entry.changes.map((change, changeIdx) => {
                const typeInfo = TYPE_MAP[change.type] || TYPE_MAP.feat;
                return (
                  <motion.div
                    key={changeIdx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: entryIdx * 0.15 + changeIdx * 0.06 }}
                    className="flex items-start gap-2 text-[0.62rem]"
                  >
                    <span className={`text-[0.48rem] tracking-wider px-1.5 py-0.5 border flex-shrink-0 mt-0.5 ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                    <span className="text-terminal-orange/55 leading-relaxed">
                      {change.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Footer note */}
        <div className="px-4 py-2.5 border-t border-terminal-orange/10 text-[0.5rem] text-terminal-orange/20 italic">
          Full changelog available at /dev/null
        </div>
      </div>
    </div>
  );
}

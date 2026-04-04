/* Severity meter — thermometer gauge that rises as issues accumulate */
import { motion } from 'framer-motion';

interface SeverityMeterProps {
  issueCount: number;
  maxIssues: number;
}

const SEVERITY_LEVELS = [
  { threshold: 0.0, label: 'Mildly Concerned', color: '#ff9900' },
  { threshold: 0.2, label: 'Disappointed', color: '#ff7700' },
  { threshold: 0.4, label: 'Actively Judging', color: '#ff5500' },
  { threshold: 0.6, label: 'Rage Quit', color: '#ff3300' },
  { threshold: 0.8, label: 'Career Change Recommended', color: '#ff0000' },
  { threshold: 1.0, label: 'CALL 911', color: '#cc0000' },
];

function getSeverityLevel(ratio: number) {
  /* Find the highest threshold we've passed */
  let current = SEVERITY_LEVELS[0];
  for (const level of SEVERITY_LEVELS) {
    if (ratio >= level.threshold) current = level;
  }
  return current;
}

export default function SeverityMeter({ issueCount, maxIssues }: SeverityMeterProps) {
  const ratio = Math.min(issueCount / Math.max(maxIssues, 1), 1);
  const level = getSeverityLevel(ratio);
  const percentage = Math.round(ratio * 100);

  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        SEVERITY METER:
      </div>

      <div className="relative border border-terminal-orange/20 bg-terminal-dark p-3">
        {/* Thermometer bar */}
        <div className="relative h-6 bg-terminal-orange/[0.06] border border-terminal-orange/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ backgroundColor: level.color }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Tick marks */}
          {[20, 40, 60, 80].map((tick) => (
            <div
              key={tick}
              className="absolute top-0 bottom-0 w-px bg-terminal-orange/15"
              style={{ left: `${tick}%` }}
            />
          ))}
        </div>

        {/* Label row */}
        <div className="flex justify-between items-center mt-2">
          <motion.span
            className="text-[0.7rem] font-bold tracking-wider"
            style={{ color: level.color }}
            key={level.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {level.label.toUpperCase()}
          </motion.span>
          <span className="text-[0.6rem] text-terminal-orange/40">
            {issueCount} issue{issueCount !== 1 ? 's' : ''} detected
          </span>
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mt-1 text-[0.5rem] text-terminal-orange/20">
          <span>Concerned</span>
          <span>Disappointed</span>
          <span>Rage Quit</span>
          <span>Career Change</span>
          <span>911</span>
        </div>
      </div>
    </div>
  );
}

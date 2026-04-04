/* Score board — staggered row animation with framer-motion */
import { motion } from 'framer-motion';
import { SCORES } from '../data/reviewData';

export default function ScoreBoard() {
  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        SCORES:
      </div>
      {SCORES.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: i * 0.08 }}
          className="flex items-center gap-3 mb-2 text-[0.68rem]"
        >
          <span className="text-terminal-orange/55 min-w-[140px]">{s.label}</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= s.score
                    ? 'text-terminal-orange drop-shadow-[0_0_4px_rgba(255,102,0,0.5)]'
                    : 'text-terminal-orange/15'
                }
              >
                *
              </span>
            ))}
          </div>
          <span className="text-terminal-orange/35 text-[0.6rem]">{s.comment}</span>
        </motion.div>
      ))}
    </div>
  );
}

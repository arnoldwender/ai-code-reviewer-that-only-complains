/* Complaint feed — staggered fade-in with framer-motion */
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewFeedbackProps {
  complaints: string[];
}

export default function ReviewFeedback({ complaints }: ReviewFeedbackProps) {
  if (complaints.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        AI FEEDBACK:
      </div>
      <AnimatePresence>
        {complaints.map((c, i) => (
          <motion.div
            key={`complaint-${i}`}
            initial={{ opacity: 0, y: 10, x: -8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="px-4 py-3 border border-terminal-orange/10 bg-terminal-orange/[0.04] mb-2 text-xs text-terminal-orange leading-relaxed"
          >
            <span className="mr-2 opacity-60">{">"}</span>
            {c}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

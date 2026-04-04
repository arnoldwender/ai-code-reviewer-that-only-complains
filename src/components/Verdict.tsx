/* Final verdict — flicker-in + shake animation via framer-motion */
import { motion } from 'framer-motion';

interface VerdictProps {
  text: string;
}

export default function Verdict({ text }: VerdictProps) {
  return (
    <motion.div
      className="border border-terminal-red/30 bg-terminal-red/[0.04] p-5 mb-6"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{
        opacity: [0, 0.8, 0.2, 1, 0.7, 1],
        scale: [0.97, 1, 1.01, 0.99, 1],
        x: [0, -3, 4, -2, 3, 0],
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="text-[0.6rem] tracking-[4px] text-terminal-red/50 mb-2">
        FINAL VERDICT
      </div>
      <div className="text-[0.82rem] text-terminal-orange leading-relaxed">
        <span className="mr-2 text-terminal-red">!!</span>
        {text}
      </div>
    </motion.div>
  );
}

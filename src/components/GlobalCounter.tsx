/* Global complaint counter display — shows "worldwide" complaint count */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GlobalCounterProps {
  count: number;
}

export default function GlobalCounter({ count }: GlobalCounterProps) {
  const [displayCount, setDisplayCount] = useState(count);
  const prevCount = useRef(count);

  /* Animate counter rolling up to new value */
  useEffect(() => {
    if (count === prevCount.current) {
      setDisplayCount(count);
      return;
    }

    const start = prevCount.current;
    const diff = count - start;
    const duration = 600;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(start + diff * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
    prevCount.current = count;
  }, [count]);

  const formatted = displayCount.toLocaleString('en-US');

  return (
    <motion.div
      className="text-center py-3 px-4 border border-terminal-orange/10 bg-terminal-orange/[0.02] mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-[0.54rem] tracking-[4px] text-terminal-orange/30 mb-1">
        COMPLAINTS GENERATED WORLDWIDE
      </div>
      <div className="text-lg tracking-[3px] text-terminal-orange font-light tabular-nums">
        {formatted}
      </div>
    </motion.div>
  );
}

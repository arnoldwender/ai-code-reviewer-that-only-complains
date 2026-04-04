/* Achievement unlock toast notification — slides in from the right */
import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '../data/achievements';

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export default function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="fixed top-6 right-6 z-[10000] max-w-xs"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={onDismiss}
        >
          <div className="border border-terminal-orange/40 bg-terminal-dark p-4 cursor-pointer shadow-[0_0_40px_rgba(255,102,0,0.15)]">
            <div className="text-[0.54rem] tracking-[4px] text-terminal-orange/40 mb-2">
              ACHIEVEMENT UNLOCKED
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <div className="text-sm text-terminal-orange font-bold tracking-wider">
                  {achievement.name}
                </div>
                <div className="text-[0.62rem] text-terminal-orange/50 mt-0.5">
                  {achievement.description}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

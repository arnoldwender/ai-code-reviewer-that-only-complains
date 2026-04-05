/* Developer Performance Dashboard — Grafana/Datadog-style metrics with declining trends */
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getSessionReviewCount } from '../utils/globalCounter';

interface DevDashboardProps {
  isActive: boolean;
  currentReviewCount: number;
}

/* Generate a declining line chart as SVG points */
function generateDecliningChart(width: number, height: number, points: number): string {
  const step = width / (points - 1);
  const coords: string[] = [];

  for (let i = 0; i < points; i++) {
    /* Starts high, trends down with noise */
    const baseY = (i / points) * height * 0.7;
    const noise = (Math.random() - 0.3) * height * 0.15;
    const y = Math.max(4, Math.min(height - 4, baseY + noise + height * 0.1));
    coords.push(`${i * step},${y}`);
  }

  return coords.join(' ');
}

/* Generate a patience gauge that depletes over reviews */
function getPatience(reviewCount: number): number {
  /* Starts at ~85%, drops ~12% per review, floor at 2% */
  return Math.max(2, Math.round(85 - reviewCount * 12 + Math.random() * 5));
}

/* Estimate career change timeline */
function getCareerChangeEstimate(reviewCount: number): string {
  if (reviewCount >= 8) return 'Overdue';
  if (reviewCount >= 5) return 'Imminent';
  if (reviewCount >= 3) return `${Math.max(1, 5 - reviewCount)} reviews`;
  return `${Math.max(1, 8 - reviewCount)} reviews`;
}

/* Fake uptime metric that degrades */
function getUptimeStr(reviewCount: number): string {
  const base = 99.99 - reviewCount * 3.7;
  return Math.max(0.01, base).toFixed(2) + '%';
}

export default function DevDashboard({ isActive, currentReviewCount }: DevDashboardProps) {
  const [chartPoints, setChartPoints] = useState('');
  const [patience, setPatience] = useState(85);
  const [animatedPatience, setAnimatedPatience] = useState(85);
  const reviewCount = getSessionReviewCount() || currentReviewCount;

  /* Generate chart data on mount */
  useEffect(() => {
    if (!isActive) return;
    setChartPoints(generateDecliningChart(280, 60, 12));
    setPatience(getPatience(reviewCount));
  }, [isActive, reviewCount]);

  /* Animate patience counter down */
  const animatePatience = useCallback(() => {
    const start = 85;
    const end = patience;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedPatience(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [patience]);

  useEffect(() => {
    if (isActive) animatePatience();
  }, [isActive, animatePatience]);

  if (!isActive) return null;

  const careerEstimate = getCareerChangeEstimate(reviewCount);
  const uptime = getUptimeStr(reviewCount);

  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        DEVELOPER PERFORMANCE DASHBOARD:
      </div>

      <div className="border border-terminal-orange/20 bg-terminal-dark overflow-hidden">
        {/* Dashboard header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-terminal-orange/10 bg-terminal-orange/[0.03]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-terminal-red/60 rounded-full animate-pulse" />
            <span className="text-[0.58rem] text-terminal-orange/50 tracking-wider">LIVE METRICS</span>
          </div>
          <span className="text-[0.5rem] text-terminal-orange/25">
            Session #{reviewCount} | Last updated: just now
          </span>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-px bg-terminal-orange/10">
          {/* Code Quality Trend */}
          <div className="bg-terminal-dark p-3">
            <div className="text-[0.5rem] text-terminal-orange/30 tracking-wider mb-1">
              AVG CODE QUALITY
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-terminal-red/70 text-sm font-bold">declining</span>
              <span className="text-[0.5rem] text-terminal-red/40">&#9660; -47%</span>
            </div>
            {/* SVG line chart */}
            <svg viewBox="0 0 280 60" className="w-full h-12 mt-2" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="15" x2="280" y2="15" stroke="rgba(255,102,0,0.06)" strokeWidth="0.5" />
              <line x1="0" y1="30" x2="280" y2="30" stroke="rgba(255,102,0,0.06)" strokeWidth="0.5" />
              <line x1="0" y1="45" x2="280" y2="45" stroke="rgba(255,102,0,0.06)" strokeWidth="0.5" />
              {/* Trend line */}
              {chartPoints && (
                <motion.polyline
                  points={chartPoints}
                  fill="none"
                  stroke="#ff3300"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              )}
              {/* Danger zone fill */}
              {chartPoints && (
                <motion.polygon
                  points={`0,0 ${chartPoints} 280,60 0,60`}
                  fill="url(#dangerGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              )}
              <defs>
                <linearGradient id="dangerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff3300" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ff3300" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Reviewer Patience */}
          <div className="bg-terminal-dark p-3">
            <div className="text-[0.5rem] text-terminal-orange/30 tracking-wider mb-1">
              REVIEWER PATIENCE
            </div>
            <div className="flex items-baseline gap-2">
              <motion.span
                className={`text-lg font-bold ${
                  animatedPatience < 20 ? 'text-terminal-red/80' : 'text-terminal-orange/70'
                }`}
              >
                {animatedPatience}%
              </motion.span>
              <span className="text-[0.5rem] text-terminal-red/40">critical</span>
            </div>
            {/* Patience bar */}
            <div className="mt-2 h-3 bg-terminal-orange/[0.06] border border-terminal-orange/10 overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  background: animatedPatience < 20
                    ? 'linear-gradient(90deg, #cc0000, #ff0000)'
                    : animatedPatience < 50
                    ? 'linear-gradient(90deg, #ff3300, #ff5500)'
                    : 'linear-gradient(90deg, #ff6600, #ff9900)',
                }}
                initial={{ width: '85%' }}
                animate={{ width: `${patience}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[0.45rem] text-terminal-orange/20">
              <span>Empty</span>
              <span>Full</span>
            </div>
          </div>

          {/* Submissions counter */}
          <div className="bg-terminal-dark p-3">
            <div className="text-[0.5rem] text-terminal-orange/30 tracking-wider mb-1">
              SUBMISSIONS THIS SESSION
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-terminal-orange/70">{reviewCount}</span>
              <span className="text-[0.5rem] text-terminal-orange/30">
                {reviewCount === 1 ? 'attempt' : 'attempts'}
              </span>
            </div>
            {/* Submission dots visualization */}
            <div className="flex gap-1 mt-2 flex-wrap">
              {Array.from({ length: Math.min(reviewCount, 20) }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-2.5 h-2.5 border border-terminal-red/30 bg-terminal-red/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                />
              ))}
              {reviewCount === 0 && (
                <span className="text-[0.5rem] text-terminal-orange/20 italic">No data yet</span>
              )}
            </div>
          </div>

          {/* Career change countdown */}
          <div className="bg-terminal-dark p-3">
            <div className="text-[0.5rem] text-terminal-orange/30 tracking-wider mb-1">
              EST. TIME TO CAREER CHANGE
            </div>
            <div className="flex items-baseline gap-2">
              <motion.span
                className={`text-lg font-bold ${
                  careerEstimate === 'Overdue' || careerEstimate === 'Imminent'
                    ? 'text-terminal-red/80'
                    : 'text-terminal-orange/70'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {careerEstimate}
              </motion.span>
            </div>
            {/* Mini warning indicators */}
            <div className="flex gap-2 mt-2 text-[0.48rem]">
              <span className={`px-1.5 py-0.5 border ${
                reviewCount >= 3
                  ? 'border-terminal-red/30 text-terminal-red/50 bg-terminal-red/[0.06]'
                  : 'border-terminal-orange/10 text-terminal-orange/20'
              }`}>
                BURNOUT RISK
              </span>
              <span className={`px-1.5 py-0.5 border ${
                reviewCount >= 5
                  ? 'border-terminal-red/30 text-terminal-red/50 bg-terminal-red/[0.06]'
                  : 'border-terminal-orange/10 text-terminal-orange/20'
              }`}>
                MORALE LOW
              </span>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-terminal-orange/10 bg-terminal-orange/[0.02]">
          <div className="flex items-center gap-4 text-[0.48rem] text-terminal-orange/25">
            <span>Uptime: {uptime}</span>
            <span>Region: your-basement-1</span>
            <span>Plan: Free Tier (Suffering)</span>
          </div>
          <span className="text-[0.45rem] text-terminal-orange/15">Refreshes every rejection</span>
        </div>
      </div>
    </div>
  );
}

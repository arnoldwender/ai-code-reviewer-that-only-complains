import { SCORES } from '../data/reviewData';

export default function ScoreBoard() {
  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        SCORES:
      </div>
      {SCORES.map((s, i) => (
        <div
          key={i}
          className="score-row flex items-center gap-3 mb-2 text-[0.68rem]"
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
        </div>
      ))}
    </div>
  );
}

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
      {complaints.map((c, i) => (
        <div
          key={i}
          className="complaint-item px-4 py-3 border border-terminal-orange/10 bg-terminal-orange/[0.04] mb-2 text-xs text-terminal-orange leading-relaxed"
        >
          <span className="mr-2 opacity-60">{">"}</span>
          {c}
        </div>
      ))}
    </div>
  );
}

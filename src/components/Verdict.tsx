interface VerdictProps {
  text: string;
}

export default function Verdict({ text }: VerdictProps) {
  return (
    <div className="verdict-box border border-terminal-red/30 bg-terminal-red/[0.04] p-5 mb-6">
      <div className="text-[0.6rem] tracking-[4px] text-terminal-red/50 mb-2">
        FINAL VERDICT
      </div>
      <div className="text-[0.82rem] text-terminal-orange leading-relaxed">
        <span className="mr-2 text-terminal-red">!!</span>
        {text}
      </div>
    </div>
  );
}

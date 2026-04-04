/* Share Report Card — renders a "code report card" as PNG using html2canvas */
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface ShareReportCardProps {
  issueCount: number;
  complaintCount: number;
  personaName: string;
  verdict: string;
}

/* Always gives terrible grades — weighted random from F- to D */
function getLetterGrade(issueCount: number): string {
  const grades = ['F-', 'F-', 'F-', 'F', 'F', 'F+', 'D-', 'D-', 'D'];
  /* More issues = worse grade (lower index) */
  const idx = Math.max(0, Math.min(grades.length - 1, grades.length - 1 - Math.floor(issueCount / 3)));
  return grades[idx];
}

export default function ShareReportCard({ issueCount, complaintCount, personaName, verdict }: ShareReportCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const grade = getLetterGrade(issueCount);

  const handleShare = async () => {
    if (!cardRef.current || isGenerating) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#000000',
        scale: 2,
      });

      /* Download as PNG */
      const link = document.createElement('a');
      link.download = 'code-report-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate report card:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mb-6">
      {/* The rendered card (always visible so user can preview it) */}
      <div
        ref={cardRef}
        className="border border-terminal-orange/20 bg-black p-6"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {/* Card header */}
        <div className="text-center mb-4">
          <div
            className="text-[0.5rem] tracking-[6px] mb-1"
            style={{ color: 'rgba(255,102,0,0.3)' }}
          >
            OFFICIAL CODE REPORT CARD
          </div>
          <div
            className="text-lg tracking-[3px] font-light"
            style={{ color: '#ff6600' }}
          >
            AI CODE REVIEWER
          </div>
          <div
            className="text-[0.5rem] tracking-[3px] mt-1"
            style={{ color: 'rgba(255,102,0,0.4)' }}
          >
            Powered by Artificial Disappointment
          </div>
        </div>

        {/* Grade circle */}
        <div className="flex justify-center mb-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              border: '2px solid #ff0000',
              backgroundColor: 'rgba(255,0,0,0.08)',
            }}
          >
            <span className="text-3xl font-bold" style={{ color: '#ff0000' }}>
              {grade}
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            className="text-center p-2"
            style={{ border: '1px solid rgba(255,102,0,0.15)' }}
          >
            <div className="text-xl" style={{ color: '#ff6600' }}>
              {complaintCount}
            </div>
            <div
              className="text-[0.5rem] tracking-wider"
              style={{ color: 'rgba(255,102,0,0.4)' }}
            >
              COMPLAINTS
            </div>
          </div>
          <div
            className="text-center p-2"
            style={{ border: '1px solid rgba(255,102,0,0.15)' }}
          >
            <div className="text-xl" style={{ color: '#ff3300' }}>
              {issueCount}
            </div>
            <div
              className="text-[0.5rem] tracking-wider"
              style={{ color: 'rgba(255,102,0,0.4)' }}
            >
              ISSUES
            </div>
          </div>
        </div>

        {/* Reviewer persona */}
        <div
          className="text-[0.55rem] text-center mb-3"
          style={{ color: 'rgba(255,102,0,0.5)' }}
        >
          Reviewed by: {personaName}
        </div>

        {/* Verdict quote */}
        <div
          className="text-[0.6rem] text-center italic p-3"
          style={{
            color: 'rgba(255,102,0,0.6)',
            borderTop: '1px solid rgba(255,102,0,0.1)',
          }}
        >
          &ldquo;{verdict.length > 120 ? verdict.slice(0, 117) + '...' : verdict}&rdquo;
        </div>

        {/* Footer */}
        <div
          className="text-[0.45rem] text-center mt-3 tracking-[2px]"
          style={{ color: 'rgba(255,102,0,0.2)' }}
        >
          ai-code-reviewer.wfrb.dev -- WENDER MEDIA
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleShare}
        disabled={isGenerating}
        className="mt-3 w-full bg-transparent border border-terminal-orange/30 text-terminal-orange/60 font-mono text-[0.65rem] py-2.5 tracking-[2px] transition-all duration-200 hover:border-terminal-orange/50 hover:text-terminal-orange/80 hover:bg-terminal-orange/[0.04] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'GENERATING...' : 'DOWNLOAD REPORT CARD AS PNG'}
      </button>
    </div>
  );
}

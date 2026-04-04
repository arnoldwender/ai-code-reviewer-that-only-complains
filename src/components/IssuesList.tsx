/* Issues list — staggered entrance with framer-motion */
import { motion } from 'framer-motion';
import type { FakeIssue } from '../data/reviewData';

interface IssuesListProps {
  issues: FakeIssue[];
}

export default function IssuesList({ issues }: IssuesListProps) {
  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[4px] text-terminal-orange/50 mb-3">
        ISSUES DETECTED:
      </div>
      {issues.map((issue, i) => (
        <motion.div
          key={`issue-${i}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className="grid grid-cols-[auto_1fr] gap-3 px-3 py-2 border border-terminal-orange/10 mb-1.5 text-[0.68rem]"
        >
          <span className="text-terminal-red text-[0.58rem] tracking-wider whitespace-nowrap font-bold">
            [{issue.type}]
          </span>
          <span className="text-terminal-orange/60">{issue.msg}</span>
        </motion.div>
      ))}
    </div>
  );
}

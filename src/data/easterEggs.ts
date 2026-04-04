/* Easter egg detection and special responses */

export interface EasterEgg {
  id: string;
  detect: (code: string) => boolean;
  complaints: string[];
  issues: { type: string; msg: string }[];
  verdict: string;
}

/* Hello World special — generates 23+ "issues" from 2 lines */
const HELLO_WORLD_ISSUES = [
  { type: 'EXISTENTIAL', msg: 'Line 1: "Hello" implies a greeting. Who are you greeting? The void?' },
  { type: 'NAMING', msg: 'Line 1: "World" is too vague. Which world? Be specific.' },
  { type: 'SCOPE', msg: 'Line 1: "World" is a global variable. Classic.' },
  { type: 'SECURITY', msg: 'Line 1: Printing to console exposes your existence to attackers.' },
  { type: 'CULTURAL', msg: 'Line 1: Not internationalized. What about "Hola Mundo"?' },
  { type: 'GRAMMAR', msg: 'Line 1: Missing Oxford comma between Hello and World.' },
  { type: 'EMOTIONAL', msg: 'Line 1: This greeting lacks sincerity.' },
  { type: 'LEGAL', msg: 'Line 1: "Hello World" may be trademarked. Consult legal.' },
  { type: 'HISTORIC', msg: 'Line 1: Kernighan & Ritchie did it better in 1978.' },
  { type: 'PERF', msg: 'Line 1: String concatenation detected. Use template literals.' },
  { type: 'A11Y', msg: 'Line 1: Not screen-reader friendly. Add ARIA labels to your console.' },
  { type: 'DRY', msg: 'Line 1: You said "Hello" once. What if you need to say it again?' },
  { type: 'SOLID', msg: 'Line 1: Single Responsibility violated. Greeting AND specifying a target?' },
  { type: 'TESTING', msg: 'Line 1: No unit test for "Hello World". How do you know it says hello?' },
  { type: 'COVERAGE', msg: 'Line 2: No line 2? 50% of your code is missing.' },
  { type: 'TYPES', msg: 'Line 1: "Hello" is an untyped string. In THIS economy?' },
  { type: 'REGEX', msg: 'Line 1: "Hello" matches /hell/. Concerning.' },
  { type: 'SEMANTIC', msg: 'Line 1: console.log is not a semantic greeting method.' },
  { type: 'DEPLOY', msg: 'Line 1: This should never reach production. Or any environment.' },
  { type: 'REVIEW', msg: 'Line 1: Reject. Rethink. Repent.' },
  { type: 'MEMORY', msg: 'Line 1: "Hello World" allocates 11 bytes. You monster.' },
  { type: 'STYLE', msg: 'Line 1: Inconsistent capitalization. "World" but not "WORLD"?' },
  { type: 'ETHICAL', msg: 'Line 1: Promising to greet the entire world. Classic over-engineering.' },
];

export const EASTER_EGGS: EasterEgg[] = [
  {
    id: 'empty',
    detect: (code) => code.trim() === '',
    complaints: [
      "This is the best code you've ever written.",
      "We have nothing to complain about.",
      "Zero bugs. Zero issues. Zero lines.",
      "Just kidding. The absence of code IS the bug.",
      "You've achieved something remarkable: negative productivity.",
    ],
    issues: [
      { type: 'VOID', msg: 'Line 0: No code detected. This is both the problem and the solution.' },
      { type: 'PHILOSOPHICAL', msg: 'Line ???: If no code exists, can bugs exist?' },
      { type: 'HR', msg: 'Line N/A: Your manager has been notified of your output levels.' },
    ],
    verdict: "This is the best code you've ever written. We have nothing to complain about. Just kidding. Submitting nothing is still somehow worse than submitting something.",
  },
  {
    id: 'hello-world',
    detect: (code) => /hello\s*world/i.test(code),
    complaints: [
      "You submitted Hello World. In 2026. To an AI code reviewer.",
      "I found 23 issues in your 2 lines of code. That's a record.",
      "This is the coding equivalent of showing up to a job interview in pajamas.",
      "Every CS student writes this. Most of them move on. You didn't.",
      "Hello World? More like Goodbye Career.",
    ],
    issues: HELLO_WORLD_ISSUES,
    verdict: "23 issues found in 2 lines of code. That's 11.5 issues per line. You've set a new record for issue density. The previous record holder has sent you a congratulations card.",
  },
  {
    id: 'good-programmer',
    detect: (code) => /i'?m a good programmer/i.test(code),
    complaints: [
      "HAHAHAHAHAHAHAHA",
      "I'm sorry, let me compose myself.",
      "HAHAHAHAHA no I can't.",
      "You literally typed that into a complaint generator. Self-awareness: 0.",
      "The code you're writing right now is to ASK AN AI TO INSULT YOU. Think about that.",
    ],
    issues: [
      { type: 'DELUSION', msg: 'Line 1: self.confidence exceeds self.competence by factor of infinity.' },
      { type: 'CLINICAL', msg: 'Line 1: Dunning-Kruger effect detected at critical levels.' },
      { type: 'PARADOX', msg: 'Line 1: Good programmers don\'t need to say they\'re good programmers.' },
      { type: 'EVIDENCE', msg: 'Line 1: Citation needed.' },
      { type: 'RECORDS', msg: 'Line 1: Our database disagrees.' },
    ],
    verdict: "You typed 'I'm a good programmer' into a tool called 'AI Code Reviewer That Only Complains.' The irony is so thick you could deploy it as a load balancer.",
  },
];

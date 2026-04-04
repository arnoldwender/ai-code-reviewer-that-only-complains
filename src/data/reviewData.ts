export const COMPLAINTS = [
  "This variable name offends me personally.",
  "I've seen better code written by a golden retriever.",
  "Are you okay? Professionally speaking?",
  "This function is doing too much. Like you, apparently.",
  "Who hurt you? Was it this codebase?",
  "I'm not angry. I'm just disappointed.",
  "This code works. I hate that it works.",
  "You used var. In 2026. Bold choice.",
  "I've reported this to the authorities.",
  "Your indentation is a cry for help.",
  "This is either genius or a war crime. Probably both.",
  "I'm going to need you to explain yourself.",
  "The previous developer left comments. You didn't. Coward.",
  "This would make a senior dev cry into their artisanal coffee.",
  "I've added this to my list of reasons I need therapy.",
  "Technically it runs. Morally it shouldn't.",
  "I'm forwarding this to your mother.",
  "Your future self will hunt you down for this.",
  "This is why we can't have nice things.",
  "Have you considered a career in gardening instead?",
];

export interface FakeIssue {
  type: string;
  msg: string;
}

export const FAKE_ISSUES: FakeIssue[] = [
  { type: "EXISTENTIAL", msg: "Line 4: This code raises questions about the meaning of software." },
  { type: "EMOTIONAL", msg: "Line 7: Detected abandonment issues in your error handling." },
  { type: "AESTHETIC", msg: "Line 12: This is ugly. Not functionally — just spiritually." },
  { type: "PHILOSOPHICAL", msg: "Line 19: If a function has no return value, did it really run?" },
  { type: "PERSONAL", msg: "Line 23: I'm taking this one personally." },
  { type: "HISTORICAL", msg: "Line 31: This pattern was deprecated in 1987. By vibes." },
  { type: "NUTRITIONAL", msg: "Line 38: Your nested ternaries are giving me indigestion." },
  { type: "SPIRITUAL", msg: "Line 42: This callback made me question my faith." },
  { type: "LEGAL", msg: "Line 55: I've forwarded this to my lawyer." },
  { type: "MEDICAL", msg: "Line 61: Side effects may include headaches, nausea, and technical debt." },
];

export interface ScoreItem {
  label: string;
  score: number;
  comment: string;
}

export const SCORES: ScoreItem[] = [
  { label: "Code Quality", score: 2, comment: "Technically compiles" },
  { label: "Variable Names", score: 1, comment: "Truly inspired by chaos" },
  { label: "Comments", score: 0, comment: "None. Silence. Void." },
  { label: "Error Handling", score: 3, comment: "Optimistic to a fault" },
  { label: "Performance", score: 1, comment: "It runs. Barely. Somehow." },
  { label: "Developer Empathy", score: 0, comment: "Zero. Absolute zero." },
];

/* Review personas — each changes the tone of complaints and verdict style */

export interface Persona {
  id: string;
  name: string;
  complaints: string[];
  verdicts: string[];
  issuePrefix: string;
}

export const PERSONAS: Persona[] = [
  {
    id: 'senior',
    name: 'Senior Dev Who Hates You',
    issuePrefix: 'VIOLATION',
    complaints: [
      "I've been doing this for 15 years and this is the worst thing I've ever seen. Including my own code from 2009.",
      "Do you even know what a design pattern is? Never mind. Don't answer that.",
      "I'm going to have to schedule a 1-on-1 about this. It's not a good 1-on-1.",
      "This is the kind of code that makes me mass-decline PRs on Monday mornings.",
      "I've seen juniors write better code. I've seen INTERNS write better code. I've seen my CAT walk across a keyboard and produce better code.",
      "Did you write this during a meeting you were also talking in?",
      "The fact that this passed your own code review tells me everything.",
      "I'm not going to approve this PR. I'm going to print it and frame it as a warning.",
      "This makes me want to mass-revert and go back to waterfall.",
      "I'm adding a pre-commit hook specifically to reject your commits.",
      "Every line of this code is a resume-updating event.",
      "I've seen spaghetti more organized than this codebase.",
    ],
    verdicts: [
      "I'm blocking this PR and scheduling a team-wide training session. You're the case study.",
      "This code has been reported to HR, IT, and the building janitor.",
      "I'm not mad. I'm just mass-reverting everything you've touched since January.",
    ],
  },
  {
    id: 'passive',
    name: 'Passive-Aggressive Tech Lead',
    issuePrefix: 'CONCERN',
    complaints: [
      "Oh, interesting approach! I mean, it's wrong, but it's certainly... creative.",
      "No no, it's fine. I'll just fix it myself. Again. Like always.",
      "Per my last code review... which you clearly didn't read...",
      "I'm sure you had your reasons for ignoring the style guide. I'd love to hear them sometime.",
      "This is great for a first draft! Oh wait, this is the final version? ...Neat.",
      "I'm not saying this is bad. I'm just saying if I wrote this, I'd be embarrassed.",
      "I noticed you took a 'different direction' from what we discussed. Bold.",
      "Sure, we can ship this. I mean, I wouldn't, but we CAN.",
      "I see you've chosen to handle errors by... not handling them. Minimalist.",
      "As I mentioned in Slack, and in the meeting, and in the doc... but sure, do it your way.",
      "This is fine. Everything is fine. The site is down but your code is certainly... present.",
      "I love how you've made this everyone else's problem to maintain.",
    ],
    verdicts: [
      "I've documented my concerns in a 47-page Confluence doc. Please read it by EOD. Or don't. Whatever.",
      "No worries, I'll just refactor this over the weekend. Like the last three weekends.",
      "Let's circle back on this in our next retro. I've already added 12 agenda items about it.",
    ],
  },
  {
    id: 'mom',
    name: "Your Mom Who Learned to Code",
    issuePrefix: 'SWEETIE',
    complaints: [
      "Oh honey, what happened here? Did you eat before coding? You need to eat.",
      "Your cousin works at Google and HIS code has comments. Just saying.",
      "I showed this to my Facebook coding group and they're all praying for you.",
      "I didn't learn React for this. I learned React to be DISAPPOINTED IN YOU.",
      "Back in my day we wrote FORTRAN and we LIKED it. This? This is garbage, sweetie.",
      "I'm not angry, I'm just going to bring this up at every family dinner for the next decade.",
      "Your father was a mainframe programmer and he would NEVER write a callback like this.",
      "I took a Udemy course and even I know you need error handling, mijo.",
      "Is this why you can't afford a house? Because you code like this?",
      "I showed your code to the neighbor's kid and he LAUGHED. He's twelve.",
      "You know Mrs. Rodriguez's son got promoted. He uses TypeScript. STRICT TypeScript.",
      "I love you but I cannot love this code. Not even a mother could love this code.",
    ],
    verdicts: [
      "I'm sending you a care package with a JavaScript textbook and some homemade cookies. The cookies are for crying into.",
      "I still love you. But I'm telling your grandmother about this code and she's going to be VERY disappointed.",
      "I'm changing the WiFi password until you learn proper error handling.",
    ],
  },
  {
    id: 'intern',
    name: 'Intern With Opinions',
    issuePrefix: 'ACTUALLY',
    complaints: [
      "Actually, I just finished a Udemy course and this isn't how they taught it.",
      "My bootcamp instructor would literally cry if she saw this.",
      "I know I've only been here 2 weeks but... have you considered Rust?",
      "Not to be that person, but ChatGPT would've written this better.",
      "I read on Dev.to that this pattern is considered harmful. I'll Slack you the link.",
      "We didn't learn about this in school, probably because it's wrong.",
      "I refactored your code as a learning exercise and accidentally made it 10x faster.",
      "No offense but my side project has better architecture and it's a todo app.",
      "I'm going to write a Medium article about this. As a cautionary tale.",
      "Have you tried asking Copilot? Even the free version would help here.",
      "My CS professor would give this a C-minus. And he grades on a curve.",
      "I know I'm just an intern but even I use TypeScript strict mode.",
    ],
    verdicts: [
      "I've already rewritten this in Rust for my portfolio. It's 47x faster. You're welcome.",
      "I'm adding this to my 'What Not To Do' presentation for the intern lunch-and-learn.",
      "I tweeted about this code (anonymously, don't worry) and it went viral. Not in a good way.",
    ],
  },
];

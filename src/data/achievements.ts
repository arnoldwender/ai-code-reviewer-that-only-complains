/* Achievement / badge system — unlocked based on review count and special triggers */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (ctx: AchievementContext) => boolean;
}

export interface AchievementContext {
  reviewCount: number;
  codeContent: string;
  unlockedIds: string[];
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-review',
    name: 'First Blood',
    description: 'Submitted your first code for review',
    icon: '\u{1F4BB}',
    condition: (ctx) => ctx.reviewCount >= 1,
  },
  {
    id: 'thick-skin',
    name: 'Thick Skin',
    description: 'Survived 5 reviews without closing the tab',
    icon: '\u{1F6E1}\u{FE0F}',
    condition: (ctx) => ctx.reviewCount >= 5,
  },
  {
    id: 'masochist',
    name: 'Masochist',
    description: 'Came back for 10 reviews. Seek help.',
    icon: '\u{1F525}',
    condition: (ctx) => ctx.reviewCount >= 10,
  },
  {
    id: 'glutton',
    name: 'Glutton for Punishment',
    description: '25 reviews. You actually enjoy this.',
    icon: '\u{1F608}',
    condition: (ctx) => ctx.reviewCount >= 25,
  },
  {
    id: 'hello-world',
    name: 'Hello Darkness',
    description: 'Submitted a Hello World program',
    icon: '\u{1F44B}',
    condition: (ctx) => /hello\s*world/i.test(ctx.codeContent),
  },
  {
    id: 'empty-code',
    name: 'Philosophical Void',
    description: 'Submitted empty code. The best code is no code.',
    icon: '\u{1F573}\u{FE0F}',
    condition: (ctx) => ctx.codeContent.trim() === '',
  },
  {
    id: 'good-programmer',
    name: 'Delusion Detected',
    description: 'Claimed to be a good programmer',
    icon: '\u{1F921}',
    condition: (ctx) => /i'?m a good programmer/i.test(ctx.codeContent),
  },
  {
    id: 'long-code',
    name: 'Novel Writer',
    description: 'Submitted 100+ lines. Quantity over quality.',
    icon: '\u{1F4DA}',
    condition: (ctx) => ctx.codeContent.split('\n').length >= 100,
  },
  {
    id: 'short-code',
    name: 'Minimalist',
    description: 'Submitted a single line. Maximum damage per LOC.',
    icon: '\u{1F48E}',
    condition: (ctx) => {
      const lines = ctx.codeContent.trim().split('\n');
      return lines.length === 1 && ctx.codeContent.trim().length > 0;
    },
  },
  {
    id: 'persona-switcher',
    name: 'Personality Disorder',
    description: 'Tried all 4 reviewer personas',
    icon: '\u{1F3AD}',
    /* This one is checked externally via persona tracking */
    condition: () => false,
  },
];

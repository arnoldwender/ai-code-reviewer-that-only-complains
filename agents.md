# agents.md - AI Agent Instructions

## Project Context

**AI Code Reviewer That Only Complains** is a satirical React + TypeScript web app that parodies AI code review tools. It uses a retro CRT terminal aesthetic and delivers sarcastic, unhelpful complaints instead of real code analysis.

## Repository Structure

```
src/
  App.tsx                  # Main component - three-phase flow (idle/reviewing/done)
  main.tsx                 # React entry point
  index.css                # Global styles and CRT animations
  components/
    CrtOverlay.tsx         # CRT visual effects
    ReviewFeedback.tsx     # Complaint display
    IssuesList.tsx         # Fake issue list
    ScoreBoard.tsx         # Score ratings
    Verdict.tsx            # Final verdict
  data/
    reviewData.ts          # Static complaint/issue/score data
  utils/
    glitch.ts              # Glitch text effect and shuffle utility
```

## Working With This Codebase

### Build & Verify

```bash
npm install
npm run build        # Verify it compiles
npm run lint         # Check for lint errors
npm run typecheck    # TypeScript validation
```

### Key Patterns

- **State management**: React `useState` and `useCallback` hooks in `App.tsx`
- **Styling**: Tailwind CSS utilities with custom theme in `tailwind.config.js`
- **Data**: All review content is static arrays in `src/data/reviewData.ts`
- **Animations**: CSS `@keyframes` in `src/index.css`, plus JS-driven glitch in `src/utils/glitch.ts`

### When Adding Features

- Keep the sarcastic, humorous tone consistent
- New complaints go in the `COMPLAINTS` array in `reviewData.ts`
- New issue types go in `FAKE_ISSUES` with a category and message
- New score metrics go in `SCORES` with a label, 0-5 score, and witty comment
- Use Tailwind for all styling; follow the orange-on-black terminal theme
- The app is fully client-side with no backend

### When Fixing Bugs

- Run `npm run typecheck` and `npm run lint` to validate changes
- The `@supabase/supabase-js` dependency is unused and can be ignored
- Test all three phases: idle (input), reviewing (animation), done (results)

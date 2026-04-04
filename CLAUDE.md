# CLAUDE.md - Instructions for Claude Code

## Project Overview

This is **AI Code Reviewer That Only Complains**, a satirical React web app styled as a retro CRT terminal. It pretends to review code but only delivers sarcastic complaints. No actual code analysis is performed.

## Tech Stack

- React 18 + TypeScript
- Vite 5 (dev server, bundler)
- Tailwind CSS 3 (utility-first styling)
- Lucide React (icons)
- PostCSS + Autoprefixer

## Commands

- `npm run dev` - Start dev server (port 5173)
- `npm run build` - Production build to `dist/`
- `npm run lint` - ESLint check
- `npm run typecheck` - TypeScript type checking (`tsc --noEmit -p tsconfig.app.json`)
- `npm run preview` - Preview production build

## Architecture

Single-page React app with three phases: `idle` -> `reviewing` -> `done`.

### Key Files

- `src/App.tsx` - Main component, manages phase state and review flow
- `src/data/reviewData.ts` - All complaint text, fake issues, and scores (static data, no API calls)
- `src/utils/glitch.ts` - Text glitch effect and Fisher-Yates shuffle
- `src/components/` - UI components: CrtOverlay, ReviewFeedback, IssuesList, ScoreBoard, Verdict
- `src/index.css` - Global styles including CRT animations (scandown, flickerIn, pulseGlow)
- `tailwind.config.js` - Custom terminal theme colors and JetBrains Mono font

### Styling Conventions

- All styling uses Tailwind utility classes
- Custom colors defined in `tailwind.config.js`: `terminal-bg` (#000), `terminal-dark` (#0a0500), `terminal-orange` (#ff6600), `terminal-red` (#f00)
- Animations defined in `src/index.css` with `@keyframes`
- CRT effects (scanlines, vignette, sweep) are in `CrtOverlay.tsx`

## Code Style

- ESLint 9 flat config with TypeScript and React plugins
- Functional React components with hooks
- No class components
- TypeScript strict mode enabled

## Important Notes

- The app is entirely client-side. No backend, no API calls, no actual code analysis.
- `@supabase/supabase-js` is listed as a dependency but is not currently used in the codebase.
- All review content (complaints, issues, scores) is static data in `reviewData.ts`.
- The humorous tone is intentional - maintain the sarcastic style when adding content.

# AI Code Reviewer That Only Complains

A satirical, retro-terminal-styled web application that parodies AI code reviewers. Instead of helpful feedback, it delivers emotionally brutal, hilariously unhelpful complaints about any code you submit.

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-52djufpw)

## What It Does

Paste any code into the terminal-style interface and receive:

- **5 random sarcastic complaints** delivered one at a time with dramatic pacing
- **Fake issue reports** with absurd categories (EXISTENTIAL, EMOTIONAL, NUTRITIONAL, LEGAL, etc.)
- **A scoreboard** rating your code on metrics like "Developer Empathy" (0 stars) and "Variable Names" (1 star: "Truly inspired by chaos")
- **A final verdict** to really drive the point home

No actual code analysis is performed. Every review is equally devastating.

## Tech Stack

- **React 18** with TypeScript
- **Vite 5** for development and builds
- **Tailwind CSS 3** for styling
- **Lucide React** for icons
- **PostCSS** + Autoprefixer

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the Vite development server    |
| `npm run build`    | Build for production                 |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint                           |
| `npm run typecheck`| Type-check with TypeScript           |

## Project Structure

```
src/
  App.tsx                  # Main application component (idle/reviewing/done phases)
  main.tsx                 # React entry point
  index.css                # Global styles, CRT animations, scanlines
  components/
    CrtOverlay.tsx         # CRT monitor visual effects (scanlines, vignette, sweep)
    ReviewFeedback.tsx     # Displays complaints as they appear
    IssuesList.tsx         # Shows fake detected issues
    ScoreBoard.tsx         # Humorous score ratings
    Verdict.tsx            # Final verdict display
  data/
    reviewData.ts          # All complaints, fake issues, and score data
  utils/
    glitch.ts              # Text glitch effect and array shuffle utilities
```

## Visual Design

The app uses a retro CRT terminal aesthetic with:

- Orange-on-black color scheme (`#ff6600` on `#000000`)
- JetBrains Mono font
- CRT scanline overlay and vignette effects
- Glitching title text animation
- Themed as the "Wender Media Emotional Intelligence Suite v6.6.6"

## Disclaimer

This is a joke project. No code is actually analyzed. No feelings were spared.

## License

Built by [Wender Media](https://github.com/arnoldwender).

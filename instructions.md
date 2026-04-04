# instructions.md - Development Instructions

## Overview

AI Code Reviewer That Only Complains is a joke web app that pretends to review code but only outputs sarcastic complaints. Built with React 18, TypeScript, Vite 5, and Tailwind CSS 3.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Development Guidelines

### Adding New Complaints

Edit `src/data/reviewData.ts`. Add strings to the `COMPLAINTS` array:

```typescript
export const COMPLAINTS = [
  // ... existing complaints
  "Your new complaint here.",
];
```

The app randomly selects 5 complaints per review.

### Adding New Fake Issues

Add objects to the `FAKE_ISSUES` array with a type and message:

```typescript
{ type: "CATEGORY", msg: "Line XX: Your witty message here." }
```

The app randomly selects 5 issues per review.

### Adding New Score Metrics

Add objects to the `SCORES` array:

```typescript
{ label: "Metric Name", score: 2, comment: "Sarcastic comment" }
```

Scores range from 0-5 stars.

### Styling

- Use Tailwind utility classes exclusively
- Custom theme colors: `terminal-bg`, `terminal-dark`, `terminal-orange`, `terminal-red`
- Font: JetBrains Mono (loaded via CDN in `index.html`)
- CRT effects are handled by `CrtOverlay.tsx`

### Code Quality

Run before committing:

```bash
npm run lint         # ESLint
npm run typecheck    # TypeScript checks
npm run build        # Verify production build
```

## Architecture

The app has a single main component (`App.tsx`) that manages three phases:

1. **idle** - User sees the text area and pastes code
2. **reviewing** - Complaints appear one by one (400ms intervals)
3. **done** - Issues, scores, and final verdict are displayed

All review data is static. No API calls are made. No code is actually analyzed.

## Dependencies

| Package              | Purpose                          | Notes          |
| -------------------- | -------------------------------- | -------------- |
| react, react-dom     | UI framework                     |                |
| lucide-react         | Terminal icon                    |                |
| tailwindcss          | Utility-first CSS                |                |
| vite                 | Dev server and bundler           |                |
| typescript           | Type safety                      |                |
| @supabase/supabase-js| Not currently used               | Can be removed |

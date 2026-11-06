# ai-code-reviewer-that-only-complains — contributor notes

## Project

- Humour web app (React 18 + Vite + Tailwind 3), deployed on Netlify from `main` (`npm run build` → `dist/`).
- Live: <https://ai-code-reviewer-that-only-complains.netlify.app>

## Rules

- **No third-party requests.** Fonts are self-hosted via `@fontsource/*`; never re-add Google Fonts or other CDN assets.
- **Legal pages** are static files: `public/impressum/index.html` and `public/datenschutz/index.html`, linked from the
  app footer. If you add a feature that stores data in the browser or contacts a third party, update the
  Datenschutzerklärung in the same change.
- `localStorage` is written only after a user action (review, persona selection), never on page load.

/* Global complaint counter — seeded by date, increments randomly to simulate worldwide usage */

const STORAGE_KEY = 'acr-global-complaints';
const SESSION_KEY = 'acr-session-count';

/* Deterministic seed based on days since epoch — gives a believable base count */
function getDateSeed(): number {
  const daysSinceEpoch = Math.floor(Date.now() / 86400000);
  /* Start at ~2.4 million, grow ~1200-2800 per day */
  return 2_417_832 + (daysSinceEpoch - 20000) * 1847;
}

/* Get a random increment per session action (simulates other "users") */
function getRandomIncrement(): number {
  return Math.floor(Math.random() * 7) + 3;
}

export function getGlobalCount(): number {
  const base = getDateSeed();
  const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  return base + stored;
}

export function incrementGlobalCount(): number {
  const current = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  const increment = getRandomIncrement();
  const next = current + increment;
  localStorage.setItem(STORAGE_KEY, String(next));

  /* Also track session count for achievements */
  const session = parseInt(localStorage.getItem(SESSION_KEY) || '0', 10);
  localStorage.setItem(SESSION_KEY, String(session + 1));

  return getDateSeed() + next;
}

export function getSessionReviewCount(): number {
  return parseInt(localStorage.getItem(SESSION_KEY) || '0', 10);
}

const GLITCH_CHARS = "!@#$%^&*[]|/?";

export function glitchText(text: string, intensity: number): string {
  return text
    .split("")
    .map((c) =>
      Math.random() < intensity
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : c
    )
    .join("");
}

export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

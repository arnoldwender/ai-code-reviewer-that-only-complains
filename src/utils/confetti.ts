/* Red/orange confetti explosion — "celebrating" terrible code */
import confetti from 'canvas-confetti';

export function fireComplaintConfetti(): void {
  /* First burst — orange/red from left */
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: 0.2, y: 0.6 },
    colors: ['#ff6600', '#ff3300', '#ff0000', '#cc3300', '#ff9900'],
    gravity: 1.2,
    scalar: 0.9,
  });

  /* Second burst — from right, slightly delayed via RAF */
  requestAnimationFrame(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.8, y: 0.6 },
      colors: ['#ff6600', '#ff3300', '#ff0000', '#cc3300', '#ff9900'],
      gravity: 1.2,
      scalar: 0.9,
    });
  });

  /* Top rain burst after short delay */
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 120,
      startVelocity: 25,
      origin: { x: 0.5, y: 0 },
      colors: ['#ff6600', '#ff0000', '#cc0000'],
      gravity: 0.8,
      ticks: 200,
    });
  }, 300);
}

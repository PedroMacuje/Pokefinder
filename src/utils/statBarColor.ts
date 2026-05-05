export default function getStatColor(value: number): string {
  const min = 0;
  const max = 230;

  const clamped = Math.max(min, Math.min(value, max));

  // Map value → hue (0 = red, 200 = blue)
  const hue = (clamped / max) * 200;

  return `hsl(${hue}, 90%, 50%)`;
}

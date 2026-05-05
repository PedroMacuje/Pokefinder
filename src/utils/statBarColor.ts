export default function getStatColor(value: number) {
  const max = 150;
  const percent = Math.min(value / max, 1);

  let r;
  let g;
  let b;

  if (percent < 0.25) {
    // red → yellow
    r = 255;
    g = Math.round(255 * (percent / 0.25));
  } else if (percent < 0.5) {
    // yellow → orange
    r = 255;
    g = Math.round(255 - 100 * ((percent - 0.25) / 0.25));
  } else if (percent < 0.75) {
    // orange → green
    r = Math.round(255 - 255 * ((percent - 0.5) / 0.25));
    g = 155 + Math.round(100 * ((percent - 0.5) / 0.25));
  } else {
    // green → blue
    g = Math.round(255 - 255 * ((percent - 0.75) / 0.25));
    b = Math.round(255 * ((percent - 0.75) / 0.25));
  }

  return `rgb(${r}, ${g}, ${b})`;
}

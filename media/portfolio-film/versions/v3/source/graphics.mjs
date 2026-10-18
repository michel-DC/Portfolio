export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 60;
export const DURATION = 40;
export const palette = { ink: "#1e1e1e", green: "#173F35", ivory: "#ffffff", pale: "#A3C2B2", white: "#ffffff", hover: "#235A4B" };

export function clamp(value, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

export function circle(ctx, x, y, radius, color, stroke = false) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (stroke) { ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke(); }
  else { ctx.fillStyle = color; ctx.fill(); }
}

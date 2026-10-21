import { palette, clamp, circle } from './graphics.mjs';
import { line, rounded, ornament, type } from './film-language.mjs';
import { beat, blend, transform } from './motion-kit.mjs';

export function curvePoint(points, progress) {
  const t = clamp(progress);
  const u = 1 - t;
  const [a, b, c, d] = points;
  return { x: a[0] * u ** 3 + 3 * b[0] * u * u * t + 3 * c[0] * u * t * t + d[0] * t ** 3, y: a[1] * u ** 3 + 3 * b[1] * u * u * t + 3 * c[1] * u * t * t + d[1] * t ** 3 };
}

export function route(ctx, points, progress = 1, color = '#8aa998', width = 2) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  const steps = Math.ceil(clamp(progress) * 90);
  for (let i = 1; i <= steps; i += 1) {
    const point = curvePoint(points, Math.min(progress, i / 90));
    ctx.lineTo(point.x, point.y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();
}

export function pulse(ctx, x, y, time, start, radius = 80, color = palette.green) {
  const p = clamp((time - start) / 0.85);
  if (p === 0 || p === 1) return;
  ctx.save();
  ctx.globalAlpha *= 1 - p;
  circle(ctx, x, y, 12 + p * radius, color, true);
  ctx.restore();
}

export function packet(ctx, x, y, size, rotation = 0, alpha = 1) {
  transform(ctx, { x, y, angle: rotation, alpha }, () => {
    rounded(ctx, -size * 0.65, -size * 0.45, size * 1.3, size * 0.9, size * 0.12, '#e0ebdf', true);
    line(ctx, -size * 0.38, -size * 0.1, size * 0.38, -size * 0.1, '#7f9c88', 2);
    line(ctx, -size * 0.38, size * 0.13, size * 0.12, size * 0.13, '#7f9c88', 2);
    ornament(ctx, size * 0.36, size * 0.15, size * 0.1, 1, rotation);
  });
}

export function check(ctx, x, y, size, progress, color = palette.green) {
  const points = [[x - size * 0.46, y], [x - size * 0.1, y + size * 0.33], [x + size * 0.48, y - size * 0.4]];
  const first = clamp(progress * 2);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  ctx.lineTo(blend(points[0][0], points[1][0], first), blend(points[0][1], points[1][1], first));
  if (progress > 0.5) ctx.lineTo(blend(points[1][0], points[2][0], progress * 2 - 1), blend(points[1][1], points[2][1], progress * 2 - 1));
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.1;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.restore();
}

export function status(ctx, text, x, y, progress, inverse = false) {
  const color = inverse ? '#dce8d7' : palette.green;
  circle(ctx, x - 105, y - 8, 17, inverse ? '#375d4f' : '#e1ebdf');
  check(ctx, x - 105, y - 8, 18, progress, color);
  type(ctx, text, x - 72, y, 27, { align: 'left', family: 'Body', color });
}

export function sceneLayer(ctx, time, start, end, draw) {
  const enter = 1 - Math.pow(1 - clamp((time - start) / 0.28), 5);
  const exit = Math.pow(clamp((time - end + 0.22) / 0.22), 3);
  if (enter === 0 || exit === 1) return;
  transform(ctx, { x: 960 + (1 - enter) * 1200 - exit * 1300, y: 600 + (1 - enter) * 70, scale: 0.88 + enter * 0.12 + exit * 0.08, angle: (1 - enter) * -0.035 + exit * 0.025, alpha: 1 }, () => {
    ctx.translate(-960, -600);
    draw();
  });
}

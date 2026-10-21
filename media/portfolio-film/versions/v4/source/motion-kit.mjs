import { palette, clamp, lerp, circle } from './graphics.mjs';
import { backdrop, type, line, ornament, rounded, icon, pointer } from './film-language.mjs';
import { masthead, letters } from './editorial-graphics.mjs';

export const HEAD_DURATION = 34.5;
export const DURATION = 45;
export const TAIL_START = 29.5;
export const ease = (value) => { const p = clamp(value); return p * p * p * (p * (p * 6 - 15) + 10); };
export const beat = (time, start, duration = 0.65) => ease((time - start) / duration);
export const blend = lerp;
export const spring = (value) => { const p = clamp(value); return 1 - Math.exp(-p * 8) * Math.cos(p * 10); };

export function stage(ctx, assets, inverse = false) {
  if (inverse) { ctx.fillStyle = palette.green; ctx.fillRect(0, 0, 1920, 1080); }
  else backdrop(ctx, assets);
  masthead(ctx, assets, inverse);
}

export function transform(ctx, { x = 960, y = 590, scale = 1, angle = 0, alpha = 1 }, draw) {
  ctx.save();
  ctx.globalAlpha *= clamp(alpha);
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  draw();
  ctx.restore();
}

export function headline(ctx, value, x, y, size, time, color = palette.green, align = 'left') {
  const progress = beat(time, 0, 0.65);
  ctx.save();
  ctx.beginPath();
  ctx.rect(60, y - size * 1.15, 1800, size * 1.4);
  ctx.clip();
  type(ctx, value, x, y + (1 - progress) * size * 1.2, size, { color, align });
  ctx.restore();
}

export function label(ctx, text, x, y, alpha = 1, inverse = false) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  type(ctx, text, x, y, 30, { family: 'Body', color: inverse ? palette.pale : palette.green });
  ctx.restore();
}

export function token(ctx, assets, key, x, y, progress = 1, name = '') {
  transform(ctx, { x, y: y + 50 * (1 - progress), scale: Math.max(0.01, progress), alpha: progress }, () => {
    circle(ctx, 0, 0, 39, '#ffffff');
    icon(ctx, assets, key, 0, 0, 43);
    if (name) type(ctx, name, 58, 10, 28, { align: 'left', family: 'Body', color: palette.green });
  });
}

export function guides(ctx, width, height, alpha = 1, center = false) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  const color = '#70928699';
  const x = -width / 2;
  const y = -height / 2;
  line(ctx, x - 90, y, -x + 90, y, color, 1, true);
  line(ctx, x - 90, -y, -x + 90, -y, color, 1, true);
  line(ctx, x, y - 60, x, -y + 60, color, 1, true);
  line(ctx, -x, y - 60, -x, -y + 60, color, 1, true);
  if (center) line(ctx, 0, y - 60, 0, -y + 60, color, 1, true);
  for (const px of [x, -x]) for (const py of [y, -y]) rounded(ctx, px - 5, py - 5, 10, 10, 1, palette.green);
  ctx.restore();
}

export function rosette(ctx, x, y, radius, time, color = palette.green) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(time * 0.35);
  for (let index = 0; index < 5; index += 1) {
    ctx.rotate(Math.PI / 5);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ornament(ctx, 0, 0, radius * 0.32, 1, time * 0.4, color);
  ctx.restore();
}

export function orbit(ctx, x, y, radius, time, color = palette.green, count = 16) {
  for (let index = 0; index < count; index += 1) {
    const angle = index / count * Math.PI * 2 + time;
    const size = 4 + Math.sin(angle * 2 + time) * 2;
    circle(ctx, x + Math.cos(angle) * radius, y + Math.sin(angle) * radius, size, color);
  }
}

export function panel(ctx, assets, width, height, time, { aligned = 1, active = 0, interactive = 0, decoration = 1 } = {}) {
  const x = -width / 2;
  const y = -height / 2;
  rounded(ctx, x, y, width, height, 12, '#ffffff', true);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 12);
  ctx.clip();
  line(ctx, x, y + 46, -x, y + 46, '#dce5df', 1);
  for (let i = 0; i < 3; i += 1) circle(ctx, x + 25 + i * 15, y + 24, 3, '#9eb8ac');
  const narrow = clamp((850 - width) / 400);
  const artWidth = blend(width * 0.42, width - 72, narrow);
  const artHeight = blend(height - 112, height * 0.4, narrow);
  const artX = blend(width * 0.25, 0, narrow);
  const artY = blend(24, -height * 0.18 - 20, narrow);
  transform(ctx, { x: artX + (1 - aligned) * 36, y: artY + (1 - aligned) * 21, angle: (1 - aligned) * -0.04 }, () => {
    rounded(ctx, -artWidth / 2, -artHeight / 2, artWidth, artHeight, 4, palette.green);
    ctx.save();
    ctx.beginPath();
    ctx.rect(-artWidth / 2, -artHeight / 2, artWidth, artHeight);
    ctx.clip();
    const breathe = 1 + Math.sin(time * 1.5) * 0.035;
    rosette(ctx, 0, 0, Math.min(artWidth, artHeight) * 0.36 * breathe, time + active, '#cce0d2');
    orbit(ctx, 0, 0, Math.min(artWidth, artHeight) * 0.4, time * 0.2, '#8eaf9d', 12);
    ctx.restore();
  });
  const textX = blend(x + 55, 0, narrow);
  const textY = blend(-42, height * 0.16, narrow);
  const align = narrow > 0.5 ? 'center' : 'left';
  const titleSize = Math.min(blend(90, 58, narrow), width * 0.16);
  ctx.save();
  ctx.globalAlpha *= 1 - beat(narrow, 0.02, 0.16) + beat(narrow, 0.82, 0.16);
  type(ctx, 'Un peu', textX, textY, titleSize, { align, color: palette.green });
  type(ctx, 'plus juste.', textX, textY + titleSize * 1.02, titleSize, { align });
  const copyWidth = blend(width * 0.27, width * 0.64, narrow);
  for (let i = 0; i < 2; i += 1) rounded(ctx, narrow > 0.5 ? -copyWidth / 2 : textX, textY + titleSize * 1.45 + i * 18, copyWidth - i * 38, 5, 2, '#d9e4dc');
  const buttonX = narrow > 0.5 ? -90 : textX;
  const buttonY = Math.min(y + height - 77, textY + titleSize * 1.45 + 65);
  rounded(ctx, buttonX, buttonY, 180, 46, 23, active > 0.5 ? palette.green : '#e4ebe4');
  type(ctx, interactive > 0.7 ? 'C’est vivant.' : 'Explorer', buttonX + 90, buttonY + 30, 22, { family: 'Body', color: active > 0.5 ? '#fff' : palette.green });
  ctx.restore();
  if (decoration > 0) ornament(ctx, x + width - 28, y + 25, 9, decoration, time * 0.4);
  ctx.restore();
  return { buttonX: buttonX + 90, buttonY: buttonY + 23, artX, artY };
}

export function identityOpening(ctx, assets, time, departure = 2.1) {
  const exit = beat(time, departure, 0.9);
  transform(ctx, { x: 960, y: 530 - exit * 320, scale: 1 - exit * 0.6, alpha: 1 - exit }, () => {
    label(ctx, 'Développeur créatif', 0, -180, beat(time, 0.1));
    letters(ctx, 'MiCHEL DJOUMESSI.', 0, 25, 164, time - 0.1, { accentIndex: 1, stagger: 0.035, align: 'center' });
    const a = beat(time, 0.8);
    line(ctx, -520 * a, 95, 520 * a, 95, '#80998b', 1);
  });
  return exit;
}

export function endingWipe(ctx, time, start = 30.55) {
  const p = beat(time, start, HEAD_DURATION - start);
  if (p <= 0) return;
  circle(ctx, 960, 560, p * 1500, palette.green);
}

export function cursorAt(ctx, x, y, click = 0, alpha = 1) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  pointer(ctx, x, y, click);
  ctx.restore();
}

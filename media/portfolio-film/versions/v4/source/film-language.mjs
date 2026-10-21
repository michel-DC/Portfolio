import { palette, clamp, lerp } from "./graphics.mjs";

export const out = (value) => 1 - Math.pow(1 - clamp(value), 5);
export const smooth = (value) => { const p = clamp(value); return p * p * (3 - 2 * p); };
export const cue = (time, start, duration = 0.55) => out((time - start) / duration);
export const mix = lerp;

export function type(ctx, value, x, y, size, options = {}) {
  ctx.save();
  const family = options.family ?? (size >= 90 ? "Editorial" : "Body");
  ctx.font = `${size}px "${family}"`;
  ctx.textAlign = options.align ?? "center";
  ctx.textBaseline = "alphabetic";
  ctx.letterSpacing = `${options.tracking ?? 0}px`;
  ctx.fillStyle = options.color ?? palette.ink;
  ctx.fillText(value, x, y);
  ctx.restore();
}

export function backdrop(ctx, assets) {
  ctx.fillStyle = palette.white;
  ctx.fillRect(0, 0, 1920, 1080);
  ctx.fillStyle = ctx.createPattern(assets.texture, "repeat");
  ctx.fillRect(0, 0, 1920, 1080);
  const glow = ctx.createRadialGradient(960, 575, 0, 960, 575, 700);
  glow.addColorStop(0, "rgba(23,63,53,0.08)");
  glow.addColorStop(1, "rgba(23,63,53,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1920, 1080);
}

export function rounded(ctx, x, y, width, height, radius, color, shadow = false) {
  ctx.save();
  if (shadow) {
    ctx.shadowColor = "#252a2415";
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 20;
  }
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

export function line(ctx, x1, y1, x2, y2, color = "#c9cbc3", width = 2, dashed = false) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  if (dashed) ctx.setLineDash([5, 9]);
  ctx.stroke();
  ctx.restore();
}

export function ornament(ctx, x, y, radius, alpha = 1, rotation = 0, color = palette.green) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.bezierCurveTo(radius * 0.12, -radius * 0.2, radius * 0.2, -radius * 0.12, radius, 0);
  ctx.bezierCurveTo(radius * 0.2, radius * 0.12, radius * 0.12, radius * 0.2, 0, radius);
  ctx.bezierCurveTo(-radius * 0.12, radius * 0.2, -radius * 0.2, radius * 0.12, -radius, 0);
  ctx.bezierCurveTo(-radius * 0.2, -radius * 0.12, -radius * 0.12, -radius * 0.2, 0, -radius);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

export function pose(ctx, time, getPose, draw, blur = false) {
  const samples = blur ? [0.033, 0.021, 0.011, 0] : [0];
  samples.forEach((offset, index) => {
    const state = getPose(Math.max(0, time - offset));
    ctx.save();
    ctx.globalAlpha *= (state.alpha ?? 1) * (blur ? [0.08, 0.12, 0.2, 0.78][index] : 1);
    ctx.translate(state.x ?? 960, state.y ?? 540);
    ctx.rotate(state.rotation ?? 0);
    ctx.scale(state.scaleX ?? state.scale ?? 1, state.scaleY ?? state.scale ?? 1);
    draw();
    ctx.restore();
  });
}

export function icon(ctx, assets, key, x, y, size) {
  const asset = assets[key];
  const ratio = Math.min(size / asset.width, size / asset.height);
  ctx.drawImage(asset, x - asset.width * ratio / 2, y - asset.height * ratio / 2, asset.width * ratio, asset.height * ratio);
}

export function tick(ctx, x, y, size, progress = 1, color = palette.green) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x - size * 0.45, y);
  const elbow = clamp(progress * 2);
  ctx.lineTo(mix(x - size * 0.45, x - size * 0.1, elbow), mix(y, y + size * 0.3, elbow));
  if (progress > 0.5) ctx.lineTo(mix(x - size * 0.1, x + size * 0.5, (progress - 0.5) * 2), mix(y + size * 0.3, y - size * 0.4, (progress - 0.5) * 2));
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.12;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.restore();
}

export function pointer(ctx, x, y, click = 0) {
  ctx.save();
  ctx.translate(x, y);
  const s = 1 - Math.sin(clamp(click) * Math.PI) * 0.2;
  ctx.scale(s, s);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(5, 40);
  ctx.lineTo(16, 29);
  ctx.lineTo(28, 48);
  ctx.lineTo(36, 43);
  ctx.lineTo(24, 25);
  ctx.lineTo(40, 20);
  ctx.closePath();
  ctx.fillStyle = "#111410";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;
export const DURATION = 32;
export const palette = { ink: "#1e1e1e", green: "#173F35", ivory: "#ffffff", pale: "#A3C2B2", white: "#ffffff", hover: "#235A4B" };

export function clamp(value, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

export function ease(value) {
  return 1 - Math.pow(1 - clamp(value), 5);
}

export function text(ctx, value, x, y, size, color = palette.ivory, options = {}) {
  ctx.save();
  ctx.font = `${size}px "${options.family ?? "Display"}"`;
  ctx.textAlign = options.align ?? "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = options.lineWidth ?? 1.6;
  if (options.stroke) ctx.strokeText(value, x, y);
  else ctx.fillText(value, x, y);
  ctx.restore();
}

export function cover(ctx, image, box, zoom = 1, positionX = 0.5, positionY = 0.5) {
  const scale = Math.max(box.width / image.width, box.height / image.height) * zoom;
  const imageWidth = image.width * scale;
  const imageHeight = image.height * scale;
  ctx.save();
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.width, box.height);
  ctx.clip();
  ctx.drawImage(image, box.x - (imageWidth - box.width) * positionX, box.y - (imageHeight - box.height) * positionY, imageWidth, imageHeight);
  ctx.restore();
}

export function phone(ctx, image, x, y, height, rotation = 0, alpha = 1, tilt = 0) {
  const width = height * image.width / image.height;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.transform(Math.cos(tilt), Math.sin(tilt) * 0.13, 0, 1, 0, 0);
  ctx.shadowColor = "rgba(0,0,0,0.28)";
  ctx.shadowBlur = 38;
  ctx.shadowOffsetY = 24;
  ctx.drawImage(image, -width / 2, -height / 2, width, height);
  ctx.restore();
}

export function circle(ctx, x, y, radius, color, stroke = false) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (stroke) { ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke(); }
  else { ctx.fillStyle = color; ctx.fill(); }
}

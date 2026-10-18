import { WIDTH, HEIGHT, palette, clamp, ease, lerp, text, cover, circle } from "./graphics.mjs";

export function spring(value) {
  const progress = clamp(value);
  return 1 - Math.exp(-progress * 7) * Math.cos(progress * 9);
}

export function paper(ctx, assets, glow = true) {
  ctx.fillStyle = palette.white;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = ctx.createPattern(assets.texture, "repeat");
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  if (!glow) return;
  const gradient = ctx.createRadialGradient(960, 575, 0, 960, 575, 700);
  gradient.addColorStop(0, "rgba(23,63,53,0.08)");
  gradient.addColorStop(1, "rgba(23,63,53,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

export function rule(ctx, x1, y1, x2, y2, progress = 1, color = "#173f3540", width = 1.5) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(lerp(x1, x2, clamp(progress)), lerp(y1, y2, clamp(progress)));
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

export function roundedPanel(ctx, x, y, width, height, radius = 16, color = palette.white, shadow = true) {
  ctx.save();
  if (shadow) {
    ctx.shadowColor = "rgba(23,63,53,0.12)";
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 16;
  }
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(30,30,30,0.12)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

export function pill(ctx, label, x, y, options = {}) {
  const size = options.size ?? 27;
  const height = options.height ?? 62;
  ctx.save();
  ctx.font = `${size}px "Body"`;
  const width = options.width ?? ctx.measureText(label).width + (options.dot ? 84 : 62);
  roundedPanel(ctx, x, y, width, height, height / 2, options.solid ? palette.green : "#fafafa", options.shadow ?? false);
  const color = options.solid ? palette.white : palette.ink;
  if (options.dot) circle(ctx, x + 30, y + height / 2, 5.5, options.solid ? palette.pale : palette.green);
  text(ctx, label, x + width / 2 + (options.dot ? 10 : 0), y + height / 2 + size * 0.33, size, color, { align: "center", family: "Body" });
  ctx.restore();
  return width;
}

export function arrow(ctx, x, y, size = 22, color = palette.green, rotation = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(-size * 0.6, size * 0.6);
  ctx.lineTo(size * 0.6, -size * 0.6);
  ctx.moveTo(-size * 0.5, -size * 0.6);
  ctx.lineTo(size * 0.6, -size * 0.6);
  ctx.lineTo(size * 0.6, size * 0.5);
  ctx.lineWidth = Math.max(2, size * 0.08);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.restore();
}

export function cursor(ctx, x, y, click = 0) {
  ctx.save();
  ctx.translate(x, y);
  const scale = 1 - Math.sin(clamp(click) * Math.PI) * 0.2;
  ctx.scale(scale, scale);
  ctx.shadowColor = "#00000035";
  ctx.shadowBlur = 9;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(3, 34);
  ctx.lineTo(12, 25);
  ctx.lineTo(22, 42);
  ctx.lineTo(30, 37);
  ctx.lineTo(20, 21);
  ctx.lineTo(33, 17);
  ctx.closePath();
  ctx.fillStyle = palette.ink;
  ctx.fill();
  ctx.strokeStyle = palette.white;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();
}

export function letters(ctx, value, x, y, size, time, options = {}) {
  const accentIndex = options.accentIndex ?? -1;
  const tracking = options.tracking ?? -size * 0.025;
  const advances = [...value].map((letter, index) => {
    ctx.font = `${size}px "${index === accentIndex ? "Amoria" : options.family ?? "Editorial"}"`;
    return ctx.measureText(letter).width + tracking;
  });
  const totalWidth = advances.reduce((sum, width) => sum + width, 0) - tracking;
  let pen = options.align === "right" ? x - totalWidth : options.align === "center" ? x - totalWidth / 2 : x;
  [...value].forEach((letter, index) => {
    const arrival = spring((time - index * (options.stagger ?? 0.045)) / 0.65);
    ctx.save();
    ctx.beginPath();
    ctx.rect(pen - 35, y - size * 1.08, advances[index] + 70, size * 1.3);
    ctx.clip();
    ctx.translate(pen, y + size * 1.25 * (1 - arrival));
    ctx.rotate((1 - arrival) * (index % 2 ? -0.07 : 0.07));
    text(ctx, letter, 0, 0, size, index === accentIndex ? palette.green : options.color ?? palette.ink, { family: index === accentIndex ? "Amoria" : options.family ?? "Editorial" });
    ctx.restore();
    pen += advances[index];
  });
  return totalWidth;
}

export function caption(ctx, value, x, y, size = 26, color = palette.ink, align = "left") {
  text(ctx, value, x, y, size, color, { family: "Body", align });
}

export function masthead(ctx, assets, label = "Projets sélectionnés", progress = 1) {
  ctx.save();
  ctx.globalAlpha = clamp(progress);
  ctx.drawImage(assets.logo, 74, 57, 39, 35);
  caption(ctx, "Michel Djoumessi", 136, 84, 23);
  caption(ctx, label, 1818, 84, 23, palette.green, "right");
  rule(ctx, 74, 119, 1846, 119, 1, "#1e1e1e22");
  ctx.restore();
}

export function imagePanel(ctx, image, x, y, width, height, options = {}) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(options.rotation ?? 0);
  ctx.scale(options.scale ?? 1, options.scale ?? 1);
  roundedPanel(ctx, -width / 2, -height / 2, width, height, options.radius ?? 12, palette.white);
  ctx.beginPath();
  ctx.roundRect(-width / 2, -height / 2, width, height, options.radius ?? 12);
  ctx.clip();
  cover(ctx, image, { x: -width / 2, y: -height / 2, width, height }, options.zoom ?? 1, options.positionX ?? 0.5, options.positionY ?? 0.5);
  ctx.restore();
}

export function connector(ctx, from, to, time, bend = 0) {
  const progress = ease(time);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  const steps = 60;
  for (let index = 1; index <= Math.round(steps * progress); index += 1) {
    const p = index / steps;
    const x = lerp(from.x, to.x, p);
    const y = lerp(from.y, to.y, p) + Math.sin(p * Math.PI) * bend;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#173f3550";
  ctx.lineWidth = 2;
  ctx.stroke();
  if (time > 0.7) {
    const pulse = (time * 0.7) % 1;
    circle(ctx, lerp(from.x, to.x, pulse), lerp(from.y, to.y, pulse) + Math.sin(pulse * Math.PI) * bend, 5, palette.green);
  }
  ctx.restore();
}


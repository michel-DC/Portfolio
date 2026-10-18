import { WIDTH, HEIGHT, palette, clamp, ease, lerp, text, cover, phone, circle } from "./graphics.mjs";
import { paper, roundedPanel, caption, rule, arrow, spring } from "./brand-graphics.mjs";

export function stage(ctx, assets, label, globalTime) {
  paper(ctx, assets);
  ctx.drawImage(assets.logo, 74, 57, 39, 35);
  caption(ctx, "Michel Djoumessi", 136, 84, 23);
  caption(ctx, label, 1840, 84, 23, palette.green, "right");
  rule(ctx, 74, 119, 1846, 119, 1, "#1e1e1e22");
  rule(ctx, 74, 1018, 1846, 1018, 1, "#1e1e1e22");
  rule(ctx, 74, 1018, 1846, 1018, globalTime / 36, palette.green, 2);
  caption(ctx, "DÉVELOPPEMENT · PYTHON · IA", 74, 1053, 19, "#1e1e1e88");
  caption(ctx, "hey-michel.me", 1846, 1053, 22, palette.green, "right");
}

export function icon(ctx, image, x, y, size, options = {}) {
  const scale = Math.min(size / image.width, size / image.height);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(options.rotation ?? 0);
  ctx.globalAlpha *= options.opacity ?? 1;
  ctx.drawImage(image, -image.width * scale / 2, -image.height * scale / 2, image.width * scale, image.height * scale);
  ctx.restore();
}

export function technology(ctx, assets, key, label, x, y, options = {}) {
  const width = options.width ?? 250;
  const height = options.height ?? 84;
  const arrival = options.arrival ?? 1;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(options.rotation ?? 0);
  ctx.scale(Math.max(0.001, arrival), Math.max(0.001, arrival));
  roundedPanel(ctx, -width / 2, -height / 2, width, height, height / 2, "#ffffff", true);
  icon(ctx, assets[key], -width / 2 + height * 0.52, 0, height * 0.67);
  caption(ctx, label, 18, height * 0.11, options.fontSize ?? 29, palette.ink, "center");
  ctx.restore();
}

export function symbolTile(ctx, assets, key, x, y, size, label, arrival = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(Math.max(0.001, arrival), Math.max(0.001, arrival));
  roundedPanel(ctx, -size / 2, -size / 2, size, size, size * 0.25, "#ffffff", true);
  icon(ctx, assets[key], 0, 0, size * 0.71);
  if (label) caption(ctx, label, 0, size * 0.5 + 40, 29, palette.green, "center");
  ctx.restore();
}

export function bezierPoint(points, progress) {
  const t = clamp(progress);
  const inverse = 1 - t;
  return {
    x: inverse ** 3 * points[0].x + 3 * inverse ** 2 * t * points[1].x + 3 * inverse * t ** 2 * points[2].x + t ** 3 * points[3].x,
    y: inverse ** 3 * points[0].y + 3 * inverse ** 2 * t * points[1].y + 3 * inverse * t ** 2 * points[2].y + t ** 3 * points[3].y,
  };
}

export function route(ctx, points, progress, time = 0, options = {}) {
  const reveal = clamp(progress);
  ctx.save();
  ctx.strokeStyle = options.color ?? "#173f3555";
  ctx.lineWidth = options.width ?? 2;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  const steps = 70;
  for (let step = 1; step <= Math.floor(steps * reveal); step += 1) {
    const point = bezierPoint(points, step / steps);
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
  if (reveal > 0.95) {
    for (let index = 0; index < (options.particles ?? 2); index += 1) {
      const position = ((time * 0.34 + index * 0.5) % 1 + 1) % 1;
      const point = bezierPoint(points, position);
      circle(ctx, point.x, point.y, 4.5, palette.green);
    }
  }
  ctx.restore();
}

export function codePanel(ctx, x, y, width, height, filename, lines, time, options = {}) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(options.rotation ?? 0);
  roundedPanel(ctx, -width / 2, -height / 2, width, height, 20, options.dark ? palette.green : "#ffffff", true);
  const originX = -width / 2;
  const originY = -height / 2;
  const color = options.dark ? "#ffffff" : palette.ink;
  circle(ctx, originX + 30, originY + 31, 4, options.dark ? palette.pale : palette.green);
  caption(ctx, filename, originX + 48, originY + 39, 22, options.dark ? palette.pale : palette.green);
  if (options.label) caption(ctx, options.label, width / 2 - 25, originY + 39, 20, options.dark ? palette.pale : "#1e1e1e77", "right");
  rule(ctx, originX + 20, originY + 61, width / 2 - 20, originY + 61, 1, options.dark ? "#ffffff30" : "#173f3525");
  ctx.beginPath();
  ctx.rect(originX + 18, originY + 70, width - 36, height - 88);
  ctx.clip();
  const fontSize = options.fontSize ?? 26;
  const lineHeight = options.lineHeight ?? 45;
  lines.forEach((line, index) => {
    const reveal = clamp((time - index * 0.2) / 0.5);
    const value = line.value.slice(0, Math.ceil(line.value.length * reveal));
    caption(ctx, String(index + 1).padStart(2, "0"), originX + 28, originY + 105 + index * lineHeight, 18, options.dark ? "#ffffff60" : "#1e1e1e55");
    text(ctx, value, originX + 77, originY + 105 + index * lineHeight, fontSize, line.accent ? options.dark ? palette.pale : palette.green : color, { family: "Code" });
  });
  ctx.restore();
}

export function projectProof(ctx, assets, key, label, x, y, width, height, options = {}) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(options.rotation ?? 0);
  roundedPanel(ctx, -width / 2, -height / 2, width, height, 15, "#ffffff", true);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(-width / 2, -height / 2, width, height - 49, [15, 15, 0, 0]);
  ctx.clip();
  if (key === "zenHome" || key === "zenMovie") {
    cover(ctx, assets.zenBackground, { x: -width / 2, y: -height / 2, width, height: height - 49 });
    phone(ctx, assets[key], 0, -15, height * 0.77, -0.04);
  } else {
    cover(ctx, assets[key], { x: -width / 2, y: -height / 2, width, height: height - 49 }, 1.02, 0.5, options.positionY ?? 0.35);
  }
  ctx.restore();
  caption(ctx, label, -width / 2 + 20, height / 2 - 16, 23, palette.green);
  arrow(ctx, width / 2 - 25, height / 2 - 24, 11);
  ctx.restore();
}

export function check(ctx, x, y, progress, size = 18, color = palette.green) {
  rule(ctx, x - size * 0.65, y, x - size * 0.15, y + size * 0.5, clamp(progress * 2), color, 3);
  rule(ctx, x - size * 0.15, y + size * 0.5, x + size * 0.8, y - size * 0.65, clamp(progress * 2 - 1), color, 3);
}

export function wipe(ctx, progress, reverse = false) {
  const p = clamp(progress);
  if (p <= 0 || p >= 1) return;
  ctx.save();
  const x = reverse ? WIDTH * ease(p) : 0;
  const width = reverse ? WIDTH : WIDTH * ease(p);
  ctx.fillStyle = palette.green;
  ctx.fillRect(x, 0, width, HEIGHT);
  ctx.restore();
}

export function orbit(ctx, assets, items, time, radiusX, radiusY, options = {}) {
  items.forEach((item, index) => {
    const angle = index / items.length * Math.PI * 2 - Math.PI / 2 + time * (options.speed ?? 0.06);
    const x = (options.x ?? 960) + Math.cos(angle) * radiusX;
    const y = (options.y ?? 585) + Math.sin(angle) * radiusY;
    const arrival = spring((time - index * 0.08) / 0.8);
    technology(ctx, assets, item.key, item.label, x, y, { width: item.width ?? 245, arrival, height: 80 });
  });
}

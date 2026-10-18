import { palette, clamp, circle } from "./graphics.mjs";
import { type, rounded, line, icon, smooth } from "./film-language.mjs";
import { star } from "./editorial-graphics.mjs";

export function toolToken(ctx, assets, key, x, y, size = 80, label = "") {
  circle(ctx, x, y, size / 2, "#ffffff");
  icon(ctx, assets, key, x, y, size * 0.56);
  if (label) type(ctx, label, x, y + size / 2 + 32, 24, { family: "Body", color: palette.green });
}

export function artwork(ctx, x, y, width, height, time = 0, variant = 0) {
  rounded(ctx, x, y, width, height, 3, variant % 2 === 0 ? palette.green : "#e5ebde");
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  const light = variant % 2 === 0 ? "#eef2e6" : palette.green;
  const radius = Math.min(width, height) * 0.31;
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(Math.sin(time * Math.PI) * 0.1);
  type(ctx, "O", 0, radius * 0.68, radius * 2.6, { family: "Amoria", color: light });
  star(ctx, width * 0.34, -height * 0.34, radius * 0.13, time * Math.PI, light);
  ctx.restore();
}

export function filmFrame(ctx, assets, x, y, width, height, time, index) {
  ctx.save();
  ctx.translate(x, y);
  const tilt = Math.sin(time * Math.PI / 2 + index) * 0.07;
  ctx.rotate(tilt);
  ctx.transform(Math.cos(Math.sin(time + index) * 0.24), 0.025 * Math.sin(index), 0, 1, 0, 0);
  rounded(ctx, -width / 2, -height / 2, width, height, 4, "#ffffff", true);
  artwork(ctx, -width / 2 + 18, -height / 2 + 18, width - 36, height - 82, time + index * 0.5, index);
  type(ctx, ["IMAGE", "RYTHME", "EXPLORATION", "DÉTAIL"][index % 4], -width / 2 + 22, height / 2 - 26, 25, { align: "left", family: "Body", color: palette.green });
  type(ctx, `0${index + 1}`, width / 2 - 23, height / 2 - 26, 23, { align: "right", family: "Body", color: palette.green });
  ctx.restore();
}

export function curvedLink(ctx, from, to, progress = 1, bend = 0, color = "#95ac8c") {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  for (let i = 1; i <= 60; i += 1) {
    const p = i / 60 * clamp(progress);
    ctx.lineTo(from.x + (to.x - from.x) * p, from.y + (to.y - from.y) * p + Math.sin(p * Math.PI) * bend);
  }
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.restore();
}

export function selectionFrame(ctx, x, y, width, height, progress) {
  ctx.save();
  ctx.strokeStyle = palette.green;
  ctx.lineWidth = 1.7;
  ctx.strokeRect(x, y, width, height);
  const count = Math.min(4, Math.ceil(progress * 4));
  [[x, y], [x + width, y], [x + width, y + height], [x, y + height]].slice(0, count).forEach(([px, py]) => rounded(ctx, px - 7, py - 7, 14, 14, 1, palette.green));
  ctx.restore();
}

export function drawDial(ctx, x, y, radius, time, progress) {
  ctx.save();
  ctx.translate(x, y);
  for (let i = 0; i < 48; i += 1) {
    const angle = i / 48 * Math.PI * 2;
    const inner = radius - (i % 4 === 0 ? 20 : 9);
    line(ctx, Math.cos(angle) * inner, Math.sin(angle) * inner, Math.cos(angle) * radius, Math.sin(angle) * radius, "#a1b698", i % 4 === 0 ? 2 : 1);
  }
  ctx.rotate(progress * Math.PI * 1.7 - Math.PI * 0.85);
  line(ctx, 0, 0, 0, -radius * 0.76, palette.green, 4);
  star(ctx, 0, 0, radius * 0.23, time * Math.PI);
  ctx.restore();
}

export function evolvingGrid(ctx, x, y, width, height, time, alignment) {
  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 9; column += 1) {
      const index = row * 9 + column;
      const drift = (1 - smooth(alignment)) * 100;
      const px = x + column / 8 * width + Math.sin(index * 7 + time * Math.PI) * drift;
      const py = y + row / 4 * height + Math.cos(index * 3 + time * Math.PI) * drift;
      const bright = (index + Math.floor(time * 2)) % 7 < 2;
      rounded(ctx, px - 23, py - 23, 46, 46, 6, bright ? palette.green : "#b7c9af");
    }
  }
}

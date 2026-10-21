import { palette, clamp } from "./graphics.mjs";
import { type, line, ornament } from "./film-language.mjs";

export function spring(value) {
  const p = clamp(value);
  return 1 - Math.exp(-p * 7) * Math.cos(p * 9);
}

export function star(ctx, x, y, radius, rotation = 0, color = palette.green) {
  ornament(ctx, x, y, radius, 1, rotation, color);
}

export function letters(ctx, value, x, y, size, time, options = {}) {
  const tracking = -size * 0.025;
  const accent = options.accentIndex ?? -1;
  const widths = [...value].map((letter, index) => {
    ctx.font = `${size}px "${index === accent ? "Amoria" : "Editorial"}"`;
    return ctx.measureText(letter).width + tracking;
  });
  const total = widths.reduce((sum, width) => sum + width, 0) - tracking;
  let pen = options.align === "right" ? x - total : options.align === "center" ? x - total / 2 : x;
  [...value].forEach((letter, index) => {
    const arrival = spring((time - index * (options.stagger ?? 0.0625)) / 0.42);
    ctx.save();
    ctx.beginPath();
    ctx.rect(pen - 25, y - size * 1.1, widths[index] + 50, size * 1.32);
    ctx.clip();
    ctx.translate(pen, y + size * 1.2 * (1 - arrival));
    ctx.rotate((1 - arrival) * (index % 2 ? -0.07 : 0.07));
    type(ctx, letter, 0, 0, size, { family: index === accent ? "Amoria" : "Editorial", align: "left", tracking: 0, color: index === accent ? options.accentColor ?? palette.green : options.color ?? palette.ink });
    ctx.restore();
    pen += widths[index];
  });
}

export function masthead(ctx, assets, inverse = false) {
  ctx.save();
  ctx.globalAlpha = 0.82;
  const image = inverse ? assets.logoWhite : assets.logo;
  ctx.drawImage(image, 64, 47, 35, 31);
  type(ctx, "Michel Djoumessi", 119, 72, 22, { family: "Body", align: "left", color: inverse ? palette.white : palette.ink });
  type(ctx, "Design · Code · Mouvement", 1855, 72, 22, { family: "Body", align: "right", color: inverse ? palette.pale : palette.green });
  line(ctx, 64, 106, 1855, 106, inverse ? "#a3c2b22a" : "#1e1e1e18", 1);
  ctx.restore();
}

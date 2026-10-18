import { WIDTH, HEIGHT, palette, clamp, ease, lerp, text, phone, circle } from "./graphics.mjs";
import { letters, caption, pill, spring, rule } from "./brand-graphics.mjs";
import { backdrop, signatureMark, star, disc, maskedWord, perspectivePhoto, starTransition } from "./visual-graphics.mjs";

export function visualSignature(ctx, time, assets) {
  backdrop(ctx, assets);
  signatureMark(ctx, assets);
  const leave = ease((time - 2.3) / 0.7);
  ctx.save();
  ctx.translate(685, 650);
  ctx.scale(1 + leave * 2, 1 + leave * 2);
  ctx.translate(-685, -650);
  ctx.globalAlpha = 1 - leave;
  letters(ctx, "MiCHEL", 82, 471, 345, time - 0.05, { accentIndex: 1 });
  letters(ctx, "DJOUMESSI", 1838, 790, 324, time - 0.3, { accentIndex: 2, align: "right" });
  [{ label: "Design", x: 620, width: 180 }, { label: "Développement", x: 830, width: 300 }, { label: "Animation", x: 1160, width: 220 }].forEach((item, index) => {
    const arrival = spring((time - 1 - index * 0.12) / 0.65);
    ctx.save();
    ctx.translate(item.x + item.width / 2, 925 + (1 - arrival) * 120);
    ctx.scale(Math.max(0.001, arrival), Math.max(0.001, arrival));
    pill(ctx, item.label, -item.width / 2, -31, { width: item.width, height: 62, size: 27, solid: index === 1 });
    ctx.restore();
  });
  ctx.restore();
  if (leave > 0) star(ctx, lerp(700, 960, leave), lerp(650, 540, leave), 35 + leave * 70, leave * 0.6);
  caption(ctx, "Disponible en freelance pour vous", 82, 1042, 22, palette.green);
  caption(ctx, "Paris, France", 1838, 1042, 22, palette.green, "right");
}

export function imagine(ctx, time, assets) {
  backdrop(ctx, assets);
  signatureMark(ctx, assets);
  const entry = ease(time / 0.55);
  const breathing = Math.sin(time * 1.3) * 7;
  const x = 270 - breathing;
  const y = 383 - breathing;
  const width = 1380 + breathing * 2;
  const height = 298 + breathing * 2;
  ctx.save();
  ctx.translate(960, 540);
  ctx.rotate((1 - entry) * 0.1);
  ctx.translate(-960, -540);
  maskedWord(ctx, "IMAGINER.", 614, 223, time / 0.75);
  const perimeter = 2 * (width + height);
  ctx.strokeStyle = palette.green;
  ctx.lineWidth = 1.8;
  ctx.setLineDash([perimeter, perimeter]);
  ctx.lineDashOffset = perimeter * (1 - ease((time - 0.2) / 1));
  ctx.strokeRect(x, y, width, height);
  ctx.setLineDash([]);
  [[x, y], [x + width, y], [x + width, y + height], [x, y + height]].forEach(([handleX, handleY], index) => {
    const arrival = spring((time - 0.45 - index * 0.13) / 0.65);
    ctx.fillStyle = palette.green;
    const size = 15 * arrival;
    ctx.fillRect(handleX - size / 2, handleY - size / 2, size, size);
  });
  ctx.restore();
  disc(ctx, assets, "figma", 242, 875, 112, { arrival: spring((time - 0.55) / 0.8), angle: (1 - entry) * 2 });
  caption(ctx, "Le sens du détail.", 346, 889, 42, palette.green);
  star(ctx, 1620, 270, 48 * entry, time * 0.4);
  if (time < 0.5) {
    ctx.save();
    ctx.globalAlpha = 1 - entry;
    star(ctx, 960, 540, 105 - entry * 40, 0.6 + entry);
    ctx.restore();
  }
  if (time > 2.7) starTransition(ctx, (time - 2.7) / 0.3);
}

export function flowingGallery(ctx, time, assets) {
  backdrop(ctx, assets);
  signatureMark(ctx, assets);
  maskedWord(ctx, "CRÉER.", 305, 194, (time - 0.1) / 0.7, { color: palette.green });
  const images = [assets.teamifyLaptop, assets.lookarounLaptop, assets.flowLaptop, assets.teamifyPhone, assets.lookarounLaptop];
  images.forEach((image, index) => {
    const x = 250 + index * 880 - time * 365;
    perspectivePhoto(ctx, image, 810, 480, {
      x,
      y: 646 + Math.sin(time * 0.8 + index * 1.2) * 47,
      angleY: Math.sin(time * 0.6 + index * 1.5) * 0.3,
      angleX: Math.sin(time * 0.7 + index) * 0.1,
      angleZ: Math.sin(time * 0.65 + index * 2) * 0.045,
      positionY: index === 0 || index === 3 ? 0.22 : 0.37,
    });
  });
  const arrival = ease((time - 0.4) / 1.0);
  phone(ctx, assets.zenHome, 1050 + Math.sin(time * 0.7) * 70, lerp(1500, 652, arrival), 661, -0.035 + Math.sin(time * 0.9) * 0.025);
  caption(ctx, "Des interfaces qui prennent vie.", 960, 1030, 30, palette.green, "center");
  if (time < 0.3) starTransition(ctx, 1 - time / 0.3);
  if (time > 3.7) starTransition(ctx, (time - 3.7) / 0.3);
}

export function dancingTools(ctx, time, assets) {
  backdrop(ctx, assets, true);
  signatureMark(ctx, assets, true);
  maskedWord(ctx, "DÉVELOPPER.", 286, 154, (time - 0.05) / 0.75, { color: palette.white });
  const tools = [
    { key: "nextjs", label: "Next.js", x: 405, y: 510, size: 176 },
    { key: "typescript", label: "TypeScript", x: 940, y: 475, size: 184 },
    { key: "python", label: "Python", x: 1495, y: 510, size: 195 },
    { key: "figma", label: "Figma", x: 584, y: 827, size: 156 },
    { key: "tailwind", label: "Tailwind CSS", x: 1100, y: 818, size: 172 },
    { key: "postgresql", label: "PostgreSQL", x: 1615, y: 833, size: 157 },
  ];
  tools.forEach((tool, index) => {
    const arrival = spring((time - 0.15 - index * 0.085) / 0.95);
    const leave = ease((time - 3.45) / 0.55);
    const orbitProgress = ease((time - 1.3) / 0.95);
    const alignment = ease((time - 2.55) / 0.9);
    const angle = index / tools.length * Math.PI * 2 - Math.PI / 2 + (time - 1.3) * 0.12;
    const orbitX = 960 + Math.cos(angle) * 590;
    const orbitY = 646 + Math.sin(angle) * 230;
    const targetX = lerp(lerp(tool.x, orbitX, orbitProgress), 225 + index * 292, alignment);
    const targetY = lerp(lerp(tool.y, orbitY, orbitProgress), 646 + Math.sin(index * 0.8 + time) * 19, alignment);
    const x = lerp(960, targetX, arrival) + Math.sin(time * 1.05 + index) * 10;
    const y = lerp(660, targetY, arrival) + Math.cos(time * 1.3 + index * 1.7) * 10;
    disc(ctx, assets, tool.key, lerp(x, 960, leave), lerp(y, 640, leave), tool.size * (1 - leave * 0.55), { angle: (1 - arrival) * 2.7 + Math.sin(time + index) * 0.3, arrival: Math.max(0.001, arrival), label: leave < 0.1 ? tool.label : "", inverse: true });
  });
  star(ctx, 215, 805, 35, time * -0.4, palette.pale);
  if (time > 3.7) starTransition(ctx, (time - 3.7) / 0.3, { color: palette.white });
}

import { WIDTH, HEIGHT, palette, clamp, ease, lerp, text, phone, cover, circle } from "./graphics.mjs";
import { letters, caption, pill, arrow, cursor, spring, rule } from "./brand-graphics.mjs";
import { backdrop, signatureMark, star, disc, maskedWord, photoWindow, starTransition } from "./visual-graphics.mjs";

export function livingPanels(ctx, time, assets) {
  backdrop(ctx, assets);
  signatureMark(ctx, assets);
  const weights = [0.31 + Math.sin(time * 0.9) * 0.12, 0.26 + Math.sin(time * 0.9 + 1.8) * 0.13, 0.25 + Math.sin(time * 0.9 + 3.2) * 0.1, 0.22 + Math.sin(time * 0.9 + 4.8) * 0.1];
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const images = [null, assets.teamifyLaptop, assets.lookarounLaptop, assets.flowLaptop];
  let x = 76;
  weights.forEach((weight, index) => {
    const width = weight / total * 1738;
    const arrival = ease((time - index * 0.07) / 0.65);
    const y = 149 + (1 - arrival) * (index % 2 ? 1000 : -1000);
    if (index === 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, width, 803, 14);
      ctx.clip();
      ctx.fillStyle = palette.green;
      ctx.fillRect(x, y, width, 803);
      phone(ctx, assets.zenCatalog, x + width * 0.34, y + 452, 645, -0.11);
      phone(ctx, assets.zenMovie, x + width * 0.76, y + 400, 710, 0.08);
      ctx.restore();
    } else photoWindow(ctx, images[index], x, y, width, 803, { zoom: 1.04 + Math.sin(time * 0.8 + index) * 0.02, positionY: index === 1 ? 0.25 : 0.4 });
    x += width + 10;
  });
  const words = ["FLUIDE.", "PRÉCIS.", "VIVANT."];
  const index = Math.min(2, Math.floor(time / 1.5));
  const local = time - index * 1.5;
  const size = index === 1 ? 193 : 204;
  const bandWidth = 1290 + Math.sin(time * 1.1) * 80;
  ctx.save();
  ctx.fillStyle = "#fffffff0";
  ctx.beginPath();
  ctx.roundRect(960 - bandWidth / 2, 432, bandWidth, 230, 115);
  ctx.fill();
  maskedWord(ctx, words[index], 616, size, local / 0.6, { color: palette.green });
  ctx.restore();
  if (time > 4.2) starTransition(ctx, (time - 4.2) / 0.3);
}

export function imageAndGesture(ctx, time, assets) {
  backdrop(ctx, assets);
  signatureMark(ctx, assets);
  const imageKeys = ["lookarounLaptop", "flowLaptop", "teamifyLaptop"];
  const shift = (time * 355) % (670 * imageKeys.length);
  ctx.save();
  ctx.beginPath();
  ctx.arc(490, 546, 335, 0, Math.PI * 2);
  ctx.clip();
  for (let index = -1; index < 5; index += 1) {
    const key = imageKeys[((index % imageKeys.length) + imageKeys.length) % imageKeys.length];
    cover(ctx, assets[key], { x: 155 + index * 670 - shift, y: 211, width: 672, height: 670 }, 1.02, 0.5, key === "teamifyLaptop" ? 0.22 : 0.4);
  }
  ctx.restore();
  ctx.save();
  ctx.translate(490, 540);
  ctx.rotate(Math.sin(time * 0.55) * 0.04);
  text(ctx, "O", 0, 337, 930, palette.green, { family: "Amoria", align: "center" });
  ctx.restore();
  const positions = [
    { key: "zenCatalog", x: 1078, y: 651, height: 676, rotation: -0.12 },
    { key: "zenSearch", x: 1690, y: 646, height: 657, rotation: 0.12 },
    { key: "zenHome", x: 1380, y: 572, height: 811, rotation: 0.005 },
  ];
  positions.forEach((item, index) => {
    const arrival = ease((time - index * 0.12) / 0.95);
    phone(ctx, assets[item.key], item.x + Math.sin(time * 0.9 + index) * 12, lerp(1500, item.y, arrival) + Math.sin(time * 1.3 + index) * 12, item.height, item.rotation + Math.sin(time * 0.7 + index) * 0.014);
  });
  caption(ctx, "Des expériences à ressentir.", 100, 1030, 31, palette.green);
  if (time < 0.3) starTransition(ctx, 1 - time / 0.3);
  if (time > 4.2) starTransition(ctx, (time - 4.2) / 0.3);
}

export function ideasInMotion(ctx, time, assets) {
  backdrop(ctx, assets);
  signatureMark(ctx, assets);
  maskedWord(ctx, "DES IDÉES.", 425, 185, (time - 0.12) / 0.75, { offsetX: Math.sin(time * 0.55) * 18 });
  maskedWord(ctx, "À L’ÉCRAN.", 649, 195, (time - 0.38) / 0.75, { color: palette.green, offsetX: -Math.sin(time * 0.55) * 18 });
  const tools = [
    { key: "postgresql", label: "PostgreSQL" },
    { key: "codex", label: "Codex" },
    { key: "tailwind", label: "Tailwind CSS" },
    { key: "figma", label: "Figma" },
    { key: "python", label: "Python" },
    { key: "nextjs", label: "Next.js" },
    { key: "typescript", label: "TypeScript" },
    { key: "postgresql", label: "PostgreSQL" },
    { key: "tailwind", label: "Tailwind CSS" },
    { key: "figma", label: "Figma" },
    { key: "python", label: "Python" },
    { key: "nextjs", label: "Next.js" },
    { key: "typescript", label: "TypeScript" },
  ];
  tools.forEach((tool, index) => {
    const x = 1600 - index * 320 + time * 540;
    if (x < -210 || x > 2130) return;
    const y = 865 + Math.sin(x / 700) * 14;
    disc(ctx, assets, tool.key, x, y, 137, { angle: Math.sin(time * 0.8 + index) * 0.3, label: tool.label });
  });
  star(ctx, 1705, 494, 43, time * 0.7);
  if (time < 0.3) starTransition(ctx, 1 - time / 0.3);
  if (time > 4.2) starTransition(ctx, (time - 4.2) / 0.3);
}

export function visualInvitation(ctx, time, assets) {
  backdrop(ctx, assets);
  signatureMark(ctx, assets);
  letters(ctx, "ET SI ON TRAVAILLAIT", 960, 349, 108, time - 0.05, { align: "center", stagger: 0.017 });
  letters(ctx, "ENSEMBLE ?", 960, 573, 192, time - 0.32, { align: "center", stagger: 0.03, color: palette.green });
  const arrival = spring((time - 0.95) / 0.7);
  ctx.save();
  ctx.translate(960, 741);
  ctx.scale(Math.max(0.001, arrival), Math.max(0.001, arrival));
  const press = Math.sin(clamp((time - 2.5) / 0.3) * Math.PI);
  pill(ctx, "hey-michel.me", -210, -43, { width: 360, height: 86, size: 34, solid: true });
  circle(ctx, 202, 0, 43 - press * 4, palette.green);
  arrow(ctx, 202, press * 2, 20 - press * 2, palette.white);
  ctx.restore();
  rule(ctx, 100, 919, 1820, 919, ease((time - 1.0) / 0.9), "#173f3540");
  letters(ctx, "MiCHEL", 100, 1023, 91, time - 1.2, { accentIndex: 1, stagger: 0.03 });
  letters(ctx, "DJOUMESSI", 1820, 1023, 91, time - 1.2, { accentIndex: 2, align: "right", stagger: 0.03 });
  caption(ctx, "Disponible en freelance pour vous", 960, 990, 24, palette.green, "center");
  if (time > 1.8) cursor(ctx, lerp(1520, 1164, ease((time - 1.8) / 0.7)), lerp(947, 751, ease((time - 1.8) / 0.7)), clamp((time - 2.5) / 0.3));
  if (time < 0.3) starTransition(ctx, 1 - time / 0.3);
}

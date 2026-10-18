import { WIDTH, HEIGHT, palette, clamp, ease, lerp, text, circle } from "./graphics.mjs";
import { paper, spring, masthead, caption, rule, pill, arrow, cursor, letters } from "./brand-graphics.mjs";

export function expertise(ctx, time, assets) {
  paper(ctx, assets);
  masthead(ctx, assets, "Du design à la mise en ligne");
  const skills = ["UI / UX Design", "Développement Full Stack", "API & Architecture", "Performance & Qualité"];
  const scroll = clamp((time - 0.4) / 2.1) * 3;
  const selected = Math.min(3, Math.floor(scroll + 0.5));
  ctx.save();
  ctx.beginPath();
  ctx.rect(120, 275, 1680, 570);
  ctx.clip();
  skills.forEach((skill, index) => {
    const distance = index - scroll;
    const y = 570 + distance * 142;
    const alpha = Math.max(0.12, 1 - Math.abs(distance) * 0.55);
    ctx.save();
    ctx.globalAlpha = alpha;
    text(ctx, skill, 960, y, 85 + Math.max(0, 1 - Math.abs(distance)) * 15, index === selected ? palette.green : palette.ink, { family: "Body", align: "center" });
    ctx.restore();
  });
  ctx.restore();
  rule(ctx, 160, 446, 160, 620, 1, palette.green, 2);
  rule(ctx, 1760, 446, 1760, 620, 1, palette.green, 2);
  circle(ctx, 160, 446 + (selected / 3) * 174, 8, palette.green);
  pill(ctx, "Une idée. Une expérience complète.", 660, 900, { width: 600, solid: true, dot: true });
  if (time < 0.3) {
    ctx.fillStyle = palette.green;
    ctx.fillRect(WIDTH * ease(time / 0.3), 0, WIDTH, HEIGHT);
  }
  if (time > 2.7) {
    ctx.save();
    ctx.globalAlpha = ease((time - 2.7) / 0.3);
    paper(ctx, assets);
    ctx.restore();
  }
}

export function invitation(ctx, time, assets) {
  paper(ctx, assets);
  masthead(ctx, assets, "Disponible en freelance pour vous");
  letters(ctx, "ET SI ON TRAVAILLAIT", 960, 357, 107, time - 0.05, { align: "center", stagger: 0.017 });
  letters(ctx, "ENSEMBLE ?", 960, 575, 190, time - 0.28, { align: "center", color: palette.green, stagger: 0.035 });
  const pop = spring((time - 0.8) / 0.65);
  ctx.save();
  ctx.translate(960, 713);
  ctx.scale(Math.max(0.01, pop), Math.max(0.01, pop));
  pill(ctx, "hey-michel.me", -210, -43, { width: 360, height: 86, size: 34, solid: true });
  const press = Math.sin(clamp((time - 2.05) / 0.3) * Math.PI);
  circle(ctx, 202, 0, 43 - press * 4, palette.green);
  arrow(ctx, 202, press * 2, 20 - press * 2, palette.white);
  ctx.restore();
  const arrive = ease((time - 1.2) / 0.65);
  if (time > 1.2) cursor(ctx, lerp(1510, 1164, arrive), lerp(935, 723, arrive), clamp((time - 2.05) / 0.3));
  rule(ctx, 100, 916, 1820, 916, ease((time - 0.8) / 0.9), "#173f3540");
  letters(ctx, "MiCHEL", 100, 1021, 92, time - 1.1, { accentIndex: 1, stagger: 0.03 });
  letters(ctx, "DJOUMESSI", 1820, 1021, 92, time - 1.1, { accentIndex: 2, align: "right", stagger: 0.03 });
  caption(ctx, "DESIGN & DÉVELOPPEMENT WEB", 960, 991, 22, palette.green, "center");
}

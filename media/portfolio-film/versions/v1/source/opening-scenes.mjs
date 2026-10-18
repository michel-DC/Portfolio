import { WIDTH, HEIGHT, palette, clamp, ease, lerp, text, phone, circle, cover } from "./graphics.mjs";
import { spring, paper, rule, pill, arrow, cursor, letters, caption, masthead, roundedPanel, connector } from "./brand-graphics.mjs";

export function signature(ctx, time, assets) {
  paper(ctx, assets);
  const leave = ease((time - 2.3) / 0.7);
  ctx.save();
  ctx.translate(660, 650);
  ctx.scale(1 + leave * 4, 1 + leave * 4);
  ctx.translate(-660, -650);
  ctx.globalAlpha = 1 - leave;
  ctx.drawImage(assets.logo, 34, 39, 39, 35);
  caption(ctx, "Accueil", 710, 68, 22);
  caption(ctx, "À propos", 835, 68, 22);
  caption(ctx, "Mes projets", 975, 68, 22);
  pill(ctx, "Contact", 1142, 29, { size: 22, height: 56, solid: true });
  caption(ctx, "Disponible en freelance pour vous", 78, 158, 24);
  letters(ctx, "MiCHEL", 82, 474, 345, time - 0.06, { accentIndex: 1 });
  letters(ctx, "DJOUMESSI", 1838, 795, 324, time - 0.31, { accentIndex: 2, align: "right" });
  const labels = ["LinkedIn", "GitHub", "Malt", "Mon CV"];
  const widths = [167, 158, 138, 165];
  let x = 620;
  labels.forEach((label, index) => {
    const arrival = spring((time - 0.95 - index * 0.09) / 0.65);
    ctx.save();
    ctx.translate(0, (1 - arrival) * 100);
    ctx.globalAlpha = clamp(arrival) * (1 - leave);
    pill(ctx, label, x, 888, { width: widths[index], size: 23, height: 57 });
    ctx.restore();
    x += widths[index] + 20;
  });
  caption(ctx, "PARIS, FRANCE", 1838, 1006, 19, "#1e1e1e77", "right");
  caption(ctx, "48.85° N, 2.35° E", 1838, 1040, 22, "#1e1e1eaa", "right");
  rule(ctx, 80, 978, 80, 1044, 1, "#1e1e1e30");
  rule(ctx, 80, 978, 80, 1004, ease(time / 1.2), palette.green, 2);
  ctx.restore();
  if (leave > 0) {
    ctx.save();
    ctx.globalAlpha = leave;
    text(ctx, "O", 960, 675, 380 + leave * 200, palette.green, { family: "Amoria", align: "center" });
    ctx.restore();
  }
}

export function ideaToScreen(ctx, time, assets) {
  paper(ctx, assets);
  masthead(ctx, assets, "Design & développement web", ease(time / 0.5));
  const disperse = ease(time / 0.55);
  ctx.save();
  ctx.globalAlpha = 1 - disperse;
  text(ctx, "O", 960, 675, 580 + disperse * 800, palette.green, { family: "Amoria", align: "center" });
  ctx.restore();
  letters(ctx, "VOS IDÉES.", 960, 427, 190, time - 0.2, { align: "center", stagger: 0.023 });
  letters(ctx, "À L’ÉCRAN.", 960, 642, 190, time - 0.5, { align: "center", color: palette.green, stagger: 0.024 });
  const nodes = [
    { label: "UI / UX Design", x: 290, y: 823, width: 330 },
    { label: "Développement", x: 770, y: 823, width: 370 },
    { label: "Expérience web", x: 1300, y: 823, width: 330 },
  ];
  for (let index = 0; index < 2; index += 1) {
    const from = nodes[index];
    const to = nodes[index + 1];
    connector(ctx, { x: from.x + from.width, y: 855 }, { x: to.x, y: 855 }, time - 1.1 - index * 0.3);
    if (time > 1.4 + index * 0.3) arrow(ctx, to.x - 34, 855, 13, palette.green, Math.PI / 4);
  }
  nodes.forEach((node, index) => {
    const arrival = spring((time - 0.9 - index * 0.2) / 0.65);
    ctx.save();
    ctx.translate(node.x + node.width / 2, node.y + 31);
    ctx.scale(Math.max(0.01, arrival), Math.max(0.01, arrival));
    pill(ctx, node.label, -node.width / 2, -31, { width: node.width, dot: true, solid: index === 2, shadow: true });
    ctx.restore();
  });
  if (time > 2.6) {
    const exit = ease((time - 2.6) / 0.4);
    ctx.fillStyle = palette.green;
    ctx.fillRect(0, HEIGHT * (1 - exit), WIDTH, HEIGHT * exit);
  }
}

function projectCard(ctx, project, x, y, width, height, assets) {
  roundedPanel(ctx, x, y, width, height, 12, palette.green, false);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 12);
  ctx.clip();
  cover(ctx, assets[project.background], { x, y, width, height });
  if (project.slug === "zen") {
    phone(ctx, assets.zenCatalog, x + width * 0.36, y + height * 0.58, height * 0.87, -0.1);
    phone(ctx, assets.zenHome, x + width * 0.62, y + height * 0.49, height * 0.98, 0.08);
  } else {
    cover(ctx, assets[project.image], { x: x + width * 0.09, y: y + height * 0.09, width: width * 0.82, height: height * 0.82 });
  }
  ctx.restore();
}

export function projectIndex(ctx, time, assets) {
  paper(ctx, assets);
  masthead(ctx, assets);
  const enter = ease(time / 0.6);
  const zoom = ease((time - 2.0) / 0.5);
  ctx.save();
  ctx.translate(555, 466);
  ctx.scale(1 + zoom * 1.65, 1 + zoom * 1.65);
  ctx.translate(-555, -466);
  text(ctx, "PROJETS", 102, 245, 98, palette.ink);
  circle(ctx, 590, 208, 37, palette.green);
  caption(ctx, "04", 590, 217, 29, palette.white, "center");
  caption(ctx, "Une sélection de mes réalisations", 1820, 238, 27, palette.green, "right");
  const projects = [
    { slug: "zen", title: "ZEN", background: "zenBackground", image: "zenHome", category: "Catalogue de films intelligent" },
    { slug: "teamify", title: "TEAMIFY", background: "teamifyBackground", image: "teamifyPreview", category: "Gestion événementielle" },
    { slug: "lookaroun", title: "LOOKAROUN", background: "lookarounBackground", image: "lookarounPreview", category: "Networking événementiel" },
    { slug: "flow-media", title: "FLOW MEDIA", background: "flowBackground", image: "flowPreview", category: "Agence web fictive" },
  ];
  projects.forEach((project, index) => {
    const arrival = spring((time - index * 0.12) / 0.7);
    const x = 102 + index % 2 * 887;
    const y = 290 + Math.floor(index / 2) * 377 + (1 - arrival) * 420;
    ctx.save();
    ctx.globalAlpha = clamp(arrival);
    projectCard(ctx, project, x, y, 820, 302, assets);
    caption(ctx, project.title, x, y + 337, 29);
    caption(ctx, project.category, x + 820, y + 336, 24, "#1e1e1e99", "right");
    ctx.restore();
  });
  ctx.restore();
  if (time > 0.8 && zoom < 0.95) {
    const travel = ease((time - 0.8) / 0.9);
    cursor(ctx, lerp(1680, 710, travel), lerp(970, 490, travel), clamp((time - 1.8) / 0.25));
    if (time > 1.8) circle(ctx, 710, 490, 16 + clamp((time - 1.8) / 0.35) * 70, "#173f3545", true);
  }
  if (time < 0.3) {
    ctx.fillStyle = palette.green;
    ctx.fillRect(0, 0, WIDTH, HEIGHT * (1 - ease(time / 0.3)));
  }
  if (enter > 0.99 && time > 2.3) {
    ctx.save();
    ctx.globalAlpha = ease((time - 2.3) / 0.2);
    paper(ctx, assets);
    ctx.restore();
  }
}

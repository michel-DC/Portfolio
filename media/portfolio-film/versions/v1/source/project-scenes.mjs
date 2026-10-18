import { WIDTH, HEIGHT, palette, clamp, lerp, ease, text, phone, circle } from "./graphics.mjs";
import { spring, paper, rule, pill, arrow, cursor, letters, caption, masthead, imagePanel, connector, roundedPanel } from "./brand-graphics.mjs";

function projectStage(ctx, assets, index, title, localTime, duration) {
  paper(ctx, assets);
  masthead(ctx, assets, `${String(index).padStart(2, "0")} / 04 — ${title}`);
  rule(ctx, 78, 1006, 1842, 1006, 1, "#1e1e1e25");
  rule(ctx, 78, 1006, 1842, 1006, localTime / duration, palette.green, 2);
  caption(ctx, "DESIGN & DÉVELOPPEMENT", 78, 1047, 20, "#1e1e1e88");
  caption(ctx, "PROJETS SÉLECTIONNÉS", 1842, 1047, 20, "#1e1e1e88", "right");
}

function projectExit(ctx, time, duration, enter = true) {
  if (enter && time < 0.3) {
    ctx.fillStyle = palette.green;
    ctx.fillRect(WIDTH * ease(time / 0.3), 0, WIDTH, HEIGHT);
  }
  const progress = ease((time - duration + 0.3) / 0.3);
  if (progress <= 0) return;
  ctx.fillStyle = palette.green;
  ctx.fillRect(WIDTH * (1 - progress), 0, WIDTH * progress, HEIGHT);
}

export function zen(ctx, time, assets) {
  projectStage(ctx, assets, 1, "Zen", time, 4.5);
  letters(ctx, "ZEN", 98, 345, 180, time, { stagger: 0.07 });
  caption(ctx, "Catalogue de films intelligent", 105, 402, 32, palette.green);
  ["Vos films.", "Vos envies.", "Votre cinéma."].forEach((word, index) => {
    const arrival = ease((time - 0.3 - index * 0.16) / 0.6);
    ctx.save();
    ctx.globalAlpha = arrival;
    ctx.translate((1 - arrival) * -70, 0);
    text(ctx, word, 104, 529 + index * 90, 75, index === 2 ? palette.green : palette.ink, { family: "Body" });
    ctx.restore();
  });
  const spread = ease((time - 0.65) / 1.1);
  const float = Math.sin(time * 1.7) * 8;
  phone(ctx, assets.zenCatalog, lerp(1300, 1077, spread), 605 + float, 665, -0.10 * spread, clamp(time * 2), -0.1);
  phone(ctx, assets.zenSearch, lerp(1300, 1635, spread), 605 - float, 665, 0.10 * spread, clamp(time * 2), 0.1);
  const switchView = ease((time - 2.1) / 0.25);
  const arrival = spring(time / 0.9);
  phone(ctx, assets.zenHome, 1355, lerp(1450, 560, arrival), 800, -0.015);
  phone(ctx, assets.zenMovie, 1355, lerp(1450, 560, arrival), 800, -0.015, switchView);
  const searchArrival = spring((time - 1.0) / 0.7);
  ctx.save();
  ctx.translate(0, (1 - searchArrival) * 160);
  ctx.globalAlpha = clamp(searchArrival);
  roundedPanel(ctx, 102, 793, 610, 80, 40, "#ffffff", true);
  circle(ctx, 140, 831, 11, palette.green, true);
  rule(ctx, 149, 840, 158, 849, 1, palette.green, 2);
  const query = "Wong Kar-wai";
  const count = Math.floor(clamp((time - 1.65) / 0.7) * query.length);
  caption(ctx, count ? query.slice(0, count) : "Quel film ce soir ?", 185, 843, 30, count ? palette.ink : "#1e1e1e77");
  if (time > 1.65 && time < 2.5 && Math.floor(time * 6) % 2 === 0) rule(ctx, 191 + count * 15, 813, 191 + count * 15, 848, 1, palette.green, 2);
  arrow(ctx, 662, 833, 15);
  ctx.restore();
  if (time > 2.5) {
    ctx.save();
    ctx.globalAlpha = ease((time - 2.5) / 0.35);
    pill(ctx, "Next.js", 104, 906, { size: 24, height: 52 });
    pill(ctx, "TypeScript", 269, 906, { size: 24, height: 52 });
    ctx.restore();
  }
  projectExit(ctx, time, 4.5, false);
}

export function teamify(ctx, time, assets) {
  projectStage(ctx, assets, 2, "Teamify", time, 4);
  letters(ctx, "TEAMIFY", 98, 319, 145, time - 0.05, { stagger: 0.035 });
  caption(ctx, "Gestion événementielle", 104, 376, 32, palette.green);
  ["L’événement,", "ensemble."].forEach((word, index) => {
    const arrival = ease((time - 0.35 - index * 0.2) / 0.5);
    ctx.save();
    ctx.globalAlpha = arrival;
    text(ctx, word, 104 + 65 * (1 - arrival), 520 + index * 90, 72, index === 1 ? palette.green : palette.ink, { family: "Body" });
    ctx.restore();
  });
  const eventArrival = ease((time - 1.0) / 0.6);
  ctx.save();
  ctx.globalAlpha = eventArrival;
  ctx.translate(0, (1 - eventArrival) * 80);
  roundedPanel(ctx, 104, 669, 485, 251, 18, "#ffffff", true);
  caption(ctx, "Nouvel événement", 132, 719, 31, palette.green);
  rule(ctx, 132, 747, 560, 747, ease((time - 1.3) / 0.5), "#173f3535");
  caption(ctx, "Inviter l’équipe", 132, 792, 27);
  ["M", "A", "L"].forEach((initial, index) => {
    const member = spring((time - 1.55 - index * 0.18) / 0.55);
    circle(ctx, 157 + index * 60, 851, Math.max(0.1, 25 * member), index === 0 ? palette.green : "#e4ece8");
    ctx.save();
    ctx.globalAlpha = clamp(member);
    caption(ctx, initial, 157 + index * 60, 860, 23, index === 0 ? palette.white : palette.green, "center");
    ctx.restore();
  });
  if (time > 2.3) {
    const check = ease((time - 2.3) / 0.5);
    rule(ctx, 475, 846, 489, 860, check, palette.green, 4);
    rule(ctx, 489, 860, 519, 826, clamp((time - 2.45) / 0.4), palette.green, 4);
  }
  ctx.restore();
  const arrival = spring(time / 0.9);
  const second = ease((time - 1.65) / 0.8);
  const x = lerp(2100, 800, arrival) - second * 60;
  imagePanel(ctx, assets.teamifyLaptop, x, 260, 1010, 590, { rotation: (1 - arrival) * 0.12 - second * 0.025, positionY: 0.18, zoom: 1.01 });
  const destinations = [{ x: 915, y: 205 }, { x: 1640, y: 211 }, { x: 1030, y: 927 }];
  const origins = [{ x: x + 180, y: 260 }, { x: x + 840, y: 260 }, { x: x + 380, y: 850 }];
  destinations.forEach((node, index) => {
    connector(ctx, origins[index], node, time - 0.75 - index * 0.25, index % 2 ? -15 : 15);
  });
  ["Événements", "Équipes", "Temps réel"].forEach((label, index) => {
    const node = destinations[index];
    const pop = spring((time - 0.8 - index * 0.25) / 0.6);
    ctx.save();
    ctx.translate(node.x, node.y);
    ctx.scale(Math.max(0.01, pop), Math.max(0.01, pop));
    pill(ctx, label, -125, -30, { width: 250, solid: index === 2, dot: true, shadow: true });
    ctx.restore();
  });
  imagePanel(ctx, assets.teamifyPhone, 1460 + (1 - second) * 600, 505 + (1 - second) * 200, 330, 440, { rotation: 0.065 * second, zoom: 1.02 });
  if (time > 2.4) cursor(ctx, 1160 + 90 * ease((time - 2.4) / 0.6), 950 - 26 * ease((time - 2.4) / 0.6), clamp((time - 3) / 0.3));
  projectExit(ctx, time, 4);
}

export function lookaroun(ctx, time, assets) {
  projectStage(ctx, assets, 3, "Lookaroun", time, 4);
  letters(ctx, "LOOKAROUN", 96, 297, 138, time - 0.05, { stagger: 0.025 });
  const arrival = spring(time / 0.85);
  const travel = ease((time - 1.8) / 1.3);
  imagePanel(ctx, assets.lookarounLaptop, 100 - (1 - arrival) * 1200, 366, 1050 - travel * 120, 552, { rotation: (1 - arrival) * -0.08, positionY: 0.45 });
  imagePanel(ctx, assets.lookarounPhone, 760 + (1 - travel) * 600, 593 + (1 - travel) * 550, 300, 360, { rotation: -0.05 * travel, zoom: 1.02 });
  caption(ctx, "Networking événementiel", 1190, 318, 29, palette.green);
  letters(ctx, "CRÉER", 1190, 480, 106, time - 0.4, { stagger: 0.04 });
  letters(ctx, "DU LIEN.", 1190, 606, 106, time - 0.6, { color: palette.green, stagger: 0.04 });
  const center = { x: 1475, y: 800 };
  const nodes = [{ x: 1220, y: 738 }, { x: 1760, y: 725 }, { x: 1745, y: 929 }, { x: 1270, y: 944 }];
  nodes.forEach((node, index) => {
    connector(ctx, node, center, time - 0.9 - index * 0.1, index % 2 ? -65 : 65);
    const nodeScale = spring((time - 1 - index * 0.1) / 0.6);
    circle(ctx, node.x, node.y, Math.max(0.1, 15 * nodeScale), palette.green);
    circle(ctx, node.x, node.y, Math.max(0.1, 28 * nodeScale), "#173f3535", true);
  });
  const pop = spring((time - 0.8) / 0.8);
  ctx.save();
  ctx.translate(center.x, center.y);
  ctx.scale(Math.max(0.01, pop), Math.max(0.01, pop));
  circle(ctx, 0, 0, 70, palette.green);
  arrow(ctx, 0, 0, 30, palette.white);
  ctx.restore();
  projectExit(ctx, time, 4);
}

export function flowMedia(ctx, time, assets) {
  projectStage(ctx, assets, 4, "Flow Media", time, 4.5);
  letters(ctx, "FLOW MEDIA", 98, 293, 139, time, { stagger: 0.025 });
  caption(ctx, "De la maquette au site.", 104, 356, 35, palette.green);
  const reveal = ease((time - 0.8) / 1.0);
  const x = 104;
  const y = 427;
  const width = 1080;
  const height = 510;
  roundedPanel(ctx, x, y, width, height, 12, "#ffffff", true);
  const build = ease(time / 0.8);
  rule(ctx, x + 30, y + 64, x + width - 30, y + 64, build, "#173f3540");
  [0, 1, 2].forEach((index) => {
    ctx.strokeStyle = "#173f3540";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 30 + index * 345, y + 103, 312 * build, 335 * build);
  });
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width * reveal, height);
  ctx.clip();
  imagePanel(ctx, assets.flowLaptop, x, y, width, height, { zoom: 1.02, positionY: 0.38 });
  ctx.restore();
  if (reveal < 1 && reveal > 0) {
    rule(ctx, x + width * reveal, y - 17, x + width * reveal, y + height + 17, 1, palette.green, 3);
    circle(ctx, x + width * reveal, y - 17, 7, palette.green);
    circle(ctx, x + width * reveal, y + height + 17, 7, palette.green);
  }
  const mobile = spring((time - 1.7) / 0.9);
  imagePanel(ctx, assets.flowPhone, 1240 + (1 - mobile) * 700, 420, 515, 510, { rotation: (1 - mobile) * 0.1, zoom: 1.01 });
  [{ label: "Maquette", x: 1110 }, { label: "Intégration", x: 1344 }, { label: "Responsive", x: 1598 }].forEach((tab, index) => {
    const pop = ease((time - 0.3 - index * 0.55) / 0.5);
    ctx.save();
    ctx.globalAlpha = pop;
    pill(ctx, tab.label, tab.x, 315 - (1 - pop) * 40, { width: index === 0 ? 210 : 230, size: 25, height: 58, solid: time > 2 && index === 2 });
    ctx.restore();
  });
  if (time > 2.35) cursor(ctx, lerp(1750, 1700, ease((time - 2.35) / 0.5)), lerp(700, 353, ease((time - 2.35) / 0.5)), clamp((time - 2.9) / 0.25));
  projectExit(ctx, time, 4.5);
}

import { palette, clamp, ease, lerp, phone, circle } from "./graphics.mjs";
import { letters, caption, pill, rule, spring } from "./brand-graphics.mjs";
import { stage, symbolTile, route, codePanel, projectProof, wipe, check } from "./motion-graphics.mjs";

export function backend(ctx, time, assets) {
  stage(ctx, assets, "Données · Services Python · API", 12 + time);
  letters(ctx, "PYTHON.", 100, 291, 153, time - 0.05, { stagger: 0.045 });
  caption(ctx, "Des données à l’expérience.", 1838, 273, 42, palette.green, "right");
  const compact = ease((time - 3.35) / 1.0);
  const enter = spring(time / 0.8);
  const codeScale = lerp(1, 0.82, compact);
  ctx.save();
  ctx.translate(100 + (1 - enter) * -800, 388 - compact * 30);
  ctx.scale(codeScale, codeScale);
  codePanel(ctx, 0, 0, 640, 358, "catalogue.py", [
    { value: "def enrichir(film):", accent: true },
    { value: '    infos = details(film["id"])' },
    { value: "    return film | infos", accent: true },
    { value: "" },
    { value: "catalogue = [enrichir(film)" },
    { value: "             for film in films]", accent: true },
  ], time - 0.2, { fontSize: 25, lineHeight: 43, label: "Python" });
  ctx.restore();
  const centerX = 1005;
  const centerY = lerp(566, 496, compact);
  const tileSize = lerp(210, 172, compact);
  const sourceX = 100 + 640 * codeScale;
  const sourceY = 388 - compact * 30 + 180 * codeScale;
  const sourceRoute = [{ x: sourceX, y: sourceY }, { x: sourceX + 85, y: sourceY }, { x: centerX - 150, y: centerY }, { x: centerX - tileSize / 2, y: centerY }];
  route(ctx, sourceRoute, ease((time - 0.65) / 0.9), time, { particles: 2 });
  const phoneX = lerp(1630, 1705, compact);
  const phoneY = lerp(633, 600, compact);
  const phoneHeight = lerp(630, 550, compact);
  route(ctx, [{ x: centerX + tileSize / 2, y: centerY }, { x: 1230, y: centerY }, { x: 1290, y: phoneY }, { x: phoneX - phoneHeight * 0.245, y: phoneY }], ease((time - 1.25) / 0.9), time + 0.1, { particles: 3 });
  symbolTile(ctx, assets, "python", centerX, centerY, tileSize, "Services Python", spring((time - 0.2) / 0.75));
  const fastApi = ease((time - 0.7) / 0.55);
  ctx.save();
  ctx.globalAlpha = fastApi;
  pill(ctx, "FastAPI", centerX - 103, centerY + tileSize / 2 + 66, { width: 206, height: 54, size: 25, solid: true });
  ctx.restore();
  const phoneArrival = spring((time - 1.0) / 0.95);
  phone(ctx, assets.zenMovie, phoneX + (1 - phoneArrival) * 650, phoneY, phoneHeight, 0.025);
  caption(ctx, "Zen · Fiches enrichies", phoneX, phoneY + phoneHeight / 2 + 40, 26, palette.green, "center");
  const status = Math.min(2, Math.floor(Math.max(0, time - 0.7) / 0.85));
  if (time > 0.7) {
    const statusLabels = ["Recevoir", "Enrichir", "Restituer"];
    statusLabels.forEach((label, index) => {
      const x = 225 + index * 210;
      const p = ease((time - 0.7 - index * 0.85) / 0.4);
      ctx.save();
      ctx.globalAlpha = p * (1 - compact);
      circle(ctx, x - 55, 837, 17, index <= status ? palette.green : "#d6dfda");
      if (p > 0.5) check(ctx, x - 55, 837, p, 11, palette.white);
      caption(ctx, label, x - 22, 846, 29, palette.green);
      ctx.restore();
    });
  }
  const database = spring((time - 3.8) / 0.85);
  if (time > 3.8) {
    ctx.save();
    ctx.translate(0, 380 * (1 - database));
    ctx.globalAlpha = clamp(database);
    rule(ctx, 100, 738, 1350, 738, ease((time - 3.8) / 0.7), "#173f3525");
    caption(ctx, "ORGANISER LES DONNÉES", 100, 783, 24, palette.green);
    symbolTile(ctx, assets, "postgresql", 220, 867, 106, "", 1);
    caption(ctx, "PostgreSQL", 220, 966, 27, palette.green, "center");
    route(ctx, [{ x: 273, y: 867 }, { x: 350, y: 867 }, { x: 410, y: 867 }, { x: 485, y: 867 }], ease((time - 4.3) / 0.65), time);
    pill(ctx, "Prisma", 485, 830, { width: 210, height: 74, size: 31 });
    route(ctx, [{ x: 695, y: 867 }, { x: 820, y: 867 }, { x: 947, y: 867 }, { x: 1117, y: 867 }], ease((time - 4.8) / 0.65), time + 0.2, { particles: 3 });
    caption(ctx, "Organisations · rôles", 885, 941, 26, palette.green, "center");
    projectProof(ctx, assets, "teamifyLaptop", "Teamify · Données structurées", 1120, 759, 370, 240, { positionY: 0.18, rotation: -0.025 });
    ctx.restore();
  }
  if (time < 0.32) wipe(ctx, time / 0.32, true);
  if (time > 7.18) wipe(ctx, (time - 7.18) / 0.32);
}

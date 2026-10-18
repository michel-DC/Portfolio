import { palette, clamp, ease, lerp, circle } from "./graphics.mjs";
import { letters, caption, pill, roundedPanel, spring, cursor, rule } from "./brand-graphics.mjs";
import { stage, symbolTile, route, codePanel, check, wipe } from "./motion-graphics.mjs";

export function assistedDevelopment(ctx, time, assets) {
  stage(ctx, assets, "Codex · Intention · Revue · Vérification", 19.5 + time);
  letters(ctx, "L’IA POUR CONSTRUIRE.", 960, 274, 105, time - 0.04, { align: "center", stagger: 0.019 });
  caption(ctx, "Le jugement pour livrer.", 960, 341, 45, palette.green, "center");
  const arrival = spring(time / 0.8);
  const review = ease((time - 4.0) / 0.9);
  const centerX = lerp(920, 470, review);
  const centerY = 580;
  const inputX = lerp(103, -550, review);
  ctx.save();
  ctx.translate(0, 150 * (1 - arrival));
  roundedPanel(ctx, inputX, 448, 460, 278, 20, "#ffffff", true);
  caption(ctx, "01 / INTENTION", inputX + 28, 494, 23, palette.green);
  caption(ctx, "Une interface claire.", inputX + 28, 563, 35);
  caption(ctx, "Des mouvements utiles.", inputX + 28, 612, 32);
  pill(ctx, "Accessible au clavier", inputX + 28, 648, { width: 355, height: 51, size: 23, dot: true });
  ctx.restore();
  route(ctx, [{ x: inputX + 460, y: 587 }, { x: inputX + 570, y: 587 }, { x: centerX - 175, y: 580 }, { x: centerX - 92, y: 580 }], ease((time - 0.6) / 0.8), time, { particles: 3 });
  symbolTile(ctx, assets, "codex", centerX, centerY, 184, "Codex", spring((time - 0.45) / 0.8));
  const panelX = lerp(1210, 810, review);
  const panelWidth = lerp(600, 1004, review);
  route(ctx, [{ x: centerX + 92, y: 580 }, { x: centerX + 240, y: 580 }, { x: panelX - 130, y: 580 }, { x: panelX, y: 580 }], ease((time - 1.2) / 0.9), time + 0.5, { particles: 3 });
  const lines = [
    { value: "const shouldReduceMotion =", accent: true },
    { value: "  useReducedMotion();", accent: true },
    { value: "initial={shouldReduceMotion" },
    { value: "  ? false" },
    { value: "  : { opacity: 0, y: 20 }}", accent: true },
  ];
  ctx.save();
  ctx.translate((1 - ease((time - 1.0) / 0.7)) * 650, 0);
    codePanel(ctx, panelX, 431, panelWidth, 335, "hero-section.tsx", lines, time - 1.3, { fontSize: lerp(23, 31, review), lineHeight: 43, label: time < 4 ? "Proposition" : time < 6.2 ? "Revue de Michel" : "Vérification" });
  ctx.restore();
  if (time > 2.3) {
    const highlight = ease((time - 2.3) / 0.6);
    ctx.save();
    ctx.globalAlpha = highlight * (1 - review);
    pill(ctx, "Respecter la réduction des mouvements", 1110, 790, { width: 710, height: 64, size: 29, solid: true, dot: true });
    ctx.restore();
  }
  if (time > 4) {
    const human = spring((time - 4.25) / 0.75);
    ctx.save();
    ctx.globalAlpha = clamp(human);
    roundedPanel(ctx, 106, 734 + 180 * (1 - human), 600, 235, 20, "#ffffff", true);
    ctx.drawImage(assets.logo, 136, 767, 47, 42);
    caption(ctx, "Michel · Revue", 205, 800, 34, palette.green);
    caption(ctx, "Je choisis. Je vérifie.", 136, 861, 39);
    caption(ctx, "La décision reste humaine.", 136, 915, 28, palette.green);
    ctx.restore();
  }
  const checks = ["Lisibilité", "Accessibilité", "Comportement"];
  if (time > 4.6) {
    checks.forEach((label, index) => {
      const p = ease((time - 4.65 - index * 0.55) / 0.45);
      ctx.save();
      ctx.globalAlpha = p;
      const x = 925 + index * 310;
      roundedPanel(ctx, x - 110, 827, 280, 76, 38, "#ffffff", false);
      circle(ctx, x - 70, 865, 17, palette.green);
      check(ctx, x - 70, 865, p, 10, palette.white);
      caption(ctx, label, x - 40, 875, 25);
      ctx.restore();
    });
  }
  const phases = ["Intention", "Proposition", "Revue", "Vérification"];
  phases.forEach((label, index) => {
    const active = Math.min(3, Math.floor(time / 2));
    const x = 485 + index * 310;
    if (index < 3) rule(ctx, x + 96, 990, x + 212, 990, ease((time - index * 2) / 1.4), "#173f3540");
    caption(ctx, label, x, 998, 26, index <= active ? palette.green : "#1e1e1e55", "center");
  });
  if (time > 5.15 && time < 7.5) cursor(ctx, lerp(1710, 1550, ease((time - 5.15) / 0.65)), lerp(980, 865, ease((time - 5.15) / 0.65)), clamp((time - 6.35) / 0.3));
  if (time < 0.32) wipe(ctx, time / 0.32, true);
  if (time > 7.68) wipe(ctx, (time - 7.68) / 0.32);
}

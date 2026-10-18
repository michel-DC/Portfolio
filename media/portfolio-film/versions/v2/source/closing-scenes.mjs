import { palette, clamp, ease, lerp, text, circle } from "./graphics.mjs";
import { letters, caption, pill, arrow, spring, cursor } from "./brand-graphics.mjs";
import { stage, projectProof, technology, route, wipe } from "./motion-graphics.mjs";

export function convergence(ctx, time, assets) {
  stage(ctx, assets, "Des compétences qui deviennent des produits", 27.5 + time);
  letters(ctx, "DU BESOIN AU PRODUIT.", 960, 279, 119, time - 0.05, { align: "center", stagger: 0.016 });
  const proofs = [
    { key: "zenMovie", label: "Zen · Python / Next.js", x: 85, y: 387, width: 435, height: 301, rotation: -0.045 },
    { key: "teamifyLaptop", label: "Teamify · TypeScript / Prisma", x: 1410, y: 387, width: 435, height: 301, rotation: 0.045, positionY: 0.18 },
    { key: "lookarounLaptop", label: "Lookaroun · React", x: 210, y: 731, width: 390, height: 242, rotation: 0.035 },
    { key: "flowLaptop", label: "Flow Media · PHP", x: 1320, y: 731, width: 410, height: 242, rotation: -0.035 },
  ];
  const edges = [
    [{ x: 740, y: 405 }, { x: 740, y: 330 }, { x: 1250, y: 330 }, { x: 1460, y: 432 }],
    [{ x: 716, y: 812 }, { x: 620, y: 812 }, { x: 650, y: 590 }, { x: 503, y: 590 }],
    [{ x: 1220, y: 812 }, { x: 1300, y: 1050 }, { x: 410, y: 1060 }, { x: 360, y: 690 }],
    [{ x: 1120, y: 420 }, { x: 1100, y: 470 }, { x: 1020, y: 510 }, { x: 960, y: 540 }],
  ];
  edges.forEach((points, index) => route(ctx, points, ease((time - 0.4 - index * 0.13) / 0.8), time + index * 0.3, { particles: 2 }));
  ctx.save();
  circle(ctx, 960, 605, 205, "#ffffffc9");
  ctx.translate(960, 607);
  ctx.rotate(Math.sin(time * 0.7) * 0.04);
  text(ctx, "O", 0, 106, 300, palette.green, { family: "Amoria", align: "center" });
  ctx.restore();
  proofs.forEach((proof, index) => {
    const arrival = spring((time - index * 0.12) / 0.85);
    const x = proof.x + (1 - arrival) * (index % 2 ? 900 : -900);
    const y = proof.y + Math.sin(time * 1.1 + index) * 5;
    projectProof(ctx, assets, proof.key, proof.label, x, y, proof.width, proof.height, { rotation: proof.rotation + (1 - arrival) * 0.1, positionY: proof.positionY });
  });
  const tools = [
    { key: "typescript", label: "TypeScript", x: 735, y: 406, width: 275 },
    { key: "codex", label: "Codex", x: 1170, y: 420, width: 245 },
    { key: "nextjs", label: "Next.js", x: 740, y: 812, width: 235 },
    { key: "python", label: "Python", x: 1190, y: 812, width: 245 },
  ];
  tools.forEach((tool, index) => technology(ctx, assets, tool.key, tool.label, tool.x, tool.y, { width: tool.width, height: 80, arrival: spring((time - 0.5 - index * 0.1) / 0.7) }));
  caption(ctx, "Concevoir. Relier. Vérifier. Donner vie.", 960, 970, 27, palette.green, "center");
  if (time < 0.32) wipe(ctx, time / 0.32, true);
  if (time > 4.18) wipe(ctx, (time - 4.18) / 0.32);
}

export function invitation(ctx, time, assets) {
  stage(ctx, assets, "Disponible en freelance pour vous", 32 + time);
  letters(ctx, "FULLSTACK. PYTHON. IA.", 960, 339, 116, time - 0.05, { align: "center", stagger: 0.017 });
  letters(ctx, "POUR VOS IDÉES.", 960, 540, 157, time - 0.3, { align: "center", stagger: 0.025, color: palette.green });
  const tools = [{ key: "typescript", label: "TypeScript", x: 630, width: 275 }, { key: "python", label: "Python", x: 960, width: 245 }, { key: "codex", label: "Codex", x: 1270, width: 245 }];
  tools.forEach((tool, index) => technology(ctx, assets, tool.key, tool.label, tool.x, 663, { width: tool.width, height: 78, arrival: spring((time - 0.8 - index * 0.12) / 0.65) }));
  const arrival = spring((time - 1.25) / 0.65);
  const press = Math.sin(clamp((time - 2.65) / 0.3) * Math.PI);
  ctx.save();
  ctx.translate(960, 823);
  ctx.scale(Math.max(0.001, arrival), Math.max(0.001, arrival));
  pill(ctx, "hey-michel.me", -210, -43, { width: 360, height: 86, size: 34, solid: true });
  circle(ctx, 202, 0, 43 - press * 4, palette.green);
  arrow(ctx, 202, press * 2, 20 - press * 2, palette.white);
  ctx.restore();
  letters(ctx, "MiCHEL", 100, 978, 91, time - 1.1, { accentIndex: 1, stagger: 0.03 });
  letters(ctx, "DJOUMESSI", 1820, 978, 91, time - 1.1, { accentIndex: 2, align: "right", stagger: 0.03 });
  if (time > 1.8) cursor(ctx, lerp(1540, 1164, ease((time - 1.8) / 0.7)), lerp(970, 833, ease((time - 1.8) / 0.7)), clamp((time - 2.65) / 0.3));
  if (time < 0.32) wipe(ctx, time / 0.32, true);
}

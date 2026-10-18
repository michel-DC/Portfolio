import { palette, clamp, ease, lerp, text, phone } from "./graphics.mjs";
import { letters, caption, spring, cursor } from "./brand-graphics.mjs";
import { stage, technology, route, codePanel, projectProof, wipe } from "./motion-graphics.mjs";

export function signature(ctx, time, assets) {
  stage(ctx, assets, "Développeur fullstack · Python · IA", time);
  const leave = ease((time - 2.4) / 0.6);
  ctx.save();
  ctx.translate(680, 660);
  ctx.scale(1 + leave * 3, 1 + leave * 3);
  ctx.translate(-680, -660);
  ctx.globalAlpha = 1 - leave;
  letters(ctx, "MiCHEL", 82, 461, 345, time - 0.05, { accentIndex: 1 });
  letters(ctx, "DJOUMESSI", 1838, 780, 324, time - 0.28, { accentIndex: 2, align: "right" });
  const badges = [{ key: "typescript", label: "TypeScript", x: 630, width: 280 }, { key: "python", label: "Python", x: 960, width: 245 }, { key: "codex", label: "Codex", x: 1270, width: 245 }];
  badges.forEach((badge, index) => technology(ctx, assets, badge.key, badge.label, badge.x, 919, { width: badge.width, arrival: spring((time - 1 - index * 0.12) / 0.6) }));
  ctx.restore();
  if (leave > 0) {
    ctx.save();
    ctx.globalAlpha = leave;
    text(ctx, "O", 960, 697, lerp(380, 280, leave), palette.green, { family: "Amoria", align: "center" });
    ctx.restore();
  }
}

export function ecosystem(ctx, time, assets) {
  stage(ctx, assets, "Des outils choisis pour leurs usages", 3 + time);
  letters(ctx, "CONCEVOIR. DÉVELOPPER.", 960, 267, 108, time - 0.06, { align: "center", stagger: 0.014 });
  const items = [
    { key: "typescript", label: "TypeScript", width: 275 },
    { key: "nextjs", label: "Next.js", width: 250 },
    { key: "python", label: "Python", width: 245 },
    { key: "codex", label: "Codex", width: 245 },
    { key: "postgresql", label: "PostgreSQL", width: 285 },
    { key: "tailwind", label: "Tailwind CSS", width: 300 },
    { key: "figma", label: "Figma", width: 230 },
  ];
  const positions = items.map((item, index) => {
    const angle = index / items.length * Math.PI * 2 - Math.PI / 2 + time * 0.055;
    return { ...item, x: 960 + Math.cos(angle) * 650, y: 600 + Math.sin(angle) * 260 };
  });
  positions.forEach((node, index) => {
    route(ctx, [{ x: 960, y: 595 }, { x: 960, y: node.y }, { x: node.x, y: 595 }, { x: node.x, y: node.y }], ease((time - 0.2 - index * 0.07) / 0.8), time + index * 0.4, { particles: 1 });
  });
  ctx.save();
  ctx.fillStyle = "#ffffffc9";
  ctx.beginPath();
  ctx.arc(960, 588, 170, 0, Math.PI * 2);
  ctx.fill();
  ctx.translate(960, 595);
  ctx.rotate(Math.sin(time * 0.8) * 0.035);
  text(ctx, "O", 0, 102, 280, palette.green, { family: "Amoria", align: "center" });
  ctx.restore();
  positions.forEach((node, index) => technology(ctx, assets, node.key, node.label, node.x, node.y, { width: node.width, arrival: spring((time - 0.16 - index * 0.08) / 0.8) }));
  caption(ctx, "Une intention. Des choix techniques. Une expérience.", 960, 972, 31, palette.green, "center");
  if (time > 3.18) wipe(ctx, (time - 3.18) / 0.32);
}

export function frontend(ctx, time, assets) {
  stage(ctx, assets, "Interfaces · TypeScript · Next.js", 6.5 + time);
  letters(ctx, "DONNER FORME.", 100, 284, 134, time - 0.03, { stagger: 0.025 });
  caption(ctx, "Des types aux composants. Des composants aux usages.", 108, 340, 33, palette.green);
  const arrival = spring(time / 0.85);
  ctx.save();
  ctx.translate((1 - arrival) * -950, 0);
  codePanel(ctx, 104, 390, 760, 475, "project-gallery.tsx", [
    { value: "interface GalleryProject {", accent: true },
    { value: "  title: string;" },
    { value: "  slug: string;" },
    { value: "  image: string;" },
    { value: "}" },
    { value: "projects.map((project) => (", accent: true },
    { value: "  <ProjectCard" },
    { value: "    key={project.slug}", accent: true },
    { value: "    project={project} />" },
    { value: "));", accent: true },
  ], time - 0.25, { fontSize: 24, lineHeight: 34, label: "TypeScript" });
  ctx.restore();
  const first = spring((time - 0.65) / 0.9);
  const second = ease((time - 1.15) / 0.9);
  projectProof(ctx, assets, "teamifyLaptop", "Teamify · Interface", 945 + (1 - first) * 850, 400, 440, 300, { rotation: -0.045 + Math.sin(time) * 0.006, positionY: 0.21 });
  projectProof(ctx, assets, "lookarounLaptop", "Lookaroun · Parcours", 970 - (1 - second) * 450, 715 + (1 - second) * 450, 440, 260, { rotation: 0.045 });
  const phoneArrival = spring((time - 0.8) / 1);
  const y = lerp(1400, 631, phoneArrival);
  phone(ctx, assets.zenHome, 1600, y, 675, -0.025);
  const result = ease((time - 3.3) / 0.3);
  phone(ctx, assets.zenMovie, 1600, y, 675, -0.025, result);
  route(ctx, [{ x: 864, y: 623 }, { x: 909, y: 623 }, { x: 900, y: 355 }, { x: 1090, y: 355 }], ease((time - 1.1) / 0.8), time, { particles: 2 });
  const tools = [{ key: "typescript", label: "TypeScript", x: 250, width: 280 }, { key: "nextjs", label: "Next.js", x: 530, width: 225 }, { key: "tailwind", label: "Tailwind CSS", x: 815, width: 300 }];
  tools.forEach((tool, index) => technology(ctx, assets, tool.key, tool.label, tool.x, 940, { width: tool.width, height: 76, arrival: spring((time - 0.55 - index * 0.18) / 0.6) }));
  caption(ctx, "Zen · Mobile", 1600, 992, 25, palette.green, "center");
  if (time > 2.3 && time < 4.9) cursor(ctx, lerp(1300, 1660, ease((time - 2.3) / 0.8)), lerp(1000, 790, ease((time - 2.3) / 0.8)), clamp((time - 3.25) / 0.25));
  if (time < 0.32) wipe(ctx, time / 0.32, true);
  if (time > 5.18) wipe(ctx, (time - 5.18) / 0.32);
}

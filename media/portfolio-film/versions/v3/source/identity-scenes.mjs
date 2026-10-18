import { palette, clamp, circle } from "./graphics.mjs";
import { type, pose, cue, smooth, mix, rounded, line, icon, pointer } from "./film-language.mjs";
import { letters, star } from "./editorial-graphics.mjs";
import { motionTiming } from "./motion-plan.mjs";

function projectedPoint(x, y, z, spin) {
  const rx = x * Math.cos(spin) + z * Math.sin(spin);
  const rz = -x * Math.sin(spin) + z * Math.cos(spin);
  const tilt = 0.16;
  const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
  const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
  const ratio = 1700 / (1700 + depth);
  return { x: 960 + rx * ratio, y: 560 + ry * ratio };
}

function foldingPanel(ctx, assets, index, time) {
  const angle = Math.sin(time * Math.PI + index * Math.PI / 2) * 0.62;
  const spin = -0.18 + Math.sin(time * Math.PI / 2) * 0.16;
  const base = (index - 1) * 440;
  const local = (x, y) => projectedPoint(base + x * Math.cos(angle), y, x * Math.sin(angle) + (index - 1) * 70, spin);
  const points = [local(-195, -235), local(195, -235), local(195, 275), local(-195, 275)];
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  ctx.fillStyle = ["#e3ebd8", "#fff", "#b9cdb0"][index];
  ctx.fill();
  ctx.strokeStyle = "#658867";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  const [a, b, , d] = points;
  ctx.save();
  ctx.transform((b.x - a.x) / 390, (b.y - a.y) / 390, (d.x - a.x) / 510, (d.y - a.y) / 510, a.x, a.y);
  for (let i = 0; i < 3; i += 1) circle(ctx, 20 + i * 16, 25, 3, "#89a17f");
  line(ctx, 0, 50, 390, 50, "#bacab0", 1);
  icon(ctx, assets, index === 1 ? "logo" : index === 0 ? "figma" : "nextjs", 195, 220, 135);
  type(ctx, ["DESIGN", "MOTION", "WEB"][index], 195, 370, 48);
  for (let i = 0; i < 3; i += 1) rounded(ctx, 40, 405 + i * 25, 310 - i * 55, 8, 4, "#a7bda0");
  ctx.restore();
}

export function dimension(ctx, time, assets) {
  ctx.fillStyle = palette.green;
  ctx.fillRect(0, 0, 1920, 1080);
  const exit = smooth((time - 2.73) / 0.27);
  type(ctx, "DU MOUVEMENT.", 960, 232, 130, { color: "#ffffff" });
  pose(ctx, time, (t) => ({ y: 540, scale: 0.4 + cue(t, 0, 0.4) * 0.6 + exit * 2, rotation: exit * -0.16, alpha: 1 - exit }), () => {
    ctx.translate(-960, -540);
    [0, 2, 1].forEach((index) => foldingPanel(ctx, assets, index, time));
  }, time < 0.4 || time > 2.73);
  const codex = cue(time, motionTiming.dimension.tool, 0.18) * (1 - smooth((time - motionTiming.dimension.toolExit) / 0.18));
  if (codex > 0) {
    ctx.save();
    ctx.globalAlpha = codex;
    rounded(ctx, 635, 950 + (1 - codex) * 90, 650, 72, 36, "#102f25");
    icon(ctx, assets, "codex", 680, 986 + (1 - codex) * 90, 36);
    type(ctx, "Codex parmi mes outils de création", 1000, 997 + (1 - codex) * 90, 28, { color: "#f3f3e9", family: "Body" });
    ctx.restore();
  } else if (time > 1.5) type(ctx, "Et du relief.", 960, 980, 42, { color: palette.pale, family: "Body" });
}

const tools = [
  { key: "figma", name: "Figma" },
  { key: "nextjs", name: "Next.js" },
  { key: "typescript", name: "TypeScript" },
  { key: "python", name: "Python" },
  { key: "postgresql", name: "PostgreSQL" },
  { key: "tailwind", name: "Tailwind CSS" },
];

function toolPosition(time) {
  const step = Math.floor(time / motionTiming.roll.step);
  return Math.min(5, step + smooth((time % motionTiming.roll.step - motionTiming.roll.hold) / motionTiming.roll.travel));
}

export function toolRoll(ctx, time, assets) {
  type(ctx, "LES OUTILS.", 960, 205, 110, { color: palette.green });
  const position = toolPosition(time);
  ctx.save();
  ctx.beginPath();
  ctx.rect(100, 260, 1720, 640);
  ctx.clip();
  tools.forEach((tool, index) => {
    const distance = index - position;
    const alpha = clamp(1 - Math.abs(distance) * 0.75);
    if (alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    pose(ctx, time, (t) => ({ x: 960, y: 570 + (index - toolPosition(t)) * 320, scale: 1 - Math.min(0.12, Math.abs(distance) * 0.1) }), () => {
      ctx.font = '110px "Body"';
      const labelWidth = ctx.measureText(tool.name).width;
      circle(ctx, -labelWidth / 2 - 80, -35, 84, "#fff");
      icon(ctx, assets, tool.key, -labelWidth / 2 - 80, -35, 92);
      type(ctx, tool.name, 90, 0, 110, { family: "Body" });
    }, time % motionTiming.roll.step > motionTiming.roll.hold);
    ctx.restore();
  });
  ctx.restore();
  type(ctx, "Des outils que je relie dans mes créations.", 960, 988, 35, { family: "Body", color: palette.green });
}

export function verbs(ctx, time) {
  const words = ["CONCEVOIR", "DÉVELOPPER", "ANIMER"];
  const index = Math.min(2, Math.floor(time / 0.5));
  const phase = time - index * 0.5;
  if (index === 1) {
    ctx.fillStyle = palette.green;
    ctx.fillRect(0, 0, 1920, 1080);
  }
  pose(ctx, phase, (t) => ({ x: 960 + (1 - cue(t, 0, 0.13)) * 1700 - smooth((t - 0.37) / 0.13) * 1700, y: 605, rotation: (1 - cue(t, 0, 0.13)) * 0.1 }), () => type(ctx, words[index], 0, 0, index === 1 ? 225 : 250, { color: index === 1 ? "#f3f3e9" : palette.ink }), true);
}

export function identity(ctx, time, assets) {
  const enter = cue(time, 0, 0.35);
  const exit = smooth((time - 2.2) / 0.3);
  pose(ctx, time, (t) => ({ x: 960, y: 500, scale: 0.45 + cue(t, 0, 0.35) * 0.55 + exit * 3, alpha: 1 - exit }), () => {
    ctx.save();
    ctx.globalAlpha = enter;
    letters(ctx, "MiCHEL", -790, -20, 235, time, { accentIndex: 1, stagger: motionTiming.letterStep });
    letters(ctx, "DJOUMESSI", 790, 230, 235, time - 0.125, { accentIndex: 2, align: "right", stagger: motionTiming.letterStep });
    star(ctx, 590, -190, 38, time * Math.PI);
    type(ctx, "Développeur créatif", 0, 375, 42, { family: "Body", color: palette.green });
    type(ctx, "Design · Développement · Animation", 0, 440, 28, { family: "Body", color: palette.green });
    ctx.restore();
  }, time < 0.35 || time > 2.2);
}

export function portfolioInvitation(ctx, time, assets) {
  const entrance = cue(time, 0, 0.35);
  pose(ctx, time, (t) => ({ y: 530 + (1 - cue(t, 0, 0.35)) * 1000 }), () => {
    star(ctx, 660, -250, 35, time * Math.PI / 2);
    type(ctx, "LA SUITE EST SUR", 0, -82, 125);
    type(ctx, "MON PORTFOLIO.", 0, 65, 155, { color: palette.green });
    const press = smooth((time - motionTiming.outro.press) / 0.22);
    const scale = 1 - Math.sin(press * Math.PI) * 0.035;
    ctx.save();
    ctx.scale(scale, scale);
    rounded(ctx, -345, 178, 690, 92, 46, palette.green);
    type(ctx, "Explorer mon portfolio", -25, 237, 36, { color: palette.white, family: "Body" });
    line(ctx, 250, 231, 274, 207, palette.white, 2.5);
    line(ctx, 253, 207, 274, 207, palette.white, 2.5);
    line(ctx, 274, 207, 274, 228, palette.white, 2.5);
    ctx.restore();
    type(ctx, "hey-michel.me", 0, 353, 32, { color: palette.green, family: "Body" });
    const cursor = cue(time, motionTiming.outro.cursor, 0.8);
    pointer(ctx, mix(820, 130, cursor), mix(500, 240, cursor), press);
    if (press > 0 && press < 1) {
      ctx.save();
      ctx.globalAlpha = 1 - press;
      circle(ctx, 130, 240, 30 + press * 100, "#173f3580", true);
      ctx.restore();
    }
  }, time < 0.35);
  ctx.save();
  ctx.globalAlpha = entrance * 0.15;
  line(ctx, 100, 100, 1820, 100, palette.pale, 1);
  line(ctx, 100, 980, 1820, 980, palette.pale, 1);
  ctx.restore();
}

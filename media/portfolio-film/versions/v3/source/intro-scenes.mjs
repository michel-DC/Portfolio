import { palette, circle } from "./graphics.mjs";
import { type, pose, cue, smooth, mix, rounded, line, pointer, tick } from "./film-language.mjs";
import { letters, star } from "./editorial-graphics.mjs";
import { toolToken, artwork, selectionFrame } from "./creative-graphics.mjs";
import { motionTiming } from "./motion-plan.mjs";

export function introduceMichel(ctx, time, assets) {
  const plan = motionTiming.intro;
  const exit = smooth((time - 3.7) / 0.3);
  pose(ctx, time, (t) => ({ x: 960, y: 440, scale: 1 + exit * 0.2, alpha: 1 - exit }), () => {
    type(ctx, "JE SUIS", -620, -140, 44, { family: "Body", align: "left", color: palette.green });
    letters(ctx, "MiCHEL DJOUMESSI.", 0, 130, 158, time - plan.name, { accentIndex: 1, stagger: 0.0625, align: "center" });
    const role = cue(time, plan.role, 0.45);
    ctx.save();
    ctx.globalAlpha = role;
    ctx.translate((1 - role) * 600, 0);
    star(ctx, 580, -120, 70, time * Math.PI / 2);
    type(ctx, "Développeur créatif", 0, 275, 64, { family: "Body", color: palette.green });
    ctx.restore();
    const tools = ["figma", "nextjs", "typescript", "python"];
    tools.forEach((key, index) => {
      const arrival = cue(time, plan.tools + index * 0.125, 0.4);
      ctx.save();
      ctx.globalAlpha = arrival;
      toolToken(ctx, assets, key, -240 + index * 160, 420 + (1 - arrival) * 170, 92);
      ctx.restore();
    });
  }, time < 0.5 || time > 3.7);
  ctx.save();
  ctx.globalAlpha = cue(time, plan.role, 0.4) * (1 - exit);
  type(ctx, "Je transforme des idées en expériences web.", 960, 985, 40, { family: "Body", color: palette.green });
  ctx.restore();
}

function evolvingWebsite(ctx, time, assets, progress) {
  const plan = motionTiming.idea;
  const fill = cue(time, plan.design, 0.55);
  const interact = smooth((time - plan.interact) / 0.65);
  rounded(ctx, -650, -245, 1300, 500, 10, "#fff", true);
  for (let i = 0; i < 3; i += 1) circle(ctx, -615 + i * 19, -215, 4, "#a3b99e");
  line(ctx, -650, -187, 650, -187, "#dce3d7", 1);
  type(ctx, "UNE IDÉE PREND FORME", -580, -110, 24, { family: "Body", align: "left", color: palette.green });
  type(ctx, "À explorer.", -580, 4, 86, { align: "left" });
  for (let i = 0; i < 3; i += 1) rounded(ctx, -580, 42 + i * 25, 365 - i * 60, 6, 3, "#c4d1be");
  rounded(ctx, -580, 157, 260, 61, 30, fill > 0.5 ? palette.green : "#e5eadf");
  type(ctx, interact > 0.65 ? "C’est parti !" : "Explorer", -450, 196, 27, { family: "Body", color: fill > 0.5 ? palette.white : palette.green });
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, -145, 590, 365);
  ctx.clip();
  for (let i = 0; i < 3; i += 1) {
    const x = 25 + i * 360 - interact * 305;
    rounded(ctx, x, -120 + Math.sin(time * Math.PI + i) * 10, 325, 310, 4, "#e5ebde");
    ctx.save();
    ctx.globalAlpha = fill;
    artwork(ctx, x + 9, -111 + Math.sin(time * Math.PI + i) * 10, 307, 292, time + i, i);
    ctx.restore();
  }
  ctx.restore();
  if (progress < 0.99) selectionFrame(ctx, -660, -255, 1320, 520, progress);
  const click = cue(time, plan.press, 0.22);
  pointer(ctx, mix(725, -410, interact), mix(290, 182, interact), click);
  if (click > 0.5) {
    circle(ctx, -265, 185, 18, "#e5ebde");
    tick(ctx, -265, 185, 20, cue(time, plan.press, 0.25));
  }
}

export function ideaToWebsite(ctx, time, assets) {
  const plan = motionTiming.idea;
  const build = cue(time, plan.build, 0.65);
  const design = cue(time, plan.design, 0.4);
  const exit = smooth((time - 5.65) / 0.35);
  type(ctx, "D’UNE IDÉE…", 960, 240, 126);
  ctx.save();
  ctx.globalAlpha = cue(time, 0, 0.4) * (1 - build);
  circle(ctx, 960, 565, 112, "#e2eadb");
  star(ctx, 960, 565, 70, time * Math.PI / 2);
  type(ctx, "Et si on créait quelque chose ?", 960, 780, 36, { family: "Body", color: palette.green });
  ctx.restore();
  if (build > 0) {
    pose(ctx, time, () => ({ x: 960, y: 570, scale: 0.15 + build * 0.85 + exit, alpha: build * (1 - exit), rotation: (1 - build) * -0.09 }), () => evolvingWebsite(ctx, time, assets, design), build < 0.99 || exit > 0);
  }
  ctx.save();
  ctx.globalAlpha = design * (1 - exit);
  type(ctx, "… À UN SITE QUI PREND VIE.", 960, 965, 74, { color: palette.green });
  ctx.restore();
}

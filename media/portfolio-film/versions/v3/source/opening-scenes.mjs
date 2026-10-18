import { palette, clamp, circle } from "./graphics.mjs";
import { type, pose, cue, smooth, mix, rounded, line, icon, pointer } from "./film-language.mjs";
import { star } from "./editorial-graphics.mjs";
import { toolToken, artwork, filmFrame, curvedLink, selectionFrame, drawDial, evolvingGrid } from "./creative-graphics.mjs";
import { motionTiming } from "./motion-plan.mjs";

export function imageAndCode(ctx, time, assets) {
  const opening = motionTiming.opening;
  const merge = smooth((time - opening.join) / 0.65);
  pose(ctx, time, (t) => ({ x: mix(960 - (1 - cue(t, opening.image, 0.3)) * 1650, 960, merge), y: mix(414, 510, merge), scale: 1 - merge * 0.7, alpha: 1 - merge }), () => type(ctx, "JE CONÇOIS", -185, 0, 182), time < 0.7 || time > opening.join);
  pose(ctx, time, (t) => ({ x: 960 + (1 - cue(t, opening.code, 0.3)) * 1650, y: mix(765, 600, merge), scale: 1 - merge * 0.7, alpha: 1 - merge }), () => type(ctx, "JE DÉVELOPPE", 100, 0, 176, { color: palette.green }), time < 1.1 || time > opening.join);
  const turn = cue(time, 1.25, 0.4);
  star(ctx, 960, 550, 48 + merge * 88, turn * Math.PI / 2 + time * 0.15);
  ctx.save();
  ctx.globalAlpha = cue(time, 1.25, 0.3) * (1 - merge);
  toolToken(ctx, assets, "figma", 240, 850, 74);
  toolToken(ctx, assets, "nextjs", 1480, 340, 74);
  toolToken(ctx, assets, "typescript", 1590, 340, 74);
  type(ctx, "Du design à un site qui fonctionne.", 960, 1000, 35, { family: "Body", color: palette.green });
  ctx.restore();
  if (merge > 0.7) {
    ctx.save();
    ctx.globalAlpha = (merge - 0.7) / 0.3;
    line(ctx, 960 - merge * 670, 540, 960 + merge * 670, 540, "#91aa87", 1);
    ctx.restore();
  }
}

export function visualThinking(ctx, time, assets) {
  const plan = motionTiming.visual;
  const strip = smooth((time - plan.strip) / 0.45);
  const exit = smooth((time - 3.18) / 0.32);
  type(ctx, "DES INTERFACES SOIGNÉES.", 960, 242 - exit * 250, 98);
  if (strip < 0.99) {
    pose(ctx, time, (t) => ({ x: 960, y: 600, scale: 0.2 + cue(t, 0, 0.4) * 0.8, alpha: 1 - strip, rotation: (1 - cue(t, 0, 0.4)) * -0.1 }), () => {
      artwork(ctx, -570, -235, 1140, 470, time);
      const resize = cue(time, plan.resize, 0.45);
      selectionFrame(ctx, -595, -260, 1190 + resize * 80, 520, cue(time, 0.25, 0.5));
      pointer(ctx, 595 + resize * 80, 260);
      type(ctx, "Une composition claire, jusqu’au détail.", 0, 345, 35, { family: "Body", color: palette.green });
    }, time < 0.4);
  }
  if (strip > 0) {
    ctx.save();
    ctx.globalAlpha = strip;
    for (let i = 0; i < 5; i += 1) {
      filmFrame(ctx, assets, 250 + i * 490 - (time - plan.strip) * 260 - exit * 1700, 610 + Math.sin(i * 1.4 + time * Math.PI) * 23, 420, 470, time, i);
    }
    ctx.restore();
  }
  toolToken(ctx, assets, "figma", 180, 993, 58);
  type(ctx, "Concevoir le design avec Figma", 230, 1003, 30, { family: "Body", align: "left", color: palette.green });
}

export function meaningfulGesture(ctx, time, assets) {
  const plan = motionTiming.gesture;
  const drag = smooth((time - plan.drag) / 0.75);
  const explore = smooth((time - plan.explore) / 0.5);
  const exit = smooth((time - 3.18) / 0.32);
  type(ctx, "QUI RÉAGISSENT À VOS GESTES.", 960, 235, 89);
  pose(ctx, time, () => ({ x: 960 - exit * 1900, y: 540 }), () => {
    drawDial(ctx, -535, 60, 188, time, drag);
    type(ctx, "glisser", -535, 335, 34, { family: "Body", color: palette.green });
    const trackY = 80;
    line(ctx, -180, trackY, 675, trackY, "#b4c5aa", 7);
    const handleX = mix(-150, 625, drag);
    rounded(ctx, -180, trackY - 4, Math.max(8, handleX + 180), 8, 4, palette.green);
    circle(ctx, handleX, trackY, 53, "#fff");
    star(ctx, handleX, trackY, 32, drag * Math.PI);
    pointer(ctx, handleX + 10, trackY + 9, clamp((time - plan.drag) / 0.2));
    if (drag > 0.75) {
      const p = cue(time, plan.snap, 0.4);
      for (let i = 0; i < 3; i += 1) {
        const width = [190, 145, 105][i];
        ctx.save();
        ctx.globalAlpha = p;
        ctx.translate(20 + i * 255, -125 - p * 45);
        ctx.rotate((1 - p) * 0.13);
        rounded(ctx, -width / 2, -80, width, 140, 6, i === 1 ? palette.green : "#dce6d4");
        star(ctx, 0, -10, 30, time * Math.PI / 2, i === 1 ? "#edf2e5" : palette.green);
        ctx.restore();
      }
    }
    rounded(ctx, -150, 225, 760, 97, 48, explore > 0.4 ? palette.green : "#e3eadb");
    type(ctx, explore > 0.4 ? "l’interface répond" : "explorer", 230, 289, 42, { family: "Body", color: explore > 0.4 ? palette.white : palette.green });
    type(ctx, "Glisser. Cliquer. Tout répond.", 0, 415, 34, { family: "Body", color: palette.green });
  }, time > 3.18);
  const arrival = cue(time, 0.2, 0.5);
  ctx.save();
  ctx.globalAlpha = arrival * (1 - exit);
  toolToken(ctx, assets, "nextjs", 760, 1013, 54);
  toolToken(ctx, assets, "typescript", 850, 1013, 54);
  toolToken(ctx, assets, "tailwind", 940, 1013, 54);
  type(ctx, "Développer les interactions", 1010, 1023, 27, { family: "Body", align: "left", color: palette.green });
  ctx.restore();
}

export function organizedConnections(ctx, time, assets) {
  const plan = motionTiming.connections;
  const arrange = smooth((time - plan.arrange) / 0.8);
  const transmit = cue(time, plan.transmit, 0.5);
  const exit = smooth((time - 3.2) / 0.3);
  pose(ctx, time, () => ({ x: 960, y: 540, scale: 1 + exit * 1.4, alpha: 1 - exit }), () => {
    type(ctx, "DES FONCTIONS UTILES.", 0, -305, 112);
    evolvingGrid(ctx, -705, -100, 630, 330, time, arrange);
    const engine = { x: 110, y: 70 };
    curvedLink(ctx, { x: -40, y: 70 }, engine, cue(time, 0, 0.5));
    circle(ctx, engine.x, engine.y, 86, "#fff");
    icon(ctx, assets, "python", engine.x, engine.y, 100);
    const outputs = [{ x: 585, y: -105 }, { x: 695, y: 70 }, { x: 585, y: 245 }];
    outputs.forEach((output, index) => {
      curvedLink(ctx, { x: 200, y: 70 }, output, transmit, (index - 1) * 70);
      circle(ctx, output.x, output.y, 61, "#e0e9d7");
      if (index === 1) icon(ctx, assets, "postgresql", output.x, output.y, 67);
      else star(ctx, output.x, output.y, 29, time * Math.PI + index);
      if (transmit > 0.9) {
        const p = (time * 1 + index / 3) % 1;
        circle(ctx, mix(200, output.x, p), mix(70, output.y, p) + Math.sin(p * Math.PI) * (index - 1) * 70, 7, palette.green);
      }
    });
    type(ctx, "Connecter les données. Automatiser les tâches.", 0, 420, 38, { family: "Body", color: palette.green });
  }, time > 3.2);
}

export function livingExperience(ctx, time, assets) {
  const assemble = smooth((time - motionTiming.alive.assemble) / 0.75);
  const exit = smooth((time - 2.7) / 0.3);
  type(ctx, "POUR DONNER VIE AUX IDÉES.", 960, 230, 99);
  ctx.save();
  ctx.translate(960, 590);
  ctx.scale(1 + exit * 1.5, 1 + exit * 1.5);
  ctx.globalAlpha = 1 - exit;
  for (let i = 0; i < 48; i += 1) {
    const row = Math.floor(i / 8);
    const column = i % 8;
    const angle = i / 48 * Math.PI * 2 + time * Math.PI / 2;
    const radius = 290 + (i % 3) * 100;
    const destinationX = (column - 3.5) * 78;
    const destinationY = (row - 2.5) * 68;
    const x = mix(Math.cos(angle) * radius, destinationX, assemble);
    const y = mix(Math.sin(angle) * radius * 0.65, destinationY, assemble);
    const opacity = 1 - smooth((assemble - 0.6) / 0.4);
    ctx.save();
    ctx.globalAlpha *= opacity;
    if (i % 3 === 0) star(ctx, x, y, 17, angle);
    else rounded(ctx, x - 17, y - 17, 34, 34, 5, i % 2 ? "#b8caae" : palette.green);
    ctx.restore();
  }
  const reveal = cue(time, motionTiming.alive.mark, 0.5);
  ctx.save();
  ctx.globalAlpha *= reveal;
  icon(ctx, assets, "logo", 0, 0, 355 * (0.9 + reveal * 0.1));
  ctx.restore();
  ctx.restore();
  type(ctx, "Je conçois. Je développe. J’anime.", 960, 1000, 35, { family: "Body", color: palette.green });
}

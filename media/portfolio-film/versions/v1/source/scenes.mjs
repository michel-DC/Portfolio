import { clamp } from "./graphics.mjs";
import { signature, ideaToScreen, projectIndex } from "./opening-scenes.mjs";
import { zen, teamify, lookaroun, flowMedia } from "./project-scenes.mjs";
import { expertise, invitation } from "./ending-scenes.mjs";

export const timeline = [
  { start: 0, end: 3, name: "Signature du portfolio", draw: signature },
  { start: 3, end: 6, name: "De l’idée à l’écran", draw: ideaToScreen },
  { start: 6, end: 8.5, name: "Galerie interactive", draw: projectIndex },
  { start: 8.5, end: 13, name: "Zen · recherche et cinéma", draw: zen },
  { start: 13, end: 17, name: "Teamify · collaboration", draw: teamify },
  { start: 17, end: 21, name: "Lookaroun · connexions", draw: lookaroun },
  { start: 21, end: 25.5, name: "Flow Media · de la maquette au site", draw: flowMedia },
  { start: 25.5, end: 28.5, name: "Compétences en mouvement", draw: expertise },
  { start: 28.5, end: 32, name: "Travaillons ensemble", draw: invitation },
];

export function drawFrame(ctx, time, assets) {
  ctx.save();
  const scene = timeline.find((entry) => time >= entry.start && time < entry.end) ?? timeline[timeline.length - 1];
  scene.draw(ctx, clamp(time - scene.start, 0, scene.end - scene.start), assets);
  ctx.restore();
  return scene.name;
}

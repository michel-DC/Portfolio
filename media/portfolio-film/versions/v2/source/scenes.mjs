import { clamp } from "./graphics.mjs";
import { visualSignature, imagine, flowingGallery, dancingTools } from "./visual-scenes.mjs";
import { livingPanels, imageAndGesture, ideasInMotion, visualInvitation } from "./visual-finale.mjs";

export const timeline = [
  { start: 0, end: 3, name: "Signature", draw: visualSignature },
  { start: 3, end: 6, name: "Imaginer", draw: imagine },
  { start: 6, end: 10, name: "Images en perspective", draw: flowingGallery },
  { start: 10, end: 14, name: "Chorégraphie des logos", draw: dancingTools },
  { start: 14, end: 18.5, name: "Fluide, précis, vivant", draw: livingPanels },
  { start: 18.5, end: 23, name: "Images et gestes", draw: imageAndGesture },
  { start: 23, end: 27.5, name: "Des idées à l’écran", draw: ideasInMotion },
  { start: 27.5, end: 32, name: "Ensemble", draw: visualInvitation },
];

export function drawFrame(ctx, time, assets) {
  const scene = timeline.find((entry) => time >= entry.start && time < entry.end) ?? timeline[timeline.length - 1];
  ctx.save();
  scene.draw(ctx, clamp(time - scene.start, 0, scene.end - scene.start), assets);
  ctx.restore();
  return scene.name;
}

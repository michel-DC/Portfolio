import { clamp } from "./graphics.mjs";
import { backdrop } from "./film-language.mjs";
import { masthead } from "./editorial-graphics.mjs";
import { scenePlan } from "./motion-plan.mjs";
import { imageAndCode, visualThinking, meaningfulGesture, organizedConnections, livingExperience } from "./opening-scenes.mjs";
import { introduceMichel, ideaToWebsite } from "./intro-scenes.mjs";
import { dimension, toolRoll, verbs, identity, portfolioInvitation } from "./identity-scenes.mjs";

const drawingFunctions = [introduceMichel, ideaToWebsite, imageAndCode, visualThinking, meaningfulGesture, organizedConnections, livingExperience, dimension, toolRoll, verbs, identity, portfolioInvitation];
export const timeline = scenePlan.map(([start, end, name], index) => ({ start, end, name, draw: drawingFunctions[index] }));

export function drawFrame(ctx, time, assets) {
  const scene = timeline.find((entry) => time >= entry.start && time < entry.end) ?? timeline.at(-1);
  ctx.save();
  backdrop(ctx, assets);
  scene.draw(ctx, clamp(time - scene.start, 0, scene.end - scene.start), assets);
  masthead(ctx, assets, time >= 26.5 && time < 29.5 || time >= 33 && time < 33.5);
  ctx.restore();
  return scene.name;
}

import { readFileSync } from "node:fs";

const previousPlan = JSON.parse(readFileSync(new URL("../../portfolio-film-v9/exports/motion-cues.json", import.meta.url), "utf8"));
const previousSources = JSON.parse(readFileSync(new URL("../../portfolio-film-v9/exports/sources.json", import.meta.url), "utf8"));
export const BPM = 120;
export const INTRO_DURATION = 10;
export const PREVIOUS_TAIL_FROM = 250 / 60;
export const PRESERVE_FROM = PREVIOUS_TAIL_FROM;
export const motionTiming = {
  ...previousPlan.motionTiming,
  intro: { name: 0.25, role: 1.25, tools: 2.25 },
  idea: { build: 1, design: 2, interact: 3.5, press: 4.25 },
};

const continuedLabels = [
  "Je conçois et je développe",
  "Des interfaces soignées · design avec Figma",
  "Qui réagissent aux gestes · développement interactif",
  "Des fonctions utiles · données et automatisation Python",
  "Donner vie aux idées · design, développement, animation",
];

export const scenePlan = [
  [0, 4, "Michel · développeur créatif"],
  [4, INTRO_DURATION, "D’une idée à un site qui prend vie"],
  ...previousSources.timeline.map(({ start, end, name }, index) => [start + INTRO_DURATION, end + INTRO_DURATION, continuedLabels[index] ?? name]),
];

const introEvents = [
  [0, "cut", "Michel, développeur créatif"],
  [motionTiming.intro.name, "sweep", "Révéler le prénom"],
  [motionTiming.intro.role, "tone", "Dire le métier"],
  ...[0, 1, 2, 3].map((index) => [motionTiming.intro.tools + index * 0.125, "logo", "Outil de création"]),
  [4, "cut", "Une idée"],
  [4 + motionTiming.idea.build, "sweep", "Construire la structure du site"],
  [4 + motionTiming.idea.design, "click", "Appliquer le design"],
  [4 + motionTiming.idea.interact, "sweep", "Faire réagir le site"],
  [4 + motionTiming.idea.press, "click", "Explorer le site"],
];

export const soundCues = [
  ...introEvents.map(([time, kind, label]) => ({ time, kind, label, frame: Math.round(time * 60), audioTime: Math.round(time * 60) / 60 })),
  ...previousPlan.cues.map((event) => ({ ...event, time: event.time + INTRO_DURATION, frame: event.frame + INTRO_DURATION * 60, audioTime: event.audioTime + INTRO_DURATION })),
].sort((a, b) => a.audioTime - b.audioTime);

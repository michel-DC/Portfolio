import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { createHash } from "node:crypto";
import { WIDTH, HEIGHT, FPS, DURATION, palette } from "./graphics.mjs";
import { drawFrame, timeline } from "./scenes.mjs";
import { BPM, PRESERVE_FROM, PREVIOUS_TAIL_FROM, motionTiming, soundCues } from "./motion-plan.mjs";

const require = createRequire(import.meta.url);
const moduleRoot = process.env.MEDIA_NODE_MODULES;
const { createCanvas, loadImage, GlobalFonts } = require(moduleRoot ? path.join(moduleRoot, "@napi-rs/canvas") : "@napi-rs/canvas");
const filmRoot = fileURLToPath(new URL("../", import.meta.url));
const projectRoot = path.resolve(filmRoot, "../..");
const workRoot = path.join(filmRoot, ".work");
const exportRoot = path.join(filmRoot, "exports");
const reviewRoot = path.join(filmRoot, "review");
const ffmpeg = process.env.MEDIA_FFMPEG ?? "ffmpeg";
const isPreview = process.argv.includes("--preview");
const frameCount = Math.round(PRESERVE_FROM * FPS);
const previews = [0.6, 1.7, 3.1, 4.6, 5.6, 6.5, 7.5, 8.9, 10.6, 11.4, 12.4, 13.7, 14.9, 16, 16.9, 18, 19.2, 20.6, 21.7, 22.8, 23.9, 25.2, 26.0, 27.2, 28.8, 30.1, 31.7, 32.8, 33.7, 35.4, 37.5, 39.3];
const fontFiles = [
  ["cabinet/CabinetGrotesk-Regular.ttf", "Body"],
  ["italiana/Italiana-Regular.ttf", "Editorial"],
  ["amoria/AMORIA-BF64a2f6809ce9e.otf", "Amoria"],
];

function runFfmpeg(argumentsList) {
  const result = spawnSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...argumentsList], { windowsHide: true, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg exited with code ${result.status}`);
}

async function loadAssets() {
  const assets = {};
  const manifest = [];
  for (const [key, relativePath] of Object.entries({ texture: "images/background/fond-page.png", logo: "images/svg/logo-noir.svg" })) {
    const source = path.join(projectRoot, "public", relativePath);
    const bytes = await fs.readFile(source);
    assets[key] = await loadImage(source);
    manifest.push({ key, source: `public/${relativePath}`, sha256: createHash("sha256").update(bytes).digest("hex") });
  }
  for (const [key, relativePath] of Object.entries({ figma: "images/skills/figma.svg", nextjs: "images/skills/nextjs.svg", typescript: "images/skills/typescript.svg", python: "images/skills/python.svg", tailwind: "images/skills/tailwindcss.svg", postgresql: "images/skills/postgresql.png" })) {
    const source = path.join(projectRoot, "public", relativePath);
    const bytes = await fs.readFile(source);
    assets[key] = await loadImage(source);
    manifest.push({ key, source: `public/${relativePath}`, sha256: createHash("sha256").update(bytes).digest("hex") });
  }
  const logoSvg = await fs.readFile(path.join(projectRoot, "public/images/svg/logo-noir.svg"), "utf8");
  assets.logoWhite = await loadImage(Buffer.from(logoSvg.replace("<svg ", '<svg fill="white" ')));
  const codexSource = path.join(filmRoot, "assets/codex.webp");
  assets.codex = await loadImage(codexSource);
  manifest.push({ key: "codex", source: "media/portfolio-film-v11/assets/codex.webp", sha256: createHash("sha256").update(await fs.readFile(codexSource)).digest("hex") });
  for (const [font] of fontFiles) {
    const source = path.join(projectRoot, "public/fonts", font);
    manifest.push({ key: font, source: `public/fonts/${font}`, sha256: createHash("sha256").update(await fs.readFile(source)).digest("hex") });
  }
  const css = await fs.readFile(path.join(projectRoot, "src/styles/globals.css"), "utf8");
  for (const [key, variable] of Object.entries({ green: "portfolio-accent", hover: "accent-hover", pale: "accent-on-dark" })) {
    const match = css.match(new RegExp(`--${variable}:\\s*(#[a-fA-F0-9]{6})`));
    if (!match) throw new Error(`Missing brand color ${variable}`);
    palette[key] = match[1];
  }
  await fs.writeFile(path.join(exportRoot, "sources.json"), JSON.stringify({ version: "v11", edition: "Développeur créatif", duration: DURATION, fps: FPS, projectAssetsUsed: false, preservedTail: { from: PRESERVE_FROM, previousFrom: PREVIOUS_TAIL_FROM, source: "media/portfolio-film-v10/exports/michel-djoumessi-v10.mp4" }, identity: { palette, fonts: ["Italiana", "Amoria", "Cabinet Grotesk"] }, assets: manifest, timeline: timeline.map(({ start, end, name }) => ({ start, end, name })) }, null, 2) + "\n");
  await fs.writeFile(path.join(exportRoot, "motion-cues.json"), JSON.stringify({ bpm: BPM, fps: FPS, duration: DURATION, motionTiming, cues: soundCues }, null, 2) + "\n");
  return assets;
}

function loadFonts() {
  for (const [source, family] of fontFiles) {
    if (!GlobalFonts.registerFromPath(path.join(projectRoot, "public/fonts", source), family)) throw new Error(`Unable to load font ${family}`);
  }
}

async function exportPreviews(canvas, ctx, assets) {
  const sheetHeight = Math.ceil(previews.length / 4) * 300;
  const sheet = createCanvas(1920, sheetHeight);
  const sheetContext = sheet.getContext("2d");
  sheetContext.fillStyle = palette.green;
  sheetContext.fillRect(0, 0, 1920, sheetHeight);
  for (const [index, time] of previews.entries()) {
    const name = drawFrame(ctx, time, assets);
    const bytes = canvas.toBuffer("image/jpeg", 90);
    const filename = `frame-${time.toFixed(1).replace(".", "-")}.jpg`;
    await fs.writeFile(path.join(reviewRoot, filename), bytes);
    const x = (index % 4) * 480;
    const y = Math.floor(index / 4) * 300;
    const frozenFrame = await loadImage(bytes);
    sheetContext.drawImage(frozenFrame, x, y, 480, 270);
    sheetContext.fillStyle = palette.ivory;
    sheetContext.font = '15px "Body"';
    sheetContext.fillText(`${time.toFixed(1)} s · ${name}`, x + 12, y + 291);
  }
  await fs.writeFile(path.join(exportRoot, "storyboard.jpg"), sheet.toBuffer("image/jpeg", 94));
  drawFrame(ctx, 35.4, assets);
  await fs.writeFile(path.join(exportRoot, "affiche.jpg"), canvas.toBuffer("image/jpeg", 95));
}

async function renderPicture(canvas, ctx, assets) {
  const master = path.join(workRoot, "opening-picture.mp4");
  const encoder = spawn(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", "-f", "image2pipe", "-vcodec", "mjpeg", "-framerate", `${FPS}`, "-i", "pipe:0", "-an", "-vf", "scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709", "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-color_range", "tv", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-threads", "6", "-movflags", "+faststart", master], { windowsHide: true, stdio: ["pipe", "inherit", "inherit"] });
  encoder.stdin.on("error", (error) => { console.error(error.message); process.exitCode = 1; });
  const completion = once(encoder, "close");
  const started = Date.now();
  for (let frame = 0; frame < frameCount; frame += 1) {
    drawFrame(ctx, frame / FPS, assets);
    const buffer = canvas.toBuffer("image/jpeg", 96);
    if (!encoder.stdin.write(buffer)) await once(encoder.stdin, "drain");
    if (frame % 60 === 0) console.log(JSON.stringify({ frame, frameCount, percent: Math.round(frame / frameCount * 100), elapsedSeconds: Math.round((Date.now() - started) / 1000) }));
  }
  encoder.stdin.end();
  const [code] = await completion;
  if (code !== 0) throw new Error(`Picture encoder exited with ${code}`);
  return master;
}

async function assemblePicture(opening) {
  const previous = path.join(projectRoot, "media/portfolio-film-v10/exports/michel-djoumessi-v10.mp4");
  const tail = path.join(workRoot, "preserved-tail.mp4");
  runFfmpeg(["-ss", `${PREVIOUS_TAIL_FROM}`, "-i", previous, "-t", `${DURATION - PRESERVE_FROM}`, "-map", "0:v:0", "-c:v", "copy", "-an", tail]);
  const list = path.join(workRoot, "picture-parts.txt");
  const paths = [opening, tail].map((file) => `file '${file.replaceAll("\\", "/")}'`);
  await fs.writeFile(list, paths.join("\n") + "\n");
  const master = path.join(exportRoot, "picture-master.mp4");
  runFfmpeg(["-f", "concat", "-safe", "0", "-i", list, "-map", "0:v:0", "-c:v", "copy", "-movflags", "+faststart", master]);
  return master;
}

async function main() {
  await Promise.all([workRoot, exportRoot, reviewRoot].map((directory) => fs.mkdir(directory, { recursive: true })));
  loadFonts();
  const assets = await loadAssets();
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  await exportPreviews(canvas, ctx, assets);
  if (isPreview) { console.log("Preview frames and storyboard exported."); return; }
  const scorePath = path.join(exportRoot, "bande-son-originale.wav");
  await fs.access(scorePath);
  const master = await assemblePicture(await renderPicture(canvas, ctx, assets));
  const finalPath = path.join(exportRoot, "michel-djoumessi-v11.mp4");
  runFfmpeg(["-i", master, "-i", scorePath, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-af", "loudnorm=I=-16:TP=-1.5:LRA=9", "-t", `${DURATION}`, "-movflags", "+faststart", "-metadata", "title=Michel Djoumessi — Développeur créatif — V11", "-metadata", "artist=Michel Djoumessi", finalPath]);
  const { size } = await fs.stat(finalPath);
  console.log(JSON.stringify({ finalPath, bytes: size, duration: DURATION, width: WIDTH, height: HEIGHT, fps: FPS }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

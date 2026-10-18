import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { createHash } from "node:crypto";
import { WIDTH, HEIGHT, FPS, DURATION, palette } from "./graphics.mjs";
import { drawFrame, timeline } from "./scenes.mjs";

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
const frameCount = DURATION * FPS;
const previews = [1.5, 2.6, 3.8, 5.2, 6.8, 7.8, 9.3, 11.5, 13.9, 15.6, 17.9, 19.6, 21.5, 22.3, 23.7, 24.6, 25.9, 27.7, 29.6, 31.0];

function runFfmpeg(argumentsList) {
  const result = spawnSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...argumentsList], { windowsHide: true, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg exited with code ${result.status}`);
}

async function loadAssets() {
  const entries = {
    zenHome: "zen/screens/home.png",
    zenCatalog: "zen/screens/catalog.png",
    zenSearch: "zen/screens/search.png",
    zenMovie: "zen/screens/movie.png",
    zenTop: "zen/screens/top.png",
    teamifyLaptop: "teamify/001.png",
    teamifyPhone: "teamify/002.png",
    lookarounLaptop: "lookaroun/001.png",
    lookarounPhone: "lookaroun/002.png",
    flowLaptop: "flow-media/001.png",
    flowPhone: "flow-media/002.png",
  };
  const assets = {};
  const manifest = [];
  for (const [key, relativePath] of Object.entries(entries)) {
    const source = path.join(projectRoot, "public/images/projects", relativePath);
    const bytes = await fs.readFile(source);
    const digest = createHash("sha256").update(bytes).digest("hex");
    const imagePath = relativePath.startsWith("zen/") ? source : path.join(workRoot, `${key}.jpg`);
    if (imagePath !== source) runFfmpeg(["-i", source, "-vf", "scale=2800:-2", "-q:v", "2", imagePath]);
    assets[key] = await loadImage(imagePath);
    manifest.push({ key, source: `public/images/projects/${relativePath}`, sha256: digest, width: assets[key].width, height: assets[key].height });
  }
  const brandAssets = {
    texture: "images/background/fond-page.png",
    logo: "images/svg/logo-noir.svg",
    zenBackground: "images/projects/backgrounds/zen-landscape.webp",
    teamifyBackground: "images/projects/backgrounds/teamify.webp",
    lookarounBackground: "images/projects/backgrounds/lookaroun.webp",
    flowBackground: "images/projects/backgrounds/flow-media.webp",
    teamifyPreview: "images/projects/previews/teamify.webp",
    lookarounPreview: "images/projects/previews/lookaroun.webp",
    flowPreview: "images/projects/previews/flow-media.webp",
  };
  for (const [key, relativePath] of Object.entries(brandAssets)) {
    const source = path.join(projectRoot, "public", relativePath);
    const bytes = await fs.readFile(source);
    assets[key] = await loadImage(source);
    manifest.push({ key, source: `public/${relativePath}`, sha256: createHash("sha256").update(bytes).digest("hex"), width: assets[key].width, height: assets[key].height });
  }
  const css = await fs.readFile(path.join(projectRoot, "src/styles/globals.css"), "utf8");
  const tokens = { green: "portfolio-accent", hover: "accent-hover", pale: "accent-on-dark" };
  for (const [key, variable] of Object.entries(tokens)) {
    const match = css.match(new RegExp(`--${variable}:\\s*(#[a-fA-F0-9]{6})`));
    if (!match) throw new Error(`Missing brand color ${variable}`);
    palette[key] = match[1];
  }
  await fs.writeFile(path.join(exportRoot, "sources.json"), JSON.stringify({ identity: { cssSource: "src/styles/globals.css", palette, fonts: ["Italiana", "Amoria", "Cabinet Grotesk"], texture: brandAssets.texture }, references: ["https://x.com/melvynx/status/2104074646224248944", "https://x.com/melvynx/status/2103741783234732518"], assets: manifest, timeline: timeline.map(({ start, end, name }) => ({ start, end, name })) }, null, 2) + "\n");
  return assets;
}

function loadFonts() {
  const fonts = [
    ["cabinet/CabinetGrotesk-Black.ttf", "Display"],
    ["cabinet/CabinetGrotesk-Regular.ttf", "Body"],
    ["italiana/Italiana-Regular.ttf", "Editorial"],
    ["amoria/AMORIA-BF64a2f6809ce9e.otf", "Amoria"],
  ];
  for (const [source, family] of fonts) {
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
  drawFrame(ctx, 1.65, assets);
  await fs.writeFile(path.join(exportRoot, "affiche.jpg"), canvas.toBuffer("image/jpeg", 95));
}

async function renderPicture(canvas, ctx, assets) {
  const master = path.join(exportRoot, "picture-master.mp4");
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
  const master = await renderPicture(canvas, ctx, assets);
  const finalPath = path.join(exportRoot, "michel-djoumessi-showreel.mp4");
  runFfmpeg(["-i", master, "-i", scorePath, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-af", "loudnorm=I=-16:TP=-1.5:LRA=9", "-t", `${DURATION}`, "-movflags", "+faststart", "-metadata", "title=Michel Djoumessi — Projets sélectionnés", "-metadata", "artist=Michel Djoumessi", finalPath]);
  const { size } = await fs.stat(finalPath);
  console.log(JSON.stringify({ finalPath, bytes: size, duration: DURATION, width: WIDTH, height: HEIGHT, fps: FPS }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

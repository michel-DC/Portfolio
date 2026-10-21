import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { createHash } from 'node:crypto';
import { palette } from './graphics.mjs';
import { HEAD_DURATION, DURATION, TAIL_START } from './motion-kit.mjs';
import { drawDetail, detailCues, detailTimeline } from './detail-scenes.mjs';

const require = createRequire(import.meta.url);
const modules = process.env.MEDIA_NODE_MODULES;
const { createCanvas, loadImage, GlobalFonts } = require(modules ? path.join(modules, '@napi-rs/canvas') : '@napi-rs/canvas');
const ROOT = fileURLToPath(new URL('../', import.meta.url));
const PROJECT = path.resolve(ROOT, '../../../..');
const VERSION = path.basename(ROOT);
const TITLE = 'Encore un détail · révision 5';
const OUTPUT = path.join(ROOT, 'exports');
const REVIEW = path.join(ROOT, 'review');
const WORK = path.join(ROOT, '.work');
const ORIGINAL = path.join(ROOT, '../v3/exports/michel-djoumessi-v3-final.mp4');
const FPS = 60;
const WIDTH = 1920;
const HEIGHT = 1080;
const INTRO_DURATION = 4;
const ENDING_START = 41.5;
const draw = drawDetail;
const events = detailCues;
const story = detailTimeline;
const previewTimes = [1.7, 4.7, 5.8, 7.5, 8.8, 9.8, 10.8, 12.5, 14.5, 15.5, 17.5, 18.5, 19.5, 21, 22.8, 24.5, 25.8, 27.2, 28.5, 29.5, 30.8, 31.6, 32.4, 33.1, 33.7, 34.2, 42.3, 43.7];
const videoEncoding = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level:v', '4.2', '-g', '120', '-keyint_min', '120', '-sc_threshold', '0', '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-threads', '6'];

function ffmpeg(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { windowsHide: true, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg: ${result.status}`);
}

async function assetsAndManifest() {
  const assets = {};
  const sources = [];
  const resources = { texture: 'images/background/fond-page.png', logo: 'images/svg/logo-noir.svg', figma: 'images/skills/figma.svg', nextjs: 'images/skills/nextjs.svg', typescript: 'images/skills/typescript.svg', python: 'images/skills/python.svg', zenHome: 'images/projects/zen/screens/home.png', zenCatalog: 'images/projects/zen/screens/catalog.png', zenSearch: 'images/projects/zen/screens/search.png', zenMovie: 'images/projects/zen/screens/movie.png' };
  for (const [key, relative] of Object.entries(resources)) {
    const filename = path.join(PROJECT, 'public', relative);
    const bytes = await fs.readFile(filename);
    assets[key] = await loadImage(bytes);
    sources.push({ key, path: `public/${relative}`, sha256: createHash('sha256').update(bytes).digest('hex') });
  }
  for (const key of ['php', 'cplusplus']) {
    const filename = path.join(ROOT, 'assets/skills', `${key}.svg`);
    const bytes = await fs.readFile(filename);
    assets[key] = await loadImage(bytes);
    sources.push({ key, path: `assets/skills/${key}.svg`, sha256: createHash('sha256').update(bytes).digest('hex'), source: `https://github.com/simple-icons/simple-icons/blob/develop/icons/${key}.svg` });
  }
  const svg = await fs.readFile(path.join(PROJECT, 'public/images/svg/logo-noir.svg'), 'utf8');
  assets.logoWhite = await loadImage(Buffer.from(svg.replace('<svg ', '<svg fill="white" ')));
  for (const [font, family] of [['cabinet/CabinetGrotesk-Regular.ttf', 'Body'], ['italiana/Italiana-Regular.ttf', 'Editorial'], ['amoria/AMORIA-BF64a2f6809ce9e.otf', 'Amoria']]) {
    const filename = path.join(PROJECT, 'public/fonts', font);
    if (!GlobalFonts.registerFromPath(filename, family)) throw new Error(`Police indisponible : ${font}`);
    sources.push({ key: family, path: `public/fonts/${font}`, sha256: createHash('sha256').update(await fs.readFile(filename)).digest('hex') });
  }
  const originalHash = createHash('sha256').update(await fs.readFile(ORIGINAL)).digest('hex');
  if (originalHash !== '35db1e06b74bee8d79d7acd236129633ab067bfefcee56c46d3688644ecabcf2') throw new Error('Le master V3 a changé');
  const oldCues = JSON.parse(await fs.readFile(path.join(ROOT, '../v3/exports/motion-cues.json'), 'utf8'));
  assets.introPreview = await loadImage(path.join(ROOT, '../v3/review/frame-1-7.jpg'));
  assets.introLate = await loadImage(path.join(ROOT, '../v3/review/frame-3-1.jpg'));
  const introCues = oldCues.cues.filter(event => event.time < INTRO_DURATION).map(event => ({ ...event, originalOpening: true }));
  const newCues = events.map(([time, kind, label]) => ({ time, frame: Math.round(time * FPS), audioTime: Math.round(time * FPS) / FPS, kind, label }));
  const tailCues = oldCues.cues.filter(event => event.time >= TAIL_START).map(event => ({ ...event, time: event.time + 5, frame: event.frame + 300, audioTime: event.audioTime + 5, preserved: true }));
  const cueManifest = { version: VERSION, revision: 5, bpm: 120, fps: FPS, duration: DURATION, cues: [...introCues, ...newCues, ...tailCues].sort((a, b) => a.frame - b.frame) };
  await fs.writeFile(path.join(OUTPUT, 'motion-cues.json'), JSON.stringify(cueManifest, null, 2) + '\n');
  await fs.writeFile(path.join(OUTPUT, 'sources.json'), JSON.stringify({ version: VERSION, revision: 5, title: TITLE, duration: DURATION, fps: FPS, width: WIDTH, height: HEIGHT, palette, fonts: ['Italiana', 'Amoria', 'Cabinet Grotesk'], assets: sources, opening: { source: 'versions/v3/exports/michel-djoumessi-v3-final.mp4', originalStart: 0, newStart: 0, duration: INTRO_DURATION, originalAnimation: true }, ending: { source: 'versions/v3/exports/michel-djoumessi-v3-final.mp4', sha256: originalHash, originalStart: TAIL_START, newStart: HEAD_DURATION, duration: ENDING_START - HEAD_DURATION, pictureOffset: 5 }, removedLogoReconstruction: true, onlyProject: { name: 'Zen', start: 30, end: 33.5, screensVisibleTogether: 3, search: 'Wong Kar-wai', typingSound: true }, addedTools: ['PHP', 'C++'], finalScreen: { start: ENDING_START, end: DURATION, reference: 'assets/reference-ending.png', title: 'ET SI ON TRAVAILLAIT ENSEMBLE ?', button: 'hey-michel.me' }, pointer: 'mouse', timeline: [...story.map(([start, end, name]) => ({ start, end, name })), { start: HEAD_DURATION, end: ENDING_START, name: 'Outils, verbes et signature conservés' }].sort((a, b) => a.start - b.start) }, null, 2) + '\n');
  return assets;
}

async function previews(canvas, ctx, assets) {
  const sheet = createCanvas(1600, Math.ceil(previewTimes.length / 4) * 250);
  const sc = sheet.getContext('2d');
  sc.fillStyle = palette.green;
  sc.fillRect(0, 0, sheet.width, sheet.height);
  for (const [index, time] of previewTimes.entries()) {
    const name = draw(ctx, time, assets);
    const buffer = canvas.toBuffer('image/jpeg', 92);
    await fs.writeFile(path.join(REVIEW, `frame-${time.toFixed(1).replace('.', '-')}.jpg`), buffer);
    const image = await loadImage(buffer);
    const x = index % 4 * 400;
    const y = Math.floor(index / 4) * 250;
    sc.drawImage(image, x, y, 400, 225);
    sc.fillStyle = '#fff';
    sc.font = '13px "Body"';
    sc.fillText(`${time.toFixed(1)}s · ${name}`, x + 8, y + 243);
  }
  await fs.writeFile(path.join(OUTPUT, 'storyboard.jpg'), sheet.toBuffer('image/jpeg', 93));
  draw(ctx, 19.5, assets);
  await fs.writeFile(path.join(OUTPUT, 'affiche.jpg'), canvas.toBuffer('image/jpeg', 94));
}

async function renderFrames(canvas, ctx, assets, start, end, name) {
  const filename = path.join(WORK, name);
  const encoder = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-framerate', `${FPS}`, '-i', 'pipe:0', '-an', '-vf', 'scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709', ...videoEncoding, '-movflags', '+faststart', filename], { windowsHide: true, stdio: ['pipe', 'inherit', 'inherit'] });
  let pipeError;
  encoder.stdin.on('error', error => { pipeError = error; });
  const completion = once(encoder, 'close');
  const count = Math.round((end - start) * FPS);
  const started = Date.now();
  for (let frame = 0; frame < count; frame += 1) {
    if (pipeError) throw pipeError;
    draw(ctx, start + frame / FPS, assets);
    if (!encoder.stdin.write(canvas.toBuffer('image/jpeg', 95))) await once(encoder.stdin, 'drain');
    if (frame % 120 === 0) console.log(JSON.stringify({ version: VERSION, segment: name, frame, count, percent: Math.round(frame / count * 100), seconds: Math.round((Date.now() - started) / 1000) }));
  }
  encoder.stdin.end();
  const [code] = await completion;
  if (code !== 0) throw new Error(`Rendu interrompu : ${code}`);
  return filename;
}

async function main() {
  await Promise.all([OUTPUT, REVIEW, WORK].map(folder => fs.mkdir(folder, { recursive: true })));
  const assets = await assetsAndManifest();
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  await previews(canvas, ctx, assets);
  if (process.argv.includes('--preview')) { console.log(`${VERSION} : storyboard prêt`); return; }
  await fs.access(path.join(OUTPUT, 'bande-son-originale.wav'));
  const head = process.argv.includes('--reuse-head') ? path.join(WORK, 'head.mp4') : await renderFrames(canvas, ctx, assets, INTRO_DURATION, HEAD_DURATION, 'head.mp4');
  const ending = process.argv.includes('--reuse-head') ? path.join(WORK, 'ending.mp4') : await renderFrames(canvas, ctx, assets, ENDING_START, DURATION, 'ending.mp4');
  const intro = path.join(WORK, 'intro-v3.mp4');
  ffmpeg(['-i', ORIGINAL, '-map', '0:v:0', '-an', '-frames:v', '240', ...videoEncoding, '-video_track_timescale', '15360', '-movflags', '+faststart', intro]);
  const tail = path.join(WORK, 'tail.mp4');
  ffmpeg(['-ss', `${TAIL_START}`, '-i', ORIGINAL, '-map', '0:v:0', '-an', '-frames:v', '420', ...videoEncoding, '-video_track_timescale', '15360', '-movflags', '+faststart', tail]);
  const list = path.join(WORK, 'concat.txt');
  await fs.writeFile(list, [intro, head, tail, ending].map(file => `file '${file.replaceAll('\\', '/')}'`).join('\n') + '\n');
  const picture = path.join(WORK, 'picture.mp4');
  ffmpeg(['-f', 'concat', '-safe', '0', '-i', list, '-map', '0:v:0', '-c:v', 'copy', '-movflags', '+faststart', picture]);
  const final = path.join(OUTPUT, `michel-djoumessi-${VERSION}.mp4`);
  ffmpeg(['-i', picture, '-i', path.join(OUTPUT, 'bande-son-originale.wav'), '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-t', `${DURATION}`, '-movflags', '+faststart', '-metadata', `title=Michel Djoumessi — ${TITLE} — ${VERSION}`, '-metadata', 'artist=Michel Djoumessi', final]);
  console.log(JSON.stringify({ version: VERSION, final, bytes: (await fs.stat(final)).size, duration: DURATION }));
}

main().catch(error => { console.error(error); process.exitCode = 1; });

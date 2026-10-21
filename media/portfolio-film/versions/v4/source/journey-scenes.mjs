import { palette, clamp, circle } from './graphics.mjs';
import { type, line, ornament, rounded } from './film-language.mjs';
import { stage, transform, beat, blend, headline, label, token, guides, identityOpening, endingWipe, rosette } from './motion-kit.mjs';

export const journeyCues = [
  [0.25, 'letter', 'Michel Djoumessi'], [1, 'tone', 'La curiosité'], [2.5, 'sweep', 'Sortir du cadre'],
  [4, 'tone', 'Une première piste'], [5.5, 'logo', 'Figma'], [7, 'hit', 'Le cadre résiste'],
  [7.5, 'click', 'Essayer une autre forme'], [8, 'tone', 'Le passage s’ouvre'], [9.5, 'sweep', 'La première découverte'],
  [11, 'logo', 'Next.js'], [12.5, 'tick', 'Changer de point de vue'], [14, 'hit', 'Le format est trop étroit'],
  [14.5, 'click', 'Adapter'], [15, 'tone', 'Le passage devient possible'], [16.5, 'sweep', 'Continuer'],
  [18, 'logo', 'Python'], [19.5, 'tick', 'Des éléments dispersés'], [21, 'hit', 'Un chemin interrompu'],
  [21.5, 'click', 'Organiser'], [22, 'tone', 'Le chemin se reconstruit'], [23.5, 'sweep', 'Prendre de la hauteur'],
  [25, 'tick', 'Explorer'], [26, 'tone', 'Aller plus loin'], [27, 'sweep', 'Le recul'],
  [29, 'hit', 'Mon propre chemin'], [30.5, 'sweep', 'L’étoile devient le final'],
];

export const journeyTimeline = [
  [0, 3, 'Michel Djoumessi'], [3, 10, 'Oser sortir du cadre'], [10, 17, 'Essayer une autre voie'],
  [17, 24, 'Comprendre et débloquer'], [24, 29, 'Aller plus loin'], [29, 31.5, 'Dessiner mon propre chemin'],
];

const CURVES = [
  [[0, -1600], [192, -320], [320, -192], [1600, 0]],
  [[1600, 0], [320, 192], [192, 320], [0, 1600]],
  [[0, 1600], [-192, 320], [-320, 192], [-1600, 0]],
  [[-1600, 0], [-320, -192], [-192, -320], [0, -1600]],
];

function point(progress) {
  const v = clamp(progress) * 4;
  const index = Math.min(3, Math.floor(v));
  const t = v - index;
  const u = 1 - t;
  const [a, b, c, d] = CURVES[index];
  return { x: u ** 3 * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t ** 3 * d[0], y: u ** 3 * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t ** 3 * d[1] };
}

function routeProgress(time) {
  const stops = [[3, 0], [6, 0.1], [7, 0.14], [7.5, 0.14], [8.5, 0.18], [10, 0.25], [13, 0.35], [14, 0.39], [14.5, 0.39], [15.5, 0.43], [17, 0.5], [20, 0.6], [21, 0.64], [21.5, 0.64], [22.5, 0.68], [24, 0.75], [27, 0.86], [29, 0.95], [30, 1]];
  if (time <= 3) return 0;
  for (let i = 1; i < stops.length; i += 1) {
    const [end, value] = stops[i];
    if (time <= end) {
      const [start, before] = stops[i - 1];
      return blend(before, value, beat(time, start, end - start));
    }
  }
  return 1;
}

function traceRoute(ctx, progress, color, width) {
  ctx.beginPath();
  const start = point(0);
  ctx.moveTo(start.x, start.y);
  const count = Math.ceil(progress * 240);
  for (let i = 1; i <= count; i += 1) {
    const position = point(Math.min(progress, i / 240));
    ctx.lineTo(position.x, position.y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function shapeGate(ctx, time) {
  const position = point(0.14);
  const open = beat(time, 7.5, 0.8);
  const appear = beat(time, 4.5, 0.8) * (1 - beat(time, 10, 0.8));
  transform(ctx, { ...position, alpha: appear, angle: -0.18 }, () => {
    for (let i = 4; i >= 0; i -= 1) {
      ctx.save();
      ctx.translate(i * -40, i * 18);
      ctx.rotate(i * 0.035);
      ctx.strokeStyle = i === 0 ? palette.green : '#a7bdb0';
      ctx.lineWidth = i === 0 ? 5 : 2;
      ctx.beginPath();
      ctx.roundRect(-255 - open * 70, -255 - open * 45, 510 + open * 140, 510 + open * 90, 8 + open * 245);
      ctx.stroke();
      ctx.restore();
    }
    guides(ctx, 510 + open * 140, 510 + open * 90, 0.65);
    const obstruction = 1 - open;
    rounded(ctx, -215 - open * 450, -34, 430, 68, 5, palette.green);
    ornament(ctx, 0, -35 - obstruction * 80, 12, 1, time, '#b4cdba');
  });
}

function adaptingGate(ctx, time) {
  const position = point(0.39);
  const open = beat(time, 14.5, 0.7);
  const appear = beat(time, 11, 0.8) * (1 - beat(time, 17, 0.8));
  transform(ctx, { ...position, alpha: appear, angle: 0.13 }, () => {
    for (let i = 2; i >= 0; i -= 1) {
      const width = blend(125, 380, open);
      transform(ctx, { x: (i - 1) * 300, y: Math.sin(time * 0.7 + i) * 25, angle: (i - 1) * 0.13 }, () => {
        rounded(ctx, -width / 2, -285, width, 570, 12, i === 1 ? palette.green : '#e6ede4', true);
        line(ctx, -width / 2, -240, width / 2, -240, '#8da997', 1);
        for (let row = 0; row < 4; row += 1) rounded(ctx, -width / 2 + 20, -150 + row * 68, width - 40, 37, 3, i === 1 ? '#8fab99' : '#b4cabb');
        if (open > 0.05 && i === 1) ornament(ctx, 0, 185, 28, open, time * 0.4, '#fff');
      });
    }
  });
}

function scatteredBridge(ctx, time) {
  const position = point(0.64);
  const open = beat(time, 21.5, 1.0);
  const appear = beat(time, 18, 0.8) * (1 - beat(time, 24, 0.8));
  transform(ctx, { ...position, alpha: appear, angle: -0.1 }, () => {
    for (let i = 0; i < 28; i += 1) {
      const row = Math.floor(i / 7);
      const col = i % 7;
      const settle = beat(time, 21.5 + col * 0.045, 0.7);
      const x = blend(Math.sin(i * 19.7) * 620, (col - 3) * 110, settle);
      const y = blend(Math.cos(i * 8.1) * 320, (row - 1.5) * 105, settle);
      transform(ctx, { x, y, angle: (1 - settle) * Math.sin(i) }, () => {
        rounded(ctx, -43, -43, 86, 86, 6, i % 5 === 0 ? palette.green : '#bed2c2', true);
        if (i % 5 === 0) ornament(ctx, 0, 0, 20, 1, open, '#fff');
      });
    }
    if (open > 0) line(ctx, -450, 280, -450 + open * 900, 280, palette.green, 3);
  });
}

function furtherSteps(ctx, time, progress) {
  const alpha = beat(time, 24, 0.7) * (1 - beat(time, 28.5));
  for (let i = 0; i < 7; i += 1) {
    const position = point(0.78 + i * 0.025);
    const arrival = beat(time, 24 + i * 0.22, 0.7);
    transform(ctx, { ...position, scale: 0.6 + arrival * 0.4, angle: i * -0.06, alpha: alpha * arrival }, () => {
      rounded(ctx, -150, -180, 300, 360, 8, i % 2 ? '#e3ebe0' : '#f9faf5', true);
      line(ctx, -120, -135, 120, -135, '#8da997', 1);
      rosette(ctx, 0, 0, 85, time + i);
    });
  }
  if (progress > 0.87) {
    const position = point(0.94);
    transform(ctx, { ...position, alpha }, () => type(ctx, 'PLUS LOIN.', 0, -250, 150, { color: palette.green }));
  }
}

export function drawJourney(ctx, time, assets) {
  stage(ctx, assets);
  identityOpening(ctx, assets, time);
  const enter = beat(time, 2.4, 0.7);
  const progress = routeProgress(time);
  const position = point(progress);
  const reveal = beat(time, 27.3, 3.1);
  const scale = blend(1.12, 0.21, reveal);
  const cameraX = blend(position.x - 80, 0, reveal);
  const cameraY = blend(position.y, 0, reveal);
  if (time > 2.4) {
    ctx.save();
    ctx.beginPath();
    const contentTop = blend(295, 120, reveal);
    ctx.rect(64, contentTop, 1792, 930 - contentTop);
    ctx.clip();
    transform(ctx, { x: 960, y: 580, scale, angle: (1 - reveal) * Math.sin(time * 0.28) * 0.055, alpha: enter }, () => {
      ctx.translate(-cameraX, -cameraY);
      traceRoute(ctx, 1, '#b9cbbc66', 2 / scale);
      traceRoute(ctx, progress, palette.green, 4 / scale);
      shapeGate(ctx, time);
      adaptingGate(ctx, time);
      scatteredBridge(ctx, time);
      furtherSteps(ctx, time, progress);
      const filled = beat(time, 29.5, 0.9);
      if (filled > 0) ornament(ctx, 0, 0, 1600, filled, 0, palette.green);
      const squash = [7, 14, 21].reduce((value, start) => value + Math.sin(clamp((time - start) / 0.5) * Math.PI) * (1 - beat(time, start + 0.5, 0.1)), 0);
      for (let i = 4; i > 0; i -= 1) {
        const ghost = point(Math.max(0, progress - i * 0.0025));
        ornament(ctx, ghost.x, ghost.y, 32, 0.04 * (5 - i) * (1 - reveal), time * 0.6, palette.green);
      }
      transform(ctx, { ...position, angle: time * 0.5, scale: blend(1, 2.4, reveal) }, () => {
        ctx.scale(1 + squash * 0.25, 1 - squash * 0.3);
        circle(ctx, 0, 0, 51, '#f4f6eb');
        ornament(ctx, 0, 0, 37, 1, 0, palette.green);
        circle(ctx, 0, 0, 61 + Math.sin(time * 2) * 3, '#9ab3a2aa', true);
      });
    });
    ctx.restore();
    if (time > 5 && time < 10) token(ctx, assets, 'figma', 150, 950, beat(time, 5.5) * (1 - beat(time, 9.5, 0.5)), 'Figma');
    if (time > 11 && time < 17) {
      const alpha = beat(time, 11) * (1 - beat(time, 16.5, 0.5));
      token(ctx, assets, 'nextjs', 150, 950, alpha, 'Next.js');
      token(ctx, assets, 'typescript', 1570, 950, alpha, 'TypeScript');
    }
    if (time > 18 && time < 24) token(ctx, assets, 'python', 150, 950, beat(time, 18) * (1 - beat(time, 23.5, 0.5)), 'Python');
    const title = time < 10 ? 'ET SI…' : time < 17 ? 'J’ESSAYAIS AUTREMENT ?' : time < 24 ? 'JE COMPRENAIS MIEUX ?' : 'J’ALLAIS PLUS LOIN ?';
    const titleStart = time < 10 ? 2.8 : time < 17 ? 10 : time < 24 ? 17 : 24;
    if (time < 28.6) headline(ctx, title, 145, 247, title.length > 18 ? 77 : 118, time - titleStart);
    const caption = time < 7.5 ? 'Un cadre n’est qu’un point de départ.' : time < 10 ? 'Une forme peut ouvrir une nouvelle voie.' : time < 14.5 ? 'Changer de format. Garder le mouvement.' : time < 17 ? 'Essayer, et trouver le passage.' : time < 21.5 ? 'Comprendre ce qui bloque.' : time < 24 ? 'Organiser, puis continuer.' : 'Chaque essai ouvre la suite.';
    if (time < 29) label(ctx, caption, 960, 985, enter * (1 - reveal * 0.6));
    if (time > 29) {
      const alpha = beat(time, 29, 0.5) * (1 - beat(time, 30.55, 0.4));
      label(ctx, 'La curiosité dessine mon chemin.', 960, 985, alpha);
    }
  }
  if (time < 3.2) ornament(ctx, 1570, blend(325, 580, beat(time, 2.2)), 35, beat(time, 0.8) * (1 - beat(time, 2.7, 0.4)), time * 0.8);
  endingWipe(ctx, time);
  return journeyTimeline.find(([start, end]) => time >= start && time < end)?.[2] ?? 'Vers le mouvement';
}

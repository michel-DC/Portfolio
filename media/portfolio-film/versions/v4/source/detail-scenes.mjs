import { pointer } from './film-language.mjs';
import { stage, beat, blend, headline, token, label } from './motion-kit.mjs';
import { curvePoint, sceneLayer } from './signal-language.mjs';
import { compositionScene, typographyScene } from './design-scenes.mjs';
import { pythonScene, deploymentScene, cloudScene, qualityScene, SHIPPING_ROUTE } from './delivery-scenes.mjs';
import { cameraShots, directedShot } from './shot-direction.mjs';
import { zenScene, SEARCH_START, SEARCH_STEP, SEARCH_QUERY } from './zen-scene.mjs';
import { addedTools, togetherEnding } from './ending-scenes.mjs';

export const detailCues = [
  [4, 'hit', 'Entrer dans la composition'], [4.6, 'sweep', 'Suivre le curseur'], [5.6, 'click', 'Ajuster le détail'],
  [6, 'tick', 'Aligner les angles'], [6.25, 'tick', 'Propager l’alignement'], [7, 'tone', 'Reculer pour vérifier'],
  [8.25, 'sweep', 'Entrer dans la forme'], [8.8, 'logo', 'Figma'], [9.35, 'tick', 'Tracer la courbe'],
  [9.6, 'click', 'Ajuster la poignée'], [10.25, 'tone', 'Équilibrer les formes'], [11.75, 'sweep', 'La forme devient un fichier'],
  [12, 'logo', 'Python'], [12.5, 'tick', 'Lire les fichiers'], [13.15, 'tick', 'Trier'], [13.8, 'click', 'Préparer la publication'],
  [14.5, 'tick', 'Assembler les ressources'], [15.25, 'tick', 'Vérifier le paquet'], [15.75, 'tone', 'Prêt à publier'],
  [16.75, 'sweep', 'Le code quitte le PC'], [17.35, 'logo', 'Next.js et TypeScript'], [17.85, 'click', 'Transmettre'],
  [18.2, 'tick', 'Suivre le paquet'], [19.15, 'hit', 'Le serveur reçoit'], [19.5, 'tick', 'Activer les services'],
  [20, 'tick', 'Le serveur répond'], [20.75, 'tone', 'Déploiement prêt'], [22.25, 'sweep', 'Rejoindre le cloud'],
  [22.8, 'tone', 'Publier'], [23.75, 'sweep', 'Le cloud se déploie'], [24.25, 'tick', 'Ouvrir les connexions'],
  [25, 'tick', 'Première connexion'], [25.5, 'tick', 'Deuxième connexion'], [26, 'tone', 'Accessible'],
  [27.75, 'sweep', 'Vérifier le chemin'], [28, 'tick', 'Préparer'], [28.5, 'click', 'Corriger le passage'],
  [29, 'tick', 'Connecter'], [29.5, 'tick', 'Vérifier'],
  [30, 'sweep', 'Zen · trois écrans'], [30.2, 'hit', 'Les écrans se déploient'], [30.7, 'sweep', 'Ouvrir la recherche'],
  ...[...SEARCH_QUERY].map((character, index) => [SEARCH_START + index * SEARCH_STEP, 'key', character]),
  [32.35, 'click', 'Lancer la recherche'], [32.55, 'hit', 'Le film apparaît'],
  [33.5, 'logo', 'PHP'], [34, 'logo', 'C++'],
];

export const detailTimeline = [
  [0, 4, 'Ouverture originale V3 · Michel Djoumessi'], [4, 8.25, 'Ajuster la composition'],
  [8.25, 11.75, 'Affiner une forme'], [11.75, 16.75, 'Python · préparer et organiser'],
  [16.75, 22.25, 'Du PC aux serveurs'], [22.25, 27.75, 'Du cloud au monde'],
  [27.75, 30, 'Vérifier et relier'], [30, 33.5, 'Zen · Wong Kar-wai'],
  [33.5, 34.5, 'Outils supplémentaires · PHP et C++'],
  [41.5, 45, 'Et si on travaillait ensemble ?'],
];

const ANCHORS = [
  [4, 1610, 390], [4.6, 1470, 580], [5.6, 1125, 650], [6, 1140, 640], [6.75, 1550, 820],
  [7.5, 1570, 430], [8.25, 1490, 510], [8.8, 1470, 490], [9.6, 1380, 490], [10.25, 1350, 490],
  [11, 1220, 740], [11.75, 410, 525], [12.5, 460, 525], [13.15, 430, 595], [13.8, 820, 655],
  [14.5, 1410, 615], [15.25, 1490, 610], [15.75, 1490, 610], [16.75, 640, 600], [17.85, 635, 600],
  [19.15, 1180, 540], [20, 1370, 490], [21, 1450, 710], [22.25, 1320, 600], [22.8, 960, 690],
  [23.75, 960, 500], [24.5, 1170, 545], [25.5, 1530, 600], [26.5, 1440, 815], [27.75, 330, 600],
  [28.55, 700, 600], [29.8, 1120, 600], [30.5, 1590, 600], [31.5, 960, 630],
];

function conductorPosition(time) {
  if (time >= 17.85 && time <= 19.15) return curvePoint(SHIPPING_ROUTE, (time - 17.85) / 1.3);
  if (time >= 28.55 && time <= 29.8) return curvePoint([[700, 600], [830, 320], [1020, 340], [1120, 600]], (time - 28.55) / 1.25);
  if (time <= ANCHORS[0][0]) return { x: ANCHORS[0][1], y: ANCHORS[0][2] };
  for (let i = 1; i < ANCHORS.length; i += 1) {
    const [end, x, y] = ANCHORS[i];
    if (time > end) continue;
    const [start, oldX, oldY] = ANCHORS[i - 1];
    const p = beat(time, start, end - start);
    const swing = Math.sin(p * Math.PI) * Math.min(85, Math.hypot(x - oldX, y - oldY) * 0.15);
    return { x: blend(oldX, x, p), y: blend(oldY, y, p) - swing };
  }
  return { x: 960, y: 630 };
}

function conductor(ctx, time) {
  const alpha = beat(time, 4, 0.35) * (1 - beat(time, 31.1, 0.4));
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  const point = conductorPosition(time);
  const pressStart = [5.6, 9.6, 13.8, 17.85, 28.5].find(start => time >= start && time < start + 0.22);
  pointer(ctx, point.x, point.y, pressStart === undefined ? 0 : (time - pressStart) / 0.22);
  ctx.restore();
}

export function drawDetail(ctx, time, assets) {
  if (time < 4) {
    ctx.drawImage(time > 2.5 ? assets.introLate : assets.introPreview, 0, 0, 1920, 1080);
    return 'Ouverture V3';
  }
  if (time >= 41.5) { togetherEnding(ctx, time, assets); return 'Et si on travaillait ensemble ?'; }
  if (time >= 33.5) { addedTools(ctx, time, assets); return 'PHP et C++'; }
  stage(ctx, assets);
  if (time >= 30) zenScene(ctx, time, assets);
  else {
    const scenes = [
      [4, 8.5, 'composition', compositionScene], [8.25, 12, 'typography', typographyScene],
      [11.75, 17, 'python', pythonScene], [16.75, 22.5, 'deployment', deploymentScene],
      [22.25, 28, 'cloud', cloudScene], [27.75, 30.15, 'quality', qualityScene],
    ];
    for (const [start, end, key, draw] of scenes) {
      const sceneTime = key === 'quality' ? 27.75 + (time - 27.75) * 3.75 / 2.25 : time;
      sceneLayer(ctx, time, start, end, () => directedShot(ctx, time, cameraShots[key], () => {
        draw(ctx, sceneTime, assets);
        conductor(ctx, sceneTime);
      }));
    }
    const heading = time < 11.75 ? 'ENCORE UN DÉTAIL.' : time < 22.25 ? 'UNE IDÉE DOIT AUSSI FONCTIONNER.' : 'ET TROUVER SA PLACE.';
    const start = time < 11.75 ? 4 : time < 22.25 ? 11.75 : 22.25;
    const zoom = beat(time, 4.45, 0.7) * (1 - beat(time, 6.7, 0.7));
    ctx.save();
    ctx.globalAlpha = 1 - zoom;
    headline(ctx, heading, 145, 250, heading.length > 27 ? 68 : 102, time - start);
    ctx.restore();
    const caption = time < 8.25 ? 'Un détail. Un geste. Tout s’aligne.' : time < 11.75 ? 'Trouver l’équilibre, jusque dans les formes.' : time < 16.75 ? 'Préparer, trier, automatiser.' : time < 22.25 ? 'Du code à une application en ligne.' : time < 27.75 ? 'Connecter. Rendre accessible.' : 'Vérifier le trajet. Corriger le passage.';
    label(ctx, caption, 960, 980);
    if (time < 11.75) token(ctx, assets, 'figma', 150, 955, 1, 'Figma');
    else if (time < 16.75) token(ctx, assets, 'python', 150, 955, 1, 'Python');
    else if (time < 22.25) {
      token(ctx, assets, 'nextjs', 150, 955, 1, 'Next.js');
      token(ctx, assets, 'typescript', 1580, 955, 1, 'TypeScript');
    }
  }
  return detailTimeline.find(([start, end]) => time >= start && time < end)?.[2] ?? 'Final V3';
}

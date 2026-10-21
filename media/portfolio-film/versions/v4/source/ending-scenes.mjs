import { palette, clamp, circle } from './graphics.mjs';
import { type, icon, pose, smooth, backdrop } from './film-language.mjs';
import { paper, spring, pill, arrow, cursor, letters } from '../../v1/source/brand-graphics.mjs';
import { masthead } from './editorial-graphics.mjs';

export function addedTools(ctx, time, assets) {
  const index = time < 34 ? 0 : 1;
  const local = time - 33.5 - index * 0.5;
  const name = index === 0 ? 'PHP' : 'C++';
  const key = index === 0 ? 'php' : 'cplusplus';
  const arrive = 1 - Math.pow(1 - clamp(local / 0.18), 5);
  const leave = smooth((local - 0.33) / 0.17);
  backdrop(ctx, assets);
  type(ctx, 'LES OUTILS.', 960, 205, 110, { color: palette.green });
  pose(ctx, local, () => ({ x: 960, y: 570 + (1 - arrive) * 320 - leave * 320, alpha: arrive * (1 - leave) }), () => {
    ctx.font = '110px "Body"';
    const width = ctx.measureText(name).width;
    circle(ctx, -width / 2 - 80, -35, 84, '#fff');
    icon(ctx, assets, key, -width / 2 - 80, -35, 92);
    type(ctx, name, 90, 0, 110, { family: 'Body' });
  }, true);
  type(ctx, 'Des outils que je relie dans mes créations.', 960, 988, 35, { family: 'Body', color: palette.green });
  masthead(ctx, assets);
}

export function togetherEnding(ctx, time, assets) {
  const t = time - 41.5;
  paper(ctx, assets);
  letters(ctx, 'ET SI ON TRAVAILLAIT', 960, 357, 107, t - 0.05, { align: 'center', stagger: 0.017 });
  letters(ctx, 'ENSEMBLE ?', 960, 575, 190, t - 0.28, { align: 'center', color: palette.green, stagger: 0.035 });
  const pop = Math.max(0.01, spring((t - 0.8) / 0.5));
  ctx.save();
  ctx.translate(960, 713);
  ctx.scale(pop, pop);
  pill(ctx, 'hey-michel.me', -210, -43, { width: 360, height: 86, size: 34, solid: true });
  const press = Math.sin(clamp((t - 2) / 0.3) * Math.PI);
  circle(ctx, 202, 0, 43 - press * 4, palette.green);
  arrow(ctx, 202, press * 2, 20 - press * 2, palette.white);
  ctx.restore();
  const arrive = 1 - Math.pow(1 - clamp((t - 1.2) / 0.65), 5);
  if (t > 1.2) cursor(ctx, 1510 + (1164 - 1510) * arrive, 935 + (723 - 935) * arrive, clamp((t - 2) / 0.3));
}

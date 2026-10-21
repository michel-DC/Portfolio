import { palette, clamp } from './graphics.mjs';
import { type, line, rounded, pointer } from './film-language.mjs';
import { beat, blend, spring, transform } from './motion-kit.mjs';
import { letters } from './editorial-graphics.mjs';

export const ZEN_START = 30;
export const SEARCH_START = 31.25;
export const SEARCH_STEP = 1 / 12;
export const SEARCH_QUERY = 'Wong Kar-wai';

export function zenScene(ctx, time, assets) {
  const t = time - ZEN_START;
  const count = clamp(Math.floor((time - SEARCH_START) / SEARCH_STEP) + 1, 0, SEARCH_QUERY.length);
  letters(ctx, 'ZEN.', 140, 335, 170, t, { stagger: 0.025 });
  type(ctx, 'Du code au cinéma.', 150, 405, 35, { align: 'left', family: 'Body', color: palette.green });
  const frames = [{ key: 'zenCatalog', x: 1010, y: 620, height: 620, angle: -0.12 }, { key: 'zenSearch', x: 1550, y: 620, height: 620, angle: 0.1 }, { key: 'zenHome', x: 1280, y: 565, height: 790, angle: -0.015 }];
  frames.forEach(({ key, x, y, height, angle }, index) => {
    const arrival = Math.max(0.01, spring((t - index * 0.07) / 0.5));
    const screen = assets[key];
    const width = height * screen.width / screen.height;
    const split = beat(t, 0.5, 0.35);
    const response = beat(t, 2.42, 0.25);
    transform(ctx, { x: blend(1280, x, split), y: y + (1 - arrival) * 1000 - response * (index === 2 ? 28 : -15), scale: arrival, angle: angle * split }, () => {
      ctx.shadowColor = '#00000030';
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 20;
      ctx.drawImage(screen, -width / 2, -height / 2, width, height);
      if (index === 2 && response > 0) {
        ctx.globalAlpha *= response;
        ctx.drawImage(assets.zenMovie, -width / 2, -height / 2, width, height);
      }
    });
  });
  const search = spring((t - 0.7) / 0.4);
  transform(ctx, { x: 425, y: 660 + (1 - search) * 190, scale: Math.max(0.01, search) }, () => {
    rounded(ctx, -285, -43, 570, 86, 43, '#fff', true);
    ctx.strokeStyle = palette.green;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(-240, -3, 12, 0, Math.PI * 2);
    ctx.stroke();
    line(ctx, -232, 7, -220, 19, palette.green, 2.5);
    const value = count ? SEARCH_QUERY.slice(0, count) : 'Quel film ce soir ?';
    type(ctx, value, -190, 10, 32, { family: 'Body', align: 'left', color: count ? palette.ink : '#8a9690' });
    if (time >= SEARCH_START && time < 32.4) {
      ctx.font = '32px "Body"';
      const pen = -185 + ctx.measureText(SEARCH_QUERY.slice(0, count)).width;
      line(ctx, pen, -23, pen, 16, palette.green, 2);
    }
    line(ctx, 220, 12, 241, -9, palette.green, 2);
    line(ctx, 223, -9, 241, -9, palette.green, 2);
    line(ctx, 241, -9, 241, 9, palette.green, 2);
  });
  const click = beat(time, 32.35, 0.18);
  const travel = beat(time, 30.9, 0.3);
  pointer(ctx, blend(790, 670, travel), blend(870, 667, travel), click);
}

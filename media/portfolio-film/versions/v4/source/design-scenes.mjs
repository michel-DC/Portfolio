import { palette, circle } from './graphics.mjs';
import { type, line, rounded, ornament } from './film-language.mjs';
import { beat, blend, spring, transform, panel, guides, token, label } from './motion-kit.mjs';
import { pulse, curvePoint, route } from './signal-language.mjs';

export function compositionScene(ctx, time, assets) {
  const t = time - 4;
  const align = spring((t - 1.6) / 0.65);
  const zoom = beat(t, 0.45, 0.7) * (1 - beat(t, 2.7, 0.7));
  const open = beat(t, 0, 0.7);
  transform(ctx, { x: 960 - zoom * 240, y: 620, scale: (0.82 + zoom * 0.46) * open, angle: (1 - open) * -0.1 }, () => {
    panel(ctx, assets, 1260, 565, t * 1.7, { aligned: align, active: beat(t, 2) });
    guides(ctx, 1288, 590, (1 - beat(t, 3.4)) * beat(t, 0.6));
    const x = 315 + (1 - align) * 36;
    const y = 24 + (1 - align) * 21;
    pulse(ctx, x, y, t, 1.6, 140);
    for (let i = 0; i < 4; i += 1) {
      const a = beat(t, 2 + i * 0.12, 0.5);
      const dx = [-640, 640, 640, -640][i];
      const dy = [-290, -290, 290, 290][i];
      circle(ctx, dx, dy, 4 + Math.sin(a * Math.PI) * 12, '#799d86');
    }
  });
  token(ctx, assets, 'figma', 150, 960, beat(t, 0.5), 'Figma');
  label(ctx, time < 5.6 ? 'Un détail attire mon regard.' : 'Le bon geste remet tout en place.', 960, 980, 1 - zoom);
}

export function typographyScene(ctx, time, assets) {
  const t = time - 8.25;
  const tracking = blend(95, 0, spring((t - 1) / 0.65));
  const sketch = beat(t, 0.2, 1);
  transform(ctx, { x: 960, y: 610, scale: 0.94 + Math.sin(t * 1.8) * 0.025, angle: Math.sin(t * 1.2) * 0.008 }, () => {
    rounded(ctx, -740, -275, 1480, 550, 6, '#f6f8f1', true);
    line(ctx, -640, -155, 640, -155, '#9eb5a4', 1);
    line(ctx, -640, 150, 640, 150, '#9eb5a4', 1);
    line(ctx, 0, -220, 0, 220, '#abc0af', 1, true);
    type(ctx, 'A', -220 - tracking, 125, 410, { color: palette.green });
    type(ctx, 'a', 200 + tracking, 125, 410, { family: 'Amoria' });
    const points = [[270, -40], [460, -260], [610, 120], [420, 140]];
    route(ctx, points, sketch, '#729b83', 3);
    const point = curvePoint(points, sketch);
    circle(ctx, point.x, point.y, 8, palette.green);
    const handle = blend(540, 415, beat(t, 1.1, 0.8));
    line(ctx, 270, -40, handle, -120, '#9ab4a2', 2);
    circle(ctx, handle, -120, 7, palette.green);
    pulse(ctx, handle, -120, t, 1.1, 95);
    for (const x of [-570, 570]) ornament(ctx, x, 215, 15, beat(t, 1.9), t, palette.green);
  });
  token(ctx, assets, 'figma', 150, 960, 1, 'Figma');
  label(ctx, 'Trouver l’équilibre, jusque dans les formes.', 960, 980);
}

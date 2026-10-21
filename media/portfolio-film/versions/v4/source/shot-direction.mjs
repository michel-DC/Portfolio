import { clamp } from './graphics.mjs';
import { blend } from './motion-kit.mjs';

export const cameraShots = {
  composition: [[4, 960, 600, 1], [4.55, 1120, 600, 1.12], [5.8, 1120, 600, 1.12], [6.15, 960, 600, 1], [7.5, 960, 600, 1.04]],
  typography: [[8.25, 960, 600, 1], [9.2, 960, 600, 1.02], [9.65, 1370, 500, 1.3], [10.3, 1370, 500, 1.3], [10.65, 960, 600, 1]],
  python: [[11.75, 960, 595, 1], [12.2, 700, 570, 1.2], [13.5, 700, 570, 1.23], [14, 1380, 590, 1.28], [15.45, 1380, 590, 1.28], [16.1, 960, 595, 1]],
  deployment: [[16.75, 960, 600, 1], [17.25, 510, 590, 1.25], [17.85, 635, 600, 1.25], [18.5, 900, 450, 1.25], [19.15, 1270, 545, 1.23], [20.2, 1270, 545, 1.23], [20.75, 960, 600, 1], [21.75, 960, 600, 1.03]],
  cloud: [[22.25, 960, 600, 1], [22.85, 960, 550, 1.25], [23.75, 960, 550, 1.25], [24.1, 960, 600, 1.02], [25.1, 960, 600, 1.06], [25.55, 1350, 500, 1.2], [26.15, 1350, 500, 1.2], [26.65, 960, 600, 1]],
  quality: [[27.75, 650, 530, 1.15], [28.25, 900, 480, 1.18], [29, 1250, 570, 1.15], [29.65, 960, 600, 1]],
};

function shotAt(time, shots) {
  if (time <= shots[0][0]) return shots[0].slice(1);
  for (let index = 1; index < shots.length; index += 1) {
    const [end, x, y, scale] = shots[index];
    if (time > end) continue;
    const [start, oldX, oldY, oldScale] = shots[index - 1];
    const progress = 1 - Math.pow(1 - clamp((time - start) / (end - start)), 4);
    return [blend(oldX, x, progress), blend(oldY, y, progress), blend(oldScale, scale, progress)];
  }
  return shots.at(-1).slice(1);
}

export function directedShot(ctx, time, shots, draw) {
  const [x, y, scale] = shotAt(time, shots);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 290, 1920, 630);
  ctx.clip();
  ctx.translate(960, 600);
  ctx.scale(scale, scale);
  ctx.translate(-x, -y);
  draw();
  ctx.restore();
}

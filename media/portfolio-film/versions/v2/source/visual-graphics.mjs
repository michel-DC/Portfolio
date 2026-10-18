import { WIDTH, HEIGHT, palette, clamp, ease, lerp, text, cover, circle } from "./graphics.mjs";
import { paper, caption, spring } from "./brand-graphics.mjs";

export function backdrop(ctx, assets, inverse = false) {
  if (inverse) {
    ctx.fillStyle = palette.green;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.save();
    ctx.globalAlpha = 0.025;
    ctx.fillStyle = ctx.createPattern(assets.texture, "repeat");
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
  } else paper(ctx, assets);
}

export function signatureMark(ctx, assets, inverse = false) {
  ctx.save();
  ctx.globalAlpha = 0.8;
  if (!inverse) ctx.drawImage(assets.logo, 64, 47, 35, 31);
  caption(ctx, "Michel Djoumessi", inverse ? 64 : 119, 72, 22, inverse ? palette.white : palette.ink);
  caption(ctx, "Design & développement web", 1855, 72, 22, inverse ? palette.pale : palette.green, "right");
  ctx.restore();
}

export function star(ctx, x, y, radius, rotation = 0, color = palette.green) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.bezierCurveTo(radius * 0.12, -radius * 0.2, radius * 0.2, -radius * 0.12, radius, 0);
  ctx.bezierCurveTo(radius * 0.2, radius * 0.12, radius * 0.12, radius * 0.2, 0, radius);
  ctx.bezierCurveTo(-radius * 0.12, radius * 0.2, -radius * 0.2, radius * 0.12, -radius, 0);
  ctx.bezierCurveTo(-radius * 0.2, -radius * 0.12, -radius * 0.12, -radius * 0.2, 0, -radius);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

export function disc(ctx, assets, key, x, y, size, options = {}) {
  const image = assets[key];
  const angle = options.angle ?? 0;
  const turn = Math.max(0.08, Math.abs(Math.cos(angle)));
  const arrival = options.arrival ?? 1;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(arrival * turn, arrival);
  ctx.shadowColor = options.inverse ? "#00170f40" : "#173f3520";
  ctx.shadowBlur = 25;
  ctx.shadowOffsetY = 12;
  circle(ctx, 0, 0, size / 2, "#ffffff");
  ctx.shadowColor = "transparent";
  if (turn > 0.16) {
    const scale = Math.min(size * 0.61 / image.width, size * 0.61 / image.height);
    ctx.drawImage(image, -image.width * scale / 2, -image.height * scale / 2, image.width * scale, image.height * scale);
  }
  ctx.restore();
  if (options.label && arrival > 0.8) {
    ctx.save();
    ctx.globalAlpha = clamp((arrival - 0.8) / 0.2);
    caption(ctx, options.label, x, y + size / 2 + 39, 27, options.inverse ? palette.white : palette.green, "center");
    ctx.restore();
  }
}

export function maskedWord(ctx, value, y, size, progress, options = {}) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, y - size, WIDTH, size * 1.3);
  ctx.clip();
  const arrival = spring(progress);
  ctx.translate(960 + (options.offsetX ?? 0), y + (1 - arrival) * size * 1.2);
  ctx.rotate((1 - arrival) * (options.rotation ?? 0.035));
  ctx.scale(1 + (1 - arrival) * 0.2, 1);
  text(ctx, value, 0, 0, size, options.color ?? palette.ink, { family: "Editorial", align: "center", stroke: options.stroke ?? false, lineWidth: 1.5 });
  ctx.restore();
}

export function photoWindow(ctx, image, x, y, width, height, options = {}) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(options.rotation ?? 0);
  ctx.beginPath();
  ctx.roundRect(-width / 2, -height / 2, width, height, options.radius ?? 13);
  ctx.clip();
  cover(ctx, image, { x: -width / 2, y: -height / 2, width, height }, options.zoom ?? 1, options.positionX ?? 0.5, options.positionY ?? 0.35);
  ctx.restore();
}

function projectPoint(x, y, width, height, options) {
  const localX = x * width;
  const localY = y * height;
  const angleY = options.angleY ?? 0;
  const angleX = options.angleX ?? 0;
  const angleZ = options.angleZ ?? 0;
  const rotatedX = localX * Math.cos(angleY);
  const depth = -localX * Math.sin(angleY);
  const rotatedY = localY * Math.cos(angleX) - depth * Math.sin(angleX);
  const finalDepth = localY * Math.sin(angleX) + depth * Math.cos(angleX);
  const perspective = 1600 / (1600 + finalDepth);
  return {
    x: options.x + (rotatedX * Math.cos(angleZ) - rotatedY * Math.sin(angleZ)) * perspective,
    y: options.y + (rotatedX * Math.sin(angleZ) + rotatedY * Math.cos(angleZ)) * perspective,
  };
}

function texturedTriangle(ctx, image, source, target) {
  const [s0, s1, s2] = source;
  const [d0, d1, d2] = target;
  const determinant = s0.x * (s1.y - s2.y) + s1.x * (s2.y - s0.y) + s2.x * (s0.y - s1.y);
  if (Math.abs(determinant) < 0.001) return;
  const a = (d0.x * (s1.y - s2.y) + d1.x * (s2.y - s0.y) + d2.x * (s0.y - s1.y)) / determinant;
  const c = (d0.x * (s2.x - s1.x) + d1.x * (s0.x - s2.x) + d2.x * (s1.x - s0.x)) / determinant;
  const e = (d0.x * (s1.x * s2.y - s2.x * s1.y) + d1.x * (s2.x * s0.y - s0.x * s2.y) + d2.x * (s0.x * s1.y - s1.x * s0.y)) / determinant;
  const b = (d0.y * (s1.y - s2.y) + d1.y * (s2.y - s0.y) + d2.y * (s0.y - s1.y)) / determinant;
  const d = (d0.y * (s2.x - s1.x) + d1.y * (s0.x - s2.x) + d2.y * (s1.x - s0.x)) / determinant;
  const f = (d0.y * (s1.x * s2.y - s2.x * s1.y) + d1.y * (s2.x * s0.y - s0.x * s2.y) + d2.y * (s0.x * s1.y - s1.x * s0.y)) / determinant;
  ctx.save();
  const center = { x: (d0.x + d1.x + d2.x) / 3, y: (d0.y + d1.y + d2.y) / 3 };
  const distances = target.map((point, index) => {
    const next = target[(index + 1) % 3];
    return Math.abs((next.y - point.y) * center.x - (next.x - point.x) * center.y + next.x * point.y - next.y * point.x) / Math.max(0.001, Math.hypot(next.y - point.y, next.x - point.x));
  });
  const expansion = 1 + 1.25 / Math.max(0.1, Math.min(...distances));
  ctx.beginPath();
  target.forEach((point, index) => {
    const x = center.x + (point.x - center.x) * expansion;
    const y = center.y + (point.y - center.y) * expansion;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.clip();
  ctx.transform(a, b, c, d, e, f);
  ctx.drawImage(image, 0, 0);
  ctx.restore();
}

export function perspectivePhoto(ctx, image, width, height, options) {
  if (options.x < -width || options.x > WIDTH + width) return;
  const cropScale = Math.max(width / image.width, height / image.height);
  const cropWidth = width / cropScale;
  const cropHeight = height / cropScale;
  const sourceX = (image.width - cropWidth) / 2;
  const sourceY = (image.height - cropHeight) * (options.positionY ?? 0.32);
  const columns = 8;
  const rows = 2;
  ctx.save();
  const corners = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]].map(([x, y]) => projectPoint(x, y, width, height, options));
  ctx.beginPath();
  corners.forEach((point, index) => index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y));
  ctx.closePath();
  ctx.shadowColor = "#173f3533";
  ctx.shadowBlur = 35;
  ctx.shadowOffsetY = 23;
  ctx.fillStyle = palette.white;
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.clip();
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const uv = [[column / columns, row / rows], [(column + 1) / columns, row / rows], [(column + 1) / columns, (row + 1) / rows], [column / columns, (row + 1) / rows]];
      const source = uv.map(([u, v]) => ({ x: sourceX + cropWidth * u, y: sourceY + cropHeight * v }));
      const target = uv.map(([u, v]) => projectPoint(u - 0.5, v - 0.5, width, height, options));
      texturedTriangle(ctx, image, [source[0], source[1], source[2]], [target[0], target[1], target[2]]);
      texturedTriangle(ctx, image, [source[0], source[2], source[3]], [target[0], target[2], target[3]]);
    }
  }
  ctx.restore();
}

export function starTransition(ctx, progress, options = {}) {
  if (progress <= 0) return;
  star(ctx, options.x ?? 960, options.y ?? 540, 40 + ease(progress) * 6000, progress * 0.3, options.color ?? palette.green);
}

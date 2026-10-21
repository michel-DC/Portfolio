import { palette, clamp, circle } from './graphics.mjs';
import { type, line, rounded, ornament } from './film-language.mjs';
import { beat, blend, transform, token, label } from './motion-kit.mjs';
import { curvePoint, route, pulse, packet, check, status } from './signal-language.mjs';

export const SHIPPING_ROUTE = [[635, 600], [780, 365], [1000, 365], [1180, 540]];

export function pythonScene(ctx, time, assets) {
  const t = time - 11.75;
  transform(ctx, { x: 960, y: 595, scale: 0.96 + Math.sin(t * 1.4) * 0.015, angle: Math.sin(t) * 0.012 }, () => {
    rounded(ctx, -710, -240, 1420, 480, 12, palette.green, true);
    line(ctx, -710, -175, 710, -175, '#648774', 1);
    for (let i = 0; i < 3; i += 1) circle(ctx, -675 + i * 20, -207, 4, '#93b5a0');
    type(ctx, 'préparer.py', -570, -195, 26, { align: 'left', family: 'Body', color: '#c9decc' });
    const statements = ['from pathlib import Path', 'images = sorted(Path("public").rglob("*.webp"))', 'print("Prêt à publier.")'];
    statements.forEach((statement, index) => {
      const arrival = beat(t, 0.35 + index * 0.45, 0.55);
      const y = -70 + index * 68;
      const active = beat(t, 0.7 + index * 0.6, 0.2) * (1 - beat(t, 1.5 + index * 0.6, 0.25));
      rounded(ctx, -655, y - 37, 930 * active, 51, 4, '#315d49');
      type(ctx, String(index + 1).padStart(2, '0'), -670, y, 24, { align: 'left', family: 'Body', color: '#86aa92' });
      ctx.save();
      ctx.globalAlpha = arrival;
      type(ctx, statement.slice(0, Math.ceil(statement.length * arrival)), -610, y, 29, { align: 'left', family: 'Body', color: index === 2 ? '#dce8c7' : '#ffffff' });
      ctx.restore();
    });
    line(ctx, 360, -130, 360, 155, '#6b9077', 1);
    for (let i = 0; i < 5; i += 1) {
      const a = beat(t, 1.5 + i * 0.2, 0.65);
      const join = beat(t, 3.4 + i * 0.035, 0.65);
      const x = blend(510 + Math.sin(i * 1.8) * 85, 535, join);
      const y = blend(-80 + i * 43, 15, join);
      packet(ctx, x + (1 - a) * 110, y, 66, (1 - join) * Math.sin(i) * 0.15, a);
    }
    const ready = beat(t, 3.5, 0.65);
    rounded(ctx, 425, 120, 230 * ready, 46, 23, '#dce8d4');
    if (ready > 0) type(ctx, 'Prêt à publier', 540, 151, 25, { family: 'Body', color: palette.green });
    pulse(ctx, 535, 15, t, 3.4, 145, '#c7dbbc');
  });
  token(ctx, assets, 'python', 150, 955, beat(t, 0.2), 'Python');
  label(ctx, 'Préparer, trier, automatiser : Python fait le lien.', 960, 980);
}

function laptop(ctx, x, y, time, scale = 1) {
  transform(ctx, { x, y, scale, angle: Math.sin(time * 1.8) * 0.009 }, () => {
    rounded(ctx, -285, -180, 570, 350, 14, '#b9cbbb', true);
    rounded(ctx, -271, -167, 542, 320, 8, palette.green);
    for (let i = 0; i < 5; i += 1) {
      const width = 160 + [80, 160, 30, 220, 110][i];
      rounded(ctx, -230, -112 + i * 45, width, 10, 4, i === 2 ? '#dce8c2' : '#93b49a');
      circle(ctx, -247, -107 + i * 45, 3, '#5b896c');
    }
    ctx.beginPath();
    ctx.moveTo(-285, 170);
    ctx.lineTo(285, 170);
    ctx.lineTo(345, 211);
    ctx.quadraticCurveTo(350, 225, 320, 225);
    ctx.lineTo(-320, 225);
    ctx.quadraticCurveTo(-350, 225, -345, 211);
    ctx.closePath();
    ctx.fillStyle = '#d4e0d3';
    ctx.fill();
    line(ctx, -65, 190, 65, 190, '#90aa93', 4);
  });
}

function server(ctx, x, y, time, progress, index = 0) {
  transform(ctx, { x, y, angle: -0.025 + index * 0.015, scale: 0.94 + progress * 0.06 }, () => {
    ctx.beginPath();
    ctx.moveTo(95, -230);
    ctx.lineTo(145, -260);
    ctx.lineTo(145, 190);
    ctx.lineTo(95, 230);
    ctx.closePath();
    ctx.fillStyle = '#b4c8b5';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-95, -230);
    ctx.lineTo(-45, -260);
    ctx.lineTo(145, -260);
    ctx.lineTo(95, -230);
    ctx.closePath();
    ctx.fillStyle = '#e1e9dc';
    ctx.fill();
    rounded(ctx, -95, -230, 190, 460, 8, '#ecf1e7', true);
    for (let row = 0; row < 5; row += 1) {
      const active = beat(time, 2.2 + row * 0.18 + index * 0.25, 0.25);
      rounded(ctx, -78, -204 + row * 82, 156, 64, 5, active > 0.5 ? palette.green : '#ceddcb');
      for (let slot = 0; slot < 4; slot += 1) line(ctx, -58 + slot * 12, -180 + row * 82, -58 + slot * 12, -161 + row * 82, active > 0.5 ? '#7da58b' : '#a0b79e', 2);
      circle(ctx, 48, -174 + row * 82, 5, active > 0.5 ? '#d9e8b9' : '#91ad91');
      pulse(ctx, 48, -174 + row * 82, time, 2.2 + row * 0.18 + index * 0.25, 28, '#6f9f7b');
    }
  });
}

export function deploymentScene(ctx, time, assets) {
  const t = time - 16.75;
  const enter = beat(t, 0.15, 0.65);
  laptop(ctx, blend(700, 430, enter), 600, t, blend(1.12, 0.86, enter));
  transform(ctx, { x: 1300, y: 575 + (1 - enter) * 120, scale: enter, alpha: enter }, () => {
    server(ctx, 100, -30, t, beat(t, 2), 1);
    server(ctx, -115, 35, t, beat(t, 2));
  });
  route(ctx, SHIPPING_ROUTE, beat(t, 0.8, 0.7), '#99b5a0', 2);
  for (let i = 0; i < 5; i += 1) {
    const progress = clamp((t - 1.1 - i * 0.32) / 1.3);
    if (progress <= 0 || progress >= 1) continue;
    const point = curvePoint(SHIPPING_ROUTE, progress);
    packet(ctx, point.x, point.y, 40 - i * 2, Math.sin(progress * Math.PI) * -0.2);
  }
  for (let i = 0; i < 4; i += 1) {
    const progress = clamp((t - 3.15 - i * 0.13) / 0.7);
    const point = curvePoint([[1180, 540], [1070, 790], [780, 790], [635, 600]], progress);
    if (progress > 0 && progress < 1) circle(ctx, point.x, point.y, 5, '#79a087');
  }
  status(ctx, 'Préparé', 530, 870, beat(t, 0.8));
  status(ctx, 'Transmis', 980, 870, beat(t, 2.5));
  status(ctx, 'Déployé', 1410, 870, beat(t, 4.1));
  token(ctx, assets, 'nextjs', 150, 955, beat(t, 0.6), 'Next.js');
  token(ctx, assets, 'typescript', 1580, 955, beat(t, 0.8), 'TypeScript');
  label(ctx, 'Du code sur mon PC à une application qui tourne.', 960, 980);
}

function cloudOutline(ctx, x, y, size, time, progress) {
  transform(ctx, { x, y, scale: size / 500, angle: Math.sin(time * 1.1) * 0.02 }, () => {
    ctx.beginPath();
    ctx.moveTo(-190, 100);
    ctx.bezierCurveTo(-330, 100, -330, -90, -190, -95);
    ctx.bezierCurveTo(-170, -270, 50, -280, 100, -130);
    ctx.bezierCurveTo(260, -180, 340, 90, 180, 100);
    ctx.closePath();
    ctx.fillStyle = '#e2ecdf';
    ctx.fill();
    ctx.strokeStyle = '#91b49b';
    ctx.lineWidth = 2;
    ctx.stroke();
    for (let i = 0; i < 3; i += 1) {
      const phase = clamp((progress - i * 0.15) / 0.5);
      line(ctx, -105 + i * 105, 205, -105 + i * 105, 205 - phase * 175, palette.green, 7);
      if (phase > 0.3) {
        line(ctx, -105 + i * 105, 30, -130 + i * 105, 65, palette.green, 5);
        line(ctx, -105 + i * 105, 30, -80 + i * 105, 65, palette.green, 5);
      }
    }
  });
}

export function cloudScene(ctx, time) {
  const t = time - 22.25;
  const globe = beat(t, 1.5, 1.6);
  const lift = beat(t, 0.15, 0.8);
  transform(ctx, { x: 960, y: 600, scale: 0.8 + lift * 0.2 }, () => {
    ctx.save();
    ctx.globalAlpha = 1 - globe;
    cloudOutline(ctx, 0, -20, 660, t, beat(t, 0.3, 1.2));
    ctx.restore();
    const radius = blend(170, 235, globe);
    ctx.save();
    ctx.globalAlpha = globe;
    circle(ctx, 0, 0, radius, '#dbe8d7');
    ctx.strokeStyle = '#648d73';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i += 1) {
      const phase = t * 0.7 + i * Math.PI / 6;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.max(3, Math.abs(Math.cos(phase)) * radius), radius, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (const offset of [-0.6, -0.3, 0, 0.3, 0.6]) {
      ctx.beginPath();
      ctx.ellipse(0, radius * offset, Math.sqrt(1 - offset * offset) * radius, radius * 0.16, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    for (let i = 0; i < 6; i += 1) {
      const angle = i / 6 * Math.PI * 2 - 0.25;
      const destination = { x: Math.cos(angle) * 580, y: Math.sin(angle) * 245 };
      const points = [[Math.cos(angle) * 180, Math.sin(angle) * 180], [Math.cos(angle) * 290, Math.sin(angle) * 120], [destination.x, destination.y - 100], [destination.x, destination.y]];
      const a = beat(t, 2 + i * 0.15, 0.55);
      route(ctx, points, a, '#a6c1a8', 2);
      const run = clamp((t - 2.35 - i * 0.15) / 1.1);
      const point = curvePoint(points, run);
      if (run > 0 && run < 1) circle(ctx, point.x, point.y, 7, palette.green);
      transform(ctx, { ...destination, scale: a, alpha: a }, () => {
        circle(ctx, 0, 0, 31, i % 2 ? '#e2ecdd' : palette.green);
        if (i % 2) ornament(ctx, 0, 0, 16, 1, t * 0.3);
        else check(ctx, 0, 0, 28, beat(t, 3.2 + i * 0.15), '#fff');
      });
      pulse(ctx, destination.x, destination.y, t, 3.2 + i * 0.15, 70);
    }
  });
  label(ctx, 'Le serveur répond. L’idée devient accessible.', 960, 980);
}

export function qualityScene(ctx, time) {
  const t = time - 27.75;
  const points = [[330, 600], [700, 600], [1120, 600], [1590, 600]];
  const bypass = [[700, 600], [830, 320], [1020, 340], [1120, 600]];
  line(ctx, 330, 600, 700, 600, '#a6bba8', 3);
  line(ctx, 700, 600, 1120, 600, '#b5c8b5', 2, true);
  line(ctx, 1120, 600, 1590, 600, '#a6bba8', 3);
  route(ctx, bypass, beat(t, 0.7, 0.8), palette.green, 4);
  for (let i = 0; i < points.length; i += 1) {
    const [x, y] = points[i];
    const a = beat(t, 0.25 + i * 0.5, 0.45);
    transform(ctx, { x, y, scale: 0.85 + Math.sin(a * Math.PI) * 0.15 }, () => {
      circle(ctx, 0, 0, 60, a > 0.5 ? palette.green : '#dce7d8');
      check(ctx, 0, 0, 48, a, '#fff');
    });
    pulse(ctx, x, y, t, 0.25 + i * 0.5, 95);
    label(ctx, ['Préparer', 'Connecter', 'Vérifier', 'Publier'][i], x, 735, a);
  }
  rounded(ctx, 800, 805, 320 * beat(t, 2.3), 53, 26, palette.green);
  if (t > 2.3) type(ctx, 'Tout est relié.', 960, 841, 29, { family: 'Body', color: '#fff' });
  label(ctx, 'Tester les liens. Corriger le passage. Aller au bout.', 960, 980);
}


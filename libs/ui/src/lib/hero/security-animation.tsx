'use client';

import {
  BlueprintCanvas,
  BlueprintFrame,
  DARK_RGB,
  MONO,
  ease,
  rgba,
  seg,
} from './blueprint-canvas';

/**
 * Blueprint-style security diagram: a phone traced inside a shield, its
 * storage locked, its only way out a TLS line to the API, and a scan pass
 * that ticks off the checks.
 */

const VW = 700; // virtual canvas width
const VH = 820; // virtual canvas height

const DURATION = 6800; // ms for a full draw
const PAUSE = 1600; // ms hold once complete, before looping

// Phone geometry (virtual coords)
const PHONE = { x: 262, y: 250, w: 176, h: 372, r: 28 };
const SCREEN = {
  x: PHONE.x + 9,
  y: PHONE.y + 9,
  w: PHONE.w - 18,
  h: PHONE.h - 18,
  r: 20,
};
const CX = PHONE.x + PHONE.w / 2;

// API node above the shield
const API = { x: CX - 56, y: 64, w: 112, h: 40 };
// Where the TLS line crosses the shield
const BADGE = { x: CX, y: 176, r: 15 };

// Screen content
const LOCK = { x: CX, y: SCREEN.y + 86 };
const FIELD = { x: SCREEN.x + 18, y: SCREEN.y + 150, w: SCREEN.w - 36, h: 32 };
const ROWS_TOP = FIELD.y + FIELD.h + 26;
const ROW_H = 22;
const ROW_GAP = 16;
const ROWS = 3;

const cubic = (a: number, b: number, c: number, d: number, t: number) =>
  (1 - t) ** 3 * a +
  3 * (1 - t) ** 2 * t * b +
  3 * (1 - t) * t ** 2 * c +
  t ** 3 * d;

const quad = (a: number, b: number, c: number, t: number) =>
  (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t ** 2 * c;

// Right half of the shield, from the top centre to the bottom tip. The left
// half is its mirror, so both sides can be traced at once and meet at the tip.
const SHIELD_HALF: [number, number][] = (() => {
  const points: [number, number][] = [];
  const steps = 24;
  // top edge, bowing up towards the shoulder
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push([quad(CX, CX + 96, 528, t), quad(172, 150, 198, t)]);
  }
  // straight flank
  points.push([528, 470]);
  // tapering curve into the tip
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    points.push([cubic(528, 528, 430, CX, t), cubic(470, 620, 700, 752, t)]);
  }
  return points;
})();

const mirror = (points: [number, number][]): [number, number][] =>
  points.map(([x, y]) => [CX - (x - CX), y]);

// Inner rule of the shield, pulled towards its centre.
const inset = (points: [number, number][]): [number, number][] =>
  points.map(([x, y]) => [CX + (x - CX) * 0.92, 182 + (y - 172) * 0.95]);

const SHIELD_LEFT = mirror(SHIELD_HALF);
const INNER_RIGHT = inset(SHIELD_HALF);
const INNER_LEFT = mirror(INNER_RIGHT);

function drawSecurity({ ctx, p, C, pen }: BlueprintFrame) {
  const {
    partialLine,
    partialPolyline,
    roundedRect,
    roundedPath,
    drawGrid,
    drawSheetMarkings,
    drawLabel,
  } = pen;

  drawGrid(VW, VH);

  // Backlight lands as the screen is drawn, as on the phone figure.
  const wakeP = ease(seg(p, 0.16, 0.34));
  if (C.halo > 0 && wakeP > 0) {
    const hy = PHONE.y + PHONE.h / 2;
    const halo = ctx.createRadialGradient(CX, hy, 0, CX, hy, PHONE.h * 0.8);
    halo.addColorStop(0, rgba(DARK_RGB, C.halo));
    halo.addColorStop(0.55, rgba(DARK_RGB, C.halo * 0.35));
    halo.addColorStop(1, rgba(DARK_RGB, 0));
    ctx.save();
    ctx.globalAlpha = wakeP;
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, VW, VH);
    ctx.restore();
  }

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  // ---- sheet markings ----
  drawSheetMarkings(VW, VH, 'FIG-015', '[ SECURITY AUDIT ]', seg(p, 0, 0.1));

  // ---- 1. phone body + screen ----
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2;
  roundedRect(
    PHONE.x,
    PHONE.y,
    PHONE.w,
    PHONE.h,
    PHONE.r,
    ease(seg(p, 0.02, 0.16)),
  );

  const screenOn = seg(p, 0.22, 0.32);
  if (screenOn > 0) {
    ctx.save();
    ctx.globalAlpha = screenOn;
    roundedPath(SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h, SCREEN.r);
    ctx.fillStyle = C.screenFill;
    ctx.fill();
    ctx.restore();
  }
  ctx.lineWidth = 1.5;
  roundedRect(
    SCREEN.x,
    SCREEN.y,
    SCREEN.w,
    SCREEN.h,
    SCREEN.r,
    ease(seg(p, 0.12, 0.24)),
  );

  // island
  const islandP = ease(seg(p, 0.24, 0.32));
  if (islandP > 0) {
    const iw = 60 * islandP;
    ctx.save();
    ctx.globalAlpha = islandP;
    roundedPath(CX - iw / 2, SCREEN.y + 12, iw, 18, 9);
    ctx.fillStyle = C.fill;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // ---- 2. shield: both flanks traced from the top, meeting at the tip ----
  const shieldP = ease(seg(p, 0.18, 0.48));
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2;
  partialPolyline(SHIELD_HALF, shieldP);
  partialPolyline(SHIELD_LEFT, shieldP);
  const innerP = ease(seg(p, 0.3, 0.56));
  ctx.strokeStyle = C.inkSoft;
  ctx.lineWidth = 1;
  partialPolyline(INNER_RIGHT, innerP);
  partialPolyline(INNER_LEFT, innerP);

  // Once everything checks out the shield takes a faint wash.
  const sealed = seg(p, 0.9, 1);
  if (sealed > 0) {
    ctx.save();
    ctx.globalAlpha = sealed;
    ctx.beginPath();
    [...SHIELD_HALF, ...[...SHIELD_LEFT].reverse()].forEach(([x, y], i) =>
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y),
    );
    ctx.closePath();
    ctx.fillStyle = C.fill;
    ctx.fill();
    ctx.restore();
  }

  ctx.strokeStyle = C.inkUi;
  ctx.lineWidth = 1.5;

  // ---- 3. padlock: body, then the shackle drops and clicks shut ----
  const lockBodyP = ease(seg(p, 0.32, 0.42));
  const bodyW = 58;
  const bodyH = 44;
  const bodyX = LOCK.x - bodyW / 2;
  const bodyY = LOCK.y - 4;
  if (lockBodyP > 0) {
    ctx.save();
    ctx.globalAlpha = lockBodyP;
    roundedRect(bodyX, bodyY, bodyW, bodyH, 8, lockBodyP);
    if (lockBodyP > 0.7) {
      // keyhole
      ctx.beginPath();
      ctx.arc(LOCK.x, bodyY + 18, 4.5, 0, Math.PI * 2);
      ctx.stroke();
      partialLine(LOCK.x, bodyY + 22.5, LOCK.x, bodyY + 31, 1);
    }
    ctx.restore();
  }
  const shackleP = ease(seg(p, 0.38, 0.46));
  if (shackleP > 0) {
    // drawn raised, then it snaps down into the body
    const lift = 12 * (1 - ease(seg(p, 0.5, 0.55)));
    const sr = 17;
    const sy = bodyY - 14 - lift;
    const shackle: [number, number][] = [[LOCK.x - sr, bodyY - lift]];
    for (let i = 0; i <= 16; i++) {
      const a = Math.PI + (Math.PI * i) / 16;
      shackle.push([LOCK.x + sr * Math.cos(a), sy + sr * Math.sin(a)]);
    }
    shackle.push([LOCK.x + sr, bodyY - lift]);
    ctx.save();
    ctx.lineWidth = 3;
    partialPolyline(shackle, shackleP);
    ctx.restore();
  }

  // ---- 4. masked secret field, dots typed in one by one ----
  const fieldP = ease(seg(p, 0.42, 0.5));
  if (fieldP > 0) {
    ctx.save();
    ctx.globalAlpha = fieldP;
    roundedRect(FIELD.x, FIELD.y, FIELD.w, FIELD.h, 10, fieldP);
    const dots = 8;
    const shown = Math.floor(seg(p, 0.46, 0.56) * dots);
    ctx.fillStyle = C.ink;
    for (let i = 0; i < shown; i++) {
      ctx.beginPath();
      ctx.arc(FIELD.x + 18 + i * 13, FIELD.y + FIELD.h / 2, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ---- 5. check rows ----
  const scanStart = 0.64;
  const scanEnd = 0.84;
  const scanY =
    SCREEN.y + 40 + (SCREEN.h - 70) * ease(seg(p, scanStart, scanEnd));
  for (let i = 0; i < ROWS; i++) {
    const rp = ease(seg(p, 0.5 + i * 0.03, 0.6 + i * 0.03));
    if (rp <= 0) continue;
    const ry = ROWS_TOP + i * (ROW_H + ROW_GAP);
    ctx.save();
    ctx.globalAlpha = rp;
    ctx.strokeStyle = C.inkUi;
    ctx.lineWidth = 1.5;
    roundedRect(FIELD.x, ry, ROW_H, ROW_H, 6, rp);
    ctx.strokeStyle = C.inkSoft;
    ctx.lineWidth = 4;
    const lineX = FIELD.x + ROW_H + 12;
    const lineMax = FIELD.w - ROW_H - 12;
    partialLine(
      lineX,
      ry + ROW_H / 2,
      lineX + lineMax * (0.8 - i * 0.15),
      ry + ROW_H / 2,
      rp,
    );
    // ticked off as the scan beam passes the row
    const tick = p >= scanStart ? seg(scanY, ry, ry + ROW_H) : 0;
    if (tick > 0) {
      ctx.strokeStyle = C.ink;
      ctx.lineWidth = 2;
      const tx = FIELD.x;
      const points: [number, number][] = [
        [tx + 5, ry + 11],
        [tx + 9.5, ry + 15.5],
        [tx + 17, ry + 6.5],
      ];
      partialPolyline(points, ease(tick));
    }
    ctx.restore();
  }

  // ---- 6. scan beam, clipped to the glass ----
  if (p >= scanStart && p <= scanEnd + 0.04) {
    const fade = 1 - seg(p, scanEnd, scanEnd + 0.04);
    ctx.save();
    roundedPath(SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h, SCREEN.r);
    ctx.clip();
    ctx.globalAlpha = fade;
    const trail = ctx.createLinearGradient(0, scanY - 60, 0, scanY);
    trail.addColorStop(0, rgba(DARK_RGB, 0));
    trail.addColorStop(1, C.buttonFill);
    ctx.fillStyle = trail;
    ctx.fillRect(SCREEN.x, scanY - 60, SCREEN.w, 60);
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 2;
    partialLine(SCREEN.x, scanY, SCREEN.x + SCREEN.w, scanY, 1);
    ctx.restore();
  }

  // ---- 7. home indicator ----
  const homeP = ease(seg(p, 0.84, 0.9));
  if (homeP > 0) {
    const hw = 70 * homeP;
    roundedPath(CX - hw / 2, SCREEN.y + SCREEN.h - 13, hw, 4, 2);
    ctx.fillStyle = C.ink;
    ctx.fill();
  }

  // ---- 8. the only way out: a TLS line through the shield to the API ----
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 1.5;
  const apiP = ease(seg(p, 0.5, 0.6));
  if (apiP > 0) {
    roundedRect(API.x, API.y, API.w, API.h, 10, apiP);
    ctx.save();
    ctx.globalAlpha = seg(p, 0.56, 0.62);
    ctx.fillStyle = C.ink;
    ctx.font = `700 13px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('API', CX, API.y + API.h / 2);
    ctx.restore();
  }
  const wireP = ease(seg(p, 0.54, 0.64));
  ctx.save();
  ctx.setLineDash([6, 6]);
  ctx.lineWidth = 1.5;
  partialLine(CX, PHONE.y, CX, API.y + API.h, wireP);
  ctx.restore();

  const badgeP = ease(seg(p, 0.6, 0.66));
  if (badgeP > 0) {
    ctx.save();
    ctx.globalAlpha = badgeP;
    ctx.beginPath();
    ctx.arc(BADGE.x, BADGE.y, BADGE.r * badgeP, 0, Math.PI * 2);
    ctx.fillStyle = C.buttonFill;
    ctx.fill();
    ctx.stroke();
    if (badgeP > 0.8) {
      // tiny padlock
      ctx.lineWidth = 1.5;
      roundedPath(BADGE.x - 6, BADGE.y - 2, 12, 9, 2);
      ctx.fillStyle = C.ink;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(BADGE.x, BADGE.y - 3, 4, Math.PI, 0);
      ctx.stroke();
    }
    ctx.restore();
  }

  // packets travelling both ways along the line once it is up
  const flow = seg(p, 0.66, 1);
  if (flow > 0) {
    ctx.save();
    ctx.fillStyle = C.ink;
    const top = API.y + API.h + 8;
    const bottom = PHONE.y - 8;
    for (let k = 0; k < 3; k++) {
      const t = (flow * 5 + k / 3) % 1;
      const y = k % 2 ? top + (bottom - top) * t : bottom - (bottom - top) * t;
      if (Math.abs(y - BADGE.y) < BADGE.r + 4) continue;
      ctx.beginPath();
      ctx.arc(CX, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ---- labels with leader lines ----
  const leftTip = 160;
  const rightTip = 548;
  drawLabel(
    LOCK.x - 30,
    LOCK.y + 14,
    leftTip,
    LOCK.y + 14,
    'KEYCHAIN',
    'left',
    seg(p, 0.6, 0.76),
  );
  drawLabel(
    FIELD.x + 8,
    FIELD.y + FIELD.h / 2,
    leftTip,
    FIELD.y + FIELD.h / 2 + 24,
    'ZERO SECRETS',
    'left',
    seg(p, 0.66, 0.82),
  );
  drawLabel(
    FIELD.x + 4,
    ROWS_TOP + ROW_H + ROW_GAP + ROW_H / 2,
    leftTip,
    ROWS_TOP + ROW_H + ROW_GAP + ROW_H / 2 + 54,
    '12 CHECKS',
    'left',
    seg(p, 0.8, 0.96),
  );
  drawLabel(
    API.x + API.w,
    API.y + API.h / 2,
    rightTip,
    API.y + API.h / 2,
    'API AUTH',
    'right',
    seg(p, 0.62, 0.78),
  );
  drawLabel(
    BADGE.x + BADGE.r,
    BADGE.y,
    rightTip,
    BADGE.y - 18,
    'TLS ONLY',
    'right',
    seg(p, 0.68, 0.84),
  );
  drawLabel(
    SCREEN.x + SCREEN.w - 6,
    ROWS_TOP + ROW_H / 2,
    rightTip,
    ROWS_TOP + ROW_H / 2 + 40,
    'CI SCAN',
    'right',
    seg(p, 0.82, 0.98),
  );
}

export function SecurityAnimation() {
  return (
    <BlueprintCanvas
      width={VW}
      height={VH}
      duration={DURATION}
      pause={PAUSE}
      draw={drawSecurity}
      aspectRatio="7 / 8"
      label="Blueprint of a phone inside a shield: locked storage, a TLS-only line to the API and a security scan ticking off checks"
    />
  );
}

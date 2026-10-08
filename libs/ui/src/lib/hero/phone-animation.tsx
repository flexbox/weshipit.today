'use client';

import {
  BlueprintCanvas,
  BlueprintFrame,
  DARK_RGB,
  ease,
  rgba,
  seg,
} from './blueprint-canvas';

/**
 * Blueprint-style phone UI diagram.
 */

const VW = 700; // virtual canvas width
const VH = 820; // virtual canvas height

const DURATION = 6200; // ms for a full draw
const PAUSE = 1600; // ms hold once complete, before looping

// Phone geometry (virtual coords)
const PHONE = { x: 232, y: 150, w: 236, h: 504, r: 34 };
const SCREEN = {
  x: PHONE.x + 11,
  y: PHONE.y + 11,
  w: PHONE.w - 22,
  h: PHONE.h - 22,
  r: 24,
};
const CX = PHONE.x + PHONE.w / 2;

function drawPhone({ ctx, p, C, pen }: BlueprintFrame) {
  const {
    partialLine,
    roundedRect,
    roundedPath,
    drawGrid,
    drawSheetMarkings,
    drawLabel,
  } = pen;

  drawGrid(VW, VH);

  // Backlight lands as the screen is drawn, so the phone lights the sheet
  // as it wakes rather than glowing before it exists.
  const wakeP = ease(seg(p, 0.2, 0.42));
  if (C.halo > 0 && wakeP > 0) {
    const hx = CX;
    const hy = PHONE.y + PHONE.h / 2;
    const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, PHONE.h * 0.7);
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
  ctx.fillStyle = C.fill;

  // ---- sheet markings ----
  drawSheetMarkings(VW, VH, 'FIG-014', '[ MOBILE INTERFACE ]', seg(p, 0, 0.1));

  // ---- 1. phone body ----
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2 / 1;
  roundedRect(
    PHONE.x,
    PHONE.y,
    PHONE.w,
    PHONE.h,
    PHONE.r,
    ease(seg(p, 0.02, 0.18)),
  );

  // side buttons
  const btnP = seg(p, 0.16, 0.22);
  ctx.lineWidth = 3;
  partialLine(PHONE.x - 1, PHONE.y + 120, PHONE.x - 1, PHONE.y + 160, btnP);
  partialLine(PHONE.x - 1, PHONE.y + 180, PHONE.x - 1, PHONE.y + 220, btnP);
  partialLine(
    PHONE.x + PHONE.w + 1,
    PHONE.y + 150,
    PHONE.x + PHONE.w + 1,
    PHONE.y + 210,
    btnP,
  );
  ctx.lineWidth = 1.5;

  // ---- 2. screen ----
  // The panel wakes once its outline closes: a brief overshoot in the
  // fill, then it settles, the way an OLED comes on.
  const screenOn = seg(p, 0.28, 0.4);
  if (screenOn > 0) {
    const bloom =
      screenOn < 0.45 ? screenOn / 0.45 : 1 - (screenOn - 0.45) * 0.6;
    ctx.save();
    ctx.globalAlpha = 0.6 + bloom;
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
    ease(seg(p, 0.16, 0.3)),
  );

  // Everything inside the glass sits a step below the chassis in weight,
  // so the figure reads as a drawing with a subject instead of uniform wire.
  ctx.strokeStyle = C.inkUi;

  // ---- 3. dynamic island ----
  const islandP = ease(seg(p, 0.3, 0.4));
  if (islandP > 0) {
    const iw = 78 * islandP;
    const ih = 22;
    const ix = CX - iw / 2;
    const iy = SCREEN.y + 16;
    ctx.save();
    ctx.globalAlpha = islandP;
    roundedPath(ix, iy, iw, ih, 11);
    ctx.fillStyle = C.fill;
    ctx.fill();
    ctx.stroke();
    if (islandP > 0.8) {
      // camera dot
      ctx.beginPath();
      ctx.arc(CX + iw / 2 - 11, iy + ih / 2, 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ---- 4. status bar ----
  const statusP = ease(seg(p, 0.38, 0.46));
  if (statusP > 0) {
    ctx.save();
    ctx.globalAlpha = statusP;
    const sy = SCREEN.y + 27;
    // time
    ctx.fillStyle = C.ink;
    ctx.font = '700 12px ui-monospace, monospace';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText('9:41', SCREEN.x + 18, sy);
    // signal bars + battery
    const bx = SCREEN.x + SCREEN.w - 56;
    for (let i = 0; i < 4; i++) {
      const bh = 4 + i * 2.5;
      roundedPath(bx + i * 6, sy + 5 - bh, 3.5, bh, 1);
      ctx.fillStyle = C.ink;
      ctx.fill();
    }
    // battery
    roundedPath(bx + 30, sy - 4, 18, 9, 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = C.ink;
    ctx.fillRect(bx + 32, sy - 2, 11, 5);
    ctx.beginPath();
    ctx.fillRect(bx + 48, sy - 1, 2, 3);
    ctx.restore();
  }

  // ---- 5. hero module ----
  const heroP = ease(seg(p, 0.44, 0.56));
  const heroX = SCREEN.x + 16;
  const heroY = SCREEN.y + 56;
  const heroW = SCREEN.w - 32;
  const heroH = 116;
  if (heroP > 0) {
    ctx.save();
    ctx.globalAlpha = heroP;
    roundedRect(heroX, heroY, heroW * heroP, heroH, 16, 1);
    if (heroP > 0.6) {
      ctx.globalAlpha = (heroP - 0.6) / 0.4;
      // play / media glyph inside hero
      const gx = heroX + heroW / 2;
      const gy = heroY + heroH / 2;
      ctx.beginPath();
      ctx.arc(gx, gy, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(gx - 6, gy - 9);
      ctx.lineTo(gx + 11, gy);
      ctx.lineTo(gx - 6, gy + 9);
      ctx.closePath();
      ctx.fillStyle = C.fill;
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  // ---- 6. list rows ----
  const rowsTop = heroY + heroH + 20;
  const rowH = 34;
  const rowGap = 14;
  for (let i = 0; i < 3; i++) {
    const rp = ease(seg(p, 0.54 + i * 0.05, 0.66 + i * 0.05));
    if (rp <= 0) continue;
    const ry = rowsTop + i * (rowH + rowGap);
    ctx.save();
    ctx.globalAlpha = rp;
    // avatar square
    roundedRect(heroX, ry, rowH, rowH, 9, 1);
    // text lines
    const lineX = heroX + rowH + 12;
    const lineMax = heroW - rowH - 12;
    ctx.strokeStyle = C.inkSoft;
    ctx.lineWidth = 4;
    partialLine(lineX, ry + 11, lineX + lineMax * 0.75, ry + 11, rp);
    partialLine(lineX, ry + 23, lineX + lineMax * 0.45, ry + 23, rp);
    ctx.strokeStyle = C.inkUi;
    ctx.lineWidth = 1.5;
    ctx.restore();
  }

  // ---- 7. primary action button ----
  const btnA = ease(seg(p, 0.72, 0.82));
  const abY = SCREEN.y + SCREEN.h - 118;
  const abX = SCREEN.x + 16;
  const abW = SCREEN.w - 32;
  const abH = 42;
  if (btnA > 0) {
    ctx.save();
    ctx.globalAlpha = btnA;
    roundedPath(abX, abY, abW, abH, 21);
    ctx.fillStyle = C.buttonFill;
    ctx.fill();
    ctx.stroke();
    if (btnA > 0.6) {
      ctx.globalAlpha = (btnA - 0.6) / 0.4;
      ctx.fillStyle = C.ink;
      ctx.font = '700 13px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CONTINUE', CX, abY + abH / 2);
    }
    ctx.restore();
  }

  // ---- 8. tab bar ----
  const tabP = ease(seg(p, 0.8, 0.9));
  const tabY = SCREEN.y + SCREEN.h - 58;
  if (tabP > 0) {
    ctx.save();
    ctx.globalAlpha = tabP;
    // divider
    partialLine(SCREEN.x + 10, tabY, SCREEN.x + SCREEN.w - 10, tabY, tabP);
    const icons = 4;
    const spacing = SCREEN.w / (icons + 1);
    for (let i = 0; i < icons; i++) {
      if (tabP < 0.4 + i * 0.12) continue;
      const tx = SCREEN.x + spacing * (i + 1);
      const ty = tabY + 22;
      ctx.beginPath();
      if (i === 0) {
        // home glyph
        ctx.moveTo(tx - 8, ty + 6);
        ctx.lineTo(tx - 8, ty - 1);
        ctx.lineTo(tx, ty - 8);
        ctx.lineTo(tx + 8, ty - 1);
        ctx.lineTo(tx + 8, ty + 6);
        ctx.stroke();
      } else if (i === 1) {
        // search
        ctx.arc(tx - 2, ty - 2, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(tx + 2.5, ty + 2.5);
        ctx.lineTo(tx + 8, ty + 8);
        ctx.stroke();
      } else if (i === 2) {
        // bell
        ctx.moveTo(tx - 7, ty + 5);
        ctx.lineTo(tx + 7, ty + 5);
        ctx.lineTo(tx + 4, ty);
        ctx.lineTo(tx + 4, ty - 4);
        ctx.arc(tx, ty - 4, 4, 0, Math.PI, true);
        ctx.lineTo(tx - 4, ty);
        ctx.closePath();
        ctx.stroke();
      } else {
        // profile
        ctx.arc(tx, ty - 4, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(tx, ty + 12, 9, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  // ---- 9. home indicator ----
  const homeP = ease(seg(p, 0.88, 0.96));
  if (homeP > 0) {
    ctx.save();
    ctx.globalAlpha = homeP;
    const hw = 92 * homeP;
    roundedPath(CX - hw / 2, SCREEN.y + SCREEN.h - 16, hw, 5, 2.5);
    ctx.fillStyle = C.ink;
    ctx.fill();
    ctx.restore();
  }

  // ---- dimension lines ----
  const dimP = ease(seg(p, 0.9, 1));
  if (dimP > 0) {
    ctx.save();
    ctx.globalAlpha = dimP;
    ctx.strokeStyle = C.inkSoft;
    ctx.lineWidth = 1;
    ctx.fillStyle = C.ink;
    ctx.font = '11px ui-monospace, monospace';

    // The label sits in a gap in the line rather than on a painted patch
    // of paper, which would punch a hole through the backlight.
    const gap = 28;

    // width dimension (top)
    const dy = PHONE.y - 22;
    const halfW = PHONE.w / 2 - gap;
    partialLine(PHONE.x, dy, PHONE.x + halfW, dy, Math.min(1, dimP * 2));
    partialLine(
      PHONE.x + PHONE.w,
      dy,
      PHONE.x + PHONE.w - halfW,
      dy,
      Math.min(1, dimP * 2),
    );
    partialLine(PHONE.x, dy - 5, PHONE.x, dy + 5, 1);
    partialLine(PHONE.x + PHONE.w, dy - 5, PHONE.x + PHONE.w, dy + 5, 1);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = C.ink;
    ctx.fillText('390 PT', CX, dy);

    // height dimension (left)
    const dx = PHONE.x - 22;
    // Sits below centre so the LIST ROW leader does not run through it.
    const midY = PHONE.y + PHONE.h * 0.72;
    partialLine(dx, PHONE.y, dx, midY - gap, Math.min(1, dimP * 2));
    partialLine(dx, PHONE.y + PHONE.h, dx, midY + gap, Math.min(1, dimP * 2));
    partialLine(dx - 5, PHONE.y, dx + 5, PHONE.y, 1);
    partialLine(dx - 5, PHONE.y + PHONE.h, dx + 5, PHONE.y + PHONE.h, 1);
    ctx.save();
    ctx.translate(dx, midY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = C.ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('844 PT', 0, 0);
    ctx.restore();
    ctx.restore();
  }

  // ---- labels with leader lines ----
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 1;
  // left side
  drawLabel(
    CX,
    SCREEN.y + 27,
    PHONE.x - 14,
    SCREEN.y + 27,
    'DYNAMIC ISLAND',
    'left',
    seg(p, 0.62, 0.78),
  );
  drawLabel(
    heroX + 8,
    heroY + heroH / 2,
    PHONE.x - 14,
    heroY + heroH / 2,
    'HERO MODULE',
    'left',
    seg(p, 0.68, 0.84),
  );
  drawLabel(
    heroX + 8,
    rowsTop + rowH / 2,
    PHONE.x - 14,
    rowsTop + rowH / 2 + 18,
    'LIST ROW',
    'left',
    seg(p, 0.74, 0.9),
  );
  // right side
  drawLabel(
    SCREEN.x + SCREEN.w - 30,
    SCREEN.y + 27,
    PHONE.x + PHONE.w + 14,
    SCREEN.y + 12,
    'STATUS BAR',
    'right',
    seg(p, 0.64, 0.8),
  );
  drawLabel(
    CX,
    abY + 21,
    PHONE.x + PHONE.w + 14,
    abY + 21,
    'PRIMARY ACTION',
    'right',
    seg(p, 0.78, 0.92),
  );
  drawLabel(
    SCREEN.x + SCREEN.w - 40,
    tabY + 22,
    PHONE.x + PHONE.w + 14,
    tabY + 22,
    'TAB BAR',
    'right',
    seg(p, 0.82, 0.96),
  );
  drawLabel(
    CX + 50,
    SCREEN.y + SCREEN.h - 14,
    PHONE.x + PHONE.w + 14,
    SCREEN.y + SCREEN.h + 6,
    'HOME INDICATOR',
    'right',
    seg(p, 0.9, 1),
  );
}

export function PhoneAnimation() {
  return (
    <BlueprintCanvas
      width={VW}
      height={VH}
      duration={DURATION}
      pause={PAUSE}
      draw={drawPhone}
      aspectRatio="7 / 8"
    />
  );
}

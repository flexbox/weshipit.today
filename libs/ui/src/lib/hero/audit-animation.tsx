'use client';

import {
  BlueprintCanvas,
  BlueprintFrame,
  MONO,
  Palette,
  createPen,
  ease,
  rgba,
  seg,
} from './blueprint-canvas';

/**
 * Blueprint-style figure for the codebase audit: one phone, same sheet as the
 * homepage `PhoneAnimation`. The app is broken first (red skull on a cracked
 * screen), the audit scans down the screen and fixes what it passes, and the
 * app ends up working (green check, live interface).
 */

const VW = 700; // virtual canvas width
const VH = 820; // virtual canvas height

const DURATION = 8000; // ms for a full draw
const PAUSE = 2200; // ms hold once complete, before looping

// Phone geometry (virtual coords), same handset as the homepage figure
const PHONE = { x: 232, y: 140, w: 236, h: 504, r: 34 };
const SCREEN = {
  x: PHONE.x + 11,
  y: PHONE.y + 11,
  w: PHONE.w - 22,
  h: PHONE.h - 22,
  r: 24,
};
const CX = PHONE.x + PHONE.w / 2;
/** Centre of the skull, and later of the check that replaces it. */
const MARK = { x: CX, y: SCREEN.y + 180 };

// Timeline, as fractions of DURATION
const T = {
  broken: [0.22, 0.36],
  sweep: [0.42, 0.68],
  check: [0.68, 0.76],
  rows: [0.72, 0.86],
  goodLabels: [0.78, 0.94],
} as const;

/** The same pen, inked in another colour (for red and green labels). */
const tinted = (frame: BlueprintFrame, rgb: string) => {
  const C: Palette = {
    ...frame.C,
    ink: rgba(rgb, 1),
    inkSoft: rgba(rgb, 0.6),
  };
  return createPen(frame.ctx, C, frame.scale);
};

/** Clip to the part of the screen between two heights. */
function clipScreen({ ctx, pen }: BlueprintFrame, top: number, bottom: number) {
  ctx.beginPath();
  ctx.rect(SCREEN.x - 2, top, SCREEN.w + 4, Math.max(0, bottom - top));
  ctx.clip();
  pen.roundedPath(SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h, SCREEN.r);
  ctx.clip();
}

/** Skull centred on (x, y): outlined cranium, filled sockets, teeth. */
function drawSkull(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.lineWidth = 3;
  // cranium and jaw
  ctx.beginPath();
  ctx.moveTo(-34, 14);
  ctx.bezierCurveTo(-46, -52, 46, -52, 34, 14);
  ctx.lineTo(34, 24);
  ctx.lineTo(20, 28);
  ctx.lineTo(20, 46);
  ctx.lineTo(-20, 46);
  ctx.lineTo(-20, 28);
  ctx.lineTo(-34, 24);
  ctx.closePath();
  ctx.stroke();
  // eye sockets
  ctx.beginPath();
  ctx.ellipse(-15, 0, 10, 11, 0, 0, Math.PI * 2);
  ctx.ellipse(15, 0, 10, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  // nose
  ctx.beginPath();
  ctx.moveTo(0, 14);
  ctx.lineTo(-6, 24);
  ctx.lineTo(6, 24);
  ctx.closePath();
  ctx.fill();
  // teeth
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (const tx of [-10, 0, 10]) {
    ctx.moveTo(tx, 34);
    ctx.lineTo(tx, 46);
  }
  ctx.stroke();
  ctx.restore();
}

/** Cracks spreading from an impact near the top right of the glass. */
const CRACKS: [number, number][][] = [
  [
    [SCREEN.x + 168, SCREEN.y + 62],
    [SCREEN.x + 146, SCREEN.y + 98],
    [SCREEN.x + 156, SCREEN.y + 118],
    [SCREEN.x + 128, SCREEN.y + 160],
  ],
  [
    [SCREEN.x + 168, SCREEN.y + 62],
    [SCREEN.x + 196, SCREEN.y + 84],
    [SCREEN.x + SCREEN.w, SCREEN.y + 92],
  ],
  [
    [SCREEN.x + 146, SCREEN.y + 98],
    [SCREEN.x + 112, SCREEN.y + 92],
    [SCREEN.x + 92, SCREEN.y + 108],
  ],
  [
    [SCREEN.x + 156, SCREEN.y + 118],
    [SCREEN.x + 190, SCREEN.y + 150],
    [SCREEN.x + 184, SCREEN.y + 196],
  ],
];

function drawAudit(frame: BlueprintFrame) {
  const { ctx, p, C, pen } = frame;
  const { partialLine, partialPolyline, roundedRect, roundedPath } = pen;
  const red = (a: number) => rgba(C.danger, a);
  const green = (a: number) => rgba(C.success, a);

  pen.drawGrid(VW, VH);

  const brokenP = ease(seg(p, T.broken[0], T.broken[1]));
  const sweepP = ease(seg(p, T.sweep[0], T.sweep[1]));
  const scanY = SCREEN.y + SCREEN.h * sweepP;
  const fixed = seg(p, T.sweep[1], T.sweep[1] + 0.02);

  // Backlight in dark mode: red while broken, green once fixed.
  if (C.halo > 0 && brokenP > 0) {
    const hy = PHONE.y + PHONE.h / 2;
    for (const [rgb, alpha] of [
      [C.danger, brokenP * (1 - sweepP)],
      [C.success, sweepP],
    ] as const) {
      if (alpha <= 0) continue;
      const halo = ctx.createRadialGradient(CX, hy, 0, CX, hy, PHONE.h * 0.7);
      halo.addColorStop(0, rgba(rgb, C.halo * 0.8));
      halo.addColorStop(0.55, rgba(rgb, C.halo * 0.25));
      halo.addColorStop(1, rgba(rgb, 0));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, VW, VH);
      ctx.restore();
    }
  }

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  // ---- sheet markings ----
  pen.drawSheetMarkings(
    VW,
    VH,
    'FIG-016',
    '[ CODEBASE AUDIT ]',
    seg(p, 0, 0.1),
  );

  // ---- 1. phone body ----
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
  const btnP = seg(p, 0.14, 0.18);
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

  // ---- 2. screen outline + island ----
  ctx.lineWidth = 1.5;
  roundedRect(
    SCREEN.x,
    SCREEN.y,
    SCREEN.w,
    SCREEN.h,
    SCREEN.r,
    ease(seg(p, 0.12, 0.22)),
  );
  const islandP = ease(seg(p, 0.18, 0.24));
  if (islandP > 0) {
    const iw = 78 * islandP;
    ctx.save();
    ctx.globalAlpha = islandP;
    ctx.strokeStyle = C.inkUi;
    roundedPath(CX - iw / 2, SCREEN.y + 16, iw, 22, 11);
    ctx.fillStyle = C.fill;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // ---- 3. broken app, below the scan line ----
  if (brokenP > 0 && sweepP < 1) {
    ctx.save();
    clipScreen(frame, scanY, SCREEN.y + SCREEN.h);

    ctx.fillStyle = red(0.08 * brokenP);
    ctx.fillRect(SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h);

    ctx.strokeStyle = red(0.9);
    ctx.lineWidth = 1.5;
    const crackP = ease(seg(p, 0.24, 0.32));
    for (const crack of CRACKS) partialPolyline(crack, crackP);

    // The skull twitches now and then, like a screen that keeps crashing.
    const skullP = ease(seg(p, 0.26, 0.34));
    if (skullP > 0) {
      const tick = Math.floor((p * DURATION) / 70);
      const glitch = tick % 13 === 0 ? 4 : tick % 13 === 1 ? -3 : 0;
      ctx.globalAlpha = skullP * (glitch ? 0.6 : 1);
      ctx.strokeStyle = red(1);
      ctx.fillStyle = red(1);
      drawSkull(ctx, MARK.x + glitch, MARK.y);
      ctx.globalAlpha = 1;
    }

    const textP = seg(p, 0.3, 0.36);
    if (textP > 0) {
      ctx.globalAlpha = textP;
      ctx.fillStyle = red(1);
      ctx.font = `700 13px ${MONO}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('FATAL ERROR', CX, MARK.y + 82);
      // garbled rows where the interface should be
      ctx.strokeStyle = red(0.45);
      ctx.lineWidth = 4;
      const left = SCREEN.x + 30;
      for (const [i, w] of [0.8, 0.35, 0.6, 0.25].entries()) {
        const y = MARK.y + 120 + i * 22;
        const shift = i % 2 ? 18 : 0;
        partialLine(left + shift, y, left + shift + (SCREEN.w - 60) * w, y, 1);
      }
    }
    ctx.restore();
  }

  // ---- 4. working app, above the scan line ----
  if (sweepP > 0) {
    ctx.save();
    clipScreen(frame, SCREEN.y, scanY);

    ctx.fillStyle = green(0.07);
    ctx.fillRect(SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h);

    // check badge, its tick drawn once the scan is done
    ctx.strokeStyle = green(1);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(MARK.x, MARK.y, 42, 0, Math.PI * 2);
    ctx.stroke();
    const tickP = ease(seg(p, T.check[0], T.check[1]));
    ctx.lineWidth = 5;
    partialPolyline(
      [
        [MARK.x - 18, MARK.y + 1],
        [MARK.x - 5, MARK.y + 14],
        [MARK.x + 19, MARK.y - 12],
      ],
      tickP,
    );

    if (fixed > 0) {
      ctx.globalAlpha = fixed;
      ctx.fillStyle = green(1);
      ctx.font = `700 13px ${MONO}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ALL CLEAR', CX, MARK.y + 82);
      ctx.globalAlpha = 1;
    }

    // a live interface again: list rows, then the primary action
    const rowX = SCREEN.x + 24;
    const rowW = SCREEN.w - 48;
    for (let i = 0; i < 3; i++) {
      const rp = ease(
        seg(p, T.rows[0] + i * 0.03, T.rows[0] + 0.08 + i * 0.03),
      );
      if (rp <= 0) continue;
      const ry = MARK.y + 112 + i * 40;
      ctx.globalAlpha = rp;
      ctx.strokeStyle = green(0.9);
      ctx.lineWidth = 1.5;
      roundedRect(rowX, ry, 28, 28, 8, 1);
      ctx.strokeStyle = green(0.55);
      ctx.lineWidth = 4;
      partialLine(
        rowX + 40,
        ry + 9,
        rowX + 40 + (rowW - 40) * 0.75,
        ry + 9,
        rp,
      );
      partialLine(
        rowX + 40,
        ry + 20,
        rowX + 40 + (rowW - 40) * 0.45,
        ry + 20,
        rp,
      );
    }
    const actionP = ease(seg(p, T.rows[1] - 0.04, T.rows[1] + 0.04));
    if (actionP > 0) {
      const ay = SCREEN.y + SCREEN.h - 64;
      ctx.globalAlpha = actionP;
      roundedPath(rowX, ay, rowW, 38, 19);
      ctx.fillStyle = green(0.16);
      ctx.fill();
      ctx.strokeStyle = green(1);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = green(1);
      ctx.font = `700 12px ${MONO}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SHIP IT', CX, ay + 19);
    }
    ctx.restore();
  }

  // ---- 5. scan line ----
  if (sweepP > 0 && sweepP < 1) {
    ctx.save();
    const band = ctx.createLinearGradient(0, scanY - 48, 0, scanY);
    band.addColorStop(0, C.fill.replace(/[\d.]+\)$/, '0)'));
    band.addColorStop(1, C.buttonFill);
    clipScreen(frame, scanY - 48, scanY);
    ctx.fillStyle = band;
    ctx.fillRect(SCREEN.x, scanY - 48, SCREEN.w, 48);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 2;
    partialLine(SCREEN.x - 14, scanY, PHONE.x + PHONE.w + 18, scanY, 1);
    ctx.fillStyle = C.ink;
    ctx.font = `600 12.5px ${MONO}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('AUDITING', PHONE.x + PHONE.w + 26, scanY);
    ctx.restore();
  }

  // ---- 6. labels ----
  // Problems come in red and leave as the scan reaches them; results land
  // in green once the app works.
  const redPen = tinted(frame, C.danger);
  const greenPen = tinted(frame, C.success);
  const outOf = (y: number) => {
    const reached = SCREEN.y + SCREEN.h * ease(seg(p, T.sweep[0], T.sweep[1]));
    return reached >= y ? Math.max(0, 1 - (reached - y) / 60) : 1;
  };
  const badLabels = [
    {
      y: SCREEN.y + 110,
      ax: SCREEN.x + 150,
      text: 'TECH DEBT',
      side: 'right',
      at: 0.28,
    },
    { y: MARK.y, ax: MARK.x - 30, text: 'CRASHES', side: 'left', at: 0.3 },
    {
      y: MARK.y + 142,
      ax: SCREEN.x + 40,
      text: 'SLOW RELEASES',
      side: 'left',
      at: 0.34,
    },
  ] as const;
  for (const label of badLabels) {
    const prog = Math.min(seg(p, label.at, label.at + 0.1), outOf(label.y));
    if (prog <= 0) continue;
    const right = label.side === 'right';
    redPen.drawLabel(
      label.ax,
      label.y,
      right ? PHONE.x + PHONE.w + 14 : PHONE.x - 14,
      label.y,
      label.text,
      right ? 'right' : 'left',
      prog,
    );
  }
  const goodLabels = [
    { y: MARK.y, ax: MARK.x + 42, text: 'STABLE', side: 'right', at: 0 },
    {
      y: MARK.y + 152,
      ax: SCREEN.x + 30,
      text: 'CLEAN CODE',
      side: 'left',
      at: 0.03,
    },
    {
      y: SCREEN.y + SCREEN.h - 45,
      ax: SCREEN.x + SCREEN.w - 30,
      text: 'SHIPPED TODAY',
      side: 'right',
      at: 0.06,
    },
  ] as const;
  for (const label of goodLabels) {
    const start = T.goodLabels[0] + label.at;
    const prog = seg(p, start, start + 0.1);
    if (prog <= 0) continue;
    const right = label.side === 'right';
    greenPen.drawLabel(
      label.ax,
      label.y,
      right ? PHONE.x + PHONE.w + 14 : PHONE.x - 14,
      label.y,
      label.text,
      right ? 'right' : 'left',
      prog,
    );
  }

  // ---- 7. two-week audit bar under the phone ----
  const barP = seg(p, T.broken[1], T.broken[1] + 0.06);
  if (barP > 0) {
    const by = PHONE.y + PHONE.h + 48;
    const day = Math.max(1, Math.round(1 + 13 * sweepP));
    const done = sweepP >= 1;
    ctx.save();
    ctx.globalAlpha = barP;
    ctx.fillStyle = done ? green(1) : C.ink;
    ctx.font = `600 12.5px ${MONO}`;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.fillText(done ? 'AUDIT DONE' : 'AUDIT', PHONE.x, by - 12);
    ctx.textAlign = 'right';
    ctx.fillText(
      `DAY ${String(day).padStart(2, '0')} / 14`,
      PHONE.x + PHONE.w,
      by - 12,
    );
    ctx.strokeStyle = C.inkSoft;
    ctx.lineWidth = 1;
    roundedPath(PHONE.x, by, PHONE.w, 8, 4);
    ctx.stroke();
    if (sweepP > 0) {
      roundedPath(PHONE.x, by, Math.max(8, PHONE.w * sweepP), 8, 4);
      ctx.fillStyle = done ? green(1) : C.ink;
      ctx.fill();
    }
    ctx.restore();
  }
}

export function AuditAnimation() {
  return (
    <BlueprintCanvas
      width={VW}
      height={VH}
      duration={DURATION}
      pause={PAUSE}
      draw={drawAudit}
      aspectRatio="7 / 8"
      label="Blueprint of a phone: the app is broken, with a red skull on a cracked screen, until a two-week audit scans down the screen and leaves it working, with a green check."
    />
  );
}

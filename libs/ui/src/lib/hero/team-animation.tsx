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
 * Blueprint-style team diagram: two laptops write code on their own branch,
 * both branches merge into main, CI goes green, a release is tagged and the
 * build travels down main into a phone where the app lights up.
 */

const VW = 700; // virtual canvas width
const VH = 820; // virtual canvas height

const DURATION = 6800; // ms for a full draw
const PAUSE = 1600; // ms hold once complete, before looping

type Point = [number, number];

// Laptop geometry (virtual coords): the screen, its base sits underneath.
const LAPTOP_W = 180;
const LAPTOP_H = 118;
const LAPTOP_Y = 120;
const LAPTOPS = [
  { x: 70, name: 'DAVID · @FLEXBOX' },
  { x: 450, name: 'MATTHYS · @MATTHYSDEV' },
].map((laptop) => ({ ...laptop, cx: laptop.x + LAPTOP_W / 2 }));
const BASE_Y = LAPTOP_Y + LAPTOP_H + 4;
const CAPTION_Y = BASE_Y + 34;

// Main runs down the middle of the sheet, from the top into the phone.
const CX = VW / 2;
const MAIN_TOP = 110;
const COMMITS = [160, 230, 300];
const MERGE_A = { y: 420, r: 8 };
const MERGE_B = { y: 470, r: 8 };
const CI = { y: 512, r: 11 };
const TAG = { x: CX + 12, y: 540, w: 44, h: 18 };

// Phone geometry, receiving the release at the foot of main
const PHONE = { x: CX - 52, y: 590, w: 104, h: 186, r: 18 };
const SCREEN = {
  x: PHONE.x + 7,
  y: PHONE.y + 7,
  w: PHONE.w - 14,
  h: PHONE.h - 14,
  r: 12,
};
const ICON = 18;
const ICON_GAP = 10;
const ICON_COLS = 3;
const ICON_ROWS = 3;
const ICONS_X = CX - (ICON_COLS * ICON + (ICON_COLS - 1) * ICON_GAP) / 2;
const ICONS_Y = SCREEN.y + 34;
// The app that ships is the middle of the grid.
const SHIPPED_ICON = 4;

// Indent level and length of each line typed on the laptop screens.
const CODE_LINES: [number, number][] = [
  [0, 0.55],
  [1, 0.62],
  [2, 0.42],
  [2, 0.66],
  [1, 0.3],
  [0, 0.18],
];

const cubic = (a: number, b: number, c: number, d: number, t: number) =>
  (1 - t) ** 3 * a +
  3 * (1 - t) ** 2 * t * b +
  3 * (1 - t) * t ** 2 * c +
  t ** 3 * d;

// A straight drop from the laptop, then a curve into the side of a merge node.
const branch = (
  x: number,
  dropTo: number,
  mergeY: number,
  side: -1 | 1,
): Point[] => {
  const points: Point[] = [[x, CAPTION_Y + 18]];
  const end = CX + side * MERGE_A.r;
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push([
      cubic(x, x, (x + end) / 2, end, t),
      cubic(dropTo, mergeY - 10, mergeY, mergeY, t),
    ]);
  }
  return points;
};

const BRANCH_A = branch(LAPTOPS[0].cx, 340, MERGE_A.y, -1);
const BRANCH_B = branch(LAPTOPS[1].cx, 390, MERGE_B.y, 1);

// Where a point sits along a polyline at fraction t of its length.
const pointAt = (points: Point[], t: number): Point => {
  const lengths = points
    .slice(1)
    .map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  let remain = lengths.reduce((a, b) => a + b, 0) * t;
  for (let i = 0; i < lengths.length; i++) {
    if (remain <= lengths[i]) {
      const k = remain / lengths[i];
      const [x0, y0] = points[i];
      const [x1, y1] = points[i + 1];
      return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
    }
    remain -= lengths[i];
  }
  return points[points.length - 1];
};

// Commits made on each branch, as fractions of its length.
const BRANCH_COMMITS = [0.18, 0.42, 0.68];

// Nodes on main leave a gap in the line so they read as rings, not beads.
const MAIN_GAPS = [MERGE_A, MERGE_B, CI];

function drawTeam({ ctx, p, C, pen }: BlueprintFrame) {
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

  // Backlight lands under each laptop as its screen comes on, and under the
  // phone once the release reaches it.
  const halo = (x: number, y: number, radius: number, alpha: number) => {
    if (C.halo <= 0 || alpha <= 0) return;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, rgba(DARK_RGB, C.halo));
    glow.addColorStop(0.55, rgba(DARK_RGB, C.halo * 0.35));
    glow.addColorStop(1, rgba(DARK_RGB, 0));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = glow;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
  };
  const wakeP = ease(seg(p, 0.14, 0.3));
  LAPTOPS.forEach(({ cx }) => halo(cx, LAPTOP_Y + LAPTOP_H / 2, 170, wakeP));
  halo(CX, PHONE.y + PHONE.h / 2, 200, ease(seg(p, 0.84, 0.96)));

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  // ---- sheet markings ----
  drawSheetMarkings(VW, VH, 'FIG-016', '[ THE TEAM ]', seg(p, 0, 0.1));

  // ---- 1. laptops: lid, base, then the screen comes on ----
  LAPTOPS.forEach(({ x, cx, name }, i) => {
    const delay = i * 0.04;
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 2;
    roundedRect(
      x,
      LAPTOP_Y,
      LAPTOP_W,
      LAPTOP_H,
      10,
      ease(seg(p, 0.02 + delay, 0.16 + delay)),
    );
    roundedRect(
      x - 20,
      BASE_Y,
      LAPTOP_W + 40,
      12,
      6,
      ease(seg(p, 0.12 + delay, 0.2 + delay)),
    );

    const screenOn = seg(p, 0.18 + delay, 0.26 + delay);
    if (screenOn > 0) {
      ctx.save();
      ctx.globalAlpha = screenOn;
      roundedPath(x + 8, LAPTOP_Y + 8, LAPTOP_W - 16, LAPTOP_H - 16, 4);
      ctx.fillStyle = C.screenFill;
      ctx.fill();
      ctx.restore();
    }
    ctx.strokeStyle = C.inkUi;
    ctx.lineWidth = 1.5;
    roundedRect(
      x + 8,
      LAPTOP_Y + 8,
      LAPTOP_W - 16,
      LAPTOP_H - 16,
      4,
      ease(seg(p, 0.14 + delay, 0.24 + delay)),
    );

    // code, typed one line after the other
    ctx.strokeStyle = C.inkSoft;
    ctx.lineWidth = 3;
    const codeX = x + 22;
    const codeMax = LAPTOP_W - 44;
    CODE_LINES.forEach(([indent, length], line) => {
      const start = 0.24 + delay + line * 0.03;
      const lx = codeX + indent * 14;
      const ly = LAPTOP_Y + 26 + line * 14;
      partialLine(
        lx,
        ly,
        lx + (codeMax - indent * 14) * length,
        ly,
        ease(seg(p, start, start + 0.04)),
      );
    });

    // owner, written under the base
    ctx.save();
    ctx.globalAlpha = seg(p, 0.22 + delay, 0.3 + delay);
    ctx.fillStyle = C.ink;
    ctx.font = `600 12px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, cx, CAPTION_Y);
    ctx.restore();
  });

  // ---- 2. main, drawn top to bottom with gaps for its nodes ----
  const mainP = ease(seg(p, 0.06, 0.34));
  const mainY = MAIN_TOP + (PHONE.y - MAIN_TOP) * mainP;
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2;
  let from = MAIN_TOP;
  [...MAIN_GAPS, { y: PHONE.y, r: 0 }].forEach(({ y, r }) => {
    const to = Math.min(mainY, y - r);
    if (to > from) partialLine(CX, from, CX, to, 1);
    from = y + r;
  });

  ctx.save();
  ctx.globalAlpha = seg(p, 0.06, 0.14);
  ctx.fillStyle = C.ink;
  ctx.font = `600 11px ${MONO}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('MAIN', CX + 10, MAIN_TOP);
  ctx.restore();

  ctx.fillStyle = C.ink;
  COMMITS.forEach((y) => {
    if (mainY < y) return;
    ctx.beginPath();
    ctx.arc(CX, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // ---- 3. branches: each laptop commits its way into main ----
  [
    { points: BRANCH_A, start: 0.34, merge: MERGE_A },
    { points: BRANCH_B, start: 0.4, merge: MERGE_B },
  ].forEach(({ points, start, merge }) => {
    const branchP = ease(seg(p, start, start + 0.16));
    ctx.strokeStyle = C.inkUi;
    ctx.lineWidth = 1.5;
    partialPolyline(points, branchP);

    ctx.fillStyle = C.ink;
    BRANCH_COMMITS.forEach((t) => {
      if (branchP < t) return;
      const [bx, by] = pointAt(points, t);
      ctx.beginPath();
      ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // the merge commit closes once the branch arrives
    const mergeP = ease(seg(p, start + 0.15, start + 0.2));
    if (mergeP > 0) {
      ctx.save();
      ctx.strokeStyle = C.ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        CX,
        merge.y,
        merge.r,
        -Math.PI / 2,
        -Math.PI / 2 + Math.PI * 2 * mergeP,
      );
      ctx.stroke();
      ctx.globalAlpha = mergeP;
      ctx.beginPath();
      ctx.arc(CX, merge.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });

  // ---- 4. CI goes green: a ring, then the tick ----
  const ciP = ease(seg(p, 0.6, 0.66));
  if (ciP > 0) {
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(CX, CI.y, CI.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ciP);
    ctx.stroke();
    partialPolyline(
      [
        [CX - 5, CI.y],
        [CX - 1.5, CI.y + 4],
        [CX + 5.5, CI.y - 4],
      ],
      ease(seg(p, 0.65, 0.7)),
    );
    ctx.restore();
  }

  // ---- 5. release tag hung off main ----
  const tagP = ease(seg(p, 0.66, 0.72));
  if (tagP > 0) {
    ctx.save();
    ctx.globalAlpha = tagP;
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 1.5;
    partialLine(CX, TAG.y, TAG.x, TAG.y, tagP);
    roundedPath(TAG.x, TAG.y - TAG.h / 2, TAG.w * tagP, TAG.h, TAG.h / 2);
    ctx.fillStyle = C.buttonFill;
    ctx.fill();
    ctx.stroke();
    if (tagP > 0.8) {
      ctx.fillStyle = C.ink;
      ctx.font = `700 10px ${MONO}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('v2.0', TAG.x + TAG.w / 2, TAG.y + 0.5);
    }
    ctx.restore();
  }

  // ---- 6. phone, waiting at the foot of main ----
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2;
  roundedRect(
    PHONE.x,
    PHONE.y,
    PHONE.w,
    PHONE.h,
    PHONE.r,
    ease(seg(p, 0.26, 0.42)),
  );
  const phoneOn = seg(p, 0.42, 0.5);
  if (phoneOn > 0) {
    ctx.save();
    ctx.globalAlpha = phoneOn;
    roundedPath(SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h, SCREEN.r);
    ctx.fillStyle = C.screenFill;
    ctx.fill();
    ctx.restore();
  }
  ctx.strokeStyle = C.inkUi;
  ctx.lineWidth = 1.5;
  roundedRect(
    SCREEN.x,
    SCREEN.y,
    SCREEN.w,
    SCREEN.h,
    SCREEN.r,
    ease(seg(p, 0.34, 0.46)),
  );
  const islandP = ease(seg(p, 0.44, 0.5));
  if (islandP > 0) {
    const iw = 34 * islandP;
    ctx.save();
    ctx.globalAlpha = islandP;
    roundedPath(CX - iw / 2, SCREEN.y + 8, iw, 10, 5);
    ctx.fillStyle = C.fill;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // home screen icons, the shipped one still an outline
  for (let i = 0; i < ICON_COLS * ICON_ROWS; i++) {
    const ip = ease(seg(p, 0.48 + i * 0.012, 0.54 + i * 0.012));
    if (ip <= 0) continue;
    const ix = ICONS_X + (i % ICON_COLS) * (ICON + ICON_GAP);
    const iy = ICONS_Y + Math.floor(i / ICON_COLS) * (ICON + ICON_GAP);
    ctx.save();
    ctx.globalAlpha = i === SHIPPED_ICON ? ip : ip * 0.6;
    roundedRect(ix, iy, ICON, ICON, 5, ip);
    ctx.restore();
  }

  // ---- 7. the build rides down main and lands on the phone ----
  const rideP = seg(p, 0.72, 0.86);
  if (rideP > 0 && rideP < 1) {
    const ry = TAG.y + (PHONE.y - TAG.y) * ease(rideP);
    ctx.save();
    ctx.fillStyle = C.ink;
    ctx.beginPath();
    ctx.arc(CX, ry, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // The app fills with a brief overshoot as it installs, then settles.
  const installP = seg(p, 0.86, 0.94);
  if (installP > 0) {
    const ix = ICONS_X + (SHIPPED_ICON % ICON_COLS) * (ICON + ICON_GAP);
    const iy =
      ICONS_Y + Math.floor(SHIPPED_ICON / ICON_COLS) * (ICON + ICON_GAP);
    const bloom =
      installP < 0.5
        ? installP / 0.5
        : 1 + 0.25 * Math.sin((Math.PI * (installP - 0.5)) / 0.5);
    const grow = 12 * (bloom > 1 ? bloom - 1 : 0);
    ctx.save();
    ctx.globalAlpha = Math.min(1, bloom);
    roundedPath(ix - grow, iy - grow, ICON + grow * 2, ICON + grow * 2, 5);
    ctx.fillStyle = C.ink;
    ctx.fill();
    ctx.restore();
  }

  const homeP = ease(seg(p, 0.5, 0.56));
  if (homeP > 0) {
    const hw = 38 * homeP;
    roundedPath(CX - hw / 2, SCREEN.y + SCREEN.h - 10, hw, 4, 2);
    ctx.fillStyle = C.ink;
    ctx.fill();
  }

  // ---- labels with leader lines ----
  const leftTip = 236;
  const rightTip = 464;
  drawLabel(
    CX - MERGE_A.r,
    MERGE_A.y,
    leftTip,
    MERGE_A.y + 44,
    'PAIR REVIEW',
    'left',
    seg(p, 0.56, 0.72),
  );
  drawLabel(
    CX + MERGE_B.r,
    MERGE_B.y,
    rightTip,
    MERGE_B.y + 26,
    'MERGED',
    'right',
    seg(p, 0.6, 0.76),
  );
  drawLabel(
    CX - CI.r,
    CI.y,
    leftTip,
    CI.y + 24,
    'CI GREEN',
    'left',
    seg(p, 0.66, 0.82),
  );
  drawLabel(
    TAG.x + TAG.w,
    TAG.y,
    rightTip + 20,
    TAG.y + 30,
    'RELEASE',
    'right',
    seg(p, 0.72, 0.88),
  );
  drawLabel(
    PHONE.x,
    PHONE.y + 120,
    leftTip,
    PHONE.y + 120,
    'YOUR USERS',
    'left',
    seg(p, 0.8, 0.96),
  );
  drawLabel(
    PHONE.x + PHONE.w,
    PHONE.y + 90,
    rightTip,
    PHONE.y + 100,
    'SHIPPED',
    'right',
    seg(p, 0.86, 1),
  );
}

export function TeamAnimation() {
  return (
    <BlueprintCanvas
      width={VW}
      height={VH}
      duration={DURATION}
      pause={PAUSE}
      draw={drawTeam}
      aspectRatio="7 / 8"
      label="Blueprint of two laptops, David's and Matthys's, whose branches merge into main, pass CI, get tagged as a release and ship to a phone"
    />
  );
}

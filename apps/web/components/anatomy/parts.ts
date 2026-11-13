/**
 * Shared parts for the glossary figures: the bench every machine stands on,
 * face helpers for boxes, cable routes and the lit dash that runs along them.
 */
import {
  corners,
  cylinder,
  depthOf,
  insetPlan,
  iso,
  lineOnTop,
  pathOf,
  planOutline,
  ring,
  sideMatrix,
  sideSeam,
  slabOf,
  topTicks,
  towardViewer,
  type Flat,
  type Plan,
  type Plane,
  type Point3,
  type Projection,
} from './kit/iso-kit';

export const BASE_H = 9;
export const FOOT_H = 5;

export interface BenchSpec {
  base: Plan;
  /** Ruler strip on the bench top, ticks every 4 with a major every 5th. */
  ruler: Plan;
  /** Label plate with three rule lines. */
  label: Plan;
}

/** The bench: slab on four feet, groove, corner screws, ruler and label plate. */
export function benchOf(P: Projection, { base, label, ruler }: BenchSpec) {
  const at = (point: Point3) => iso(point, P);
  const solid = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) =>
    slabOf(plan, z, h, P, steps, bevel);
  const ticks = topTicks(
    ruler.x + 3,
    ruler.x + ruler.w - 3,
    4,
    5,
    ruler.y,
    0.6,
    [2, 3.6],
    P,
  );
  return {
    feet: byDepth(P, corners(base, 22)).map(([x, y]) => [
      cylinder(x, y, 7, -BASE_H - FOOT_H, 1.6, P, 28),
      cylinder(x, y, 5.4, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28),
    ]),
    groove: planOutline(insetPlan(base, 5), 0, P),
    halo: solid(base, -BASE_H - FOOT_H, BASE_H).fill,
    label: solid(label, 0, 0.8, 4),
    labelLine: planOutline(insetPlan(label, 1.6), 0.8, P),
    labelRules: [0, 1, 2].map((row) =>
      lineOnTop(
        [label.x + 8, label.y + label.d / 2 - 2.6 + row * 2.6],
        [
          label.x + label.w * [0.84, 0.6, 0.72][row],
          label.y + label.d / 2 - 2.6 + row * 2.6,
        ],
        0.8,
        P,
      ),
    ),
    labelScrews: [
      at([label.x + 3.6, label.y + label.d / 2, 0.8]),
      at([label.x + label.w - 3.6, label.y + label.d / 2, 0.8]),
    ],
    ruler: solid(ruler, 0, 0.6, 3),
    screwRings: corners(base, 10)
      .map(([x, y]) => ring(x, y, 2.2, 0, P, 16))
      .join(''),
    screws: corners(base, 10).map(([x, y]) => at([x, y, 0])),
    slab: solid(base, -BASE_H, BASE_H, 8, 1.6),
    ticksMajor: ticks.major,
    ticksMinor: ticks.minor,
  };
}

export type Bench = ReturnType<typeof benchOf>;

export const byDepth = (P: Projection, points: Plane[]) =>
  [...points].sort(
    (a, b) => depthOf([a[0], a[1], 0], P) - depthOf([b[0], b[1], 0], P),
  );

/** Face helpers bound to one projection. */
export function facesOf(P: Projection) {
  const at = (point: Point3) => iso(point, P);
  return {
    at,
    /** A closed rectangle on a face of constant y. */
    rectOnY: (y: number, x0: number, x1: number, z0: number, z1: number) =>
      pathOf(
        [at([x0, y, z0]), at([x1, y, z0]), at([x1, y, z1]), at([x0, y, z1])],
        true,
      ),
    /** A closed rectangle on a face of constant x. */
    rectOnX: (x: number, y0: number, y1: number, z0: number, z1: number) =>
      pathOf(
        [at([x, y0, z0]), at([x, y1, z0]), at([x, y1, z1]), at([x, y0, z1])],
        true,
      ),
    /** A line on a face of constant y. */
    lineOnY: (y: number, x0: number, x1: number, z0: number, z1 = z0) =>
      pathOf([at([x0, y, z0]), at([x1, y, z1])]),
    /** A circle on a face of constant y. */
    circleOnY: (cx: number, y: number, cz: number, r: number, steps = 20) =>
      pathOf(
        Array.from({ length: steps }, (_, step) => {
          const angle = (step / steps) * Math.PI * 2;
          return at([cx + r * Math.cos(angle), y, cz + r * Math.sin(angle)]);
        }),
        true,
      ),
    /** A circle on a face of constant x. */
    circleOnX: (x: number, cy: number, cz: number, r: number, steps = 20) =>
      pathOf(
        Array.from({ length: steps }, (_, step) => {
          const angle = (step / steps) * Math.PI * 2;
          return at([x, cy + r * Math.cos(angle), cz + r * Math.sin(angle)]);
        }),
        true,
      ),
  };
}

/** Round every corner of a 3D route with a quadratic bend, then project it. */
export function routeOf(
  P: Projection,
  points: Point3[],
  radius: number,
): Flat[] {
  const out: Point3[] = [points[0]];
  const lerp = (a: Point3, b: Point3, t: number): Point3 => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
  const length = (a: Point3, b: Point3) =>
    Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  for (let index = 1; index < points.length - 1; index++) {
    const [a, b, c] = [points[index - 1], points[index], points[index + 1]];
    const cutIn = Math.min(radius, length(a, b) / 2) / length(a, b);
    const cutOut = Math.min(radius, length(b, c) / 2) / length(b, c);
    const p0 = lerp(b, a, cutIn);
    const p2 = lerp(b, c, cutOut);
    for (let step = 0; step <= 10; step++) {
      const t = step / 10;
      out.push(lerp(lerp(p0, b, t), lerp(b, p2, t), t));
    }
  }
  out.push(points[points.length - 1]);
  return out.map((point) => iso(point, P));
}

/**
 * Place a lit dash along a path drawn with pathLength=1. `t` runs 0 → 1;
 * `dir` 1 travels from the path's start, -1 from its end.
 */
export function runAlong(
  run: SVGPathElement,
  head: SVGGElement | null,
  t: number,
  dir: 1 | -1,
  dash = 0.2,
) {
  const along = dir === 1 ? t : 1 - t;
  const start = dir === 1 ? along - dash : along;
  const fade = Math.max(0, Math.min(1, t * 10, (1 - t) * 14));
  run.style.strokeDasharray = `${dash} 3`;
  run.style.strokeDashoffset = (-start).toFixed(4);
  run.style.opacity = fade.toFixed(3);
  if (head) {
    const point = run.getPointAtLength(run.getTotalLength() * along);
    head.setAttribute(
      'transform',
      `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`,
    );
    head.style.opacity = fade.toFixed(3);
  }
}

export function hideRun(run: SVGPathElement | null, head: SVGGElement | null) {
  if (run) run.style.opacity = '0';
  if (head) head.style.opacity = '0';
}

/** A housing: plinth, body, wrapped seam, top groove and corner screws. */
export function housingOf(P: Projection, plan: Plan, top: number) {
  const at = (point: Point3) => iso(point, P);
  return {
    body: slabOf(plan, 3, top - 3, P, 4, 1),
    groove: planOutline(insetPlan(plan, 2.4), top, P, 3),
    plinth: slabOf(insetPlan(plan, -1.5), 0, 3, P, 4, 0.5),
    screws: corners(plan, 4).map(([x, y]) => at([x, y, top])),
    seam: sideSeamOf(P, plan, 9),
  };
}

export type Housing = ReturnType<typeof housingOf>;

function sideSeamOf(P: Projection, plan: Plan, z: number) {
  return sideSeam(plan, z, P, 4);
}

/** Knurl lines on the visible half of a vertical knob, turned by `phase` radians. */
export function knurlOf(
  P: Projection,
  cx: number,
  cy: number,
  r: number,
  z0: number,
  z1: number,
  count: number,
  phase: number,
) {
  const [vx, vy] = towardViewer(P);
  const out: string[] = [];
  for (let index = 0; index < count; index++) {
    const angle = phase + (index / count) * Math.PI * 2;
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    if (nx * vx + ny * vy < 0.2) continue;
    const a = iso([cx + r * nx, cy + r * ny, z0 + 0.5], P);
    const b = iso([cx + r * nx, cy + r * ny, z1 - 0.5], P);
    out.push(
      `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`,
    );
  }
  return out.join('');
}

export interface PhoneSpec {
  /** Left edge of the phone body and its back face. */
  x: number;
  y: number;
  /** Screen size in world units. */
  sw: number;
  sh: number;
  /** Dock extends this far in front of the phone (default 22). */
  ledge?: number;
  /** Extra dock width each side (default 8). */
  margin?: number;
}

/** A phone standing in a dock, its screen facing +y; geometry plus a screen matrix. */
export function phoneOf(
  P: Projection,
  { ledge = 22, margin = 8, sh, sw, x, y }: PhoneSpec,
) {
  const at = (point: Point3) => iso(point, P);
  const F = facesOf(P);
  const side = 1.8;
  const bezel = 3;
  const body: Plan = { d: 5, r: 2, w: sw + side * 2, x, y };
  const dockTop = 8;
  const dock: Plan = {
    d: ledge + 14,
    r: 3,
    w: body.w + margin * 2,
    x: x - margin,
    y: y - 9,
  };
  const front = y + 5;
  const z0 = dockTop + 2 + bezel;
  const z1 = z0 + sh;
  const top = z1 + bezel + 3;
  const sx = x + side;
  return {
    bezel: F.rectOnY(front, sx - 0.8, sx + sw + 0.8, z0 - 0.8, z1 + 0.8),
    body: slabOf(body, dockTop, top - dockTop, P, 6, 0.6),
    camera: at([sx + sw - 3, front, z1 + (bezel + 3) / 2]),
    dock: slabOf(dock, 0, dockTop, P, 6, 1),
    dockFront: dock.y + dock.d,
    dockGroove: planOutline(insetPlan(dock, 2.4), dockTop, P, 4),
    dockScrews: corners(dock, 4).map(([cx, cy]) => at([cx, cy, dockTop])),
    dockSeam: sideSeam(dock, 3, P, 6),
    dockTop,
    glass: F.rectOnY(front, sx, sx + sw, z0, z1),
    lip: slabOf(
      { d: 3, r: 1, w: body.w + 4, x: x - 2, y: front + 0.4 },
      dockTop,
      4,
      P,
      3,
      0.4,
    ),
    lipScrews: [x + 2, x + body.w - 2].map((px) =>
      at([px, front + 1.9, dockTop + 4]),
    ),
    rest: slabOf(
      { d: 3, r: 1, w: body.w - 8, x: x + 4, y: y - 4 },
      dockTop,
      sh * 0.4,
      P,
      3,
      0.4,
    ),
    screen: sideMatrix([sx, front], z1, P, 'left'),
    sh,
    sideButton: slabOf(
      { d: 2, r: 0.2, w: 0.7, x: x + body.w, y: y + 1.5 },
      z1 - 16,
      7,
      P,
      2,
    ),
    speaker: F.lineOnY(
      front,
      sx + sw / 2 - 3,
      sx + sw / 2 + 3,
      z1 + (bezel + 3) / 2,
    ),
    sw,
    /** Socket shell on the dock's front face at x, for a cable. */
    socketAt: (sxPos: number, z = 3.4) => ({
      end: [sxPos, dock.y + dock.d + 3, z] as Point3,
      mouth: F.rectOnY(dock.y + dock.d + 3, sxPos - 2, sxPos + 2, z - 1, z + 1),
      shell: slabOf(
        { d: 3, r: 0.6, w: 7, x: sxPos - 3.5, y: dock.y + dock.d },
        z - 2.6,
        5.2,
        P,
        3,
        0.3,
      ),
    }),
  };
}

export type Phone = ReturnType<typeof phoneOf>;

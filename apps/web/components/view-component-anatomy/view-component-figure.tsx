/**
 * View is React Native's basic container: it draws nothing itself, groups
 * children, carries layout and style, and is a flexbox container with a
 * column default. It maps to UIView on iOS, android.view on Android and a
 * <div> on the web. Views nest freely; a flatter tree is easier to reason
 * about.
 */
import * as React from 'react';
import {
  boxCorners,
  fitProjection,
  segment,
  slabOf,
  solidSvg,
  topMatrix,
  type Plan,
} from '../anatomy/kit/iso-kit';
import { FaceText, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import { BenchArt, Controls } from '../anatomy/bench';
import { BASE_H, FOOT_H, benchOf } from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';

const WIDTH = 640;
const HEIGHT = 400;
const BASE: Plan = { d: 110, r: 10, w: 200, x: -100, y: -60 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 64, r: 0, w: 96, x: -48, y: -46 }, 0, 44),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 48, elevation: 34, pad: 18 },
);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 50, y: 30 },
  ruler: { d: 5, r: 1, w: 120, x: -86, y: 38 },
});

const ROOT: Plan = { d: 64, r: 3, w: 96, x: -48, y: -46 };
const ROOT_Z = 0;
const PLATE_H = 3;
const LIFT = 13;
const INNER: Plan = { d: 30, r: 2, w: 80, x: -40, y: -40 };
const IMAGE: Plan = { d: 16, r: 1.4, w: 30, x: -40, y: -2 };

/** Text blocks inside the inner View, column (default) or row. */
const textPlan = (i: number, row: boolean): Plan =>
  row
    ? { d: 22, r: 1.2, w: 34, x: INNER.x + 4 + i * 38, y: INNER.y + 4 }
    : { d: 10, r: 1.2, w: 70, x: INNER.x + 5, y: INNER.y + 4 + i * 12 };

const LABEL =
  'A View drawn as nested plates on a stand. The root View is the bottom plate; on it sit an inner View, which holds two Text blocks, and an Image. Exploding the stack lifts each nesting level apart, with posts showing what holds what, so the depth of the tree is visible. The inner View’s children stack in a column by default and side by side when its flexDirection is row. Flattening removes the wrapper View and puts the Text blocks straight on the root, one level shallower.';

type Action = 'explode' | 'row' | 'flatten';
const TOUR: Action[] = [
  'explode',
  'row',
  'flatten',
  'explode',
  'flatten',
  'row',
];

export function ViewBench() {
  const sim = React.useRef({
    explode: 0,
    explodeTarget: 0,
    flat: 0,
    flatTarget: 0,
    flattened: false,
    mix: 0,
    row: false,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const layerRef = React.useRef<SVGGElement>(null);

  const actions: Record<Action, () => void> = {
    explode: () => {
      const s = sim.current;
      s.explodeTarget = s.explodeTarget ? 0 : 1;
      say(
        s.explodeTarget
          ? `exploded · depth ${s.flattened ? 2 : 3}: View › ${s.flattened ? '' : 'View › '}Text`
          : `assembled`,
      );
      sch.later(0.6, () => undefined);
    },
    flatten: () => {
      const s = sim.current;
      s.flattened = !s.flattened;
      s.flatTarget = s.flattened ? 1 : 0;
      rerender();
      say(
        s.flattened
          ? `wrapper View removed · Text sits on the root · depth 2`
          : `inner View back · depth 3`,
      );
      sch.later(0.6, () => undefined);
    },
    row: () => {
      const s = sim.current;
      s.row = !s.row;
      rerender();
      say(
        s.row
          ? `inner View: flexDirection 'row' · children side by side`
          : `inner View: default flexDirection 'column'`,
      );
      sch.later(0.6, () => undefined);
    },
  };

  const draw = () => {
    const s = sim.current;
    const lift1 = LIFT * s.explode;
    const innerZ = ROOT_Z + PLATE_H + lift1;
    const textZ =
      (1 - s.flat) * (innerZ + PLATE_H + LIFT * s.explode) +
      s.flat * (ROOT_Z + PLATE_H + lift1);
    const parts: string[] = [];
    const posts: string[] = [];
    // Posts show what holds what when exploded.
    if (s.explode > 0.02) {
      const corners = (p: Plan) => [
        [p.x + 2, p.y + 2],
        [p.x + p.w - 2, p.y + p.d - 2],
      ];
      if (s.flat < 0.98)
        corners(INNER).forEach(([x, y]) =>
          posts.push(segment([x, y, ROOT_Z + PLATE_H], [x, y, innerZ], P)),
        );
      corners(IMAGE).forEach(([x, y]) =>
        posts.push(
          segment(
            [x, y, ROOT_Z + PLATE_H],
            [x, y, ROOT_Z + PLATE_H + lift1],
            P,
          ),
        ),
      );
    }
    const tag = (x: number, y: number, z: number, text: string) =>
      `<text class="iso-face-text" data-tone="mid" font-size="2.6" transform="${topMatrix([x, y], z, P, 'x')}">${text}</text>`;
    if (s.flat < 0.98)
      parts.push(
        `<g opacity="${(1 - s.flat).toFixed(3)}">${solidSvg(slabOf(INNER, innerZ, PLATE_H, P, 4, 0.6), { crease: 'lo', tone: 'mid' })}${tag(INNER.x + 2, INNER.y + INNER.d - 1.6, innerZ + PLATE_H, `&lt;View&gt; ${s.row ? 'row' : 'column'}`)}</g>`,
      );
    parts.push(
      solidSvg(slabOf(IMAGE, ROOT_Z + PLATE_H + lift1, 6, P, 3, 0.6), {
        crease: 'lo',
        tone: 'hi',
      }) +
        tag(
          IMAGE.x + 3,
          IMAGE.y + 9,
          ROOT_Z + PLATE_H + lift1 + 6,
          '&lt;Image&gt;',
        ),
    );
    [0, 1].forEach((i) => {
      const a = textPlan(i, false);
      const b = textPlan(i, true);
      const m = s.mix;
      const plan: Plan = {
        d: a.d + (b.d - a.d) * m,
        r: 1.2,
        w: a.w + (b.w - a.w) * m,
        x: a.x + (b.x - a.x) * m,
        y: a.y + (b.y - a.y) * m,
      };
      if (s.explode > 0.02 && s.flat < 0.98)
        posts.push(
          segment(
            [plan.x + 2, plan.y + 2, innerZ + PLATE_H],
            [plan.x + 2, plan.y + 2, textZ],
            P,
          ),
        );
      parts.push(
        solidSvg(slabOf(plan, textZ, 3, P, 3, 0.4), {
          crease: 'lo',
          lit: true,
          tone: 'hi',
        }) +
          tag(
            plan.x + 3,
            plan.y + 6.4,
            textZ + 3,
            `&lt;Text&gt; ${i ? 'Right' : 'Left'}`,
          ),
      );
    });
    if (layerRef.current)
      layerRef.current.innerHTML =
        `<path class="iso-line" data-tone="faint" stroke-dasharray="1.5 1.5" d="${posts.join('')}"/>` +
        parts.join('');
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    s.explode = follow(s.explode, s.explodeTarget, dt, 0.14, calm);
    s.flat = follow(s.flat, s.flatTarget, dt, 0.14, calm);
    s.mix = follow(s.mix, s.row ? 1 : 0, dt, 0.12, calm);
    draw();
    const moving =
      s.explode !== s.explodeTarget ||
      s.flat !== s.flatTarget ||
      s.mix !== (s.row ? 1 : 0);
    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.5, (i) =>
      actions[TOUR[i % TOUR.length]](),
    );
    return moving || pending || touring;
  };
  const kick = useLoop(tick, inView);
  const act = (action: Action) => {
    sch.touch();
    if (sch.pending) return;
    actions[action]();
    kick();
  };
  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
    draw();
  }, [sch]);
  const s = sim.current;
  const locked = sch.busy && sch.touched;
  const root = slabOf(ROOT, ROOT_Z, PLATE_H, P, 4, 0.8);

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Explode or assemble the views. Press R for row, F to flatten."
        onClick={() => act('explode')}
        onKeyDown={(event) => {
          const map: Record<string, Action> = {
            ' ': 'explode',
            e: 'explode',
            Enter: 'explode',
            f: 'flatten',
            r: 'row',
          };
          const action = map[event.key];
          if (!action) return;
          event.preventDefault();
          act(action);
        }}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          <BenchArt bench={BENCH} />
          <Solid paths={root} tone="mid" crease="faint" />
          <FaceText
            transform={topMatrix(
              [ROOT.x + 3, ROOT.y + ROOT.d - 3],
              PLATE_H,
              P,
              'x',
            )}
            size={2.6}
            tone="lo"
          >
            {'<View> · UIView · android.view · <div>'}
          </FaceText>
          <g ref={layerRef} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('explode')} disabled={locked}>
          Explode
        </button>
        <button
          type="button"
          onClick={() => act('row')}
          disabled={locked}
          aria-pressed={s.row}
        >
          flexDirection: {s.row ? 'row' : 'column'}
        </button>
        <button
          type="button"
          onClick={() => act('flatten')}
          disabled={locked}
          aria-pressed={s.flattened}
        >
          {s.flattened ? 'Add the wrapper back' : 'Flatten'}
        </button>
      </Controls>
    </div>
  );
}

export function ViewAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Views inside views"
        hint="Tap to explode · R row · F flatten"
        readout="<View> → UIView · android.view · <div>"
        keys={[
          { label: 'Text inside the inner View', mark: 'lit' },
          { label: 'View', mark: 'raised' },
          { label: 'Held by', mark: 'dashed' },
        ]}
        caption="View is the basic layout container: it draws nothing itself, groups children, and carries layout and styles such as background, padding and borders. It is a UIView on iOS, an android.view on Android and roughly a div on the web. Every View is a flexbox container whose default direction is column, not row. Views nest freely; Fabric made deep nesting much cheaper than it was, but a flatter tree is still easier to reason about."
      >
        <ViewBench />
      </Plate>
    </div>
  );
}

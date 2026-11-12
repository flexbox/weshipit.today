/**
 * StyleSheet: styles are plain objects passed to a component's style prop.
 * In a style array later entries win; there is no inheritance, so a color on
 * a View never reaches the Text inside it.
 */
import * as React from 'react';
import {
  boxCorners,
  cylinder,
  fitProjection,
  ring,
  sideSeam,
  slabOf,
  topMatrix,
  translateAlong,
  type Plan,
} from '../anatomy/kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import {
  BenchArt,
  Controls,
  PhoneBack,
  PhoneFront,
  PhoneScreen,
} from '../anatomy/bench';
import { BASE_H, FOOT_H, benchOf, phoneOf } from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';

const WIDTH = 640;
const HEIGHT = 360;
const BASE: Plan = { d: 100, r: 10, w: 230, x: -136, y: -62 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 34, x: 30, y: -48 }, 0, 72),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 54, pad: 18 },
);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 46, y: 22 },
  ruler: { d: 5, r: 1, w: 120, x: -122, y: 28 },
});
const PHONE = phoneOf(P, { sh: 56, sw: 30, x: 30, y: -48 });

const PLATE: Plan = { d: 40, r: 3, w: 104, x: -124, y: -44 };
const SPINDLES = [
  { name: '<View>', x: -96 },
  { name: '<Text>', x: -44 },
];
const SY = -26;
const PLATE_H = 2;
const STYLE: Plan = { d: 16, r: 1.6, w: 30, x: -15, y: SY - 8 };
const ART = {
  bases: SPINDLES.map((s) => cylinder(s.x, SY, 10, 4, 2, P, 40, 0.4)),
  caps: SPINDLES.map((s) => topMatrix([s.x - 10, SY + 13.6], 4, P, 'x')),
  hole: ring(0, SY, 1.8, 6 + PLATE_H, P, 14),
  plate: slabOf(PLATE, 0, 4, P, 4, 0.8),
  posts: SPINDLES.map((s) => cylinder(s.x, SY, 1.3, 6, 18, P, 16)),
  rings: SPINDLES.map((s) => ring(s.x, SY, 7.6, 6, P, 32)),
  seam: sideSeam(PLATE, 1.6, P, 4),
  style: slabOf(STYLE, 6, PLATE_H, P, 3, 0.3),
  styleFace: topMatrix([STYLE.x + 2, STYLE.y + 5], 6 + PLATE_H, P, 'x'),
};

interface StylePlate {
  on: 0 | 1;
  id: string;
  label: string;
  props: string;
}

const STYLES: StylePlate[] = [
  { id: 'card', label: 'styles.card', on: 0, props: 'padding: 16' },
  { id: 'active', label: 'styles.active', on: 0, props: 'bg: blue' },
  { id: 'viewColor', label: '{ color }', on: 0, props: 'color: blue' },
  { id: 'textColor', label: '{ color }', on: 1, props: 'color: blue' },
];

type Action = 'active' | 'viewColor' | 'textColor' | 'reset';
const TOUR: Action[] = ['active', 'viewColor', 'textColor', 'reset'];

const LABEL =
  'StyleSheet drawn as two spindles of style plates, one for a View and one for the Text inside it, beside a phone showing the rendered card. The View spindle always carries styles.card. Turning isActive on drops styles.active on top of it: in a style array later entries win, so the card turns blue. A color plate dropped on the View spindle changes nothing on screen, because styles do not inherit; the same plate on the Text spindle turns the text blue.';

export function StyleSheetBench() {
  const sim = React.useRef({
    active: false,
    drops: { active: 0, textColor: 0, viewColor: 0 } as Record<string, number>,
    textColor: false,
    viewColor: false,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const refs = React.useRef<Record<string, SVGGElement | null>>({});

  const actions: Record<Action, () => void> = {
    active: () => {
      const s = sim.current;
      s.active = !s.active;
      rerender();
      say(
        s.active
          ? `style={[styles.card, isActive && styles.active]} · later entry wins · blue`
          : `isActive false · only styles.card`,
      );
      sch.later(0.4, () => undefined);
    },
    reset: () => {
      Object.assign(sim.current, {
        active: false,
        textColor: false,
        viewColor: false,
      });
      rerender();
      say(`back to styles.card`);
      sch.later(0.4, () => undefined);
    },
    textColor: () => {
      const s = sim.current;
      s.textColor = !s.textColor;
      rerender();
      say(
        s.textColor
          ? `color on the Text · the text turns blue`
          : `Text color removed`,
      );
      sch.later(0.4, () => undefined);
    },
    viewColor: () => {
      const s = sim.current;
      s.viewColor = !s.viewColor;
      rerender();
      say(
        s.viewColor
          ? `color on the View · the text inside stays the same · no inheritance`
          : `View color removed`,
      );
      sch.later(0.4, () => undefined);
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    for (const id of ['active', 'viewColor', 'textColor']) {
      const goal = (s as unknown as Record<string, boolean>)[id] ? 0 : 1;
      s.drops[id] = follow(s.drops[id], goal, dt, 0.09, calm);
      moving ||= s.drops[id] !== goal;
      const node = refs.current[id];
      node?.setAttribute('opacity', (1 - s.drops[id]).toFixed(3));
      node?.setAttribute(
        'transform',
        node.dataset.base + ' ' + translateAlong(P, [0, 0, 16 * s.drops[id]]),
      );
    }
    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.6, (i) =>
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
  }, [sch]);
  const s = sim.current;
  const locked = sch.busy && sch.touched;

  const plate = (
    style: StylePlate,
    spindle: number,
    level: number,
    lit: boolean,
  ) => {
    const base = translateAlong(P, [
      SPINDLES[spindle].x,
      0,
      level * (PLATE_H + 0.4),
    ]);
    const live = style.id !== 'card';
    return (
      <g
        key={style.id}
        ref={live ? (node) => void (refs.current[style.id] = node) : undefined}
        data-base={base}
        transform={base}
        opacity={live ? 0 : 1}
      >
        <Solid paths={ART.style} tone="hi" crease="lo" lit={lit} />
        <Line d={ART.hole} tone="mid" />
        <FaceText transform={ART.styleFace} size={2.4} tone="mid">
          {style.label}
        </FaceText>
        <g transform={ART.styleFace}>
          <text
            className={
              style.id === 'card' ? 'af-mono er-url' : 'af-mono ss-blue'
            }
            y={4}
            fontSize={2.2}
          >
            {style.props}
          </text>
        </g>
      </g>
    );
  };

  const SW = PHONE.sw;
  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Toggle isActive. Press V for a color on the View, T for a color on the Text, R to reset."
        onClick={() => act('active')}
        onKeyDown={(event) => {
          const map: Record<string, Action> = {
            ' ': 'active',
            a: 'active',
            Enter: 'active',
            r: 'reset',
            t: 'textColor',
            v: 'viewColor',
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
          <Solid
            paths={ART.plate}
            tone="mid"
            crease="faint"
            inner={<Line d={ART.seam} tone="faint" />}
          />
          {SPINDLES.map((spindle, i) => (
            <g key={i}>
              <Solid paths={ART.bases[i]} tone="mid" crease="none" />
              <Line d={ART.rings[i]} tone="lo" />
              <Solid paths={ART.posts[i]} tone="mid" crease="none" />
              <FaceText transform={ART.caps[i]} size={3} tone="mid">
                {spindle.name}
              </FaceText>
              {i === 0 ? (
                <>
                  {plate(STYLES[0], 0, 0, false)}
                  {plate(STYLES[1], 0, 1, true)}
                  {plate(STYLES[2], 0, 2, false)}
                </>
              ) : (
                plate(STYLES[3], 1, 0, false)
              )}
            </g>
          ))}
          <PhoneBack phone={PHONE} />
          <PhoneScreen phone={PHONE} id="ss-screen">
            <rect
              className={s.active ? 'ss-card-active' : 'ss-card'}
              x={3}
              y={10}
              width={SW - 6}
              height={22}
              rx={3}
            />
            <text
              className={s.textColor ? 'af-mono ss-blue' : 'af-mono'}
              x={7}
              y={20}
              fontSize={3.6}
            >
              Hello
            </text>
            <path className="af-ui-line" d={`M7 25H${SW - 9}`} />
            {s.viewColor && !s.textColor ? (
              <path
                className="af-red-line"
                d={`M${SW - 9} 17L${SW - 5} 21M${SW - 5} 17L${SW - 9} 21`}
              />
            ) : null}
          </PhoneScreen>
          <PhoneFront phone={PHONE} />
        </svg>
      </div>
      <Controls>
        <button
          type="button"
          onClick={() => act('active')}
          disabled={locked}
          aria-pressed={s.active}
        >
          isActive
        </button>
        <button
          type="button"
          onClick={() => act('viewColor')}
          disabled={locked}
          aria-pressed={s.viewColor}
        >
          color on View
        </button>
        <button
          type="button"
          onClick={() => act('textColor')}
          disabled={locked}
          aria-pressed={s.textColor}
        >
          color on Text
        </button>
        <button type="button" onClick={() => act('reset')} disabled={locked}>
          Reset
        </button>
      </Controls>
    </div>
  );
}

export function StyleSheetAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How styles combine"
        hint="Tap for isActive · V on View · T on Text"
        readout="style={[styles.card, isActive && styles.active]}"
        keys={[
          { label: 'Style that wins', mark: 'lit' },
          { label: 'Style object', mark: 'raised' },
          { label: 'Color value', mark: 'blue' },
        ]}
        caption="React Native styles are plain JavaScript objects on the style prop, with camelCase names and density-independent numbers. There is no cascade: in a style array, later entries win, and nothing is inherited, so a color on a View never reaches the Text inside it. Text styles go on the Text. StyleSheet.create is mostly a readability convention now, and tools like NativeWind compile down to these same objects."
      >
        <StyleSheetBench />
      </Plate>
    </div>
  );
}

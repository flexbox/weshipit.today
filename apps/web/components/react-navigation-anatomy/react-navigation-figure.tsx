import * as React from 'react';
import { translateAlong } from '../anatomy/kit/iso-kit';
import { Dots, FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
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
import { useScheduler } from '../anatomy/sim';
import {
  BENCH,
  CARD_ART,
  CARD_H,
  CARD_Z0,
  HEIGHT,
  P,
  PHONE_ART,
  PLATE_ART,
  SPINDLE_X,
  WIDTH,
  postAbove,
} from './geometry';
import { ROUTES, TABS, readouts } from './model';

/* ---------- Static art ---------- */

const PLATE = (
  <g>
    <Solid
      paths={PLATE_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={PLATE_ART.seam} tone="faint" />}
    />
    <Dots points={PLATE_ART.screws} size={0.45} tone="mid" />
    {PLATE_ART.names.map((transform, index) => (
      <FaceText
        key={index}
        transform={transform}
        size={3.4}
        tone="lo"
        anchor="middle"
      >
        <tspan dy={1.2}>{TABS[index]}</tspan>
      </FaceText>
    ))}
  </g>
);

const SW = PHONE_ART.sw;
const SH = PHONE_ART.sh;

/** One screen of the app, in screen units. */
function ScreenView({ depth, tab }: { tab: number; depth: number }) {
  const name = ROUTES[tab][depth - 1];
  const seed = (tab * 3 + depth) % 4;
  return (
    <g>
      <rect className="af-screen" width={SW} height={SH} />
      <rect className="rn-header" width={SW} height={9} />
      {depth > 1 ? (
        <path className="af-ui-line" d="M3.6 4.6L2.2 6 3.6 7.4" />
      ) : null}
      <text
        className="af-mono"
        x={SW / 2}
        y={7}
        fontSize={3}
        textAnchor="middle"
      >
        {name}
      </text>
      {Array.from({ length: 4 - (seed % 2) }, (_, row) => (
        <g key={row}>
          <rect
            className="af-ui-line"
            x={2.4}
            y={12 + row * 9}
            width={SW - 4.8}
            height={7}
            rx={1}
          />
          <path
            className="af-ui-line"
            d={`M5 ${14.6 + row * 9}H${SW - 6 - ((row + seed) % 3) * 4}`}
          />
        </g>
      ))}
      <path className="af-ui-line" d={`M0 ${SH - 7}H${SW}`} />
      {TABS.map((_, index) => {
        const cx = (SW / 3) * (index + 0.5);
        return index === tab ? (
          <circle
            key={index}
            className="af-head"
            cx={cx}
            cy={SH - 3.6}
            r={1.4}
          />
        ) : (
          <circle
            key={index}
            className="af-ui-line"
            cx={cx}
            cy={SH - 3.6}
            r={1.4}
          />
        );
      })}
    </g>
  );
}

/* ---------- Simulation ---------- */

interface Sim {
  tab: number;
  depth: number[];
  /** Screen transition: the layer sliding in or out over the one under it. */
  arm: number;
  drops: number[];
  leaving: { tab: number; index: number; t: number } | null;
  slide: {
    t: number;
    dir: 1 | -1;
    over: [number, number];
    under: [number, number];
  } | null;
}

type Action = 'push' | 'pop' | 'tab0' | 'tab1' | 'tab2';
const TOUR: Action[] = [
  'push',
  'push',
  'tab1',
  'push',
  'tab0',
  'pop',
  'tab2',
  'push',
  'pop',
  'tab0',
  'pop',
];

const LABEL =
  'React Navigation drawn as a tab plate with three spindles, Home, Search and Profile, each holding its own stack of screen cards, beside a phone. The phone shows the top card of the active tab’s stack, with a tab bar at the bottom. Push drops a new card onto the active spindle while the new screen slides in from the right over the old one; back lifts the top card off and the screen slides away. Switching tabs swings a selector arm to another spindle, and that stack comes back exactly as it was left.';

export function ReactNavigationBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      arm: 0,
      depth: [1, 1, 1],
      drops: [0, 0, 0],
      leaving: null,
      slide: null,
      tab: 0,
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const overRef = React.useRef<SVGGElement>(null);
  const underRef = React.useRef<SVGGElement>(null);
  const dimRef = React.useRef<SVGRectElement>(null);
  const dropRefs = React.useRef<Array<SVGGElement | null>>([]);
  const leaveRef = React.useRef<SVGGElement>(null);

  const actions: Record<Action, () => void> = {
    pop: () => {
      const s = sim.current;
      const d = s.depth[s.tab];
      if (d <= 1) {
        say(readouts.root(s.tab));
        return;
      }
      s.depth[s.tab] = d - 1;
      s.slide = { dir: -1, over: [s.tab, d], t: 0, under: [s.tab, d - 1] };
      s.leaving = { index: d - 1, t: 0, tab: s.tab };
      rerender();
      say(readouts.pop(s.tab, d - 1));
      sch.later(0.5, () => undefined);
    },
    push: () => {
      const s = sim.current;
      const d = s.depth[s.tab];
      if (d >= ROUTES[s.tab].length) {
        say(readouts.full(s.tab));
        return;
      }
      s.depth[s.tab] = d + 1;
      s.slide = { dir: 1, over: [s.tab, d + 1], t: 0, under: [s.tab, d] };
      s.drops[s.tab] = 1;
      rerender();
      say(readouts.push(s.tab, d + 1));
      sch.later(0.5, () => undefined);
    },
    tab0: () => switchTab(0),
    tab1: () => switchTab(1),
    tab2: () => switchTab(2),
  };

  function switchTab(tab: number) {
    const s = sim.current;
    s.tab = tab;
    s.slide = null;
    rerender();
    say(readouts.tab(tab, s.depth[tab]));
    sch.later(0.4, () => undefined);
  }

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;

    if (s.slide) {
      s.slide.t = calm ? 1 : Math.min(1, s.slide.t + dt / 0.38);
      const e = 1 - Math.pow(1 - s.slide.t, 3);
      const k = s.slide.dir === 1 ? e : 1 - e;
      overRef.current?.setAttribute(
        'transform',
        `translate(${((1 - k) * SW).toFixed(2)} 0)`,
      );
      underRef.current?.setAttribute(
        'transform',
        `translate(${(-0.3 * SW * k).toFixed(2)} 0)`,
      );
      dimRef.current?.setAttribute('opacity', (0.35 * k).toFixed(3));
      if (s.slide.t >= 1) {
        s.slide = null;
        rerender();
      }
      moving = true;
    }

    s.drops.forEach((value, tab) => {
      s.drops[tab] = follow(value, 0, dt, 0.08, calm);
      moving ||= s.drops[tab] > 0.001;
      const node = dropRefs.current[tab];
      node?.setAttribute(
        'transform',
        translateAlong(P, [0, 0, 14 * s.drops[tab]]),
      );
      node?.setAttribute('opacity', (1 - s.drops[tab]).toFixed(3));
    });
    if (s.leaving) {
      s.leaving.t = calm ? 1 : Math.min(1, s.leaving.t + dt / 0.4);
      leaveRef.current?.setAttribute(
        'transform',
        translateAlong(P, [
          SPINDLE_X[s.leaving.tab],
          0,
          CARD_H * s.leaving.index + 14 * s.leaving.t,
        ]),
      );
      leaveRef.current?.setAttribute('opacity', (1 - s.leaving.t).toFixed(3));
      if (s.leaving.t >= 1) {
        s.leaving = null;
        rerender();
      }
      moving = true;
    }

    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.4, (i) =>
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

  const onKey = (event: React.KeyboardEvent) => {
    const map: Record<string, Action> = {
      ' ': 'push',
      '1': 'tab0',
      '2': 'tab1',
      '3': 'tab2',
      b: 'pop',
      Backspace: 'pop',
      Enter: 'push',
      Escape: 'pop',
      p: 'push',
    };
    const action = map[event.key];
    if (!action) return;
    event.preventDefault();
    act(action);
  };

  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
  }, [sch]);

  const s = sim.current;
  const locked = sch.busy && sch.touched;
  const top: [number, number] = [s.tab, s.depth[s.tab]];
  const under = s.slide ? s.slide.under : null;
  const over = s.slide ? s.slide.over : top;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Push a screen. Press B to go back, 1 to 3 to switch tabs."
        onClick={() => act('push')}
        onKeyDown={onKey}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          <BenchArt bench={BENCH} />
          {PLATE}
          {SPINDLE_X.map((x, tab) => {
            const depth = s.depth[tab];
            const active = tab === s.tab;
            return (
              <g key={tab}>
                <Solid
                  paths={PLATE_ART.bases[tab]}
                  tone="mid"
                  crease="none"
                  lit={active}
                />
                <Line
                  d={PLATE_ART.baseRings[tab]}
                  tone={active ? 'lit' : 'lo'}
                />
                <Solid paths={PLATE_ART.posts[tab]} tone="mid" crease="none" />
                {Array.from({ length: depth }, (_, index) => {
                  const last = index === depth - 1;
                  return (
                    <g
                      key={index}
                      ref={
                        last
                          ? (node) => void (dropRefs.current[tab] = node)
                          : undefined
                      }
                    >
                      <g transform={translateAlong(P, [x, 0, CARD_H * index])}>
                        <Solid
                          paths={CARD_ART.body}
                          tone="hi"
                          crease="lo"
                          lit={active && last}
                        />
                        <Line d={CARD_ART.header} tone="faint" />
                        <Line d={CARD_ART.rules} tone="lo" free />
                        <Line d={CARD_ART.hole} tone="mid" />
                      </g>
                    </g>
                  );
                })}
                {s.leaving && s.leaving.tab === tab ? (
                  <g ref={leaveRef}>
                    <Solid paths={CARD_ART.body} tone="hi" crease="lo" />
                    <Line d={CARD_ART.hole} tone="mid" />
                  </g>
                ) : null}
                <Solid
                  paths={postAbove(tab, CARD_Z0 + CARD_H * depth)}
                  tone="mid"
                  crease="none"
                />
                <Dots points={[PLATE_ART.caps[tab]]} size={0.6} tone="mid" />
              </g>
            );
          })}

          <PhoneBack phone={PHONE_ART} />
          <PhoneScreen phone={PHONE_ART} id="rn-screen">
            {under ? (
              <g ref={underRef}>
                <ScreenView tab={under[0]} depth={under[1]} />
              </g>
            ) : null}
            {under ? (
              <rect
                ref={dimRef}
                className="ota-black"
                width={SW}
                height={SH}
                opacity={0}
              />
            ) : null}
            <g ref={overRef} className={under ? 'rn-shadowed' : undefined}>
              <ScreenView tab={over[0]} depth={over[1]} />
            </g>
          </PhoneScreen>
          <PhoneFront phone={PHONE_ART} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('push')} disabled={locked}>
          Push screen
        </button>
        <button type="button" onClick={() => act('pop')} disabled={locked}>
          Back
        </button>
        <div className="af-segmented" role="radiogroup" aria-label="Tab">
          {TABS.map((name, index) => (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={s.tab === index}
              onClick={() => act(`tab${index}` as Action)}
              disabled={locked}
            >
              {name}
            </button>
          ))}
        </div>
      </Controls>
    </div>
  );
}

export function ReactNavigationAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How navigators keep history"
        hint="Tap to push · B back · 1–3 tabs"
        readout={readouts.rest()}
        keys={[
          { label: 'Screen on top', mark: 'lit' },
          { label: 'Screen in the stack', mark: 'raised' },
          { label: 'Active tab', mark: 'edge' },
        ]}
        caption="React Navigation nests navigators. A bottom tab navigator keeps one stack per tab, and each stack keeps its own history: push puts a screen on top, which a Native Stack slides in with the platform's own animation and gesture, back pops it, and switching tabs brings another stack back exactly as you left it. Expo Router builds on these same navigators and wires them from your app/ folder."
      >
        <ReactNavigationBench />
      </Plate>
    </div>
  );
}

import * as React from 'react';
import { pathOf, translateAlong } from '../kit/iso-kit';
import { Dots, FaceText, Line, Plate, Solid } from '../kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../kit/live';
import {
  BenchArt,
  Cable,
  Controls,
  HousingArt,
  PhoneBack,
  PhoneFront,
  PhoneScreen,
  Runner,
  Socket,
} from '../bench';
import { hideRun, runAlong } from '../parts';
import { useScheduler } from '../sim';
import {
  BENCH,
  CABLES,
  CHIP_LABELS,
  DEV_CHIP_XS,
  DOCK_LABELS,
  GO_CHIP_XS,
  HEIGHT,
  METRO_ART,
  PHONES,
  PRESS_ART,
  P,
  SEAL,
  SOCKETS,
  WIDTH,
  chipOf,
  chipTop,
} from './geometry';
import { DEV_CHIPS, EXPO_GO_CHIPS, readouts } from './model';

const CABLE_D = CABLES.map((cable) => pathOf(cable));
const SW = PHONES[0].sw;
const SH = PHONES[0].sh;

interface Sim {
  js: boolean;
  drop: number;
  native: boolean;
  flash: number[];
  rebuilt: boolean;
  pulses: number[];
  dropTarget: number;
}

type Action = 'js' | 'native' | 'rebuild' | 'reset';
const TOUR: Action[] = ['js', 'native', 'rebuild', 'reset'];
const SEND = 0.8;

function AppScreen({
  broken,
  js,
  native,
  rebuilding,
}: {
  js: boolean;
  native: boolean;
  broken: boolean;
  rebuilding?: boolean;
}) {
  if (broken)
    return (
      <>
        <rect className="af-red" width={SW} height={SH} />
        <text className="af-error-text" x={2.4} y={8} fontSize={2.4}>
          Native module
        </text>
        <text className="af-error-text" x={2.4} y={11.4} fontSize={2.4}>
          not found: MMKV
        </text>
        <path className="af-error-line" d="M2.4 16H22M2.4 19H18M2.4 22H20" />
      </>
    );
  return (
    <>
      <rect className="rn-header" width={SW} height={8} />
      <text
        className="af-mono"
        x={SW / 2}
        y={5.6}
        fontSize={2.6}
        textAnchor="middle"
      >
        {rebuilding ? 'rebuilding…' : 'My App'}
      </text>
      {[
        ['App.tsx', true],
        ['date-fns', js],
        ['mmkv', native],
      ].map(([label, on], row) =>
        on ? (
          <g key={row}>
            <rect
              className="af-ui-line"
              x={2.4}
              y={11 + row * 8}
              width={SW - 4.8}
              height={6}
              rx={1}
            />
            <text className="af-mono" x={4.4} y={15.2 + row * 8} fontSize={2.4}>
              {label as string}
            </text>
          </g>
        ) : null,
      )}
    </>
  );
}

const LABEL =
  'Development builds drawn as two phones in docks, both cabled to a Metro server that sends them your JavaScript. On the left, Expo Go: a prebuilt app whose dock carries a sealed row of five native module chips, the Expo SDK. On the right, your development build, whose dock carries the chips for your own native dependencies. Adding date-fns, a JavaScript-only package, sends a pulse down both cables and both apps show it. Adding react-native-mmkv, a native module, turns both screens red: it is not compiled into either. Rebuilding the development build presses an mmkv chip into its dock, and it works; Expo Go’s sealed row cannot take it.';

export function DevBuildBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      drop: 1,
      dropTarget: 1,
      flash: [0, 0],
      js: false,
      native: false,
      pulses: [-1, -1],
      rebuilt: false,
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);
  const chipRef = React.useRef<SVGGElement>(null);
  const flashRefs = React.useRef<Array<SVGRectElement | null>>([]);

  const send = (then: () => void) => {
    const s = sim.current;
    s.pulses = [0, 0];
    sch.later(SEND, () => {
      s.flash = [1, 1];
      then();
      rerender();
    });
  };

  const actions: Record<Action, () => void> = {
    js: () => send(() => ((sim.current.js = true), say(readouts.js()))),
    native: () =>
      send(() => ((sim.current.native = true), say(readouts.native()))),
    rebuild: () => {
      const s = sim.current;
      if (!s.native || s.rebuilt) return;
      s.dropTarget = 0;
      s.rebuilt = true;
      rerender();
      sch.later(1, () => {
        s.flash[1] = 1;
        say(readouts.rebuilt());
        rerender();
      });
    },
    reset: () => {
      const s = sim.current;
      Object.assign(s, {
        drop: 1,
        dropTarget: 1,
        js: false,
        native: false,
        rebuilt: false,
      });
      rerender();
      say(readouts.reset());
      sch.later(0.4, () => undefined);
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    s.pulses = s.pulses.map((t, i) => {
      if (t < 0) {
        hideRun(runRefs.current[i], headRefs.current[i]);
        return t;
      }
      const next = calm ? 1 : t + dt / SEND;
      if (runRefs.current[i])
        runAlong(
          runRefs.current[i]!,
          headRefs.current[i],
          Math.min(1, next),
          1,
        );
      moving = true;
      return next >= 1 ? -1 : next;
    });
    s.drop = follow(s.drop, s.dropTarget, dt, 0.1, calm);
    moving ||= s.drop !== s.dropTarget;
    chipRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, 20 * s.drop]),
    );
    chipRef.current?.setAttribute(
      'opacity',
      s.rebuilt ? (1 - s.drop * 0.6).toFixed(3) : '0',
    );
    s.flash = s.flash.map((v) => follow(v, 0, dt, 0.35, calm));
    flashRefs.current.forEach((node, i) =>
      node?.setAttribute('opacity', (0.45 * s.flash[i]).toFixed(3)),
    );
    moving ||= s.flash.some((v) => v > 0.01);
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

  const onKey = (event: React.KeyboardEvent) => {
    const map: Record<string, Action> = {
      ' ': 'js',
      b: 'rebuild',
      Enter: 'js',
      j: 'js',
      n: 'native',
      r: 'reset',
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
  const lastX = DEV_CHIP_XS[DEV_CHIPS.length];

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Add a JavaScript-only package. Press N to add a native module, B to rebuild the development build, R to reset."
        onClick={() =>
          act(
            !s.js
              ? 'js'
              : !s.native
                ? 'native'
                : !s.rebuilt
                  ? 'rebuild'
                  : 'reset',
          )
        }
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
          <HousingArt art={METRO_ART}>
            <Line d={METRO_ART.vents} tone="lo" />
            {METRO_ART.sockets.map((paths, i) => (
              <Solid key={i} paths={paths} tone="mid" crease="none" />
            ))}
          </HousingArt>
          <FaceText transform={METRO_ART.label} size={3.2} tone="mid">
            Metro
          </FaceText>
          {CABLE_D.map((d, i) => (
            <g key={i}>
              <Cable d={d} />
              <Runner
                d={d}
                runRef={(node) => void (runRefs.current[i] = node)}
                headRef={(node) => void (headRefs.current[i] = node)}
              />
            </g>
          ))}
          {PHONES.map((phone, p) => {
            const broken = s.native && (p === 0 || !s.rebuilt);
            return (
              <g key={p}>
                <PhoneBack phone={phone} />
                <PhoneScreen phone={phone} id={`db-screen-${p}`}>
                  <AppScreen
                    js={s.js}
                    native={s.native && !broken}
                    broken={broken}
                  />
                  <rect
                    ref={(node) => void (flashRefs.current[p] = node)}
                    className="af-flash"
                    width={SW}
                    height={SH}
                    opacity={0}
                  />
                </PhoneScreen>
                <PhoneFront phone={phone} />
                <Socket socket={SOCKETS[p]} />
                <FaceText transform={DOCK_LABELS[p]} size={2.8} tone="mid">
                  {p ? 'development build' : 'Expo Go'}
                </FaceText>
                <FaceText transform={CHIP_LABELS[p]} size={2.2} tone="lo">
                  {p ? 'your native modules' : 'Expo SDK, sealed'}
                </FaceText>
              </g>
            );
          })}
          <Solid paths={SEAL} tone="lo" crease="none" />
          {EXPO_GO_CHIPS.map((_, i) => (
            <g key={`go${i}`}>
              <Solid paths={chipOf(GO_CHIP_XS[i])} tone="mid" crease="faint" />
              <Dots points={[chipTop(GO_CHIP_XS[i])]} size={0.45} tone="mid" />
            </g>
          ))}
          {DEV_CHIPS.map((_, i) => (
            <g key={`dev${i}`}>
              <Solid paths={chipOf(DEV_CHIP_XS[i])} tone="mid" crease="faint" />
              <Dots points={[chipTop(DEV_CHIP_XS[i])]} size={0.45} tone="mid" />
            </g>
          ))}
          <g ref={chipRef} opacity={0}>
            <Solid paths={chipOf(lastX)} tone="hi" crease="lo" lit />
          </g>
          <Solid paths={PRESS_ART.post} tone="mid" crease="faint" />
          <Solid paths={PRESS_ART.arm} tone="mid" crease="faint" />
        </svg>
      </div>
      <Controls>
        <button
          type="button"
          onClick={() => act('js')}
          disabled={locked || s.js}
        >
          Add date-fns (JS)
        </button>
        <button
          type="button"
          onClick={() => act('native')}
          disabled={locked || s.native}
        >
          Add react-native-mmkv
        </button>
        <button
          type="button"
          onClick={() => act('rebuild')}
          disabled={locked || !s.native || s.rebuilt}
        >
          Rebuild dev build
        </button>
        <button type="button" onClick={() => act('reset')} disabled={locked}>
          Reset
        </button>
      </Controls>
    </div>
  );
}

export function DevBuildAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="When to rebuild"
        hint="Tap to add packages · B rebuild"
        readout={readouts.rest()}
        keys={[
          { label: 'Native module just compiled in', mark: 'lit' },
          { label: 'Native module in the app', mark: 'raised' },
          { label: 'Native module missing', mark: 'red' },
        ]}
        caption="Expo Go is a prebuilt app with a fixed set of native modules, the Expo SDK. A development build is a debug build of your own app with your native dependencies and the dev client, loading JavaScript from Metro like Expo Go does. JavaScript-only packages reload into either with no rebuild. A native module that is not compiled in fails until you rebuild the development build once (eas build --profile development or npx expo run:ios); Expo Go cannot add it at all. Rebuild only when native code changes."
      >
        <DevBuildBench />
      </Plate>
    </div>
  );
}

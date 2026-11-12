import * as React from 'react';
import {
  pathOf,
  slabOf,
  solidSvg,
  translateAlong,
} from '../anatomy/kit/iso-kit';
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
  Cable,
  Controls,
  FaceDial,
  HousingArt,
  PhoneBack,
  PhoneFront,
  PhoneScreen,
  Runner,
  Socket,
  dialRotate,
} from '../anatomy/bench';
import { hideRun, runAlong } from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';
import {
  BENCH,
  BLOCK_CENTER,
  CABLE,
  DOCK_SOCKET,
  GAUGE_ART,
  HEIGHT,
  P,
  PAD_ART,
  PHONE_ART,
  PRESS_ART,
  RAM_ART,
  RAM_UP,
  SHEET,
  SHEET_H,
  SLOT_AT,
  STACK_Z,
  WIDTH,
  blockFace,
  blockOf,
  blockTop,
} from './geometry';
import { readouts, sizeOf, startupOf, type Mode } from './model';

const CABLE_D = pathOf(CABLE);
const APP_SHEETS = 3;
const MODULE_SHEETS = 8;
const HEAVY_H = 5;
const MM_PER_MB = 3;

const sheetAt = (z: number, h = SHEET_H) => slabOf(SHEET, z, h, P, 3, 0.2);

interface Sim {
  mode: Mode;
  ram: number;
  slot: number;
  boot: number;
  block: number;
  stack: number;
  pulse: number;
  gauge: number;
  heavy: boolean;
  ramTarget: number;
  slotTarget: number;
  blockTarget: number;
  stackTarget: number;
  gaugeTarget: number;
  built: number | null;
  built_mode: Mode | null;
}

type Action = 'build' | 'launch' | 'dep' | 'dev' | 'release';
const TOUR: Action[] = [
  'build',
  'launch',
  'dep',
  'build',
  'launch',
  'release',
  'build',
  'launch',
  'dep',
  'dev',
];

const LABEL =
  'The JavaScript bundle drawn as a binding press. A pad holds a stack of source sheets: your code on top, the node_modules sheets under it, and optionally a thick 2 MB dependency. Metro, the press, binds them into one bundle block on its bed, as thick as the bundle is large. In development the bundle stays with Metro and is fetched down a cable when the app launches. In a release build it moves into the phone as main.jsbundle, precompiled to Hermes bytecode. A startup gauge beside the phone climbs with the bundle’s size, less steeply for bytecode.';

export function BundleBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      block: 0,
      blockTarget: 0,
      boot: 0,
      built: null,
      built_mode: null,
      gauge: 0,
      gaugeTarget: 0,
      heavy: false,
      mode: 'dev',
      pulse: -1,
      ram: 0,
      ramTarget: 0,
      slot: 0,
      slotTarget: 0,
      stack: 1,
      stackTarget: 1,
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const [mode, setMode] = React.useState<Mode>('dev');
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const blockRef = React.useRef<SVGGElement>(null);
  const ramRef = React.useRef<SVGGElement>(null);
  const stackRef = React.useRef<SVGGElement>(null);
  const runRef = React.useRef<SVGPathElement | null>(null);
  const headRef = React.useRef<SVGGElement | null>(null);
  const needleRef = React.useRef<SVGPathElement>(null);
  const bootRef = React.useRef<SVGRectElement>(null);

  const actions: Record<Action, () => void> = {
    build: () => {
      const s = sim.current;
      const size = sizeOf(s.heavy);
      s.slotTarget = 0;
      s.blockTarget = 0;
      s.stackTarget = 0;
      sch.later(0.5, () => {
        s.ramTarget = 1;
        sch.later(0.45, () => {
          s.ramTarget = 0;
          s.blockTarget = size * MM_PER_MB;
          s.built = size;
          s.built_mode = s.mode;
          s.stackTarget = 1;
          rerender();
          say(readouts.built(size, s.mode));
          if (s.mode === 'release') sch.later(0.6, () => (s.slotTarget = 1));
        });
      });
    },
    dep: () => {
      const s = sim.current;
      s.heavy = !s.heavy;
      rerender();
      say(s.heavy ? readouts.added() : readouts.removed());
      sch.later(0.4, () => undefined);
    },
    dev: () => switchMode('dev'),
    launch: () => {
      const s = sim.current;
      if (
        s.built === null ||
        s.built !== sizeOf(s.heavy) ||
        s.built_mode !== s.mode
      ) {
        say(readouts.stale());
        return;
      }
      const size = s.built;
      s.gaugeTarget = 0;
      s.boot = 1;
      const finish = () => {
        s.gaugeTarget = startupOf(size, s.mode);
        sch.later(0.6 + s.gaugeTarget * 1.4, () => {
          s.boot = 0;
          say(readouts.launch(size, s.mode));
        });
      };
      if (s.mode === 'dev') {
        s.pulse = 0;
        sch.later(0.8, finish);
      } else sch.later(0.2, finish);
    },
    release: () => switchMode('release'),
  };

  function switchMode(next: Mode) {
    const s = sim.current;
    s.mode = next;
    setMode(next);
    s.slotTarget = 0;
    say(readouts.stale());
    sch.later(0.3, () => undefined);
  }

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    s.block = follow(s.block, s.blockTarget, dt, 0.12, calm);
    s.ram = follow(s.ram, s.ramTarget, dt, 0.08, calm);
    s.stack = follow(s.stack, s.stackTarget, dt, 0.12, calm);
    s.slot = follow(s.slot, s.slotTarget, dt, 0.2, calm);
    s.gauge = follow(s.gauge, s.gaugeTarget, dt, 0.35, calm);
    moving ||=
      s.block !== s.blockTarget ||
      s.ram !== s.ramTarget ||
      s.stack !== s.stackTarget ||
      s.slot !== s.slotTarget ||
      s.gauge !== s.gaugeTarget;
    if (blockRef.current) {
      const h = s.block;
      const lift = Math.sin(Math.PI * s.slot) * 10;
      blockRef.current.setAttribute(
        'transform',
        translateAlong(P, [
          (SLOT_AT[0] - BLOCK_CENTER[0]) * s.slot,
          (SLOT_AT[1] - BLOCK_CENTER[1]) * s.slot,
          (SLOT_AT[2] - BLOCK_CENTER[2]) * s.slot + lift,
        ]),
      );
      blockRef.current.setAttribute('opacity', h > 0.3 ? '1' : '0');
      const [body, top] = Array.from(
        blockRef.current.children,
      ) as SVGGElement[];
      if (body)
        body.innerHTML = solidSvg(blockOf(h), {
          crease: 'lo',
          lit: true,
          tone: 'hi',
        });
      if (top) top.setAttribute('d', blockTop(h));
      const face = blockRef.current.querySelector('g[data-face]');
      face?.setAttribute('transform', blockFace(h));
    }
    ramRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, -(RAM_UP - 3 - Math.max(s.block, 0.6)) * s.ram]),
    );
    stackRef.current?.setAttribute('opacity', s.stack.toFixed(3));
    stackRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, -4 * (1 - s.stack)]),
    );
    if (s.pulse >= 0) {
      s.pulse = calm ? -1 : s.pulse + dt / 0.8;
      if (s.pulse >= 1) s.pulse = -1;
    }
    if (s.pulse >= 0 && runRef.current) {
      runAlong(runRef.current, headRef.current, s.pulse, 1, 0.35);
      moving = true;
    } else hideRun(runRef.current, headRef.current);
    needleRef.current?.setAttribute('transform', dialRotate(s.gauge));
    bootRef.current?.setAttribute('opacity', s.boot ? '1' : '0');
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

  const onKey = (event: React.KeyboardEvent) => {
    const map: Record<string, Action> = {
      ' ': 'build',
      b: 'build',
      d: 'dep',
      Enter: 'build',
      l: 'launch',
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
  const sheets: React.ReactNode[] = [];
  let z = STACK_Z;
  for (let i = 0; i < MODULE_SHEETS; i++, z += SHEET_H + 0.2)
    sheets.push(
      <Solid key={`m${i}`} paths={sheetAt(z)} tone="mid" crease="none" />,
    );
  if (s.heavy) {
    sheets.push(
      <Solid
        key="heavy"
        paths={sheetAt(z, HEAVY_H)}
        tone="mid"
        crease="faint"
      />,
    );
    z += HEAVY_H + 0.2;
  }
  for (let i = 0; i < APP_SHEETS; i++, z += SHEET_H + 0.2)
    sheets.push(
      <Solid key={`a${i}`} paths={sheetAt(z)} tone="hi" crease="lo" lit />,
    );

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Build the bundle. Press L to launch, D to add or remove a 2 MB dependency."
        onClick={() =>
          act(
            s.built !== null &&
              s.built === sizeOf(s.heavy) &&
              s.built_mode === s.mode
              ? 'launch'
              : 'build',
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
          <Solid paths={PAD_ART.body} tone="lo" crease="faint" />
          <Line d={PAD_ART.inner} tone="faint" />
          <g ref={stackRef}>{sheets}</g>
          <HousingArt art={PRESS_ART}>
            <Line d={PRESS_ART.vents} tone="lo" />
            <Line d={PRESS_ART.lampRing} tone="lo" />
            <Solid paths={PRESS_ART.socket} tone="mid" crease="none" />
          </HousingArt>
          <FaceText transform={PRESS_ART.label} size={3.2} tone="mid">
            Metro
          </FaceText>
          <Solid paths={PRESS_ART.bed} tone="mid" crease="faint" />
          <Line d={PRESS_ART.bedInner} tone="lo" />
          <Solid paths={PRESS_ART.arm} tone="mid" crease="faint" />
          <Line d={RAM_ART.rod} tone="mid" />
          <g ref={ramRef}>
            <Solid paths={RAM_ART.body} tone="mid" crease="faint" />
          </g>
          <Cable d={CABLE_D} />
          <Runner
            d={CABLE_D}
            runRef={(node) => void (runRef.current = node)}
            headRef={(node) => void (headRef.current = node)}
          />
          <PhoneBack phone={PHONE_ART} />
          <PhoneScreen phone={PHONE_ART} id="jb-screen">
            <rect className="rn-header" width={PHONE_ART.sw} height={8} />
            {[0, 1, 2, 3].map((row) => (
              <rect
                key={row}
                className="af-ui-line"
                x={2.4}
                y={11 + row * 9}
                width={PHONE_ART.sw - 4.8}
                height={7}
                rx={1}
              />
            ))}
            <rect
              ref={bootRef}
              className="jb-boot"
              width={PHONE_ART.sw}
              height={PHONE_ART.sh}
              opacity={0}
            />
          </PhoneScreen>
          <PhoneFront phone={PHONE_ART} />
          <Socket socket={DOCK_SOCKET} />
          <g ref={blockRef} opacity={0}>
            <g />
            <path className="iso-line" data-tone="faint" />
            <g data-face="">
              <text className="af-mono" fontSize={2.4} y={0}>
                {s.built_mode === 'release'
                  ? 'main.jsbundle · HBC'
                  : 'bundle.js'}
              </text>
            </g>
          </g>
          <HousingArt art={GAUGE_ART} />
          <FaceDial
            transform={GAUGE_ART.dial}
            needleRef={needleRef}
            r={7}
            ticks={10}
          />
          <FaceText transform={GAUGE_ART.label} size={2.4} tone="lo">
            startup
          </FaceText>
          <Dots points={[PRESS_ART.lamp]} size={0.8} tone="hi" />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('build')} disabled={locked}>
          Build bundle
        </button>
        <button type="button" onClick={() => act('launch')} disabled={locked}>
          Launch app
        </button>
        <button
          type="button"
          onClick={() => act('dep')}
          disabled={locked}
          aria-pressed={s.heavy}
        >
          {s.heavy ? 'Remove' : 'Add'} 2 MB dependency
        </button>
        <div className="af-segmented" role="radiogroup" aria-label="Build type">
          {(['dev', 'release'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={mode === value}
              onClick={() => act(value)}
              disabled={locked}
            >
              {value === 'dev' ? 'Development' : 'Release'}
            </button>
          ))}
        </div>
      </Controls>
    </div>
  );
}

export function BundleAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="What the bundle carries"
        hint="Tap to build or launch · D dependency"
        readout={readouts.rest()}
        keys={[
          { label: 'Your code, and the bundle', mark: 'lit' },
          { label: 'node_modules', mark: 'raised' },
          { label: 'Bundle on its way', mark: 'edge' },
        ]}
        caption="Metro collapses your code and every npm dependency into one file. In development Metro serves it over HTTP and the app fetches it at launch, which is why Metro must be running. In a release build it is written into the binary, as main.jsbundle on iOS or index.android.bundle on Android, precompiled to Hermes bytecode. Everything in it is loaded at launch, so an unused 2 MB dependency still costs startup. Sizes here are illustrative. The bundle is also the line over-the-air updates can cross; anything outside it needs a store build."
      >
        <BundleBench />
      </Plate>
    </div>
  );
}

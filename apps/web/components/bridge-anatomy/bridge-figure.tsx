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
import { BenchArt, Controls } from '../anatomy/bench';
import {
  BACK_Y,
  BELTS,
  BELT_X0,
  BELT_X1,
  BENCH,
  HEIGHT,
  JS_ART,
  JS_WINDOW,
  NAT_ART,
  OUT_Y,
  P,
  PACKET,
  PRESS_ART,
  PRESS_X,
  RAM_ART,
  RAM_DOWN,
  RAM_UP,
  WIDTH,
  cleatsOf,
  packetOf,
  rodOf,
} from './geometry';
import { SCROLL_EVENTS, TIMING, readouts } from './model';

/* ---------- Static art ---------- */

function Station({ art }: { art: typeof JS_ART | typeof NAT_ART }) {
  return (
    <>
      <Solid paths={art.plinth} tone="lo" crease="faint" />
      <Solid
        paths={art.body}
        tone="mid"
        crease="faint"
        inner={<Line d={art.seam} tone="faint" />}
      />
      <Line d={art.groove} tone="faint" />
      <Dots points={art.screws} size={0.5} tone="mid" />
      <Line d={art.vents} tone="lo" />
      <Line d={art.lampRing} tone="lo" />
    </>
  );
}

const JS_STATION = (
  <g>
    <Station art={JS_ART} />
    <path className="af-glass" d={JS_ART.window} />
    <g transform={JS_ART.windowFace}>
      <FaceText transform="translate(2 4)" size={3} tone="mid">
        JS
      </FaceText>
      <path
        className="af-ui-line"
        d={`M9 2.6H${JS_WINDOW.w - 3}M2 6.4H${JS_WINDOW.w - 8}M4 9.2H${JS_WINDOW.w - 5}`}
      />
    </g>
    <Line d={JS_ART.intake} tone="lo" />
  </g>
);

const NAT_STATION = (
  <g>
    <Station art={NAT_ART} />
    <Line d={NAT_ART.frameStrip} tone="lo" />
    <Line d={NAT_ART.frameRings} tone="lo" />
    <Line d={NAT_ART.bay} tone="lo" />
    <Line d={NAT_ART.bayRules} tone="faint" free />
  </g>
);

const PRESS_BACK = (
  <g>
    <Solid
      paths={PRESS_ART.column}
      tone="mid"
      crease="faint"
      inner={<Line d={PRESS_ART.columnSeam} tone="faint" />}
    />
    <Solid paths={PRESS_ART.cap} tone="mid" crease="faint" />
    <Dots points={PRESS_ART.capScrews} size={0.45} tone="mid" />
    <Solid paths={PRESS_ART.arm} tone="mid" crease="faint" />
  </g>
);

type BeltName = 'out' | 'back';

function BeltBack({ name }: { name: BeltName }) {
  const belt = BELTS[name];
  return (
    <>
      <Solid
        paths={belt.bed}
        tone="mid"
        crease="faint"
        inner={<Line d={belt.bedSeam} tone="faint" />}
      />
      <Line d={belt.drum} tone="lo" />
      <Dots points={[belt.drumHub]} size={0.5} tone="mid" />
      <Solid paths={belt.railBack} tone="mid" crease="none" />
      <Line d={belt.band} tone="lo" />
    </>
  );
}

function BeltFront({ name }: { name: BeltName }) {
  const belt = BELTS[name];
  return (
    <>
      <Solid paths={belt.railFront} tone="mid" crease="none" />
      <Dots points={belt.railScrews} size={0.4} tone="mid" />
    </>
  );
}

const PACKETS = {
  back: { narrow: packetOf(BACK_Y, false), wide: packetOf(BACK_Y, true) },
  out: { narrow: packetOf(OUT_Y, false), wide: packetOf(OUT_Y, true) },
};

const Packet = React.memo(function Packet({
  belt,
  lit,
  wide,
}: {
  belt: BeltName;
  wide: boolean;
  lit: boolean;
}) {
  const art = PACKETS[belt][wide ? 'wide' : 'narrow'];
  return (
    <>
      <Solid paths={art.body} tone="hi" crease="lo" lit={lit} />
      <Line d={art.braces} tone="mid" />
      <Line d={art.rules} tone="lo" free />
    </>
  );
});

/* ---------- Simulation ---------- */

type Kind = 'call' | 'measure' | 'reply' | 'event';

interface Pack {
  x: number;
  a: number;
  id: number;
  kind: Kind;
  wide: boolean;
  /** Seconds spent waiting at the head of the queue. */
  wait: number;
  leaving: boolean;
}

interface Sim {
  idle: number;
  tour: number;
  clock: number;
  nextId: number;
  touched: boolean;
  belts: Record<BeltName, Pack[]>;
  phase: Record<BeltName, number>;
  parse: Record<BeltName, number>;
  /** Packets the native side is waiting to put on the back belt. */
  ram: number;
  late: number;
  frame: number;
  jsLamp: number;
  events: number;
  natLamp: number;
  lateLamp: number;
  ramTarget: number;
  spawn: Array<{ kind: Kind }>;
  plan: Array<{ at: number; run: () => void }>;
}

const initial = (): Sim => ({
  belts: { back: [], out: [] },
  clock: 0,
  events: 0,
  frame: 0,
  idle: 0,
  jsLamp: 0,
  late: 0,
  lateLamp: 0,
  natLamp: 0,
  nextId: 1,
  parse: { back: 0, out: 0 },
  phase: { back: 0, out: 0 },
  plan: [],
  ram: 0,
  ramTarget: 0,
  spawn: [],
  touched: false,
  tour: 0,
});

const TOUR = ['call', 'measure', 'scroll', 'big', 'measure'] as const;
type Action = (typeof TOUR)[number];

const widthOf = (pack: Pack) => (pack.wide ? PACKET.wide : PACKET.w);
const GAP = 1.6;
/** Head positions: where a packet waits to be parsed at the end of its belt. */
const HEAD = { back: BELT_X0 + 2, out: BELT_X1 - 2 };
const DIR = { back: -1, out: 1 } as const;
const SETTLED = 0.01;

const LABEL =
  'The legacy React Native bridge as two conveyor belts between a JavaScript station on the left and a native station on the right. Every call is stamped by a press into a JSON packet and rides the back belt to native, where packets are parsed one at a time. Answers and events ride the front belt back to JavaScript the same way. Measuring a view means sending a packet and waiting for a reply packet: there is no synchronous answer. A fast scroll sends a burst of event packets that queue up at the JavaScript end, and the frame lamps on the native station turn red for the frames they arrive late.';

export function BridgeBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  const packRefs = React.useRef(new Map<number, SVGGElement>());
  const cleatRefs = React.useRef<Record<BeltName, SVGPathElement | null>>({
    back: null,
    out: null,
  });
  const ramRef = React.useRef<SVGGElement>(null);
  const rodRef = React.useRef<SVGPathElement>(null);
  const jsLampRef = React.useRef<SVGGElement>(null);
  const natLampRef = React.useRef<SVGGElement>(null);
  const frameRefs = React.useRef<Array<SVGCircleElement | null>>([]);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  const put = (belt: BeltName, kind: Kind, wide = false) => {
    const s = sim.current;
    const x = belt === 'out' ? PRESS_X : BELT_X1 - 6 - (wide ? 4 : 0);
    s.belts[belt].push({
      a: belt === 'out' ? 1 : 0,
      id: s.nextId++,
      kind,
      leaving: false,
      wait: 0,
      wide,
      x,
    });
    rerender();
  };

  /** Stamp a call into a packet at the press and set it on the out belt. */
  const stamp = (kind: Kind, wide: boolean) => {
    const s = sim.current;
    s.ramTarget = 1;
    later(wide ? TIMING.stringifyLarge : TIMING.stringify, () => {
      s.ramTarget = 0;
      put('out', kind, wide);
    });
  };

  /** A packet reached the far end and was parsed. */
  const arrive = (belt: BeltName, pack: Pack) => {
    const s = sim.current;
    if (belt === 'out') {
      s.natLamp = 1;
      if (pack.kind === 'measure') {
        say(readouts.measure());
        s.spawn.push({ kind: 'reply' });
      } else say(readouts.parsed());
      return;
    }
    s.jsLamp = 1;
    if (pack.kind === 'reply') say(readouts.answered());
    if (pack.kind === 'event') {
      s.events += 1;
      if (pack.wait > TIMING.parse * 0.6) {
        s.late += 1;
        s.lateLamp = 1;
      }
      if (s.events === SCROLL_EVENTS) say(readouts.late(s.late, SCROLL_EVENTS));
    }
  };

  const actions: Record<Action, () => void> = {
    big: () => {
      say(readouts.big());
      stamp('call', true);
    },
    call: () => {
      say(readouts.call());
      stamp('call', false);
    },
    measure: () => {
      say(readouts.call());
      stamp('measure', false);
    },
    scroll: () => {
      const s = sim.current;
      s.late = 0;
      s.events = 0;
      for (let n = 0; n < SCROLL_EVENTS; n++) s.spawn.push({ kind: 'event' });
      say(readouts.scroll(SCROLL_EVENTS));
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    s.clock += dt;
    const due = s.plan.filter((step) => step.at <= s.clock);
    if (due.length) {
      s.plan = s.plan.filter((step) => step.at > s.clock);
      due.forEach((step) => step.run());
    }
    let moving = false;
    let changed = false;

    // Native puts waiting packets on the back belt when there is room.
    if (s.spawn.length) {
      const last = s.belts.back[s.belts.back.length - 1];
      const room = !last || last.x < BELT_X1 - 6 - PACKET.w - GAP - 2;
      if (room) {
        put('back', s.spawn.shift()!.kind);
      }
      moving = true;
    }

    for (const belt of ['out', 'back'] as BeltName[]) {
      const list = s.belts[belt];
      const dir = DIR[belt];
      let beltMoving = false;
      s.parse[belt] = Math.max(0, s.parse[belt] - dt);
      list.forEach((pack, index) => {
        if (pack.leaving) {
          pack.a = follow(pack.a, 0, dt, 0.08, calm);
          pack.x += dir * dt * TIMING.belt * 0.5;
          return;
        }
        pack.a = follow(pack.a, 1, dt, 0.08, calm);
        const ahead = list
          .slice(0, index)
          .filter((other) => !other.leaving)
          .pop();
        const limit = ahead
          ? ahead.x - dir * ((widthOf(ahead) + widthOf(pack)) / 2 + GAP)
          : HEAD[belt] - (dir * widthOf(pack)) / 2;
        const step = calm ? Infinity : dt * TIMING.belt;
        const gap = (limit - pack.x) * dir;
        if (gap > 0.01) {
          pack.x += dir * Math.min(step, gap);
          beltMoving = true;
        } else if (!ahead) {
          pack.wait += dt;
          if (s.parse[belt] <= 0) {
            pack.leaving = true;
            s.parse[belt] = TIMING.parse;
            arrive(belt, pack);
          }
        }
      });
      const before = list.length;
      s.belts[belt] = list.filter((pack) => !(pack.leaving && pack.a < 0.02));
      if (s.belts[belt].length !== before) changed = true;
      if (s.belts[belt].length) moving = true;
      if (beltMoving) s.phase[belt] += dir * dt * TIMING.belt;
      cleatRefs.current[belt]?.setAttribute(
        'd',
        cleatsOf(belt === 'out' ? OUT_Y : BACK_Y, s.phase[belt]),
      );
      for (const pack of s.belts[belt]) {
        const node = packRefs.current.get(pack.id);
        if (!node) continue;
        node.setAttribute('transform', translateAlong(P, [pack.x, 0, 0]));
        node.setAttribute('opacity', pack.a.toFixed(3));
      }
    }
    if (changed) rerender();

    s.ram = follow(s.ram, s.ramTarget, dt, 0.08, calm);
    const drop = (RAM_UP - RAM_DOWN) * s.ram;
    ramRef.current?.setAttribute('transform', translateAlong(P, [0, 0, -drop]));
    rodRef.current?.setAttribute('d', rodOf(RAM_UP - drop));
    moving ||= s.ram !== s.ramTarget;

    s.jsLamp = follow(s.jsLamp, 0, dt, 0.45, calm);
    s.natLamp = follow(s.natLamp, 0, dt, 0.45, calm);
    s.lateLamp = follow(s.lateLamp, 0, dt, 0.9, calm);
    jsLampRef.current?.setAttribute(
      'opacity',
      (0.12 + 0.88 * s.jsLamp).toFixed(3),
    );
    natLampRef.current?.setAttribute(
      'opacity',
      (0.12 + 0.88 * s.natLamp).toFixed(3),
    );
    moving ||=
      s.jsLamp > SETTLED || s.natLamp > SETTLED || s.lateLamp > SETTLED;

    // Frame lamps step at a steady rate; red while events wait in the queue.
    const backed = s.belts.back.filter((pack) => pack.kind === 'event').length;
    if (moving) s.frame += dt * 8;
    const lit = Math.floor(s.frame) % 6;
    frameRefs.current.forEach((node, index) => {
      if (!node) return;
      node.setAttribute('opacity', index === lit && moving ? '1' : '0.12');
      node.setAttribute(
        'class',
        backed > 1 || s.lateLamp > 0.3 ? 'af-red' : 'af-head',
      );
    });

    const pending = s.plan.length > 0 || s.spawn.length > 0;
    if (pending !== busyRef.current) {
      busyRef.current = pending;
      setBusy(pending);
    }

    const touring = !s.touched && !calm;
    if (touring && !moving && !pending) {
      s.idle += dt;
      if (s.idle > 1.4) {
        s.idle = 0;
        actions[TOUR[s.tour % TOUR.length]]();
        s.tour += 1;
      }
    }
    return moving || pending || touring;
  };

  const kick = useLoop(tick, inView);

  const act = (action: Action) => {
    const s = sim.current;
    s.touched = true;
    if (s.plan.length) return;
    actions[action]();
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    const map: Record<string, Action> = {
      ' ': 'call',
      c: 'call',
      Enter: 'call',
      l: 'big',
      m: 'measure',
      s: 'scroll',
    };
    const action = map[event.key];
    if (!action) return;
    event.preventDefault();
    act(action);
  };

  React.useEffect(() => {
    if (asksForStillness()) sim.current.touched = true;
  }, []);

  const s = sim.current;
  const locked = busy && s.touched;
  const packet = (belt: BeltName) => (pack: Pack) => (
    <g
      key={pack.id}
      ref={(node) => {
        if (node) packRefs.current.set(pack.id, node);
        else packRefs.current.delete(pack.id);
      }}
      transform={translateAlong(P, [pack.x, 0, 0])}
      opacity={pack.a}
    >
      <Packet belt={belt} wide={pack.wide} lit={pack.kind !== 'event'} />
    </g>
  );

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Call a native method. Press M to measure a view, S to scroll, L to send a large payload."
        onClick={() => act('call')}
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
          {JS_STATION}
          <g ref={jsLampRef} opacity={0.12}>
            <Dots points={[JS_ART.lamp]} size={0.9} tone="hi" />
          </g>
          {PRESS_BACK}

          <BeltBack name="out" />
          <path
            ref={(node) => {
              cleatRefs.current.out = node;
            }}
            className="iso-line"
            data-tone="faint"
            d={cleatsOf(OUT_Y, 0)}
          />
          {s.belts.out.map(packet('out'))}
          <path
            ref={rodRef}
            className="iso-line"
            data-tone="mid"
            d={rodOf(RAM_UP)}
          />
          <g ref={ramRef}>
            <Solid
              paths={RAM_ART.body}
              tone="mid"
              crease="faint"
              inner={<Line d={RAM_ART.seam} tone="faint" />}
            />
          </g>
          <BeltFront name="out" />

          <BeltBack name="back" />
          <path
            ref={(node) => {
              cleatRefs.current.back = node;
            }}
            className="iso-line"
            data-tone="faint"
            d={cleatsOf(BACK_Y, 0)}
          />
          {s.belts.back.map(packet('back'))}
          <BeltFront name="back" />

          {NAT_STATION}
          <g ref={natLampRef} opacity={0.12}>
            <Dots points={[NAT_ART.lamp]} size={0.9} tone="hi" />
          </g>
          {NAT_ART.frames.map(([x, y], index) => (
            <circle
              key={index}
              ref={(node) => {
                frameRefs.current[index] = node;
              }}
              className="af-head"
              cx={x}
              cy={y}
              r={0.9}
              opacity={0.12}
            />
          ))}
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('call')} disabled={locked}>
          Call native
        </button>
        <button type="button" onClick={() => act('measure')} disabled={locked}>
          Measure a view
        </button>
        <button type="button" onClick={() => act('scroll')} disabled={locked}>
          Fast scroll
        </button>
        <button type="button" onClick={() => act('big')} disabled={locked}>
          Large payload
        </button>
      </Controls>
    </div>
  );
}

export function BridgeAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How the bridge carried messages"
        hint="Tap to call · M measure · S scroll"
        readout={readouts.rest()}
        keys={[
          { label: 'A call or its reply, as JSON', mark: 'lit' },
          { label: 'Event from native', mark: 'raised' },
          { label: 'A frame delivered late', mark: 'red' },
        ]}
        caption="On the legacy bridge every interaction was serialised to JSON, queued, and handled asynchronously on the other side, one message at a time. Serialising cost more as payloads grew, JavaScript could never get a synchronous answer (even measuring a view was a message out and a message back), and a burst of events from a fast scroll queued up so later frames arrived late. Bridgeless mode, the default since React Native 0.76, replaces all of this with JSI."
      >
        <BridgeBench />
      </Plate>
    </div>
  );
}

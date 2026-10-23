import * as React from 'react';
import { translateAlong } from '../anatomy/kit/iso-kit';
import { Dots, FaceText, Line, Plate, Solid, Wire } from '../anatomy/kit/draw';
import { follow, useInView, useLoop, useReadout } from '../anatomy/kit/live';
import {
  BENCH,
  CABINET_ART,
  CABLE,
  CARD_ART,
  DECK_ART,
  PHONE_ART,
  SCREEN_H,
  SCREEN_W,
  SERVER_ART,
  STACK_ART,
  TRANSFORMER,
  cableAt,
  switchOf,
} from './geometry';
import {
  BUTTON_FILE,
  FILES,
  MODULES,
  STEP,
  edgeInto,
  readouts,
  resolveOrder,
  type Platform,
} from './model';
import {
  AT,
  FLOOR_Z,
  HEIGHT,
  LANE_Y,
  P,
  STACK,
  TRAY_XS,
  TRAY_Y,
  WIDTH,
  at,
  depth,
} from './view';

const ASSET = 5;
const isAsset = (file: number) => file === ASSET;

/* ---------- Static art ---------- */

const BENCH_ART = (
  <g>
    <path className="iso-halo" d={BENCH.halo} />
    {BENCH.feet.map((parts, index) => (
      <g key={index}>
        {parts.map((paths, part) => (
          <Solid
            key={part}
            paths={paths}
            tone={part ? 'mid' : 'lo'}
            crease="faint"
          />
        ))}
      </g>
    ))}
    <Solid paths={BENCH.slab} tone="mid" crease="faint" />
    <Line d={BENCH.groove} tone="lo" />
    <Line d={BENCH.screwRings} tone="lo" />
    <Dots points={BENCH.screws} size={0.5} tone="mid" />
    <Solid paths={BENCH.ruler} tone="lo" crease="none" />
    <Line d={BENCH.ticksMinor} tone="lo" />
    <Line d={BENCH.ticksMajor} tone="mid" />
    <Solid paths={BENCH.label} tone="lo" crease="none" />
    <Line d={BENCH.labelLine} tone="faint" />
    {BENCH.labelRules.map((d, index) => (
      <Line key={index} d={d} tone="lo" free />
    ))}
    <Dots points={BENCH.labelScrews} size={0.45} tone="mid" />
  </g>
);

const CABINET_BODY = (
  <g>
    <Solid paths={CABINET_ART.plinth} tone="lo" crease="faint" />
    <Solid
      paths={CABINET_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={CABINET_ART.seam} tone="faint" />}
    />
    <Line d={CABINET_ART.topGroove} tone="faint" />
    <Dots points={CABINET_ART.topScrews} size={0.45} tone="mid" />
    {CABINET_ART.drawers.map((drawer, index) => (
      <g key={index}>
        <Solid paths={drawer.front} tone="mid" crease="faint" />
        <Line d={drawer.window} tone="lo" />
        {drawer.rules.map((d, row) => (
          <Line key={row} d={d} tone="lo" free />
        ))}
        <Solid paths={drawer.handle} tone="mid" crease="none" />
        <Line d={drawer.lampRing} tone="lo" />
      </g>
    ))}
  </g>
);

const SERVER_BODY = (
  <g>
    <Solid
      paths={SERVER_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={SERVER_ART.seam} tone="faint" />}
    />
    <Line d={SERVER_ART.vents} tone="lo" />
    <Line d={SERVER_ART.topGroove} tone="faint" />
    <Dots points={SERVER_ART.screws} size={0.5} tone="mid" />
    <FaceText transform={SERVER_ART.port} size={4.4} tone="lo" anchor="middle">
      8081
    </FaceText>
    <Line d={SERVER_ART.socketLampRing} tone="lo" />
    <Solid paths={SERVER_ART.switchPlate} tone="lo" crease="none" />
    <Dots points={SERVER_ART.detents} size={0.55} tone="hi" />
    <Solid paths={SERVER_ART.switchKnob} tone="mid" crease="faint" />
    <Line d={SERVER_ART.switchKnurl} tone="faint" />
    <Solid paths={SERVER_ART.socket} tone="mid" crease="none" />
  </g>
);

const PHONE_BODY = (
  <g>
    <Solid
      paths={PHONE_ART.dock}
      tone="mid"
      crease="faint"
      inner={<Line d={PHONE_ART.dockSeam} tone="faint" />}
    />
    <Line d={PHONE_ART.dockGroove} tone="faint" />
    <Dots points={PHONE_ART.dockScrews} size={0.5} tone="mid" />
    <Solid paths={PHONE_ART.rest} tone="mid" crease="faint" />
    <Solid paths={PHONE_ART.body} tone="hi" crease="faint" />
    {PHONE_ART.sideButtons.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    <Line d={PHONE_ART.bezel} tone="lo" />
  </g>
);

const PHONE_FRONT = (
  <g>
    <Solid paths={PHONE_ART.lip} tone="mid" crease="faint" />
    <Dots points={PHONE_ART.lipScrews} size={0.45} tone="mid" />
  </g>
);

/** Everything behind the moving cards. */
const BACK_ART = (
  <g>
    {CABINET_BODY}
    <Solid
      paths={DECK_ART.slab}
      tone="lo"
      crease="faint"
      inner={<Line d={DECK_ART.seam} tone="faint" />}
    />
    <Line d={DECK_ART.trays} tone="faint" />
    {DECK_ART.pegs.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    <Dots points={DECK_ART.pegTops} size={0.4} tone="mid" />
    <Line d={DECK_ART.laneGrooves} tone="faint" />
    <Solid paths={DECK_ART.stopLeft} tone="mid" crease="faint" />
    <Solid paths={TRANSFORMER.foot} tone="lo" crease="faint" />
    <Dots points={TRANSFORMER.footScrews} size={0.45} tone="mid" />
    <Solid
      paths={TRANSFORMER.column}
      tone="mid"
      crease="faint"
      inner={<Line d={TRANSFORMER.columnSeam} tone="faint" />}
    />
    <Line d={TRANSFORMER.vents} tone="lo" />
    <Solid paths={TRANSFORMER.knobHub} tone="mid" crease="none" />
    <Solid paths={TRANSFORMER.knob} tone="mid" crease="faint" />
    <Line d={TRANSFORMER.knobKnurl} tone="faint" />
    <Line d={TRANSFORMER.knobRing} tone="lo" />
    <Line d={TRANSFORMER.knobMark} tone="hi" />
    {SERVER_BODY}
    <Solid
      paths={STACK_ART.back}
      tone="mid"
      crease="faint"
      inner={<Line d={STACK_ART.backSeam} tone="faint" />}
    />
    <Dots points={STACK_ART.backScrews} size={0.45} tone="mid" />
    <Solid paths={DECK_ART.back} tone="mid" crease="faint" />
    {TRANSFORMER.rollers.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    <Wire from={CABLE.from} to={CABLE.to} via={CABLE.via} tone="mid" size={1} />
    {PHONE_BODY}
  </g>
);

/** Everything in front of, or above, the cards. */
const FRONT_ART = (
  <g>
    <Solid
      paths={TRANSFORMER.head}
      tone="mid"
      crease="faint"
      inner={<Line d={TRANSFORMER.headSeam} tone="faint" />}
    />
    <Line d={TRANSFORMER.headLampRing} tone="lo" />
    <Solid
      paths={TRANSFORMER.arm}
      tone="mid"
      crease="faint"
      inner={<Line d={TRANSFORMER.armSeam} tone="faint" />}
    />
    <Dots points={TRANSFORMER.armScrews} size={0.45} tone="mid" />
    <Solid paths={TRANSFORMER.cachePlate} tone="lo" crease="none" />
    <Line d={TRANSFORMER.cacheRings} tone="lo" />
    <Solid paths={DECK_ART.front} tone="mid" crease="faint" />
    <Dots points={DECK_ART.frontScrews} size={0.45} tone="mid" />
    <Solid paths={DECK_ART.stopRight} tone="mid" crease="faint" />
    <Dots points={DECK_ART.stopScrews} size={0.45} tone="mid" />
    {STACK_ART.posts.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Dots points={STACK_ART.postCaps} size={0.45} tone="mid" />
  </g>
);

const Card = React.memo(function Card({
  file,
  built,
  lit,
}: {
  file: number;
  built: boolean;
  lit: boolean;
}) {
  const asset = isAsset(file);
  return (
    <>
      <path className="iso-halo mx-shadow" d={CARD_ART.body.fill} />
      <Solid
        paths={CARD_ART.body}
        tone={built ? 'hi' : 'mid'}
        crease="faint"
        lit={lit}
        inner={<Line d={CARD_ART.seam} tone="faint" />}
      />
      <Line d={CARD_ART.fold} tone="lo" />
      {asset ? (
        <>
          <Line d={CARD_ART.picture} tone={built ? 'mid' : 'lo'} />
          <Dots points={[CARD_ART.sun]} size={0.7} tone="mid" />
          {built ? <Line d={CARD_ART.stamp} tone="hi" /> : null}
        </>
      ) : built ? (
        CARD_ART.built.map((d, row) => (
          <Line key={row} d={d} tone="mid" dotted />
        ))
      ) : (
        CARD_ART.source.map((d, row) => <Line key={row} d={d} tone="lo" free />)
      )}
    </>
  );
});

/* ---------- Simulation ---------- */

interface Copy {
  file: number;
  x: number;
  y: number;
  z: number;
  a: number;
  tx: number;
  ty: number;
  tz: number;
  ta: number;
  built: boolean;
  /** Level in the bundle stack, or -1 while travelling. */
  level: number;
}

interface Sim {
  platform: Platform;
  copies: Array<Copy | null>;
  /** Transform cache, per platform: one entry per file. */
  cache: Record<Platform, boolean[]>;
  resolved: boolean[];
  edges: boolean[];
  version: Record<Platform, number>;
  clock: number;
  plan: Array<{ at: number; run: () => void }>;
  connected: boolean;
  screen: number;
  screenTarget: number;
  buttonFlash: number;
  head: number;
  edited: number[];
  count: number;
  knob: number;
  pulses: number[];
  lit: number;
  idle: number;
  tour: number;
  touched: boolean;
}

const COPIES = FILES.length + 1;

const initial = (): Sim => ({
  platform: 'ios',
  copies: Array.from({ length: COPIES }, () => null),
  cache: {
    ios: FILES.map(() => false),
    android: FILES.map(() => false),
  },
  resolved: FILES.map(() => false),
  edges: FILES.map(() => false),
  version: { ios: 0, android: 0 },
  clock: 0,
  plan: [],
  connected: false,
  screen: 0,
  screenTarget: 0,
  buttonFlash: 0,
  head: 0,
  edited: FILES.map(() => 0),
  count: 0,
  knob: -1,
  pulses: [],
  lit: -1,
  idle: 1.6,
  tour: 0,
  touched: false,
});

const LABEL =
  'Metro drawn as a bench. A file cabinet holds one drawer per source file, with an import panel on top wiring index.js to App, App to Header and logo.png, and Header to Button.ios and Button.android. When the app opens, Metro walks those wires from index.js: each file it reaches slides a sheet onto the lane. The sheet passes under a Babel transformer, whose lamps record a cache entry per file, and lands on the bundle stack in front of the dev server on port 8081. A cable carries the bundle to a phone in a dock. A platform switch on the server picks which Button file is resolved. Saving Button sends only that one sheet back through the transformer and down the cable: Fast Refresh, with the counter on the phone kept.';

const stackZ = (level: number) => FLOOR_Z + level * STACK;
const BUTTON_W = [12, 19];

export function MetroBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const copyRefs = React.useRef<Array<SVGGElement | null>>([]);
  const copyLayer = React.useRef<SVGGElement>(null);
  const order = React.useRef<number[]>([]);
  const knobRef = React.useRef<SVGPathElement>(null);
  const headRef = React.useRef<SVGGElement>(null);
  const screenRef = React.useRef<SVGGElement>(null);
  const buttonRef = React.useRef<SVGRectElement>(null);
  const buttonGlow = React.useRef<SVGRectElement>(null);
  const countRef = React.useRef<SVGTextElement>(null);
  const socketRef = React.useRef<SVGGElement>(null);
  const pulseRefs = React.useRef<Array<SVGCircleElement | null>>([]);
  const editRefs = React.useRef<Array<SVGGElement | null>>([]);
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  /** Send a pulse down the cable; it lands on the phone after STEP.send. */
  const send = (delay: number) =>
    later(delay, () => sim.current.pulses.push(0));

  /** One file: a sheet comes off its tray, through the head, onto the stack. */
  const pass = (
    file: number,
    slot: number,
    start: number,
    level: number,
    onDone: (fresh: boolean) => void,
  ) => {
    const s = sim.current;
    const x = TRAY_XS[file];
    later(start, () => {
      s.copies[slot] = {
        file,
        x,
        y: TRAY_Y,
        z: FLOOR_Z + 1.4,
        a: 1,
        tx: x,
        ty: LANE_Y,
        tz: FLOOR_Z,
        ta: 1,
        built: false,
        level: -1,
      };
      s.lit = slot;
      rerender();
    });
    later(start + STEP.toLane, () => {
      const copy = s.copies[slot];
      if (copy) copy.tx = AT.head;
    });
    const atHead = start + STEP.toLane + STEP.toHead;
    let fresh = false;
    later(atHead, () => {
      fresh = !s.cache[s.platform][file];
      s.head = 1;
      say(readouts.transforming(file, !fresh));
    });
    // The real transform time only applies on a cache miss.
    const work = () =>
      s.cache[s.platform][file] ? STEP.cached : STEP.transform;
    later(atHead + STEP.cached, () => {
      const finish = () => {
        const copy = s.copies[slot];
        if (copy) {
          copy.built = true;
          copy.tx = AT.stack;
          copy.tz = stackZ(level);
          copy.level = level;
        }
        s.cache[s.platform][file] = true;
        rerender();
        onDone(fresh);
      };
      const rest = work() - STEP.cached;
      if (rest > 0) later(rest, finish);
      else finish();
    });
  };

  const clearStack = () => {
    const s = sim.current;
    s.copies.forEach((copy) => {
      if (copy) copy.ta = 0;
    });
    s.resolved = FILES.map(() => false);
    s.edges = FILES.map(() => false);
    later(0.45, () => {
      s.copies = s.copies.map(() => null);
      rerender();
    });
  };

  /** Open (or reload) the app: resolve, transform, serialize, serve. */
  const open = () => {
    const s = sim.current;
    clearStack();
    s.connected = false;
    s.screenTarget = 0;
    s.count = 0;
    rerender();
    const files = resolveOrder(s.platform);
    let fresh = 0;
    let done = 0;
    let start = 0.6;
    files.forEach((file, step) => {
      later(start - 0.05, () => {
        s.resolved[file] = true;
        const edge = edgeInto(file);
        if (edge >= 0) s.edges[edge] = true;
        rerender();
        say(readouts.resolving(file, step + 1));
      });
      pass(file, step, start, step, (wasFresh) => {
        if (wasFresh) fresh += 1;
        done += 1;
        if (done === MODULES) {
          later(STEP.toStack, () => {
            say(readouts.serving(fresh));
            for (let pulse = 0; pulse < MODULES; pulse++) send(pulse * 0.12);
            later(STEP.send + MODULES * 0.12, () => {
              s.connected = true;
              s.screenTarget = 1;
              rerender();
              say(readouts.ready(s.platform, fresh));
            });
          });
        }
      });
      // A cached file clears the head sooner, so the next can follow closely.
      start += s.cache[s.platform][file] ? 0.7 : 1.25;
    });
  };

  /** Save the Button file: only that module goes through again. */
  const save = () => {
    const s = sim.current;
    if (!s.connected) {
      say(readouts.needsBundle());
      return;
    }
    const file = BUTTON_FILE[s.platform];
    s.cache[s.platform][file] = false;
    s.edited[file] = 1;
    s.version[s.platform] = 1 - s.version[s.platform];
    rerender();
    say(readouts.saved(file));
    const old = s.copies.findIndex((copy) => copy?.file === file);
    const top = s.copies.reduce(
      (most, copy) => Math.max(most, copy ? copy.level : -1),
      -1,
    );
    const slot = FILES.length;
    // The new sheet lands on top; the stale one fades and the rest settle.
    pass(file, slot, 0.5, top + 1, () => {
      const stale = s.copies[old];
      if (stale) stale.ta = 0;
      later(0.4, () => {
        const level = stale ? stale.level : top;
        s.copies[old] = null;
        s.copies.forEach((copy) => {
          if (copy && copy.level > level) {
            copy.level -= 1;
            copy.tz = stackZ(copy.level);
          }
        });
        // Keep the fresh copy in the regular slot for the next save.
        s.copies[old] = s.copies[slot];
        s.copies[slot] = null;
        rerender();
      });
      send(0.2);
      later(0.2 + STEP.send, () => {
        s.buttonFlash = 1;
        rerender();
        say(readouts.refreshed(file, s.count));
      });
    });
  };

  const tap = () => {
    const s = sim.current;
    if (!s.connected) {
      say(readouts.needsBundle());
      return;
    }
    s.count += 1;
    s.buttonFlash = 0.7;
    rerender();
    say(readouts.tapped(s.count));
  };

  const clear = () => {
    const s = sim.current;
    s.cache[s.platform] = FILES.map(() => false);
    rerender();
    say(readouts.cleared());
  };

  const setPlatform = (platform: Platform) => {
    const s = sim.current;
    if (s.platform === platform) return;
    s.platform = platform;
    clearStack();
    s.connected = false;
    s.screenTarget = 0;
    rerender();
    say(readouts.platform(platform));
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    s.clock += dt;
    const due = s.plan.filter((step) => step.at <= s.clock);
    if (due.length) {
      s.plan = s.plan.filter((step) => step.at > s.clock);
      due.sort((a, b) => a.at - b.at).forEach((step) => step.run());
    }

    let moving = false;
    s.copies.forEach((copy, slot) => {
      if (!copy) return;
      copy.x = follow(copy.x, copy.tx, dt, 0.16, calm);
      copy.y = follow(copy.y, copy.ty, dt, 0.11, calm);
      copy.z = follow(copy.z, copy.tz, dt, 0.09, calm);
      copy.a = follow(copy.a, copy.ta, dt, 0.1, calm);
      moving ||=
        copy.x !== copy.tx ||
        copy.y !== copy.ty ||
        copy.z !== copy.tz ||
        copy.a !== copy.ta;
      const node = copyRefs.current[slot];
      if (node) {
        node.setAttribute(
          'transform',
          translateAlong(P, [copy.x, copy.y, copy.z]),
        );
        node.setAttribute('opacity', copy.a.toFixed(3));
      }
    });

    // Paint far to near: a sheet lifting onto the stack goes on top.
    const sorted = s.copies
      .map((copy, slot) => ({
        slot,
        key: copy ? depth(copy.x, copy.y, copy.z) : -1e9,
      }))
      .sort((a, b) => a.key - b.key)
      .map((entry) => entry.slot);
    if (sorted.join() !== order.current.join() && copyLayer.current) {
      order.current = sorted;
      sorted.forEach((slot) => {
        const node = copyRefs.current[slot];
        if (node) copyLayer.current!.appendChild(node);
      });
    }

    const side = s.platform === 'ios' ? -1 : 1;
    s.knob = follow(s.knob, side, dt, 0.12, calm);
    knobRef.current?.setAttribute('d', switchOf(s.knob));

    s.head = follow(s.head, 0, dt, 0.35, calm);
    headRef.current?.setAttribute('opacity', (0.15 + 0.85 * s.head).toFixed(3));

    s.screen = follow(s.screen, s.screenTarget, dt, 0.2, calm);
    screenRef.current?.setAttribute('opacity', s.screen.toFixed(3));
    socketRef.current?.setAttribute(
      'opacity',
      (0.15 + 0.85 * s.screen).toFixed(3),
    );

    s.buttonFlash = follow(s.buttonFlash, 0, dt, 0.3, calm);
    buttonGlow.current?.setAttribute('opacity', s.buttonFlash.toFixed(3));
    const width = BUTTON_W[s.version[s.platform]];
    const button = buttonRef.current;
    if (button) {
      const shown = Number(button.getAttribute('width'));
      const next = follow(shown, width, dt, 0.12, calm);
      const x = ((SCREEN_W - next) / 2).toFixed(2);
      [button, buttonGlow.current].forEach((node) => {
        node?.setAttribute('width', next.toFixed(2));
        node?.setAttribute('x', x);
      });
      moving ||= next !== width;
    }
    if (countRef.current) countRef.current.textContent = `count ${s.count}`;

    s.edited.forEach((value, file) => {
      s.edited[file] = follow(value, 0, dt, 0.5, calm);
      editRefs.current[file]?.setAttribute(
        'opacity',
        s.edited[file].toFixed(3),
      );
      moving ||= s.edited[file] > 0;
    });

    s.pulses = s.pulses.map((t) => t + dt / STEP.send).filter((t) => t < 1);
    pulseRefs.current.forEach((node, index) => {
      if (!node) return;
      const t = s.pulses[index];
      if (t === undefined) {
        node.setAttribute('opacity', '0');
        return;
      }
      const [x, y] = at(cableAt(t));
      node.setAttribute('cx', x.toFixed(2));
      node.setAttribute('cy', y.toFixed(2));
      node.setAttribute('opacity', Math.min(1, t * 8, (1 - t) * 8).toFixed(3));
    });

    moving ||=
      s.knob !== side ||
      s.head > 0.01 ||
      s.screen !== s.screenTarget ||
      s.buttonFlash > 0.01 ||
      s.pulses.length > 0;

    const pending = s.plan.length > 0;
    if (pending !== busyRef.current) {
      busyRef.current = pending;
      setBusy(pending);
    }

    // Idle tour: open, tap, save, tap, switch platform... until touched.
    const touring = !s.touched && !calm;
    if (touring && !moving && !pending) {
      s.idle += dt;
      if (s.idle > 1.4) {
        s.idle = 0;
        const steps = [
          open,
          tap,
          tap,
          tap,
          save,
          tap,
          () => setPlatform(s.platform === 'ios' ? 'android' : 'ios'),
        ];
        steps[s.tour % steps.length]();
        s.tour += 1;
      }
    }
    return moving || pending || touring;
  };

  const kick = useLoop(tick, inView);

  const act = (run: () => void) => {
    const s = sim.current;
    s.touched = true;
    if (s.plan.length) return;
    run();
    kick();
  };

  const onStage = () => act(sim.current.connected ? save : open);

  const onKey = (event: React.KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      Enter: onStage,
      ' ': onStage,
      r: () => act(open),
      s: () => act(save),
      t: () => act(tap),
      c: () => act(clear),
      i: () => act(() => setPlatform('ios')),
      a: () => act(() => setPlatform('android')),
    };
    const run = keys[event.key];
    if (!run) return;
    event.preventDefault();
    run();
  };

  const s = sim.current;
  const cache = s.cache[s.platform];
  const ios = s.platform === 'ios';
  const width = BUTTON_W[s.version[s.platform]];

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage mx"
        tabIndex={0}
        role="button"
        aria-label="Open the app, or save Button once it is open. R reloads, S saves, T taps, C clears the cache, I or A picks the platform."
        onClick={onStage}
        onKeyDown={onKey}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          {BENCH_ART}
          {BACK_ART}

          {/* Import panel: edges light as the resolver walks them. */}
          {CABINET_ART.edges.map((d, index) => (
            <Line
              key={index}
              d={d}
              tone={s.edges[index] ? 'hi' : 'lo'}
              className="mx-edge"
            />
          ))}
          <Dots points={CABINET_ART.joints} size={0.5} tone="mid" />
          {CABINET_ART.posts.map((paths, file) => (
            <Solid
              key={file}
              paths={paths}
              tone={s.resolved[file] ? 'hi' : 'mid'}
              crease="none"
            />
          ))}
          <Line d={CABINET_ART.entryRing} tone="mid" />
          <Dots
            points={CABINET_ART.drawers
              .map((drawer) => drawer.lamp)
              .filter((_, file) => s.resolved[file])}
            size={1.05}
            tone="hi"
          />

          {/* Source sheets, one in each tray; an edited one glows. */}
          {TRAY_XS.map((x, file) => (
            <g key={file} transform={translateAlong(P, [x, TRAY_Y, FLOOR_Z])}>
              <Card file={file} built={false} lit={false} />
              <g
                ref={(node) => {
                  editRefs.current[file] = node;
                }}
                opacity={0}
              >
                <path className="mx-edit" d={CARD_ART.body.outline} />
              </g>
            </g>
          ))}

          <g ref={copyLayer}>
            {s.copies.map((copy, slot) => (
              <g
                key={slot}
                ref={(node) => {
                  copyRefs.current[slot] = node;
                }}
                transform={
                  copy ? translateAlong(P, [copy.x, copy.y, copy.z]) : undefined
                }
                opacity={copy ? copy.a : 0}
              >
                {copy ? (
                  <Card
                    file={copy.file}
                    built={copy.built}
                    lit={slot === s.lit && !copy.built}
                  />
                ) : null}
              </g>
            ))}
          </g>

          {FRONT_ART}
          <Dots
            points={TRANSFORMER.cacheLamps.filter((_, file) => cache[file])}
            size={0.75}
            tone="hi"
          />
          <g ref={headRef} opacity={0.15}>
            <Dots points={[TRANSFORMER.headLamp]} size={0.9} tone="hi" />
          </g>
          <path
            ref={knobRef}
            className="iso-line mx-pointer"
            data-tone="lit"
            d={switchOf(s.knob)}
          />
          <g ref={socketRef} opacity={0.15}>
            <Dots points={[SERVER_ART.socketLamp]} size={0.9} tone="hi" />
          </g>
          {Array.from({ length: MODULES }, (_, index) => (
            <circle
              key={index}
              ref={(node) => {
                pulseRefs.current[index] = node;
              }}
              className="mx-pulse"
              r={1.5}
              opacity={0}
            />
          ))}

          {/* The phone screen, drawn in the plane of the glass. */}
          <path className="mx-glass" d={PHONE_ART.glass} />
          <g transform={PHONE_ART.screen}>
            <g ref={screenRef} opacity={0}>
              <rect
                className="mx-screen"
                x={0}
                y={0}
                width={SCREEN_W}
                height={SCREEN_H}
              />
              <rect className="mx-ui" x={0} y={0} width={SCREEN_W} height={8} />
              <rect
                className="mx-ui-line"
                x={9}
                y={13}
                width={6}
                height={6}
                rx={0.6}
              />
              <path className="mx-ui-line" d="M10 18.2 12 15.2 14 18.2" />
              <text
                ref={countRef}
                className="mx-count"
                x={SCREEN_W / 2}
                y={27}
                textAnchor="middle"
              >
                count {s.count}
              </text>
              <rect
                ref={buttonRef}
                className={ios ? 'mx-ui-line' : 'mx-ui'}
                x={(SCREEN_W - width) / 2}
                y={31}
                width={width}
                height={5}
                rx={ios ? 2.5 : 0.5}
              />
              <rect
                ref={buttonGlow}
                className="mx-ui-glow"
                x={(SCREEN_W - width) / 2}
                y={31}
                width={width}
                height={5}
                rx={ios ? 2.5 : 0.5}
                opacity={0}
              />
              {ios ? (
                <rect
                  className="mx-ui"
                  x={8}
                  y={SCREEN_H - 2.2}
                  width={8}
                  height={0.8}
                  rx={0.4}
                />
              ) : (
                [6, 12, 18].map((x) => (
                  <circle
                    key={x}
                    className="mx-ui"
                    cx={x}
                    cy={SCREEN_H - 2}
                    r={0.7}
                  />
                ))
              )}
            </g>
          </g>
          <Dots points={[PHONE_ART.camera]} size={0.6} tone="lo" />
          {PHONE_FRONT}
        </svg>
      </div>
      <div className="mx-controls" role="group" aria-label="Figure controls">
        <div className="mx-platform" role="radiogroup" aria-label="Platform">
          {(['ios', 'android'] as const).map((platform) => (
            <button
              key={platform}
              type="button"
              role="radio"
              aria-checked={s.platform === platform}
              onClick={() => act(() => setPlatform(platform))}
              disabled={busy && s.touched}
            >
              {platform === 'ios' ? 'iOS' : 'Android'}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => act(open)}
          disabled={busy && s.touched}
        >
          {s.connected ? 'Reload' : 'Open app'}
        </button>
        <button
          type="button"
          onClick={() => act(tap)}
          disabled={busy && s.touched}
        >
          Tap +1
        </button>
        <button
          type="button"
          onClick={() => act(save)}
          disabled={busy && s.touched}
        >
          Save {FILES[BUTTON_FILE[s.platform]]}
        </button>
        <button
          type="button"
          onClick={() => act(clear)}
          disabled={busy && s.touched}
        >
          --clear
        </button>
      </div>
    </div>
  );
}

export function MetroAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How Metro feeds the app"
        hint="Tap to open · then tap to save Button"
        readout={readouts.rest('ios')}
        keys={[
          { mark: 'lit', label: 'The module being worked on' },
          { mark: 'raised', label: 'Transformed module, in the bundle' },
          { mark: 'dim', label: 'Source file on disk' },
        ]}
        caption="Metro starts at index.js and follows every import, so only files the graph reaches end up in the bundle; platform extensions are resolved per build, and an iOS bundle never contains Button.android.tsx. Each file goes through Babel once and the result is cached on disk, keyed by its contents and the platform, which is why a reload is fast and why --clear makes the next one slow. In development the bundle is served on port 8081 over a socket that stays open: saving a file transforms just that file and sends just that module, and Fast Refresh swaps it in while the component keeps its state."
      >
        <MetroBench />
      </Plate>
    </div>
  );
}

import * as React from 'react';
import { pathOf, translateAlong } from '../anatomy/kit/iso-kit';
import { Dots, Line, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import { BenchArt, Cable, Controls, Runner } from '../anatomy/bench';
import { hideRun, runAlong } from '../anatomy/parts';
import {
  BENCH,
  BIN_ART,
  BIN_DROP,
  BIN_X,
  BIN_Y,
  CABLE,
  CARD_ART,
  CARD_RISE,
  HEIGHT,
  P,
  PHONE_ART,
  PUSHER_ART,
  PUSH_STROKE,
  SCREEN_H,
  SCREEN_W,
  SERVER_ART,
  SLOT_X,
  STOP_X,
  TOKENS,
  TOKEN_START,
  TRACK_ART,
  TRACK_X1,
  WIDTH,
} from './geometry';
import { FIRST_PATCH, readouts, versionOf, type Change } from './model';

/* ---------- Static art ---------- */

const CABLE_D = pathOf(CABLE);

const DOCK = (
  <g>
    <Solid
      paths={PHONE_ART.dock}
      tone="mid"
      crease="faint"
      inner={<Line d={PHONE_ART.dockSeam} tone="faint" />}
    />
    <Line d={PHONE_ART.dockGroove} tone="faint" />
    <Dots points={PHONE_ART.dockScrews} size={0.5} tone="mid" />
    <Solid paths={PHONE_ART.rest} tone="lo" crease="faint" />
    <Solid paths={PHONE_ART.body} tone="hi" crease="lo" />
    <Solid paths={PHONE_ART.sideButton} tone="mid" crease="none" />
    <path className="af-glass" d={PHONE_ART.bezel} />
    <Dots points={[PHONE_ART.camera]} size={0.6} tone="lo" />
  </g>
);

const LEDGE = (
  <g>
    <Solid paths={PHONE_ART.lip} tone="mid" crease="faint" />
    <Line d={PHONE_ART.slots} tone="lo" />
  </g>
);

const SOCKET = (
  <g>
    <Solid paths={PHONE_ART.socket} tone="mid" crease="none" />
    <Line d={PHONE_ART.socketMouth} tone="lo" />
  </g>
);

const TRACK_BACK = (
  <g>
    <Solid
      paths={TRACK_ART.bed}
      tone="mid"
      crease="faint"
      inner={<Line d={TRACK_ART.bedSeam} tone="faint" />}
    />
    <Line d={TRACK_ART.floor} tone="faint" />
    <Solid paths={PUSHER_ART.housing} tone="mid" crease="faint" />
    <Solid paths={TRACK_ART.lipBack} tone="mid" crease="none" />
    <Solid paths={TRACK_ART.postBack} tone="mid" crease="faint" />
  </g>
);

const TRACK_FRONT = (
  <g>
    <Solid paths={TRACK_ART.bar} tone="mid" crease="faint" />
    <Dots points={TRACK_ART.barScrews} size={0.4} tone="mid" />
    <Solid paths={TRACK_ART.postFront} tone="mid" crease="faint" />
    <Solid paths={TRACK_ART.lipFrontA} tone="mid" crease="none" />
    <Solid paths={TRACK_ART.lipFrontB} tone="mid" crease="none" />
    <Dots points={TRACK_ART.lipScrews} size={0.4} tone="mid" />
  </g>
);

const SERVER = (
  <g>
    <Solid paths={SERVER_ART.plinth} tone="lo" crease="faint" />
    <Solid
      paths={SERVER_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={SERVER_ART.seam} tone="faint" />}
    />
    <Line d={SERVER_ART.groove} tone="faint" />
    <Dots points={SERVER_ART.screws} size={0.5} tone="mid" />
    <Line d={SERVER_ART.bays} tone="lo" />
    <Line d={SERVER_ART.bayRules} tone="faint" free />
    <Line d={SERVER_ART.vents} tone="lo" />
    <Line d={SERVER_ART.lampRing} tone="lo" />
    <Solid paths={SERVER_ART.socket} tone="mid" crease="none" />
    <Line d={SERVER_ART.socketMouth} tone="lo" />
  </g>
);

const BIN_BACK = (
  <g>
    <Solid paths={BIN_ART.floor} tone="lo" crease="none" />
    <Line d={BIN_ART.inner} tone="faint" />
    <Solid paths={BIN_ART.back} tone="mid" crease="none" />
    <Solid paths={BIN_ART.left} tone="mid" crease="none" />
  </g>
);

const BIN_FRONT = (
  <g>
    <Solid paths={BIN_ART.right} tone="mid" crease="none" />
    <Solid paths={BIN_ART.front} tone="mid" crease="none" />
    <Dots points={BIN_ART.screws} size={0.4} tone="mid" />
  </g>
);

const Token = React.memo(function Token({ change }: { change: Change }) {
  const art = TOKENS[change];
  return (
    <>
      <Solid paths={art.body} tone="hi" crease="lo" lit={change !== 'native'} />
      <Line d={art.mark} tone="mid" />
    </>
  );
});

const BundleCard = React.memo(function BundleCard({ lit }: { lit: boolean }) {
  return (
    <>
      <Solid paths={CARD_ART.body} tone="hi" crease="lo" lit={lit} />
      <Line d={CARD_ART.rules} tone="lo" free />
    </>
  );
});

/* ---------- Simulation ---------- */

interface Tok {
  x: number;
  y: number;
  z: number;
  a: number;
  id: number;
  tx: number;
  ty: number;
  tz: number;
  ta: number;
  change: Change;
}

interface Card {
  x: number;
  z: number;
  a: number;
  id: number;
  tx: number;
  tz: number;
  ta: number;
  patch: number;
}

interface Sim {
  idle: number;
  tour: number;
  clock: number;
  tokens: Tok[];
  nextId: number;
  touched: boolean;
  /** Tokens resting in the review bin, drawn inside it. */
  push: number;
  binned: Tok[];
  cards: Card[];
  pulse: number;
  black: number;
  review: number;
  running: number;
  published: number;
  pushTarget: number;
  serverLamp: number;
  reviewing: boolean;
  blackTarget: number;
  pending: number | null;
  plan: Array<{ at: number; run: () => void }>;
}

const card = (id: number, patch: number, x: number): Card => ({
  a: 1,
  id,
  patch,
  ta: 1,
  tx: x,
  tz: 0,
  x,
  z: 0,
});

const initial = (): Sim => ({
  binned: [],
  black: 0,
  blackTarget: 0,
  cards: [card(1, FIRST_PATCH, SLOT_X.active)],
  clock: 0,
  idle: 0,
  nextId: 2,
  pending: null,
  plan: [],
  published: FIRST_PATCH,
  pulse: -1,
  push: 0,
  pushTarget: 0,
  review: 0,
  reviewing: false,
  running: FIRST_PATCH,
  serverLamp: 0,
  tokens: [],
  touched: false,
  tour: 0,
});

const TOUR = ['js', 'relaunch', 'native', 'asset', 'relaunch'] as const;
type Action = (typeof TOUR)[number];

const SEND = 1;
const SETTLED = 0.01;

const LABEL =
  'Over-the-air updates drawn as a sorting bench. Changes ride a track as tokens: a flat square for a bug fix, a flat disc for a new image, a tall block for a native module. A bar across the track is the height of the JavaScript bundle. Flat tokens pass under it into the EAS Update server, which sends the new bundle down a cable to a phone in a dock, where it waits as a card in the next-launch slot while the phone keeps running its current bundle. Relaunching the app moves the waiting card into the running slot. A native module token is too tall for the bar: a pusher shoves it off the track into a store-review bin with a clock on it.';

export function OtaBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const [busy, setBusy] = React.useState(false);
  const busyRef = React.useRef(false);

  const tokRefs = React.useRef(new Map<number, SVGGElement>());
  const cardRefs = React.useRef(new Map<number, SVGGElement>());
  const pusherRef = React.useRef<SVGGElement>(null);
  const runRef = React.useRef<SVGPathElement | null>(null);
  const headRef = React.useRef<SVGGElement | null>(null);
  const serverLampRef = React.useRef<SVGGElement>(null);
  const handRef = React.useRef<SVGPathElement>(null);
  const blackRef = React.useRef<SVGRectElement>(null);
  const versionRef = React.useRef<SVGTextElement>(null);

  const later = (seconds: number, run: () => void) => {
    const s = sim.current;
    s.plan.push({ at: s.clock + seconds, run });
  };

  const ship = (change: Change) => {
    const s = sim.current;
    const tok: Tok = {
      a: 0,
      change,
      id: s.nextId++,
      ta: 1,
      tx: change === 'native' ? STOP_X : TRACK_X1 + 4,
      ty: 0,
      tz: 0,
      x: TOKEN_START,
      y: 0,
      z: 0,
    };
    s.tokens.push(tok);
    rerender();
    if (change === 'native') {
      later(1.4, () => {
        say(readouts.blocked());
        s.pushTarget = 1;
        tok.ty = BIN_Y;
        tok.tx = BIN_X;
        later(0.5, () => {
          s.pushTarget = 0;
          tok.tz = -BIN_DROP;
          s.tokens = s.tokens.filter((other) => other.id !== tok.id);
          s.binned.push(tok);
          s.reviewing = true;
          rerender();
          later(0.6, () => say(readouts.review()));
        });
      });
      return;
    }
    // Flat tokens pass under the bar and into the server.
    later(1.9, () => {
      tok.ta = 0;
      s.published += 1;
      const patch = s.published;
      s.serverLamp = 1;
      say(readouts.passes(change, patch));
      later(0.5, () => {
        s.tokens = s.tokens.filter((other) => other.id !== tok.id);
        s.pulse = 0;
        rerender();
        later(SEND, () => {
          // A newer download replaces whatever was waiting.
          s.cards.forEach((other) => {
            if (other.tx === SLOT_X.pending) {
              other.ta = 0;
              other.tz = CARD_RISE;
            }
          });
          const fresh = card(s.nextId++, patch, SLOT_X.pending);
          fresh.a = 0;
          fresh.z = CARD_RISE;
          s.cards.push(fresh);
          s.pending = patch;
          rerender();
          say(readouts.downloaded(patch));
          later(0.6, () => tidy());
        });
      });
    });
  };

  const tidy = () => {
    const s = sim.current;
    s.cards = s.cards.filter((other) => other.ta > 0);
    rerender();
  };

  const actions: Record<Action, () => void> = {
    asset: () => ship('asset'),
    js: () => ship('js'),
    native: () => ship('native'),
    relaunch: () => {
      const s = sim.current;
      s.blackTarget = 1;
      later(0.45, () => {
        if (s.pending !== null) {
          const next = s.pending;
          s.cards.forEach((other) => {
            if (other.tx === SLOT_X.active) {
              other.ta = 0;
              other.tz = CARD_RISE;
            } else if (other.tx === SLOT_X.pending) other.tx = SLOT_X.active;
          });
          s.running = next;
          s.pending = null;
          rerender();
          later(0.5, () => {
            s.blackTarget = 0;
            say(readouts.relaunched(next));
            later(0.4, tidy);
          });
        } else {
          later(0.3, () => {
            s.blackTarget = 0;
            say(readouts.current(s.running));
          });
        }
      });
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

    for (const tok of [...s.tokens, ...s.binned]) {
      tok.x = follow(tok.x, tok.tx, dt, 0.42, calm);
      tok.y = follow(tok.y, tok.ty, dt, 0.12, calm);
      tok.z = follow(tok.z, tok.tz, dt, 0.08, calm);
      tok.a = follow(tok.a, tok.ta, dt, 0.12, calm);
      moving ||=
        tok.x !== tok.tx ||
        tok.y !== tok.ty ||
        tok.z !== tok.tz ||
        tok.a !== tok.ta;
      const node = tokRefs.current.get(tok.id);
      node?.setAttribute('transform', translateAlong(P, [tok.x, tok.y, tok.z]));
      node?.setAttribute('opacity', tok.a.toFixed(3));
    }

    for (const c of s.cards) {
      c.x = follow(c.x, c.tx, dt, 0.14, calm);
      c.z = follow(c.z, c.tz, dt, 0.12, calm);
      c.a = follow(c.a, c.ta, dt, 0.12, calm);
      moving ||= c.x !== c.tx || c.z !== c.tz || c.a !== c.ta;
      const node = cardRefs.current.get(c.id);
      node?.setAttribute('transform', translateAlong(P, [c.x, 0, c.z]));
      node?.setAttribute('opacity', c.a.toFixed(3));
    }

    s.push = follow(s.push, s.pushTarget, dt, 0.08, calm);
    pusherRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, PUSH_STROKE * s.push, 0]),
    );
    moving ||= s.push !== s.pushTarget;

    if (s.pulse >= 0) {
      s.pulse += calm ? 1 : dt / SEND;
      if (s.pulse >= 1) s.pulse = -1;
    }
    if (s.pulse >= 0 && runRef.current) {
      runAlong(runRef.current, headRef.current, s.pulse, 1, 0.3);
      moving = true;
    } else hideRun(runRef.current, headRef.current);

    s.serverLamp = follow(s.serverLamp, 0, dt, 0.6, calm);
    serverLampRef.current?.setAttribute(
      'opacity',
      (0.12 + 0.88 * s.serverLamp).toFixed(3),
    );
    moving ||= s.serverLamp > SETTLED;

    // The review clock turns slowly while a native change waits in the bin.
    if (s.reviewing && !calm) s.review += dt * 0.6;
    handRef.current?.setAttribute(
      'transform',
      `rotate(${(s.review * 57.3) % 360})`,
    );

    s.black = follow(s.black, s.blackTarget, dt, 0.1, calm);
    blackRef.current?.setAttribute('opacity', s.black.toFixed(3));
    if (versionRef.current)
      versionRef.current.textContent = versionOf(s.running);
    moving ||= s.black !== s.blackTarget;

    const pending = s.plan.length > 0;
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
    return moving || pending || touring || (s.reviewing && !calm);
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
      ' ': 'js',
      a: 'asset',
      Enter: 'js',
      f: 'js',
      l: 'relaunch',
      n: 'native',
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
  const token = (tok: Tok) => (
    <g
      key={tok.id}
      ref={(node) => {
        if (node) tokRefs.current.set(tok.id, node);
        else tokRefs.current.delete(tok.id);
      }}
      transform={translateAlong(P, [tok.x, tok.y, tok.z])}
      opacity={tok.a}
    >
      <Token change={tok.change} />
    </g>
  );

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Ship a bug fix over the air. Press A for a new image, N for a native module, L to relaunch the app."
        onClick={() => act('js')}
        onKeyDown={onKey}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          <defs>
            <clipPath id="ota-screen-clip">
              <rect width={SCREEN_W} height={SCREEN_H} rx={1.2} />
            </clipPath>
          </defs>
          <BenchArt bench={BENCH} />
          {DOCK}
          <path className="af-glass" d={PHONE_ART.glass} />
          <g transform={PHONE_ART.screen}>
            <g clipPath="url(#ota-screen-clip)">
              <rect className="af-screen" width={SCREEN_W} height={SCREEN_H} />
              <rect
                className="af-ui"
                x={2.4}
                y={5}
                width={11}
                height={2.4}
                rx={0.6}
              />
              <path className="af-ui-line" d="M2.4 2.4H6.4M2.4 11H22.6" />
              {[15, 29].map((y) => (
                <g key={y}>
                  <rect
                    className="af-ui-line"
                    x={2.4}
                    y={y}
                    width={SCREEN_W - 4.8}
                    height={11}
                    rx={1.2}
                  />
                  <path
                    className="af-ui-line"
                    d={`M5 ${y + 3.6}H${SCREEN_W - 6}M5 ${y + 6.6}H${SCREEN_W - 10}`}
                  />
                </g>
              ))}
              <text
                ref={versionRef}
                className="af-mono"
                x={SCREEN_W / 2}
                y={SCREEN_H - 8}
                fontSize={3.4}
                textAnchor="middle"
              >
                {versionOf(s.running)}
              </text>
              <rect
                ref={blackRef}
                className="ota-black"
                width={SCREEN_W}
                height={SCREEN_H}
                opacity={0}
              />
            </g>
          </g>
          {LEDGE}
          {s.cards.map((c) => (
            <g
              key={c.id}
              ref={(node) => {
                if (node) cardRefs.current.set(c.id, node);
                else cardRefs.current.delete(c.id);
              }}
              transform={translateAlong(P, [c.x, 0, c.z])}
              opacity={c.a}
            >
              <BundleCard lit={c.patch === s.pending} />
            </g>
          ))}

          <Cable d={CABLE_D} />
          <Runner
            d={CABLE_D}
            runRef={(node) => {
              runRef.current = node;
            }}
            headRef={(node) => {
              headRef.current = node;
            }}
          />
          {SOCKET}

          {TRACK_BACK}
          <g ref={pusherRef}>
            <Line d={PUSHER_ART.rod} tone="mid" />
            <Solid paths={PUSHER_ART.plate} tone="mid" crease="faint" />
          </g>
          {s.tokens.map(token)}
          {TRACK_FRONT}
          {SERVER}
          <g ref={serverLampRef} opacity={0.12}>
            <Dots points={[SERVER_ART.lamp]} size={0.9} tone="hi" />
          </g>

          {BIN_BACK}
          {s.binned.map(token)}
          {BIN_FRONT}
          <g transform={BIN_ART.dial}>
            <circle className="ota-dial" r={3.4} />
            <path
              className="af-ui-line"
              d="M0 -3.4V-2.4M3.4 0H2.4M0 3.4V2.4M-3.4 0H-2.4"
            />
            <path ref={handRef} className="ota-hand" d="M0 0V-2.6" />
            <circle className="af-head" r={0.5} />
          </g>
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('js')} disabled={locked}>
          Ship a bug fix
        </button>
        <button type="button" onClick={() => act('asset')} disabled={locked}>
          Ship an image
        </button>
        <button type="button" onClick={() => act('native')} disabled={locked}>
          Add native module
        </button>
        <button type="button" onClick={() => act('relaunch')} disabled={locked}>
          Relaunch app
        </button>
      </Controls>
    </div>
  );
}

export function OtaAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="What ships over the air"
        hint="Tap for a fix · N native · L relaunch"
        readout={readouts.rest(FIRST_PATCH)}
        keys={[
          { label: 'Fits the JavaScript bundle', mark: 'lit' },
          { label: 'Native change', mark: 'raised' },
          { label: 'Bundle height bar', mark: 'edge' },
        ]}
        caption="An over-the-air update ships a new JavaScript bundle and its assets straight to installed apps, with no store review. The app downloads it in the background and runs it on the next launch. Anything outside the bundle (adding a native module, upgrading React Native, permissions, the app icon) does not fit: it needs a new store build and review. An update must also match the installed binary's runtime version, or it would call native code the binary does not have."
      >
        <OtaBench />
      </Plate>
    </div>
  );
}

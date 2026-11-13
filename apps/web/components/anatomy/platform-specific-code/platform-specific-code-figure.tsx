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
import { BenchArt, Controls, HousingArt } from '../bench';
import { useScheduler } from '../sim';
import {
  BENCH,
  BIN_ART,
  BIN_FLOOR,
  BIN_X,
  BIN_Y,
  CARD_ART,
  CARD_H,
  FEED_X,
  GATE_ART,
  GATE_X,
  HEIGHT,
  P,
  SCRAP_ART,
  SCRAP_FLOOR,
  SCRAP_X,
  SCRAP_Y,
  TRACK_ART,
  TRACK_SURFACE,
  TRACK_Y,
  WIDTH,
  dialPointer,
  flapOf,
} from './geometry';
import { BUNDLE_NAME, FILES, readouts, shipped, type OS } from './model';

const STATIC_BACK = (
  <g>
    <HousingArt art={GATE_ART}>
      <Line d={GATE_ART.detents} tone="mid" />
      <Solid paths={GATE_ART.dial} tone="mid" crease="none" />
      <Line d={GATE_ART.dialKnurl} tone="faint" />
      <Line d={GATE_ART.dialCap} tone="lo" />
    </HousingArt>
    <FaceText transform={GATE_ART.osLabels[0]} size={2.6} tone="lo">
      iOS
    </FaceText>
    <FaceText transform={GATE_ART.osLabels[1]} size={2.6} tone="lo">
      And
    </FaceText>
    <Solid
      paths={TRACK_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={TRACK_ART.seam} tone="faint" />}
    />
    <Line d={TRACK_ART.guides} tone="faint" />
    <Line d={TRACK_ART.hopper} tone="lo" />
    <Solid paths={BIN_ART.floor} tone="lo" crease="none" />
    <Line d={BIN_ART.inner} tone="faint" />
    <Solid paths={BIN_ART.back} tone="mid" crease="none" />
    <Solid paths={BIN_ART.left} tone="mid" crease="none" />
    <Solid paths={SCRAP_ART.body} tone="lo" crease="faint" />
    <Line d={SCRAP_ART.inner} tone="faint" />
    <FaceText transform={SCRAP_ART.label} size={2.4} tone="lo">
      never shipped
    </FaceText>
    <Solid paths={TRACK_ART.chute} tone="mid" crease="faint" />
  </g>
);

function FileCard({
  index,
  os,
  placed,
}: {
  index: number;
  os: OS;
  placed: 'bin' | 'scrap' | 'track';
}) {
  const file = FILES[index];
  const lit = placed === 'bin';
  return (
    <>
      <Solid paths={CARD_ART.body} tone="hi" crease="lo" lit={lit} />
      <g transform={CARD_ART.face}>
        <text
          className={placed === 'scrap' ? 'af-mono er-url' : 'af-mono'}
          fontSize={2.5}
          y={0}
        >
          {file.name}
        </text>
        {file.select ? (
          <>
            <text
              className={
                placed === 'bin' && os !== 'ios' ? 'af-mono er-url' : 'af-mono'
              }
              fontSize={2.2}
              y={3.6}
            >
              ios: shadow
            </text>
            <text
              className={
                placed === 'bin' && os !== 'android'
                  ? 'af-mono er-url'
                  : 'af-mono'
              }
              fontSize={2.2}
              y={6.6}
            >
              android: elevation
            </text>
          </>
        ) : (
          <path className="af-ui-line" d="M0 4H12M0 6.6H8" />
        )}
      </g>
    </>
  );
}

/* ---------- Simulation ---------- */

interface Card {
  x: number;
  y: number;
  z: number;
  a: number;
  id: number;
  tx: number;
  ty: number;
  tz: number;
  ta: number;
  file: number;
  placed: 'bin' | 'scrap' | 'track';
}

interface Sim {
  os: OS;
  dial: number;
  flap: number;
  cards: Card[];
  inBin: number;
  nextId: number;
  flapTarget: number;
}

const LABEL =
  'Platform-specific code drawn as a sorting bench. Four file cards feed one at a time along a track to a gate: App.tsx, Picker.ios.tsx, Picker.android.tsx and styles.ts. A dial on the gate housing is set to iOS or Android, because Metro builds one bundle per platform. Cards that belong in this platform’s bundle cross into a bin labelled main.jsbundle or index.android.bundle; the other platform’s Picker file is flapped down a chute into a tray marked never shipped. styles.ts, which uses Platform.select, goes into both bundles with only its own platform’s branch lit.';

export function PlatformBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      cards: [],
      dial: -1,
      flap: 0,
      flapTarget: 0,
      inBin: 0,
      nextId: 1,
      os: 'ios',
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const cardRefs = React.useRef(new Map<number, SVGGElement>());
  const dialRef = React.useRef<SVGPathElement>(null);
  const flapRef = React.useRef<SVGPathElement>(null);

  const bundle = (os: OS) => {
    const s = sim.current;
    s.os = os;
    s.inBin = 0;
    s.cards.forEach((card) => (card.ta = 0));
    rerender();
    say(readouts.start(os));
    FILES.forEach((file, index) => {
      sch.later(0.6 + index * 1.5, () => {
        const card: Card = {
          a: 0,
          file: index,
          id: s.nextId++,
          placed: 'track',
          ta: 1,
          tx: GATE_X - 12,
          ty: TRACK_Y,
          tz: TRACK_SURFACE,
          x: FEED_X,
          y: TRACK_Y,
          z: TRACK_SURFACE,
        };
        s.cards.push(card);
        const keep = shipped(file, os);
        s.flapTarget = keep ? 0 : 1;
        rerender();
        sch.later(0.75, () => {
          if (keep) {
            card.placed = 'bin';
            card.tx = BIN_X;
            card.ty = BIN_Y;
            card.tz = BIN_FLOOR + s.inBin * (CARD_H + 0.4);
            s.inBin += 1;
          } else {
            card.placed = 'scrap';
            card.tx = SCRAP_X;
            card.ty = SCRAP_Y;
            card.tz = SCRAP_FLOOR;
          }
          rerender();
          say(readouts.file(file, os));
          if (index === FILES.length - 1)
            sch.later(0.8, () => say(readouts.done(os, s.inBin)));
        });
      });
    });
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    for (const card of s.cards) {
      card.x = follow(card.x, card.tx, dt, 0.16, calm);
      card.y = follow(card.y, card.ty, dt, 0.16, calm);
      card.z = follow(card.z, card.tz, dt, 0.12, calm);
      card.a = follow(card.a, card.ta, dt, 0.12, calm);
      moving ||= card.x !== card.tx || card.y !== card.ty || card.a !== card.ta;
      // A hop while crossing from the gate to the bin.
      const travel = Math.abs(card.tx - card.x) + Math.abs(card.ty - card.y);
      const hop = card.placed === 'bin' ? Math.min(10, travel * 0.25) : 0;
      const node = cardRefs.current.get(card.id);
      node?.setAttribute(
        'transform',
        translateAlong(P, [card.x, card.y, card.z + hop]),
      );
      node?.setAttribute('opacity', card.a.toFixed(3));
    }
    const before = s.cards.length;
    s.cards = s.cards.filter((card) => card.ta > 0 || card.a > 0.02);
    if (s.cards.length !== before) rerender();

    const side = s.os === 'ios' ? -1 : 1;
    s.dial = follow(s.dial, side, dt, 0.08, calm);
    dialRef.current?.setAttribute('d', dialPointer(s.dial));
    s.flap = follow(s.flap, s.flapTarget, dt, 0.07, calm);
    flapRef.current?.setAttribute('d', pathOf(flapOf(s.flap), true));
    moving ||= s.dial !== side || s.flap !== s.flapTarget;

    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.8, (i) =>
      bundle(i % 2 ? 'android' : 'ios'),
    );
    return moving || pending || touring;
  };

  const kick = useLoop(tick, inView);

  const act = (os: OS) => {
    sch.touch();
    if (sch.pending) return;
    bundle(os);
    kick();
  };

  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === 'i' || event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      act(sim.current.os === 'ios' && event.key !== 'i' ? 'android' : 'ios');
    } else if (event.key === 'a') {
      event.preventDefault();
      act('android');
    }
  };

  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
  }, [sch]);

  const s = sim.current;
  const locked = sch.busy && sch.touched;

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Bundle for the other platform. Press I for iOS, A for Android."
        onClick={() => act(s.os === 'ios' ? 'android' : 'ios')}
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
          {STATIC_BACK}
          <path
            ref={dialRef}
            className="iso-line af-pointer"
            data-tone="lit"
            d={dialPointer(s.dial)}
          />
          {s.cards.map((card) => (
            <g
              key={card.id}
              ref={(node) => {
                if (node) cardRefs.current.set(card.id, node);
                else cardRefs.current.delete(card.id);
              }}
              transform={translateAlong(P, [card.x, card.y, card.z])}
              opacity={card.a}
            >
              <FileCard index={card.file} os={s.os} placed={card.placed} />
            </g>
          ))}
          <path
            ref={flapRef}
            className="jx-roller"
            d={pathOf(flapOf(s.flap), true)}
          />
          <Dots points={[GATE_ART.flapPivot]} size={0.6} tone="mid" />
          <Solid paths={BIN_ART.right} tone="mid" crease="none" />
          <Solid paths={BIN_ART.front} tone="mid" crease="none" />
          <FaceText transform={BIN_ART.label} size={2.6} tone="mid">
            {BUNDLE_NAME[s.os]}
          </FaceText>
        </svg>
      </div>
      <Controls>
        <div className="af-segmented" role="radiogroup" aria-label="Platform">
          {(['ios', 'android'] as const).map((os) => (
            <button
              key={os}
              type="button"
              role="radio"
              aria-checked={s.os === os}
              onClick={() => act(os)}
              disabled={locked}
            >
              Bundle for {os === 'ios' ? 'iOS' : 'Android'}
            </button>
          ))}
        </div>
      </Controls>
    </div>
  );
}

export function PlatformAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Which files ship where"
        hint="Tap to bundle the other platform"
        readout={readouts.rest()}
        keys={[
          { label: 'In this platform’s bundle', mark: 'lit' },
          { label: 'Source file', mark: 'raised' },
          { label: 'Gate set to the platform', mark: 'edge' },
        ]}
        caption="Metro builds one bundle per platform. Import ./Picker and it resolves to Picker.ios.tsx in the iOS bundle and Picker.android.tsx in the Android one, so the other platform's file is never shipped. Platform.select, for small differences like a shadow against an elevation, ships in both bundles and picks its branch at runtime by Platform.OS. Reach for either when the platform convention really differs, not to paper over a layout bug."
      >
        <PlatformBench />
      </Plate>
    </div>
  );
}

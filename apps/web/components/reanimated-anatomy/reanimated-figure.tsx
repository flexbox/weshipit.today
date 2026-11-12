import * as React from 'react';
import { translateAlong } from '../anatomy/kit/iso-kit';
import { Dots, Line, Plate, Solid } from '../anatomy/kit/draw';
import { useInView, useLoop, useReadout } from '../anatomy/kit/live';
import { asksForStillness } from '../anatomy/kit/live';
import { BenchArt, Controls } from '../anatomy/bench';
import {
  BENCH,
  HEIGHT,
  HINGE_REST,
  LANES,
  P,
  READER,
  WIDTH,
  crankOf,
  hingeX,
  type Lane,
} from './geometry';
import { BUSY, BUSY_FRAME, FPS, PERIOD, readouts } from './model';

/* ---------- Static art ---------- */

function Housing({ lane }: { lane: Lane }) {
  const art = LANES[lane];
  return (
    <>
      <Solid paths={art.plinth} tone="lo" crease="faint" />
      <Solid
        paths={art.house}
        tone="mid"
        crease="faint"
        inner={<Line d={art.houseSeam} tone="faint" />}
      />
      <Line d={art.groove} tone="faint" />
      <Dots points={art.screws} size={0.5} tone="mid" />
      <Line d={art.vents} tone="lo" />
      <Line d={art.lampRing} tone="lo" />
      <g className="iso-solid">
        <path className="iso-fill" d={art.wheel} />
        <path className="iso-line" data-tone="mid" d={art.wheel} />
      </g>
      <Line d={art.wheelRing} tone="faint" />
    </>
  );
}

function Rail({ lane }: { lane: Lane }) {
  const art = LANES[lane];
  return (
    <>
      <Solid
        paths={art.rail}
        tone="mid"
        crease="faint"
        inner={<Line d={art.railSeam} tone="faint" />}
      />
      <Line d={art.slot} tone="lo" />
      <Line d={art.ticksMinor} tone="lo" />
      <Line d={art.ticksMajor} tone="mid" />
    </>
  );
}

function Stop({ lane }: { lane: Lane }) {
  const art = LANES[lane];
  return (
    <>
      <Solid paths={art.stop} tone="mid" crease="faint" />
      <Line d={art.stopLampRing} tone="lo" />
      <Dots points={[art.stopScrew]} size={0.45} tone="mid" />
    </>
  );
}

function Carriage({ lane }: { lane: Lane }) {
  const art = LANES[lane];
  return (
    <>
      <Solid
        paths={art.car}
        tone="hi"
        crease="lo"
        lit={lane === 'ui'}
        inner={<Line d={art.carSeam} tone="faint" />}
      />
      <Line d={art.carRules} tone="lo" free />
    </>
  );
}

const READER_ART = (
  <g>
    {READER.spools.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
    <Line d={READER.hubs.join('')} tone="lo" />
    <Line d={READER.tape} tone="lo" />
  </g>
);

/* ---------- Live figure ---------- */

interface Sim {
  idle: number;
  busy: number;
  tape: number;
  clock: number;
  theta: number;
  jsTheta: number;
  jsBlink: number;
  updates: number;
  playing: boolean;
  touched: boolean;
  nextFrame: number;
}

const initial = (): Sim => ({
  busy: 0,
  clock: 0,
  idle: 0,
  jsBlink: 0,
  jsTheta: 0,
  nextFrame: 0,
  playing: true,
  tape: 0,
  theta: 0,
  touched: false,
  updates: 0,
});

const OMEGA = (Math.PI * 2) / PERIOD;
/** Frames JS would have drawn during one busy spell. */
const BUSY_FRAMES = Math.round(BUSY * FPS);

const LABEL =
  'Reanimated drawn as two identical slider-crank rigs on a bench. Each crank wheel drives a connecting rod that slides a carriage, an animated view, along a rail. The back rig is driven from the JavaScript thread, like a setState animation; a tape reader on its housing stands for JavaScript work. The front rig is driven from the UI thread by a worklet. Parsing a large response sets the tape running: the JavaScript lamp turns red and the back carriage stalls and jumps, getting a frame out only between chunks of work, while the front carriage keeps moving smoothly every frame.';

export function ReanimatedBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) sim.current = initial();
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const [playing, setPlaying] = React.useState(true);
  const [busy, setBusy] = React.useState(false);

  const refs = {
    arm: React.useRef<Record<Lane, SVGPathElement | null>>({
      js: null,
      ui: null,
    }),
    car: React.useRef<Record<Lane, SVGGElement | null>>({ js: null, ui: null }),
    pin: React.useRef<Record<Lane, SVGCircleElement | null>>({
      js: null,
      ui: null,
    }),
    rod: React.useRef<Record<Lane, SVGPathElement | null>>({
      js: null,
      ui: null,
    }),
    stop: React.useRef<Record<Lane, SVGGElement | null>>({
      js: null,
      ui: null,
    }),
  };
  const jsLampRef = React.useRef<SVGCircleElement>(null);
  const tapeRef = React.useRef<SVGPathElement>(null);

  const draw = (lane: Lane, theta: number) => {
    const crank = crankOf(lane, theta);
    refs.rod.current[lane]?.setAttribute('d', crank.rod);
    refs.arm.current[lane]?.setAttribute('d', crank.arm);
    refs.pin.current[lane]?.setAttribute('cx', crank.pin[0].toFixed(2));
    refs.pin.current[lane]?.setAttribute('cy', crank.pin[1].toFixed(2));
    refs.car.current[lane]?.setAttribute(
      'transform',
      translateAlong(P, [hingeX(theta) - HINGE_REST, 0, 0]),
    );
  };

  const startBusy = () => {
    const s = sim.current;
    if (s.busy > 0) return;
    s.busy = BUSY;
    s.updates = 0;
    s.nextFrame = BUSY_FRAME;
    setBusy(true);
    say(readouts.busy());
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    if (calm || !s.playing) {
      draw('ui', s.theta);
      draw('js', s.jsTheta);
      return false;
    }
    s.clock += dt;
    s.theta += OMEGA * dt;

    if (s.busy > 0) {
      s.busy -= dt;
      s.nextFrame -= dt;
      s.tape += dt * 30;
      // JS gets one frame out between chunks of work, then stalls again.
      if (s.nextFrame <= 0 && s.busy > 0) {
        s.nextFrame += BUSY_FRAME;
        s.jsTheta = s.theta;
        s.jsBlink = 1;
        s.updates += 1;
      }
      if (s.busy <= 0) {
        s.busy = 0;
        setBusy(false);
        say(readouts.done(BUSY_FRAMES - s.updates));
      }
    } else {
      s.jsTheta = s.theta;
    }
    draw('ui', s.theta);
    draw('js', s.jsTheta);

    const busyNow = s.busy > 0;
    s.jsBlink = Math.max(0, s.jsBlink - dt * 5);
    refs.stop.current.js?.setAttribute(
      'opacity',
      (busyNow ? 0.12 + 0.88 * s.jsBlink : 0.9).toFixed(3),
    );
    refs.stop.current.ui?.setAttribute('opacity', '0.9');
    if (jsLampRef.current) {
      jsLampRef.current.setAttribute('class', busyNow ? 'af-red' : 'af-head');
      jsLampRef.current.setAttribute('opacity', busyNow ? '1' : '0.15');
    }
    if (tapeRef.current) {
      tapeRef.current.style.strokeDashoffset = (-s.tape).toFixed(2);
      tapeRef.current.style.opacity = busyNow ? '1' : '0';
    }

    // Idle tour: JavaScript gets busy every few seconds until touched.
    if (!s.touched && !busyNow) {
      s.idle += dt;
      if (s.idle > 3.2) {
        s.idle = 0;
        startBusy();
      }
    }
    return true;
  };

  const kick = useLoop(tick, inView);

  const act = (run: () => void) => {
    sim.current.touched = true;
    run();
    kick();
  };

  const parse = () =>
    act(() => {
      const s = sim.current;
      if (!s.playing) {
        s.playing = true;
        setPlaying(true);
      }
      startBusy();
    });

  const toggle = () =>
    act(() => {
      const s = sim.current;
      s.playing = !s.playing;
      setPlaying(s.playing);
      if (!s.playing) say(readouts.paused());
      else say(readouts.rest());
    });

  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'b') {
      event.preventDefault();
      parse();
    } else if (event.key === 'p') {
      event.preventDefault();
      toggle();
    }
  };

  React.useEffect(() => {
    if (asksForStillness()) {
      sim.current.touched = true;
      sim.current.playing = false;
      setPlaying(false);
      say(readouts.paused());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rig = (lane: Lane) => {
    const art = LANES[lane];
    const crank = crankOf(lane, 0);
    return (
      <g key={lane}>
        <Housing lane={lane} />
        {lane === 'js' ? (
          <>
            {READER_ART}
            <path
              ref={tapeRef}
              className="af-ui-lit ra-tape"
              d={READER.run}
              style={{ opacity: 0 }}
            />
          </>
        ) : null}
        <circle
          ref={lane === 'js' ? jsLampRef : undefined}
          className="af-head"
          cx={art.lamp[0].toFixed(2)}
          cy={art.lamp[1].toFixed(2)}
          r={0.9}
          opacity={lane === 'js' ? 0.15 : 0.9}
        />
        <Rail lane={lane} />
        <path
          ref={(node) => void (refs.arm.current[lane] = node)}
          className="iso-line ra-arm"
          data-tone="mid"
          d={crank.arm}
        />
        <Dots points={[art.hub]} size={0.8} tone="mid" />
        <path
          ref={(node) => void (refs.rod.current[lane] = node)}
          className="iso-line ra-rod"
          data-tone={lane === 'ui' ? 'lit' : 'hi'}
          d={crank.rod}
        />
        <circle
          ref={(node) => void (refs.pin.current[lane] = node)}
          className="af-head"
          cx={crank.pin[0].toFixed(2)}
          cy={crank.pin[1].toFixed(2)}
          r={1}
        />
        <g ref={(node) => void (refs.car.current[lane] = node)}>
          <Carriage lane={lane} />
        </g>
        <Stop lane={lane} />
        <g ref={(node) => void (refs.stop.current[lane] = node)} opacity={0.9}>
          <Dots points={[art.stopLamp]} size={0.9} tone="hi" />
        </g>
      </g>
    );
  };

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Make the JavaScript thread busy parsing a large response. Press P to pause."
        onClick={parse}
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
          {rig('js')}
          {rig('ui')}
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={parse} disabled={busy}>
          Parse a large response
        </button>
        <button type="button" onClick={toggle}>
          {playing ? 'Pause' : 'Play'}
        </button>
      </Controls>
    </div>
  );
}

export function ReanimatedAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Why Reanimated stays smooth"
        hint="Tap to busy the JS thread · P pause"
        readout={readouts.rest()}
        keys={[
          { label: 'Worklet on the UI thread', mark: 'lit' },
          { label: 'setState on the JS thread', mark: 'raised' },
          { label: 'JS thread busy', mark: 'red' },
        ]}
        caption="Both carriages run the same animation. The back one is driven from the JavaScript thread, the way a setState animation is: while JavaScript parses a large response it can only get a frame out between chunks of work, so the carriage stalls and jumps. The front one is driven by a worklet on the UI thread, reading a shared value, so its style is recomputed natively every frame and it never misses a beat. Gesture Handler delivers touches on that same thread, so drags track the finger without a round trip."
      >
        <ReanimatedBench />
      </Plate>
    </div>
  );
}

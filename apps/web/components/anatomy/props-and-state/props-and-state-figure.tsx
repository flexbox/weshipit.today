import * as React from 'react';
import { pathOf } from '../kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../kit/live';
import { BenchArt, Cable, Controls, HousingArt, Runner } from '../bench';
import { hideRun, runAlong } from '../parts';
import { useScheduler } from '../sim';
import {
  BENCH,
  CABLES,
  CHILD_ART,
  HEIGHT,
  PARENT_ART,
  WIDTH,
  knobPointer,
} from './geometry';
import { NAMES, readouts } from './model';

const CABLE_D = CABLES.map((cable) => pathOf(cable));

function Window({
  caption,
  tone = 'hi',
  value,
  win,
}: {
  win: { frame: string; text: string; caption: string };
  value: string;
  caption: string;
  tone?: 'hi' | 'lo' | 'red';
}) {
  return (
    <>
      <path
        className={tone === 'red' ? 'ps-window ps-window-red' : 'ps-window'}
        d={win.frame}
      />
      <g transform={win.text}>
        <text
          className={tone === 'lo' ? 'af-mono er-url' : 'af-mono'}
          fontSize={3.2}
          y={1}
        >
          {value}
        </text>
      </g>
      <FaceText transform={win.caption} size={2.4} tone="lo">
        {caption}
      </FaceText>
    </>
  );
}

/* ---------- Simulation ---------- */

interface Sim {
  name: number;
  knob: number;
  count: number;
  lifted: boolean;
  lamps: number[];
  blocked: number;
  pulses: Array<{ t: number; dir: 1 | -1 } | null>;
}

type Action = 'prop' | 'state' | 'write' | 'lift';
const TOUR: Action[] = [
  'state',
  'state',
  'prop',
  'write',
  'lift',
  'state',
  'prop',
  'lift',
];
const SEND = 0.7;

const LABEL =
  'Props and state drawn as three housings on a bench. A Parent at the back has a knob and a window showing the name it passes down. Two cables carry that prop to Counter A and Child B in front, whose name windows are marked with a padlock: props are read-only. Counter A also has its own count window: state it owns. Turning the Parent’s knob sends a pulse down both cables and both children’s re-render lamps flash. Counter A’s setCount only flashes A. If Child B tries to write its prop, the window flashes red. Lifting the state moves count into the Parent: then both children show it as a prop, and A tapping sends a pulse up to the Parent, which re-renders all three.';

export function PropsStateBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      blocked: 0,
      count: 0,
      knob: 0,
      lamps: [0, 0, 0],
      lifted: false,
      name: 0,
      pulses: [null, null],
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const lampRefs = React.useRef<Array<SVGCircleElement | null>>([]);
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);
  const knobRef = React.useRef<SVGPathElement>(null);

  const down = (then: () => void) => {
    const s = sim.current;
    s.pulses = [
      { dir: 1, t: 0 },
      { dir: 1, t: 0 },
    ];
    sch.later(SEND, () => {
      s.lamps[1] = 1;
      s.lamps[2] = 1;
      then();
      rerender();
    });
  };

  const actions: Record<Action, () => void> = {
    lift: () => {
      const s = sim.current;
      s.lifted = !s.lifted;
      s.lamps = [1, 1, s.lifted ? 1 : 0];
      rerender();
      say(s.lifted ? readouts.lifted(s.count) : readouts.lowered());
      sch.later(0.5, () => undefined);
    },
    prop: () => {
      const s = sim.current;
      s.name = (s.name + 1) % NAMES.length;
      s.lamps[0] = 1;
      rerender();
      down(() => say(readouts.prop(NAMES[s.name])));
    },
    state: () => {
      const s = sim.current;
      if (!s.lifted) {
        s.count += 1;
        s.lamps[1] = 1;
        rerender();
        say(readouts.state(s.count));
        sch.later(0.4, () => undefined);
        return;
      }
      // Lifted: A calls the Parent's setter; the new count comes back down as a prop.
      s.pulses[0] = { dir: -1, t: 0 };
      sch.later(SEND, () => {
        s.count += 1;
        s.lamps[0] = 1;
        rerender();
        down(() => say(readouts.liftedTap(s.count)));
      });
    },
    write: () => {
      const s = sim.current;
      s.blocked = 1;
      rerender();
      say(readouts.blocked());
      sch.later(0.8, () => {
        s.blocked = 0;
        rerender();
      });
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    s.lamps.forEach((value, index) => {
      s.lamps[index] = follow(value, 0, dt, 0.4, calm);
      moving ||= s.lamps[index] > 0.01;
      lampRefs.current[index]?.setAttribute(
        'opacity',
        (0.12 + 0.88 * s.lamps[index]).toFixed(3),
      );
    });
    s.pulses.forEach((pulse, index) => {
      const run = runRefs.current[index];
      if (pulse) {
        pulse.t += calm ? 1 : dt / SEND;
        if (pulse.t >= 1) s.pulses[index] = null;
      }
      const live = s.pulses[index];
      if (live && run) {
        runAlong(run, headRefs.current[index], live.t, live.dir);
        moving = true;
      } else hideRun(run, headRefs.current[index]);
    });
    const angle = -1 + s.name * 0.7;
    s.knob = follow(s.knob, angle, dt, 0.1, calm);
    knobRef.current?.setAttribute('d', knobPointer(s.knob));
    moving ||= s.knob !== angle;

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
      ' ': 'state',
      Enter: 'state',
      l: 'lift',
      p: 'prop',
      s: 'state',
      w: 'write',
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
  const name = NAMES[s.name];

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Tap Counter A. Press P to change the parent's prop, W to make Child B write its prop, L to lift the state up."
        onClick={() => act('state')}
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
          <HousingArt art={PARENT_ART}>
            <Line d={PARENT_ART.lampRing} tone="lo" />
            <Solid paths={PARENT_ART.knob} tone="mid" crease="none" />
            <Line d={PARENT_ART.knobKnurl} tone="faint" />
            <Line d={PARENT_ART.knobCap} tone="lo" />
          </HousingArt>
          <FaceText transform={PARENT_ART.label} size={3} tone="mid">
            Parent
          </FaceText>
          <Window win={PARENT_ART.name} caption="name" value={`"${name}"`} />
          <Window
            win={PARENT_ART.count}
            caption="count (state)"
            value={s.lifted ? String(s.count) : '—'}
            tone={s.lifted ? 'hi' : 'lo'}
          />
          <path
            ref={knobRef}
            className="iso-line af-pointer"
            data-tone="lit"
            d={knobPointer(s.knob)}
          />
          <circle
            ref={(node) => void (lampRefs.current[0] = node)}
            className="af-head"
            cx={PARENT_ART.lamp[0].toFixed(2)}
            cy={PARENT_ART.lamp[1].toFixed(2)}
            r={0.85}
            opacity={0.12}
          />
          {PARENT_ART.sockets.map((socket, index) => (
            <g key={index}>
              <Solid paths={socket.shell} tone="mid" crease="none" />
              <Line d={socket.mouth} tone="lo" />
            </g>
          ))}
          {CABLE_D.map((d, index) => (
            <g key={index}>
              <Cable d={d} />
              <Runner
                d={d}
                runRef={(node) => void (runRefs.current[index] = node)}
                headRef={(node) => void (headRefs.current[index] = node)}
              />
            </g>
          ))}
          {CHILD_ART.map((art, index) => {
            const isA = index === 0;
            const propValue = s.lifted ? `${name} · ${s.count}` : `"${name}"`;
            return (
              <g key={index}>
                <HousingArt art={art}>
                  <Line d={art.lampRing} tone="lo" />
                </HousingArt>
                <FaceText transform={art.label} size={3} tone="mid">
                  {isA ? 'Counter A' : 'Child B'}
                </FaceText>
                <Window
                  win={art.prop}
                  caption={s.lifted ? 'props' : 'props.name'}
                  value={propValue}
                  tone={!isA && s.blocked ? 'red' : 'hi'}
                />
                <Line d={art.lock} tone={!isA && s.blocked ? 'red' : 'mid'} />
                {isA ? (
                  <Window
                    win={art.state}
                    caption="state"
                    value={s.lifted ? '—' : `count ${s.count}`}
                    tone={s.lifted ? 'lo' : 'hi'}
                  />
                ) : (
                  <Window win={art.state} caption="state" value="—" tone="lo" />
                )}
                <circle
                  ref={(node) => void (lampRefs.current[index + 1] = node)}
                  className="af-head"
                  cx={art.lamp[0].toFixed(2)}
                  cy={art.lamp[1].toFixed(2)}
                  r={0.85}
                  opacity={0.12}
                />
              </g>
            );
          })}
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('state')} disabled={locked}>
          Tap Counter A
        </button>
        <button type="button" onClick={() => act('prop')} disabled={locked}>
          Parent: new name
        </button>
        <button type="button" onClick={() => act('write')} disabled={locked}>
          B writes its prop
        </button>
        <button
          type="button"
          onClick={() => act('lift')}
          disabled={locked}
          aria-pressed={s.lifted}
        >
          {s.lifted ? 'Move state back' : 'Lift state up'}
        </button>
      </Controls>
    </div>
  );
}

export function PropsStateAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Where data lives"
        hint="Tap A · P new prop · L lift state"
        readout={readouts.rest()}
        keys={[
          { label: 'Prop on its way down', mark: 'lit' },
          { label: 'Component', mark: 'raised' },
          { label: 'Write to a prop: refused', mark: 'red' },
        ]}
        caption="Props come down from the parent and are read-only: a child never writes to them, and a new prop re-renders the child. State is owned by the component that calls useState, and its setter re-renders that component. When two components need the same value, lift the state to their closest common parent and pass it down to both as a prop; the child then asks the parent to change it, through a callback. A value that changes without needing a re-render belongs in a ref."
      >
        <PropsStateBench />
      </Plate>
    </div>
  );
}

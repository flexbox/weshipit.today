import * as React from 'react';
import { pathOf, solidSvg } from '../kit/iso-kit';
import { FaceText, Line, Plate, Solid, Dots } from '../kit/draw';
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
  BOARD_ART,
  CABLES,
  DOCK_LABELS,
  FORME_ART,
  FORME_INNER,
  HEIGHT,
  NODE_ART,
  PHONES,
  SOCKETS,
  WIDTH,
  blockOf,
} from './geometry';
import { IMAGE_HEIGHTS, NODES, layoutOf, readouts } from './model';

const CABLE_D = CABLES.map((cable) => pathOf(cable));
const SW = PHONES[0].sw;
const K = SW / FORME_INNER.w;

const STATIC = (
  <g>
    <Solid
      paths={BOARD_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={BOARD_ART.seam} tone="faint" />}
    />
    <Line d={BOARD_ART.edges} tone="mid" />
    <Dots points={BOARD_ART.screws} size={0.45} tone="mid" />
    <FaceText transform={BOARD_ART.label} size={2.6} tone="lo">
      React tree
    </FaceText>
    <Solid paths={BOARD_ART.socket} tone="mid" crease="none" />
    <Solid paths={NODE_ART.root} tone="hi" crease="lo" />
    <Solid paths={FORME_ART.base} tone="lo" crease="faint" />
    <Line d={FORME_ART.floor} tone="faint" />
    <Solid paths={FORME_ART.back} tone="mid" crease="none" />
    <Solid paths={FORME_ART.left} tone="mid" crease="none" />
  </g>
);

const FORME_FRONT = (
  <g>
    <Solid paths={FORME_ART.right} tone="mid" crease="none" />
    <Solid paths={FORME_ART.front} tone="mid" crease="none" />
    <FaceText transform={FORME_ART.label} size={2.4} tone="mid">
      C++ · Yoga
    </FaceText>
    {FORME_ART.sockets.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="none" />
    ))}
  </g>
);

interface Sim {
  ys: number[];
  image: number;
  changed: number;
  flash: number[];
  measure: number;
  heights: number[];
  pulses: Array<number>;
}

type Action = 'update' | 'measure';
const TOUR: Action[] = ['update', 'measure', 'update', 'update', 'measure'];
const SEND = 0.7;

const LABEL =
  'Fabric drawn as three stations. A pegboard holds the React element tree: a root with Header, Image and Button. A cable runs to a C++ forme, a tray where Yoga lays out one block per view. Two cables run on to two phones, iOS and Android, which show the same layout as real host views, UIView and ViewGroup. Updating state lights the Image node; a pulse reaches the forme, where the Image block grows and Yoga moves the Button down; pulses then reach both phones and only those views change on screen. Measuring reads the Image block’s layout at once, synchronously.';

export function FabricBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current) {
    const layout = layoutOf(IMAGE_HEIGHTS[0]);
    sim.current = {
      changed: -1,
      flash: [0, 0, 0],
      heights: layout.map((b) => b.h),
      image: 0,
      measure: 0,
      pulses: [-1, -1, -1],
      ys: layout.map((b) => b.y),
    };
  }
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const blockRefs = React.useRef<Array<SVGGElement | null>>([]);
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);
  const flashRefs = React.useRef<Array<SVGRectElement | null>>([]);
  const [screen, setScreen] = React.useState(layoutOf(IMAGE_HEIGHTS[0]));

  const actions: Record<Action, () => void> = {
    measure: () => {
      const s = sim.current;
      s.measure = 1;
      rerender();
      const box = layoutOf(IMAGE_HEIGHTS[s.image])[1];
      say(readouts.measured(box.h, box.y));
      sch.later(0.8, () => {
        s.measure = 0;
        rerender();
      });
    },
    update: () => {
      const s = sim.current;
      s.image = (s.image + 1) % IMAGE_HEIGHTS.length;
      s.changed = 1;
      s.pulses[0] = 0;
      rerender();
      say(readouts.commit(IMAGE_HEIGHTS[s.image]));
      sch.later(SEND + 0.6, () => {
        s.pulses[1] = 0;
        s.pulses[2] = 0;
        sch.later(SEND, () => {
          setScreen(layoutOf(IMAGE_HEIGHTS[s.image]));
          s.flash = [1, 1, 1];
          s.changed = -1;
          rerender();
          say(readouts.mounted());
        });
      });
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    // The forme re-lays out once the first pulse has arrived.
    const target =
      s.pulses[0] < 0
        ? layoutOf(IMAGE_HEIGHTS[s.image])
        : layoutOf(
            IMAGE_HEIGHTS[
              (s.image + IMAGE_HEIGHTS.length - 1) % IMAGE_HEIGHTS.length
            ],
          );
    target.forEach((box, i) => {
      s.heights[i] = follow(s.heights[i], box.h, dt, 0.12, calm);
      s.ys[i] = follow(s.ys[i], box.y, dt, 0.12, calm);
      moving ||= s.heights[i] !== box.h || s.ys[i] !== box.y;
      const node = blockRefs.current[i];
      if (node)
        node.innerHTML = solidSvg(blockOf(s.ys[i], s.heights[i]), {
          crease: 'lo',
          lit: i === 1 && (s.changed === 1 || s.measure > 0),
          tone: 'hi',
        });
    });
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
    s.flash = s.flash.map((v) => follow(v, 0, dt, 0.4, calm));
    flashRefs.current.forEach((node, i) =>
      node?.setAttribute('opacity', (0.5 * s.flash[i]).toFixed(3)),
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
      ' ': 'update',
      Enter: 'update',
      m: 'measure',
      u: 'update',
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

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Update state. Press M to measure the image synchronously."
        onClick={() => act('update')}
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
          {STATIC}
          {NODE_ART.children.map((paths, i) => (
            <Solid
              key={i}
              paths={paths}
              tone="hi"
              crease="lo"
              lit={i === 1 && s.changed === 1}
            />
          ))}
          {NODES.map((_, i) => (
            <g key={i} ref={(node) => void (blockRefs.current[i] = node)} />
          ))}
          {FORME_FRONT}
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
          {PHONES.map((phone, p) => (
            <g key={p}>
              <PhoneBack phone={phone} />
              <PhoneScreen phone={phone} id={`fb-screen-${p}`}>
                {screen.map((box, i) => (
                  <rect
                    key={i}
                    className={
                      i === 0 ? 'rn-header' : i === 1 ? 'jx-view' : 'sa-button'
                    }
                    x={1.6}
                    y={box.y * K + 3}
                    width={SW - 3.2}
                    height={box.h * K}
                    rx={i === 2 ? 2 : 0.6}
                  />
                ))}
                <rect
                  ref={(node) => void (flashRefs.current[p] = node)}
                  className="af-flash"
                  x={1.6}
                  y={screen[1].y * K + 3}
                  width={SW - 3.2}
                  height={screen[1].h * K}
                  opacity={0}
                />
              </PhoneScreen>
              <PhoneFront phone={phone} />
              <Socket socket={SOCKETS[p]} />
              <FaceText transform={DOCK_LABELS[p]} size={2.6} tone="mid">
                {p ? 'Android · ViewGroup' : 'iOS · UIView'}
              </FaceText>
            </g>
          ))}
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('update')} disabled={locked}>
          Update state
        </button>
        <button type="button" onClick={() => act('measure')} disabled={locked}>
          Measure Image (sync)
        </button>
      </Controls>
    </div>
  );
}

export function FabricAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How Fabric renders"
        hint="Tap to update · M measure"
        readout={readouts.rest()}
        keys={[
          { label: 'The view that changed', mark: 'lit' },
          { label: 'Laid-out view', mark: 'raised' },
          { label: 'Update on its way', mark: 'edge' },
        ]}
        caption="Fabric is React Native's renderer. Your element tree becomes a shadow tree in C++ shared by iOS and Android, Yoga lays it out there, and a diff finds what changed, so only those views are mounted, as genuine host views: UIView on iOS, ViewGroup on Android. Because it sits on JSI, JavaScript can read layout synchronously, and it supports React's concurrent features. It has been the default since React Native 0.76."
      >
        <FabricBench />
      </Plate>
    </div>
  );
}

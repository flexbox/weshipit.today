/**
 * The host platform supplies the real views. One <View> resolves to a
 * UIView on iOS and a ViewGroup on Android (maintained by Meta), a <div> with
 * React Native Web, and a native view on Windows and macOS (maintained by
 * Microsoft).
 */
import * as React from 'react';
import {
  boxCorners,
  cylinder,
  depthOf,
  fitProjection,
  lineOnTop,
  pathOf,
  ring,
  sideMatrix,
  slabOf,
  topMatrix,
  type Plan,
  type Point3,
} from '../anatomy/kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../anatomy/kit/draw';
import {
  asksForStillness,
  follow,
  useInView,
  useLoop,
  useReadout,
} from '../anatomy/kit/live';
import { BenchArt, Cable, Controls, Runner } from '../anatomy/bench';
import {
  BASE_H,
  FOOT_H,
  benchOf,
  hideRun,
  routeOf,
  runAlong,
} from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';

const HOSTS = [
  { by: 'Meta', name: 'iOS', view: 'UIView' },
  { by: 'Meta', name: 'Android', view: 'ViewGroup' },
  { by: 'React Native Web', name: 'Web', view: '<div>' },
  { by: 'Microsoft', name: 'Windows', view: 'XAML panel' },
  { by: 'Microsoft', name: 'macOS', view: 'NSView' },
] as const;

const WIDTH = 640;
const HEIGHT = 380;
const BASE: Plan = { d: 124, r: 10, w: 220, x: -110, y: -84 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 60, r: 0, w: 180, x: -90, y: -76 }, 0, 40),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 48, elevation: 34, pad: 18 },
);
const solid = (plan: Plan, z: number, h: number, steps = 3, bevel = 0.4) =>
  slabOf(plan, z, h, P, steps, bevel);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 11, r: 2, w: 40, x: 50, y: 22 },
  ruler: { d: 5, r: 1, w: 120, x: -96, y: 30 },
});

const CENTER: [number, number] = [0, 6];
const TABLE_TOP = 5;
/** Hosts stand in a row behind the turntable; the pointer aims at each. */
const HOST_XY = HOSTS.map((_, i) => [-84 + i * 42, -42] as [number, number]);
function angleOf(i: number) {
  return Math.atan2(HOST_XY[i][1] - CENTER[1], HOST_XY[i][0] - CENTER[0]);
}
const TABLE = {
  base: cylinder(CENTER[0], CENTER[1], 14, 0, 2, P, 48, 0.4),
  block: solid(
    { d: 9, r: 1.2, w: 9, x: CENTER[0] - 4.5, y: CENTER[1] - 4.5 },
    TABLE_TOP,
    6,
    3,
    0.6,
  ),
  blockFace: topMatrix([CENTER[0] - 3.8, CENTER[1] + 1], TABLE_TOP + 6, P, 'x'),
  ring: ring(CENTER[0], CENTER[1], 9.4, TABLE_TOP, P, 40),
  ticks: HOSTS.map((_, i) => {
    const a = angleOf(i);
    return lineOnTop(
      [CENTER[0] + Math.cos(a) * 10, CENTER[1] + Math.sin(a) * 10],
      [CENTER[0] + Math.cos(a) * 11.6, CENTER[1] + Math.sin(a) * 11.6],
      TABLE_TOP,
      P,
    );
  }).join(''),
  top: cylinder(CENTER[0], CENTER[1], 12, 2, TABLE_TOP - 2, P, 48, 0.6),
};

const HOST_ART = HOSTS.map((_, i) => {
  const [cx, cy] = HOST_XY[i];
  const base: Plan = { d: 10, r: 1.4, w: 26, x: cx - 13, y: cy - 5 };
  const panel: Plan = { d: 2, r: 0.4, w: 24, x: cx - 12, y: cy - 3 };
  const face = panel.y + panel.d;
  return {
    base: solid(base, 0, 3, 3, 0.4),
    end: [cx, cy + 5, 1.6] as Point3,
    lamp: [cx + 9, face + 2.4] as [number, number],
    panel: solid(panel, 3, 22, 2, 0.3),
    screen: sideMatrix([panel.x + 1.6, face], 22, P, 'left'),
  };
});
const CABLES = HOST_ART.map((host, i) => {
  const a = angleOf(i);
  const start: Point3 = [
    CENTER[0] + Math.cos(a) * 14.4,
    CENTER[1] + Math.sin(a) * 14.4,
    1,
  ];
  return pathOf(
    routeOf(P, [start, [host.end[0], host.end[1] + 6, 1.3], host.end], 5),
  );
});
const pointerOf = (a: number) =>
  lineOnTop(
    [CENTER[0], CENTER[1]],
    [CENTER[0] + Math.cos(a) * 9, CENTER[1] + Math.sin(a) * 9],
    TABLE_TOP + 0.05,
    P,
  );
const PANEL_W = 20.8;
/** Paint the host stations far to near. */
const ORDER = HOSTS.map((_, i) => i).sort(
  (a, b) =>
    depthOf([HOST_ART[a].end[0], HOST_ART[a].end[1], 0], P) -
    depthOf([HOST_ART[b].end[0], HOST_ART[b].end[1], 0], P),
);

const LABEL =
  'Host platforms drawn as a turntable carrying one View block, with five host stations on an arc behind it, each cabled to the turntable: iOS, Android, Web, Windows and macOS. The pointer on the turntable swings to a host and a pulse runs down that cable; the host’s panel lights and shows what the same View becomes there, a UIView, a ViewGroup, a div, a XAML panel or an NSView, and who maintains that host: Meta for iOS and Android, partners for the rest.';

export function HostPlatformBench() {
  const sim = React.useRef({ angle: angleOf(0), host: 0, lit: 0, pulse: -1 });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const pointerRef = React.useRef<SVGPathElement>(null);
  const runRefs = React.useRef<Array<SVGPathElement | null>>([]);
  const headRefs = React.useRef<Array<SVGGElement | null>>([]);

  const choose = (host: number) => {
    const s = sim.current;
    s.host = host;
    s.lit = -1;
    rerender();
    sch.later(0.5, () => {
      s.pulse = 0;
      sch.later(0.7, () => {
        s.lit = host;
        rerender();
        const h = HOSTS[host];
        say(`<View> on ${h.name} → ${h.view} · maintained by ${h.by}`);
      });
    });
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    const goal = angleOf(s.host);
    s.angle = follow(s.angle, goal, dt, 0.12, calm);
    pointerRef.current?.setAttribute('d', pointerOf(s.angle));
    let moving = s.angle !== goal;
    if (s.pulse >= 0) {
      s.pulse = calm ? -1 : s.pulse + dt / 0.7;
      if (s.pulse >= 1) s.pulse = -1;
    }
    HOSTS.forEach((_, i) => {
      if (s.pulse >= 0 && i === s.host && runRefs.current[i])
        runAlong(runRefs.current[i]!, headRefs.current[i], s.pulse, 1);
      else hideRun(runRefs.current[i], headRefs.current[i]);
    });
    moving ||= s.pulse >= 0;
    const touring = sch.tourStep(dt, !moving && !pending, calm, 1.4, (i) =>
      choose((i + 1) % HOSTS.length),
    );
    return moving || pending || touring;
  };
  const kick = useLoop(tick, inView);
  const act = (host: number) => {
    sch.touch();
    if (sch.pending) return;
    choose(host);
    kick();
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
        aria-label="Send the View to the next host. Press 1 to 5 to pick a host."
        onClick={() => act((s.host + 1) % HOSTS.length)}
        onKeyDown={(event) => {
          const n = Number(event.key);
          if (n >= 1 && n <= HOSTS.length) act(n - 1);
          else if (event.key === ' ' || event.key === 'Enter')
            act((s.host + 1) % HOSTS.length);
          else return;
          event.preventDefault();
        }}
      >
        <svg
          className="iso-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={LABEL}
          focusable="false"
        >
          <BenchArt bench={BENCH} />
          {ORDER.map((i) => HOST_ART[i]).map((host, k) => {
            const i = ORDER[k];
            return (
              <g key={i}>
                <Solid paths={host.base} tone="mid" crease="faint" />
                <Solid
                  paths={host.panel}
                  tone="mid"
                  crease="faint"
                  lit={i === s.lit}
                />
                <g transform={host.screen}>
                  <rect
                    className={i === s.lit ? 'hp-screen-lit' : 'af-screen'}
                    width={PANEL_W}
                    height={19}
                    rx={0.8}
                  />
                  <text className="af-mono" x={1.4} y={4.4} fontSize={3}>
                    {HOSTS[i].name}
                  </text>
                  <text
                    className={i === s.lit ? 'af-mono' : 'af-mono er-url'}
                    x={1.4}
                    y={11}
                    fontSize={2.8}
                  >
                    {HOSTS[i].view}
                  </text>
                  <text
                    className="af-mono er-url"
                    x={1.4}
                    y={16.4}
                    fontSize={2}
                  >
                    {HOSTS[i].by}
                  </text>
                </g>
              </g>
            );
          })}
          {CABLES.map((d, i) => (
            <g key={i}>
              <Cable d={d} />
              <Runner
                d={d}
                runRef={(node) => void (runRefs.current[i] = node)}
                headRef={(node) => void (headRefs.current[i] = node)}
              />
            </g>
          ))}
          <Solid paths={TABLE.base} tone="lo" crease="none" />
          <Solid paths={TABLE.top} tone="mid" crease="faint" />
          <Line d={TABLE.ring} tone="lo" />
          <Line d={TABLE.ticks} tone="mid" />
          <path
            ref={pointerRef}
            className="iso-line af-pointer"
            data-tone="lit"
            d={pointerOf(s.angle)}
          />
          <Solid paths={TABLE.block} tone="hi" crease="lo" lit />
          <FaceText transform={TABLE.blockFace} size={2.4} tone="mid">
            {'<View>'}
          </FaceText>
        </svg>
      </div>
      <Controls>
        {HOSTS.map((h, i) => (
          <button
            key={h.name}
            type="button"
            onClick={() => act(i)}
            disabled={locked}
            aria-pressed={s.host === i}
          >
            {h.name}
          </button>
        ))}
      </Controls>
    </div>
  );
}

export function HostPlatformAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="One View, many hosts"
        hint="Tap for the next host · 1–5 pick one"
        readout="<View> on iOS → UIView · maintained by Meta"
        keys={[
          { label: 'Your component', mark: 'lit' },
          { label: 'Host platform', mark: 'raised' },
          { label: 'Rendering to this host', mark: 'edge' },
        ]}
        caption="React Native is platform-agnostic: the host platform supplies the real views, the threads and the APIs. A View is not one thing but a host component, resolved to a UIView on iOS, a ViewGroup on Android, a div with React Native Web, and native views on Windows and macOS. Meta maintains iOS and Android; Microsoft maintains Windows and macOS, and partners maintain tvOS, visionOS and the web. Handle differences with Platform or platform files, and reach what React Native does not wrap with a native module."
      >
        <HostPlatformBench />
      </Plate>
    </div>
  );
}

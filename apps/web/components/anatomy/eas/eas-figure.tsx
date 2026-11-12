/**
 * EAS is three hosted services. EAS Build compiles signed .ipa and .aab
 * binaries in the cloud from a build profile in eas.json (development,
 * preview, production). EAS Submit uploads a finished binary to App Store
 * Connect and Google Play. EAS Update ships JavaScript-only changes over the
 * air to installed apps.
 */
import * as React from 'react';
import {
  boxCorners,
  cylinder,
  fitProjection,
  lineOnTop,
  pathOf,
  ring,
  sideMatrix,
  slabOf,
  topMatrix,
  translateAlong,
  type Plan,
  type Point3,
} from '../kit/iso-kit';
import { FaceText, Line, Plate, Solid } from '../kit/draw';
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
import {
  BASE_H,
  FOOT_H,
  benchOf,
  facesOf,
  hideRun,
  housingOf,
  knurlOf,
  phoneOf,
  routeOf,
  runAlong,
} from '../parts';
import { useScheduler } from '../sim';

const PROFILES = ['development', 'preview', 'production'] as const;
type Profile = (typeof PROFILES)[number];
const OUTPUT: Record<Profile, string> = {
  development: 'dev build',
  preview: 'internal build',
  production: '.ipa + .aab',
};

const WIDTH = 640;
const HEIGHT = 380;
const BASE: Plan = { d: 104, r: 10, w: 282, x: -146, y: -66 };
const P = fitProjection(
  [
    ...boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...boxCorners({ d: 10, r: 0, w: 30, x: 86, y: -16 }, 0, 60),
  ],
  WIDTH,
  HEIGHT,
  { azimuth: 52, pad: 18 },
);
const F = facesOf(P);
const BENCH = benchOf(P, {
  base: BASE,
  label: { d: 10, r: 2, w: 40, x: -60, y: 26 },
  ruler: { d: 5, r: 1, w: 70, x: -136, y: 28 },
});

const REPO: Plan = { d: 26, r: 3, w: 32, x: -138, y: -50 };
const OVEN: Plan = { d: 34, r: 3, w: 44, x: -80, y: -58 };
const OVEN_TOP = 32;
const DIAL: [number, number] = [-48, -48];
const PAD: Plan = { d: 14, r: 1.5, w: 24, x: -70, y: -20 };
const BOXES: Plan[] = [
  { d: 18, r: 2, w: 24, x: 0, y: -58 },
  { d: 18, r: 2, w: 24, x: 30, y: -58 },
];
const PHONE = phoneOf(P, { margin: 6, sh: 44, sw: 24, x: 86, y: -16 });
const SOCKET = PHONE.socketAt(92);
const ART = {
  boxes: BOXES.map((b) => ({
    body: housingOf(P, b, 20),
    label: sideMatrix([b.x + 2, b.y + b.d], 6, P, 'left'),
    lamp: F.at([b.x + b.w - 4, b.y + b.d, 10]),
    slot: F.rectOnY(b.y + b.d, b.x + 6, b.x + b.w - 6, 14, 15.6),
  })),
  detents: PROFILES.map((_, i) => {
    const a = -0.9 + i * 0.9;
    return lineOnTop(
      [DIAL[0] + Math.sin(a) * 6.4, DIAL[1] - Math.cos(a) * 6.4],
      [DIAL[0] + Math.sin(a) * 8, DIAL[1] - Math.cos(a) * 8],
      OVEN_TOP,
      P,
    );
  }).join(''),
  dial: cylinder(DIAL[0], DIAL[1], 5, OVEN_TOP, 3, P, 32, 0.5),
  dialCap: ring(DIAL[0], DIAL[1], 3, OVEN_TOP + 3, P, 20),
  dialKnurl: knurlOf(P, DIAL[0], DIAL[1], 5, OVEN_TOP, OVEN_TOP + 3, 28, 0),
  door: F.rectOnY(OVEN.y + OVEN.d, OVEN.x + 4, OVEN.x + 30, 4, 20),
  oven: housingOf(P, OVEN, OVEN_TOP),
  ovenLabel: sideMatrix([OVEN.x + 3, OVEN.y + OVEN.d], OVEN_TOP - 3, P, 'left'),
  pad: slabOf(PAD, 0, 2, P, 3, 0.4),
  repo: housingOf(P, REPO, 18),
  repoLabel: sideMatrix([REPO.x + 3, REPO.y + REPO.d], 14, P, 'left'),
  token: slabOf(
    { d: 9, r: 1, w: 18, x: PAD.x + 3, y: PAD.y + 2.5 },
    2,
    3,
    P,
    3,
    0.4,
  ),
  tokenFace: topMatrix([PAD.x + 4.4, PAD.y + 8], 5, P, 'x'),
  window: F.rectOnY(OVEN.y + OVEN.d, OVEN.x + 8, OVEN.x + 26, 9, 16),
};
const pointerOf = (i: number) => {
  const a = -0.9 + i * 0.9;
  return lineOnTop(
    DIAL,
    [DIAL[0] + Math.sin(a) * 3.6, DIAL[1] - Math.cos(a) * 3.6],
    OVEN_TOP + 3.05,
    P,
  );
};
const route = (pts: Point3[]) => pathOf(routeOf(P, pts, 4));
const CABLES = {
  build: route([
    [REPO.x + REPO.w, -38, 3],
    [REPO.x + REPO.w + 5, -38, 1.3],
    [OVEN.x, -38, 3],
  ]),
  submitA: route([
    [PAD.x + PAD.w, -14, 1.6],
    [12, -14, 1.3],
    [12, BOXES[0].y + BOXES[0].d, 3],
  ]),
  submitB: route([
    [PAD.x + PAD.w, -9, 1.6],
    [42, -9, 1.3],
    [42, BOXES[1].y + BOXES[1].d, 3],
  ]),
  update: route([
    [REPO.x + 16, REPO.y + REPO.d, 3],
    [REPO.x + 16, 22, 1.3],
    [92, 22, 1.3],
    SOCKET.end,
  ]),
};

type Action = 'build' | 'submit' | 'update';
const TOUR: Action[] = ['build', 'build', 'build', 'submit', 'update'];

const LABEL =
  'EAS drawn as a bench with three lines. On the left, a repository housing. EAS Build is an oven fed from the repository, with a dial for the build profile in eas.json: development, preview or production; each build drops a signed binary on the pad in front of it. EAS Submit carries a production binary along two cables to an App Store mailbox and a Google Play mailbox. EAS Update is a separate cable from the repository straight to an installed phone, carrying JavaScript-only changes over the air.';

export function EasBench() {
  const sim = React.useRef({
    built: null as Profile | null,
    delivered: [false, false],
    dial: 0,
    profile: 0,
    pulses: { build: -1, submitA: -1, submitB: -1, update: -1 } as Record<
      string,
      number
    >,
    token: 0,
    tokenTarget: 0,
    version: 1,
  });
  const [, rerender] = React.useReducer((c: number) => c + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const runRefs = React.useRef<Record<string, SVGPathElement | null>>({});
  const headRefs = React.useRef<Record<string, SVGGElement | null>>({});
  const dialRef = React.useRef<SVGPathElement>(null);
  const tokenRef = React.useRef<SVGGElement>(null);

  const actions: Record<Action, () => void> = {
    build: () => {
      const s = sim.current;
      s.profile = s.built === null ? 0 : (s.profile + 1) % PROFILES.length;
      s.tokenTarget = 0;
      s.pulses.build = 0;
      rerender();
      sch.later(1.4, () => {
        s.built = PROFILES[s.profile];
        s.delivered = [false, false];
        s.tokenTarget = 1;
        rerender();
        say(
          `eas build --profile ${s.built} · ${OUTPUT[s.built]} · signed in the cloud`,
        );
      });
    },
    submit: () => {
      const s = sim.current;
      if (s.built !== 'production') {
        say(`eas submit needs a production build · build one first`);
        return;
      }
      s.pulses.submitA = 0;
      s.pulses.submitB = 0;
      sch.later(1, () => {
        s.delivered = [true, true];
        rerender();
        say(
          `eas submit · App Store Connect and Google Play received the binaries`,
        );
      });
    },
    update: () => {
      const s = sim.current;
      s.pulses.update = 0;
      sch.later(1.1, () => {
        s.version += 1;
        rerender();
        say(
          `eas update · JavaScript-only change reaches installed apps · no store review`,
        );
      });
    },
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    for (const key of Object.keys(s.pulses)) {
      const t = s.pulses[key];
      if (t < 0) {
        hideRun(runRefs.current[key], headRefs.current[key]);
        continue;
      }
      const next = calm ? 1 : t + dt / (key === 'build' ? 1.4 : 1);
      if (runRefs.current[key])
        runAlong(
          runRefs.current[key]!,
          headRefs.current[key],
          Math.min(1, next),
          1,
        );
      s.pulses[key] = next >= 1 ? -1 : next;
      moving = true;
    }
    s.dial = follow(s.dial, s.profile, dt, 0.1, calm);
    dialRef.current?.setAttribute('d', pointerOf(s.dial));
    s.token = follow(s.token, s.tokenTarget, dt, 0.12, calm);
    tokenRef.current?.setAttribute(
      'transform',
      translateAlong(P, [0, 0, 14 * (1 - s.token)]),
    );
    tokenRef.current?.setAttribute('opacity', s.token.toFixed(3));
    moving ||= s.dial !== s.profile || s.token !== s.tokenTarget;
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
  React.useEffect(() => {
    if (asksForStillness()) sch.touch();
  }, [sch]);
  const s = sim.current;
  const locked = sch.busy && sch.touched;
  const cable = (key: keyof typeof CABLES) => (
    <g key={key}>
      <Cable d={CABLES[key]} />
      <Runner
        d={CABLES[key]}
        runRef={(node) => void (runRefs.current[key] = node)}
        headRef={(node) => void (headRefs.current[key] = node)}
      />
    </g>
  );

  return (
    <div>
      <div
        ref={anchor}
        className="iso-stage af-stage"
        tabIndex={0}
        role="button"
        aria-label="Run a build with the next profile. Press S to submit, U to publish an update."
        onClick={() => act('build')}
        onKeyDown={(event) => {
          const map: Record<string, Action> = {
            ' ': 'build',
            b: 'build',
            Enter: 'build',
            s: 'submit',
            u: 'update',
          };
          const action = map[event.key];
          if (!action) return;
          event.preventDefault();
          act(action);
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
          {ART.boxes.map((box, i) => (
            <g key={i}>
              <HousingArt art={box.body}>
                <Line d={box.slot} tone="lo" />
              </HousingArt>
              <FaceText transform={box.label} size={2.4} tone="mid">
                {i ? 'Google Play' : 'App Store'}
              </FaceText>
              <circle
                className="af-head"
                cx={box.lamp[0].toFixed(2)}
                cy={box.lamp[1].toFixed(2)}
                r={0.9}
                opacity={s.delivered[i] ? 1 : 0.12}
              />
            </g>
          ))}
          <HousingArt art={ART.repo} />
          <FaceText transform={ART.repoLabel} size={2.8} tone="mid">
            repo
          </FaceText>
          {cable('build')}
          <HousingArt art={ART.oven}>
            <Line d={ART.door} tone="lo" />
            <path className="af-glass" d={ART.window} />
            <Line d={ART.detents} tone="mid" />
            <Solid paths={ART.dial} tone="mid" crease="none" />
            <Line d={ART.dialKnurl} tone="faint" />
            <Line d={ART.dialCap} tone="lo" />
          </HousingArt>
          <FaceText transform={ART.ovenLabel} size={3} tone="mid">
            EAS Build
          </FaceText>
          <path
            ref={dialRef}
            className="iso-line af-pointer"
            data-tone="lit"
            d={pointerOf(s.dial)}
          />
          {cable('submitB')}
          <Solid paths={ART.pad} tone="lo" crease="faint" />
          <g ref={tokenRef} opacity={0}>
            <Solid paths={ART.token} tone="hi" crease="lo" lit />
            <FaceText transform={ART.tokenFace} size={2.2} tone="mid">
              {s.built ? OUTPUT[s.built] : ''}
            </FaceText>
          </g>
          {cable('submitA')}
          {cable('update')}
          <PhoneBack phone={PHONE} />
          <PhoneScreen phone={PHONE} id="eas-screen">
            <rect className="rn-header" width={PHONE.sw} height={8} />
            <text
              className="af-mono"
              x={PHONE.sw / 2}
              y={5.6}
              fontSize={2.4}
              textAnchor="middle"
            >{`update ${s.version}`}</text>
            {[0, 1, 2].map((r) => (
              <rect
                key={r}
                className="af-ui-line"
                x={2.4}
                y={11 + r * 9}
                width={PHONE.sw - 4.8}
                height={7}
                rx={1}
              />
            ))}
          </PhoneScreen>
          <PhoneFront phone={PHONE} />
          <Socket socket={SOCKET} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('build')} disabled={locked}>
          eas build ({PROFILES[(s.built === null ? 0 : s.profile + 1) % 3]})
        </button>
        <button
          type="button"
          onClick={() => act('submit')}
          disabled={locked || s.built !== 'production'}
        >
          eas submit
        </button>
        <button type="button" onClick={() => act('update')} disabled={locked}>
          eas update
        </button>
      </Controls>
    </div>
  );
}

export function EasAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="Build, submit, update"
        hint="Tap to build · S submit · U update"
        readout="eas.json profiles: development, preview, production"
        keys={[
          { label: 'Signed binary', mark: 'lit' },
          { label: 'Service', mark: 'raised' },
          { label: 'Delivery on its way', mark: 'edge' },
        ]}
        caption="EAS, Expo Application Services, is hosted infrastructure for shipping React Native apps. EAS Build compiles and signs .ipa and .aab binaries in the cloud, managing certificates and provisioning profiles, so you don't need a Mac with the right Xcode. The build profile in eas.json picks what you get: development for a development build, preview for internal testing, production for the stores. EAS Submit uploads the production binary to App Store Connect and Google Play, and EAS Update sends JavaScript-only changes over the air."
      >
        <EasBench />
      </Plate>
    </div>
  );
}

import * as React from 'react';
import { pathOf, translateAlong } from '../anatomy/kit/iso-kit';
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
  PhoneBack,
  PhoneFront,
  PhoneScreen,
  Runner,
  Socket,
} from '../anatomy/bench';
import { hideRun, runAlong } from '../anatomy/parts';
import { useScheduler } from '../anatomy/sim';
import {
  BENCH,
  CABLE,
  CARD_ART,
  CARD_LIFT,
  CARD_XS,
  CAR_ART,
  DOCK_SOCKET,
  HEIGHT,
  P,
  PHONE_ART,
  RAIL_ART,
  TRAY_ART,
  WIDTH,
} from './geometry';
import { ADDED, FILES, match, readouts } from './model';

const CABLE_D = pathOf(CABLE);
const SW = PHONE_ART.sw;
const SH = PHONE_ART.sh;

const TRAY = (
  <g>
    <Solid
      paths={TRAY_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={TRAY_ART.seam} tone="faint" />}
    />
    <Solid paths={TRAY_ART.layout} tone="lo" crease="faint" />
    <FaceText transform={TRAY_ART.layoutLabel} size={2.6} tone="mid">
      _layout.tsx
    </FaceText>
    <Line d={TRAY_ART.slots} tone="lo" />
    <Dots points={TRAY_ART.screws} size={0.45} tone="mid" />
    <Solid paths={TRAY_ART.socket} tone="mid" crease="none" />
    <Line d={TRAY_ART.socketMouth} tone="lo" />
  </g>
);

const FOLDER_ART = (
  <g>
    <Solid paths={TRAY_ART.folder} tone="mid" crease="faint" />
    <FaceText transform={TRAY_ART.folderLabel} size={2.6} tone="mid">
      post/
    </FaceText>
  </g>
);

const RAIL = (
  <g>
    <Solid
      paths={RAIL_ART.body}
      tone="mid"
      crease="faint"
      inner={<Line d={RAIL_ART.seam} tone="faint" />}
    />
    <Line d={RAIL_ART.slot} tone="lo" />
    <Line d={RAIL_ART.marks} tone="mid" />
  </g>
);

const FileCard = React.memo(function FileCard({
  index,
  lit,
}: {
  index: number;
  lit: boolean;
}) {
  return (
    <>
      <Solid
        paths={CARD_ART.body}
        tone="hi"
        crease="lo"
        lit={lit}
        inner={<Line d={CARD_ART.seam} tone="faint" />}
      />
      <FaceText transform={CARD_ART.file} size={2.6} tone="mid">
        {FILES[index].file}
      </FaceText>
      <FaceText transform={CARD_ART.url} size={2.6} tone={lit ? 'hi' : 'lo'}>
        {FILES[index].url}
      </FaceText>
      <Line d={CARD_ART.rules} tone="faint" free />
    </>
  );
});

/* ---------- Simulation ---------- */

interface Sim {
  url: string;
  car: number;
  lit: number;
  files: number;
  pulse: number;
  flash: number;
  added: number;
  lift: number[];
  carTarget: number;
  liftTarget: number[];
  screen: { title: string; url: string; missing: boolean };
}

type Action = 'home' | 'settings' | 'deep' | 'profile' | 'add';
const URLS: Record<Exclude<Action, 'add'>, string> = {
  deep: '/post/42',
  home: '/',
  profile: '/profile',
  settings: '/settings',
};
const TOUR: Action[] = [
  'settings',
  'deep',
  'profile',
  'add',
  'profile',
  'home',
];

const LABEL =
  'Expo Router drawn as an app folder: a tray of file cards standing in slots, index.tsx, settings.tsx and post/[id].tsx in a post folder sleeve, with a _layout.tsx plate behind them all. Each card is engraved with its file name and the URL it serves. A router carriage on a rail in front shows a URL in its window and travels to the card that matches; the card lifts, a pulse runs down the cable to a phone, and the phone opens that screen. A deep link to /post/42 lands on the [id] card with id 42. /profile has no card until profile.tsx is added to the tray.';

export function ExpoRouterBench() {
  const sim = React.useRef<Sim>(null as unknown as Sim);
  if (!sim.current)
    sim.current = {
      added: 0,
      car: CARD_XS[0],
      carTarget: CARD_XS[0],
      files: ADDED,
      flash: 0,
      lift: FILES.map(() => 0),
      liftTarget: FILES.map(() => 0),
      lit: 0,
      pulse: -1,
      screen: { missing: false, title: 'Home', url: '/' },
      url: '/',
    };
  const [, rerender] = React.useReducer((count: number) => count + 1, 0);
  const { anchor, say } = useReadout<HTMLDivElement>();
  const inView = useInView(anchor);
  const sch = useScheduler();
  const carRef = React.useRef<SVGGElement>(null);
  const cardRefs = React.useRef<Array<SVGGElement | null>>([]);
  const runRef = React.useRef<SVGPathElement | null>(null);
  const headRef = React.useRef<SVGGElement | null>(null);
  const flashRef = React.useRef<SVGRectElement>(null);

  const open = (url: string) => {
    const s = sim.current;
    s.url = url;
    const hit = match(url, s.files);
    rerender();
    s.carTarget = hit ? CARD_XS[hit.file] : CARD_XS[ADDED];
    sch.later(0.8, () => {
      if (!hit) {
        s.lit = -1;
        s.screen = { missing: true, title: 'Unmatched', url };
        s.flash = 1;
        rerender();
        say(readouts.missing(url));
        return;
      }
      s.lit = hit.file;
      s.liftTarget[hit.file] = 1;
      s.pulse = 0;
      rerender();
      sch.later(0.75, () => {
        s.liftTarget[hit.file] = 0;
        s.screen = {
          missing: false,
          title: hit.id ? `Post ${hit.id}` : FILES[hit.file].title,
          url,
        };
        s.flash = 1;
        rerender();
        say(
          hit.id
            ? readouts.deep(url, hit.id)
            : readouts.open(url, FILES[hit.file].file),
        );
      });
    });
  };

  const actions: Record<Action, () => void> = {
    add: () => {
      const s = sim.current;
      if (s.files > ADDED) return;
      s.files = ADDED + 1;
      s.added = 1;
      rerender();
      say(readouts.added());
      sch.later(0.6, () => undefined);
    },
    deep: () => open(URLS.deep),
    home: () => open(URLS.home),
    profile: () => open(URLS.profile),
    settings: () => open(URLS.settings),
  };

  const tick = (dt: number, calm: boolean) => {
    const s = sim.current;
    const pending = sch.step(dt);
    let moving = false;
    s.car = follow(s.car, s.carTarget, dt, 0.16, calm);
    moving ||= s.car !== s.carTarget;
    carRef.current?.setAttribute('transform', translateAlong(P, [s.car, 0, 0]));
    s.added = follow(s.added, 0, dt, 0.1, calm);
    s.lift.forEach((value, index) => {
      s.lift[index] = follow(value, s.liftTarget[index], dt, 0.08, calm);
      moving ||= s.lift[index] !== s.liftTarget[index];
      const drop = index === ADDED ? 18 * s.added : 0;
      cardRefs.current[index]?.setAttribute(
        'transform',
        translateAlong(P, [
          CARD_XS[index],
          0,
          CARD_LIFT * s.lift[index] + drop,
        ]),
      );
      if (index === ADDED)
        cardRefs.current[index]?.setAttribute(
          'opacity',
          (1 - s.added).toFixed(3),
        );
    });
    moving ||= s.added > 0.001;
    if (s.pulse >= 0) {
      s.pulse += calm ? 1 : dt / 0.75;
      if (s.pulse >= 1) s.pulse = -1;
    }
    if (s.pulse >= 0 && runRef.current) {
      runAlong(runRef.current, headRef.current, s.pulse, 1);
      moving = true;
    } else hideRun(runRef.current, headRef.current);
    s.flash = follow(s.flash, 0, dt, 0.25, calm);
    flashRef.current?.setAttribute('opacity', (0.4 * s.flash).toFixed(3));
    moving ||= s.flash > 0.01;

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
      ' ': 'deep',
      a: 'add',
      d: 'deep',
      Enter: 'deep',
      h: 'home',
      p: 'profile',
      s: 'settings',
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
        aria-label="Open a deep link to /post/42. Press H for /, S for /settings, P for /profile, A to add profile.tsx."
        onClick={() => act('deep')}
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
          {TRAY}
          {FILES.map((_, index) =>
            index < s.files ? (
              <g
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                transform={translateAlong(P, [CARD_XS[index], 0, 0])}
              >
                <FileCard index={index} lit={index === s.lit} />
              </g>
            ) : null,
          )}
          {FOLDER_ART}
          {RAIL}
          <g ref={carRef} transform={translateAlong(P, [s.car, 0, 0])}>
            <Solid
              paths={CAR_ART.body}
              tone="hi"
              crease="lo"
              inner={<Line d={CAR_ART.seam} tone="faint" />}
            />
            <path className="af-glass" d={CAR_ART.window} />
            <g transform={CAR_ART.face}>
              <text className="af-mono" x={0} y={1.1} fontSize={3}>
                {s.url}
              </text>
            </g>
            <Line d={CAR_ART.pointer} tone="lit" />
          </g>

          <Cable d={CABLE_D} />
          <Runner
            d={CABLE_D}
            runRef={(node) => void (runRef.current = node)}
            headRef={(node) => void (headRef.current = node)}
          />
          <PhoneBack phone={PHONE_ART} />
          <PhoneScreen phone={PHONE_ART} id="er-screen">
            <rect className="rn-header" width={SW} height={9} />
            <text
              className="af-mono"
              x={SW / 2}
              y={6.6}
              fontSize={2.8}
              textAnchor="middle"
            >
              {s.screen.title}
            </text>
            <text
              className="af-mono er-url"
              x={SW / 2}
              y={13.4}
              fontSize={2.2}
              textAnchor="middle"
            >
              {s.screen.url}
            </text>
            {s.screen.missing ? (
              <path
                className="af-red-line"
                d={`M${SW / 2 - 5} 27L${SW / 2 + 5} 37M${SW / 2 + 5} 27L${SW / 2 - 5} 37`}
              />
            ) : (
              [0, 1, 2, 3].map((row) => (
                <g key={row}>
                  <rect
                    className="af-ui-line"
                    x={2.4}
                    y={17 + row * 9}
                    width={SW - 4.8}
                    height={7}
                    rx={1}
                  />
                  <path
                    className="af-ui-line"
                    d={`M5 ${19.6 + row * 9}H${SW - 6 - ((row + s.screen.title.length) % 3) * 4}`}
                  />
                </g>
              ))
            )}
            <rect
              ref={flashRef}
              className="af-flash"
              width={SW}
              height={SH}
              opacity={0}
            />
          </PhoneScreen>
          <PhoneFront phone={PHONE_ART} />
          <Socket socket={DOCK_SOCKET} />
        </svg>
      </div>
      <Controls>
        <button type="button" onClick={() => act('home')} disabled={locked}>
          /
        </button>
        <button type="button" onClick={() => act('settings')} disabled={locked}>
          /settings
        </button>
        <button type="button" onClick={() => act('deep')} disabled={locked}>
          Deep link /post/42
        </button>
        <button type="button" onClick={() => act('profile')} disabled={locked}>
          /profile
        </button>
        <button
          type="button"
          onClick={() => act('add')}
          disabled={locked || s.files > ADDED}
        >
          Add profile.tsx
        </button>
      </Controls>
    </div>
  );
}

export function ExpoRouterAnatomyFigure() {
  return (
    <div className="iso not-prose">
      <Plate
        fig="Fig 1"
        title="How files become routes"
        hint="Tap for a deep link · S settings · A add file"
        readout={readouts.rest()}
        keys={[
          { label: 'The file the URL matched', mark: 'lit' },
          { label: 'A file in app/', mark: 'raised' },
          { label: 'Unmatched route', mark: 'red' },
        ]}
        caption="In Expo Router the app/ folder is the navigation: index.tsx is /, settings.tsx is /settings, post/[id].tsx matches /post/42 with id = 42, and _layout.tsx wraps every route. Because every screen has a URL, a push notification or shared link opens it with no extra wiring, and adding a file adds a route. It is built on React Navigation's navigators, with routes taken from the filesystem instead of a config object."
      >
        <ExpoRouterBench />
      </Plate>
    </div>
  );
}

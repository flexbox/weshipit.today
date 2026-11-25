/**
 * Single source of truth for /xcode-device-hub-alternatives.
 * Every fact comes from the tool's own README or product page, checked on
 * VERIFIED_ON. Re-check stars, limits and pricing before republishing.
 */
export const VERIFIED_ON = 'November 25, 2026';

export interface DeviceHubAlternative {
  bestFor: string;
  command: string;
  facts: string[];
  id: string;
  kind: string;
  license: string;
  limits: string[];
  name: string;
  platforms: string;
  runsOn: string;
  summary: string;
  url: string;
}

export const ALTERNATIVES: DeviceHubAlternative[] = [
  {
    bestFor:
      'Developers who miss Simulator.app: one window per device, side by side, with the shortcuts you already know.',
    command: 'open https://updates.siniulator.app/Siniulator.dmg',
    facts: [
      'Separate device windows, so several simulators sit side by side',
      'Slow animations, shake, multi-touch, screenshots and screen recordings',
      'Drag and drop to install an app, clipboard paste into the simulator',
      'In-app updates when installed from the DMG',
    ],
    id: 'siniulator',
    kind: 'Desktop app',
    license: 'Open source (MIT)',
    limits: [
      'iPhone first: iPad support is incomplete',
      'No tvOS, watchOS or visionOS simulators yet',
      'Limited location, biometrics and push simulation; no memory warnings',
      'Device and runtime management stays in Xcode',
    ],
    name: 'Siniulator',
    platforms: 'iOS',
    runsOn: 'Your Mac',
    summary:
      'An open source macOS app that connects to the iOS simulators Xcode installed and gives each one its own window again.',
    url: 'https://github.com/kmagiera/Siniulator',
  },
  {
    bestFor:
      'Running many simulators on one Mac: parallel test runs, several agents at once, or a 16 GB laptop.',
    command: 'brew install mobai-app/tap/simslim',
    facts: [
      'Turns off background daemons a simulator does not need (Siri, Spotlight, photo analysis, iCloud sync)',
      'One iOS simulator: 4.0 GB → 0.9 GB of memory, 258 → 70 processes (M1 Pro, 16 GB)',
      '12 slim simulators on a 16 GB M1 Pro, where stock ones start thrashing at about 5',
      'CLI, macOS app and Go library; JSON event stream with simslim watch --json',
    ],
    id: 'simslim',
    kind: 'CLI + Mac app',
    license: 'Open source (MIT)',
    limits: [
      'Persistent slimming needs iOS 18.5 or later; older runtimes lose it at reboot',
      'Spotlight search returns nothing; push, StoreKit testing and universal links need their daemon turned back on',
      'visionOS simulators stay expensive even when slim',
      'It slims simulators, it does not replace the window you drive them from',
    ],
    name: 'simslim',
    platforms: 'iOS, tvOS, watchOS, visionOS',
    runsOn: 'Your Mac',
    summary:
      'A tool that makes each simulator about 4x lighter, so you can keep Device Hub or Siniulator and run far more devices at once.',
    url: 'https://github.com/MobAI-App/simslim',
  },
  {
    bestFor:
      'AI agents and CI on Linux: iOS simulators without buying or renting a Mac.',
    command: 'claude mcp add agent-sim -- agent-sim mcp',
    facts: [
      'iOS simulators on an x86-64 Linux machine, built on x86Sim',
      'CLI and MCP server: snapshot, tap, type, scroll, swipe, install, screenshot',
      'Browser stream in H.264 over a WebSocket, about 55 fps and 14 ms touch latency',
      'Phone pool: three simulators share 6.8 GB instead of 8.7 GB',
    ],
    id: 'agent-sim',
    kind: 'CLI + MCP server',
    license: 'Open source (Apache-2.0, x86Sim patches GPL-3.0)',
    limits: [
      'Early project: works end to end, rough edges expected',
      'No XCUITest support yet',
      'Needs Ubuntu 24.04, 8+ CPUs, 16 GB of memory and 60 GB of disk; setup takes about 30 minutes',
      "Apple's license terms still apply to the iOS runtimes you download",
    ],
    name: 'agent-sim',
    platforms: 'iOS',
    runsOn: 'Linux',
    summary:
      'An open source project that runs iOS simulators on ordinary Linux machines and exposes them to AI agents through a CLI and an MCP server.',
    url: 'https://github.com/Developing-Gamer/agent-sim',
  },
  {
    bestFor:
      'Teams who want iOS and Android devices on demand for agents, CI and pull request reviews, with nothing to host.',
    command: 'eas simulator --platform ios',
    facts: [
      'Cloud iPhone and iPad simulators and Android emulators',
      'Works with Claude Code, Codex, Cursor, Argent, Appium and Maestro (subset of commands)',
      'Session recordings, screenshots, logs and live sessions your team can open in a browser',
      'Starts from GitHub Actions, Expo Workflows or any CI through the EAS CLI or REST API',
    ],
    id: 'expo-simulators',
    kind: 'Cloud service',
    license: 'Paid service (EAS plans)',
    limits: [
      'Parallel sessions share your plan’s job concurrency and queue when it is full',
      'Pricing is on the EAS pricing page, not on the product page',
      'Available iOS versions depend on the session image',
      'Only a subset of Maestro commands is supported',
    ],
    name: 'Expo Simulators',
    platforms: 'iOS, Android',
    runsOn: 'Expo cloud',
    summary:
      'Hosted iOS simulators and Android emulators from Expo that your agents start, install a build on, drive and record.',
    url: 'https://expo.dev/services/simulators',
  },
];

export interface DeviceHubChange {
  source: string;
  sourceLabel: string;
  text: string;
  title: string;
}

/** What developers reported after the switch. Keep each one dated and sourced. */
export const DEVICE_HUB_CHANGES: DeviceHubChange[] = [
  {
    source: 'https://mjtsai.com/blog/2026/06/25/xcode-27s-device-hub/',
    sourceLabel: 'Michael Tsai’s roundup',
    text: 'All devices live in one window with a source list, instead of one window per simulator.',
    title: 'One window for every device',
  },
  {
    source: 'https://mjtsai.com/blog/2026/06/25/xcode-27s-device-hub/',
    sourceLabel: 'Michael Tsai’s roundup',
    text: 'Developers report no Debug menu: no slow animations toggle and no simulated memory warning.',
    title: 'No Debug menu',
  },
  {
    source: 'https://mjtsai.com/blog/2026/06/25/xcode-27s-device-hub/',
    sourceLabel: 'Michael Tsai’s roundup',
    text: 'Dropping images or files onto the simulator screen no longer works, according to several developers.',
    title: 'No drag and drop',
  },
  {
    source: 'https://mjtsai.com/blog/2026/06/25/xcode-27s-device-hub/',
    sourceLabel: 'Michael Tsai’s roundup',
    text: 'Reported in November 2026: GPX files with custom coordinates are not recognized; set the location in the scheme instead.',
    title: 'GPX locations ignored',
  },
  {
    source: 'https://expo.dev/blog/xcode-27-device-hub-expo-device-hub',
    sourceLabel: 'Expo blog',
    text: 'Scripts that opened Simulator.app broke, including expo run:ios. Expo CLI handles Device Hub from SDK 56, and fully in SDK 58.',
    title: 'Tooling that broke',
  },
  {
    source: 'https://github.com/kmagiera/Siniulator',
    sourceLabel: 'Siniulator README',
    text: 'Xcode 27 opens Device Hub when you run on a simulator, and quitting Device Hub can shut down the simulators it started.',
    title: 'Hard to avoid',
  },
];

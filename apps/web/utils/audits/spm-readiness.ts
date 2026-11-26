/**
 * The SPM readiness check, as plain data: the 12 questions the page shows
 * and, for each one, the fix that goes into the migration plan email. The
 * server builds the plan from the question ids, so the copy lives here and
 * never travels through the browser.
 */

export const SPM_AUDIT_ID = 'spm-readiness';

/**
 * How a blocker gets solved. The plan lists them in this order: the
 * upgrade first, then what you fix yourself, then what needs another
 * library, then what you can only wait for.
 */
export type SpmEffort = 'first' | 'quick' | 'library' | 'wait';

export const SPM_EFFORT_ORDER: SpmEffort[] = [
  'first',
  'quick',
  'library',
  'wait',
];

export const SPM_EFFORT_LABELS: Record<SpmEffort, string> = {
  first: 'Start here',
  library: 'Library changes',
  quick: 'Quick fixes',
  wait: 'Waiting on upstream',
};

export interface SpmQuestion {
  id: string;
  /** The statement shown in the quiz. */
  text: string;
  /** Short name of the step in the plan. */
  label: string;
  effort: SpmEffort;
  /** What to do when the answer is No. */
  fix: string;
  /** Command to run, when there is one. */
  command?: string;
}

export interface SpmCategory {
  key: string;
  label: string;
  questions: SpmQuestion[];
}

export const SPM_CATEGORIES: SpmCategory[] = [
  {
    key: 'react-native',
    label: 'React Native',
    questions: [
      {
        effort: 'first',
        fix: 'Swift Package Manager support starts in React Native 0.87. Do the upgrade on its own branch, with the Upgrade Helper (https://react-native-community.github.io/upgrade-helper/), and ship it before you touch CocoaPods.',
        id: 'r1',
        label: 'Upgrade to React Native 0.87',
        text: 'Your app runs React Native 0.87 or later (or the upgrade is planned this quarter). Swift Package Manager support does not exist before 0.87.',
      },
      {
        effort: 'wait',
        fix: 'The first SPM phase only consumes the prebuilt XCFrameworks. Upstream your patches to React Native or drop them. Until then, this app stays on CocoaPods.',
        id: 'r2',
        label: 'Stop patching React Native native code',
        text: 'You consume the prebuilt React Native XCFrameworks and do not patch React Native native code (no patch-package on ReactCommon or React-Core).',
      },
      {
        command:
          "grep -rnE '#import <[^/>]+>' ios --include='*.h' --include='*.m' --include='*.mm'",
        effort: 'quick',
        fix: 'Headers now come from ReactNativeHeaders.xcframework. Rewrite bare imports in framework style: #import <RCTAppDelegate.h> becomes #import <React/RCTAppDelegate.h>. This command lists the imports to check.',
        id: 'r3',
        label: 'Switch to framework-style imports',
        text: 'Your AppDelegate and native modules use framework-style includes like #import <React/RCTAppDelegate.h>, not bare-form #import <RCTAppDelegate.h>.',
      },
    ],
  },
  {
    key: 'dependencies',
    label: 'Native dependencies',
    questions: [
      {
        command:
          'ls node_modules/*/Package.swift node_modules/@*/*/Package.swift',
        effort: 'quick',
        fix: 'List every package with an ios folder, plus the pods in your Podfile. This command shows the ones that already ship a Package.swift. The others are your real blockers.',
        id: 'd1',
        label: 'List your native iOS dependencies',
        text: 'You have a list of every native iOS dependency (npm packages with an ios folder + pods in your Podfile) and know which ones ship a Package.swift.',
      },
      {
        effort: 'library',
        fix: 'For each native SDK, note its SPM package URL and product name (Firebase: https://github.com/firebase/firebase-ios-sdk). An SDK with no SPM package blocks the migration: ask the vendor for a date or plan a replacement.',
        id: 'd2',
        label: 'Find the SPM package of each native SDK',
        text: 'Your native SDKs (Firebase, Sentry, Stripe, analytics, ads…) are available through Swift Package Manager and you know their SPM product names.',
      },
      {
        effort: 'wait',
        fix: 'SPM cannot mix Swift and C++ in one target. Nitro modules, VisionCamera and MMKV are affected until they split their targets. Follow their SPM issue, and keep CocoaPods for this app until it ships.',
        id: 'd3',
        label: 'Check your Swift + C++ libraries',
        text: 'No dependency mixes Swift and C++ in the same target (Nitro modules, react-native-vision-camera, react-native-mmkv…), or you have checked its SPM status.',
      },
    ],
  },
  {
    key: 'podfile',
    label: 'Podfile customization',
    questions: [
      {
        effort: 'quick',
        fix: 'SPM has no Ruby hook. Move each build setting from post_install into the Xcode project (Build Settings), or drop the ones you no longer need.',
        id: 'p1',
        label: 'Move post_install settings into Xcode',
        text: 'Your Podfile has no post_install hook rewriting build settings, flags or header search paths.',
      },
      {
        effort: 'library',
        fix: 'A podspec script_phase has no SPM equivalent. Replace it with an Xcode Run Script build phase or an SPM build tool plugin, or switch to a library that does not need one.',
        id: 'p2',
        label: 'Replace podspec script phases',
        text: 'No library you depend on relies on a podspec script_phase or custom Ruby logic to build (or you have a replacement for each one).',
      },
      {
        command: 'npx react-native spm scaffold',
        effort: 'quick',
        fix: 'Generate a Package.swift for each local or forked pod (:path, :git), then commit it next to the pod.',
        id: 'p3',
        label: 'Scaffold a Package.swift for local pods',
        text: 'You have no local or forked pods (:path, :git) — or each of them can get a Package.swift with npx react-native spm scaffold.',
      },
    ],
  },
  {
    key: 'ci',
    label: 'Build & CI',
    questions: [
      {
        command: 'npx react-native spm',
        effort: 'quick',
        fix: 'Write down the commands for a fresh clone. In CI, replace pod install with this command, and drop the Pods/ cache and the Ruby setup.',
        id: 'c1',
        label: 'Make a fresh clone build without Pods/',
        text: 'A fresh clone builds with documented commands, and your CI does not depend on cached Pods/ folders or a pinned Ruby version you cannot drop.',
      },
      {
        effort: 'quick',
        fix: 'SPM changes how frameworks are embedded and signed. Add a release build on a physical device to your release checklist before you switch.',
        id: 'c2',
        label: 'Test release builds on a device',
        text: 'Release builds are tested on a physical device before shipping (SPM changes how frameworks are embedded and signed).',
      },
      {
        command: 'npx react-native spm deinit',
        effort: 'quick',
        fix: 'Run the migration on a branch, next to your CocoaPods build. If it breaks before a release, this command removes the package references.',
        id: 'c3',
        label: 'Plan a rollback',
        text: 'You can try the migration on a branch and roll back with npx react-native spm deinit without blocking a release.',
      },
    ],
  },
];

export const SPM_QUESTIONS: SpmQuestion[] = SPM_CATEGORIES.flatMap(
  (category) => category.questions,
);

export function getSpmVerdict(scorePct: number) {
  if (scorePct < 50) {
    return {
      label: 'Not ready yet',
      text: 'Stay on CocoaPods for now, but start the groundwork: upgrade React Native, list your native dependencies and remove Podfile hacks. Your app keeps building after December 2, 2026 — your native SDKs just stop getting updates.',
    };
  }
  if (scorePct < 80) {
    return {
      label: 'Ready for a spike',
      text: 'Most blockers are known. Run npx react-native spm --deintegrate on a branch, then fix the “No” answers one category at a time, starting with native dependencies.',
    };
  }
  return {
    label: 'Ready to migrate',
    text: 'Your project is a good SPM candidate. Migrate on a branch, run it in CI next to the CocoaPods build, and switch once a release passes on physical devices.',
  };
}

/** A question the visitor did not answer Yes to. */
export type AnswerGap = 'no' | 'unknown';

/**
 * Reads the compact answers the quiz posts (`r2:n,d3:u`). Only the No and
 * Unknown answers are sent; unknown ids and codes are ignored.
 */
export function parseAnswerGaps(raw: unknown): Map<string, AnswerGap> {
  const gaps = new Map<string, AnswerGap>();
  if (typeof raw !== 'string') return gaps;
  for (const pair of raw.split(',')) {
    const [id, code] = pair.split(':');
    if (code === 'n') gaps.set(id, 'no');
    if (code === 'u') gaps.set(id, 'unknown');
  }
  return gaps;
}

export interface SpmPlanStep extends SpmQuestion {
  gap: AnswerGap;
}

/** The plan: every question not answered Yes, grouped by effort. */
export function buildSpmPlan(
  gaps: Map<string, AnswerGap>,
): { effort: SpmEffort; steps: SpmPlanStep[] }[] {
  return SPM_EFFORT_ORDER.map((effort) => ({
    effort,
    steps: SPM_QUESTIONS.filter(
      (question) => question.effort === effort && gaps.has(question.id),
    ).map((question) => ({
      ...question,
      gap: gaps.get(question.id) as AnswerGap,
    })),
  })).filter((group) => group.steps.length > 0);
}

import {
  AuditCategory,
  EN_LABELS,
  SelfAuditConfig,
  SelfAuditQuiz,
} from './self-audit-quiz';

const CATEGORIES: AuditCategory[] = [
  {
    key: 'react-native',
    label: 'React Native',
    questions: [
      {
        id: 'r1',
        text: 'Your app runs React Native 0.87 or later (or the upgrade is planned this quarter). Swift Package Manager support does not exist before 0.87.',
      },
      {
        id: 'r2',
        text: 'You consume the prebuilt React Native XCFrameworks and do not patch React Native native code (no patch-package on ReactCommon or React-Core).',
      },
      {
        id: 'r3',
        text: 'Your AppDelegate and native modules use framework-style includes like #import <React/RCTAppDelegate.h>, not bare-form #import <RCTAppDelegate.h>.',
      },
    ],
  },
  {
    key: 'dependencies',
    label: 'Native dependencies',
    questions: [
      {
        id: 'd1',
        text: 'You have a list of every native iOS dependency (npm packages with an ios folder + pods in your Podfile) and know which ones ship a Package.swift.',
      },
      {
        id: 'd2',
        text: 'Your native SDKs (Firebase, Sentry, Stripe, analytics, ads…) are available through Swift Package Manager and you know their SPM product names.',
      },
      {
        id: 'd3',
        text: 'No dependency mixes Swift and C++ in the same target (Nitro modules, react-native-vision-camera, react-native-mmkv…), or you have checked its SPM status.',
      },
    ],
  },
  {
    key: 'podfile',
    label: 'Podfile customization',
    questions: [
      {
        id: 'p1',
        text: 'Your Podfile has no post_install hook rewriting build settings, flags or header search paths.',
      },
      {
        id: 'p2',
        text: 'No library you depend on relies on a podspec script_phase or custom Ruby logic to build (or you have a replacement for each one).',
      },
      {
        id: 'p3',
        text: 'You have no local or forked pods (:path, :git) — or each of them can get a Package.swift with npx react-native spm scaffold.',
      },
    ],
  },
  {
    key: 'ci',
    label: 'Build & CI',
    questions: [
      {
        id: 'c1',
        text: 'A fresh clone builds with documented commands, and your CI does not depend on cached Pods/ folders or a pinned Ruby version you cannot drop.',
      },
      {
        id: 'c2',
        text: 'Release builds are tested on a physical device before shipping (SPM changes how frameworks are embedded and signed).',
      },
      {
        id: 'c3',
        text: 'You can try the migration on a branch and roll back with npx react-native spm deinit without blocking a release.',
      },
    ],
  },
];

function getVerdict(scorePct: number) {
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

const SPM_READINESS_AUDIT: SelfAuditConfig = {
  id: 'spm-readiness',
  eyebrow: '12 checks · 2 minutes',
  title: 'Your SPM readiness check',
  intro: 'Answer No, Unknown or Yes. Your score shows up instantly.',
  categories: CATEGORIES,
  getVerdict,
  resetLabel: 'Restart the readiness check',
  report: {
    title: 'Get your migration plan',
    text: 'Your answers turned into an ordered migration plan, from the first blocker to the CocoaPods removal.',
    bullets: [
      'Your blockers ranked by effort (quick fix / library change / wait)',
      'The React Native 0.87 commands for each step',
      'What to do for each library without a Package.swift',
    ],
  },
  scoreField: 'spm_score',
  cta: {
    text: 'Scored below 80? We map every native dependency of your app and hand you a step-by-step plan to leave CocoaPods.',
    href: '/audit',
    label: 'Discover the full audit',
  },
  labels: EN_LABELS,
};

interface SpmReadinessAuditProps {
  headingAs?: 'h1' | 'h2';
}

export function SpmReadinessAudit({
  headingAs = 'h2',
}: SpmReadinessAuditProps) {
  return <SelfAuditQuiz config={SPM_READINESS_AUDIT} headingAs={headingAs} />;
}

export default SpmReadinessAudit;

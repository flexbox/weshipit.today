import {
  AuditCategory,
  EN_LABELS,
  SelfAuditConfig,
  SelfAuditQuiz,
} from './self-audit-quiz';

const CATEGORIES: AuditCategory[] = [
  {
    key: 'secrets',
    label: 'Secrets & storage',
    questions: [
      {
        id: 's1',
        text: 'No secret key (Stripe secret key, Firebase admin key, OpenAI key…) ships in your JS bundle, app.config or EXPO_PUBLIC_* variables — anything embedded in the app is public.',
      },
      {
        id: 's2',
        text: 'Auth tokens are stored in expo-secure-store (Keychain/Keystore), never in plain AsyncStorage or MMKV.',
      },
      {
        id: 's3',
        text: 'Your production logs (console.log, Sentry) contain no tokens, passwords or personal data.',
      },
    ],
  },
  {
    key: 'network',
    label: 'Network & API',
    questions: [
      {
        id: 'n1',
        text: 'All traffic goes over HTTPS: no usesCleartextTraffic on Android, no NSAllowsArbitraryLoads on iOS.',
      },
      {
        id: 'n2',
        text: 'Your backend checks authorization on every request (Supabase Row Level Security, Firebase Security Rules enabled) instead of trusting checks in the app.',
      },
      {
        id: 'n3',
        text: 'Sensitive APIs are protected against illegitimate clients (rate limiting, App Attest / Play Integrity, Firebase App Check…).',
      },
    ],
  },
  {
    key: 'platform',
    label: 'Platform',
    questions: [
      {
        id: 'p1',
        text: 'Deep link parameters are validated and never trigger a sensitive action without confirmation.',
      },
      {
        id: 'p2',
        text: 'Your WebViews use a restricted originWhitelist and check the origin of messages received in onMessage.',
      },
      {
        id: 'p3',
        text: 'On Android, android:allowBackup is disabled (or sensitive data is excluded from backups).',
      },
    ],
  },
  {
    key: 'build',
    label: 'Build & dependencies',
    questions: [
      {
        id: 'b1',
        text: 'Your production builds ship no debug screen, menu or endpoint.',
      },
      {
        id: 'b2',
        text: 'Dependencies are monitored continuously (Dependabot, Renovate or npm audit in CI) and critical vulnerabilities are patched quickly.',
      },
      {
        id: 'b3',
        text: 'A dedicated security scanner (rnsec or similar) runs in CI and blocks pull requests that introduce a vulnerability.',
      },
    ],
  },
];

function getVerdict(scorePct: number) {
  if (scorePct < 50) {
    return {
      label: 'High exposure',
      text: 'Several basic protections are missing. One secret extracted from the bundle or one poorly protected API is enough to compromise your users — fix this before your next release.',
    };
  }
  if (scorePct < 80) {
    return {
      label: 'Good basics, blind spots to close',
      text: 'The essentials are in place, but some areas (storage, deep links, supply chain) are still exploitable. Start with the “No” answers in your weakest category.',
    };
  }
  return {
    label: 'Solid security posture',
    text: 'Your app covers most of the baseline controls. Next step: a penetration test or a manual review against the OWASP MASVS.',
  };
}

const SECURITY_AUDIT: SelfAuditConfig = {
  id: 'security-audit',
  eyebrow: '12 checks · 2 minutes',
  title: 'Your security checklist',
  intro: 'Answer No, Unknown or Yes. Your score shows up instantly.',
  categories: CATEGORIES,
  getVerdict,
  resetLabel: 'Restart the security audit',
  report: {
    title: 'Get your security report',
    text: 'Your answers ranked by severity and fix effort, with the steps to fix each weak spot.',
    bullets: [
      'Your vulnerabilities ranked by severity (critical / high / moderate)',
      'The concrete React Native and Expo fix, item by item',
      'The rnsec command to plug into your CI',
    ],
  },
  scoreField: 'security_score',
  cta: {
    text: 'Scored below 80? Our team audits your codebase and native configuration, and delivers a prioritized remediation plan.',
    href: '/audit',
    label: 'Discover the full audit',
  },
  labels: EN_LABELS,
};

interface SecurityAuditProps {
  headingAs?: 'h1' | 'h2';
}

export function SecurityAudit({ headingAs = 'h2' }: SecurityAuditProps) {
  return <SelfAuditQuiz config={SECURITY_AUDIT} headingAs={headingAs} />;
}

export default SecurityAudit;

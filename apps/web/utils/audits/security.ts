import type { SelfAudit } from './types';

/**
 * The React Native security checklist: 12 Checks on secrets, network,
 * platform and build. Priorities follow severity, as the form promises.
 */

type SecurityPriority = 'critical' | 'high' | 'moderate';

function getVerdict(score: number) {
  if (score < 50) {
    return {
      label: 'High exposure',
      text: 'Several basic protections are missing. One secret extracted from the bundle or one poorly protected API is enough to compromise your users — fix this before your next release.',
    };
  }
  if (score < 80) {
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

export const SECURITY_AUDIT: SelfAudit<SecurityPriority> = {
  categories: [
    {
      checks: [
        {
          command: 'npx rnsec scan',
          fix: 'Anything in your JS bundle, app.config or EXPO_PUBLIC_* variables can be read from the app binary. Move each secret behind your own API, then rotate it: the old key is already exposed.',
          id: 's1',
          label: 'Move secret keys out of the app',
          priority: 'critical',
          text: 'No secret key (Stripe secret key, Firebase admin key, OpenAI key…) ships in your JS bundle, app.config or EXPO_PUBLIC_* variables — anything embedded in the app is public.',
        },
        {
          command: 'git grep -nE "(AsyncStorage|MMKV|storage)\\.set.*[Tt]oken"',
          fix: 'AsyncStorage and MMKV write plain files that a backup or a rooted device can read. Store access and refresh tokens with expo-secure-store (or react-native-keychain). This command lists the places that write a token today.',
          id: 's2',
          label: 'Store auth tokens in secure storage',
          priority: 'high',
          text: 'Auth tokens are stored in expo-secure-store (Keychain/Keystore), never in plain AsyncStorage or MMKV.',
        },
        {
          fix: 'Strip console.log from production builds with babel-plugin-transform-remove-console, and drop tokens, passwords and personal data in Sentry’s beforeSend.',
          id: 's3',
          label: 'Clean secrets out of production logs',
          priority: 'high',
          text: 'Your production logs (console.log, Sentry) contain no tokens, passwords or personal data.',
        },
      ],
      key: 'secrets',
      label: 'Secrets & storage',
    },
    {
      checks: [
        {
          command: 'git grep -nE "usesCleartextTraffic|NSAllowsArbitraryLoads"',
          fix: 'Remove usesCleartextTraffic from AndroidManifest.xml and NSAllowsArbitraryLoads from Info.plist. If a dev server needs plain HTTP, allow only that domain, in a debug-only config.',
          id: 'n1',
          label: 'Block plain HTTP traffic',
          priority: 'critical',
          text: 'All traffic goes over HTTPS: no usesCleartextTraffic on Android, no NSAllowsArbitraryLoads on iOS.',
        },
        {
          fix: 'Anyone can call your API without the app. Turn on Row Level Security on every Supabase table, or write Firebase Security Rules, then make each endpoint check who is asking and what they own.',
          id: 'n2',
          label: 'Enforce authorization on the backend',
          priority: 'critical',
          text: 'Your backend checks authorization on every request (Supabase Row Level Security, Firebase Security Rules enabled) instead of trusting checks in the app.',
        },
        {
          fix: 'Rate-limit login, signup and payment endpoints first. Then attest the app with Firebase App Check, or with App Attest and Play Integrity directly.',
          id: 'n3',
          label: 'Protect sensitive APIs from scripts',
          priority: 'moderate',
          text: 'Sensitive APIs are protected against illegitimate clients (rate limiting, App Attest / Play Integrity, Firebase App Check…).',
        },
      ],
      key: 'network',
      label: 'Network & API',
    },
    {
      checks: [
        {
          fix: 'Treat every deep link as untrusted input. Validate each parameter against what the screen expects, and ask for confirmation before a payment, a deletion or an account change.',
          id: 'p1',
          label: 'Validate deep link parameters',
          priority: 'high',
          text: 'Deep link parameters are validated and never trigger a sensitive action without confirmation.',
        },
        {
          fix: 'Set originWhitelist to your own domains, and check event.nativeEvent.url in onMessage before acting on a message. Turn off javaScriptEnabled on WebViews that only show content.',
          id: 'p2',
          label: 'Lock down your WebViews',
          priority: 'high',
          text: 'Your WebViews use a restricted originWhitelist and check the origin of messages received in onMessage.',
        },
        {
          fix: 'Set android:allowBackup="false" in AndroidManifest.xml, or exclude the sensitive files with dataExtractionRules (Android 12 and later) and fullBackupContent.',
          id: 'p3',
          label: 'Keep sensitive data out of Android backups',
          priority: 'moderate',
          text: 'On Android, android:allowBackup is disabled (or sensitive data is excluded from backups).',
        },
      ],
      key: 'platform',
      label: 'Platform',
    },
    {
      checks: [
        {
          fix: 'Wrap every debug menu, feature flag screen and test endpoint in if (__DEV__) or a build-time flag. Then install a release build and check they are gone.',
          id: 'b1',
          label: 'Remove debug screens from production',
          priority: 'high',
          text: 'Your production builds ship no debug screen, menu or endpoint.',
        },
        {
          command: 'npm audit --audit-level=critical',
          fix: 'Turn on Dependabot or Renovate, and run this command in CI so a critical advisory fails the build.',
          id: 'b2',
          label: 'Monitor your dependencies',
          priority: 'moderate',
          text: 'Dependencies are monitored continuously (Dependabot, Renovate or npm audit in CI) and critical vulnerabilities are patched quickly.',
        },
        {
          fix: 'Add rnsec to your pull request pipeline, with the command at the end of this email, so it blocks changes that introduce a vulnerability.',
          id: 'b3',
          label: 'Run a security scanner in CI',
          priority: 'moderate',
          text: 'A dedicated security scanner (rnsec or similar) runs in CI and blocks pull requests that introduce a vulnerability.',
        },
      ],
      key: 'build',
      label: 'Build & dependencies',
    },
  ],
  getVerdict,
  id: 'security-audit',
  locale: 'en',
  name: 'React Native security checklist',
  page: {
    cta: {
      href: '/audit',
      label: 'Discover the full audit',
      text: 'Scored below 80? Our team audits your codebase and native configuration, and delivers a prioritized remediation plan.',
    },
    eyebrow: '12 checks · 2 minutes',
    form: {
      bullets: [
        'Your vulnerabilities ranked by severity (critical / high / moderate)',
        'The concrete React Native and Expo fix, item by item',
        'The rnsec command to plug into your CI',
      ],
      text: 'Your answers ranked by severity, with the steps to fix each weak spot.',
      title: 'Get your security report',
    },
    intro: 'Answer No, Unknown or Yes. Your score shows up instantly.',
    resetLabel: 'Restart the security audit',
    title: 'Your security checklist',
  },
  priorities: [
    { key: 'critical', label: 'Critical' },
    { key: 'high', label: 'High' },
    { key: 'moderate', label: 'Moderate' },
  ],
  report: {
    closing: {
      command: 'npx rnsec scan --changed-files main --silent',
      text: 'Run rnsec on every pull request so these stay fixed:',
    },
    offer: 'Want us to audit the codebase itself?',
    subject: 'Your security report',
  },
};

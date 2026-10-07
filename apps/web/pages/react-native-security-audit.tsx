import { Card, Faq, Hyperlink, LinkButton, Prose, Text } from '@weshipit/ui';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { SecurityAudit } from '../components/security-audit';

const FAQ_ITEMS = [
  {
    id: 'duration',
    question: 'How long does the free security audit take?',
    answer:
      'About 2 minutes. 12 checks across 4 categories: secrets and storage, network and API, platform (Android, iOS, WebView, deep links), build and dependencies. You answer No, Unknown or Yes.',
  },
  {
    id: 'api-key',
    question: 'Is an API key in a React Native app really exposed?',
    answer:
      'Yes. The JavaScript bundle (even compiled to Hermes bytecode) and config files can be extracted from an APK or IPA in minutes. Any value embedded in the app, including EXPO_PUBLIC_* variables, must be treated as public. Secrets belong on the server.',
  },
  {
    id: 'rnsec',
    question: 'How is this different from a scanner like rnsec?',
    answer:
      'rnsec automatically analyzes your code and native configuration (hardcoded secrets, cleartext traffic, WebView, unencrypted storage…). This checklist also covers what a static scanner cannot see: your Supabase or Firebase rules, access control on your backend, or how your APIs are protected against illegitimate clients. The two are complementary.',
  },
  {
    id: 'email',
    question: 'Do I need to give my email to see my score?',
    answer:
      'No. Your score out of 100 and the per-category breakdown show up immediately. Your email is only used to send the detailed report with fixes ranked by severity.',
  },
  {
    id: 'pentest',
    question: 'Does this audit replace a penetration test?',
    answer:
      'No. It checks the baseline controls that prevent most incidents. For banking, health or any app handling sensitive data, it prepares you for a penetration test or a full OWASP MASVS review — it does not replace one.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
};

const CHECKED_AREAS = [
  {
    title: 'Secrets & storage',
    masvs: 'MASVS-STORAGE · MASVS-AUTH',
    text: 'API keys embedded in the app (including via EXPO_PUBLIC_*), tokens outside the Keychain/Keystore, logs leaking personal data.',
  },
  {
    title: 'Network & API',
    masvs: 'MASVS-NETWORK · MASVS-AUTH',
    text: 'Cleartext traffic, access control enforced only in the app, Supabase/Firebase rules left in test mode, APIs open to illegitimate clients.',
  },
  {
    title: 'Platform',
    masvs: 'MASVS-PLATFORM · MASVS-STORAGE',
    text: 'Unvalidated deep links, overly permissive WebViews, sensitive data exposed through Android backups.',
  },
  {
    title: 'Build & dependencies',
    masvs: 'MASVS-CODE',
    text: 'Debug artifacts in production, vulnerable dependencies, no automated security scan in CI.',
  },
];

export default function ReactNativeSecurityAudit() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Free React Native Security Audit: 12 Checks in 2 Minutes"
        seoDescription="Security checklist for React Native and Expo apps: secrets, storage, APIs, deep links, WebView, dependencies. Instant score out of 100 + detailed report by email. Free."
        ogImageTitle="Free React Native Security Audit"
        withHeader
        withFooter
        withContainer
      >
        <div className="mt-12">
          <SecurityAudit headingAs="h1" />
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <Prose>
            <h2>Why audit the security of your React Native app?</h2>
            <p>
              A mobile app is a client you hand out to everyone, attackers
              included. The JavaScript bundle, the Android manifest and the
              Info.plist can be extracted from an APK or IPA in minutes. One
              embedded API key, one token stored in plain text or one Supabase
              table without Row Level Security, and your users’ data is exposed.
            </p>
            <p>
              React Native adds its own traps: <code>EXPO_PUBLIC_*</code>{' '}
              variables that end up in the bundle, WebViews running remote
              content, deep links that trigger actions without validation. These
              12 checks target the vulnerabilities we find most often in audits.
            </p>
          </Prose>
          <Prose>
            <h2>How does the score work?</h2>
            <p>
              Each answer is worth 1 point (Yes), 0.5 point (Unknown) or 0 point
              (No). The score is scaled to 100, with a breakdown per category.
              The thresholds are stricter than for our{' '}
              <Link href="/audit-gratuit">free stack self-audit</Link>: in
              security, a single vulnerability is enough.
            </p>
            <ul>
              <li>
                <strong>80+</strong> — solid posture, ready for a penetration
                test
              </li>
              <li>
                <strong>50 to 79</strong> — good basics, blind spots to close
              </li>
              <li>
                <strong>below 50</strong> — high exposure, fix before your next
                release
              </li>
            </ul>
            <p>
              “Unknown” counts as half: if you don’t know, it usually means no
              safeguard is checking it.
            </p>
          </Prose>
        </div>

        <div className="mt-24">
          <Prose>
            <h2>What the audit checks</h2>
            <p>
              The 4 categories are based on the{' '}
              <Hyperlink href="https://mas.owasp.org/MASVS/">
                OWASP MASVS
              </Hyperlink>
              , the reference standard for mobile app security, applied to the
              concrete cases of a React Native or Expo app.
            </p>
          </Prose>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {CHECKED_AREAS.map((area) => (
              <Card key={area.title} size="md">
                <Text
                  as="p"
                  variant="c2"
                  className="uppercase tracking-wide text-blue-600 dark:text-blue-400"
                >
                  {area.masvs}
                </Text>
                <Text as="h3" variant="h6" className="mt-2">
                  {area.title}
                </Text>
                <Text
                  as="p"
                  variant="p2"
                  className="mt-3 text-slate-600 dark:text-slate-300"
                >
                  {area.text}
                </Text>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <Prose>
            <h2>Automate the scan with rnsec</h2>
            <p>
              A checklist is filled in once; a vulnerability can slip in with
              every pull request. For everything detectable in the code, we use{' '}
              <Hyperlink href="https://www.rnsec.dev/">rnsec</Hyperlink>, an
              open source (MIT) scanner built for React Native and Expo:
              hardcoded secrets, unencrypted storage, WebView, cleartext
              traffic, debug artifacts, Android and iOS configuration.
            </p>
            <p>
              Run it locally to get an HTML report, then plug it into your CI to
              block regressions (the last check of the audit).
            </p>
          </Prose>
          <Card className="!bg-slate-900 !text-slate-100 font-mono text-sm leading-relaxed ring-slate-800">
            <pre className="overflow-x-auto">
              <code>
                <span className="text-slate-400">
                  # Local scan + HTML report
                </span>
                {'\n'}npx rnsec scan
                {'\n'}open rnsec-report.html
                {'\n\n'}
                <span className="text-slate-400">
                  # In CI: changed files only
                </span>
                {'\n'}npx rnsec scan --changed-files main --silent \{'\n'}
                {'  '}--output rnsec-results.json
              </code>
            </pre>
          </Card>
        </div>

        <Faq faqs={FAQ_ITEMS} title="Frequently asked questions" />

        <div className="mx-auto mb-24 max-w-4xl">
          <Card
            size="xl"
            className="flex flex-col items-center justify-center gap-6 text-center"
            variant="gradient-blue"
          >
            <Text as="h2" variant="h4" className="text-white">
              Want an outside look at your app’s security?
            </Text>
            <Text as="p" variant="p1" className="max-w-xl text-white">
              We audit your React Native codebase and native configuration, and
              deliver a remediation plan ranked by severity.
            </Text>
            <LinkButton href="/audit" variant="outline" size="xl">
              Discover the full audit
            </LinkButton>
          </Card>
        </div>
      </Layout>
    </>
  );
}

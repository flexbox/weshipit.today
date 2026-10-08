import {
  Card,
  Faq,
  HeroSplit,
  Hyperlink,
  LinkButton,
  Prose,
  SecurityAnimation,
  Text,
} from '@weshipit/ui';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import { Layout } from '../components/layout';
import { SecurityAudit } from '../components/security-audit';

const FAQ_ITEMS = [
  {
    id: 'api-key',
    question: 'Is an API key in a React Native app really exposed?',
    answer:
      'Yes. The JS bundle, even as Hermes bytecode, can be extracted from an APK or IPA in minutes. Anything shipped in the app, EXPO_PUBLIC_* variables included, is public. Keep secrets on the server.',
  },
  {
    id: 'score',
    question: 'How is the score calculated?',
    answer:
      'Yes = 1 point, Unknown = 0.5, No = 0, scaled to 100. 80+ is a solid posture, 50 to 79 has blind spots to close, below 50 is high exposure.',
  },
  {
    id: 'rnsec',
    question: 'How is this different from rnsec?',
    answer:
      'rnsec scans your code and native config. This checklist also covers what a static scanner cannot see, like Supabase or Firebase rules and backend access control. Use both.',
  },
  {
    id: 'pentest',
    question: 'Does it replace a penetration test?',
    answer:
      'No. It covers the baseline controls that prevent most incidents. Apps handling banking or health data still need a pentest or a full OWASP MASVS review.',
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
    masvs: 'MASVS-STORAGE',
    text: 'Embedded keys, tokens outside the Keychain, leaky logs.',
  },
  {
    title: 'Network & API',
    masvs: 'MASVS-NETWORK',
    text: 'Cleartext traffic, client-side access control, open APIs.',
  },
  {
    title: 'Platform',
    masvs: 'MASVS-PLATFORM',
    text: 'Deep links, WebViews, Android backups.',
  },
  {
    title: 'Build & dependencies',
    masvs: 'MASVS-CODE',
    text: 'Debug artifacts, vulnerable packages, no CI scan.',
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
        <HeroSplit
          eyebrow={
            <Text
              as="p"
              variant="c2"
              className="uppercase tracking-wide text-blue-600 dark:text-blue-400"
            >
              Free tool · React Native & Expo
            </Text>
          }
          title="Free React Native security audit"
          description="12 checks to catch what attackers look for first: secrets, storage, APIs, deep links and dependencies."
          actions={
            <>
              <LinkButton size="xl" href="#audit">
                Start the audit
              </LinkButton>
              <LinkButton
                variant="outline"
                className="group"
                size="xl"
                href="/audit"
              >
                Get a full audit
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LinkButton>
            </>
          }
          visual={<SecurityAnimation />}
        />

        <div id="audit" className="scroll-mt-24">
          <SecurityAudit />
        </div>

        <div className="mt-24">
          <Prose>
            <h2>What the audit checks</h2>
            <p>
              Four areas from the{' '}
              <Hyperlink href="https://mas.owasp.org/MASVS/">
                OWASP MASVS
              </Hyperlink>
              , applied to React Native and Expo.
            </p>
          </Prose>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  className="mt-2 text-slate-600 dark:text-slate-300"
                >
                  {area.text}
                </Text>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-24 grid items-center gap-8 lg:grid-cols-2">
          <Prose>
            <h2>Automate it with rnsec</h2>
            <p>
              <Hyperlink href="https://www.rnsec.dev/">rnsec</Hyperlink> is an
              open source scanner for React Native and Expo. Run it locally,
              then in CI to block regressions.
            </p>
          </Prose>
          <Card className="!bg-slate-900 !text-slate-100 font-mono text-sm leading-relaxed ring-slate-800">
            <pre className="overflow-x-auto">
              <code>
                <span className="text-slate-400">
                  # Local scan + HTML report
                </span>
                {'\n'}npx rnsec scan
                {'\n\n'}
                <span className="text-slate-400">
                  # In CI: changed files only
                </span>
                {'\n'}npx rnsec scan --changed-files main --silent
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
              Want an expert review?
            </Text>
            <Text as="p" variant="p1" className="max-w-xl text-white">
              We audit your codebase and native config, then hand you a fix plan
              ranked by severity.
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

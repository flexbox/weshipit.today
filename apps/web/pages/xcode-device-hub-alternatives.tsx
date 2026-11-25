import {
  Badge,
  Card,
  Faq,
  HeroSplit,
  Hyperlink,
  LinkButton,
  Prose,
  Text,
} from '@weshipit/ui';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/layout';
import {
  ALTERNATIVES,
  DEVICE_HUB_CHANGES,
  VERIFIED_ON,
} from '../content/device-hub-alternatives';

const FAQ_ITEMS = [
  {
    answer:
      'Siniulator is the closest match. It is an open source macOS app that gives each iOS simulator its own window again, with slow animations, shake, screenshots and drag and drop install. iPad, tvOS, watchOS and visionOS support is still incomplete.',
    id: 'best',
    question: 'What is the best alternative to Xcode Device Hub?',
  },
  {
    answer:
      'No. Xcode 27 removed the standalone Simulator.app and opens Device Hub when you run an app on a simulator. The simulators themselves and xcrun simctl still work, which is why tools like Siniulator and simslim can drive them.',
    id: 'back',
    question: 'Can I get Simulator.app back in Xcode 27?',
  },
  {
    answer:
      'Yes, once you upgrade. Expo CLI detects Device Hub from SDK 56, and on SDK 58 expo start, expo run:ios and expo start --ios all handle Xcode 27.',
    id: 'expo',
    question: 'Does expo run:ios work with Device Hub?',
  },
  {
    answer:
      'agent-sim runs iOS simulators on an x86-64 Linux machine and exposes them through an MCP server. Expo Simulators runs them in the cloud and starts them from the EAS CLI. Both suit agents and CI better than a desktop window.',
    id: 'linux',
    question: 'Can I run an iOS simulator without a Mac?',
  },
  {
    answer:
      'Use simslim. It turns off background daemons a simulator does not need and cuts each one from about 4 GB to under 1 GB of memory, so a 16 GB Mac runs about 12 simulators instead of 5.',
    id: 'many',
    question: 'How do I run more simulators on one Mac?',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ answer, question }) => ({
    '@type': 'Question',
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
    name: question,
  })),
};

const PICKS = [
  { need: 'I want my simulator windows back', pick: 'siniulator' },
  { need: 'I run too many simulators for my RAM', pick: 'simslim' },
  { need: 'My agents run on Linux, not on a Mac', pick: 'agent-sim' },
  { need: 'I want iOS and Android in the cloud', pick: 'expo-simulators' },
];

function nameOf(id: string) {
  return ALTERNATIVES.find((tool) => tool.id === id)?.name ?? id;
}

function SwitchTerminal() {
  return (
    <Card className="!bg-slate-900 !text-slate-100 w-full max-w-md font-mono text-sm leading-relaxed ring-slate-800">
      <pre className="overflow-x-auto">
        <code>
          <span className="text-slate-400"># Xcode 27</span>
          {'\n'}
          <span className="text-red-400 line-through">open -a Simulator</span>
          {'\n'}
          <span className="text-red-400">
            Unable to find application named 'Simulator'
          </span>
          {'\n\n'}
          <span className="text-slate-400"># Pick what you actually need</span>
          {'\n'}
          <span className="text-green-400">✓</span> Siniulator
          <span className="text-slate-400"> · windows back</span>
          {'\n'}
          <span className="text-green-400">✓</span> simslim
          <span className="text-slate-400"> · 4x less RAM</span>
          {'\n'}
          <span className="text-green-400">✓</span> agent-sim
          <span className="text-slate-400"> · iOS on Linux</span>
          {'\n'}
          <span className="text-green-400">✓</span> Expo Simulators
          <span className="text-slate-400"> · cloud</span>
        </code>
      </pre>
    </Card>
  );
}

export default function XcodeDeviceHubAlternatives() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Xcode Device Hub alternatives (2026)"
        seoDescription="Xcode 27 replaced Simulator.app with Device Hub. Compare 4 alternatives for iOS simulators: Siniulator, simslim, agent-sim and Expo Simulators."
        ogImageTitle="Xcode Device Hub alternatives"
        ogImageKicker="iOS simulator guide"
        withHeader
        withFooter
        withContainer
      >
        <HeroSplit
          eyebrow={
            <Text tone="primary" as="p" variant="eyebrow">
              Xcode 27 · iOS simulators · Updated {VERIFIED_ON}
            </Text>
          }
          title="4 alternatives to Xcode Device Hub"
          description="Xcode 27 removed the Simulator app and replaced it with Device Hub, a single window for every simulated and physical device. If it slows you down, these tools give you separate simulator windows, lighter simulators, iOS on Linux or simulators in the cloud."
          actions={
            <>
              <LinkButton size="xl" href="#compare">
                Compare the 4 tools
              </LinkButton>
              <LinkButton
                variant="outline"
                className="group"
                size="xl"
                href="/audit"
              >
                Audit my iOS setup
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LinkButton>
            </>
          }
          visual={<SwitchTerminal />}
        />

        <div className="mt-12">
          <Prose>
            <h2>What changed with Device Hub</h2>
            <p>
              Apple describes Device Hub as the place to manage every device
              Xcode can run on. In practice, developers lost a few habits on the
              way. Here is what they reported since the Xcode 27 release.
            </p>
          </Prose>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEVICE_HUB_CHANGES.map((change) => (
              <li key={change.title}>
                <Card size="md" className="h-full">
                  <Text as="h3" variant="h6">
                    {change.title}
                  </Text>
                  <Text
                    as="p"
                    variant="p2"
                    className="mt-2 text-slate-600 dark:text-slate-300"
                  >
                    {change.text}
                  </Text>
                  <Text tone="muted" as="p" variant="c2" className="mt-3">
                    Source:{' '}
                    <Hyperlink href={change.source}>
                      {change.sourceLabel}
                    </Hyperlink>
                  </Text>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24">
          <Prose>
            <h2>Which alternative fits you</h2>
            <p>
              None of these tools replaces Device Hub feature for feature. Each
              one solves a different problem, so start from yours.
            </p>
          </Prose>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PICKS.map(({ need, pick }) => (
              <li key={pick}>
                <a href={`#${pick}`} className="group block h-full">
                  <Card
                    size="md"
                    className="h-full transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-400/10"
                  >
                    <Text
                      as="p"
                      variant="p2"
                      className="text-slate-600 dark:text-slate-300"
                    >
                      “{need}”
                    </Text>
                    <Text as="p" variant="h6" className="mt-3">
                      {nameOf(pick)}
                      <ArrowRightIcon className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Text>
                  </Card>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id="compare" className="mt-24 scroll-mt-24">
          <Prose>
            <h2>Device Hub alternatives at a glance</h2>
          </Prose>
          <Card size="md" className="mt-8 overflow-x-auto !p-0">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th scope="col" className="p-4 font-semibold">
                    Tool
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Type
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Runs on
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Simulators
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    License
                  </th>
                </tr>
              </thead>
              <tbody>
                {ALTERNATIVES.map((tool, index) => (
                  <tr
                    key={tool.id}
                    className={
                      index % 2 === 1 ? 'bg-slate-50 dark:bg-slate-800/40' : ''
                    }
                  >
                    <th scope="row" className="p-4 font-semibold">
                      <a href={`#${tool.id}`} className="hover:underline">
                        {tool.name}
                      </a>
                    </th>
                    <td className="p-4">{tool.kind}</td>
                    <td className="p-4">{tool.runsOn}</td>
                    <td className="p-4">{tool.platforms}</td>
                    <td className="p-4">{tool.license}</td>
                  </tr>
                ))}
                <tr
                  className={
                    ALTERNATIVES.length % 2 === 1
                      ? 'bg-slate-50 dark:bg-slate-800/40'
                      : ''
                  }
                >
                  <th scope="row" className="p-4 font-semibold">
                    Device Hub
                  </th>
                  <td className="p-4">Desktop app (Xcode 27)</td>
                  <td className="p-4">Your Mac</td>
                  <td className="p-4">
                    All Apple platforms + physical devices
                  </td>
                  <td className="p-4">Free with Xcode</td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Text tone="muted" as="p" variant="c2" className="mt-3">
            Facts from each project’s README or product page, checked on{' '}
            {VERIFIED_ON}.
          </Text>
        </div>

        <div className="mt-24 space-y-8">
          {ALTERNATIVES.map((tool, index) => (
            <Card key={tool.id} id={tool.id} size="lg" className="scroll-mt-24">
              <div className="flex flex-wrap items-center gap-3">
                <Text as="h2" variant="h4">
                  {index + 1}. {tool.name}
                </Text>
                <Badge variant="blue">{tool.kind}</Badge>
                <Badge variant="gray">{tool.runsOn}</Badge>
              </div>
              <Text
                as="p"
                variant="p1"
                className="mt-3 text-slate-600 dark:text-slate-300"
              >
                {tool.summary}
              </Text>
              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div>
                  <Text as="h3" variant="h6">
                    What you get
                  </Text>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-200">
                    {tool.facts.map((fact) => (
                      <li key={fact}>
                        <Text as="span" variant="p2">
                          {fact}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Text as="h3" variant="h6">
                    Limits to know
                  </Text>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-200">
                    {tool.limits.map((limit) => (
                      <li key={limit}>
                        <Text as="span" variant="p2">
                          {limit}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-400/10">
                <Text as="p" variant="p2">
                  <strong>Best for:</strong> {tool.bestFor}
                </Text>
              </div>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <pre className="overflow-x-auto rounded-lg bg-slate-900 px-4 py-3 font-mono text-sm text-slate-100">
                  <code>{tool.command}</code>
                </pre>
                <LinkButton href={tool.url} variant="outline" size="lg">
                  Visit {tool.name}
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-24">
          <Prose>
            <h2>When to keep Device Hub</h2>
            <p>
              Device Hub is still the only Apple-supported way to manage
              simulators and physical devices from Xcode 27, and it covers every
              Apple platform, which Siniulator does not yet. Keep it if you
              mostly run one device at a time, and upgrade your tooling instead:
              Expo projects need SDK 58 for full Xcode 27 support.
            </p>
            <p>
              The alternatives stack well with it. simslim makes Device Hub
              simulators lighter, and Siniulator connects to the same simulators
              Device Hub boots. Just know that quitting Device Hub can shut down
              the simulators it started.
            </p>
            <p>
              Looking for more tools for your React Native app? Browse the{' '}
              <Link href="/react-native-tools">
                React Native tools directory
              </Link>{' '}
              or the <Link href="/devtools">React Native devtools list</Link>.
            </p>
          </Prose>
        </div>

        <Faq faqs={FAQ_ITEMS} title="Frequently asked questions" />

        <div className="mx-auto mb-24 max-w-4xl">
          <Card
            size="xl"
            className="flex flex-col items-center justify-center gap-6 text-center"
            variant="gradient-blue"
          >
            <Text as="h2" variant="h4" className="text-white">
              Xcode 27 broke your build or your CI?
            </Text>
            <Text as="p" variant="p1" className="max-w-xl text-white">
              We audit your React Native toolchain, from Xcode and simulators to
              CI and agents, and hand you a plan to ship again.
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

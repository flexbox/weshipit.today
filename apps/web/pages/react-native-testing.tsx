import {
  Badge,
  BookDiscoveryCta,
  Button,
  Card,
  Faq,
  FaqProps,
  FeatureGrid,
  Hyperlink,
  Text,
} from '@weshipit/ui';
import Head from 'next/head';
import {
  BookOpenIcon,
  ChatBubbleBottomCenterIcon,
  CheckCircleIcon,
  CloudIcon,
  CodeBracketSquareIcon,
  CogIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  MapIcon,
  ShieldCheckIcon,
  VideoCameraIcon,
  WrenchScrewdriverIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

function MaestroFlowPreview() {
  return (
    <Card className="w-full max-w-md mx-auto !bg-slate-900 !text-slate-100 ring-slate-800 font-mono text-sm leading-relaxed">
      <div className="flex items-center gap-2 mb-4 text-xs text-slate-400">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-2">flows/login.yaml</span>
      </div>
      <pre className="overflow-x-auto">
        <code>
          <span className="text-purple-300">appId</span>
          <span className="text-slate-400">: </span>com.acme.app
          {'\n'}
          <span className="text-purple-300">---</span>
          {'\n'}- <span className="text-purple-300">launchApp</span>
          {'\n'}- <span className="text-purple-300">tapOn</span>
          <span className="text-slate-400">: </span>Sign in
          {'\n'}- <span className="text-purple-300">tapOn</span>
          <span className="text-slate-400">:</span>
          {'\n'} <span className="text-purple-300">id</span>
          <span className="text-slate-400">: </span>
          <span className="text-green-300">&quot;email-input&quot;</span>
          {'\n'}- <span className="text-purple-300">inputText</span>
          <span className="text-slate-400">: </span>
          <span className="text-green-300">&quot;dev@weshipit.today&quot;</span>
          {'\n'}- <span className="text-purple-300">tapOn</span>
          <span className="text-slate-400">: </span>Continue
          {'\n'}- <span className="text-purple-300">assertVisible</span>
          <span className="text-slate-400">: </span>Welcome back
        </code>
      </pre>
    </Card>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start mb-6">
            <Badge variant="blue" size="sm">
              Mobile testing for React Native
            </Badge>
          </div>
          <Text
            as="h1"
            variant="h1"
            className="uppercase text-black md:tracking-widest"
          >
            Most React Native teams skip e2e tests.
            <br />
            <small className="tracking-tight md:tracking-wide">
              Until the first production crash.
            </small>
          </Text>
          <p className="mt-6 text-lg leading-8 text-gray-500 max-w-xl mx-auto lg:mx-0">
            We set up{' '}
            <Hyperlink href="https://maestro.mobile.dev">Maestro</Hyperlink>{' '}
            end-to-end tests for your React Native app — YAML flows, CI
            integration, team handoff — in two weeks, one flat fee.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              href={linksApi.cal.ONBOARDING}
              as="a"
              isExternalLink={true}
              size="xl"
            >
              Book a call
            </Button>
            <Button
              href="https://maestro.mobile.dev"
              as="a"
              isExternalLink={true}
              size="xl"
              variant="ghost"
            >
              What&apos;s Maestro?
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <MaestroFlowPreview />
        </div>
      </div>
    </section>
  );
}

function WhyMaestro() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <Badge variant="blue" size="sm">
          Why Maestro
        </Badge>
        <Text as="h2" variant="h2" className="mt-4">
          A simpler stack for mobile tests
        </Text>
        <p className="mt-4 text-lg leading-8 text-gray-500 max-w-2xl mx-auto">
          Most React Native teams skip mobile end-to-end tests or wrestle with
          Detox flakiness for months. Maestro takes a different approach.
        </p>
      </div>
      <FeatureGrid
        columns={3}
        items={[
          {
            icon: <DocumentTextIcon />,
            title: 'Readable flows',
            description:
              'A login test is 10 lines of YAML — readable by product managers, not just engineers.',
          },
          {
            icon: <ShieldCheckIcon />,
            title: 'Stable by default',
            description:
              'Built-in retry and wait logic means you stop chasing flaky tests at 2am.',
          },
          {
            icon: <DevicePhoneMobileIcon />,
            title: 'One flow, two platforms',
            description:
              'The same script runs on iOS and Android. No duplicated test code.',
          },
          {
            icon: <CloudIcon />,
            title: 'Cloud-ready',
            description:
              'Runs locally, in GitHub Actions, or on Maestro Cloud — you pick.',
          },
          {
            icon: <CodeBracketSquareIcon />,
            title: 'Open source',
            description:
              'No vendor lock-in. Your tests are YAML files in your repo.',
          },
        ]}
      />
    </section>
  );
}

function WhatYouGet() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 bg-slate-50 dark:bg-slate-900/30 rounded-3xl">
      <div className="text-center mb-12">
        <Badge variant="blue" size="sm">
          What you get
        </Badge>
        <Text as="h2" variant="h2" className="mt-4">
          A productized engagement
        </Text>
        <p className="mt-4 text-lg leading-8 text-gray-500 max-w-2xl mx-auto">
          Fixed scope, fixed timeline. Two weeks from kickoff to handoff.
        </p>
      </div>
      <FeatureGrid
        columns={3}
        items={[
          {
            icon: <WrenchScrewdriverIcon />,
            title: 'Maestro installed and wired',
            description:
              'Wired to your existing React Native project — iOS and Android, simulator and device.',
          },
          {
            icon: <MapIcon />,
            title: '5 critical user journeys',
            description:
              'Login, onboarding, payment, core feature — picked with you during kickoff.',
          },
          {
            icon: <CogIcon />,
            title: 'CI/CD integration',
            description:
              'GitHub Actions workflow that runs your flows on every PR, or Maestro Cloud if you prefer.',
          },
          {
            icon: <BookOpenIcon />,
            title: 'Runbook & README',
            description:
              'Tailored to your team — how to add a flow, debug a failure, run locally.',
          },
          {
            icon: <VideoCameraIcon />,
            title: 'Recorded handoff session',
            description:
              '30-minute session recorded so your team can refer back whenever.',
          },
          {
            icon: <ChatBubbleBottomCenterIcon />,
            title: '14 days of follow-up',
            description:
              'Direct message me whenever a flow needs adjusting after handoff.',
          },
        ]}
      />
    </section>
  );
}

function Timeline() {
  const steps = [
    {
      number: '01',
      week: 'Week 1',
      title: 'Kickoff & setup',
      body: '60-minute call to pick the 5 user journeys. We install Maestro, write the first flows, run them green on your simulator.',
    },
    {
      number: '02',
      week: 'Week 2',
      title: 'CI & handoff',
      body: 'The remaining flows go in, GitHub Actions (or Maestro Cloud) is wired, runbook is written, and we record the handoff session.',
    },
    {
      number: '03',
      week: 'After handoff',
      title: 'Follow-up support',
      body: 'Two weeks of message-based support so your team can ship flow #6 without rebuilding the setup from scratch.',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <Badge variant="blue" size="sm">
          Timeline
        </Badge>
        <Text as="h2" variant="h2" className="mt-4">
          How the two weeks go
        </Text>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <Card key={step.number} className="relative">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-4xl font-extrabold text-blue-600">
                {step.number}
              </span>
              <Badge variant="gray-lighter" size="sm">
                {step.week}
              </Badge>
            </div>
            <Text as="h3" variant="h4" className="mb-3">
              {step.title}
            </Text>
            <p className="text-gray-600 dark:text-gray-300">{step.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function WhoItsFor() {
  const goodFit = [
    'React Native apps already in production (or close to it) with no end-to-end coverage today.',
    'Teams burned by Detox flakiness who want a simpler stack.',
    'Founders and CTOs who need confidence to ship faster without a dedicated QA hire.',
  ];
  const notFit = [
    'Apps still pre-MVP — wait until your core flows are stable.',
    "Test stack already humming. We don't fix what isn't broken.",
    'Exhaustive coverage (50+ flows, regression suites) — book a call for a custom scope.',
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <Badge variant="blue" size="sm">
          Fit check
        </Badge>
        <Text as="h2" variant="h2" className="mt-4">
          Who this is for
        </Text>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="green">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircleIcon className="h-7 w-7 text-green-600" />
            <Text as="h3" variant="h4" style={{ margin: 0 }}>
              Good fit
            </Text>
          </div>
          <ul className="space-y-3">
            {goodFit.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircleIcon className="h-5 w-5 text-green-600 shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card variant="red">
          <div className="flex items-center gap-3 mb-4">
            <XCircleIcon className="h-7 w-7 text-red-600" />
            <Text as="h3" variant="h4" style={{ margin: 0 }}>
              Not the right fit
            </Text>
          </div>
          <ul className="space-y-3">
            {notFit.map((item) => (
              <li key={item} className="flex gap-3">
                <XCircleIcon className="h-5 w-5 text-red-600 shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}

const faqs: FaqProps[] = [
  {
    id: 'rnt-faq-flat-fee',
    question: 'What does "flat fee" actually mean?',
    answer:
      "One number, agreed upfront, covers everything in scope: setup, the 5 flows, CI wiring, runbook, recorded handoff session, and 14 days of post-handoff support. No hourly billing, no scope-creep invoices. If the work takes longer than 2 weeks because of something on our end, that's our problem, not yours. The exact number depends on your app's complexity — book a 30-minute call and we'll quote on the spot.",
  },
  {
    id: 'rnt-faq-after-14-days',
    question: 'What happens after the 14-day support window ends?',
    answer:
      "You own the test suite outright — it's YAML files in your repo. The runbook we wrote makes adding new flows a copy-paste-tweak operation that any teammate can do. If you'd rather we keep maintaining or extending the suite, you can book a follow-up engagement or fold it into a weshipit.today subscription. There's never a renewal lock-in.",
  },
  {
    id: 'rnt-faq-flows-break',
    question: 'What if my flows break after the support window?',
    answer:
      'Flows usually break because the UI changed — a renamed test ID, a new modal in the navigation path, a redesigned login screen. The runbook walks your team through diagnosing and fixing common breakages in under 10 minutes. For deeper issues, ping me directly — most one-off fixes take less than an hour and we keep DMs open even after the engagement.',
  },
  {
    id: 'rnt-faq-expo-vs-bare',
    question: 'Does this work with Expo, bare React Native, or both?',
    answer:
      "Both. Maestro tests the running app, not the build system — as long as your app boots on an iOS simulator or Android emulator, we can wire it up. We've set Maestro up for Expo managed workflow, Expo bare workflow, and bare React Native indistinguishably. EAS Build, Fastlane, or a hand-rolled CI all work too.",
  },
  {
    id: 'rnt-faq-more-than-5-flows',
    question: 'Can you cover more than 5 flows?',
    answer:
      "Yes, but the 5-flow productized scope is the sharpest one — it's the smallest set that meaningfully covers your highest-risk user journeys, which is where E2E tests pay back fastest. If you need 10, 20, or a full regression suite, we'll scope a custom engagement on the discovery call. Same flat-fee philosophy, just a bigger number and longer timeline.",
  },
  {
    id: 'rnt-faq-team-no-maestro-experience',
    question: 'What if my team has never used Maestro?',
    answer:
      "Most of our clients hadn't. Maestro flows are YAML — closer to a step-by-step checklist than test code. The 30-minute recorded handoff session and the runbook are designed so a non-expert teammate can add their first flow within an afternoon. No prior Maestro experience required from your side.",
  },
];

function Faqs() {
  return (
    <section
      id="faq"
      className="mx-auto max-w-4xl px-4 sm:px-6 py-16 scroll-mt-24"
    >
      <Faq faqs={faqs} title="Common questions" headingId="rnt-faq-heading" />
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 mb-12">
      <BookDiscoveryCta
        ctaLink={linksApi.cal.ONBOARDING}
        title="Ready to ship with confidence?"
        description="Book a 30-minute call. We’ll look at your app, scope the 5 flows, and confirm the timeline. If it’s not the right fit, we’ll say so."
      />
    </section>
  );
}

export default function ReactNativeTesting() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <Layout
      withFooter
      seoTitle="Mobile App Testing with Maestro for React Native"
      seoDescription="Productized end-to-end testing setup for React Native apps using Maestro. We write YAML flows for your 5 core user journeys, wire CI, and hand off in 2 weeks. Flat fee."
      ogImageTitle="Mobile testing for React Native, done in 2 weeks"
      withHeader
      callToActionButton={{
        name: 'Book a call',
        href: linksApi.cal.ONBOARDING,
        isExternalLink: true,
      }}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <main>
        <HeroSection />
        <WhyMaestro />
        <WhatYouGet />
        <Timeline />
        <WhoItsFor />
        <Faqs />
        <FinalCta />
      </main>
    </Layout>
  );
}

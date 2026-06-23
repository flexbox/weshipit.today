import {
  BookDiscoveryCta,
  Button,
  Card,
  Hero,
  Hyperlink,
  Prose,
  Text,
} from '@weshipit/ui';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

export default function ReactNativeTesting() {
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
      <Hero title="">
        <Text
          as="h1"
          variant="h1"
          className="mt-12 text-center uppercase tracking-tight text-black md:tracking-widest"
        >
          End-to-end mobile testing
          <br />
          <small className="tracking-tight md:tracking-wide">
            shipped in 2 weeks
          </small>
        </Text>

        <Prose className="mx-auto mt-8 max-w-2xl text-center">
          <Text as="p">
            We set up{' '}
            <Hyperlink href="https://maestro.mobile.dev">Maestro</Hyperlink>{' '}
            end-to-end tests for your React Native app — YAML flows, CI
            integration, team handoff — in two weeks, one flat fee.
          </Text>
        </Prose>

        <div className="mt-12 flex justify-center">
          <Button
            href={linksApi.cal.ONBOARDING}
            as="a"
            isExternalLink={true}
            size="xl"
          >
            Book a call
          </Button>
        </div>
      </Hero>

      <Prose className="mx-auto mt-12 max-w-3xl">
        <Card>
          <Text as="h2" variant="h3" style={{ marginTop: 0 }}>
            Why Maestro for React Native
          </Text>
          <Text as="p">
            Most React Native teams either skip mobile end-to-end tests entirely
            or wrestle with Detox flakiness for months. Maestro takes a
            different approach: tests are short YAML files, retries and waits
            are built in, and the same flow runs on iOS and Android without
            platform branching.
          </Text>
          <ul>
            <li>
              ✍️ <strong>Readable flows.</strong> A login test is 10 lines of
              YAML — readable by product managers, not just engineers.
            </li>
            <li>
              🪨 <strong>Stable by default.</strong> Built-in retry and wait
              logic means you stop chasing flaky tests at 2am.
            </li>
            <li>
              📱 <strong>One flow, two platforms.</strong> The same script runs
              on iOS and Android. No duplicated test code.
            </li>
            <li>
              ☁️ <strong>Cloud-ready.</strong> Runs locally, in GitHub Actions,
              or on Maestro Cloud — you pick.
            </li>
            <li>
              🦅 <strong>Open source.</strong> No vendor lock-in. Your tests are
              YAML files in your repo.
            </li>
          </ul>
        </Card>
      </Prose>

      <Prose className="mx-auto mt-12 max-w-3xl">
        <Card>
          <Text as="h2" variant="h3" style={{ marginTop: 0 }}>
            What you get
          </Text>
          <Text as="p">
            A productized engagement with a fixed scope and a fixed timeline.
            Two weeks from kickoff to handoff.
          </Text>
          <ul>
            <li>
              🛠️ <strong>Maestro installed and wired</strong> to your existing
              React Native project (iOS and Android, simulator and device).
            </li>
            <li>
              🧭 <strong>5 critical user journeys</strong> covered as Maestro
              flows — chosen with you during kickoff (login, onboarding,
              payment, core feature, etc.).
            </li>
            <li>
              🤖 <strong>CI/CD integration</strong> — GitHub Actions workflow
              that runs your flows on every pull request, or Maestro Cloud setup
              if you prefer.
            </li>
            <li>
              📓 <strong>Runbook and README</strong> tailored to your team — how
              to add a flow, how to debug a failure, how to run locally.
            </li>
            <li>
              🎥 <strong>30-minute handoff session</strong> recorded so your
              team can refer back.
            </li>
            <li>
              💬 <strong>14 days of follow-up support</strong> after handoff —
              direct message me whenever a flow needs adjusting.
            </li>
          </ul>
        </Card>
      </Prose>

      <Prose className="mx-auto mt-12 max-w-3xl">
        <Card>
          <Text as="h2" variant="h3" style={{ marginTop: 0 }}>
            How the two weeks go
          </Text>
          <ul>
            <li>
              <strong>Week 1 — Kickoff and setup.</strong> 60-minute call to
              pick the 5 user journeys. We install Maestro, write the first
              flows, run them green on your simulator.
            </li>
            <li>
              <strong>Week 2 — CI and handoff.</strong> The remaining flows go
              in, GitHub Actions (or Maestro Cloud) is wired, runbook is
              written, and we record the handoff session.
            </li>
            <li>
              <strong>After handoff.</strong> Two weeks of message-based support
              so your team can ship flow #6 without rebuilding the setup from
              scratch.
            </li>
          </ul>
        </Card>
      </Prose>

      <Prose className="mx-auto mt-12 max-w-3xl">
        <Card>
          <Text as="h2" variant="h3" style={{ marginTop: 0 }}>
            Who this is for
          </Text>
          <ul>
            <li>
              ✅ React Native apps already in production (or close to it) with
              no end-to-end coverage today.
            </li>
            <li>
              ✅ Teams burned by Detox flakiness who want a simpler stack.
            </li>
            <li>
              ✅ Founders and CTOs who need confidence to ship faster without a
              dedicated QA hire.
            </li>
          </ul>
          <Text as="p">
            <em>Not the right fit</em> if your app is still pre-MVP, if your
            test stack is already humming, or if you need exhaustive coverage
            (50+ flows, regression suites). For exhaustive coverage, book a call
            and we&apos;ll scope a custom engagement.
          </Text>
        </Card>
      </Prose>

      <div className="mx-auto mt-12 max-w-3xl mb-24 px-4">
        <BookDiscoveryCta
          ctaLink={linksApi.cal.ONBOARDING}
          title="Ready to ship with confidence?"
          description="Book a 30-minute call. We’ll look at your app, scope the 5 flows, and confirm the timeline. If it’s not the right fit, we’ll say so."
        />
      </div>
    </Layout>
  );
}

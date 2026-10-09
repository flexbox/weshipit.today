import {
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
import { SpmReadinessAudit } from '../components/spm-readiness-audit';

const FAQ_ITEMS = [
  {
    id: 'break',
    question: 'Will my React Native app stop building on December 2, 2026?',
    answer:
      'No. CocoaPods trunk becomes read-only, so existing pod versions keep installing. What stops is new releases: SDKs that move to Swift Package Manager only (Firebase already did) will no longer ship fixes or security patches through CocoaPods.',
  },
  {
    id: 'now',
    question: 'Should I migrate to Swift Package Manager now?',
    answer:
      'Not in production yet. SPM support is experimental in React Native 0.87 and its commands may change. Do the groundwork now: upgrade to 0.87, map your native dependencies, remove Podfile hacks and run a spike on a branch.',
  },
  {
    id: 'expo',
    question: 'Does it work with Expo?',
    answer:
      'Only in expo@canary releases for now. On a managed or CNG project, wait for a stable Expo SDK with SPM support and use the waiting time to check which of your config plugins and native modules ship a Package.swift.',
  },
  {
    id: 'library',
    question: 'What if a library has no Package.swift?',
    answer:
      'Run npx react-native spm scaffold to generate one from its podspec. Libraries that mix Swift and C++ in one target or rely on podspec script phases need an upstream fix, a patch, or a replacement.',
  },
  {
    id: 'revert',
    question: 'Can I go back to CocoaPods?',
    answer:
      'Yes. The migration keeps your .xcodeproj in place, and npx react-native spm deinit removes the injected package references. CocoaPods stays the default and supported path in React Native 0.87.',
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

const TIMELINE = [
  {
    date: 'Aug 11, 2026',
    title: 'React Native 0.87',
    text: 'Experimental, opt-in Swift Package Manager support for iOS.',
  },
  {
    date: 'Oct 2026',
    title: 'Firebase leaves CocoaPods',
    text: 'New Firebase iOS SDK versions ship through SPM only.',
  },
  {
    date: 'Nov 1–7, 2026',
    title: 'Read-only test run',
    text: 'CocoaPods trunk is temporarily frozen. No pod can be published.',
  },
  {
    date: 'Dec 2, 2026',
    title: 'Trunk goes read-only',
    text: 'No new pod versions, ever. Existing ones still install.',
  },
];

const BLOCKERS = [
  {
    title: 'Swift + C++ libraries',
    text: 'SPM cannot mix Swift and C++ in one target. Nitro modules, VisionCamera and MMKV are affected until they split their targets.',
  },
  {
    title: 'Podspec script phases',
    text: 'Libraries running Ruby or shell logic from their podspec need an SPM plugin or a new build step.',
  },
  {
    title: 'Bare header imports',
    text: 'Headers now come from ReactNativeHeaders.xcframework. #import <RCTAppDelegate.h> becomes #import <React/RCTAppDelegate.h>.',
  },
  {
    title: 'Podfile post_install hooks',
    text: 'Build settings patched in Ruby have no SPM equivalent. Move them to the Xcode project or drop them.',
  },
  {
    title: 'Build from source',
    text: 'The first phase consumes prebuilt XCFrameworks only. Patching React Native native code means staying on CocoaPods.',
  },
  {
    title: 'Expo',
    text: 'Available in expo@canary only. Managed and CNG apps should wait for a stable SDK.',
  },
];

function MigrationTerminal() {
  return (
    <Card className="!bg-slate-900 !text-slate-100 w-full max-w-md font-mono text-sm leading-relaxed ring-slate-800">
      <pre className="overflow-x-auto">
        <code>
          <span className="text-slate-400"># Before: Ruby + CocoaPods</span>
          {'\n'}
          <span className="text-red-400 line-through">
            bundle exec pod install
          </span>
          {'\n\n'}
          <span className="text-slate-400"># After: Xcode only</span>
          {'\n'}cd ios
          {'\n'}npx react-native spm --deintegrate
          {'\n\n'}
          <span className="text-green-400">✓ Package.swift injected</span>
          {'\n'}
          <span className="text-green-400">✓ Podfile removed</span>
          {'\n'}
          <span className="text-green-400">✓ .xcodeproj kept in place</span>
        </code>
      </pre>
    </Card>
  );
}

export default function ReactNativeSwiftPackageManagerMigration() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Layout
        seoTitle="CocoaPods to Swift Package Manager in React Native (0.87)"
        seoDescription="CocoaPods goes read-only on December 2, 2026. Check if your React Native app is ready for Swift Package Manager in 12 questions, then follow the 0.87 migration steps."
        ogImageTitle="Migrate React Native from CocoaPods to SPM"
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
              Free tool · React Native 0.87 · iOS
            </Text>
          }
          title="Migrate React Native from CocoaPods to Swift Package Manager"
          description="CocoaPods stops accepting new pods on December 2, 2026. Find out in 2 minutes what stands between your app and Swift Package Manager."
          actions={
            <>
              <LinkButton size="xl" href="#readiness">
                Check my readiness
              </LinkButton>
              <LinkButton
                variant="outline"
                className="group"
                size="xl"
                href="/audit"
              >
                Get migration help
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LinkButton>
            </>
          }
          visual={<MigrationTerminal />}
        />

        <div className="mt-12">
          <Prose>
            <h2>The CocoaPods deadline</h2>
            <p>
              Your app keeps building after December 2. The risk is slower:
              every native SDK that moves to Swift Package Manager only stops
              shipping fixes and security patches to your Podfile.
            </p>
          </Prose>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((step) => (
              <li key={step.title}>
                <Card size="md" className="h-full">
                  <Text
                    as="p"
                    variant="c2"
                    className="uppercase tracking-wide text-blue-600 dark:text-blue-400"
                  >
                    {step.date}
                  </Text>
                  <Text as="h3" variant="h6" className="mt-2">
                    {step.title}
                  </Text>
                  <Text
                    as="p"
                    variant="p2"
                    className="mt-2 text-slate-600 dark:text-slate-300"
                  >
                    {step.text}
                  </Text>
                </Card>
              </li>
            ))}
          </ol>
        </div>

        <div id="readiness" className="mt-24 scroll-mt-24">
          <SpmReadinessAudit />
        </div>

        <div className="mt-24 grid items-center gap-8 lg:grid-cols-2">
          <Prose>
            <h2>How the migration works in React Native 0.87</h2>
            <p>
              <Hyperlink href="https://reactnative.dev/blog/2026/08/11/react-native-0.87#experimental-swift-package-manager-support-for-ios">
                React Native 0.87
              </Hyperlink>{' '}
              injects Swift package references into your existing{' '}
              <code>.xcodeproj</code>. Signing, capabilities and build phases
              stay untouched. No Ruby, no Bundler, no <code>pod install</code>.
            </p>
            <ol>
              <li>Upgrade to React Native 0.87.</li>
              <li>
                Run the migration from the <code>ios</code> folder.
              </li>
              <li>
                Generate a <code>Package.swift</code> for each library that
                lacks one.
              </li>
              <li>
                Replace <code>pod install</code> with{' '}
                <code>npx react-native spm</code> in CI and after a fresh clone.
              </li>
            </ol>
            <p>
              The full design lives in{' '}
              <Hyperlink href="https://github.com/react-native-community/discussions-and-proposals/pull/994">
                RFC #994
              </Hyperlink>
              .
            </p>
          </Prose>
          <Card className="!bg-slate-900 !text-slate-100 font-mono text-sm leading-relaxed ring-slate-800">
            <pre className="overflow-x-auto">
              <code>
                <span className="text-slate-400"># Migrate from CocoaPods</span>
                {'\n'}cd ios
                {'\n'}npx react-native spm --deintegrate
                {'\n\n'}
                <span className="text-slate-400">
                  # Library without Package.swift
                </span>
                {'\n'}npx react-native spm scaffold
                {'\n\n'}
                <span className="text-slate-400">
                  # Fresh clone or CI (replaces pod install)
                </span>
                {'\n'}npx react-native spm
                {'\n\n'}
                <span className="text-slate-400"># Roll back</span>
                {'\n'}npx react-native spm deinit
              </code>
            </pre>
          </Card>
        </div>

        <div className="mt-24">
          <Prose>
            <h2>What blocks a migration today</h2>
            <p>
              SPM support is experimental and not production-ready yet. These
              are the issues we expect on real codebases.
            </p>
          </Prose>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BLOCKERS.map((blocker) => (
              <Card key={blocker.title} size="md">
                <Text as="h3" variant="h6">
                  {blocker.title}
                </Text>
                <Text
                  as="p"
                  variant="p2"
                  className="mt-2 text-slate-600 dark:text-slate-300"
                >
                  {blocker.text}
                </Text>
              </Card>
            ))}
          </div>
          <Prose className="mt-8">
            <p>
              Also on your list before the next release? Run the{' '}
              <Link href="/react-native-security-audit">
                free React Native security audit
              </Link>
              .
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
              Migrating a production app?
            </Text>
            <Text as="p" variant="p1" className="max-w-xl text-white">
              We map every native dependency, flag the blockers and hand you a
              migration plan you can ship before your SDKs leave CocoaPods.
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

import { Card, Faq, Hero, LinkButton, Prose, Text } from '@weshipit/ui';
import Head from 'next/head';
import Link from 'next/link';
import { IsReactNativeChecker } from '../components/is-react-native-checker';
import { Layout } from '../components/layout';

const FAQ_ITEMS = [
  {
    id: 'how',
    question: 'How do you know if an app is built with React Native?',
    answer:
      'Every React Native Android app ships the React Native runtime as native libraries (libreactnative.so, or libreactnativejni.so on older versions) and a JavaScript bundle (index.android.bundle). We list the files inside the APK from Google Play and look for them.',
  },
  {
    id: 'download',
    question: 'Do you download the whole app?',
    answer:
      'No. An APK is a ZIP file, and its table of contents sits at the end. We read only that part with HTTP range requests, usually a few hundred KB out of a 50 MB app.',
  },
  {
    id: 'expo',
    question: 'Can it tell if the app uses Expo?',
    answer:
      'Yes. Expo modules leave their own native files in the APK (expo-modules-core, expo-*.kotlin_module). If they are present, the app uses Expo.',
  },
  {
    id: 'ios',
    question: 'Does it work with App Store links?',
    answer:
      'Not yet. iOS apps are encrypted on the App Store, so they cannot be inspected the same way. Most apps ship with the same stack on both stores: paste the Google Play link instead.',
  },
  {
    id: 'other',
    question: 'What if the app is not React Native?',
    answer:
      'We also detect Flutter, Capacitor, Cordova, .NET MAUI / Xamarin, NativeScript and Unity. If none of them match, the app is native Android (Kotlin or Java).',
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

const STEPS = [
  {
    title: 'Paste a Google Play link',
    text: 'Any locale works, or just the package id like com.discord.',
  },
  {
    title: 'We open the APK',
    text: 'Only the file list is read, never the whole app.',
  },
  {
    title: 'Get a yes or no',
    text: 'Plus Expo, Hermes and the files that prove it.',
  },
];

export default function IsReactNative() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Is this app built with React Native? Free checker"
        seoDescription="Paste a Google Play link and find out in seconds if the app is built with React Native, Expo or Flutter. Free, no sign-up."
        ogImageTitle="Is this app built with React Native?"
        withHeader
        withFooter
        withContainer
      >
        <Hero
          title="Is this app built with React Native?"
          description="Paste a Google Play link. We look inside the APK and tell you if it runs React Native, with or without Expo."
        />

        <IsReactNativeChecker />

        <div className="mt-24 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <Card key={step.title} size="md">
              <Text
                as="p"
                variant="c2"
                className="uppercase tracking-wide text-blue-600 dark:text-blue-400"
              >
                Step {index + 1}
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
          ))}
        </div>

        <div className="mt-24">
          <Prose>
            <h2>Looking for React Native apps made in France?</h2>
            <p>
              Browse the{' '}
              <Link href="/french-react-native-apps">
                French React Native apps
              </Link>{' '}
              list: banks, retail, travel and more, all shipped with React
              Native.
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
              Building your app with React Native?
            </Text>
            <Text as="p" variant="p1" className="max-w-xl text-white">
              We help teams ship and maintain React Native and Expo apps. Start
              with an audit of your codebase.
            </Text>
            <LinkButton href="/audit" variant="outline" size="xl">
              Discover the audit
            </LinkButton>
          </Card>
        </div>
      </Layout>
    </>
  );
}

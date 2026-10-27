import { Badge, Card, Faq, Hero, LinkButton, Prose, Text } from '@weshipit/ui';
import Head from 'next/head';
import Link from 'next/link';
import { IsReactNativeChecker } from '../components/is-react-native-checker';
import { Layout } from '../components/layout';
import { AUTHOR_SCHEMA, PUBLISHER_SCHEMA } from '../utils/schema';

const PAGE_URL = 'https://weshipit.today/is-react-native';

const SEO_DESCRIPTION =
  'Paste a Google Play link to see if an app is built with React Native, Expo or Flutter. We read the APK file list and show the proof. Free, no sign-up.';

// Each result was checked with this tool in October 2026.
const POPULAR_APPS = [
  { expo: false, id: 'com.discord', name: 'Discord' },
  { expo: true, id: 'xyz.blueskyweb.app', name: 'Bluesky' },
  { expo: true, id: 'com.coinbase.android', name: 'Coinbase' },
  { expo: true, id: 'com.teslamotors.tesla', name: 'Tesla' },
  {
    expo: false,
    id: 'com.microsoft.office.outlook',
    name: 'Microsoft Outlook',
  },
  { expo: false, id: 'com.microsoft.teams', name: 'Microsoft Teams' },
  { expo: true, id: 'com.planet.centerparcs', name: 'Center Parcs' },
];

const SIGNATURES = [
  {
    file: 'lib/<abi>/libreactnative.so',
    meaning: 'React Native runtime (React Native 0.76 and later)',
  },
  {
    file: 'lib/<abi>/libreactnativejni.so',
    meaning: 'React Native runtime (before 0.76)',
  },
  {
    file: 'assets/index.android.bundle',
    meaning: 'The JavaScript bundle of the app',
  },
  {
    file: 'lib/<abi>/libhermes.so or libhermesvm.so',
    meaning: 'Hermes JavaScript engine',
  },
  {
    file: 'lib/<abi>/libexpo-modules-core.so',
    meaning: 'Expo modules',
  },
  {
    file: 'lib/<abi>/libflutter.so',
    meaning: 'Flutter, not React Native',
  },
];

const FAQ_ITEMS = [
  {
    id: 'how',
    question: 'How do you know if an app is built with React Native?',
    answer:
      'Every React Native Android app ships the React Native runtime as native libraries (libreactnative.so, or libreactnativejni.so on older versions) and a JavaScript bundle (index.android.bundle). We list the files inside the APK from Google Play and look for them.',
  },
  {
    id: 'popular',
    question: 'Which popular apps are built with React Native?',
    answer:
      'Discord, Bluesky, Coinbase, Tesla, Microsoft Outlook and Microsoft Teams all ship React Native in their Android app. Bluesky, Coinbase and Tesla also use Expo.',
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
    id: 'other',
    question: 'How can I tell if an app uses Flutter instead?',
    answer:
      'Flutter apps ship libflutter.so and a flutter_assets folder. The checker detects Flutter, Capacitor, Cordova, .NET MAUI / Xamarin, NativeScript and Unity. If none of them match, the app is native Android (Kotlin or Java).',
  },
  {
    id: 'accuracy',
    question: 'Can the result be wrong?',
    answer:
      'Rarely. A company can rename or merge the React Native libraries in a custom build. The files we look for are then missing and the app shows as native.',
  },
  {
    id: 'ios',
    question: 'Does it work with App Store links?',
    answer:
      'Not yet. iOS apps are encrypted on the App Store, so they cannot be inspected the same way. Most apps ship with the same stack on both stores: paste the Google Play link instead.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${PAGE_URL}#app`,
      name: 'Is this app built with React Native?',
      url: PAGE_URL,
      description: SEO_DESCRIPTION,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      author: AUTHOR_SCHEMA,
      publisher: PUBLISHER_SCHEMA,
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    },
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <Layout
        seoTitle="Is this app built with React Native? Free checker"
        seoDescription={SEO_DESCRIPTION}
        ogImageTitle="Is this app built with React Native?"
        ogImageKicker="Free tool"
        withHeader
        withFooter
        withContainer
      >
        <Hero
          title="Is this app built with React Native?"
          description="Paste a Google Play link. We look inside the APK and tell you if the app runs React Native, with or without Expo, or another framework like Flutter."
        />

        <IsReactNativeChecker />

        <section className="mt-24">
          <Text as="h2" variant="h4">
            How the checker works
          </Text>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
        </section>

        <section className="mt-24">
          <Text as="h2" variant="h4">
            Popular apps built with React Native
          </Text>
          <Text
            as="p"
            variant="p1"
            className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300"
          >
            Checked with this tool in October 2026. Open one to see the files
            that prove it.
          </Text>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_APPS.map((app) => (
              <li key={app.id}>
                <Link
                  href={`/is-react-native?id=${app.id}`}
                  className="flex h-full flex-col gap-3 rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition-shadow hover:shadow-md dark:bg-white/5 dark:ring-white/10"
                >
                  <Text as="span" variant="h6">
                    Is {app.name} built with React Native?
                  </Text>
                  <span className="flex flex-wrap gap-2">
                    <Badge size="sm" variant="green">
                      Yes
                    </Badge>
                    {app.expo && (
                      <Badge size="sm" variant="blue">
                        Expo
                      </Badge>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Text
            as="p"
            variant="p1"
            className="mt-6 text-slate-600 dark:text-slate-300"
          >
            Looking for more? Browse the{' '}
            <Link
              href="/french-react-native-apps"
              className="font-medium text-blue-600 underline dark:text-blue-400"
            >
              French React Native apps
            </Link>{' '}
            list.
          </Text>
        </section>

        <div className="mt-24">
          <Prose>
            <h2>How to tell if an app is built with React Native</h2>
            <p>
              A React Native app is a native shell that runs JavaScript. On
              Android, both parts end up as files inside the APK, and their
              names give the framework away.
            </p>
            <table>
              <thead>
                <tr>
                  <th>File in the APK</th>
                  <th>What it means</th>
                </tr>
              </thead>
              <tbody>
                {SIGNATURES.map((signature) => (
                  <tr key={signature.file}>
                    <td>
                      <code>{signature.file}</code>
                    </td>
                    <td>{signature.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              The bundle is the app code itself (see{' '}
              <Link href="/react-native-glossary/javascript-bundle">
                JavaScript bundle
              </Link>
              ). <Link href="/react-native-glossary/hermes">Hermes</Link> is the
              default engine since React Native 0.70, and{' '}
              <Link href="/react-native-glossary/expo">Expo</Link> modules leave
              their own libraries next to it.
            </p>
            <h3>Check an APK yourself</h3>
            <p>
              If you already have the APK file, list its content and search for
              these names:
            </p>
            <pre>
              <code>
                unzip -l app.apk | grep -E
                &quot;libreactnative|index.android.bundle|libhermes|expo&quot;
              </code>
            </pre>
            <p>
              Apps from Google Play are often split APKs. In that case the
              native libraries sit in the architecture split (for example{' '}
              <code>config.arm64_v8a.apk</code>), not in the base APK. The
              checker above reads both.
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

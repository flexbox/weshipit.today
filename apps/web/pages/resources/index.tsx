import Link from 'next/link';
import { Card, FadeIn, FadeInStagger, Hero, Text } from '@weshipit/ui';
import { Layout } from '../../components/layout';
import {
  headerNavigation,
  headerCallToActionButton,
  resourcesLinks,
} from '../../utils/navigation';

const descriptions: Record<string, string> = {
  '/resources/react-native-tools':
    'Curated directory of React Native libraries, SDKs, and utilities.',
  '/resources/dev-tools':
    'Developer tools that make React Native work faster and easier.',
  '/resources/react-native-starters':
    'Production-ready React Native starter templates for every stack.',
  '/resources/react-native-migration':
    'Step-by-step playbook for migrating to (or off) React Native.',
  '/resources/react-native-glossary':
    'Plain-language definitions of React Native and mobile development terms.',
  '/resources/learn':
    'Where to start: hand-picked tutorials, books, and learning paths.',
  '/resources/french-apps':
    'French apps built with React Native — discover and benchmark.',
};

export default function ResourcesIndex() {
  return (
    <Layout
      withHeader
      withFooter
      seoTitle="React Native Resources"
      seoDescription="Tools, starters, guides, and glossary — everything you need to build, ship, and scale React Native apps."
      ogImageAlt="weshipit.today — React Native Resources"
      navigation={headerNavigation}
      callToActionButton={headerCallToActionButton}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn>
          <Hero
            title="React Native Resources"
            description="The complete library of tools, starters, and guides we use to ship."
          />
        </FadeIn>

        <FadeInStagger>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resourcesLinks.map((resource) => (
              <FadeIn key={resource.href}>
                <Link href={resource.href} className="block h-full">
                  <Card
                    variant="link"
                    shadow="light"
                    size="lg"
                    className="h-full flex flex-col"
                  >
                    <Text as="h2" variant="h3">
                      {resource.name}
                    </Text>
                    <Text as="p" variant="p1" className="mt-2 flex-1">
                      {descriptions[resource.href] ?? ''}
                    </Text>
                    <Text as="span" variant="p2" className="mt-4 font-semibold">
                      Open →
                    </Text>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>
      </div>
    </Layout>
  );
}

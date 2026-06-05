import Link from 'next/link';
import { Card, FadeIn, FadeInStagger, Hero, Text } from '@weshipit/ui';
import { Layout } from '../../components/layout';
import {
  headerNavigation,
  headerCallToActionButton,
} from '../../utils/navigation';

const services = [
  {
    title: 'Subscription React Native Dev',
    description:
      'One flat fee, zero billable hours. Pause or cancel anytime. The fastest way to ship your React Native app.',
    href: '/',
    cta: 'See plans',
  },
  {
    title: 'Consulting',
    description:
      'Expert React Native consulting for engineering teams. Ship faster, reduce technical debt, level up your mobile practice.',
    href: '/services/consulting',
    cta: 'Book consulting',
  },
  {
    title: 'React Native Audit',
    description:
      'Get a senior review of your React Native codebase. Performance, architecture, dependencies, and a roadmap to fix what is slowing you down.',
    href: '/services/audit',
    cta: 'Request audit',
  },
];

export default function ServicesIndex() {
  return (
    <Layout
      withHeader
      withFooter
      seoTitle="React Native Services"
      seoDescription="Hire React Native experts as a service: subscription development, consulting, and codebase audits. One team, three ways to work together."
      ogImageAlt="weshipit.today — React Native Services"
      navigation={headerNavigation}
      callToActionButton={headerCallToActionButton}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn>
          <Hero
            title="React Native Services"
            description="Three ways to work with us. Pick the one that matches where you are."
          />
        </FadeIn>

        <FadeInStagger>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((service) => (
              <FadeIn key={service.href}>
                <Link href={service.href} className="block h-full">
                  <Card
                    variant="link"
                    shadow="light"
                    size="lg"
                    className="h-full flex flex-col"
                  >
                    <Text as="h2" variant="h3">
                      {service.title}
                    </Text>
                    <Text as="p" variant="p1" className="mt-2 flex-1">
                      {service.description}
                    </Text>
                    <Text
                      as="span"
                      variant="p2"
                      className="mt-6 font-semibold text-blue-600 dark:text-blue-400"
                    >
                      {service.cta} →
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

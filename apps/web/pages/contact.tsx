import { Button, Card, FadeIn, Hero, LinkButton, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';
import {
  headerNavigation,
  headerCallToActionButton,
} from '../utils/navigation';

export default function ContactPage() {
  return (
    <Layout
      withHeader
      withFooter
      seoTitle="Contact — weshipit.today"
      seoDescription="Talk to a React Native expert. Book a call, send an email, or DM us on X."
      ogImageAlt="weshipit.today — Contact"
      navigation={headerNavigation}
      callToActionButton={headerCallToActionButton}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn>
          <Hero
            title="Get in touch"
            description="Pick the channel that fits how you like to work."
          />
        </FadeIn>

        <div className="mt-12 grid gap-6">
          <FadeIn>
            <Card variant="featured" shadow="light" size="lg">
              <Text as="h2" variant="h3">
                Book a call
              </Text>
              <Text as="p" variant="p1" className="mt-2">
                The fastest way to talk to us. 30 minutes, no commitment.
              </Text>
              <div className="mt-6">
                <Button
                  as="a"
                  href={linksApi.cal.ONBOARDING}
                  isExternalLink
                  variant="primary"
                  size="xl"
                >
                  Schedule a call
                </Button>
              </div>
            </Card>
          </FadeIn>

          <FadeIn>
            <Card shadow="light" size="lg">
              <Text as="h2" variant="h3">
                Email
              </Text>
              <Text as="p" variant="p1" className="mt-2">
                Prefer async? Send us a message.
              </Text>
              <div className="mt-6">
                <Button
                  as="a"
                  href="mailto:hello@weshipit.today"
                  variant="outline"
                  size="lg"
                  withExternalLinkIcon={false}
                >
                  hello@weshipit.today
                </Button>
              </div>
            </Card>
          </FadeIn>

          <FadeIn>
            <Card shadow="light" size="lg">
              <Text as="h2" variant="h3">
                Explore other paths
              </Text>
              <Text as="p" variant="p1" className="mt-2">
                Not ready to chat? Read about how we work or what it costs.
              </Text>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton href="/services" variant="outline" size="lg">
                  See services
                </LinkButton>
                <LinkButton href="/pricing" variant="ghost" size="lg">
                  View pricing
                </LinkButton>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </Layout>
  );
}

import { FadeIn, Hero, Prose, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import {
  headerNavigation,
  headerCallToActionButton,
} from '../utils/navigation';

export default function TermsPage() {
  return (
    <Layout
      withHeader
      withFooter
      noindex
      seoTitle="Terms of Service — weshipit.today"
      seoDescription="Terms of Service for weshipit.today."
      ogImageAlt="weshipit.today — Terms"
      navigation={headerNavigation}
      callToActionButton={headerCallToActionButton}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn>
          <Hero
            title="Terms of Service"
            description="The rules that govern your use of weshipit.today."
          />
        </FadeIn>

        <FadeIn>
          <Prose>
            <Text as="p" variant="p1">
              These terms govern your use of weshipit.today. By using the site
              or engaging our services, you agree to the terms below. For
              specific engagement terms, refer to your signed Statement of Work.
            </Text>

            <Text as="h2" variant="h2">
              Company
            </Text>
            <Text as="p" variant="p1">
              weshipit.today is operated by weshipit today (SIREN 919243923).
            </Text>

            <Text as="h2" variant="h2">
              Contact
            </Text>
            <Text as="p" variant="p1">
              Questions? Email hello@weshipit.today.
            </Text>
          </Prose>
        </FadeIn>
      </div>
    </Layout>
  );
}

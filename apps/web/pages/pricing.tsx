import { FadeIn, Pricing } from '@weshipit/ui';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';
import {
  headerNavigation,
  headerCallToActionButton,
} from '../utils/navigation';

export default function PricingPage() {
  return (
    <Layout
      withHeader
      withFooter
      seoTitle="Pricing — weshipit.today"
      seoDescription="Subscription-based React Native development. One flat fee, zero billable hours. Pause or cancel anytime."
      ogImageAlt="weshipit.today — Pricing"
      navigation={headerNavigation}
      callToActionButton={headerCallToActionButton}
    >
      <FadeIn>
        <Pricing ctaLink={linksApi.cal.ONBOARDING} />
      </FadeIn>
    </Layout>
  );
}

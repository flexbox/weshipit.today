import * as React from 'react';
import Page, { ContentContainer } from '~/components/Page';
import { BootcampOnboardingCard } from '~/components/Form/BootcampOnboardingForm';
import GlobalSeo from '~/components/SEO/GlobalSeo';

const SEO_DATA = {
  image: {
    alt: 'Bootcamp Onboarding',
  },
  seo_description:
    'Get ready for your next bootcamp with David Leuliette and his team.',
  seo_title: 'Bootcamp Onboarding',
};

export default function OnboardingBootcampPage() {
  return (
    <Page withHeader>
      <GlobalSeo
        data={SEO_DATA}
        slug="onboarding-bootcamp"
        title="Bootcamp Onboarding"
      />

      <ContentContainer style={{ marginTop: 30 }}>
        <BootcampOnboardingCard />
      </ContentContainer>
    </Page>
  );
}

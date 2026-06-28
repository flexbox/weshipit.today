import * as React from 'react';

import Page, { ContentContainer, Iframe } from '~/components/Page';

import GlobalSeo from '~/components/SEO/GlobalSeo';
import { AIRTABLE_FORM } from '~/utils/airtable-links';

const SEO_DATA = {
  seo_title: 'Feedback - David Leuliette',
  seo_description:
    'In order to improve the quality of my services can you take 3:14 min (on average) to complete this form?',
  image: {
    alt: 'Feedback',
  },
};

const FeedbackPage = () => {
  return (
    <Page withHeader>
      <GlobalSeo
        data={SEO_DATA}
        slug="feedback"
        title="Thanks for working with me"
      />

      <ContentContainer style={{ marginTop: 30 }}>
        <Iframe src={AIRTABLE_FORM.NPS} width="100%" height="1701" />
      </ContentContainer>
    </Page>
  );
};

export default FeedbackPage;

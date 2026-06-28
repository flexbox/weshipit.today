import Cal, { getCalApi } from '@calcom/embed-react';
import React, { ReactElement, useEffect } from 'react';
import { NativeLink } from '~/components/Link/NativeLink';
import Page from '~/components/Page';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { H2, TextLight } from '~/components/Typography';

const CONSULTATION_EXTERNAL_LINK = 'https://cal.com/davidl/consultation';
const CONSULTATION_LINK = 'davidl/consultation';

const SEO_DATA = {
  seo_title: 'React Native Code Consulting Services',
  seo_description:
    'In this call we will introduce you to the benefits of working with a Freelance JavaScript developer. I also would like to learn more about you and your projects.',
  image: {
    alt: 'Book a consultation with a Freelance JavaScript developer',
  },
};

export default function ConsultationPage(): ReactElement {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { styles: { branding: { brandColor: '#007AFF' } } });
    })();
  }, []);

  return (
    <Page withHeader>
      <GlobalSeo
        data={SEO_DATA}
        slug="consultation"
        title="Book an Initial Consultation"
      />

      <div className="w-full md:w-6/12 ">
        <H2 className="mb-4">
          Please take a moment to pick a time slot to speak with me for a
          consultation.
        </H2>
        <p>
          <TextLight>
            <strong>Note:</strong> If the calendar below doesn’t load in a few
            seconds, try refreshing the page.
          </TextLight>
        </p>
        <p>
          <TextLight>
            Or you can{' '}
            <strong>
              <NativeLink
                className="text-blue-500 underline"
                href={CONSULTATION_EXTERNAL_LINK}
              >
                open the bookling link on another tab
              </NativeLink>
            </strong>
            .
          </TextLight>
        </p>
      </div>

      <div className="mt-6 w-full md:w-10/12">
        <Cal
          calLink={CONSULTATION_LINK}
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        />
      </div>
    </Page>
  );
}

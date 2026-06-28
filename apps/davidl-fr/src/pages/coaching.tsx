import * as React from 'react';

import Page, { ContentContainer } from '~/components/Page';
import { TextLight, Rarr } from '~/components/Typography';
import { PrimaryButton } from '~/components/Button';
import { NativeLink } from '~/components/Link/NativeLink';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { ProseContainer } from '~/components/Container/ProseContainer';
import Avatar from '~/components/Avatar';
import Companies from '~/components/Companies/Companies';
export const COACHING_LINK = 'https://cal.com/davidl/coaching';

const SEO_DATA = {
  seo_title: 'Book a coaching session - David Leuliette',
  seo_description: 'Working on your project.',
  image: {
    alt: 'Coaching',
  },
};

const CoachingButton = () => (
  <NativeLink href={COACHING_LINK}>
    <PrimaryButton size="large" style={{ marginTop: 24 }}>
      Book a coaching session <Rarr />
    </PrimaryButton>
  </NativeLink>
);

export default function CoachingPage() {
  return (
    <Page>
      <GlobalSeo
        data={SEO_DATA}
        slug="coaching"
        title="Book a coaching session with David Leuliette"
      />

      <ContentContainer style={{ paddingTop: 0 }}>
        <ProseContainer style="prose-xl mb-8">
          <div className="flex justify-center">
            <Avatar />
          </div>
          <h1>Coaching 1to1</h1>

          <blockquote>A single conversation can change your life</blockquote>

          <CoachingButton />

          <p>
            Developer, freelance, or entrepreneur… Are you looking for answers
            to your work? Do you need some tricks about new{' '}
            <strong>clients aquisition</strong>,{' '}
            <strong>automating low values tasks</strong> and building{' '}
            <strong>memorable user experience</strong>?
          </p>

          <p>
            During a <strong>personalized video coaching session</strong>, I
            will help you find solutions to the main challenges you and your
            business will face with software development.
          </p>

          <p>
            These private consultations take place by{' '}
            <strong>private video conference</strong> —
            <em>you don’t need to install any software</em>.
          </p>

          <p>
            During these sessions, I am at your disposal to{' '}
            <strong>answer all your questions</strong>, advise you, and guide
            you in your choices.
          </p>

          <p>
            It’s completely open, spontaneous, and non-formal, but you can also
            have a plan for a more structured interview with a specific topic
            and a list of questions.
          </p>

          <p>
            On the other hand, if you want to stay in touch with the latest
            major news from the react ecosystem and innovation sector, this
            interview can also be used for an in-depth watch report on all the
            latest events to remember.
          </p>
        </ProseContainer>
        <CoachingButton />
      </ContentContainer>
      <div style={{ paddingTop: '64px', textAlign: 'center' }}>
        <TextLight>
          Join tens of innovators that have already worked with me
        </TextLight>
        <Companies />
      </div>
    </Page>
  );
}

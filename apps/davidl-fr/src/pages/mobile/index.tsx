import * as React from 'react';

import Page, { SectionHeading, ContentContainer } from '~/components/Page';
import { H1, Subheading, Rarr } from '~/components/Typography';
import DesignDetailsGrid from '~/components/DesignDetailsGrid';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { CaseStudyForm } from '~/components/Form/CaseStudyForm';

export default function DesignDetails() {
  const SEO_DATA = {
    seo_title: 'Best Mobile App Design - David Leuliette',
    seo_description:
      'This collection of posts explores some of the best interaction patterns, visual styles, and design decisions of well-known apps. Each detail features a video and my commentary on the functionality and effectiveness of the interface.',
    image: {
      alt: 'Mobile Design Patterns',
    },
  };
  return (
    <Page withHeader>
      <GlobalSeo
        data={SEO_DATA}
        slug="/mobile"
        title="Best Mobile App Design — David Leuliette"
      />

      <ContentContainer>
        <SectionHeading $mt="0">
          <H1>Mobile Design UX</H1>
          <Subheading>
            If you’re reading this, you’re probably like me — spending much time
            understanding and recognizing today’s newest & most trending design
            patterns to make our next app fresh and competitive.
          </Subheading>
          <Subheading>
            This is my hand-picked collection of latest design patterns from
            mobile apps that reflect the best in design.
            <br />
            <em className="text-gray-400">(Screenshots from iPhone X)</em>
          </Subheading>
        </SectionHeading>
      </ContentContainer>

      <DesignDetailsGrid truncate={true} />

      <CaseStudyForm />

      <DesignDetailsGrid truncate={false} />
    </Page>
  );
}

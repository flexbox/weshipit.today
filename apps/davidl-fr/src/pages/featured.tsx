import React from 'react';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { NativeLink } from '~/components/Link/NativeLink';
import Page, { SectionHeading } from '~/components/Page';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { TextLight } from '~/components/Typography';
import { podcast, blogpost, interview, certifications } from '~/pages/api/data';

const SEO_DATA = {
  seo_title: 'Featured - David Leuliette',
  seo_description:
    'I am a highly skilled and experienced freelance react developer, specializing in web development and mobile app development using the React Native framework.',
  image: {
    alt: 'David Leuliette - Featured',
  },
};

export default function FeaturedPage() {
  return (
    <Page withHeader>
      <GlobalSeo data={SEO_DATA} slug="featured" />
      <ProseContainer withContentContainer>
        <SectionHeading $mt="0">
          <h1>Featured</h1>
        </SectionHeading>

        <h2>Certifications</h2>
        <ul>
          {certifications.map((item, index) => (
            <li key={index}>
              <NativeLink href={`pdf/${item.file}`}>{item.title}</NativeLink>
              <br />
              {item.company} <TextLight>- {item.year}</TextLight>
            </li>
          ))}
        </ul>
        <h2>Podcasts</h2>
        <ul>
          {podcast.map((item, index) => (
            <li key={index}>
              <NativeLink href={item.link}>{item.title}</NativeLink>
            </li>
          ))}
        </ul>
        <h2>Interviews</h2>
        <ul>
          {interview.map((item, index) => (
            <li key={index}>
              <NativeLink href={item.link}>{item.title}</NativeLink>
            </li>
          ))}
        </ul>
        <h2>Blogposts</h2>
        <ul>
          {blogpost.map((item, index) => (
            <li key={index}>
              <NativeLink href={item.link}>{item.title}</NativeLink>
            </li>
          ))}
        </ul>
      </ProseContainer>
    </Page>
  );
}

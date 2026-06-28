import React from 'react';
import Page, {
  SectionHeading,
  ContentContainer,
  Iframe,
} from '~/components/Page';
import { H1, H2, P, A } from '~/components/Typography';
import Playlist from '~/components/Playlist';

import GlobalSeo from '~/components/SEO/GlobalSeo';

const SEO_DATA = {
  seo_title: 'Freelance React Native Developer Music - David Leuliette',
  seo_description:
    "Let's listen to some music when you are coding. I'm a big fan of music and I'm always looking for new music to listen to.",
  image: {
    alt: 'Hacker playlist',
  },
};

export default function Music() {
  return (
    <Page withHeader withNewsletter>
      <GlobalSeo
        data={SEO_DATA}
        slug="music"
        title="Hacker playlist to listen music when coding — part of my Spotify Growth Hack"
      />

      <ContentContainer>
        <SectionHeading $mt="0">
          <H1>Curated music for focused work</H1>
        </SectionHeading>
      </ContentContainer>
      <Playlist />
      <ContentContainer>
        <SectionHeading>
          <H2>Mixtapes thumbnails</H2>
          <P>
            You can{' '}
            <A href="https://www.figma.com/community/file/831886749337476100/Spotify-Template-Playlists">
              duplicate the template on Figma
            </A>
            .
          </P>
          <Iframe
            width="800"
            height="450"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FHIt9mlTEUrq158Y7Qn3lGF%2FSpotify-HACKER-playlists%3Fnode-id%3D0%253A1"
          ></Iframe>
        </SectionHeading>
      </ContentContainer>
    </Page>
  );
}

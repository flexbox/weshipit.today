import React from 'react';
import { Iframe, ContentGrid } from '~/components/Page';
import { P, H2 } from '~/components/Typography';

export default function Playlist() {
  const allPlaylists = [
    {
      title: 'HACKER #1',
      description: 'Mixtape for coding',
      url: 'https://open.spotify.com/embed/playlist/0Jt2JW0NTIL6MvV9dSOnqZ',
    },
    {
      title: 'HACKER #2',
      description: 'Rock for coding',
      url: 'https://open.spotify.com/embed/playlist/3LdxHInEvlJZqtqeRmtiGv',
    },
    {
      title: 'HACKER #3.1',
      description: 'Movies Mixtape for coding',
      url: 'https://open.spotify.com/embed/playlist/6IZ1Mh2grWaxgdQnK9xIAO',
    },
    {
      title: 'HACKER #3.2',
      description: 'Gaming Mixtape for coding',
      url: 'https://open.spotify.com/embed/playlist/301Kl8b7hslXbV8wxk3SrV',
    },
    {
      title: 'HACKER #4',
      description: 'Electro Mixtape for coding',
      url: 'https://open.spotify.com/embed/playlist/6Zmw201xJGrD7LuGwF2Ph0',
    },
    {
      title: 'HACKER #5',
      description: 'Chill Mixtape for coding',
      url: 'https://open.spotify.com/embed/playlist/2Adv3s73yJNLm3z1BwK9rP',
    },
    {
      title: 'HACKER #6',
      description: 'Mixtape for laser-focus at work',
      url: 'https://open.spotify.com/embed/playlist/26yEmL1emKzN9Xpt1dyhPm',
    },
    {
      title: 'HACKER #7',
      description: 'Summer of code',
      url: 'https://open.spotify.com/embed/playlist/3FYezFABeZdD13RMQiff0G',
    },
    {
      title: 'HACKER #8',
      description: 'Retro Mixtape for Coding',
      url: 'https://open.spotify.com/embed/playlist/5PDDbk2cvJiiqBT37iHs9S',
    },
    {
      title: 'HACKER #9',
      description: 'DJ Mixtape for Coders',
      url: 'https://open.spotify.com/embed/playlist/5rR8hKi3BWEx3rnHPD7M72',
    },
    {
      title: 'HACKER #10',
      description: 'Stress free Mixtape for programming',
      url: 'https://open.spotify.com/embed/playlist/0yuappB07Oz6xj0xBhH2Y3',
    },
    {
      title: 'HACKER #11',
      description: 'HipHop Coders Krew',
      url: 'https://open.spotify.com/embed/playlist/1iQK1OHiOgpF2DlOaz0Xow',
    },
    {
      title: 'HACKER #12',
      description: 'Metal for Programming',
      url: 'https://open.spotify.com/embed/playlist/0yuappB07Oz6xj0xBhH2Y3',
    },
  ];

  return (
    <ContentGrid defaultColumns={2}>
      {allPlaylists.map((item, index) => {
        return (
          <div className="mb-8 p-8" key={index}>
            <H2>{item.description}</H2>
            <P>{item.title}</P>
            <Iframe
              src={item.url}
              width="100%"
              height="680"
              allowtransparency={true}
              allow="encrypted-media"
              bgcolor="#0d0f12"
            ></Iframe>
          </div>
        );
      })}
    </ContentGrid>
  );
}

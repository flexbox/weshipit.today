import * as React from 'react';

import GlobalSeo from '~/components/SEO/GlobalSeo';
import { H2, H5 } from '~/components/Typography';
import { NativeLink } from '~/components/Link/NativeLink';
import { PrimaryButton } from '~/components/Button';
import { Rarr } from '~/components/Typography';
import { ShowsCard } from '~/components/Shows/ShowsCard';
import { allShows } from '~/pages/api/shows';

const SEO_DATA = {
  seo_title: 'Youtube Shows - David Leuliette',
  seo_description: 'David Leuliette Youtube content',
  image: {
    alt: 'Shows',
  },
};

export default function ShowsPage() {
  return (
    <div>
      <GlobalSeo
        data={SEO_DATA}
        slug="shows"
        title="Office Hours Pirate Shows page"
      />
      <div className="flex h-screen w-full flex-row">
        <div className=" fixed  m-auto h-2/3 w-1/2 pt-24 text-center font-mono text-2xl font-bold">
          <H5 className="pb-8 pt-12">A original show</H5>
          <H2 className="py-8">Office Hours</H2>
          <H2 className="pb-8">des Pirates</H2>

          <img
            className="m-auto h-12"
            src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
          />
        </div>
        <div className="h-full w-1/2"></div>
        <div className="w-1/2 justify-end pt-24">
          <div className=" w-1/2 justify-center">
            <NativeLink href="https://www.youtube.com/channel/UCO0X5b0mQ4eIHitXHXSFUyw?sub_confirmation=1">
              <PrimaryButton size="large" style={{ marginTop: 24 }}>
                Subscribe to the channel <Rarr />
              </PrimaryButton>
            </NativeLink>
          </div>
          <p className="py-8 pr-12 text-xl font-semibold">
            David and Matthys host a monthly live show to share news about the
            tools and techniques they use for work. Edited videos of the show
            are also available on their YouTube channel. The following is a
            selection of their videos, but more can be found on YouTube.
          </p>
          {allShows.map((show) => {
            return (
              <ShowsCard
                key={show.id}
                url={show.url}
                thumbnailUrl={show.thumbnailUrl}
                videoName={show.videoName}
                id={show.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

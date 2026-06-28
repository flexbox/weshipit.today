import * as React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import {
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '~/components/SEO/GlobalSeo';

export function WorkshopSeo() {
  const router = useRouter();
  const routerPath = router.asPath;

  return (
    <NextSeo
      title="Workshop - React Native Bootcamp"
      description="Boost your developer skills with our hands-on React Native Bootcamp"
      openGraph={{
        site_name: 'David Leuliette',
        url: `https://davidl.fr${routerPath}`,
        description:
          'Boost your developer skills with our hands-on React Native Bootcamp',
        images: [
          {
            url: OG_IMAGE_URL,
            width: OG_IMAGE_WIDTH,
            height: OG_IMAGE_HEIGHT,
            alt: 'David Leuliette',
          },
        ],
      }}
    />
  );
}

import * as React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Analytics } from '~/components/SEO/Analytics';
import {
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '~/components/SEO/GlobalSeo';

interface MobileSEOProps {
  title: string;
}

export default function MobileSEO({ title }: MobileSEOProps) {
  const router = useRouter();
  const routerPath = router.asPath;

  return (
    <>
      <NextSeo
        title={`${title} — React Native Mobile App Design`}
        description="Discover a mobile application design UX and UI. Learn about the design process, discover astonished animations, and nice dark-mode."
        openGraph={{
          site_name: 'David Leuliette',
          url: `https://davidl.fr${routerPath}`,
          description: `Discover a new mobile app design - ${title}`,
          images: [
            {
              url: OG_IMAGE_URL,
              width: OG_IMAGE_WIDTH,
              height: OG_IMAGE_HEIGHT,
              alt: 'Mobile app UX and UI design pattern',
            },
          ],
        }}
      />
      <Analytics />
    </>
  );
}

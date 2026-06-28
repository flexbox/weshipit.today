import * as React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Analytics } from '~/components/SEO/Analytics';

interface GlobalSeoProps {
  data: {
    seo_description?: string;
    seo_title?: string;
    image: {
      alt?: string;
    };
  };
  slug?: string;
  title?: string;
}

export const OG_IMAGE_URL = 'https://davidl.fr/images/og-image.jpg';
export const OG_IMAGE_WIDTH = 2850;
export const OG_IMAGE_HEIGHT = 1900;

export default function GlobalSeo({ title = '', data, slug }: GlobalSeoProps) {
  const router = useRouter();

  const seoTitle = data.seo_title;
  const seoDescription = data.seo_title;
  const ogImageAlt = data.image.alt;

  return (
    <>
      <NextSeo
        title={
          `${seoTitle}` || 'Freelance React Native Developer — David Leuliette '
        }
        description={
          seoDescription ||
          'My mission to make people’s lives easier is driven by a disciplined and measured approach to automation, minimalist design, and mentoring.'
        }
        openGraph={{
          site_name: 'Freelance React Native Developer — David Leuliette',
          url:
            `https://davidl.fr/${slug}` ||
            `https://davidl.fr${router.pathname}`,
          title: title || 'Freelance React Native Developer — David Leuliette',
          description:
            seoDescription ||
            'My mission to make people’s lives easier is driven by a disciplined and measured approach to automation, minimalist design, and mentoring.',
          images: [
            {
              url: OG_IMAGE_URL,
              width: OG_IMAGE_WIDTH,
              height: OG_IMAGE_HEIGHT,
              alt: ogImageAlt || 'David Leuliette',
            },
          ],
        }}
      />
      <Analytics />
    </>
  );
}

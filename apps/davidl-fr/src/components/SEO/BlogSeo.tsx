import React from 'react';
import { NextSeo } from 'next-seo';
import {
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from '~/components/SEO/GlobalSeo';
import { Analytics } from '~/components/SEO/Analytics';

interface BlogSeoProps {
  data: {
    date: string;
    seo_description: string;
    seo_title: string;
    first_publication_date: string;
    last_publication_date: string;
    image: {
      alt: string;
    };
  };
  slug: string;
  title: string;
}

export default function BlogSeo(props: BlogSeoProps) {
  return (
    <>
      <NextSeo
        title={`${props.data.seo_title} — David Leuliette`}
        description={props.data.seo_description}
        openGraph={{
          site_name: 'Blog React Native - David Leuliette',
          type: 'article',
          url: `https://davidl.fr/blog/${props.slug}`,
          title: props.title || 'Blog React Native - David Leuliette',
          description: props.data.seo_description,
          article: {
            publishedTime: props.data.first_publication_date,
            modifiedTime: props.data.last_publication_date,
          },
          images: [
            {
              url: OG_IMAGE_URL,
              width: OG_IMAGE_WIDTH,
              height: OG_IMAGE_HEIGHT,
              alt: props.data.image.alt,
            },
          ],
        }}
      />
      <Analytics />
    </>
  );
}

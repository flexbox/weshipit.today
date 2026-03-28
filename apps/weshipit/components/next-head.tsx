import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

export interface PodcastOgImageData {
  title: string;
  guest: string;
  episode: number;
  type: 'podcast' | 'transcript';
}

export interface NextHeadProps {
  seoTitle: string;
  ogImageTitle?: string;
  ogImageAlt?: string;
  ogImagePodcast?: PodcastOgImageData;
  seoDescription: string;
  locale?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://weshipit.today';

export function NextHead({
  ogImageTitle = 'React Native Development Agency',
  ogImageAlt,
  ogImagePodcast,
  seoDescription,
  seoTitle,
  locale = 'en_US',
  noindex = false,
}: NextHeadProps) {
  const router = useRouter();
  const path = router.pathname;
  const canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;

  const generateOgImagePath = () => {
    if (ogImagePodcast) {
      const { title, guest, episode, type } = ogImagePodcast;
      return `/api/podcast-og?title=${encodeURIComponent(title)}&guest=${encodeURIComponent(guest)}&episode=${episode}&type=${type}`;
    }
    if (ogImageTitle?.startsWith('/api/') || ogImageTitle?.startsWith('http')) {
      return ogImageTitle;
    }
    return `/api/og?title=${encodeURI(ogImageTitle || '')}`;
  };

  const ogImagePath = generateOgImagePath();
  const ogImageUrl = ogImagePath.startsWith('http')
    ? ogImagePath
    : `${BASE_URL}${ogImagePath}`;

  const imageAlt = ogImageAlt || 'Hire React Native Developers as a Service';

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        noindex={noindex}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          url: canonicalUrl,
          type: 'website',
          locale,
          siteName: 'weshipit.today',
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: imageAlt,
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@flexbox_',
          site: '@flexbox_',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          { href: '/favicon.ico', rel: 'icon' },
          {
            href: '/apple-touch-icon.png',
            rel: 'apple-touch-icon',
            sizes: '180x180',
          },
          {
            href: '/favicon-32x32.png',
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            href: '/favicon-16x16.png',
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png',
          },
        ]}
        additionalMetaTags={[{ name: 'author', content: 'David Leuliette' }]}
      />
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f3f4f6" />
        <meta name="msapplication-TileColor" content="#f3f4f6" />
        <meta name="theme-color" content="#f3f4f6" />
        {/* LinkedIn og:image workaround — requires both name and property on the same tag */}
        <meta name="image" property="og:image" content={ogImageUrl} />
      </Head>
    </>
  );
}

export default NextHead;

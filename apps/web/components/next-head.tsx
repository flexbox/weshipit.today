import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  buildOgImagePath,
  buildPodcastOgImagePath,
  OgLang,
  PodcastOgImageData,
} from '../utils/og/og-image-path';

export type { PodcastOgImageData };

export interface NextHeadProps {
  seoTitle: string;
  /** Defaults to `seoTitle`. */
  ogImageTitle?: string;
  /** Mono label above the title. Defaults to the agency label for the locale. */
  ogImageKicker?: string;
  /** Optional proof point under the title, e.g. "4,6/5 · avis vérifié". */
  ogImageSubline?: string;
  ogImageAlt?: string;
  ogImagePodcast?: PodcastOgImageData;
  seoDescription: string;
  locale?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://weshipit.today';

const DEFAULT_KICKER: Record<OgLang, string> = {
  en: 'React Native agency',
  fr: 'Agence React Native',
};

export function NextHead({
  ogImageTitle,
  ogImageKicker,
  ogImageSubline,
  ogImageAlt,
  ogImagePodcast,
  seoDescription,
  seoTitle,
  locale = 'en_US',
  noindex = false,
}: NextHeadProps) {
  const router = useRouter();
  // asPath keeps the query string and hash (`?utm_source=…`, `#faq`), which
  // would leak into the canonical URL once the page hydrates.
  const path = router.asPath.split(/[?#]/)[0];
  const canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;

  const lang: OgLang = locale.startsWith('fr') ? 'fr' : 'en';
  const imageTitle = ogImageTitle || seoTitle;

  const ogImageUrl = `${BASE_URL}${
    ogImagePodcast
      ? buildPodcastOgImagePath(ogImagePodcast)
      : buildOgImagePath({
          kicker: ogImageKicker ?? DEFAULT_KICKER[lang],
          lang,
          path,
          subline: ogImageSubline,
          title: imageTitle,
        })
  }`;

  const imageAlt =
    ogImageAlt ??
    (ogImagePodcast
      ? `${ogImagePodcast.title} avec ${ogImagePodcast.guest} — Le Cross Platform Show`
      : `${imageTitle} — weshipit.today`);

  return (
    <>
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
      {/* Must live inside <Head>: a bare <meta> is hoisted by React 19 and
          then removed by next/head on navigation, crashing the unmount. */}
      <Head>
        <meta key="charset" charSet="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
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

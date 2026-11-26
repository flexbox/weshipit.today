import type { Metadata, Viewport } from 'next';
import {
  buildOgImagePath,
  buildPodcastOgImagePath,
  OgLang,
  PodcastOgImageData,
} from '../og/og-image-path';

export const SITE_URL = 'https://weshipit.today';
const SITE_NAME = 'weshipit.today';

/**
 * What a page says about itself. Same fields as the `<Layout>` SEO props of
 * the Pages Router, plus `path`: the App Router has no router to read the
 * canonical URL from, so each page states its own.
 */
export interface PageSeo {
  /** Path of the page, e.g. `/pricing` or `/plan/2026-W42`. No query string. */
  path: string;
  /** Without the site suffix: the root layouts add " — weshipit.today". */
  seoTitle: string;
  seoDescription: string;
  /** Defaults to `seoTitle`. */
  ogImageTitle?: string;
  /** Mono label above the title. Defaults to the agency label for the locale. */
  ogImageKicker?: string;
  /** Optional proof point under the title, e.g. "4,6/5 · avis vérifié". */
  ogImageSubline?: string;
  ogImagePodcast?: PodcastOgImageData;
  ogImageAlt?: string;
  locale?: string;
  noindex?: boolean;
  /** hreflang alternates, e.g. `{ en: '/', fr: '/bonjour' }`. */
  languages?: Record<string, string>;
}

const DEFAULT_KICKER: Record<OgLang, string> = {
  en: 'React Native agency',
  fr: 'Agence React Native',
};

const absolute = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

/** Canonical URL and social image of a page, shared by the helpers below. */
export function resolvePageSeo({
  locale = 'en_US',
  ogImageAlt,
  ogImageKicker,
  ogImagePodcast,
  ogImageSubline,
  ogImageTitle,
  path,
  seoTitle,
}: PageSeo) {
  const lang: OgLang = locale.startsWith('fr') ? 'fr' : 'en';
  const imageTitle = ogImageTitle || seoTitle;
  const ogImageUrl = `${SITE_URL}${
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
  const ogImageAltText =
    ogImageAlt ??
    (ogImagePodcast
      ? `${ogImagePodcast.title} avec ${ogImagePodcast.guest} — Le Cross Platform Show`
      : `${imageTitle} — ${SITE_NAME}`);

  return { canonicalUrl: absolute(path), locale, ogImageAltText, ogImageUrl };
}

/**
 * Metadata that never changes from page to page. Both root layouts export
 * it; `buildMetadata` adds the page's own fields on top.
 */
export const baseMetadata: Metadata = {
  authors: [{ name: 'David Leuliette' }],
  description:
    'Software development is a service, not a product. We offer a subscription-based service for React Native developers. One flat fee. Pause or cancel whenever.',
  icons: {
    apple: [{ sizes: '180x180', url: '/apple-touch-icon.png' }],
    icon: [
      { url: '/favicon.ico' },
      { sizes: '32x32', type: 'image/png', url: '/favicon-32x32.png' },
      { sizes: '16x16', type: 'image/png', url: '/favicon-16x16.png' },
    ],
    other: [
      { color: '#f3f4f6', rel: 'mask-icon', url: '/safari-pinned-tab.svg' },
    ],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL(SITE_URL),
  other: { 'msapplication-TileColor': '#f3f4f6' },
  title: {
    default: 'React Native Development Agency — weshipit.today',
    template: '%s — weshipit.today',
  },
};

export const baseViewport: Viewport = {
  initialScale: 1,
  themeColor: '#f3f4f6',
  viewportFit: 'cover',
  width: 'device-width',
};

/**
 * The page's `metadata` (or the return value of `generateMetadata`).
 *
 * `openGraph`, `twitter` and `robots` are always returned whole: a page's
 * object replaces the layout's instead of being merged with it.
 */
export function buildMetadata(seo: PageSeo): Metadata {
  const { canonicalUrl, locale, ogImageAltText, ogImageUrl } =
    resolvePageSeo(seo);

  return {
    alternates: {
      canonical: canonicalUrl,
      ...(seo.languages
        ? {
            languages: Object.fromEntries(
              Object.entries(seo.languages).map(([lang, path]) => [
                lang,
                absolute(path),
              ]),
            ),
          }
        : {}),
    },
    description: seo.seoDescription,
    openGraph: {
      description: seo.seoDescription,
      images: [
        {
          alt: ogImageAltText,
          height: 630,
          type: 'image/png',
          url: ogImageUrl,
          width: 1200,
        },
      ],
      locale,
      siteName: SITE_NAME,
      title: seo.seoTitle,
      type: 'website',
      url: canonicalUrl,
    },
    robots: { follow: true, index: !seo.noindex },
    title: seo.seoTitle,
    twitter: {
      card: 'summary_large_image',
      creator: '@flexbox_',
      site: '@flexbox_',
    },
  };
}

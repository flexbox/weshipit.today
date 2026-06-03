import { ReactNode } from 'react';
import Head from 'next/head';
import { Text } from '@weshipit/ui';

import { SidebarLayout } from '../components/sidebar-layout';
import { BrowserFrame } from '../components/browser-frame';
import { MobileFrame } from '../components/mobile-frame';
import { LinkedInProfilePreview } from '../components/linkedin-profile-preview';
import { YouTubeChannelPreview } from '../components/youtube-channel-preview';
import { XProfilePreview } from '../components/x-profile-preview';
import { SpotifyPodcastPreview } from '../components/spotify-podcast-preview';
import { bannerUrlFor } from '../components/banners';
import { CONFIG } from '../config/config';

const PROFILE_URLS = {
  linkedin: `linkedin.com/in/${CONFIG.linkedIn.slug}`,
  youtube: `youtube.com/${CONFIG.youtube.handle}`,
  x: `x.com/${CONFIG.x.handle.replace(/^@/, '')}`,
  spotify: 'open.spotify.com/show/cross-platform-show',
};

const SITE_URL = 'https://banner-preview.weshipit.today/preview';
const SITE_ROOT = 'https://banner-preview.weshipit.today';
const OG_IMAGE = `${SITE_ROOT}/api/banner?platform=og`;

const META = {
  title: 'Preview LinkedIn, YouTube, X & Spotify Banners Side by Side',
  description:
    'Live preview of LinkedIn, YouTube, X and Spotify banners behind real profile chrome on desktop and mobile. Check crops, safe areas and avatar overlap before you publish.',
  shortDescription:
    'See your LinkedIn, YouTube, X and Spotify banners behind real profile chrome on desktop and mobile before you publish.',
};

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: META.title,
  description: META.description,
  url: SITE_URL,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Social Banner Preview',
    url: SITE_ROOT,
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Create',
        item: SITE_ROOT,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Preview',
        item: SITE_URL,
      },
    ],
  },
};

function PlatformContext({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section>
      <header className="mb-6">
        <Text as="h2" variant="h3" className="mb-2">
          {title}
        </Text>
        <Text as="p" variant="p2" className="text-muted-foreground">
          {description}
        </Text>
      </header>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {children}
      </div>
    </section>
  );
}

export default function Preview() {
  return (
    <>
      <Head>
        <title>{META.title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="description" content={META.description} />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#F1F5F9" />
        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.shortDescription} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META.title} />
        <meta name="twitter:description" content={META.shortDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_SCHEMA) }}
        />
      </Head>

      <SidebarLayout>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-12">
            <Text as="p" variant="h1" className="mb-3">
              Preview
            </Text>
            <Text as="h1" variant="p1" className="text-muted-foreground">
              Live Banner Preview for LinkedIn, YouTube, X & Spotify.
            </Text>
          </header>

          <div className="flex flex-col gap-16">
            <PlatformContext
              title="LinkedIn Preview"
              description="See how the banner looks with the profile photo overlap on desktop and mobile."
            >
              <BrowserFrame url={PROFILE_URLS.linkedin}>
                <LinkedInProfilePreview
                  bannerUrl={bannerUrlFor('linkedin')}
                  variant="desktop"
                />
              </BrowserFrame>
              <MobileFrame width={320}>
                <LinkedInProfilePreview
                  bannerUrl={bannerUrlFor('linkedin')}
                  variant="mobile"
                />
              </MobileFrame>
            </PlatformContext>

            <PlatformContext
              title="YouTube Preview"
              description="Desktop crops the 16:9 asset to a wide stripe; mobile crops it further. The safe area (1235×338) is the only region guaranteed visible on both."
            >
              <BrowserFrame url={PROFILE_URLS.youtube}>
                <YouTubeChannelPreview
                  bannerUrl={bannerUrlFor('youtube')}
                  variant="desktop"
                />
              </BrowserFrame>
              <MobileFrame width={320}>
                <YouTubeChannelPreview
                  bannerUrl={bannerUrlFor('youtube')}
                  variant="mobile"
                />
              </MobileFrame>
            </PlatformContext>

            <PlatformContext
              title="X Preview"
              description="See how the banner looks behind the profile photo overlap on desktop and mobile."
            >
              <BrowserFrame url={PROFILE_URLS.x}>
                <XProfilePreview
                  bannerUrl={bannerUrlFor('x')}
                  variant="desktop"
                />
              </BrowserFrame>
              <MobileFrame width={320}>
                <XProfilePreview
                  bannerUrl={bannerUrlFor('x')}
                  variant="mobile"
                />
              </MobileFrame>
            </PlatformContext>

            <PlatformContext
              title="Spotify Preview"
              description="See how the cover art reads on the Spotify show page (desktop) and in the mobile app."
            >
              <BrowserFrame url={PROFILE_URLS.spotify}>
                <SpotifyPodcastPreview
                  coverUrl={bannerUrlFor('spotify')}
                  variant="desktop"
                />
              </BrowserFrame>
              <MobileFrame width={320}>
                <SpotifyPodcastPreview
                  coverUrl={bannerUrlFor('spotify')}
                  variant="mobile"
                />
              </MobileFrame>
            </PlatformContext>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

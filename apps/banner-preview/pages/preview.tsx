import { ReactNode } from 'react';
import Head from 'next/head';
import { Text } from '@weshipit/ui';

import { SidebarLayout } from '../components/sidebar-layout';
import { BrowserFrame } from '../components/browser-frame';
import { MobileFrame } from '../components/mobile-frame';
import { LinkedInProfilePreview } from '../components/linkedin-profile-preview';
import { YouTubeChannelPreview } from '../components/youtube-channel-preview';
import { XProfilePreview } from '../components/x-profile-preview';
import { bannerUrlFor } from '../components/banners';

const SITE_URL = 'https://banner-preview.weshipit.today/preview';
const OG_IMAGE = 'https://banner-preview.weshipit.today/api/banner?platform=x';

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
        <title>Preview LinkedIn, YouTube & X Banners Side by Side</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Live preview of LinkedIn, YouTube and X banners behind real profile chrome on desktop and mobile. Check crops, safe areas and avatar overlap before you publish."
        />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta
          property="og:title"
          content="Preview LinkedIn, YouTube & X Banners Side by Side"
        />
        <meta
          property="og:description"
          content="See your LinkedIn, YouTube and X banners behind real profile chrome on desktop and mobile before you publish."
        />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Preview LinkedIn, YouTube & X Banners Side by Side"
        />
        <meta
          name="twitter:description"
          content="See your LinkedIn, YouTube and X banners behind real profile chrome on desktop and mobile before you publish."
        />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>

      <SidebarLayout>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-12">
            <Text as="p" variant="h1" className="mb-3">
              Preview
            </Text>
            <Text as="h1" variant="p1" className="text-muted-foreground">
              Live Banner Preview for LinkedIn, YouTube & X.
            </Text>
          </header>

          <div className="flex flex-col gap-16">
            <PlatformContext
              title="LinkedIn Preview"
              description="See how the banner looks with the profile photo overlap on desktop and mobile."
            >
              <BrowserFrame url="linkedin.com/in/david-leuliette">
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
              <BrowserFrame url="youtube.com/@flexbox_">
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
              <BrowserFrame url="x.com/flexbox_">
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
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

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
        <Text as="h3" variant="h3" className="mb-2">
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
        <title>Preview — Social Banner Preview</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="See how LinkedIn, YouTube and Twitter/X banners look on desktop and mobile."
        />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <SidebarLayout>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-12">
            <Text as="h1" variant="h1" className="mb-3">
              Preview
            </Text>
            <Text as="p" variant="p1" className="text-muted-foreground">
              See how each banner looks behind real profile chrome on desktop
              and mobile.
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

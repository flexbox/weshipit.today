import { ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Text } from '@weshipit/ui';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import { BrowserFrame } from '../components/browser-frame';
import { MobileFrame } from '../components/mobile-frame';
import { LinkedInProfilePreview } from '../components/linkedin-profile-preview';
import { YouTubeChannelPreview } from '../components/youtube-channel-preview';
import { XProfilePreview } from '../components/x-profile-preview';
import { SAFE_BAND } from '../components/source-banner';

const SITE_URL = 'https://banner-preview.weshipit.today';

interface BannerSpec {
  platform: string;
  slug: 'linkedin' | 'youtube' | 'x';
  width: number;
  height: number;
  description: string;
}

const BANNERS: BannerSpec[] = [
  {
    platform: 'LinkedIn',
    slug: 'linkedin',
    width: 1584,
    height: 396,
    description: 'Personal profile banner (4:1)',
  },
  {
    platform: 'YouTube',
    slug: 'youtube',
    width: 2560,
    height: 1440,
    description: 'Channel art (16:9). Mobile safe area is 1235x338 centered.',
  },
  {
    platform: 'Twitter / X',
    slug: 'x',
    width: 1500,
    height: 500,
    description: 'Profile header (3:1)',
  },
];

const bannerUrlFor = (slug: BannerSpec['slug']) =>
  `/api/banner?platform=${slug}`;

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

function BannerPreview({ banner }: { banner: BannerSpec }) {
  const aspectRatio = `${banner.width} / ${banner.height}`;
  const imageUrl = bannerUrlFor(banner.slug);

  const safeBandStyle = {
    left: `${((banner.width - SAFE_BAND.width) / 2 / banner.width) * 100}%`,
    top: `${((banner.height - SAFE_BAND.height) / 2 / banner.height) * 100}%`,
    width: `${(SAFE_BAND.width / banner.width) * 100}%`,
    height: `${(SAFE_BAND.height / banner.height) * 100}%`,
  };

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white p-6 shadow-md">
      <header className="mb-4 flex items-baseline justify-between gap-4">
        <Text as="h2" variant="h3">
          {banner.platform}
        </Text>
        <Text as="span" variant="c2" className="text-muted-foreground">
          {banner.width} × {banner.height}
        </Text>
      </header>

      <Text as="p" variant="p2" className="mb-4 text-muted-foreground">
        {banner.description}
      </Text>

      <div
        className="relative w-full overflow-hidden rounded-lg bg-muted"
        style={{ aspectRatio }}
      >
        <Image
          src={imageUrl}
          alt={`${banner.platform} banner`}
          fill
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="object-cover"
          unoptimized
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute border-2 border-dashed border-emerald-400/80 bg-emerald-400/5"
          style={safeBandStyle}
        >
          <span className="absolute -top-6 left-0 rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Safe band {SAFE_BAND.width}×{SAFE_BAND.height}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <a
          href={imageUrl}
          download={`banner-${banner.slug}-${banner.width}x${banner.height}.png`}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
        >
          Download PNG ({banner.width}×{banner.height})
        </a>
      </div>
    </article>
  );
}

function downloadAllBanners() {
  BANNERS.forEach((banner, i) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = bannerUrlFor(banner.slug);
      link.download = `banner-${banner.slug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, i * 200);
  });
}

export default function Index() {
  return (
    <>
      <Head>
        <title>Social Banner Preview</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Preview LinkedIn, YouTube and Twitter/X banners side by side."
        />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Text as="h1" variant="h1" className="mb-3">
              Social Banner Preview
            </Text>
            <Text as="p" variant="p1" className="text-muted-foreground">
              Preview LinkedIn, YouTube and Twitter/X banners side by side at
              their real aspect ratios.
            </Text>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={downloadAllBanners}
              accessoryLeft={<ArrowDownTrayIcon className="mr-2 h-4 w-4" />}
              className="self-end"
            >
              Download all assets
            </Button>
          </div>
        </header>

        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <BannerPreview banner={BANNERS[0]} />
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
          </div>

          <div className="flex flex-col gap-8">
            <BannerPreview banner={BANNERS[1]} />
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
          </div>

          <div className="flex flex-col gap-8">
            <BannerPreview banner={BANNERS[2]} />
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
      </main>
    </>
  );
}

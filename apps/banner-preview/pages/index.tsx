import Head from 'next/head';
import Image from 'next/image';
import { Button, Text } from '@weshipit/ui';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import { SidebarLayout } from '../components/sidebar-layout';
import { BANNERS, BannerSpec, bannerUrlFor } from '../components/banners';

const SITE_URL = 'https://banner-preview.weshipit.today';

const APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Social Banner Preview',
  description:
    'Free banner generator for LinkedIn, YouTube and X. Generate, preview and download social headers at the right aspect ratios.',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  url: SITE_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

// Per-platform safe-area overlays. YouTube has two (mobile-safe + text/logo
// all-device); LinkedIn/X use the cross-platform intersection; Spotify is a
// square cover with no safe-area concept.
type SafeArea = {
  width: number;
  height: number;
  label: string;
  emphasis: 'primary' | 'secondary';
};

const SAFE_AREAS_BY_SLUG: Record<BannerSpec['slug'], SafeArea[]> = {
  linkedin: [
    { width: 1500, height: 396, label: 'Safe band', emphasis: 'primary' },
  ],
  x: [{ width: 1500, height: 396, label: 'Safe band', emphasis: 'primary' }],
  youtube: [
    {
      width: 1546,
      height: 423,
      label: 'Mobile safe',
      emphasis: 'secondary',
    },
    {
      width: 1235,
      height: 338,
      label: 'Text & logo (all-device)',
      emphasis: 'primary',
    },
  ],
  spotify: [],
};

function SafeAreaOverlay({
  area,
  bannerWidth,
  bannerHeight,
}: {
  area: SafeArea;
  bannerWidth: number;
  bannerHeight: number;
}) {
  const style = {
    left: `${((bannerWidth - area.width) / 2 / bannerWidth) * 100}%`,
    top: `${((bannerHeight - area.height) / 2 / bannerHeight) * 100}%`,
    width: `${(area.width / bannerWidth) * 100}%`,
    height: `${(area.height / bannerHeight) * 100}%`,
  };
  const isPrimary = area.emphasis === 'primary';
  const borderClass = isPrimary
    ? 'border-emerald-400/80 bg-emerald-400/5'
    : 'border-sky-400/70 bg-sky-400/5';
  const labelClass = isPrimary ? 'bg-emerald-500' : 'bg-sky-500';
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute border-2 border-dashed ${borderClass}`}
      style={style}
    >
      <span
        className={`absolute -top-6 left-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${labelClass}`}
      >
        {area.label} {area.width}×{area.height}
      </span>
    </div>
  );
}

function BannerPreview({ banner }: { banner: BannerSpec }) {
  const aspectRatio = `${banner.width} / ${banner.height}`;
  const imageUrl = bannerUrlFor(banner.slug);
  const safeAreas = SAFE_AREAS_BY_SLUG[banner.slug];

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
        {safeAreas.map((area) => (
          <SafeAreaOverlay
            key={`${area.width}x${area.height}`}
            area={area}
            bannerWidth={banner.width}
            bannerHeight={banner.height}
          />
        ))}
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
        <title>
          Free LinkedIn, YouTube, X & Spotify Banner Generator | weshipit
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Free banner generator for LinkedIn (1584×396), YouTube (2560×1440), X (1500×500) and Spotify (3000×3000). Generate, preview and download social headers at the right aspect ratios."
        />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#F1F5F9" />
        <meta
          property="og:title"
          content="Free LinkedIn, YouTube, X & Spotify Banner Generator"
        />
        <meta
          property="og:description"
          content="Generate, preview and download LinkedIn, YouTube, X and Spotify banners at the right aspect ratios. Free, no signup."
        />
        <meta
          property="og:image"
          content={`${SITE_URL}/api/banner?platform=og`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Free LinkedIn, YouTube, X & Spotify Banner Generator"
        />
        <meta
          name="twitter:description"
          content="Generate, preview and download LinkedIn, YouTube, X and Spotify banners at the right aspect ratios. Free, no signup."
        />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/api/banner?platform=og`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }}
        />
      </Head>

      <SidebarLayout>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Text as="p" variant="h1" className="mb-3">
                Create
              </Text>
              <Text as="h1" variant="p1" className="text-muted-foreground">
                Generate LinkedIn, YouTube and Twitter/X banners at their real
                aspect ratios.
              </Text>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={downloadAllBanners}
              accessoryLeft={<ArrowDownTrayIcon className="mr-2 h-4 w-4" />}
            >
              Download all assets
            </Button>
          </header>

          <div className="flex flex-col gap-8">
            {BANNERS.map((banner) => (
              <BannerPreview key={banner.slug} banner={banner} />
            ))}
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

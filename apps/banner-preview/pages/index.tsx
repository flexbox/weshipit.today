import Head from 'next/head';
import Image from 'next/image';
import { Text } from '@weshipit/ui';

const SITE_URL = 'https://banner-preview.weshipit.today';

interface BannerSpec {
  platform: string;
  width: number;
  height: number;
  description: string;
  imageUrl: string;
}

const BANNERS: BannerSpec[] = [
  {
    platform: 'LinkedIn',
    width: 1584,
    height: 396,
    description: 'Personal profile banner (4:1)',
    imageUrl:
      'https://placehold.co/1584x396/0a66c2/ffffff?text=LinkedIn+Banner+1584x396',
  },
  {
    platform: 'YouTube',
    width: 2560,
    height: 1440,
    description: 'Channel art (16:9). Mobile safe area is 1235x338 centered.',
    imageUrl:
      'https://placehold.co/2560x1440/ff0000/ffffff?text=YouTube+Banner+2560x1440',
  },
  {
    platform: 'Twitter / X',
    width: 1500,
    height: 500,
    description: 'Profile header (3:1)',
    imageUrl:
      'https://placehold.co/1500x500/000000/ffffff?text=X+Banner+1500x500',
  },
];

function BannerPreview({ banner }: { banner: BannerSpec }) {
  const aspectRatio = `${banner.width} / ${banner.height}`;

  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
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
          src={banner.imageUrl}
          alt={`${banner.platform} banner placeholder`}
          fill
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="object-cover"
        />
      </div>
    </article>
  );
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

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <Text as="h1" variant="h1" className="mb-3">
            Social Banner Preview
          </Text>
          <Text as="p" variant="p1" className="text-muted-foreground">
            Preview LinkedIn, YouTube and Twitter/X banners side by side at
            their real aspect ratios.
          </Text>
        </header>

        <div className="flex flex-col gap-8">
          {BANNERS.map((banner) => (
            <BannerPreview key={banner.platform} banner={banner} />
          ))}
        </div>
      </main>
    </>
  );
}

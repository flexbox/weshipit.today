export interface BannerSpec {
  platform: string;
  slug: 'linkedin' | 'youtube' | 'x' | 'spotify';
  width: number;
  height: number;
  description: string;
}

export const BANNERS: BannerSpec[] = [
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
  {
    platform: 'Spotify',
    slug: 'spotify',
    width: 3000,
    height: 3000,
    description:
      'Podcast cover art (1:1). Min 1400×1400, recommended 3000×3000.',
  },
];

export const bannerUrlFor = (slug: BannerSpec['slug']) =>
  `/api/banner?platform=${slug}`;

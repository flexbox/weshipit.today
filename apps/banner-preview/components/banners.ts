export interface BannerSpec {
  width: number;
  height: number;
  platform: string;
  description: string;
  slug: 'linkedin' | 'youtube' | 'x' | 'spotify';
}

export const BANNERS: BannerSpec[] = [
  {
    description: 'Personal profile banner (4:1)',
    height: 396,
    platform: 'LinkedIn',
    slug: 'linkedin',
    width: 1584,
  },
  {
    description: 'Channel art (16:9). Mobile safe area is 1235x338 centered.',
    height: 1440,
    platform: 'YouTube',
    slug: 'youtube',
    width: 2560,
  },
  {
    description: 'Profile header (3:1)',
    height: 500,
    platform: 'Twitter / X',
    slug: 'x',
    width: 1500,
  },
  {
    description:
      'Podcast cover art (1:1). Served as a static image from public/.',
    height: 1000,
    platform: 'Spotify',
    slug: 'spotify',
    width: 1000,
  },
];

export const bannerUrlFor = (slug: BannerSpec['slug']) =>
  slug === 'spotify' ? '/spotify-show-art.png' : `/api/banner?platform=${slug}`;

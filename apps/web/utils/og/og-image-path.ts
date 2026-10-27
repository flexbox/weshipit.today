// Bump when the OG templates change: social networks cache og:image per URL,
// so a new version is the only way to make LinkedIn, X and Slack refetch.
export const OG_IMAGE_VERSION = '2';

export type OgLang = 'en' | 'fr';

export interface OgImageOptions {
  kicker?: string;
  lang?: OgLang;
  path?: string;
  subline?: string;
  title: string;
}

export interface PodcastOgImageData {
  episode: number;
  guest: string;
  title: string;
  type: 'podcast' | 'transcript';
}

function withParams(
  route: string,
  params: Record<string, string | undefined>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  search.set('v', OG_IMAGE_VERSION);
  return `${route}?${search.toString()}`;
}

export function buildOgImagePath({
  kicker,
  lang,
  path,
  subline,
  title,
}: OgImageOptions): string {
  return withParams('/api/og', { kicker, lang, path, subline, title });
}

export function buildPodcastOgImagePath({
  episode,
  guest,
  title,
  type,
}: PodcastOgImageData): string {
  return withParams('/api/podcast-og', {
    episode: String(episode),
    guest,
    title,
    type,
  });
}

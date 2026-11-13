import type { PodcastEpisode } from '../fixtures/podcast-episodes.fixture';
import { PUBLISHER_SCHEMA } from './schema';

const SITE_URL = 'https://weshipit.today';

export const PODCAST_SERIES_SCHEMA = {
  '@type': 'PodcastSeries',
  inLanguage: 'fr',
  name: 'Le Cross Platform Show',
  url: `${SITE_URL}/podcast`,
} as const;

/** "1h06" or "58:30" → ISO 8601 duration ("PT1H6M", "PT58M30S"). */
export function toIsoDuration(duration?: string): string | undefined {
  if (!duration) return undefined;
  const hours = duration.match(/^(\d+)h(\d{1,2})?$/);
  if (hours) return `PT${Number(hours[1])}H${Number(hours[2] ?? 0)}M`;
  const clock = duration.match(/^(?:(\d+):)?(\d{1,2}):(\d{2})$/);
  if (clock) {
    const [, h, m, s] = clock;
    return `PT${h ? `${Number(h)}H` : ''}${Number(m)}M${Number(s)}S`;
  }
  return undefined;
}

/** Trim to `max` characters at a word boundary, for meta descriptions. */
export function truncateAtWord(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[\s,;:—-]+$/, '')}…`;
}

/**
 * PodcastEpisode for the episode page, plus a VideoObject for the embedded
 * YouTube recording. Google only indexes a video on a page whose main
 * subject is that video, with name, thumbnail and upload date.
 */
export function buildEpisodeSchemas(episode: PodcastEpisode) {
  const url = `${SITE_URL}/podcast/${episode.slug}`;
  const duration = toIsoDuration(episode.duration);
  const audioUrl = episode.spotify_url || episode.apple_podcast_url;

  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'PodcastEpisode',
      ...(audioUrl && {
        associatedMedia: { '@type': 'MediaObject', contentUrl: audioUrl },
      }),
      ...(episode.published_at && { datePublished: episode.published_at }),
      description: episode.description_short,
      ...(duration && { duration }),
      episodeNumber: episode.number,
      inLanguage: 'fr',
      name: episode.title,
      partOfSeries: PODCAST_SERIES_SCHEMA,
      publisher: PUBLISHER_SCHEMA,
      url,
    },
  ];

  if (episode.youtube_embed_id && episode.published_at) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      description: episode.description_short,
      ...(duration && { duration }),
      embedUrl: `https://www.youtube.com/embed/${episode.youtube_embed_id}`,
      inLanguage: 'fr',
      name: episode.title,
      thumbnailUrl: `https://i.ytimg.com/vi/${episode.youtube_embed_id}/hqdefault.jpg`,
      uploadDate: episode.published_at,
      url,
    });
  }

  return schemas;
}

import { Card, Button, LinkButton } from '@weshipit/ui';
import { PodcastEpisode } from '../fixtures/podcast-episodes.fixture';
import { SpotifyIcon, ApplePodcastIcon } from '@weshipit/ui';
import { Text } from '@weshipit/ui';
import Link from 'next/link';

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
}

export function PodcastEpisodeCard({ episode }: PodcastEpisodeCardProps) {
  return (
    <Card className="h-full flex flex-col" variant="link">
      <Link href={`/podcast/${episode.slug}`} className="group">
        <div className="grid p-4 group gap-3">
          <div className="flex items-center justify-between">
            <Text
              as="h3"
              variant="h3"
              className="group-hover:text-primary transition-colors"
            >
              {episode.name}
            </Text>
            {episode.company_logo && (
              <img
                src={episode.company_logo}
                alt={`Logo ${episode.name}`}
                className="w-14 h-14 rounded-xl object-cover shadow-md"
              />
            )}
          </div>

          <div className="min-h-56">
            <Text variant="p2" className="font-semibold mb-4">
              {episode.title}
            </Text>

            <Text variant="c1">{episode.description_short}</Text>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <div className="flex gap-3">
          <Button
            as="a"
            href={episode.spotify_url}
            isExternalLink={true}
            size="md"
            variant="outline"
            accessoryLeft={<SpotifyIcon />}
          >
            Spotify
          </Button>
          <Button
            as="a"
            href={episode.apple_podcast_url}
            isExternalLink={true}
            size="md"
            variant="outline"
            accessoryLeft={<ApplePodcastIcon />}
          >
            Apple Podcast
          </Button>
        </div>
      </div>
    </Card>
  );
}

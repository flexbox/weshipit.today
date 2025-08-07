import { Card, Button } from '@weshipit/ui';
import { PodcastEpisode } from '../fixtures/podcast-episodes.fixture';
import Link from 'next/link';
import { SpotifyIcon, ApplePodcastIcon } from '@weshipit/ui';
import { Text } from '@weshipit/ui';

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
}

export function PodcastEpisodeCard({ episode }: PodcastEpisodeCardProps) {
  return (
    <Link href={`/podcast/${episode.slug}`} className="block">
      <Card variant="link" className="h-full flex flex-col">
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-8">
            <Text as="h3" variant="h3">
              {episode.name}
            </Text>
            <img
              src={episode.companyLogo}
              alt={`Logo ${episode.name}`}
              className="w-14 h-14 rounded-xl object-cover shadow-md"
            />
          </div>

          <div className="my-4">
            <Text variant="p2" className="font-semibold">
              {episode.title}
            </Text>
          </div>

          <Text variant="c1" className="leading-relaxed">
            {episode.shortDescription}
          </Text>
        </div>

        <div className="p-6 pt-0">
          <div className="flex gap-3">
            <Button
              href={episode.spotifyLink}
              isExternalLink={true}
              size="md"
              variant="spotify"
              accessoryLeft={<SpotifyIcon />}
            >
              Spotify
            </Button>
            <Button
              href={episode.appleLink}
              isExternalLink={true}
              size="md"
              variant="apple"
              accessoryLeft={<ApplePodcastIcon />}
            >
              Apple Podcast
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

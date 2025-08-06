import { Card, Button } from '@weshipit/ui';
import { PodcastEpisode } from '../fixtures/podcast-episodes.fixture';
import Link from 'next/link';
import { SpotifyIcon, ApplePodcastIcon } from '@weshipit/ui';

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
}

export function PodcastEpisodeCard({ episode }: PodcastEpisodeCardProps) {
  return (
    <Link href={`/podcast/${episode.slug}`} className="block">
      <Card
        variant="link"
        className="h-full flex flex-col hover:shadow-md border border-slate-200 dark:border-slate-700"
      >
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {episode.name}
            </span>
            <img
              src={episode.companyLogo}
              alt={`Logo ${episode.name}`}
              className="w-14 h-14 rounded-xl object-cover shadow-md"
            />
          </div>

          <div className="mb-4">
            <p className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-2">
              {episode.title}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Épisode {episode.number} avec {episode.guestName}
            </p>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {episode.description}
          </p>
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

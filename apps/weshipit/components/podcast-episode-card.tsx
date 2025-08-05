import { Card, Button } from '@weshipit/ui';
import { PodcastEpisode } from '../fixtures/podcast-episodes.fixture';
import Link from 'next/link';

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
              alt="Logo entreprise"
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
              className="bg-green-600 hover:bg-green-700 text-white border-0"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Spotify
            </Button>
            <Button
              href={episode.appleLink}
              isExternalLink={true}
              size="md"
              className="bg-purple-600 hover:bg-purple-700 text-white border-0"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple Podcast
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

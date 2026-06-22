import Image from 'next/image';
import {
  PlayIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

import { CONFIG } from '../config/config';
import truncate from 'lodash/truncate';

interface SpotifyPodcastPreviewProps {
  coverUrl: string;
  variant?: 'desktop' | 'mobile';
  title?: string;
  author?: string;
  about?: string;
}

const DEFAULTS = {
  title: CONFIG.spotify.showName,
  author: CONFIG.spotify.creatorName,
  about: truncate(CONFIG.spotify.description, {
    length: 190,
    separator: '... Show more',
  }),
};

export function SpotifyPodcastPreview({
  coverUrl,
  variant = 'desktop',
  title = DEFAULTS.title,
  author = DEFAULTS.author,
  about = DEFAULTS.about,
}: SpotifyPodcastPreviewProps) {
  const isMobile = variant === 'mobile';

  return (
    <div
      className={`w-full text-white ${
        isMobile
          ? 'bg-neutral-950'
          : 'bg-gradient-to-b from-neutral-800 to-neutral-950'
      }`}
    >
      <div
        className={
          isMobile
            ? 'flex flex-col items-center px-4 pb-4 pt-6 text-center'
            : 'flex items-end gap-6 px-6 pb-6 pt-10'
        }
      >
        <div
          className={`relative flex-shrink-0 overflow-hidden ${
            isMobile
              ? 'h-40 w-40 rounded-md shadow-2xl'
              : 'h-48 w-48 rounded-md shadow-2xl'
          }`}
        >
          <Image
            src={coverUrl}
            alt={`${title} cover art`}
            fill
            sizes={isMobile ? '160px' : '192px'}
            className="object-cover"
            unoptimized
          />
        </div>

        <div className={isMobile ? 'mt-4 w-full' : 'flex flex-col gap-2'}>
          <p
            className={`text-xs font-semibold uppercase tracking-wide text-neutral-300 ${
              isMobile ? '' : ''
            }`}
          >
            Podcast
          </p>
          <h3
            className={`font-extrabold leading-tight ${
              isMobile ? 'text-2xl' : 'text-2xl'
            }`}
          >
            {title}
          </h3>
          <div
            className={`flex items-center gap-1.5 ${
              isMobile ? 'mt-2 justify-center' : 'mt-2'
            }`}
          >
            <span className="text-sm font-semibold">{author}</span>
          </div>
        </div>
      </div>

      <div
        className={
          isMobile
            ? 'flex items-center justify-between px-4 py-3'
            : 'flex items-center gap-4 px-6 py-3'
        }
      >
        <button
          type="button"
          aria-label="Follow"
          className="rounded-full border border-neutral-400 px-4 py-1.5 text-sm font-semibold text-white hover:border-white"
        >
          Follow
        </button>
        <button
          type="button"
          aria-label="More"
          className="rounded-full p-1.5 text-neutral-300 hover:text-white"
        >
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </button>
      </div>

      <div className={isMobile ? 'px-4 pb-4' : 'px-6 pb-6'}>
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-300">
          About
        </p>
        <p className={`text-neutral-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {about}
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { PodcastEpisode } from '../fixtures/podcast-episodes.fixture';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const linkClassName =
  'group flex items-center gap-3 rounded-2xl p-4 text-slate-600 ring-1 ring-slate-200 transition-[color,background-color] duration-150 ease-out hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:ring-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-slate-100';

export function PodcastNavigation({
  className,
  nextEpisode,
  previousEpisode,
}: {
  previousEpisode: PodcastEpisode | null;
  nextEpisode: PodcastEpisode | null;
  className?: string;
}) {
  return (
    <nav
      aria-label="Autres épisodes"
      className={`grid gap-4 pt-8 my-4 sm:grid-cols-2 ${className ?? ''}`}
    >
      {previousEpisode ? (
        <Link
          href={`/podcast/${previousEpisode.slug}`}
          className={linkClassName}
        >
          <ChevronLeftIcon className="size-5 shrink-0" aria-hidden="true" />
          <span className="min-w-0 text-left">
            <span className="block text-xs text-slate-500 dark:text-slate-400">
              Épisode précédent · {previousEpisode.number}
            </span>
            <span className="block font-medium text-pretty">
              {previousEpisode.title}
            </span>
          </span>
        </Link>
      ) : (
        <Link href="/podcast" className={linkClassName}>
          <ChevronLeftIcon className="size-5 shrink-0" aria-hidden="true" />
          <span className="font-medium">Retour à tous les épisodes</span>
        </Link>
      )}

      {nextEpisode && (
        <Link
          href={`/podcast/${nextEpisode.slug}`}
          className={`${linkClassName} justify-end sm:col-start-2`}
        >
          <span className="min-w-0 text-right">
            <span className="block text-xs text-slate-500 dark:text-slate-400">
              Épisode suivant · {nextEpisode.number}
            </span>
            <span className="block font-medium text-pretty">
              {nextEpisode.title}
            </span>
          </span>
          <ChevronRightIcon className="size-5 shrink-0" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}

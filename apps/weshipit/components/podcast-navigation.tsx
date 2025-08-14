import React from 'react';
import { PodcastEpisode } from '../fixtures/podcast-episodes.fixture';
import { Hyperlink } from '@weshipit/ui';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export function PodcastNavigation({
  previousEpisode,
  nextEpisode,
  className,
}: {
  previousEpisode: PodcastEpisode | null;
  nextEpisode: PodcastEpisode | null;
  className?: string;
}) {
  return (
    <div className={`flex justify-between items-center pt-8 my-4 ${className}`}>
      <div className="flex items-center gap-4">
        {previousEpisode ? (
          <Hyperlink
            href={`/podcast/${previousEpisode.slug}`}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <div className="text-left">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Épisode précédent
              </div>
              <div className="font-medium">
                E{previousEpisode.number} - {previousEpisode.title}
              </div>
            </div>
          </Hyperlink>
        ) : (
          <Hyperlink
            href="/podcast"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Retour à tous les épisodes
          </Hyperlink>
        )}
      </div>

      {nextEpisode && (
        <Hyperlink
          href={`/podcast/${nextEpisode.slug}`}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <div className="text-right">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Épisode suivant
            </div>
            <div className="font-medium">
              Épisode {nextEpisode.number} - {nextEpisode.title}
            </div>
          </div>
        </Hyperlink>
      )}
    </div>
  );
}

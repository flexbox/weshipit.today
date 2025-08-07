import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useRef } from 'react';
import {
  Hyperlink,
  Button,
  SpotifyIcon,
  ApplePodcastIcon,
  Text,
} from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';
import { PodcastNavigation } from '../../components/podcast-navigation';
import fs from 'fs';
import path from 'path';

interface PodcastEpisodePageProps {
  episode: (typeof podcastEpisodes)[0] | null;
  previousEpisode: (typeof podcastEpisodes)[0] | null;
  nextEpisode: (typeof podcastEpisodes)[0] | null;
  hasTranscript: boolean;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = podcastEpisodes.map((episode) => ({
    params: { slug: episode.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PodcastEpisodePageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;

  const episode = podcastEpisodes.find((ep) => ep.slug === slug);

  if (!episode) {
    return {
      props: {
        episode: null,
        previousEpisode: null,
        nextEpisode: null,
        hasTranscript: false,
      },
    };
  }

  const currentIndex = podcastEpisodes.findIndex((ep) => ep.slug === slug);
  const previousEpisode =
    currentIndex > 0 ? podcastEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < podcastEpisodes.length - 1
      ? podcastEpisodes[currentIndex + 1]
      : null;

  const transcriptPath = path.join(
    process.cwd(),
    'public/podcast-transcripts',
    `${slug}.txt`,
  );
  const hasTranscript = fs.existsSync(transcriptPath);

  return {
    props: {
      episode,
      previousEpisode,
      nextEpisode,
      hasTranscript,
    },
  };
};

export default function PodcastEpisodePage({
  episode,
  previousEpisode,
  nextEpisode,
  hasTranscript,
}: PodcastEpisodePageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        const isExternal = link.getAttribute('target') === '_blank';
        if (isExternal) {
          link.setAttribute('rel', 'noopener noreferrer nofollow');
          const linkContent = link.innerHTML;
          link.innerHTML = '';
          const span = document.createElement('span');
          span.className = 'inline-flex items-center';
          span.innerHTML = linkContent;
          link.appendChild(span);
        }
      });
    }
  }, [episode]);

  if (!episode) {
    return (
      <Layout
        seoTitle="Épisode non trouvé"
        seoDescription="L'épisode que vous recherchez n'existe pas."
        withHeader
        withContainer
      >
        <div className="mt-16 text-center">
          <Text as="h1" variant="h3" className="mb-4">
            Épisode non trouvé
          </Text>
          <Text
            variant="p1"
            className="text-slate-600 dark:text-slate-400 mb-8"
          >
            L'épisode que vous recherchez n'existe pas.
          </Text>
          <Hyperlink
            href="/podcast"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Retour aux épisodes
          </Hyperlink>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      seoTitle={`${episode.name} avec ${episode.guestName} — Le Cross Platform Show Podcast`}
      seoDescription={episode.description}
      withHeader
      withContainer
    >
      <div className="mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Hyperlink
              href="/podcast"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour aux épisodes
            </Hyperlink>
          </div>
          {/* <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 mb-8"> */}
          <div className="p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              <div className="flex-1 lg:order-1">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Épisode {episode.number}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Podcast
                      </span>
                    </div>
                    <Text as="h1" variant="h2" className="mb-3">
                      {episode.name}
                    </Text>
                    <Text
                      variant="s1"
                      className="text-slate-600 dark:text-slate-300 mb-6"
                    >
                      avec{' '}
                      <span className="font-semibold">{episode.guestName}</span>
                    </Text>
                    <div
                      ref={contentRef}
                      className="text-slate-700 dark:text-slate-200 leading-relaxed prose prose-slate dark:prose-invert max-w-none prose-a:no-underline prose-a:text-blue-600 hover:prose-a:text-blue-700 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300"
                      dangerouslySetInnerHTML={{ __html: episode.description }}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={episode.companyLogo}
                      alt={`Logo ${episode.name}`}
                      className="w-24 h-24 rounded-xl object-cover shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <Text as="h2" variant="h3" className="mb-6">
              Écouter l'épisode
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button
                href={episode.spotifyLink}
                isExternalLink={true}
                size="lg"
                variant="spotify"
                accessoryLeft={<SpotifyIcon />}
              >
                Écouter sur Spotify
              </Button>

              <Button
                href={episode.appleLink}
                isExternalLink={true}
                size="lg"
                variant="apple"
                accessoryLeft={<ApplePodcastIcon />}
              >
                Écouter sur Apple Podcast
              </Button>
              {hasTranscript && (
                <Button
                  as="a"
                  href={`/podcast/${episode.slug}/transcript`}
                  variant="primary"
                  size="lg"
                  accessoryLeft={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  }
                >
                  Voir le transcript
                </Button>
              )}
            </div>
          </div>

          <PodcastNavigation
            previousEpisode={previousEpisode}
            nextEpisode={nextEpisode}
            className="mb-16"
          />
        </div>
      </div>
    </Layout>
  );
}

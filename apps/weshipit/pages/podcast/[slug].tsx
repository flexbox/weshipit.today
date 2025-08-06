import { useRouter } from 'next/router';
import { Hyperlink, Button, SpotifyIcon, ApplePodcastIcon } from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';
import { useEffect, useState } from 'react';
import { Transcript } from '../../components/transcript';
import { parseTranscript, TranscriptEntryType } from '../../utils/transcript';
import { PodcastNavigation } from '../../components/podcast-navigation';

export default function PodcastEpisodePage() {
  const router = useRouter();
  const { slug } = router.query;

  const episode = podcastEpisodes.find((ep) => ep.slug === slug);

  const [transcriptEntries, setTranscriptEntries] = useState<
    TranscriptEntryType[] | null
  >(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/podcast-transcripts/${slug}-transcript.txt`)
      .then((res) => {
        if (res.ok) return res.text();
        return null;
      })
      .then((text) => {
        if (text) {
          setTranscriptEntries(parseTranscript(text));
        } else {
          setTranscriptEntries(null);
        }
      });
  }, [slug]);

  if (!episode) {
    return (
      <Layout
        seoTitle="Épisode non trouvé"
        seoDescription="L'épisode que vous recherchez n'existe pas."
        withHeader
        withContainer
      >
        <div className="mt-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Épisode non trouvé</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            L'épisode que vous recherchez n'existe pas.
          </p>
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

  const currentIndex = podcastEpisodes.findIndex((ep) => ep.slug === slug);
  const previousEpisode =
    currentIndex > 0 ? podcastEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < podcastEpisodes.length - 1
      ? podcastEpisodes[currentIndex + 1]
      : null;

  return (
    <Layout
      seoTitle={`Épisode ${episode.number} - ${episode.name} avec ${episode.guestName}`}
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
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              <div className="flex-shrink-0 mb-6 lg:mb-0">
                <img
                  src={episode.companyLogo}
                  alt={`Logo ${episode.name}`}
                  className="w-24 h-24 rounded-xl object-cover shadow-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Épisode {episode.number}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Podcast
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                  {episode.name}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
                  avec{' '}
                  <span className="font-semibold">{episode.guestName}</span>
                </p>
                <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                  {episode.description}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Écouter l'épisode
            </h2>
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
            </div>
          </div>
          {transcriptEntries && transcriptEntries.length > 0 && (
            <>
              <PodcastNavigation
                previousEpisode={previousEpisode}
                nextEpisode={nextEpisode}
              />
              <Transcript
                entries={transcriptEntries}
                spotifyLink={episode.spotifyLink}
              />
            </>
          )}
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

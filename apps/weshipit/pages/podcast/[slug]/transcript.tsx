import { GetStaticPaths, GetStaticProps } from 'next';
import { Hyperlink, Text, Button } from '@weshipit/ui';
import { Layout } from '../../../components/layout';
import { podcastEpisodes } from '../../../fixtures/podcast-episodes.fixture';
import { Transcript } from '../../../components/transcript';
import {
  parseTranscript,
  TranscriptEntryType,
} from '../../../utils/transcript';
import { PodcastNavigation } from '../../../components/podcast-navigation';
import fs from 'fs';
import path from 'path';

interface PodcastTranscriptPageProps {
  episode: (typeof podcastEpisodes)[0] | null;
  previousEpisode: (typeof podcastEpisodes)[0] | null;
  nextEpisode: (typeof podcastEpisodes)[0] | null;
  transcriptEntries: TranscriptEntryType[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Générer les paths seulement pour les épisodes qui ont un transcript
  const transcriptsDir = path.join(process.cwd(), 'public/podcast-transcripts');
  const transcriptFiles = fs.existsSync(transcriptsDir)
    ? fs.readdirSync(transcriptsDir)
    : [];

  const paths = podcastEpisodes
    .filter((episode) => {
      const transcriptFile = `${episode.slug}-transcript.txt`;
      return transcriptFiles.includes(transcriptFile);
    })
    .map((episode) => ({
      params: { slug: episode.slug },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PodcastTranscriptPageProps
> = async ({ params }) => {
  const slug = params?.slug as string;

  const episode = podcastEpisodes.find((ep) => ep.slug === slug);

  if (!episode) {
    return {
      props: {
        episode: null,
        previousEpisode: null,
        nextEpisode: null,
        transcriptEntries: [],
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

  // Lire le transcript
  let transcriptEntries: TranscriptEntryType[] = [];
  const transcriptPath = path.join(
    process.cwd(),
    'public/podcast-transcripts',
    `${slug}-transcript.txt`,
  );

  if (fs.existsSync(transcriptPath)) {
    const transcriptContent = fs.readFileSync(transcriptPath, 'utf-8');
    transcriptEntries = parseTranscript(transcriptContent);
  }

  return {
    props: {
      episode,
      previousEpisode,
      nextEpisode,
      transcriptEntries,
    },
  };
};

export default function PodcastTranscriptPage({
  episode,
  previousEpisode,
  nextEpisode,
  transcriptEntries,
}: PodcastTranscriptPageProps) {
  if (!episode) {
    return (
      <Layout
        seoTitle="Transcript non trouvé"
        seoDescription="Le transcript que vous recherchez n'existe pas."
        withHeader
        withContainer
      >
        <div className="mt-16 text-center">
          <Text as="h1" variant="h3" className="mb-4">
            Transcript non trouvé
          </Text>
          <Text
            variant="p1"
            className="text-slate-600 dark:text-slate-400 mb-8"
          >
            Le transcript que vous recherchez n'existe pas.
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
      seoTitle={`Transcript - Épisode ${episode.number} - ${episode.name} avec ${episode.guestName}`}
      seoDescription={`Transcript complet de l'épisode ${episode.number} du podcast avec ${episode.guestName} de ${episode.name}. ${episode.description}`}
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

          {/* Header de l'épisode */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              <div className="flex-1 lg:order-1">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Épisode {episode.number}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Transcript
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
                    <div className="flex flex-wrap gap-4">
                      <Button
                        as="a"
                        href={`/podcast/${episode.slug}`}
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
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6-5a7 7 0 017 7v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1a7 7 0 017-7z"
                            />
                          </svg>
                        }
                      >
                        Écouter l'épisode
                      </Button>
                    </div>
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

          {/* Navigation */}
          <PodcastNavigation
            previousEpisode={previousEpisode}
            nextEpisode={nextEpisode}
          />

          {/* Transcript */}
          {transcriptEntries && transcriptEntries.length > 0 && (
            <div className="mt-8">
              <Transcript
                entries={transcriptEntries}
                spotifyLink={episode.spotifyLink}
              />
            </div>
          )}

          {/* Navigation en bas */}
          <PodcastNavigation
            previousEpisode={previousEpisode}
            nextEpisode={nextEpisode}
            className="mt-16 mb-16"
          />
        </div>
      </div>
    </Layout>
  );
}

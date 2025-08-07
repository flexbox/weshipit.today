import { GetStaticPaths, GetStaticProps } from 'next';
import { Hyperlink, Text, Button, Badge, Card } from '@weshipit/ui';
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
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

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
      const transcriptFile = `${episode.slug}.txt`;
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
    `${slug}.txt`,
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
            <ChevronLeftIcon className="h-4 w-4 mr-1" /> Retour aux épisodes
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
      <div className="mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex mb-8 gap-4">
            <Hyperlink
              href="/podcast"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Retour aux épisodes
            </Hyperlink>
            <div className="text-slate-400">•</div>
            <Hyperlink
              href={`/podcast/${episode.slug}`}
              className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              Écouter l'épisode
            </Hyperlink>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            <div className="flex-1 lg:order-1">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge size="sm">Épisode {episode.number}</Badge>
                    <Badge variant="blue" size="sm">
                      Transcript
                    </Badge>
                  </div>
                  <Text as="h1" variant="h2" className="mb-3">
                    {episode.name}
                  </Text>
                  <Text
                    variant="s1"
                    className="text-slate-600 dark:text-slate-300"
                  >
                    avec{' '}
                    <span className="font-semibold">{episode.guestName}</span>
                  </Text>
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

          {transcriptEntries && transcriptEntries.length > 0 && (
            <div className="mt-8">
              <Transcript
                entries={transcriptEntries}
                spotifyLink={episode.spotifyLink}
              />
            </div>
          )}

          <PodcastNavigation
            previousEpisode={previousEpisode}
            nextEpisode={nextEpisode}
            className="my-32"
          />
        </div>
      </div>
    </Layout>
  );
}

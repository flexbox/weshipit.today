import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Button,
  SpotifyIcon,
  ApplePodcastIcon,
  Text,
  Badge,
  Card,
  Prose,
} from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';
import { PodcastNavigation } from '../../components/podcast-navigation';
import fs from 'fs';
import path from 'path';
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { linksApi } from '../api/links';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import { Transcript } from '../../components/transcript';
import { parseTranscript, TranscriptEntryType } from '../../utils/transcript';
import {
  buildEpisodeSchemas,
  episodeTitle,
  truncateAtWord,
} from '../../utils/podcast-schema';

interface PodcastEpisodePageProps {
  articleContent: string | null;
  transcriptEntries: TranscriptEntryType[];
  episode: (typeof podcastEpisodes)[0] | null;
  nextEpisode: (typeof podcastEpisodes)[0] | null;
  previousEpisode: (typeof podcastEpisodes)[0] | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = podcastEpisodes.map((episode) => ({
    params: { slug: episode.slug },
  }));

  return {
    fallback: false,
    paths,
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
        articleContent: null,
        episode: null,
        nextEpisode: null,
        previousEpisode: null,
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

  const transcriptPath = path.join(
    process.cwd(),
    'public/podcast-transcripts',
    `${slug}.txt`,
  );
  // The transcript lives on the episode page (it used to be a separate
  // /transcript page that competed with this one and wasn't indexed).
  const transcriptEntries = fs.existsSync(transcriptPath)
    ? parseTranscript(fs.readFileSync(transcriptPath, 'utf-8'))
    : [];

  const articlePath = path.join(
    process.cwd(),
    'content/podcast-articles',
    `${slug}.md`,
  );
  const articleContent = fs.existsSync(articlePath)
    ? fs.readFileSync(articlePath, 'utf8')
    : null;

  return {
    props: {
      articleContent,
      episode,
      nextEpisode,
      previousEpisode,
      transcriptEntries,
    },
  };
};

export default function PodcastEpisodePage({
  articleContent,
  episode,
  nextEpisode,
  previousEpisode,
  transcriptEntries,
}: PodcastEpisodePageProps) {
  // Old /transcript URLs redirect to #transcript, and the "Transcript" link
  // points there too: open the section when the hash targets it.
  useEffect(() => {
    const openTranscript = () => {
      const details = document.getElementById('transcript');
      if (
        window.location.hash === '#transcript' &&
        details instanceof HTMLDetailsElement
      ) {
        details.open = true;
        details.scrollIntoView();
      }
    };
    openTranscript();
    window.addEventListener('hashchange', openTranscript);
    return () => window.removeEventListener('hashchange', openTranscript);
  }, []);

  if (!episode) {
    return (
      <Layout
        locale="fr_FR"
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
            L&apos;épisode que vous recherchez n&apos;existe pas.
          </Text>
          <Link
            href="/podcast"
            className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" /> Retour aux
            épisodes
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      locale="fr_FR"
      seoTitle={episodeTitle(episode)}
      seoDescription={truncateAtWord(episode.description_short)}
      ogImagePodcast={{
        episode: episode.number,
        guest: episode.guests.join(', '),
        title: episode.name,
        type: 'podcast',
      }}
      withHeader
      withContainer
    >
      <Head>
        {buildEpisodeSchemas(episode).map((schema) => (
          <script
            key={String(schema['@type'])}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
      <div className="mt-8">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8 flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <Link
              href="/podcast"
              className="inline-flex items-center gap-2 transition-colors hover:text-slate-800 dark:hover:text-slate-200"
            >
              <ChevronLeftIcon className="size-4" aria-hidden="true" />
              Retour aux épisodes
            </Link>
            {transcriptEntries.length > 0 && (
              <>
                <span className="text-slate-400" aria-hidden="true">
                  •
                </span>
                <a
                  href="#transcript"
                  className="transition-colors hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Transcript
                </a>
              </>
            )}
          </nav>

          <header className="mb-8 flex items-start justify-between gap-6">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Badge size="sm">Épisode {episode.number}</Badge>
                <Badge variant="green" size="sm">
                  Podcast
                </Badge>
              </div>
              <Text as="h1" variant="h2" className="mb-3 text-balance">
                {episode.name}
              </Text>
              <Text variant="s1" className="text-slate-600 dark:text-slate-300">
                avec{' '}
                <span className="font-semibold">
                  {episode.guests.join(', ')}
                </span>
              </Text>
            </div>
            {episode.company_logo && (
              <img
                src={episode.company_logo}
                alt={`Logo ${episode.name}`}
                className="size-16 shrink-0 rounded-xl object-cover shadow-md outline outline-1 -outline-offset-1 outline-black/10 sm:size-24 dark:outline-white/10"
              />
            )}
          </header>

          <div className="mb-12 flex flex-col gap-6">
            {(episode.spotify_url || episode.apple_podcast_url) && (
              <Card>
                <Text as="h2" variant="h4" className="mb-4">
                  Écouter l&apos;épisode
                </Text>
                <div className="flex flex-wrap gap-4">
                  {episode.spotify_url && (
                    <Button
                      as="a"
                      href={episode.spotify_url}
                      isExternalLink={true}
                      size="lg"
                      variant="spotify"
                      accessoryLeft={<SpotifyIcon />}
                    >
                      Écouter sur Spotify
                    </Button>
                  )}

                  {episode.apple_podcast_url && (
                    <Button
                      as="a"
                      href={episode.apple_podcast_url}
                      isExternalLink={true}
                      size="lg"
                      variant="apple"
                      accessoryLeft={<ApplePodcastIcon />}
                    >
                      Écouter sur Apple Podcast
                    </Button>
                  )}
                </div>
              </Card>
            )}
            {episode.youtube_embed_id && (
              <Card>
                <Text as="h2" variant="h4" className="mb-4">
                  Regarder sur YouTube
                </Text>
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${episode.youtube_embed_id}`}
                    title={`YouTube video player - ${episode.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="size-full rounded-lg"
                  />
                </div>
              </Card>
            )}
          </div>

          {articleContent && (
            <Prose size="lg" className="text-pretty">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                // The article opens with its own `# title`; the page
                // already has the episode <h1>, so demote it.
                components={{
                  h1: ({ node, ...props }) => <h2 {...props} />,
                }}
              >
                {articleContent}
              </ReactMarkdown>
            </Prose>
          )}

          {transcriptEntries.length > 0 && (
            // Server-rendered inside <details>: collapsed for readers, but the
            // full text is in the HTML for search engines.
            <details
              id="transcript"
              className="group mt-16 overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 transition-[background-color] duration-150 ease-out hover:bg-slate-50 dark:hover:bg-slate-800/50 [&::-webkit-details-marker]:hidden">
                <Text as="h2" variant="h4">
                  Transcript de l&apos;épisode
                </Text>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <span className="group-open:hidden">Afficher</span>
                  <span className="hidden group-open:inline">Masquer</span>
                  <ChevronDownIcon
                    className="size-5 motion-safe:transition-[rotate] motion-safe:duration-150 motion-safe:ease-out group-open:rotate-180"
                    aria-hidden="true"
                  />
                </span>
              </summary>
              <div className="px-6 pb-6">
                <Transcript
                  entries={transcriptEntries}
                  spotify_url={episode.spotify_url}
                />
              </div>
            </details>
          )}
          <Card
            size="xl"
            className="my-24 flex flex-col items-center justify-center gap-8 text-center"
            variant="gradient-blue"
          >
            <Text
              variant="h4"
              as="h2"
              className="text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text font-bold text-transparent drop-shadow"
            >
              Venez parler de votre stack sur le podcast
            </Text>
            <Text
              variant="p1"
              as="p"
              className="text-pretty bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow"
            >
              Vous avez développé une application avec React Native et souhaitez
              partager votre expérience ? Rejoignez le Cross Platform Show et
              racontez votre histoire !
            </Text>
            <Button
              href={linksApi.notion.PODCAST_FORM}
              size="xxl"
              variant="outline"
              as="a"
              isExternalLink
            >
              Participer au podcast
            </Button>
          </Card>

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

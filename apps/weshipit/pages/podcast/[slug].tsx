import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useRef } from 'react';
import {
  Hyperlink,
  Button,
  SpotifyIcon,
  ApplePodcastIcon,
  Text,
  Badge,
  Card,
} from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';
import { PodcastNavigation } from '../../components/podcast-navigation';
import fs from 'fs';
import path from 'path';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { linksApi } from '../api/links';

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
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" /> Retour aux épisodes
          </Hyperlink>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      seoTitle={`${episode.name} avec ${episode.guestName} — Le Cross Platform Show Podcast`}
      seoDescription={episode.description}
      ogImageTitle={`/api/podcast-og?title=${encodeURIComponent(episode.name)}&guest=${encodeURIComponent(episode.guestName)}&episode=${episode.number}&type=podcast`}
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
            {hasTranscript && (
              <Hyperlink
                href={`/podcast/${episode.slug}/transcript`}
                className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Transcript
              </Hyperlink>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 mb-12">
            <div className="flex-1 lg:order-1">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge size="sm">Épisode {episode.number}</Badge>
                        <Badge variant="green" size="sm">
                          Podcast
                        </Badge>
                      </div>
                      <Text as="h1" variant="h2" className="mb-3">
                        {episode.name}
                      </Text>
                      <Text
                        variant="s1"
                        className="text-slate-600 dark:text-slate-300 mb-6"
                      >
                        avec{' '}
                        <span className="font-semibold">
                          {episode.guestName}
                        </span>
                      </Text>
                    </div>
                    <img
                      src={episode.companyLogo}
                      alt={`Logo ${episode.name}`}
                      className="w-24 h-24 rounded-xl object-cover shadow-lg"
                    />
                  </div>
                  <Card>
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
                    </div>
                  </Card>
                  {episode.youtubeEmbedId && (
                    <Card className="my-6">
                      <Text as="h2" variant="h4" className="mb-4">
                        Regarder sur YouTube
                      </Text>
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${episode.youtubeEmbedId}`}
                          title={`YouTube video player - ${episode.name}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    </Card>
                  )}
                  <div
                    ref={contentRef}
                    className="text-slate-700 dark:text-slate-200 leading-relaxed prose prose-slate dark:prose-invert max-w-none prose-a:no-underline prose-a:text-blue-600 hover:prose-a:text-blue-700 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300"
                    dangerouslySetInnerHTML={{ __html: episode.description }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Card
            size="xl"
            className="my-24 flex flex-col items-center justify-center gap-8 text-center"
            variant="gradient-blue"
          >
            <Text
              variant="h4"
              as="h2"
              className="bg-gradient-to-b from-white to-white/75 bg-clip-text font-bold tracking-tight text-transparent drop-shadow"
            >
              Venez parler de votre stack sur le podcast
            </Text>
            <Text
              variant="p1"
              as="p"
              className="bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow"
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

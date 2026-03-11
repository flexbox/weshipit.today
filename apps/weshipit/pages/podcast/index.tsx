import { Button, Hyperlink, LinkButton, Prose, Text } from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { PodcastEpisodeCard } from '../../components/podcast-episode-card';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';
import { linksApi } from 'apps/weshipit/pages/api/links';
import { useState } from 'react';

const YOUTUBE_URL = 'https://www.youtube.com/@flexbox_?sub_confirmation=1';
const APPLE_PODCAST_URL =
  'https://podcasts.apple.com/fr/podcast/le-cross-platform-show/id1790867559';
const SPOTIFY_URL =
  'https://open.spotify.com/show/69dZrIeMZ2S2QELCGp6gW1?si=27c63da998b8487d';
const DEEZER_URL = 'https://www.deezer.com/show/1001735451';
const RSS_URL = 'https://anchor.fm/s/ffc13f2c/podcast/rss';

const EPISODES_PREVIEW_COUNT = 6;

export default function Podcast() {
  const [showAll, setShowAll] = useState(false);

  const latestEpisodes = [...podcastEpisodes]
    .sort((a, b) => b.number - a.number)
    .slice(0, showAll ? undefined : EPISODES_PREVIEW_COUNT);

  return (
    <Layout
      seoTitle="Le Cross Platform Show, le podcast francophone React Native animé par David Leuliette"
      seoDescription="Interviews de développeurs React Native, discussions sur les dernières tendances et conseils pratiques pour améliorer vos compétences en développement cross-platform."
      ogImageTitle="Le Cross Platform Show"
      withHeader
      callToActionLink={{
        name: 'Participer au podcast',
        href: linksApi.notion.PODCAST_FORM,
        isExternalLink: true,
      }}
      withContainer
    >
      <div className="mt-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
          <div className="flex">
            <Prose>
              <h1>Le Cross Platform Show Podcast</h1>
              <p>
                Le podcast React Native qui décortique les apps que tu utilises
                chaque jour : Alan, Cdiscount, Swan... Code, archi, coulisses de
                prod. Pour devenir meilleur dev cross-platform avec React
                Native.
              </p>

              <h2>Pourquoi écouter le podcast ?</h2>
              <ul>
                <li>
                  Décortique des apps real-world (pas des tutos théoriques)
                </li>
                <li>Interview les devs qui codent les apps que tu utilises</li>
                <li>
                  Apprends les choix d'archi, les erreurs, les optimisations de
                  prod
                </li>
              </ul>

              <ol>
                <li>
                  Abonnez-vous à la{' '}
                  <Hyperlink href={YOUTUBE_URL} isExternal>
                    chaine YouTube de David Leuliette
                  </Hyperlink>
                  .
                </li>
                <li>
                  Abonnez-vous sur{' '}
                  <Hyperlink href={APPLE_PODCAST_URL} isExternal>
                    Apple Podcasts
                  </Hyperlink>
                  ,{' '}
                  <Hyperlink href={SPOTIFY_URL} isExternal>
                    Spotify
                  </Hyperlink>{' '}
                  et{' '}
                  <Hyperlink href={RSS_URL} isExternal>
                    RSS
                  </Hyperlink>
                  . Si vous appréciez le podcast, n'hésitez pas à lui attribuer
                  5 étoiles.
                </li>
                <li>
                  Suivez-nous sur{' '}
                  <Hyperlink
                    href="https://x.com/intent/follow?screen_name=flexbox_"
                    isExternal
                  >
                    Twitter
                  </Hyperlink>
                  ,{' '}
                  <Hyperlink
                    href="https://bsky.app/profile/flexbox.bsky.social"
                    isExternal
                  >
                    Bluesky
                  </Hyperlink>
                  ,{' '}
                  <Hyperlink
                    href="https://www.linkedin.com/in/david-leuliette/"
                    isExternal
                  >
                    LinkedIn
                  </Hyperlink>
                  , et{' '}
                  <Hyperlink href="https://github.com/flexbox" isExternal>
                    GitHub
                  </Hyperlink>
                  .
                </li>
                <li>
                  Rejoins la communauté des développeurs React Native
                  francophones sur{' '}
                  <Hyperlink
                    href="https://join.slack.com/t/reactnativeconnection/shared_invite/zt-1j5jigyph-MJURqXxpWHXTcYSH8PwhrQ"
                    isExternal
                  >
                    le Slack React Native Connection
                  </Hyperlink>
                  .
                </li>
                <li>
                  La meilleure façon de soutenir ce podcast est de{' '}
                  <Hyperlink
                    href="https://github.com/sponsors/flexbox"
                    isExternal
                  >
                    faire un don sur GitHub
                  </Hyperlink>
                  .
                </li>
              </ol>
            </Prose>
          </div>
          <div className="lg:w-64 lg:flex-shrink-0 mt-6 lg:mt-0">
            <div className="grid gap-6">
              <img
                src="/images/podcast.jpeg"
                alt="Logo du podcast Le Cross Platform Show par David Leuliette"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <Text as="p" variant="c1" className="italic">
                Écouté par 200+ développeurs React Native francophones
              </Text>
              <Text as="h2" variant="p1" className="font-bold">
                Abonne-toi sur ta plateforme préférée
              </Text>
            </div>
            <div className="flex mt-4 mb-12 gap-3 flex-wrap">
              <LinkButton
                variant="outline"
                size="xl"
                isExternalLink
                href={SPOTIFY_URL}
              >
                Spotify
              </LinkButton>
              <LinkButton variant="outline" isExternalLink href={YOUTUBE_URL}>
                Youtube
              </LinkButton>
              <LinkButton variant="outline" isExternalLink href={DEEZER_URL}>
                Deezer
              </LinkButton>
              <LinkButton
                variant="outline"
                isExternalLink
                href={APPLE_PODCAST_URL}
              >
                Apple Podcast
              </LinkButton>
              <LinkButton variant="outline" isExternalLink href={RSS_URL}>
                RSS
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-8">
        <Prose>
          <h2>Derniers épisodes</h2>
        </Prose>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {latestEpisodes.map((episode) => (
          <PodcastEpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>

      {!showAll && (
        <div className="flex justify-center mb-12">
          <Button variant="outline" size="xl" onClick={() => setShowAll(true)}>
            Voir tous les épisodes
          </Button>
        </div>
      )}
    </Layout>
  );
}

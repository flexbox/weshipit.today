import { Hyperlink, LinkButton, Prose, Text } from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { PodcastEpisodeCard } from '../../components/podcast-episode-card';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';

const NOTION_FORM_URL =
  'https://flexbox.notion.site/17af478bcb8c8018b4a9db6b13d1df38?pvs=105';
const YOUTUBE_URL = 'https://www.youtube.com/@flexbox_?sub_confirmation=1';

export default function Podcast() {
  return (
    <Layout
      seoTitle="Le Cross Platform Show, le podcast francophone React Native animé par David Leuliette"
      seoDescription="Interviews de développeurs React Native, discussions sur les dernières tendances et conseils pratiques pour améliorer vos compétences en développement cross-platform."
      ogImageTitle="Le Cross Platform Show"
      withHeader
      callToActionLink={{
        name: 'Participer au podcast',
        href: NOTION_FORM_URL,
        isExternalLink: true,
      }}
      callToActionButton={{
        name: 'Expo checklist',
        href: 'https://flexbox.gumroad.com/l/expo-checklist',
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
                Conversations sur la{' '}
                <strong>programmation en React Native</strong> pour les
                plateformes iOS, Android et web en apportant une touche de joie
                et de passion au quotidien des développeurs.
              </p>

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
                  <Hyperlink
                    href="https://podcasts.apple.com/fr/podcast/le-cross-platform-show/id1790867559"
                    isExternal
                  >
                    Apple Podcasts
                  </Hyperlink>
                  ,{' '}
                  <Hyperlink
                    href="https://open.spotify.com/show/69dZrIeMZ2S2QELCGp6gW1?si=27c63da998b8487d"
                    isExternal
                  >
                    Spotify
                  </Hyperlink>{' '}
                  et{' '}
                  <Hyperlink
                    href="https://anchor.fm/s/ffc13f2c/podcast/rss"
                    isExternal
                  >
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
                <li>
                  Pour participer au podcast, veuillez consulter le{' '}
                  <Hyperlink href={NOTION_FORM_URL} isExternal>
                    formulaire d'inscription
                  </Hyperlink>
                  .
                </li>
              </ol>
            </Prose>
          </div>
          <div className="lg:w-64 lg:flex-shrink-0 mt-6 lg:mt-0">
            <img
              src="/images/podcast.jpeg"
              alt="Logo du podcast Le Cross Platform Show par David Leuliette"
              className="w-full h-auto rounded-lg shadow-lg"
            />

            <Text as="h2" variant="p1" className="mt-12 mb-4 font-bold">
              S’abonner au podcast
            </Text>
            <div className="flex mt-4 mb-12 gap-3 flex-wrap">
              <LinkButton
                variant="outline"
                isExternalLink
                href="https://open.spotify.com/show/69dZrIeMZ2S2QELCGp6gW1?si=27c63da998b8487d"
              >
                Spotify
              </LinkButton>
              <LinkButton
                variant="outline"
                isExternalLink
                href="https://www.youtube.com/@flexbox_/podcasts?sub_confirmation=1"
              >
                Youtube
              </LinkButton>
              <LinkButton
                variant="outline"
                isExternalLink
                href="https://www.deezer.com/show/1001735451"
              >
                Deezer
              </LinkButton>
              <LinkButton
                variant="outline"
                isExternalLink
                href="https://podcasts.apple.com/fr/podcast/le-cross-platform-show/id1790867559"
              >
                Apple Podcast
              </LinkButton>
              <LinkButton
                variant="outline"
                isExternalLink
                href="https://anchor.fm/s/ffc13f2c/podcast/rss"
              >
                RSS
              </LinkButton>
            </div>
          </div>
        </div>
      </div>

      <Text as="h2" variant="h4" className="mt-12 mb-8">
        Derniers épisodes
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {podcastEpisodes.map((episode) => (
          <PodcastEpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>
    </Layout>
  );
}

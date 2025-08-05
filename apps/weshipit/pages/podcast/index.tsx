import { Hyperlink, LinkButton, Prose } from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { PodcastEpisodeCard } from '../../components/podcast-episode-card';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';

const NOTION_FORM_URL =
  'https://flexbox.notion.site/17af478bcb8c8018b4a9db6b13d1df38?pvs=105';

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
      <div className="mt-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
          <div className="flex-1">
            <Prose>
              <h1>Le Cross Platform Show</h1>
              <p>
                Le podcast francophone incontournable pour les développeurs
                cross-platform, explorant React Native et bien plus, tout en
                apportant une touche de joie et de passion au quotidien des
                coders.
              </p>
              <p>
                Tu as une application codée en React Native et tu souhaites
                partager ton expérience ? Pour enregistrer une émission, il
                suffit de{' '}
                <Hyperlink href={NOTION_FORM_URL} isExternal>
                  remplir ce formulaire sur Notion
                </Hyperlink>
                .
              </p>
              <h2>S'abonner au podcast</h2>
            </Prose>
          </div>
          <div className="lg:w-64 lg:flex-shrink-0 mt-6 lg:mt-0">
            <img
              src="/images/podcast.jpeg"
              alt="David Leuliette - Cross Platform Show"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
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
          href="https://www.youtube.com/@flexbox_/podcasts"
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
      <Prose className="mt-12 mb-8">
        <h2>Derniers épisodes</h2>
      </Prose>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {podcastEpisodes.map((episode) => (
          <PodcastEpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>
      <Prose className="mt-12 mb-12">
        <h2>Sponsoriser l'émission</h2>
        <p>
          Tu souhaites sponsoriser le podcast ?{' '}
          <Hyperlink href="https://github.com/sponsors/flexbox" isExternal>
            devenez sponsor sur GitHub
          </Hyperlink>
          .
        </p>
        <h2>Rejoindre la communauté</h2>
        <p>
          Rejoins la communauté des développeurs React Native francophones sur{' '}
          <Hyperlink
            href="https://join.slack.com/t/reactnativeconnection/shared_invite/zt-1j5jigyph-MJURqXxpWHXTcYSH8PwhrQ"
            isExternal
          >
            le Slack de React Native Connection
          </Hyperlink>
          .
        </p>
      </Prose>
    </Layout>
  );
}

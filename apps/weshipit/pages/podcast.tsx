import { Hyperlink, LinkButton, Prose } from '@weshipit/ui';
import { Layout } from '../components/layout';

const NOTION_FORM_URL =
  'https://flexbox.notion.site/17af478bcb8c8018b4a9db6b13d1df38?pvs=105';

export default function Podcast() {
  return (
    <Layout
      seoTitle="Le Cross Platform Show, le podcast francophone React Native animé par David Leuliette"
      seoDescription="Interviews de développeurs React Native, discussions sur les dernières tendances et conseils pratiques pour améliorer vos compétences en développement cross-platform."
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
      <Prose className="mt-16">
        <h1>Le Cross Platform Show</h1>
        <p>
          Le podcast francophone incontournable pour les développeurs
          cross-platform, explorant React Native et bien plus, tout en apportant
          une touche de joie et de passion au quotidien des coders.
        </p>
        <p>
          Tu as une application codée en React Native et tu souhaites partager
          ton expérience ? Pour enregistrer une émission, il suffit de{' '}
          <Hyperlink href={NOTION_FORM_URL} isExternal>
            remplir ce formulaire sur Notion
          </Hyperlink>
          .
        </p>
        <h2>S’abonner au podcast</h2>
      </Prose>
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
      <iframe
        height="450"
        width="100%"
        title="Lecteur multimédia"
        src="https://embed.podcasts.apple.com/fr/podcast/le-cross-platform-show/id1790867559?l=fr-FR&amp;itscg=30200&amp;itsct=podcast_box_player&amp;ls=1&amp;mttnsubad=1790867559&amp;theme=auto"
        id="embedPlayer"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        allow="autoplay *; encrypted-media *; clipboard-write"
        style={{
          backgroundColor: '#eaeaec',
          border: '0px',
          borderRadius: '12px',
          height: '450px',
          maxWidth: '660px',
          width: '100%',
        }}
      />
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

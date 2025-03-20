import { LinkButton, Prose } from '@weshipit/ui';
import { Layout } from '../components/layout';

export default function Podcast() {
  return (
    <Layout
      seoTitle="Le Cross Platform Show, le podcast francophone React Native animé par David Leuliette"
      seoDescription="Interviews de développeurs React Native, discussions sur les dernières tendances et conseils pratiques pour améliorer vos compétences en développement cross-platform."
      withHeader
      callToActionLink={{
        name: 'Participer au podcast',
        href: 'https://flexbox.notion.site/17af478bcb8c8018b4a9db6b13d1df38?pvs=105',
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
        <p>S’abonner au podcast :</p>
      </Prose>
      <div className="flex mt-4 mb-12 gap-x-3 flex-wrap">
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
          border: '0px',
          borderRadius: '12px',
          height: '450px',
          maxWidth: '660px',
          width: '100%',
        }}
      ></iframe>
    </Layout>
  );
}

import { LinkButton, Prose } from '@weshipit/ui';
import { Layout } from '../components/layout';

export default function Podcast() {
  return (
    <Layout
      seoTitle={
        'Le Cross Platform Show, le podcast sur React Native animé par David Leuliette'
      }
      seoDescription={''}
      withAccessoryRight={
        <LinkButton size="lg" href="/">
          Work with us
        </LinkButton>
      }
    >
      <Prose className="m-auto my-16">
        <h1>Le Cross Platform Show</h1>
        <p>
          Le podcast francophone incontournable pour les développeurs
          cross-platform, explorant React Native et bien plus, tout en apportant
          une touche de joie et de passion au quotidien des coders.
        </p>
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
      </Prose>
    </Layout>
  );
}

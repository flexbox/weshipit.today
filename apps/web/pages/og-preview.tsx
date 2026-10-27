import type { GetStaticProps } from 'next';
import {
  buildOgImagePath,
  buildPodcastOgImagePath,
} from '../utils/og/og-image-path';

// Dev-only contact sheet of OG images: open /og-preview after touching
// pages/api/og.tsx or pages/api/podcast-og.tsx and eyeball every edge case.
export const getStaticProps: GetStaticProps = async () =>
  process.env.NODE_ENV === 'production' ? { notFound: true } : { props: {} };

const samples = [
  {
    label: 'Short title',
    src: buildOgImagePath({
      kicker: 'Free tool',
      path: '/devtools',
      title: 'React Native Developer Tools',
    }),
  },
  {
    label: 'Long French title + subline',
    src: buildOgImagePath({
      kicker: 'Agence React Native',
      lang: 'fr',
      path: '/bonjour',
      subline: 'Experts React Native · 5k/mois · ship tous les jours',
      title: 'Ton app React Native ralentit ? On la fixe.',
    }),
  },
  {
    label: 'Very long title, special characters',
    src: buildOgImagePath({
      kicker: 'React Native glossary',
      path: '/react-native-glossary/a-very-long-glossary-entry-uid',
      title:
        'R&D on C++ TurboModules: 100% #native performance with JSI, Hermes and the New Architecture',
    }),
  },
  {
    label: 'No kicker, no subline',
    src: buildOgImagePath({ title: 'weshipit.today' }),
  },
  {
    label: 'Podcast episode',
    src: buildPodcastOgImagePath({
      episode: 1,
      guest: 'Doctolib',
      title: 'Doctolib',
      type: 'podcast',
    }),
  },
  {
    label: 'Podcast transcript',
    src: buildPodcastOgImagePath({
      episode: 1,
      guest: 'Doctolib',
      title: 'Doctolib',
      type: 'transcript',
    }),
  },
];

export default function OgPreviewPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-10 p-8 md:grid-cols-2">
      {samples.map(({ label, src }) => (
        <figure key={label}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={label}
            width={1200}
            height={630}
            className="h-auto w-full rounded-lg shadow"
          />
          <figcaption className="mt-2 font-mono text-sm text-gray-500">
            {label}
          </figcaption>
        </figure>
      ))}
    </main>
  );
}

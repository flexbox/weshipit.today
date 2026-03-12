import { Button, Hyperlink, LinkButton, Prose, Text } from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { PodcastEpisodeCard } from '../../components/podcast-episode-card';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';
import { linksApi } from 'apps/weshipit/pages/api/links';
import { useState } from 'react';
import Head from 'next/head';

const FAQ_ITEMS = [
  {
    question: "React Native est-il adapté pour une app à 1M d'utilisateurs ?",
    answer:
      "Oui, des apps comme Alan, Cdiscount et Swan gèrent des millions d'utilisateurs avec React Native. Découvrez leurs architectures dans nos épisodes.",
  },
  {
    question: 'Combien coûte réellement une app React Native sur 3 ans ?',
    answer:
      'Entre 200K€ et 800K€ selon la complexité. Nos interviews de CTO décortiquent les coûts cachés et optimisations.',
  },
  {
    question: 'Comment éviter la dette technique React Native ?',
    answer:
      'Architecture modulaire, tests automatisés, code reviews strictes. Nos épisodes avec Alan et Swan détaillent leurs stratégies.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
};

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
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Podcast React Native : Scale ton Équipe & Livre 40% Plus Vite"
        seoDescription="Le podcast React Native pour CTO : évite la dette technique, scale ton équipe de 2 à 15 devs, réduis ton time-to-market. Retours d'expérience Alan, Cdiscount, Swan."
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
            <div className="">
              <Prose>
                <h1>Le Cross Platform Show Podcast</h1>
                <p>
                  Le podcast React Native pour CTO qui veulent éviter 300K€ de
                  dette technique, scaler leur équipe et livrer 40% plus vite.
                  Retours d'expérience d'Alan, Cdiscount, Swan qui gèrent des
                  millions d'utilisateurs.
                </p>

                <h2>Pourquoi écouter le podcast ?</h2>
                <ul>
                  <li>
                    Décortique des apps real-world (pas des tutos théoriques)
                  </li>
                  <li>
                    Interview les devs qui codent les apps que tu utilises
                  </li>
                  <li>
                    Prends les bonnes décisions d'architecture, évite les
                    erreurs, les optimisations de production
                  </li>
                  <li>Réduire ton time-to-market de 40%</li>
                </ul>
                <h2>Abonne-toi sur ta plateforme préférée</h2>
              </Prose>
              <div className="flex gap-3 mt-4">
                <LinkButton
                  variant="spotify"
                  size="xl"
                  isExternalLink
                  withExternalLinkIcon
                  href={SPOTIFY_URL}
                >
                  Spotify
                </LinkButton>
                <LinkButton
                  variant="apple"
                  size="xl"
                  isExternalLink
                  withExternalLinkIcon
                  href={APPLE_PODCAST_URL}
                >
                  Apple Podcast
                </LinkButton>
                <LinkButton
                  variant="youtube"
                  size="xl"
                  isExternalLink
                  withExternalLinkIcon
                  href={YOUTUBE_URL}
                >
                  YouTube
                </LinkButton>
              </div>
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
            <Button
              variant="outline"
              size="xl"
              onClick={() => setShowAll(true)}
            >
              Voir tous les épisodes
            </Button>
          </div>
        )}

        <div className="mt-16 mb-12">
          <Prose>
            <h2>Questions fréquentes</h2>
          </Prose>
          <dl className="mt-6 divide-y divide-gray-200 dark:divide-gray-800">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <div key={question} className="py-6">
                <dt className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {question}
                </dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 py-6 mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-400">
          <span>Aussi disponible sur</span>
          <Hyperlink
            href={DEEZER_URL}
            isExternal
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            Deezer
          </Hyperlink>
          <span>·</span>
          <Hyperlink
            href={RSS_URL}
            isExternal
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            RSS
          </Hyperlink>
          <span>·</span>
          <Hyperlink
            href="https://x.com/intent/follow?screen_name=flexbox_"
            isExternal
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            Twitter
          </Hyperlink>
          <span>·</span>
          <Hyperlink
            href="https://bsky.app/profile/flexbox.bsky.social"
            isExternal
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            Bluesky
          </Hyperlink>
          <span>·</span>
          <Hyperlink
            href="https://www.linkedin.com/in/david-leuliette/"
            isExternal
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            LinkedIn
          </Hyperlink>
          <span>·</span>
          <Hyperlink
            href="https://join.slack.com/t/reactnativeconnection/shared_invite/zt-1j5jigyph-MJURqXxpWHXTcYSH8PwhrQ"
            isExternal
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            Slack React Native Connection
          </Hyperlink>
          <span>·</span>
          <Hyperlink
            href="https://github.com/sponsors/flexbox"
            isExternal
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            Soutenir sur GitHub
          </Hyperlink>
        </div>
      </Layout>
    </>
  );
}

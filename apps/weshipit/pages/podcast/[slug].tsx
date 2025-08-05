import { useRouter } from 'next/router';
import { Hyperlink, Button } from '@weshipit/ui';
import { Layout } from '../../components/layout';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';

export default function PodcastEpisodePage() {
  const router = useRouter();
  const { slug } = router.query;

  const episode = podcastEpisodes.find((ep) => ep.slug === slug);

  if (!episode) {
    return (
      <Layout
        seoTitle="Épisode non trouvé"
        seoDescription="L'épisode que vous recherchez n'existe pas."
        withHeader
        withContainer
      >
        <div className="mt-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Épisode non trouvé</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            L'épisode que vous recherchez n'existe pas.
          </p>
          <Hyperlink
            href="/podcast"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Retour aux épisodes
          </Hyperlink>
        </div>
      </Layout>
    );
  }

  const currentIndex = podcastEpisodes.findIndex((ep) => ep.slug === slug);
  const previousEpisode =
    currentIndex > 0 ? podcastEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < podcastEpisodes.length - 1
      ? podcastEpisodes[currentIndex + 1]
      : null;

  return (
    <Layout
      seoTitle={`Épisode ${episode.number} - ${episode.name} avec ${episode.guestName}`}
      seoDescription={episode.description}
      withHeader
      withContainer
    >
      <div className="mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Hyperlink
              href="/podcast"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour aux épisodes
            </Hyperlink>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              <div className="flex-shrink-0 mb-6 lg:mb-0">
                <img
                  src={episode.companyLogo}
                  alt={`Logo ${episode.name}`}
                  className="w-24 h-24 rounded-xl object-cover shadow-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Épisode {episode.number}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Podcast
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                  {episode.name}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
                  avec{' '}
                  <span className="font-semibold">{episode.guestName}</span>
                </p>
                <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                  {episode.description}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Écouter l'épisode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                href={episode.spotifyLink}
                isExternalLink={true}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Écouter sur Spotify
              </Button>

              <Button
                href={episode.appleLink}
                isExternalLink={true}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Écouter sur Apple Podcast
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              {previousEpisode ? (
                <Hyperlink
                  href={`/podcast/${previousEpisode.slug}`}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Épisode précédent
                    </div>
                    <div className="font-medium">
                      Épisode {previousEpisode.number} - {previousEpisode.title}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      avec {previousEpisode.guestName}
                    </div>
                  </div>
                </Hyperlink>
              ) : (
                <Hyperlink
                  href="/podcast"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Retour à tous les épisodes
                </Hyperlink>
              )}
            </div>

            {nextEpisode && (
              <Hyperlink
                href={`/podcast/${nextEpisode.slug}`}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                <div className="text-right">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Épisode suivant
                  </div>
                  <div className="font-medium">
                    Épisode {nextEpisode.number} - {nextEpisode.title}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    avec {nextEpisode.guestName}
                  </div>
                </div>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Hyperlink>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

import NextHead, { NextHeadProps, PodcastOgImageData } from './next-head';
import { PageShell, PageShellProps } from './page-shell';

interface LayoutProps extends NextHeadProps, PageShellProps {
  ogImagePodcast?: PodcastOgImageData;
}

/**
 * Pages Router only: the page shell plus its SEO tags. App Router pages use
 * `<PageShell>` and export `metadata` (see utils/seo/metadata.ts). This
 * component goes away with the last page in `pages/`.
 */
export function Layout({
  locale,
  noindex,
  ogImageAlt,
  ogImageKicker,
  ogImagePodcast,
  ogImageSubline,
  ogImageTitle,
  seoDescription,
  seoTitle,
  ...shell
}: LayoutProps) {
  return (
    <>
      <NextHead
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        ogImageTitle={ogImageTitle}
        ogImageKicker={ogImageKicker}
        ogImageSubline={ogImageSubline}
        ogImageAlt={ogImageAlt}
        ogImagePodcast={ogImagePodcast}
        locale={locale}
        noindex={noindex}
      />
      <PageShell {...shell} />
    </>
  );
}

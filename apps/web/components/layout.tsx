import { Footer, Header, HeaderLinksProps } from '@weshipit/ui';
import NextHead, { NextHeadProps, PodcastOgImageData } from './next-head';
import BannerProductHunt from '../components/banner-product-hunt/banner-product-hunt';

interface LayoutProps extends NextHeadProps {
  withHeader?: boolean;
  withFooter?: boolean;
  withContainer?: boolean;
  children: React.ReactNode;
  withProductHunt?: boolean;
  navigation?: HeaderLinksProps[];
  callToActionLink?: HeaderLinksProps;
  ogImagePodcast?: PodcastOgImageData;
  callToActionButton?: HeaderLinksProps;
}

export function Layout({
  callToActionButton,
  callToActionLink,
  children,
  locale,
  navigation,
  noindex,
  ogImageAlt,
  ogImageKicker,
  ogImagePodcast,
  ogImageSubline,
  ogImageTitle,
  seoDescription,
  seoTitle,
  withContainer = false,
  withFooter = false,
  withHeader = false,
  withProductHunt = false,
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
      <div className="flex min-h-screen flex-col justify-between">
        {withProductHunt && <BannerProductHunt />}
        {withHeader && (
          <Header
            navigation={navigation}
            callToActionButton={callToActionButton}
            callToActionLink={callToActionLink}
          />
        )}

        <main id="main-content" className="mb-auto">
          {withContainer ? (
            <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
          ) : (
            children
          )}
        </main>
        {withFooter && <Footer />}
      </div>
    </>
  );
}

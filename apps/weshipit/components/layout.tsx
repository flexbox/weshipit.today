import { Footer, Header, HeaderLinksProps } from '@weshipit/ui';
import NextHead, { NextHeadProps } from './next-head';
import BannerProductHunt from '../components/banner-product-hunt/banner-product-hunt';

interface LayoutProps extends NextHeadProps {
  withHeader?: boolean;
  navigation?: HeaderLinksProps[];
  callToActionButton?: HeaderLinksProps;
  callToActionLink?: HeaderLinksProps;
  withFooter?: boolean;
  withContainer?: boolean;
  children: React.ReactNode;
  withProductHunt?: boolean;
}

export function Layout({
  children,
  ogImageTitle,
  seoDescription,
  seoTitle,
  withHeader = false,
  callToActionButton,
  callToActionLink,
  withContainer = false,
  withFooter = false,
  navigation,
  withProductHunt = false,
}: LayoutProps) {
  return (
    <>
      <NextHead
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        ogImageTitle={ogImageTitle}
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

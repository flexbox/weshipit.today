import { Footer, Header } from '@weshipit/ui';
import NextHead, { NextHeadProps } from './next-head';
import BannerProductHunt from '../components/banner-product-hunt/banner-product-hunt';

interface LayoutProps extends NextHeadProps {
  withHeader?: boolean;
  withFooter?: boolean;
  withContainer?: boolean;
  children: React.ReactNode;
  withProductHunt?: boolean;
  withAccessoryRight?: React.ReactNode;
}

export function Layout({
  children,
  ogImageTitle,
  seoDescription,
  seoTitle,
  withAccessoryRight,
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
      />
      <div className="flex min-h-screen flex-col justify-between">
        {withProductHunt && <BannerProductHunt />}
        {withHeader && <Header />}
        {withAccessoryRight && (
          <Header withAccessoryRight accessoryRight={withAccessoryRight} />
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

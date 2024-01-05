import { Footer, Header } from '@weshipit/ui';
import NextHead, { NextHeadProps } from './next-head';
import BannerProductHunt from '../components/banner-product-hunt/banner-product-hunt';

interface LayoutProps extends NextHeadProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
  withProductHunt?: boolean;
  withContainer?: boolean;
  withAccessoryRight?: React.ReactNode;
}

export function Layout({
  children,
  withHeader = false,
  withFooter = false,
  withContainer = false,
  withProductHunt = false,
  withAccessoryRight,
  seoTitle,
  seoDescription,
  ogImageTitle,
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

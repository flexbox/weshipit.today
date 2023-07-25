import { Footer, Header } from '@weshipit/ui';
import NextHead, { NextHeadProps } from './next-head';

interface LayoutProps extends NextHeadProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
  withContainer?: boolean;
  withAccessoryRight?: React.ReactNode;
}

export function Layout({
  children,
  withHeader = false,
  withFooter = false,
  withContainer = false,
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
      <div className="min-h-full bg-gray-100 dark:bg-black">
        {withHeader && <Header />}
        {withAccessoryRight && (
          <Header withAccessoryRight accessoryRight={withAccessoryRight} />
        )}

        <main id="main-content">
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

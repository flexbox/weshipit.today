import { Footer, Header } from '@weshipit/ui';
import NextHead from './next-head';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
  withContainer?: boolean;
  withAccessoryRight?: React.ReactNode;
  ogImageTitle?: string;
}

export function Layout({
  children,
  withHeader = false,
  withFooter = false,
  withContainer = false,
  withAccessoryRight,
  ogImageTitle,
}: LayoutProps) {
  return (
    <>
      <NextHead ogImageTitle={ogImageTitle} />
      <div className="min-h-full bg-gray-100">
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

export default Layout;

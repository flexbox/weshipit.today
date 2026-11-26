import { Footer } from '@weshipit/ui/footer/footer';
import { Header, HeaderLinksProps } from '@weshipit/ui/header/header';
import BannerProductHunt from './banner-product-hunt/banner-product-hunt';

export interface PageShellProps {
  withHeader?: boolean;
  withFooter?: boolean;
  withContainer?: boolean;
  children: React.ReactNode;
  withProductHunt?: boolean;
  navigation?: HeaderLinksProps[];
  callToActionLink?: HeaderLinksProps;
  callToActionButton?: HeaderLinksProps;
}

/**
 * Banner, header, main and footer around a page. No SEO: App Router pages
 * export `metadata` instead, and Pages Router pages go through `<Layout>`,
 * which adds `<NextHead>` around this shell.
 */
export function PageShell({
  callToActionButton,
  callToActionLink,
  children,
  navigation,
  withContainer = false,
  withFooter = false,
  withHeader = false,
  withProductHunt = false,
}: PageShellProps) {
  return (
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
  );
}

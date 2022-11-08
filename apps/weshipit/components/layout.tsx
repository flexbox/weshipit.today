import { Header } from '@weshipit/ui';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withContainer?: boolean;
  withHeaderButton?: boolean;
  headerButtonHref?: string;
}

export function Layout({
  children,
  withHeader = false,
  withContainer = false,
  withHeaderButton = false,
  headerButtonHref = '',
}: LayoutProps) {
  return (
    <div className="h-full bg-gray-100">
      {withHeader && <Header />}
      {withHeaderButton && (
        <Header
          withButton
          buttonHref={headerButtonHref}
          buttonText="Add a new API"
        />
      )}
      {withContainer ? (
        <div className="mx-auto max-w-6xl">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

export default Layout;

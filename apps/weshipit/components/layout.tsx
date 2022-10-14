import { Header } from '@weshipit/ui';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withContainer?: boolean;
}

export function Layout({
  children,
  withHeader = false,
  withContainer = false,
}: LayoutProps) {
  return (
    <div className="h-screen bg-gray-100">
      {withHeader && <Header />}
      {withContainer ? (
        <div className="mx-auto max-w-6xl">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

export default Layout;

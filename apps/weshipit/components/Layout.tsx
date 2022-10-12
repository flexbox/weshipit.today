import { Header } from '@weshipit/ui';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
}

export function Layout({ children, withHeader }: LayoutProps) {
  return (
    <div className="h-screen bg-gray-100 lg:relative">
      {withHeader && <Header />}
      <div className="mx-auto w-full px-32 ">{children}</div>
    </div>
  );
}

export default Layout;

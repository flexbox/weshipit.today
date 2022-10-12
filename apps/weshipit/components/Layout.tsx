import { Header } from '@weshipit/ui';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
}

export function Layout({ children, withHeader }: LayoutProps) {
  return (
    <div className="h-screen bg-gray-100 lg:relative">
      {withHeader && <Header />}
      <div className="mx-auto w-full px-32 pb-8 text-center lg:py-32 lg:text-left">
        {children}
      </div>
    </div>
  );
}

export default Layout;

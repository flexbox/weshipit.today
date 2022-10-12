import { Header } from '@weshipit/ui';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
}

export function Layout({ children, withHeader }: LayoutProps) {
  return (
    <div className="h-screen bg-gray-100">
      {withHeader && <Header />}
      {children}
    </div>
  );
}

export default Layout;

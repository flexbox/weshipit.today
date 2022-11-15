import { Header } from '@weshipit/ui';
import { Inter } from '@next/font/google';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withContainer?: boolean;
  withAccessoryRight?: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export function Layout({
  children,
  withHeader = false,
  withContainer = false,
  withAccessoryRight,
}: LayoutProps) {
  return (
    <div className="h-full bg-gray-100">
      {withHeader && <Header />}
      {withAccessoryRight && (
        <Header withAccessoryRight accessoryRight={withAccessoryRight} />
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

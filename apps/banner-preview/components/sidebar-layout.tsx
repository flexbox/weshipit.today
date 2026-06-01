import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PaintBrushIcon, EyeIcon } from '@heroicons/react/24/outline';

interface SidebarLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  {
    label: 'Create',
    href: '/',
    icon: PaintBrushIcon,
  },
  {
    label: 'Preview',
    href: '/preview',
    icon: EyeIcon,
  },
];

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-white px-4 py-6 md:flex">
        <Link
          href="/"
          className="mb-8 px-2 text-base font-semibold tracking-tight text-foreground"
        >
          Banner Preview
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? router.pathname === '/'
                : router.pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <nav className="flex gap-1 border-b border-border bg-white px-4 py-2 md:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? router.pathname === '/'
                : router.pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

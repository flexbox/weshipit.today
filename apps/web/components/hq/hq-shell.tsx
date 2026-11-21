import Link from 'next/link';
import type { ReactNode } from 'react';
import { Layout } from '../layout';

const NAV = [
  { href: '/hq', label: 'Magnets' },
  { href: '/hq/leads', label: 'Leads' },
  { href: '/hq/magnets/new', label: 'Nouveau magnet' },
];

/** Frame for the private /hq pages: noindex, a small nav, sign out. */
export function HqShell({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Layout
      seoTitle={`${title} · HQ`}
      seoDescription="HQ"
      noindex
      withContainer
    >
      <div className="py-8">
        <nav className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="font-semibold text-slate-900 dark:text-white">
            HQ
          </span>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <form method="post" action="/api/hq/logout" className="ml-auto">
            <button
              type="submit"
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Se déconnecter
            </button>
          </form>
        </nav>
        <h1 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h1>
        {children}
      </div>
    </Layout>
  );
}

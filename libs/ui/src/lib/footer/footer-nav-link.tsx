'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Internal footer link, highlighted on the page it points to.
 *
 * It is the only part of the footer that needs the browser (to read the
 * current path), so it is the only part shipped as a client component.
 * `usePathname` works in both the Pages Router and the App Router.
 */
export function FooterNavLink({ href, name }: { name: string; href: string }) {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? 'text-base text-slate-900 dark:text-white'
          : 'text-base text-slate-400 hover:text-slate-900 dark:hover:text-white'
      }
    >
      {name}
    </Link>
  );
}

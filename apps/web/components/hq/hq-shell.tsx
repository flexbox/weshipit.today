import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import {
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  PlusIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Text } from '@weshipit/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ComponentType, type ReactNode, useState } from 'react';
import NextHead from '../next-head';

const itemClass =
  'relative flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm font-medium text-slate-900 hover:bg-slate-950/5 dark:text-white dark:hover:bg-white/5';

function NavItem({
  current = false,
  href,
  icon: Icon,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  current?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={current ? 'page' : undefined}
      className={itemClass}
    >
      {current && (
        <span className="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-slate-950 dark:bg-white" />
      )}
      <Icon
        className={`size-5 shrink-0 ${current ? 'fill-slate-950 dark:fill-white' : 'fill-slate-500 dark:fill-slate-400'}`}
      />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname, query } = useRouter();
  const isNewMagnet = pathname === '/hq/magnets/[id]' && query.id === 'new';
  const isDashboard =
    pathname === '/hq' || (pathname === '/hq/magnets/[id]' && !isNewMagnet);

  return (
    <nav className="flex h-full min-h-0 flex-col">
      <div className="border-b border-slate-950/5 p-4 dark:border-white/5">
        <Link href="/hq" onClick={onNavigate} className={itemClass}>
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-blue-600 text-xs font-semibold text-white">
            W
          </span>
          <span className="truncate">weshipit HQ</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-4">
        <NavItem
          href="/hq"
          label="Tableau de bord"
          icon={HomeIcon}
          current={isDashboard}
          onNavigate={onNavigate}
        />
        <NavItem
          href="/hq/leads"
          label="Leads"
          icon={UsersIcon}
          current={pathname === '/hq/leads'}
          onNavigate={onNavigate}
        />
        <NavItem
          href="/hq/magnets/new"
          label="Nouveau magnet"
          icon={PlusIcon}
          current={isNewMagnet}
          onNavigate={onNavigate}
        />
        <div aria-hidden="true" className="mt-8 flex-1" />
      </div>
      <div className="border-t border-slate-950/5 p-4 dark:border-white/5">
        <form method="post" action="/api/hq/logout">
          <button type="submit" className={itemClass}>
            <ArrowRightStartOnRectangleIcon className="size-5 shrink-0 fill-slate-500 dark:fill-slate-400" />
            <span className="truncate">Se déconnecter</span>
          </button>
        </form>
      </div>
    </nav>
  );
}

/**
 * Frame for the private /hq pages, after Catalyst's sidebar layout: a fixed
 * sidebar on desktop, a drawer on mobile, noindex on every page.
 */
export function HqShell({
  actions,
  children,
  title,
}: {
  title: string;
  /** Buttons shown to the right of the page title. */
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <NextHead seoTitle={`${title} · HQ`} seoDescription="HQ" noindex />
      <div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-slate-100 dark:bg-slate-900 dark:lg:bg-slate-950">
        <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
          <SidebarNav />
        </div>

        <Dialog open={menuOpen} onClose={closeMenu} className="lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/30 transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />
          <DialogPanel
            transition
            className="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex h-full flex-col rounded-lg bg-white shadow-xs ring-1 ring-slate-950/5 dark:bg-slate-900 dark:ring-white/10">
              <div className="-mb-3 px-4 pt-3">
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Fermer le menu"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-950/5 dark:text-slate-400 dark:hover:bg-white/5"
                >
                  <XMarkIcon className="size-5" />
                </button>
              </div>
              <SidebarNav onNavigate={closeMenu} />
            </div>
          </DialogPanel>
        </Dialog>

        <header className="flex items-center gap-2 px-4 py-2.5 lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-950/5 dark:text-slate-400 dark:hover:bg-white/5"
          >
            <Bars3Icon className="size-6" />
          </button>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            HQ
          </span>
        </header>

        <main className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64">
          <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-slate-950/5 dark:lg:bg-slate-900 dark:lg:ring-white/10">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <Text as="h1" variant="h5">
                  {title}
                </Text>
                {actions && (
                  <div className="flex items-center gap-3">{actions}</div>
                )}
              </div>
              <div className="mt-8">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

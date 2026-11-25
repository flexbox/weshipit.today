'use client';

import { lazy, PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import LinkButton from '../button/link-button';
import { HeaderLogo } from './header-logo';

export interface HeaderLinksProps {
  href: string;
  name: string;
  isExternalLink?: boolean;
}

interface HeaderProps extends PropsWithChildren {
  navigation?: HeaderLinksProps[];
  callToActionButton?: HeaderLinksProps;
  callToActionLink?: HeaderLinksProps;
}

const loadMobileMenu = () => import('./mobile-menu');
const MobileMenu = lazy(loadMobileMenu);

// Same breakpoint as the `lg:hidden` on the hamburger button.
const HAMBURGER_QUERY = '(max-width: 1023px)';

/**
 * Fetches the menu once the page is idle on screens that show the hamburger,
 * so the first tap opens it without waiting on the network.
 */
function usePreloadMobileMenu() {
  useEffect(() => {
    if (!window.matchMedia(HAMBURGER_QUERY).matches) return;

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(loadMobileMenu);
      return () => window.cancelIdleCallback(id);
    }
    // Safari has no requestIdleCallback.
    const id = window.setTimeout(loadMobileMenu, 1500);
    return () => window.clearTimeout(id);
  }, []);
}

export function Header({
  navigation,
  callToActionButton,
  callToActionLink,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuRequested, setMobileMenuRequested] = useState(false);
  usePreloadMobileMenu();

  const openMobileMenu = () => {
    setMobileMenuRequested(true);
    setMobileMenuOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <HeaderLogo />
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation?.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-6">
          {callToActionLink && (
            <LinkButton
              href={callToActionLink.href}
              className="hidden lg:block"
              variant="outline"
              size="xl"
              isExternalLink={callToActionLink.isExternalLink}
            >
              {callToActionLink.name}
            </LinkButton>
          )}
          {callToActionButton && (
            <LinkButton
              href={callToActionButton.href}
              variant="primary"
              size="xl"
              className="hidden lg:block"
              isExternalLink={callToActionButton.isExternalLink}
            >
              {callToActionButton.name}
            </LinkButton>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={openMobileMenu}
            onPointerEnter={loadMobileMenu}
            onFocus={loadMobileMenu}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      {/* Mounted on the first open, then kept so the dialog can give focus
          back to the button when it closes. */}
      {mobileMenuRequested && (
        <Suspense fallback={null}>
          <MobileMenu
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            navigation={navigation}
            callToActionButton={callToActionButton}
            callToActionLink={callToActionLink}
          />
        </Suspense>
      )}
    </header>
  );
}

export default Header;

import Link from 'next/link';
import { PropsWithChildren } from 'react';

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

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LinkButton from '../button/link-button';

export function Header({
  navigation,
  callToActionButton,
  callToActionLink,
}: HeaderProps) {
  console.log('🚀 ~ navigation:', navigation);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-900">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 text-lg font-bold leading-6 dark:text-white"
          >
            weshipit<span className="text-slate-400">.today</span>
          </Link>
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
        <div className="flex flex-1 items-center justify-end gap-x-6">
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
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <a
              href="#"
              className="-m-1.5 p-1.5 text-lg font-bold leading-6 dark:text-white"
            >
              weshipit<span className="text-slate-400">.today</span>
            </a>
            {callToActionButton && (
              <LinkButton
                href={callToActionButton.href}
                className="ml-auto "
                variant="primary"
              >
                {callToActionButton.name}
              </LinkButton>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation?.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {callToActionLink && (
                  <Link
                    href={callToActionLink.href}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {callToActionLink.name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;

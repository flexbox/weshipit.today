import Link from 'next/link';
import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import LinkButton from '../button/link-button';
import type { HeaderLinksProps } from './header';
import { HeaderLogo } from './header-logo';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navigation?: HeaderLinksProps[];
  callToActionButton?: HeaderLinksProps;
  callToActionLink?: HeaderLinksProps;
}

/**
 * The full-screen menu behind the hamburger button. `Header` loads this file
 * on demand: the dialog (focus trap, scroll lock, portal) is the heaviest part
 * of the header and desktop visitors never open it.
 */
export default function MobileMenu({
  callToActionButton,
  callToActionLink,
  navigation,
  onClose,
  open,
}: MobileMenuProps) {
  return (
    <Dialog open={open} onClose={onClose} className="lg:hidden">
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto [-webkit-overflow-scrolling:touch] bg-white dark:bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center gap-x-6">
          <HeaderLogo />
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
            onClick={onClose}
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
                  onClick={onClose}
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
                  onClick={onClose}
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
  );
}

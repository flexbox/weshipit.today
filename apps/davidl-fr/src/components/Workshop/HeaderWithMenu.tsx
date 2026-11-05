import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Gravatar from 'react-gravatar';
import { User } from '~/types/user';
import { UserContext } from '~/lib/UserContext';
import Stats from '~/components/Workshop/Stats';

interface HeaderLinksProps extends User {
  isMobile?: boolean;
}

const linkLayout = {
  desktop: 'inline-flex items-center border-b-4 px-1 pt-1 text-sm font-medium',
  mobile:
    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800',
};
const activeLink =
  'border-blue-500 text-gray-900 dark:border-orange-500 dark:text-white';
const inactiveLink =
  'border-transparent text-gray-500 hover:border-gray-700 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white';

const loginStyle =
  'relative inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-blue-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

const HeaderLinks = ({ isMobile = false, user }: HeaderLinksProps) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const linkProps = (isActive: boolean) => ({
    'aria-current': isActive ? ('page' as const) : undefined,
    className: `${isMobile ? linkLayout.mobile : linkLayout.desktop} ${
      isActive ? activeLink : inactiveLink
    }`,
  });

  if (!user) {
    return (
      <Link href="/road-to-react-native" {...linkProps(false)}>
        The Road to React Native
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/workshop"
        {...linkProps(
          currentRoute === '/workshop' ||
            currentRoute === '/workshop/challenges/[id]',
        )}
      >
        Challenges
      </Link>
      <Link
        href="/workshop/snippets"
        {...linkProps(currentRoute === '/workshop/snippets')}
      >
        Snippets
      </Link>
    </>
  );
};

export function HeaderWithMenu({ user }: User) {
  // Until Supabase has read the stored session, the visitor is neither signed
  // in nor signed out: show no links rather than the wrong ones.
  const { loaded } = useContext(UserContext);
  const isSignedOut = loaded && !user;
  const hasMenu = Boolean(user) || isSignedOut;

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 z-40 w-full bg-white shadow dark:bg-gray-900"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-12 justify-between">
              <div className="flex">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {hasMenu && <HeaderLinks user={user} />}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {user && (
                  <>
                    <Stats />
                    <div className="relative ml-3 shrink-0">
                      <Link
                        href="/workshop/profile"
                        className="flex rounded-full text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        <Gravatar
                          className="size-8 rounded-full"
                          email={user.email}
                          alt="Your Profile"
                        />
                      </Link>
                    </div>
                  </>
                )}
                {isSignedOut && (
                  <div className="shrink-0">
                    <Link href="/workshop/login" className={loginStyle}>
                      Log in
                    </Link>
                  </div>
                )}
              </div>
              {hasMenu && (
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
                    <span className="sr-only">Main menu</span>
                    {open ? (
                      <XMarkIcon className="block size-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block size-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </div>

          {hasMenu && (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <HeaderLinks user={user} isMobile />
              </div>
              {user ? (
                <div className="pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="shrink-0">
                      <Gravatar
                        className="size-10 rounded-full"
                        email={user.email}
                        alt=""
                      />
                    </div>
                    <div className="ml-3 min-w-0">
                      <div className="break-words text-sm font-medium text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      href="/workshop/profile"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                      Your Profile
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="px-4 pb-4">
                  <Link
                    href="/workshop/login"
                    className={`${loginStyle} w-full justify-center`}
                  >
                    Log in
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}

import { useRouter } from 'next/router';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Gravatar from 'react-gravatar';
import { User } from '~/types/user';
import Stats from '~/components/Workshop/Stats';

const HeaderLinks = ({ user }: User) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const style =
    'border-transparent text-gray-400 font-medium hover:border-gray-700 dark:hover:text-white hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium';
  const isActiveStyle = `${style} !border-blue-500 text-gray-900 dark:text-white dark:!border-orange-500`;
  return (
    <>
      {user ? (
        <>
          <Link
            href="/workshop"
            className={
              currentRoute === '/workshop' ||
              currentRoute === '/workshop/challenges/[id]'
                ? isActiveStyle
                : style
            }
          >
            Challenges
          </Link>
          <Link
            href="/workshop/snippets"
            className={
              currentRoute === '/workshop/snippets' ? isActiveStyle : style
            }
          >
            Snippets
          </Link>
        </>
      ) : (
        <>
          <a className={style}>Challenges</a>
          <Link href="/road-to-react-native" className={style}>
            The Road to React Native
          </Link>
        </>
      )}
    </>
  );
};

export function HeaderWithMenu({ user }: User) {
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
                  <HeaderLinks user={user} />
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                {user ? (
                  <>
                    <Stats />
                    <div className="relative ml-3">
                      <Link
                        href="/workshop/profile"
                        className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <Gravatar
                          className="size-8 rounded-full"
                          email={user.email}
                        />
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="shrink-0">
                    <Link
                      href="/workshop/login"
                      className="relative inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block size-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block size-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {user && (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <HeaderLinks user={user} />
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="shrink-0">
                    <Gravatar
                      className="size-10 rounded-full"
                      email={user.email}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    href="/workshop/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Your Profile
                  </Link>
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}

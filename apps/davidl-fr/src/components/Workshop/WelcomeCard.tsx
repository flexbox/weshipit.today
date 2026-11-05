import React, { useState, useSyncExternalStore } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { NativeLink } from '~/components/Link/NativeLink';
import { navigation } from '~/components/Workshop/Footer';

const DISMISSED_KEY = 'welcome-card-dismissed';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

const getDismissed = () => localStorage.getItem(DISMISSED_KEY) === 'true';
// Hidden during server render, localStorage is only read in the browser.
const getServerDismissed = () => true;

const linkStyle =
  'flex items-center justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-orange-800 dark:hover:bg-orange-900 dark:focus-visible:outline-black';

export function WelcomeCard() {
  const isStoredDismissed = useSyncExternalStore(
    subscribe,
    getDismissed,
    getServerDismissed,
  );
  const [isDismissed, setIsDismissed] = useState(false);

  if (isStoredDismissed || isDismissed) {
    return null;
  }

  function dismiss() {
    setIsDismissed(true);
    localStorage.setItem(DISMISSED_KEY, 'true');
  }

  return (
    <div className="rounded-lg bg-blue-600 text-white dark:bg-amber-500 dark:text-black">
      <div className="relative mx-auto items-start p-8">
        <div className="flex flex-col items-start text-base md:col-span-4">
          <h2 className="my-2 pe-10 text-xl font-semibold">
            Welcome! Thank you so much for purchasing React Native Bootcamp.
            <br />I know you’ll love it.
          </h2>
          <div className="flex w-full flex-wrap items-center justify-between">
            <div className="my-5 grid w-full grid-flow-row gap-3 sm:w-auto sm:grid-flow-col-dense">
              <div className="rounded-md shadow-xs">
                <NativeLink
                  className={linkStyle}
                  href={navigation.solutions[0].href}
                >
                  🌍 Join the global Slack
                </NativeLink>
              </div>
              <div className="rounded-md shadow-xs">
                <NativeLink
                  className={linkStyle}
                  href={navigation.solutions[1].href}
                >
                  🇫🇷 Join the French Slack
                </NativeLink>
              </div>
            </div>
            <div className="flex items-center">
              <p className="mr-4 text-sm italic text-blue-50 dark:text-gray-800">
                Thanks, David
              </p>
              <img
                src="/images/David-Leuliette-black-low-res.png"
                alt=""
                width="90"
              />
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-4">
          <button
            onClick={dismiss}
            type="button"
            className="flex rounded-md p-2 text-white transition duration-150 ease-in-out hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:text-black dark:hover:bg-orange-500 dark:focus-visible:outline-black"
            aria-label="Dismiss welcome message"
          >
            <XMarkIcon className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

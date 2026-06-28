import React, { useEffect, useState } from 'react';
import { NativeLink } from '~/components/Link/NativeLink';
import { navigation } from '~/components/Workshop/Footer';

interface Props {}

export function WelcomeCard({}: Props) {
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('welcome-card-dismissed') !== 'true') {
      setvisible(true);
    }
  }, []);

  if (!visible) {
    return null;
  }

  function dismiss() {
    setvisible(false);
    localStorage.setItem('welcome-card-dismissed', 'true');
  }

  return (
    <div className="rounded-lg bg-blue-600 text-white dark:bg-amber-500 dark:text-black">
      <div className="relative mx-auto items-start p-8">
        <div className="flex flex-col items-start text-base md:col-span-4">
          <h4 className="my-2 text-xl font-semibold leading-tight">
            Welcome! Thank you so much for purchasing React Native Bootcamp.
            <br />I know you’ll love it.
          </h4>
          <div className="flex w-full flex-wrap items-center justify-between">
            <div className="my-5 grid w-full grid-flow-row gap-3 sm:w-auto sm:grid-flow-col-dense">
              <div className="rounded-md shadow-sm">
                <NativeLink
                  className="flex items-center justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out hover:bg-blue-900 focus:outline-none dark:bg-orange-800 dark:hover:bg-orange-900"
                  href={navigation.solutions[0].href}
                >
                  🌍 Join World Slack
                </NativeLink>
              </div>
              <div className="rounded-md shadow-sm">
                <NativeLink
                  className="flex items-center justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out hover:bg-blue-900 focus:outline-none dark:bg-orange-800 dark:hover:bg-orange-900"
                  href={navigation.solutions[1].href}
                >
                  🇫🇷 Join French Slack
                </NativeLink>
              </div>
            </div>
            <div className="flex items-center">
              <p className="mr-4 text-sm italic text-blue-200 dark:text-gray-800">
                Thanks, David
              </p>
              <img
                src="/images/David-Leuliette-black-low-res.png"
                alt="David's fake signature"
                width="90"
              />
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-4">
          <button
            onClick={dismiss}
            type="button"
            className="flex rounded-md p-2 transition duration-150 ease-in-out hover:bg-blue-500 focus:bg-blue-500 focus:outline-none dark:hover:bg-orange-500 dark:focus:bg-orange-500"
            aria-label="Dismiss"
          >
            <svg
              className="size-6 text-white dark:text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

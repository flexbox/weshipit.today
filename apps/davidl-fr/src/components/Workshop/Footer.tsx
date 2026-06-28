import Link from 'next/link';
import React from 'react';

import { NativeLink } from '~/components/Link/NativeLink';

export const navigation = {
  solutions: [
    {
      name: '🌏 Join global Slack community',
      href: 'https://join.slack.com/t/infiniteredcommunity/shared_invite/zt-1f137np4h-zPTq_CbaRFUOR_glUFs2UA',
      isExternal: true,
    },
    {
      name: '🇫🇷 Join local Slack community',
      href: 'https://join.slack.com/t/reactnativeconnection/shared_invite/zt-1msk6xg0k-5kAkJt_Gc_9BZTDjzzA~ow',
      isExternal: true,
    },
    { name: 'Resources', href: '/workshop/resources' },
    { name: 'Feedback', href: '/workshop/feedback' },
  ],
};

export function Footer() {
  return (
    <footer
      className="bg-white dark:bg-gray-900"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 xl:col-span-2">
          <ul role="list">
            {navigation.solutions.map((item) => (
              <li key={item.name} className="space-y-1">
                {item.isExternal === true ? (
                  <NativeLink
                    href={item.href}
                    className="inline-flex rounded p-2 font-semibold leading-6 text-gray-600 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  >
                    {item.name}
                  </NativeLink>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex rounded p-2 font-semibold leading-6 text-gray-600 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

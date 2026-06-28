import React from 'react';
import { NativeLink } from '~/components/Link/NativeLink';

type userPlatform = 'unknown' | 'MacIntel' | 'Win32' | 'Linux x86_64' | string;

export function Platform() {
  let userPlatform: userPlatform = 'unknown';
  if (typeof window !== 'undefined') {
    userPlatform = navigator.platform;
  }

  if (userPlatform === 'Win32') {
    return (
      <>
        <NativeLink
          href={
            'https://github.com/flexbox/react-native-bootcamp/issues?q=label%3A%22Windows+issues%22+is%3Aclosed'
          }
        >
          <div
            className="relative my-4 rounded border-2 border-blue-400 bg-blue-100 px-4 py-3  text-blue-500 hover:bg-blue-200 dark:border-red-400 dark:bg-orange-100  dark:text-red-700 dark:hover:bg-orange-200"
            role="alert"
          >
            <span className="block sm:inline">
              Are you a Windows user ? We have a troubleshooting section
            </span>
          </div>
        </NativeLink>
      </>
    );
  }

  return null;
}

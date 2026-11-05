import React, { useSyncExternalStore } from 'react';
import { NativeLink } from '~/components/Link/NativeLink';

type userPlatform = 'unknown' | 'MacIntel' | 'Win32' | 'Linux x86_64' | string;

const subscribe = () => () => undefined;
const getPlatform = (): userPlatform => navigator.platform;
// The server cannot know the visitor's platform: render nothing until hydrated.
const getServerPlatform = (): userPlatform => 'unknown';

export function Platform() {
  const userPlatform = useSyncExternalStore(
    subscribe,
    getPlatform,
    getServerPlatform,
  );

  if (userPlatform === 'Win32') {
    return (
      <NativeLink
        href={
          'https://github.com/flexbox/react-native-bootcamp/issues?q=label%3A%22Windows+issues%22+is%3Aclosed'
        }
      >
        <div className="relative my-4 rounded border-2 border-blue-400 bg-blue-100 px-4 py-3 text-blue-800 hover:bg-blue-200 dark:border-orange-400 dark:bg-orange-100 dark:text-orange-900 dark:hover:bg-orange-200">
          Using Windows? Read the solved Windows setup issues on GitHub.
        </div>
      </NativeLink>
    );
  }

  return null;
}

import { createContext, useEffect, useState, ReactNode } from 'react';
import type { MagicUserMetadata } from '@magic-sdk/types';
import { magic } from '~/lib/magic';

export type MagicUser = MagicUserMetadata;

interface UserContextValue {
  user: MagicUser | null;
  setUser: (user: MagicUser | null) => void;
  loaded: boolean;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
  loaded: false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MagicUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!magic) return;
    let cancelled = false;

    (async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (cancelled) return;
        if (isLoggedIn) {
          const metadata = await magic.user.getInfo();
          if (!cancelled) setUser(metadata);
        }
      } catch (error) {
        console.error('[UserProvider] failed to restore session:', error);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loaded }}>
      {children}
    </UserContext.Provider>
  );
}

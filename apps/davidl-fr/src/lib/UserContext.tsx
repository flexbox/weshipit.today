import { createContext, useEffect, useState, ReactNode } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '~/lib/supabase';
import type { WorkshopUser } from '~/types/user';

interface UserContextValue {
  loaded: boolean;
  user: WorkshopUser | null;
}

export const UserContext = createContext<UserContextValue>({
  loaded: false,
  user: null,
});

export function toWorkshopUser(
  user: SupabaseUser | null | undefined,
): WorkshopUser | null {
  if (!user?.email) return null;
  return { email: user.email };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<WorkshopUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    // Fires INITIAL_SESSION once the stored session (or the magic link
    // fragment) has been read, then on every sign in / sign out.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toWorkshopUser(session?.user));
      setLoaded(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ loaded, user }}>
      {children}
    </UserContext.Provider>
  );
}

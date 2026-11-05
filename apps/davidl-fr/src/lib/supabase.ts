import { createClient } from '@supabase/supabase-js';
import type { Database } from '~/types/supabase';

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Browser-only client. The implicit flow puts the session in the magic link
// URL fragment, so the link works even when opened in another browser.
export const supabase =
  typeof window !== 'undefined'
    ? createClient<Database>(
        NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        {
          auth: {
            autoRefreshToken: true,
            detectSessionInUrl: true,
            flowType: 'implicit',
            persistSession: true,
          },
        },
      )
    : null;

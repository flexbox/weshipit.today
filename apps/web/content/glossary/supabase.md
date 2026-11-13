---
title: 'Supabase'
summary: 'Supabase is an open-source backend platform built on Postgres; React Native apps use its supabase-js client for auth, database queries, storage and realtime updates.'
aliases:
  - 'Supabase client'
related:
  - 'Firebase'
  - 'Secure Storage'
  - 'WebSocket'
  - 'API Keys in Mobile Apps'
updated: 2026-11-13
---

Supabase is a backend-as-a-service built around a hosted Postgres database, with authentication, file storage, edge functions and realtime subscriptions alongside it. React Native apps use the same `@supabase/supabase-js` client as web apps, which is pure JavaScript and works in Expo Go.

The React Native-specific part is setting up the client. On the web it stores the session in `localStorage`; on a phone you must give it storage and turn off URL session detection:

```ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
```

Supabase’s guides also recommend calling `supabase.auth.startAutoRefresh()` when [AppState](/react-native-glossary/appstate) becomes active and `stopAutoRefresh()` when it goes to the background, because timers do not run reliably in a suspended app. Teams that want the session encrypted swap AsyncStorage for an adapter built on [secure storage](/react-native-glossary/secure-storage).

Why teams choose it: data is relational and queryable with SQL, the platform is open source and self-hostable, and Postgres row-level security lets the app query the database directly without a custom API.

That last point is also the biggest gotcha. The public key in your app is extractable by anyone, so **row-level security is not optional**. A table without RLS policies is readable and writable by anyone holding that key. The service-role (secret) key bypasses RLS entirely and must never appear in app code; keep it on a server. See [API keys in mobile apps](/react-native-glossary/api-keys).

Realtime features run over a [WebSocket](/react-native-glossary/websocket), so expect to resubscribe after the app returns from the background. Compared with Firebase, Supabase is relational rather than document-based. See the [Supabase docs](https://supabase.com/docs).

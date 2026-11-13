---
title: 'TanStack Query'
summary: 'TanStack Query, formerly React Query, manages server state in React Native: it fetches, caches, deduplicates and refetches API data through hooks like useQuery.'
aliases:
  - 'React Query'
  - 'useQuery'
related:
  - 'State Management'
  - 'Fetch API'
  - 'Offline-First'
  - 'AppState'
updated: 2026-11-13
---

TanStack Query (still widely called React Query) is a library for server state: data your app shows but a backend owns. You describe a query with a key and a function that returns a promise, and the library handles caching, loading and error states, request deduplication, background refetching and retries.

```tsx
const { data, isPending, error } = useQuery({
  queryKey: ['orders', userId],
  queryFn: () => fetch(`/api/orders/${userId}`).then((r) => r.json()),
});
```

Two screens that use the same `queryKey` share one request and one cache entry, and `useMutation` plus `invalidateQueries` refreshes affected data after a write. It is network-agnostic, so it works with [fetch](/react-native-glossary/fetch-api), axios, GraphQL clients or Supabase calls.

The React Native gotcha is that two of its best features are browser-driven and do nothing on mobile by default. “Refetch on window focus” listens for browser focus events, and “online” status comes from the browser’s connectivity events. On a phone you wire them to [AppState](/react-native-glossary/appstate) and a network library yourself:

```ts
import { AppState } from 'react-native';
import { focusManager } from '@tanstack/react-query';

AppState.addEventListener('change', (status) => {
  focusManager.setFocused(status === 'active');
});
```

With that in place, returning to the app after an hour refreshes stale screens automatically; without it, users see hour-old data until they pull to refresh. Connectivity is wired the same way through `onlineManager`, typically fed by NetInfo.

Other things to know: `staleTime` defaults to zero, so data is considered stale immediately and refetched often, which is usually more traffic than you want on mobile; set it per query. The cache lives in memory, so for [offline-first](/react-native-glossary/offline-first) behaviour add a persister that writes it to device storage. See the [TanStack Query React Native guide](https://tanstack.com/query/latest/docs/framework/react/react-native).

---
title: 'Zustand'
summary: 'Zustand is a small React state library where a global store is a hook created with create(); components subscribe to slices through selectors, with no provider needed.'
aliases:
  - 'Zustand store'
related:
  - 'State Management'
  - 'Redux'
  - 'MMKV'
  - 'Re-render'
updated: 2026-11-13
---

Zustand is a minimal global state library that has become a popular default in React Native apps. A store is created with `create()`, and what you get back is a hook. There is no provider to wrap the app in, no actions or reducers to declare, and the store can also be read and updated outside React, for example from a notification handler.

```ts
import { create } from 'zustand';

type CartState = { items: string[]; add: (id: string) => void };

export const useCart = create<CartState>()((set) => ({
  items: [],
  add: (id) => set((state) => ({ items: [...state.items, id] })),
}));

const count = useCart((state) => state.items.length);
```

The selector is the important part. A component re-renders only when the value its selector returns changes, so `useCart((s) => s.items.length)` ignores every unrelated update. That fine-grained subscription is the main reason teams pick Zustand over [Context](/react-native-glossary/context), which re-renders every consumer.

Persistence comes from the `persist` middleware with a storage adapter. On React Native that is usually [AsyncStorage](/react-native-glossary/asyncstorage) or a faster synchronous store such as [MMKV](/react-native-glossary/mmkv), passed through `createJSONStorage`.

Gotchas that come up repeatedly:

- Calling `useCart()` with no selector subscribes to the whole store, so the component [re-renders](/react-native-glossary/re-render) on every change.
- A selector that builds a new object, such as `(s) => ({ a: s.a, b: s.b })`, returns a fresh reference each time. Wrap it in `useShallow` or select fields separately.
- With an asynchronous storage adapter, persisted state is hydrated after the first render, so a logged-in user can briefly see the logged-out screen. Wait for hydration, or use a synchronous adapter.

See the [Zustand docs](https://zustand.docs.pmnd.rs/).

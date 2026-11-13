---
title: 'State Management'
summary: 'State management is how a React Native app stores, shares and updates data across screens, from local component state to global stores, server caches and persistence.'
aliases:
  - 'Global state'
related:
  - 'Zustand'
  - 'Redux'
  - 'TanStack Query'
  - 'Context'
  - 'MMKV'
updated: 2026-11-13
---

State management is the set of decisions about where each piece of data in your app lives and who is allowed to change it. In React Native it covers everything from a text field’s value to the logged-in user, a cached API response and the data that must survive the app being killed.

The useful move is to stop thinking of “state” as one thing. Most apps have five kinds, and each has a natural home:

- **Local UI state** (is this sheet open?) belongs in `useState` inside the component.
- **Server state** (the list of orders) is a cache of data owned by a backend. Tools like [TanStack Query](/react-native-glossary/tanstack-query) handle fetching, caching and refetching far better than a hand-rolled store.
- **Global client state** (theme, cart, onboarding progress) goes in a store such as [Zustand](/react-native-glossary/zustand) or [Redux](/react-native-glossary/redux), or in [Context](/react-native-glossary/context) when it rarely changes.
- **Persisted state** has to outlive a cold start and is written to storage such as MMKV or SQLite.
- **Navigation state** (which screen, with which params) is owned by your navigation library.

Mobile adds pressures the web rarely has. The OS can kill a backgrounded app at any time, so anything the user would be annoyed to lose must be persisted, not just kept in memory. Apps also live for days between launches, so cached server data goes stale in ways a page refresh would normally hide.

The most common mistake is putting server data into a global client store: fetching in a `useEffect`, dispatching the result into Redux, then writing loading flags, error flags and refresh logic by hand for every endpoint. The second is using a single Context for frequently changing values, which re-renders every consumer on each update. Pick the home by the kind of state, and most “which library?” debates resolve themselves.

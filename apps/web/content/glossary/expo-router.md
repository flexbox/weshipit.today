---
title: 'Expo Router'
summary: 'Expo Router is a file-based routing library for React Native. Files in the app directory become routes, with deep links and typed navigation derived automatically.'
aliases:
  - 'File-based routing'
related:
  - 'Expo'
  - 'React Navigation'
  - 'Core Components'
updated: 2026-09-12
---

Expo Router brings file-based routing to React Native. The layout of your `app/` directory _is_ the navigation structure, the same convention Next.js uses on the web.

```
app/
  _layout.tsx      → wraps every route
  index.tsx        → /
  settings.tsx     → /settings
  post/[id].tsx    → /post/42
```

It is built on [React Navigation](/react-native-glossary/react-navigation) rather than replacing it, so the underlying navigators — stack, tabs, drawer — are the same ones. What Expo Router adds is convention: routes come from the filesystem instead of a hand-maintained config object.

Three things newcomers get for free:

- **Deep linking.** Every screen has a URL, so a push notification or a shared link can open it with no extra wiring.
- **Typed routes.** `href` values are checked against the routes that actually exist.
- **Web support.** The same tree renders as a real website through React Native Web.

See the [Expo Router docs](https://docs.expo.dev/router/introduction/).

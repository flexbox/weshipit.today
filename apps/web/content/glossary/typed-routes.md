---
title: 'Typed Routes'
summary: 'Typed routes is an Expo Router feature that generates TypeScript types from your app directory, so a link to a route that does not exist fails type-checking.'
aliases:
  - 'Expo Router typed routes'
related:
  - 'Expo Router'
  - 'TypeScript'
  - 'Deep Linking'
  - 'Navigation State'
updated: 2026-11-13
---

Typed routes is an [Expo Router](/react-native-glossary/expo-router) feature that turns the files in your `app/` directory into [TypeScript](/react-native-glossary/typescript) types. Every `href` you pass to `<Link>`, `router.push()` or `router.replace()` is checked against the routes that actually exist, including the names of dynamic segments.

```tsx
<Link href="/settings">Settings</Link>
<Link href={{ pathname: '/post/[id]', params: { id: '42' } }}>Post</Link>

router.push('/setings'); // type error: route does not exist
```

It matters because navigation strings are the one part of a React Native app the compiler usually cannot see. Renaming `profile.tsx` to `account.tsx` used to leave broken links that only showed up when someone tapped them, or when a push notification [deep link](/react-native-glossary/deep-linking) silently landed on a not-found screen. With typed routes the rename produces a list of type errors.

How it works in practice:

- It is switched on in app config (historically under `experiments.typedRoutes`; check the Expo Router docs for your SDK).
- The Expo CLI writes the generated declarations into the `.expo` folder and references them from an `expo-env.d.ts` file in the project root.
- The types are regenerated while the dev server runs, so adding a file updates autocomplete straight away.

The gotcha is that the types are generated, not written. On a fresh clone or in CI, a type-check can fail with errors about every `href` until the Expo CLI has produced the declarations, and committing a stale copy causes the opposite problem. Run the generation step before `tsc` in CI rather than checking the files in.

Typed routes check the shape of URLs your code builds. They cannot validate URLs that arrive from outside at runtime, such as links from emails, so the not-found route still matters. See [typed routes](https://docs.expo.dev/router/reference/typed-routes/).

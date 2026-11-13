---
title: 'Peer Dependencies'
summary: 'Peer dependencies are packages a library expects your app to provide, such as react and react-native, so that only one shared copy exists in the project.'
aliases:
  - 'peerDependencies'
  - 'Dependency conflict'
related:
  - 'Package Manager'
  - 'Monorepo'
  - 'Expo Doctor'
  - 'Native Module'
updated: 2026-11-13
---

A peer dependency is a package that a library needs but does not install for itself. The library declares it in `peerDependencies`, and your app is expected to supply it. Almost every React Native library lists `react` and `react-native` this way, and many list others, such as `react-native-reanimated` or `react-native-gesture-handler`.

The reason is that some packages must exist exactly once. Two copies of React break hooks with "Invalid hook call". Two copies of a [native module](/react-native-glossary/native-module) lead to duplicate symbols at build time or crashes at runtime. Peer dependencies make the app the single owner of those shared packages.

```json
{
  "peerDependencies": {
    "react": "*",
    "react-native": ">=0.76"
  }
}
```

In practice modern npm installs missing peers automatically and refuses to continue when ranges conflict, printing an `ERESOLVE` error. Yarn and pnpm warn instead, and pnpm has settings to make peer rules stricter.

The most common mistake is reaching for `npm install --legacy-peer-deps` or `--force` the moment `ERESOLVE` appears. That makes the error go away by ignoring the declared ranges. Sometimes that is fine, because a library simply has not widened its range for a new React version yet. Sometimes it installs a library that really is incompatible with your React Native version and fails at build time, which is harder to diagnose.

A better sequence:

- Read the conflict. It names the library and the range it expects.
- Check for a newer release of that library that supports your version.
- In Expo projects, use `npx expo install` and [Expo Doctor](/react-native-glossary/expo-doctor), which know the compatible versions for your SDK.
- If you must override, use your package manager’s `overrides` or `resolutions` field so the decision is visible in `package.json`, not hidden in an install flag.

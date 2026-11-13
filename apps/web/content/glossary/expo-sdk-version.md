---
title: 'Expo SDK Version'
summary: 'The Expo SDK version is the numbered release of the expo package that pins a matching React Native version and a tested set of Expo library versions.'
aliases:
  - 'SDK version'
  - 'Expo SDK upgrade'
related:
  - 'Expo'
  - 'Expo Doctor'
  - 'Expo Go'
  - 'Package Manager'
  - 'Upgrade Helper'
updated: 2026-11-13
---

An Expo SDK version is a numbered release of the `expo` package, such as SDK 54. Each one targets a specific React Native version and ships a set of `expo-*` libraries that have been tested together with it. The major version of the `expo` package is the SDK number.

Expo releases a new SDK roughly three times a year, each following a recent React Native minor. In practice the SDK is the unit you upgrade, not React Native itself: bumping the SDK moves React Native, React and every Expo module forward together.

The upgrade flow looks like this:

```bash
npx expo install expo@^54.0.0
npx expo install --fix
npx expo-doctor
```

`npx expo install` reads the SDK’s compatibility list and picks the right version of each library, including popular third-party ones such as [Reanimated](/react-native-glossary/reanimated). [Expo Doctor](/react-native-glossary/expo-doctor) then flags anything still out of range.

Practical advice:

- Upgrade one SDK at a time and read that SDK’s changelog. Breaking changes and deprecations are listed per release.
- If you use [Continuous Native Generation](/react-native-glossary/continuous-native-generation), regenerate the native folders after upgrading rather than patching them.
- Native code changed, so build a new binary. An [over-the-air update](/react-native-glossary/over-the-air-update) cannot move a user from one SDK to another.

The most common mistake is installing libraries with plain `npm install`, which grabs the latest version rather than the one matching your SDK. That is the usual cause of "works in a new project, crashes in mine" bugs and native build failures after an upgrade.

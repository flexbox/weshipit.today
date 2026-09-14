---
title: 'Development Build'
summary: 'A development build is a debug build of your own app containing your native dependencies plus the Expo dev client, so you can load JavaScript from Metro and use any native library.'
aliases:
  - 'Dev client'
  - 'expo-dev-client'
related:
  - 'Expo'
  - 'EAS'
  - 'Metro'
  - 'Dev Menu'
  - 'Native Module'
updated: 2026-09-12
---

A development build is a debug build of your app that includes your project's native code plus a development client, letting it connect to [Metro](/react-native-glossary/metro) and load JavaScript at runtime.

It replaces the old Expo Go workflow for any real project. **Expo Go** is a prebuilt sandbox app containing a fixed set of Expo SDK modules — great for a first tutorial, useless the moment you add a [native module](/react-native-glossary/native-module) it does not include. A development build contains _your_ dependencies, so nothing is off-limits.

You produce one with `eas build --profile development` or locally with `npx expo run:ios`, install it once on a device or simulator, and from then on iterate in JavaScript with [Fast Refresh](/react-native-glossary/fast-refresh).

The rule that follows: **rebuild only when native code changes.** Adding a JavaScript-only package needs no rebuild; adding `expo-camera` does.

Development builds also carry the [dev menu](/react-native-glossary/dev-menu) and debugging tools that release builds strip. See [development builds](https://docs.expo.dev/develop/development-builds/introduction/).

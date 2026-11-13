---
title: 'Release Build'
summary: 'A release build is the optimised, production-signed React Native app with JavaScript bundled in and developer tooling removed, unlike the debug build you develop with.'
aliases:
  - 'Debug build'
  - 'Production build'
  - 'Build variant'
related:
  - 'Development Build'
  - 'Hermes Bytecode'
  - 'R8 and ProGuard'
  - 'JavaScript Bundle'
updated: 2026-11-13
---

React Native apps compile in two main modes. A **debug build** loads JavaScript from Metro, enables Fast Refresh, LogBox and the Dev Menu, and runs React in development mode with its extra checks. A **release build** embeds the [JavaScript bundle](/react-native-glossary/javascript-bundle) in the binary, compiles it to [Hermes bytecode](/react-native-glossary/hermes-bytecode), sets `__DEV__` to `false`, strips the developer tooling and turns on native compiler optimisations.

On Android these modes are **build variants** (build types, optionally combined with product flavours); on iOS they are **build configurations**, Debug and Release, selected by a scheme. Running one locally:

```bash
npx react-native run-android --mode release
npx react-native run-ios --mode Release
npx expo run:android --variant release
npx expo run:ios --configuration Release
```

Why it matters:

- **Never judge performance in debug.** Development-mode React and the absence of bytecode precompilation make debug builds much slower. Profile release builds.
- **Some bugs exist only in release**: code that relies on `__DEV__`, a native library broken by [R8](/react-native-glossary/r8-proguard) shrinking, a missing environment variable, or a JavaScript error that LogBox showed politely in debug but that crashes the app in release.
- `console.log` calls still run in release. They cost time and can leak data to device logs; strip them with a Babel plugin if that matters to you.

The gotcha in a fresh bare project: Android’s release build type is signed with the **debug keystore** by default. It installs and runs, but the store will not accept it. Configure a real signing key before your first upload.

A [development build](/react-native-glossary/development-build) is a debug build with your native code included; it is not a release build, and testing in one does not replace a pass on a real release candidate.

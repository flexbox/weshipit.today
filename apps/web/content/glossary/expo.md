---
title: 'Expo'
summary: 'Expo is a framework and toolchain built on React Native. It supplies routing, native modules, build services and updates so teams do not assemble that stack themselves.'
aliases:
  - 'Expo SDK'
related:
  - 'Expo Router'
  - 'EAS'
  - 'Development Build'
  - 'Continuous Native Generation'
updated: 2026-09-12
---

Expo is a framework built on top of React Native. React Native gives you the renderer and the JavaScript-to-native bridge; Expo adds the parts every app ends up needing — routing, a large library of native modules, build infrastructure, and update delivery.

The React Native documentation now recommends starting new apps with a framework, and Expo is the one it points to. In practice `npx create-expo-app` is the default entry point for newcomers.

What you get beyond bare React Native:

- **[Expo Router](/react-native-glossary/expo-router)** — file-based navigation
- **The Expo SDK** — vetted [native modules](/react-native-glossary/native-module) (`expo-camera`, `expo-notifications`, `expo-sqlite`) that version together
- **[EAS](/react-native-glossary/eas)** — hosted builds, store submission, and [over-the-air updates](/react-native-glossary/over-the-air-update)
- **[Continuous Native Generation](/react-native-glossary/continuous-native-generation)** — `ios/` and `android/` folders generated from config rather than hand-maintained

A common misconception is that Expo restricts you to its own APIs. That stopped being true with [development builds](/react-native-glossary/development-build): any native library works.

---
title: 'Native Module'
summary: 'A native module is platform code — Swift, Kotlin, Objective-C, Java or C++ — exposed to JavaScript, letting an app reach APIs React Native does not wrap itself.'
aliases:
  - 'Native modules'
related:
  - 'TurboModules'
  - 'Codegen'
  - 'Host Platform'
  - 'Continuous Native Generation'
updated: 2026-09-12
---

A native module is a piece of platform code exposed to JavaScript. React Native wraps a useful but finite set of APIs; anything beyond it — Bluetooth, biometrics, a payment SDK, an on-device ML model — reaches your app through a native module.

Most developers consume rather than write them. Installing `react-native-ble-plx` or `expo-camera` adds native module code to the project, which is why those installs need a native rebuild and cannot be delivered by an [over-the-air update](/react-native-glossary/over-the-air-update).

Under the [New Architecture](/react-native-glossary/legacy-vs-new-architecture) the modern form is a [TurboModule](/react-native-glossary/turbomodules), typed by [Codegen](/react-native-glossary/codegen) and loaded on demand.

Two things newcomers should recognise:

- **"Autolinking"** means the native build discovers installed modules automatically — no manual Xcode or Gradle wiring in almost all cases.
- **A module needing a config change** (permissions, entitlements) uses a [config plugin](/react-native-glossary/continuous-native-generation) in Expo projects rather than hand-edited native files.

See [native modules](https://reactnative.dev/docs/native-modules-intro).

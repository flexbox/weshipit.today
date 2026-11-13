---
title: 'Cross-Platform Development'
summary: 'Cross-platform development means building one app for several operating systems, such as iOS and Android, from a largely shared codebase instead of one per platform.'
aliases:
  - 'Cross-platform'
  - 'Write once'
related:
  - 'Platform-Specific Code'
  - 'Native App'
  - 'Flutter'
  - 'Kotlin Multiplatform'
  - 'Out-of-Tree Platform'
updated: 2026-11-13
---

Cross-platform development is the practice of shipping one product to several operating systems from a mostly shared codebase. In React Native that means writing components and business logic once in JavaScript or TypeScript and running them on iOS and Android, with optional targets such as the web or desktop.

Frameworks differ in what they share. React Native shares the code but renders each platform’s own native views. [Flutter](/react-native-glossary/flutter) shares the code and draws its own UI. [Kotlin Multiplatform](/react-native-glossary/kotlin-multiplatform) usually shares business logic and lets the UI stay native. WebView-based tools share a web app. None of these is universally better; they trade sharing against platform fidelity in different places.

Why it matters to a React Native team:

- One team and one language can cover both stores, and most features land on both platforms at once.
- Platform differences do not disappear. Permissions, push notifications, back navigation, keyboard handling and store rules still differ, so you will write some [platform-specific code](/react-native-glossary/platform-specific-code) and occasionally a [native module](/react-native-glossary/native-module).
- Your team still needs someone comfortable opening Xcode and Android Studio when a build breaks.

The most common misconception is "write once, run anywhere". React Native’s original slogan was deliberately different: "learn once, write anywhere". The aim is a shared mental model and a large shared codebase, while still letting each platform look and behave the way its users expect. A cross-platform app that ignores platform conventions, such as using iOS-style navigation on Android, tends to feel wrong on both.

How much code you actually share depends on the app. Content and form-heavy apps share almost everything; apps built around a device feature such as the camera, Bluetooth or widgets share less.

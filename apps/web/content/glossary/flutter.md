---
title: 'Flutter'
summary: 'Flutter is Google’s open-source UI toolkit that builds cross-platform apps in Dart and draws its own widgets with its own rendering engine instead of native views.'
aliases:
  - 'Flutter vs React Native'
related:
  - 'Cross-Platform Development'
  - 'Kotlin Multiplatform'
  - 'Native App'
  - 'Fabric Renderer'
updated: 2026-11-13
---

Flutter is Google’s open-source framework for building apps for iOS, Android, the web and desktop from one codebase written in Dart. It is the framework most often compared with React Native, because both target the same problem: one team shipping a mobile app to both stores.

The core technical difference is rendering. React Native’s [Fabric renderer](/react-native-glossary/fabric-renderer) turns your components into real platform views, such as `UIView` on iOS and `android.view.View` on Android. Flutter draws every pixel itself with its own engine onto a canvas, using its own widget library (Material and Cupertino) that imitates platform controls.

That leads to real trade-offs, not a winner:

- **Consistency vs platform fidelity.** Flutter looks identical everywhere and is unaffected by OS styling changes. React Native picks up native behaviour and new OS styling for free, but platforms can differ slightly.
- **Language and ecosystem.** Flutter uses Dart and pub.dev. React Native uses JavaScript or TypeScript, npm and React, so web teams can share skills and sometimes code.
- **Compilation.** Flutter compiles Dart ahead of time to machine code for release builds. React Native runs JavaScript on [Hermes](/react-native-glossary/hermes), which precompiles to bytecode.
- **Native access.** Both use plugins or modules written in Swift, Kotlin or C++ for device features.

Both offer fast development reload loops, mature tooling and large production users, and both can deliver smooth 60 or 120 fps interfaces when written carefully.

A common misconception is that one is "native" and the other is not. Both produce real compiled app binaries. What differs is who draws the UI: the operating system in React Native, Flutter’s engine in Flutter. Choose based on your team’s language, how closely you need to track platform UI, and whether sharing code with a React web app matters.

---
title: 'Brownfield App'
summary: 'A brownfield app is an existing native iOS or Android app that adds React Native for some screens, rather than being built in React Native from scratch.'
aliases:
  - 'Brownfield'
  - 'Add React Native to existing app'
related:
  - 'Native App'
  - 'Native Module'
  - 'CocoaPods'
  - 'Gradle'
  - 'Monorepo'
updated: 2026-11-13
---

A brownfield app is an existing [native app](/react-native-glossary/native-app), written in Swift, Objective-C, Kotlin or Java, that embeds React Native for part of its interface. The opposite, an app started in React Native from day one, is called greenfield.

It is how many large companies adopt React Native: one new feature or a settings flow ships in React Native while the rest of the app stays native. The native host creates a React Native instance and displays a root view, or an Android activity or fragment, for each React screen it wants to show.

Why teams choose it:

- No risky rewrite. React Native proves itself on one screen at a time.
- Shared features across iOS and Android, built by one team.
- Product screens can receive over-the-air JavaScript updates while the native shell stays stable.

Where it gets hard:

- **Build integration.** The native project must pull in React Native through [CocoaPods](/react-native-glossary/cocoapods) and [Gradle](/react-native-glossary/gradle), and every native developer suddenly needs Node and Metro. Many teams instead package the React Native part as a prebuilt XCFramework or AAR so the native build stays unchanged.
- **Navigation across the boundary.** Back buttons, deep links and transitions between native and React screens need a deliberate contract.
- **Shared state and services**, such as auth tokens or analytics, must be exposed through [native modules](/react-native-glossary/native-module) in both directions.
- **Upgrades** touch two codebases at once, and dependency versions on the native side can clash with what React Native libraries expect.

The common mistake is treating each React screen as fully independent and starting several React Native instances. One shared instance keeps memory and startup cost down and lets screens share JavaScript state.

See the official [integration guide](https://reactnative.dev/docs/integration-with-existing-apps).

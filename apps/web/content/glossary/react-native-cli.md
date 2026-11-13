---
title: 'React Native CLI'
summary: 'The React Native CLI is the community-maintained command-line tool for creating, running and building React Native apps that you manage without a framework.'
aliases:
  - '@react-native-community/cli'
  - 'Bare React Native'
related:
  - 'Expo'
  - 'Metro'
  - 'Autolinking'
  - 'Upgrade Helper'
  - 'Xcode'
updated: 2026-11-13
---

The React Native CLI is the command-line tool, published as `@react-native-community/cli`, that scaffolds a plain React Native project and drives it day to day: starting [Metro](/react-native-glossary/metro), building and installing the native app, and wiring up native dependencies.

A project created this way is often called "bare" React Native. You own the `ios/` and `android/` folders outright and edit them by hand, rather than generating them from configuration.

```bash
npx @react-native-community/cli@latest init MyApp
npx react-native start
npx react-native run-ios
npx react-native run-android
```

Behind those commands the CLI does real work. It reads each package’s native configuration for [autolinking](/react-native-glossary/autolinking), runs CocoaPods on iOS, invokes Gradle on Android, and offers `npx react-native doctor` to check your machine setup.

Why it matters now: the official React Native docs recommend starting new apps with a framework, which in practice means [Expo](/react-native-glossary/expo). The CLI remains the right fit for teams that want no framework layer, for libraries, and for adding React Native to an existing native app.

Common gotchas:

- The old `npx react-native init` command is deprecated. Use the community CLI package directly as shown above.
- "Bare" does not mean "cannot use Expo". Any CLI project can install the `expo` package and use Expo modules.
- Upgrades are manual. Every native template change has to be merged into your own `ios/` and `android/` folders, which is what the [Upgrade Helper](/react-native-glossary/upgrade-helper) exists for.

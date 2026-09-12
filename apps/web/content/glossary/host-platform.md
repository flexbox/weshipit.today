---
title: 'Host Platform'
summary: 'The host platform is the operating system embedding React Native — iOS, Android, macOS, Windows, tvOS or the web — and the source of the real views your components render to.'
aliases:
  - 'Platform'
  - 'Host'
related:
  - 'Core Components'
  - 'Platform-Specific Code'
  - 'Fabric Renderer'
  - 'Native Module'
updated: 2026-09-12
---

The host platform is whatever operating system is hosting your React Native app and providing the real UI widgets it renders into. React Native itself is platform-agnostic; the host supplies the views, the threading model, and the APIs.

The supported hosts split into two groups:

- **Maintained by Meta** — iOS and Android.
- **Maintained by partners** — [macOS and Windows](https://microsoft.github.io/react-native-windows/) by Microsoft, tvOS, and visionOS, plus React Native Web for the browser.

The concept matters because it explains React Native's core promise and its main caveat. A `<View>` is not one thing: it is a _[host component](/react-native-glossary/core-components)_ resolved to a `UIView`, a `ViewGroup`, or a `<div>` depending on where it runs. Shared code describes intent; the host decides the pixels.

You handle host differences with the `Platform` module or [platform-specific files](/react-native-glossary/platform-specific-code), and you reach host capabilities that React Native does not wrap through a [native module](/react-native-glossary/native-module).

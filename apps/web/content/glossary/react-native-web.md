---
title: 'React Native Web'
summary: 'React Native Web is a library that implements React Native’s components and APIs with React DOM, so the same View, Text and StyleSheet code renders as a website.'
aliases:
  - 'react-native-web'
  - 'Expo web'
related:
  - 'Cross-Platform Development'
  - 'Platform-Specific Code'
  - 'Expo Router'
  - 'Out-of-Tree Platform'
updated: 2026-11-13
---

React Native Web is a compatibility layer that lets React Native code run in a browser. It reimplements `View`, `Text`, `Image`, `ScrollView`, `StyleSheet` and many core APIs on top of React DOM, and the bundler aliases imports of `react-native` to `react-native-web` when building for web.

The output is real HTML and CSS, not a canvas and not a [WebView](/react-native-glossary/webview). A `View` becomes a `div`, `StyleSheet` styles are compiled into atomic CSS classes, and accessibility props map to ARIA attributes. That is why sites built with it are indexable and work with browser text selection and screen readers.

When people say “Expo web” they mean this: Expo’s web target and [Expo Router](/react-native-glossary/expo-router)’s web output are built on React Native Web, with Metro doing the bundling. You rarely install or configure it yourself in an Expo project.

How it behaves in practice:

- Layout uses React Native’s [Flexbox](/react-native-glossary/flexbox) defaults (column direction, `position: relative`), so screens look the same on web without CSS rewrites.
- `Platform.OS` is `'web'`, and files ending in `.web.tsx` are picked up for web-only implementations. See [platform-specific code](/react-native-glossary/platform-specific-code).
- Mouse and keyboard concerns, such as hover styles and focus rings, need explicit handling that mobile code never needed.

The most common gotcha is third-party libraries. Anything that wraps a native module (camera, secure storage, many map or payment SDKs) has no web implementation unless the library ships one, and the build fails or the import returns undefined on web. Check each dependency’s web support before promising a web version, and put web fallbacks behind a `.web.tsx` file. See the [React Native Web docs](https://necolas.github.io/react-native-web/).

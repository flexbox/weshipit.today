---
title: 'Metro'
summary: 'Metro is React Native’s JavaScript bundler. It resolves imports, transforms code, serves the bundle to the app in development and powers Fast Refresh.'
aliases:
  - 'Metro bundler'
related:
  - 'JavaScript Bundle'
  - 'Fast Refresh'
  - 'JavaScript Runtime'
  - 'Development Build'
updated: 2026-09-12
---

Metro is the bundler React Native uses, filling the role Webpack or Vite plays on the web. It takes your entry file, follows every import, transforms the code, and produces a single [JavaScript bundle](/react-native-glossary/javascript-bundle) the app can execute.

It runs in two modes:

- **In development** it is a server, usually on port 8081. The app fetches the bundle from it on launch and keeps a connection open for [Fast Refresh](/react-native-glossary/fast-refresh).
- **At build time** it emits the static bundle that gets embedded in the `.ipa` or `.aab` you ship.

Metro is mobile-specific in ways that surprise web developers: it resolves platform extensions such as `Button.ios.tsx` automatically (see [platform-specific code](/react-native-glossary/platform-specific-code)), and it handles asset registration for images.

Most React Native error messages a newcomer sees during setup come from Metro — "Unable to resolve module", or a stale cache that `npx expo start --clear` fixes. See the [Metro docs](https://metrobundler.dev/).

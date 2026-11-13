---
title: 'Tamagui'
summary: 'Tamagui is a styling library, UI kit and optimising compiler for React Native and web that shares typed components, tokens and themes across platforms.'
aliases:
  - 'Tamagui UI'
related:
  - 'Design Tokens'
  - 'React Native Web'
  - 'NativeWind'
  - 'Unistyles'
  - 'Monorepo'
updated: 2026-11-13
---

Tamagui is an open-source styling system for React Native and the web. It combines three layers you can adopt separately: a core `styled()` API with style props, a set of ready-made UI components built on it, and an optional compiler that optimises styles ahead of time.

You start by defining a configuration with `createTamagui`: [design tokens](/react-native-glossary/design-tokens) for space, size, colour and radius, fonts, media queries, and named themes such as light and dark. Components then reference tokens by name and receive typed autocompletion.

```tsx
import { styled, View } from 'tamagui';

const Card = styled(View, {
  padding: '$4',
  borderRadius: '$3',
  backgroundColor: '$background',
});
```

Its distinguishing feature is the compiler. At build time it analyses `styled` components and, where values are static, flattens them into plain React Native views or atomic CSS on the web, removing runtime styling cost. Without the compiler everything still works, just with more work at runtime.

Teams choose it mainly for universal apps that share one design system between Expo and a Next.js site, often in a [monorepo](/react-native-glossary/monorepo), using [React Native Web](/react-native-glossary/react-native-web) underneath.

Common gotchas:

- **Version alignment.** Tamagui is split into many `@tamagui/*` packages; mismatched versions cause confusing type and runtime errors. Upgrade them together.
- **Setup cost.** Configuring the bundler plugins and the compiler for both Metro and a web bundler is more involved than a plain `StyleSheet`.
- **Theme scope.** Values like `$background` resolve from the nearest theme, so a component can change colour when moved under a different theme provider.
- It is a significant dependency. For a mobile-only app with a small design system, simpler options may be enough.

See the [Tamagui docs](https://tamagui.dev/).

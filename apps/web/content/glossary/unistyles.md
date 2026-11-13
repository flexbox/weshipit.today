---
title: 'Unistyles'
summary: 'Unistyles is a StyleSheet replacement for React Native that adds themes, breakpoints and variants, updating styles natively without re-rendering components.'
aliases:
  - 'react-native-unistyles'
related:
  - 'StyleSheet'
  - 'Design Tokens'
  - 'Shadow Tree'
  - 'Re-render'
  - 'NativeWind'
updated: 2026-11-13
---

Unistyles (`react-native-unistyles`) is a styling library that keeps the familiar [StyleSheet](/react-native-glossary/stylesheet) API and adds what the built-in one lacks: themes, breakpoints, variants and access to runtime values such as insets and screen size inside your styles.

You register themes and breakpoints once, then pass a function to `StyleSheet.create` that receives the active theme:

```tsx
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    padding: { xs: theme.space.sm, md: theme.space.lg },
  },
}));
```

The object for `padding` is a breakpoint map: the right value is picked for the current window width.

What sets the current major version apart is how changes are applied. Its core is written in C++ and, when the theme, orientation or breakpoint changes, it updates the affected views directly in the [Shadow Tree](/react-native-glossary/shadow-tree) instead of triggering a React [re-render](/react-native-glossary/re-render). Switching to dark mode does not re-run your components. The trade-off is that this version requires the New Architecture and a Babel plugin that rewrites your components so it can track which styles each view uses.

When it fits: teams who like plain style objects rather than utility classes, want typed [design tokens](/react-native-glossary/design-tokens) and theming, and care about avoiding re-renders on theme change.

Common gotchas:

- **Forgetting the Babel plugin**, or excluding a folder from it, means styles stop reacting to theme changes in those files.
- **Copying style values out** into new objects or variables can break the link the library tracks; pass the style references to the `style` prop.
- Older tutorials describe a hook-based API from previous versions. Check which major version a guide targets before copying code.

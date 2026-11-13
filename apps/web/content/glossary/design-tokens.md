---
title: 'Design Tokens'
summary: 'Design tokens are named values for colour, spacing, typography and radius that a React Native app’s theme reads, so one change updates the design everywhere.'
aliases:
  - 'Theme'
  - 'Theming'
related:
  - 'Appearance'
  - 'Context'
  - 'StyleSheet'
  - 'Unistyles'
  - 'Tamagui'
updated: 2026-11-13
---

Design tokens are the named values a design system is built from: `colors.textPrimary`, `space.md`, `radius.card`, `font.heading`. In a React Native app, a **theme** is a set of tokens, and components read tokens instead of hard-coding `#1A1A1A` or `16`.

Tokens usually come in two layers:

- **Primitive tokens** describe raw values: `blue500`, `space4 = 16`.
- **Semantic tokens** describe intent: `colors.background`, `colors.danger`, `space.screenPadding`. Components should use these, because a dark theme or a rebrand changes what they point to, not every component.

```ts
export const light = {
  colors: { background: '#FFFFFF', text: '#0B0B0F', accent: '#4F46E5' },
  space: { sm: 8, md: 16, lg: 24 },
  radius: { card: 12 },
};
export const dark = { ...light, colors: { background: '#0B0B0F', text: '#F5F5F7', accent: '#818CF8' } };
```

React Native has no built-in theme system, so you supply one. The simplest pattern puts the active theme in [Context](/react-native-glossary/context), chosen from the system setting via [Appearance](/react-native-glossary/appearance) or `useColorScheme`. Libraries such as [Unistyles](/react-native-glossary/unistyles), Tamagui and NativeWind provide typed theming out of the box, and React Navigation accepts its own theme object that should be fed from the same tokens.

Common gotchas:

- **Static `StyleSheet.create` cannot switch themes.** Values captured at module load stay fixed; styles that depend on the theme must be created from it, or use a library that does so.
- **Only colours get tokenised.** Spacing, radius, shadows and type scale drift just as fast without tokens.
- **Native surfaces are separate.** The splash screen, status bar and system navigation bar do not read your JavaScript theme and need matching native configuration.

Teams sharing tokens with a web app or design tool often generate them from a single JSON source, so Figma, CSS and React Native stay in step.

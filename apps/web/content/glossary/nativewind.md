---
title: 'NativeWind'
summary: 'NativeWind lets you style React Native components with Tailwind CSS utility classes through a className prop, compiled into native styles at build time.'
aliases:
  - 'Tailwind for React Native'
related:
  - 'StyleSheet'
  - 'Design Tokens'
  - 'Babel'
  - 'React Native Web'
  - 'Unistyles'
updated: 2026-11-13
---

NativeWind is a library that brings Tailwind CSS to React Native. Instead of a [StyleSheet](/react-native-glossary/stylesheet) object, you write utility classes in a `className` prop, and NativeWind turns them into React Native style objects.

```tsx
<View className="flex-1 items-center justify-center bg-white dark:bg-black">
  <Text className="text-lg font-semibold text-slate-900 dark:text-white">Hello</Text>
</View>
```

It runs the real Tailwind compiler during bundling, wired in through Metro and Babel, so most of the class parsing happens at build time rather than on every render. Your `tailwind.config` provides the theme, which makes it a natural home for [design tokens](/react-native-glossary/design-tokens). It also supports modifiers such as `dark:`, platform variants, and responsive breakpoints.

Why teams pick it: web developers already know the vocabulary, the same classes work on [React Native Web](/react-native-glossary/react-native-web), and styling stays next to the markup.

Common gotchas:

- **Setup is the usual failure point.** NativeWind needs its Metro wrapper, a global CSS file imported at the root, and Tailwind’s content paths covering every file that uses classes. A class that silently does nothing usually means one of those is wrong, or the cache needs clearing.
- **React Native is not the browser.** Utilities with no native equivalent, such as CSS grid or many hover and pseudo-element styles, do not apply.
- **Third-party components** only accept `className` if NativeWind is told how to map it to their style props.
- Class names built with string concatenation at runtime cannot be seen by the compiler. Write full class names and switch between them.

See the [NativeWind docs](https://www.nativewind.dev/).

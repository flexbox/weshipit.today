---
title: 'ActivityIndicator'
summary: 'ActivityIndicator is React Native’s core loading spinner, rendering the native indeterminate progress indicator on iOS and Android with configurable size and colour.'
aliases:
  - 'Spinner'
  - 'Loading indicator'
related:
  - 'Core Components'
  - 'Suspense'
  - 'Accessibility Label'
  - 'TanStack Query'
updated: 2026-11-13
---

`ActivityIndicator` is the core component that shows a circular loading spinner. It renders the platform’s own control, `UIActivityIndicatorView` on iOS and an indeterminate `ProgressBar` on Android, so it looks native on each without styling.

```jsx
{
  isLoading ? <ActivityIndicator size="large" color="#5b5bd6" /> : <Results />;
}
```

The props are deliberately few:

- `size` — `'small'` or `'large'`. A numeric size works on **Android only**; iOS ignores it, so scale with a `transform` if you need a custom size there.
- `color` — the spinner colour. The defaults differ per platform, so set it to match your theme, especially in dark mode.
- `animating` — whether it spins. On iOS, `hidesWhenStopped` (true by default) hides it when it stops.

It is **indeterminate only**: it says “something is happening” but never “how much”. For uploads or downloads with known progress, use a progress bar from a library or a View whose width you animate.

The most common UX mistake is flashing a spinner for requests that finish in 100 ms. A spinner that appears and vanishes instantly feels slower than nothing. Delay it by a few hundred milliseconds, or show skeleton placeholders shaped like the content, which keeps layout stable. Data libraries such as [TanStack Query](/react-native-glossary/tanstack-query) expose separate “first load” and “background refetch” flags so you can show a full spinner only the first time.

A full-screen spinner also says nothing to a [screen reader](/react-native-glossary/screen-reader) user. Add an `accessibilityLabel` such as “Loading orders” so the state is announced, and consider whether [Suspense](/react-native-glossary/suspense) fallbacks can own loading states declaratively instead of scattering spinners through components.

---
title: 'Animated Component'
summary: 'An animated component is a React Native view whose style values are driven by an animation library — Reanimated or the built-in Animated API — rather than by plain state.'
aliases:
  - 'Animated.View'
  - 'Animated API'
related:
  - 'Reanimated'
  - 'Worklet'
  - 'UI Thread (Main Thread)'
  - 'View Component'
updated: 2026-09-12
---

An animated component is a view whose styles are driven frame by frame by an animation library instead of by ordinary re-renders. Animating through `useState` would re-render the tree on every frame, so React Native provides purpose-built wrappers.

There are two options, and newcomers should know which they are reading about:

- **The built-in [Animated API](https://reactnative.dev/docs/animated)** ships with React Native. You animate `Animated.Value` objects and render `Animated.View`, `Animated.Text`, and friends. With `useNativeDriver: true` the animation is handed to the native side so it keeps running when JavaScript is busy.
- **[Reanimated](/react-native-glossary/reanimated)** is the community standard for anything non-trivial. It runs animation logic as [worklets](/react-native-glossary/worklet) directly on the [UI thread](/react-native-glossary/ui-thread-main-thread), so gestures and scroll-linked effects stay smooth.

The failure mode to recognise: an animation that stutters only in release-mode-with-work-happening usually means it is running on the [JavaScript thread](/react-native-glossary/javascript-thread) rather than natively.

---
title: 'Worklet'
summary: 'A worklet is a small JavaScript function marked to run on the UI thread instead of the JavaScript thread, so animations and gestures stay smooth while JS is busy.'
aliases:
  - 'Worklets'
related:
  - 'Reanimated'
  - 'UI Thread (Main Thread)'
  - 'JavaScript Thread'
  - 'Animated Component'
updated: 2026-09-12
---

A worklet is a JavaScript function that has been marked to run on the [UI thread](/react-native-glossary/ui-thread-main-thread) rather than the main [JavaScript thread](/react-native-glossary/javascript-thread). It is the core idea behind [Reanimated](/react-native-glossary/reanimated).

You mark one with the `'worklet'` directive, though in practice the Babel plugin adds it for you inside hooks like `useAnimatedStyle`:

```js
const style = useAnimatedStyle(() => {
  'worklet';
  return { opacity: progress.value };
});
```

Because the worklet executes on the UI thread, it can compute a new style every frame even while JavaScript is blocked parsing a large API response. That is why a Reanimated gesture keeps tracking your finger when a `setState`-driven animation would freeze.

The trade-off is isolation: a worklet runs in a separate context, so it can only use values explicitly captured from the enclosing scope, plus shared values. Calling back into normal JS needs `runOnJS`. See the [Reanimated glossary](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary/).

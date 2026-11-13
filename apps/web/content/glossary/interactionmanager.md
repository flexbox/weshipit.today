---
title: 'InteractionManager'
summary: 'InteractionManager is a legacy React Native API that defers expensive JavaScript work until running animations and touches finish, using runAfterInteractions.'
aliases:
  - 'runAfterInteractions'
related:
  - 'JavaScript Thread'
  - 'Jank'
  - 'Native Driver'
  - 'Startup Time'
updated: 2026-11-13
---

`InteractionManager` is a core API for scheduling work **after** the current interactions are done. Its main method, `runAfterInteractions`, queues a callback that runs once any registered animations or touch handling have finished, so heavy work does not compete with them on the [JavaScript thread](/react-native-glossary/javascript-thread).

```js
useEffect(() => {
  const task = InteractionManager.runAfterInteractions(() => {
    loadHeavyChart();
  });
  return () => task.cancel();
}, []);
```

The classic use is a screen transition. The new screen mounts, its push animation plays, and only then does the expensive part render, such as a large list, a chart or a map. Without deferral, that work lands in the middle of the transition and causes visible [jank](/react-native-glossary/jank).

How it decides what counts as an “interaction”:

- JS-driven `Animated` animations register an interaction handle while they run.
- You can register your own with `createInteractionHandle()` and release it with `clearInteractionHandle()`.

The common misconception is that it waits for **everything** visual to finish. Animations that run natively, via the [native driver](/react-native-glossary/native-driver) or Reanimated, do not necessarily register a handle, so the callback can fire immediately while the transition is still on screen. A handle that is created and never cleared does the opposite: deferred work never runs at all, which looks like a screen that never finishes loading.

Treat it as a legacy tool. It predates the New Architecture and concurrent React, and recent guidance favours other approaches: React Navigation’s transition events, `requestIdleCallback`, `startTransition` for low-priority state updates, or simply making the expensive work cheaper. It still works, but check the React Native docs for its current status before building new code around it.

---
title: 'Native Driver'
summary: 'The native driver, useNativeDriver: true in React Native’s Animated API, hands an animation to native code once so it runs on the UI thread without JavaScript.'
aliases:
  - 'useNativeDriver'
related:
  - 'Animated Component'
  - 'Reanimated'
  - 'JavaScript Thread'
  - 'Jank'
updated: 2026-11-13
---

The native driver is a mode of React Native’s built-in Animated API. When you pass `useNativeDriver: true`, the whole animation (start value, end value, easing, duration) is described to native code once, before it starts, and then runs frame by frame on the UI thread. JavaScript is no longer involved until the animation ends.

```jsx
Animated.timing(opacity, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
}).start();
```

Without it, JavaScript calculates each frame and sends the new value across, so the animation stutters whenever the [JavaScript thread](/react-native-glossary/javascript-thread) is busy rendering a screen or parsing a response. With it, the animation stays smooth through that work. That difference is most of the story behind [jank](/react-native-glossary/jank) in older React Native apps.

The constraint is what it can animate. The native driver only supports properties that do not affect layout:

- **Supported:** `opacity`, `transform` (translate, scale, rotate) and a handful of others such as some colour properties.
- **Not supported:** `width`, `height`, `top`, `left`, `margin`, `padding`, `flex` and anything that requires recalculating layout. Trying produces an error saying the style property is not supported by the native animated module.

The usual workaround is to restate the animation in supported properties: animate `scaleY` instead of `height`, `translateX` instead of `left`.

It also works with `Animated.event` for scroll-driven effects, such as a header that fades as the list scrolls, by passing `useNativeDriver: true` to the event mapping.

Common gotchas: you cannot drive the same `Animated.Value` with both native and JavaScript animations; once a value has been used natively, mixing causes errors. Listeners and reading the current value need extra care because the value now lives on the native side. And React Native warns if you leave `useNativeDriver` unspecified, so set it explicitly every time.

When you need to animate layout properties or respond to gestures continuously, [Reanimated](/react-native-glossary/reanimated) removes these limits by running full worklets on the UI thread. See the [Animated docs](https://reactnative.dev/docs/animated#using-the-native-driver).

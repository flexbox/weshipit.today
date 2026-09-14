---
title: 'Reanimated'
summary: 'Reanimated is the standard React Native animation library. It runs animation logic as worklets on the UI thread, so motion stays smooth while JavaScript is busy.'
aliases:
  - 'react-native-reanimated'
related:
  - 'Worklet'
  - 'Animated Component'
  - 'UI Thread (Main Thread)'
  - 'JavaScript Thread'
updated: 2026-09-12
---

Reanimated is the animation library most production React Native apps use. Its defining idea is that animation logic should not live on the [JavaScript thread](/react-native-glossary/javascript-thread) at all.

Instead you write [worklets](/react-native-glossary/worklet) — functions that run on the [UI thread](/react-native-glossary/ui-thread-main-thread) — driven by _shared values_ that both threads can see:

```jsx
const offset = useSharedValue(0);
const style = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}));

<Animated.View style={style} />;
```

Because the style is recomputed natively every frame, the animation keeps running at full frame rate even while JavaScript is parsing a large response — the exact case where a `setState` animation visibly stutters.

It pairs with **react-native-gesture-handler**, which delivers touch events on the same thread, so drag-to-dismiss and swipeable rows track your finger without a round trip.

Newcomers should be aware that Reanimated 2 and 3 APIs differ substantially from version 1, so old tutorials mislead. See the [Reanimated docs](https://docs.swmansion.com/react-native-reanimated/).

---
title: 'Gesture Handler'
summary: 'React Native Gesture Handler recognises touches and gestures natively on the UI thread, replacing the JS-based responder system for pans, swipes and pinches.'
aliases:
  - 'react-native-gesture-handler'
  - 'RNGH'
related:
  - 'Reanimated'
  - 'Shared Value'
  - 'PanResponder'
  - 'UI Thread (Main Thread)'
updated: 2026-11-13
---

React Native Gesture Handler (RNGH), from Software Mansion, is the standard library for gestures in React Native. It recognises touches using the platforms’ native gesture systems on the [UI thread](/react-native-glossary/ui-thread-main-thread), instead of sending every touch to JavaScript to be interpreted, as the built-in [PanResponder](/react-native-glossary/panresponder) does.

You describe a gesture with the `Gesture` builder and attach it with `GestureDetector`:

```tsx
const offset = useSharedValue(0);
const pan = Gesture.Pan()
  .onChange((e) => {
    offset.value += e.changeX;
  })
  .onEnd(() => {
    offset.value = withSpring(0);
  });

<GestureDetector gesture={pan}>
  <Animated.View style={animatedStyle} />
</GestureDetector>;
```

With [Reanimated](/react-native-glossary/reanimated) installed, these callbacks run as worklets on the UI thread and write straight to [shared values](/react-native-glossary/shared-value), so a dragged card tracks the finger with no JavaScript round trip even while the JS thread is busy. React Navigation’s stack and drawer, bottom sheets and swipeable list rows all depend on it.

Composition is where it earns its place. `Gesture.Simultaneous` lets pinch and rotate run together, `Gesture.Exclusive` gives double-tap priority over single-tap, and `Gesture.Race` lets whichever gesture activates first win. Gestures can also be told to wait for, or run alongside, a native scroll view, which solves the classic “horizontal swipe inside a vertical list” conflict.

The setup mistake almost everyone makes once: gestures only work inside a `GestureHandlerRootView`, which should wrap the whole app near the root. Forget it and gestures silently do nothing. On Android, content rendered in a React Native `Modal` sits outside that root, so the modal’s content needs its own `GestureHandlerRootView`.

The other common surprise is mixing systems. A RNGH gesture and a `Pressable` or `onTouchStart` handler on the same area compete for the touch in ways that are hard to reason about; pick one system per interactive area. See the [Gesture Handler docs](https://docs.swmansion.com/react-native-gesture-handler/).

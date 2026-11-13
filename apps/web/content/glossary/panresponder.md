---
title: 'PanResponder'
summary: 'PanResponder is React Native’s built-in API for tracking drag gestures in JavaScript, wrapping the gesture responder system to report distance and velocity.'
aliases:
  - 'Gesture responder system'
  - 'Responder'
related:
  - 'Gesture Handler'
  - 'Pressable'
  - 'JavaScript Thread'
  - 'Animated Component'
updated: 2026-11-13
---

`PanResponder` is a core API for building drag and swipe interactions. It sits on top of React Native’s **gesture responder system**, the mechanism that decides which view “owns” a touch, and turns raw touch events into a `gestureState` with useful numbers: `dx` and `dy` (distance since the touch began) and `vx` and `vy` (velocity).

```jsx
const pan = useRef(
  PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 5,
    onPanResponderMove: (_, g) => position.setValue(g.dx),
    onPanResponderRelease: (_, g) => (g.vx > 0.5 ? dismiss() : snapBack()),
  }),
).current;

return <Animated.View {...pan.panHandlers} style={{ transform: [{ translateX: position }] }} />;
```

The responder system works by negotiation. On touch start and move, each view is asked whether it wants to become the responder (`onStartShouldSetPanResponder`, `onMoveShouldSetPanResponder`). Once granted, another view, such as a parent ScrollView, can ask to take over, and `onPanResponderTerminationRequest` decides whether to let go. `onPanResponderTerminate` fires if you lose the gesture, which is why drags inside scroll views sometimes stop halfway.

Common mistakes:

- **Creating it on every render.** `PanResponder.create` inside the component body without `useRef` or `useMemo` rebuilds the handlers each render, and handlers capture stale state.
- **Expecting it to stay smooth under load.** Every move event runs on the [JavaScript thread](/react-native-glossary/javascript-thread). When that thread is busy, the drag stutters, even if the animation itself uses the native driver.
- **Fighting native scroll views and system gestures**, which the responder system cannot coordinate well.

PanResponder still works and needs no dependency, which suits a simple draggable. For production gesture work, such as swipeable rows, bottom sheets or pinch-to-zoom, most apps use [Gesture Handler](/react-native-glossary/gesture-handler), which recognises gestures natively and can drive [Reanimated](/react-native-glossary/reanimated) animations on the UI thread.

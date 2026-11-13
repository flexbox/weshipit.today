---
title: 'useAnimatedStyle'
summary: 'useAnimatedStyle is a Reanimated hook returning a style computed on the UI thread from shared values, updating an Animated component without re-rendering.'
aliases:
  - 'Animated style'
related:
  - 'Shared Value'
  - 'Reanimated'
  - 'Animated Component'
  - 'Worklet'
updated: 2026-11-13
---

`useAnimatedStyle` is the [Reanimated](/react-native-glossary/reanimated) hook that connects [shared values](/react-native-glossary/shared-value) to what you see on screen. You give it a function that returns a style object; Reanimated runs that function as a worklet on the UI thread and re-runs it whenever a shared value it reads changes, applying the result directly to the native view.

```tsx
const scale = useSharedValue(1);
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
  opacity: interpolate(scale.value, [1, 1.2], [1, 0.8]),
}));

return <Animated.View style={[styles.card, animatedStyle]} />;
```

The style only works on an [animated component](/react-native-glossary/animated-component): `Animated.View`, `Animated.Text`, or anything wrapped with `createAnimatedComponent`. Passing it to a plain `View` does not animate anything, which is the most common first mistake.

Practices that keep it fast and correct:

- **Keep static styles out.** Put padding, colours and layout in a `StyleSheet` and combine them in an array, as above. The animated function should return only the properties that change.
- **Prefer transform and opacity.** Animating `width`, `height` or `top` triggers layout on every frame. It works, but scale and translate are much cheaper.
- **Use `interpolate` and `interpolateColor`** to map one driving value onto several properties instead of creating a shared value for each.
- **Be careful with React state inside.** Values captured from the component scope are copied into the worklet when the style is created; if they change on every render, the style is rebuilt on every render.

For props that are not styles, such as an SVG path’s `d` or a `TextInput`’s text, the counterpart is `useAnimatedProps`.

For simple state-driven changes, where a prop flips and the view should transition, recent Reanimated versions also offer CSS-style transitions and animations that need no shared value at all. `useAnimatedStyle` remains the tool when motion is driven continuously, by gestures, scroll position or physics.

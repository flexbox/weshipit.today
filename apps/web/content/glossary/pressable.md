---
title: 'Pressable'
summary: 'Pressable is React Native’s core component for handling taps and long presses, exposing a pressed state for feedback; it supersedes the older Touchables.'
aliases:
  - 'Touchable'
  - 'TouchableOpacity'
  - 'onPress'
related:
  - 'Gesture Handler'
  - 'Accessibility Role'
  - 'View Component'
  - 'PanResponder'
updated: 2026-11-13
---

`Pressable` is a core component that detects presses on whatever it wraps. It is the modern replacement for the `Touchable*` family (`TouchableOpacity`, `TouchableHighlight`, `TouchableWithoutFeedback`), which still exist but are no longer where new features land.

Unlike the Touchables, Pressable gives **no visual feedback by default**. You add it yourself, usually by passing a function as `style` or `children` that receives the `pressed` state:

```jsx
<Pressable onPress={save} hitSlop={8} accessibilityRole="button" style={({ pressed }) => [styles.button, pressed && { opacity: 0.6 }]}>
  <Text>Save</Text>
</Pressable>
```

The press lifecycle is `onPressIn`, then either `onPress` or `onLongPress` (after `delayLongPress`, 500 ms by default), then `onPressOut`. Two props solve most “my button is hard to hit” complaints:

- `hitSlop` enlarges the touchable area without changing layout, useful for small icons.
- `pressRetentionOffset` controls how far the finger can drift before the press is cancelled.

On Android, `android_ripple` gives the native Material ripple, which is often a better choice than an opacity change.

A common gotcha is forgetting accessibility. A Pressable is just a View to a [screen reader](/react-native-glossary/screen-reader) until you set an [accessibility role](/react-native-glossary/accessibility-role) such as `button` and, for icon-only buttons, a label.

Pressable is built on the JavaScript responder system, the same one [PanResponder](/react-native-glossary/panresponder) uses. For presses inside complex gesture surfaces, such as a swipeable row or a bottom sheet, the buttons from [Gesture Handler](/react-native-glossary/gesture-handler) coordinate better with native gestures.

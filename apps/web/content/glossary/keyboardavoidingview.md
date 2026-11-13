---
title: 'KeyboardAvoidingView'
summary: 'KeyboardAvoidingView is a React Native core component that moves or shrinks its content when the software keyboard opens, so inputs and buttons stay visible.'
aliases:
  - 'Keyboard handling'
  - 'Keyboard API'
related:
  - 'TextInput'
  - 'ScrollView'
  - 'Safe Area'
  - 'Platform-Specific Code'
updated: 2026-11-13
---

`KeyboardAvoidingView` is a core component that adjusts its own height, padding or position when the on-screen keyboard appears. Without it, a [TextInput](/react-native-glossary/textinput) near the bottom of the screen ends up hidden behind the keyboard.

```jsx
<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={headerHeight}>
  <ChatMessages />
  <Composer />
</KeyboardAvoidingView>
```

The `behavior` prop picks the strategy: `padding` adds bottom padding, `height` shrinks the view, `position` moves it. Which one works depends on the layout and platform, which is why the snippet above uses [platform-specific code](/react-native-glossary/platform-specific-code). `keyboardVerticalOffset` compensates for anything above the view, such as a navigation header; leaving it at zero under a header is the usual cause of the input stopping short of the keyboard.

The two platforms start from different places. iOS never resizes your app for the keyboard, so you always need something. On Android, the window’s `windowSoftInputMode` (often `adjustResize`) traditionally resized the app for you, and adding a KeyboardAvoidingView on top could double the adjustment. Edge-to-edge display on recent Android versions changes that picture, so test on a current device rather than relying on old advice.

The component sits beside the imperative **Keyboard API**: `Keyboard.dismiss()` closes the keyboard, and `Keyboard.addListener('keyboardDidShow', …)` reports its height. The `keyboardWill…` events fire on iOS only.

For chat screens, forms in a [ScrollView](/react-native-glossary/scrollview), and anything that must follow the keyboard frame by frame, many teams use the community library react-native-keyboard-controller, which tracks the keyboard animation natively and behaves consistently on both platforms.

---
title: 'Stack Navigator'
summary: 'A stack navigator shows one screen at a time and pushes new screens on top of a history stack, giving the familiar slide-in and swipe-back behaviour of mobile apps.'
aliases:
  - 'Stack navigation'
  - 'Native stack'
related:
  - 'React Navigation'
  - 'Navigation State'
  - 'Tab Navigator'
  - 'Expo Router'
updated: 2026-11-13
---

A stack navigator manages screens as a last-in, first-out history. Opening a screen pushes it on top; going back pops it off. It is the navigator behind almost every "list → detail" flow in a React Native app, and it is usually the outermost navigator in the tree.

[React Navigation](/react-native-glossary/react-navigation) offers two versions:

- **Native Stack** (`@react-navigation/native-stack`) hands transitions to `UINavigationController` on iOS and fragments on Android, so the swipe-back gesture, large titles and header behave exactly like a native app.
- **Stack** (`@react-navigation/stack`) draws transitions in JavaScript. It is more customisable but costs performance; reach for it only when you need an animation the native one cannot do.

The calls on the `navigation` object behave differently, and mixing them up is a common source of duplicate screens:

```tsx
navigation.navigate('Post', { id: 42 }); // won't duplicate the screen already on top
navigation.push('Post', { id: 43 }); // always adds a new copy
navigation.goBack(); // pop one screen
navigation.popToTop(); // back to the first screen
```

The gotcha that catches most people: screens underneath stay **mounted**. When the user comes back to a screen, its `useEffect` does not run again, because nothing remounted. Use `useFocusEffect` or the `focus` event to refresh data on return, and remember that a deep stack keeps every screen’s state in memory.

In [Expo Router](/react-native-glossary/expo-router), a `Stack` exported from a `_layout.tsx` file is this same native stack, configured by the files beside it. What the stack holds at any moment is visible in the [navigation state](/react-native-glossary/navigation-state).

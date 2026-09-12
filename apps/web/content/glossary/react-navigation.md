---
title: 'React Navigation'
summary: 'React Navigation is the standard navigation library for React Native, providing stack, tab and drawer navigators built on native primitives.'
aliases:
  - 'react-navigation'
related:
  - 'Expo Router'
  - 'Safe Area'
  - 'Core Components'
updated: 2026-09-12
---

React Navigation is the de-facto navigation library for React Native. It supplies the patterns a mobile app needs and that React Native does not ship itself: pushing screens, tab bars, drawers, and the transitions between them.

The building blocks are navigators, which you nest:

- **Native Stack** — push/pop screens using the platform's own navigation controller, so gestures and animations are genuinely native
- **Bottom Tabs** — the standard tab bar
- **Drawer** — a slide-in side menu

```jsx
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Post" component={PostScreen} />
</Stack.Navigator>
```

Newcomers should know two things. Prefer **Native Stack** over the older JS stack — it delegates to `UINavigationController` and Android's fragment system, which is faster and feels correct. And if you are starting fresh on Expo, [Expo Router](/react-native-glossary/expo-router) sits on top of React Navigation and handles the wiring for you.

See [reactnavigation.org](https://reactnavigation.org/).

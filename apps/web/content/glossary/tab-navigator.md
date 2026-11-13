---
title: 'Tab Navigator'
summary: 'A tab navigator switches between a few top-level sections with a persistent tab bar, keeping each section’s screen alive so users can return without losing their place.'
aliases:
  - 'Bottom tabs'
  - 'Tab bar'
  - 'Native tabs'
related:
  - 'React Navigation'
  - 'Stack Navigator'
  - 'Drawer Navigator'
  - 'Safe Area'
updated: 2026-11-13
---

A tab navigator shows a row of tabs, usually at the bottom of the screen, each leading to one top-level section of the app: Home, Search, Profile. Unlike a [stack navigator](/react-native-glossary/stack-navigator), switching tabs does not build history; it swaps which section is visible.

In [React Navigation](/react-native-glossary/react-navigation) the common choice is `createBottomTabNavigator` from `@react-navigation/bottom-tabs`, which draws the bar in React Native components. Both React Navigation and Expo Router have also added options that render the platform’s own tab bar (`UITabBarController` on iOS, Material bottom navigation on Android), so the bar picks up system styling such as iOS translucency for free. Those APIs are newer and have moved between releases, so check the current docs before adopting them.

How tabs behave in practice:

- Screens are **lazy** by default: a tab renders the first time it is opened, then stays mounted. Switching back keeps scroll position and form input.
- Each tab usually contains its own stack, so Home can drill into a detail screen while Profile keeps its own history.
- The bar sits above the home indicator, so it must respect the [safe area](/react-native-glossary/safe-area).

The classic mistake is wanting the tab bar to disappear on detail screens while nesting a stack inside each tab. The documented fix is to invert the structure: put the tab navigator as one screen of a root stack, and push detail screens on that root stack so they cover the bar naturally.

Keep tabs to roughly three to five destinations. Anything beyond that tends to move into a "More" screen or a [drawer](/react-native-glossary/drawer-navigator).

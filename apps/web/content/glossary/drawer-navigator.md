---
title: 'Drawer Navigator'
summary: 'A drawer navigator hides the app’s main destinations in a side panel that slides in from the screen edge, opened by a swipe or a menu button in the header.'
aliases:
  - 'Side menu'
  - 'Drawer'
related:
  - 'React Navigation'
  - 'Tab Navigator'
  - 'Gesture Handler'
  - 'Reanimated'
updated: 2026-11-13
---

A drawer navigator renders a panel, usually on the left, that slides over or pushes aside the current screen to list the app’s sections. It is the "hamburger menu" pattern, common on Android and in apps with more destinations than a [tab bar](/react-native-glossary/tab-navigator) can hold.

In [React Navigation](/react-native-glossary/react-navigation) it comes from `@react-navigation/drawer`. The drawer is driven by gestures and animation running on the UI thread, so it depends on [Gesture Handler](/react-native-glossary/gesture-handler) and [Reanimated](/react-native-glossary/reanimated); a missing or mismatched version of either is the usual reason a fresh drawer crashes on launch.

```tsx
const Drawer = createDrawerNavigator();

<Drawer.Navigator screenOptions={{ drawerType: 'front' }}>
  <Drawer.Screen name="Inbox" component={InboxScreen} />
  <Drawer.Screen name="Settings" component={SettingsScreen} />
</Drawer.Navigator>;
```

Useful details:

- `drawerType` chooses the motion: `front` overlays the screen, `slide` and `back` move the content, and `permanent` keeps the drawer always visible, which suits tablets and wide layouts.
- Open it from code with `navigation.openDrawer()` or `toggleDrawer()`, typically from a header button.
- On Android the hardware back button closes an open drawer before it navigates back.
- Replace the default list with `drawerContent` to add a profile header or sign-out button.

The common gotcha is gesture conflict. The edge swipe that opens the drawer competes with horizontal carousels, maps and the iOS swipe-back gesture of a nested stack. Narrow the swipe area or disable swiping on screens that need horizontal gestures.

The design caveat is discoverability: items hidden behind a menu get used less than visible tabs, so keep the most frequent destinations out of the drawer.

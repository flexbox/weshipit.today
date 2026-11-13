---
title: 'StatusBar'
summary: 'StatusBar is React Native’s component and API for controlling the system status bar, setting light or dark icons, hiding it, and on older Android its background colour.'
aliases:
  - 'Status bar'
related:
  - 'Safe Area'
  - 'Appearance'
  - 'Modal'
  - 'Expo'
updated: 2026-11-13
---

`StatusBar` controls the strip at the top of the screen that shows the time, battery and signal. React Native offers it both as a component you render and as static methods you call imperatively.

```jsx
<StatusBar barStyle="light-content" hidden={false} />;
// or imperatively
StatusBar.setBarStyle('dark-content', true);
```

The main prop is `barStyle`: `light-content` for white icons on a dark background, `dark-content` for dark icons on a light one, or `default`. Other props include `hidden`, `animated` and `showHideTransition`.

Two Android-only props, `backgroundColor` and `translucent`, come from the era when the status bar was a coloured band above the app. Recent Android versions draw apps **edge to edge**, behind the status bar, so those props no longer have the effect old tutorials promise. Treat the status bar as transparent on both platforms and pad your content with [safe area](/react-native-glossary/safe-area) insets instead. `StatusBar.currentHeight` exists on Android only and is no substitute for insets.

The component behaves like a stack. You can render several `<StatusBar>` elements in different screens, and the most recently mounted one wins; when it unmounts, the previous one’s props take over again. That is convenient per screen, but with tab and stack navigators some screens stay mounted when hidden, so the bar does not change when you expect. React Navigation’s docs suggest rendering it only in the focused screen.

The most common bug is unreadable icons: dark icons on a dark header after switching to dark mode. Tie `barStyle` to the colour scheme from [Appearance](/react-native-glossary/appearance), or use `expo-status-bar`, whose `style="auto"` picks the contrasting style for you. Remember that a [Modal](/react-native-glossary/modal) may need its own status bar settings.

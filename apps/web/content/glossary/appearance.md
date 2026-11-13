---
title: 'Appearance'
summary: 'Appearance is the React Native API, with its useColorScheme hook, that reports whether the user has chosen light or dark mode and notifies the app when that changes.'
aliases:
  - 'Dark mode'
  - 'useColorScheme'
  - 'Color scheme'
related:
  - 'Design Tokens'
  - 'StatusBar'
  - 'App Config'
  - 'Info.plist'
updated: 2026-11-13
---

`Appearance` is the core API for the system colour scheme. `Appearance.getColorScheme()` returns `'light'` or `'dark'` (or nothing when no preference is available), and the `useColorScheme()` hook gives the same value inside components, re-rendering when the user switches mode.

```tsx
const scheme = useColorScheme();
const colors = scheme === 'dark' ? darkTheme : lightTheme;
```

React Native does **not** theme your app automatically. Unlike system UI, your own Views and Text keep whatever colours you gave them, so dark mode means choosing colours from the scheme yourself, usually through a theme context and [design tokens](/react-native-glossary/design-tokens) rather than ternaries scattered through every style.

`Appearance.setColorScheme()` lets an app override the system choice, which is how an in-app “Light / Dark / System” setting can also switch native elements such as alerts, date pickers and the keyboard to match.

The most common “dark mode doesn’t work” report is configuration, not code. The hook always returns `light` when the app has opted out of dark mode at the native level:

- On iOS, `UIUserInterfaceStyle` set to `Light` in [Info.plist](/react-native-glossary/info-plist) locks the app to light.
- In Expo, the `userInterfaceStyle` field in [app config](/react-native-glossary/app-config) must be `automatic` for the app to follow the system; with `light` it never changes. Android may also need the `expo-system-ui` package for that setting to apply.

Other things to remember:

- Update the [status bar](/react-native-glossary/statusbar) style with the scheme, or icons disappear against dark headers.
- Images and illustrations may need dark variants, not just backgrounds.
- Test switching while the app is running, not only at launch, since some screens cache styles computed at import time.

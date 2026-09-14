---
title: 'Safe Area'
summary: 'The safe area is the part of the screen not covered by the notch, status bar, home indicator or rounded corners. Content must be inset to stay usable.'
aliases:
  - 'SafeAreaView'
  - 'Insets'
  - 'Notch'
related:
  - 'Flexbox'
  - 'Core Components'
  - 'React Navigation'
  - 'Host Platform'
updated: 2026-09-12
---

The safe area is the region of the screen that system UI does not obscure — everything inside the notch or Dynamic Island, the status bar, the home indicator, and rounded display corners.

Ignore it and your header slides under the clock while your bottom button sits beneath the home indicator. The fix is to inset content by the device's safe area insets.

The standard tool is **react-native-safe-area-context**, which works on both platforms and exposes the values as a hook:

```jsx
const insets = useSafeAreaInsets();
<View style={{ paddingTop: insets.top }} />;
```

Two things newcomers should know. React Native's built-in `SafeAreaView` is **iOS-only** and applies padding bluntly, so the community package is the usual choice. And insets are dynamic — they change on rotation and differ per device — so hardcoding `paddingTop: 44` breaks on the next phone.

[React Navigation](/react-native-glossary/react-navigation) applies safe-area handling to its headers and tab bars automatically, so you mostly deal with this in custom full-screen layouts.

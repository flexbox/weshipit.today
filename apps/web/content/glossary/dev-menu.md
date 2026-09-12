---
title: 'Dev Menu'
summary: 'The dev menu is the in-app debugging panel available in development builds, offering reload, the element inspector, performance monitor and debugger connection.'
aliases:
  - 'Developer menu'
related:
  - 'Fast Refresh'
  - 'Development Build'
  - 'Metro'
updated: 2026-09-12
---

The dev menu is the overlay React Native shows in development builds, giving you the debugging controls that do not belong in a production app.

Open it with:

- **iOS Simulator** — <kbd>Cmd</kbd> + <kbd>D</kbd>
- **Android emulator** — <kbd>Cmd</kbd> + <kbd>M</kbd> (macOS) or <kbd>Ctrl</kbd> + <kbd>M</kbd>
- **A physical device** — shake it, or run `adb shell input keyevent 82` on Android

What is inside:

- **Reload** — re-fetch the [bundle](/react-native-glossary/javascript-bundle) from [Metro](/react-native-glossary/metro), for when [Fast Refresh](/react-native-glossary/fast-refresh) gets out of sync
- **Open Debugger** — attach React Native DevTools
- **Element Inspector** — tap any view to see its component, props, and computed styles
- **Performance Monitor** — a live overlay of JS and UI frame rates
- **Toggle Fast Refresh**

The menu is stripped from release builds, so it is not a leak risk. If it never appears, you are almost certainly running a release build or a [development build](/react-native-glossary/development-build) that is not connected to Metro.

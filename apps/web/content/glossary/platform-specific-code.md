---
title: 'Platform-Specific Code'
summary: 'Platform-specific code lets one codebase behave differently per platform, through the Platform module or file extensions such as Button.ios.tsx that Metro resolves automatically.'
aliases:
  - 'Platform module'
  - 'Platform.select'
related:
  - 'Host Platform'
  - 'Metro'
  - 'Core Components'
  - 'StyleSheet'
updated: 2026-09-12
---

React Native shares most code across platforms, but not all of it should be shared — a shadow, a haptic, or a date picker often needs to differ. There are two supported mechanisms.

**The `Platform` module**, for small branches:

```jsx
import { Platform } from 'react-native';

const styles = {
  padding: Platform.OS === 'ios' ? 12 : 16,
  ...Platform.select({ ios: { shadowOpacity: 0.1 }, android: { elevation: 4 } }),
};
```

**Platform file extensions**, for whole components. Create `Picker.ios.tsx` and `Picker.android.tsx`, then import `./Picker` — [Metro](/react-native-glossary/metro) picks the right file at bundle time, so the other platform's code is never shipped.

`Platform.Version` gives the OS version when you need to gate on an API level.

The judgement call for newcomers: reach for this when the _platform convention_ genuinely differs, not to paper over a layout bug. Excessive branching is how a cross-platform codebase quietly becomes two codebases. See [platform-specific code](https://reactnative.dev/docs/platform-specific-code).

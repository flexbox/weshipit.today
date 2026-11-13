---
title: 'BackHandler'
summary: 'BackHandler is the React Native API for intercepting the Android back button and back gesture, letting a screen close a sheet or confirm before leaving.'
aliases:
  - 'Android back button'
  - 'Hardware back'
related:
  - 'React Navigation'
  - 'Stack Navigator'
  - 'Modal'
  - 'Platform-Specific Code'
updated: 2026-11-13
---

`BackHandler` is the core API for responding to Android’s system back action, whether it comes from the navigation bar button or the edge-swipe gesture. iOS has no equivalent system back event, so this is Android-specific behaviour.

You subscribe to `hardwareBackPress`. Handlers run in reverse order of registration, most recent first, and the return value decides what happens next:

- return `true` — you handled it; stop here.
- return `false` — pass it on to the previous handler, and ultimately the default behaviour, which closes the activity.

```tsx
useEffect(() => {
  const sub = BackHandler.addEventListener('hardwareBackPress', () => {
    if (sheetOpen) {
      closeSheet();
      return true;
    }
    return false;
  });
  return () => sub.remove();
}, [sheetOpen]);
```

`BackHandler.exitApp()` closes the app, though Google’s guidelines discourage custom exit flows.

In practice you rarely need it for navigation. [React Navigation](/react-native-glossary/react-navigation) and Expo Router already wire back to “pop the current screen” in a [stack navigator](/react-native-glossary/stack-navigator), and a core [Modal](/react-native-glossary/modal) routes back to its `onRequestClose` prop instead. BackHandler is for what sits outside those: closing a custom bottom sheet, leaving a selection mode, or warning about unsaved changes.

Common mistakes:

- **Registering globally in a screen that stays mounted.** In stack and tab navigators, unfocused screens are still mounted, so their handlers keep swallowing back presses. Register inside React Navigation’s `useFocusEffect` so the handler exists only while the screen is focused.
- **Forgetting to remove the subscription**, which leaves stale handlers that capture old state.
- **Always returning `true`.** That traps the user on a screen with no way out via back, a frustrating experience.

For unsaved-changes prompts, React Navigation’s `beforeRemove` event is often a better fit, because it also catches header buttons and iOS swipe-back, not just Android’s back action.

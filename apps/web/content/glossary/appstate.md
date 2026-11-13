---
title: 'AppState'
summary: 'AppState is the React Native API that reports whether the app is active in the foreground, inactive, or in the background, and emits an event whenever that changes.'
aliases:
  - 'App state'
  - 'Background and foreground'
related:
  - 'Background Tasks'
  - 'TanStack Query'
  - 'Push Notifications'
  - 'useEffect'
updated: 2026-11-13
---

`AppState` is the core API for knowing whether your app is in the foreground. `AppState.currentState` holds the current value, and a `change` listener fires on every transition.

The states you will see:

- `active` — in the foreground and receiving input.
- `background` — the user switched away, went home or locked the phone.
- `inactive` — **iOS only**, a brief in-between state: pulling down Notification Centre, the app switcher, an incoming call, a system permission dialog.

```tsx
useEffect(() => {
  const sub = AppState.addEventListener('change', (next) => {
    if (next === 'active') refreshData();
  });
  return () => sub.remove();
}, []);
```

Typical uses are refreshing data when the user returns, pausing video or timers when they leave, locking a banking screen, or flushing analytics. Data libraries such as [TanStack Query](/react-native-glossary/tanstack-query) can wire AppState into their “refetch on focus” behaviour, since React Native has no browser `visibilitychange` event.

Common mistakes:

- **Treating `inactive` as `background`.** A system permission prompt makes iOS apps inactive, so logging out on `inactive` logs users out mid-flow. Decide which transitions you actually care about.
- **Expecting code to keep running in the background.** Once backgrounded, the OS may suspend the JavaScript thread within seconds; timers and pending work stop. Real background work needs the platform’s [background task](/react-native-glossary/background-tasks) mechanisms.
- **Forgetting cleanup.** Not removing the subscription in the [useEffect](/react-native-glossary/useeffect) cleanup leaks listeners every time the component remounts.

AppState describes the whole app, not one screen. To react when a particular screen gains or loses focus inside the app, use your navigator’s focus events instead.

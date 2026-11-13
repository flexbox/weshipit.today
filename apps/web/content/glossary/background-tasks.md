---
title: 'Background Tasks'
summary: 'Background tasks let a React Native app run short pieces of work while it is not on screen, scheduled by iOS and Android rather than by your own timers.'
aliases:
  - 'Background fetch'
  - 'Background processing'
related:
  - 'AppState'
  - 'Headless JS'
  - 'Push Notifications'
  - 'JavaScript Thread'
updated: 2026-11-13
---

A background task is work your React Native app performs while it is not in the foreground: syncing data, uploading a queued photo, refreshing content before the user opens the app. Mobile operating systems aggressively suspend apps to save battery, so background work only happens on the OS’s terms.

When the app moves to the background, [AppState](/react-native-glossary/appstate) reports it and, within seconds, the [JavaScript thread](/react-native-glossary/javascript-thread) is effectively frozen. `setInterval` stops firing. To run later you must register work with the platform scheduler:

- **iOS** uses `BGTaskScheduler`, with short app refresh tasks and longer processing tasks. The system decides when to wake you based on battery, network and how often the user opens the app.
- **Android** uses WorkManager, where periodic work runs at most every 15 minutes and can be deferred further by Doze and manufacturer battery savers. [Headless JS](/react-native-glossary/headless-js) is the older React Native mechanism for running JavaScript without a UI.

In practice you reach these through a library: Expo’s `expo-background-task` with `expo-task-manager`, or community packages such as `react-native-background-fetch`. Separate APIs exist for specific jobs like location tracking, audio playback and large downloads, which each have their own platform modes.

Common gotchas:

- **Timing is a hint, not a promise.** You cannot schedule "every five minutes", and iOS may not run your task for hours.
- **A force-quit app on iOS** generally does not get background refresh until the user opens it again.
- **Define tasks at module top level**, outside components, because the OS may launch your app headlessly and no screen will mount.
- For anything time-sensitive, send a [push notification](/react-native-glossary/push-notifications) from your server instead of hoping a background task wakes up.

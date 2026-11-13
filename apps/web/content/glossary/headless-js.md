---
title: 'Headless JS'
summary: 'Headless JS is an Android-only React Native feature that runs a JavaScript task from a native service while no UI is showing, for work such as syncing data.'
aliases:
  - 'Background JavaScript'
related:
  - 'Background Tasks'
  - 'Push Notifications'
  - 'AppState'
  - 'JavaScript Thread'
updated: 2026-11-13
---

Headless JS is a React Native API for running JavaScript on Android without rendering any screen. Native code starts an Android service, the service asks React Native to run a named task, and your JavaScript function executes and resolves, all while the app may be in the background.

On the JavaScript side you register an async function under a name, next to your app registration:

```js
import { AppRegistry } from 'react-native';

AppRegistry.registerHeadlessTask('SyncData', () => async (data) => {
  await uploadPendingChanges(data);
});
```

On the native side you write a service extending `HeadlessJsTaskService` that returns a `HeadlessJsTaskConfig` with the task name, the data to pass, a timeout and whether the task may run while the app is in the foreground. Native code — a broadcast receiver for connectivity changes, a [push notification](/react-native-glossary/push-notifications) handler, a scheduled job — then starts that service.

Things that trip people up:

- **It is Android-only.** iOS has no equivalent mechanism; background work there goes through the platform’s own APIs, usually via libraries built for [background tasks](/react-native-glossary/background-tasks).
- **No UI.** The task cannot render; it can update storage, call APIs or schedule a notification.
- **Foreground runs are refused by default.** Unless the config allows it, starting the task while the app is visible fails, which surprises people testing with the app open.
- **Android decides what is allowed.** Modern Android versions restrict background services heavily, so long-running work has to be a foreground service with a visible notification or be scheduled through WorkManager. Headless JS does not exempt you from those rules.
- **Keep it short.** Tasks run on the [JavaScript thread](/react-native-glossary/javascript-thread) and are killed at the timeout. A task that never resolves holds the service and drains the battery.

Most apps never write this by hand. Libraries for background fetch, geolocation and notifications use Headless JS internally to deliver events to JavaScript when the app is not open. See [Headless JS](https://reactnative.dev/docs/headless-js-android).

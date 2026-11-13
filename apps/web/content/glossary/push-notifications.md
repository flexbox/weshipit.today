---
title: 'Push Notifications'
summary: 'Push notifications are messages a server sends to a device through Apple’s APNs or Google’s FCM, shown by the OS even when the React Native app is closed.'
aliases:
  - 'APNs'
  - 'FCM'
  - 'expo-notifications'
related:
  - 'App Permissions'
  - 'Entitlements'
  - 'Firebase'
  - 'Development Build'
  - 'Background Tasks'
updated: 2026-11-13
---

Push notifications are messages sent from your server to a user’s device and displayed by the operating system, even when your React Native app is not running. Your server never talks to the phone directly: it goes through the platform’s delivery service.

- **APNs** (Apple Push Notification service) delivers to iPhones and iPads.
- **FCM** (Firebase Cloud Messaging) delivers to Android devices with Google Play Services.

The flow is always the same. The app asks for permission, registers with the platform, and receives a **device token**. You send that token to your backend, which later calls APNs or FCM with the token and a payload.

In React Native the usual options are `expo-notifications`, which works with Expo’s push service (one `ExponentPushToken` that fans out to APNs and FCM) or with raw native tokens, and `@react-native-firebase/messaging`, often paired with Notifee for rich local display.

```ts
const { status } = await Notifications.requestPermissionsAsync();
const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
```

Gotchas that cost people days:

- **iOS needs the Push Notifications capability**, which adds the `aps-environment` [entitlement](/react-native-glossary/entitlements) and must be in your provisioning profile, plus an APNs key uploaded to whoever sends the pushes.
- **Android 13 and later** require the runtime notification [permission](/react-native-glossary/app-permissions); older versions granted it silently.
- **Expo Go is not a reliable test bed**: remote push on Android is no longer supported there. Use a [development build](/react-native-glossary/development-build).
- **Foreground behaviour is opt-in.** By default a notification arriving while the app is open may not be shown; you decide with a handler such as `setNotificationHandler`.
- Tokens change. Refresh and re-send them on every launch rather than storing one forever.

See the [Expo push notifications guide](https://docs.expo.dev/push-notifications/overview/).

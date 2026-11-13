---
title: 'App Permissions'
summary: 'App permissions are the user approvals iOS and Android require before an app can use sensitive features such as the camera, location, contacts or notifications.'
aliases:
  - 'Runtime permissions'
  - 'Permission prompt'
related:
  - 'Info.plist'
  - 'AndroidManifest.xml'
  - 'Config Plugin'
  - 'Linking API'
  - 'Push Notifications'
updated: 2026-11-13
---

App permissions are the approvals a user grants before a React Native app can touch sensitive data or hardware: camera, microphone, photos, location, contacts, Bluetooth, notifications. Both platforms need a declaration in native config plus a request at runtime, and they handle each differently.

**iOS** requires a usage description string in [Info.plist](/react-native-glossary/info-plist), such as `NSCameraUsageDescription`, explaining why you need access. If the key is missing, the app crashes the moment it asks. The system shows the prompt once; after a denial, the only way back is the Settings app.

**Android** requires each permission in [AndroidManifest.xml](/react-native-glossary/android-manifest). Normal permissions such as internet access are granted at install. Dangerous ones, such as camera or fine location, must also be requested at runtime, and since Android 13 notifications are one of them. After repeated denials the system stops showing the dialog and silently returns "denied".

In React Native you request permissions through the module that uses the feature (Expo modules expose `requestPermissionsAsync`), through the core `PermissionsAndroid` API, or through the cross-platform `react-native-permissions` library. With Expo, the native declarations are usually added by each library’s [config plugin](/react-native-glossary/config-plugin).

```ts
import * as Location from 'expo-location';
import { Linking } from 'react-native';

const { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') Linking.openSettings();
```

Practical advice:

- Ask in context, right before the feature is used, never in a wall of prompts at launch. A denial on iOS is close to permanent.
- Always handle "denied" and "limited" (iOS photo access can be partial) and offer a path to Settings with the [Linking API](/react-native-glossary/linking-api).
- Write honest, specific usage strings. Vague ones are a frequent App Store review rejection.

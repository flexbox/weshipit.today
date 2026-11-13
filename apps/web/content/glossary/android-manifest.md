---
title: 'AndroidManifest.xml'
summary: 'AndroidManifest.xml declares an Android app’s identity to the OS: its activities, permissions, intent filters for deep links, and how the main activity behaves.'
aliases:
  - 'Android manifest'
related:
  - 'App Permissions'
  - 'Android App Links'
  - 'Info.plist'
  - 'Config Plugin'
updated: 2026-11-13
---

`AndroidManifest.xml` is the file that describes an Android app to the operating system. In a React Native project it lives at `android/app/src/main/AndroidManifest.xml` and declares the main activity that hosts your React Native views, the permissions the app may request and which URLs or intents it responds to. It is the Android counterpart of iOS’s [Info.plist](/react-native-glossary/info-plist).

Edits React Native developers commonly make:

- **Permissions** — a `<uses-permission>` line for the camera, location or notifications. Dangerous permissions still need a runtime request; see [App Permissions](/react-native-glossary/app-permissions).
- **Intent filters** — so the app opens for a custom scheme or verified [Android App Links](/react-native-glossary/android-app-links).
- **`android:windowSoftInputMode`** — controls whether the window resizes when the keyboard opens, which affects every keyboard-handling bug you will chase.
- **`android:configChanges`** — the React Native template lists orientation, screen size and similar changes so the activity is not destroyed and your JavaScript state survives a rotation.

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

A frequent surprise is manifest merging. Every library ships its own manifest, and Gradle merges them into yours at build time, so the final app can request permissions you never wrote. Inspect the merged manifest in Android Studio when Google Play flags a permission you did not expect. You can strip one with `tools:node="remove"`.

Another gotcha: since Android 12, any activity with an intent filter must set `android:exported` explicitly, or the build fails.

In Expo projects using Continuous Native Generation, the manifest is generated from `app.json` (`android.permissions`, `android.intentFilters`) and [config plugins](/react-native-glossary/config-plugin), so hand edits are lost on the next prebuild.

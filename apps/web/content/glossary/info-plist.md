---
title: 'Info.plist'
summary: 'Info.plist is the iOS property list holding an app’s configuration: display name, version, URL schemes, fonts and the permission usage messages users see.'
aliases:
  - 'Property list'
  - 'plist'
related:
  - 'App Permissions'
  - 'AndroidManifest.xml'
  - 'Entitlements'
  - 'Privacy Manifest'
  - 'App Config'
updated: 2026-11-13
---

`Info.plist` is an XML property list in `ios/YourApp/` that iOS reads to learn about your app before any code runs. It holds the display name, version numbers, supported orientations, URL schemes, custom fonts and the explanations shown in permission prompts. Android keeps similar information in [AndroidManifest.xml](/react-native-glossary/android-manifest).

Keys React Native developers touch most:

- **Usage descriptions** such as `NSCameraUsageDescription` or `NSLocationWhenInUseUsageDescription` — the sentence iOS shows when asking for a permission.
- **`CFBundleShortVersionString` and `CFBundleVersion`** — the marketing version and build number.
- **`CFBundleURLTypes`** — custom URL schemes for deep links.
- **`LSApplicationQueriesSchemes`** — schemes `Linking.canOpenURL` is allowed to check.
- **`UIAppFonts`** — font files to register.

```xml
<key>NSCameraUsageDescription</key>
<string>Scan receipts to add expenses.</string>
```

The gotcha that bites everyone once: if your code, or a library, touches a protected resource without the matching usage description, iOS terminates the app immediately. App Review also rejects vague messages like “needs camera”, so write what the feature actually does. See [App Permissions](/react-native-glossary/app-permissions) for the runtime request itself.

Don’t confuse `Info.plist` with neighbouring files. Capabilities such as push notifications or associated domains live in the [entitlements](/react-native-glossary/entitlements) file, and the data-collection declarations Apple requires live in `PrivacyInfo.xcprivacy`, the [privacy manifest](/react-native-glossary/privacy-manifest).

In Expo projects, set these keys under `ios.infoPlist` in your app config instead of editing the file, because Continuous Native Generation regenerates it. Many Expo libraries add their own usage descriptions through config plugins, with defaults worth overriding.

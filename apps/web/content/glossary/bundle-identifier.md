---
title: 'Bundle Identifier'
summary: 'A bundle identifier is the unique reverse-DNS ID, such as com.acme.shop, that iOS, Android and the app stores use to tell your app apart from every other app.'
aliases:
  - 'Bundle ID'
  - 'Application ID'
  - 'Package name'
related:
  - 'Code Signing'
  - 'App Store Connect'
  - 'Google Play Console'
  - 'App Config'
updated: 2026-11-13
---

A bundle identifier is the permanent, unique ID of your app, written in reverse-domain style such as `com.acme.shop`. iOS calls it the bundle identifier; Android calls it the application ID, often still called the package name. Both platforms and both stores use it to decide whether two builds are the same app.

Where it is set in a React Native project:

- **iOS** — `PRODUCT_BUNDLE_IDENTIFIER` in the Xcode build settings.
- **Android** — `applicationId` in `android/app/build.gradle`.
- **Expo** — `ios.bundleIdentifier` and `android.package` in your [app config](/react-native-glossary/app-config).

```json
{
  "expo": {
    "ios": { "bundleIdentifier": "com.acme.shop" },
    "android": { "package": "com.acme.shop" }
  }
}
```

Why it matters: once you upload a build to [App Store Connect](/react-native-glossary/app-store-connect) or the [Google Play Console](/react-native-glossary/google-play-console), the identifier is locked to that listing. Changing it later means publishing a brand-new app, losing reviews, downloads and existing users’ upgrade path. Pick it deliberately before the first upload.

It also ties into other systems. iOS provisioning profiles and push certificates are issued per bundle ID, so [code signing](/react-native-glossary/code-signing) fails when the two disagree. Firebase config files, OAuth redirect setups and Universal Links all reference it too.

Common confusions:

- On Android, `applicationId` and the Gradle `namespace` (the Kotlin package of your source code) are separate. You can change the store ID without renaming source folders.
- Installing a debug and a release build side by side requires different IDs, often done with a suffix such as `.dev`.
- The iOS and Android IDs do not have to match, but keeping them identical saves confusion in every dashboard.

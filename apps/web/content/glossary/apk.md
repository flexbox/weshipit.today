---
title: 'APK'
summary: 'An APK (.apk) is the Android package file that installs directly on a device or emulator, holding the compiled code, resources, native libraries and JavaScript bundle.'
aliases:
  - 'Android package'
  - '.apk'
related:
  - 'Android App Bundle'
  - 'ADB'
  - 'Release Build'
  - 'Android Emulator'
updated: 2026-11-13
---

An APK is the installable unit of Android: a ZIP archive containing compiled Kotlin and Java code (`classes.dex`), resources, the binary `AndroidManifest.xml`, native libraries under `lib/<abi>/`, and in a React Native release build the JavaScript bundle under `assets/`. Every Android app on a device was installed as one or more APKs.

For React Native developers APKs are the everyday testing format, because they install directly:

```bash
cd android && ./gradlew assembleRelease
adb install app/build/outputs/apk/release/app-release.apk
```

That makes them the right choice for sharing a build with a tester outside the Play Store, installing on an [emulator](/react-native-glossary/android-emulator) in CI for end-to-end tests, or distributing internally. With EAS, setting `"buildType": "apk"` in an Android build profile produces one instead of the default bundle.

For Google Play itself you upload an [Android App Bundle](/react-native-glossary/android-app-bundle), and Play generates the APKs.

Things that surprise people:

- **A debug APK may contain no JavaScript.** It expects to fetch the bundle from Metro, so on a device without a Metro connection it shows a red error screen. Build a release variant to share.
- **Universal APKs are large.** They include native libraries for every CPU architecture. Limiting `reactNativeArchitectures` in `gradle.properties` speeds up local builds, but only ship what real devices need.
- **Signatures must match to update.** Installing a release APK over a debug one fails with `INSTALL_FAILED_UPDATE_INCOMPATIBLE`, because they are signed with different keys. Uninstall first with [ADB](/react-native-glossary/adb).
- The template’s release build is signed with the debug keystore until you configure your own, which is fine for testing but never for a store.

---
title: 'Android App Bundle'
summary: 'An Android App Bundle (.aab) is the format you upload to Google Play, which then generates smaller device-specific APKs for each user instead of one universal file.'
aliases:
  - 'AAB'
  - '.aab'
related:
  - 'APK'
  - 'Google Play Console'
  - 'Release Build'
  - 'Bundle Size'
updated: 2026-11-13
---

An Android App Bundle is the file a React Native app uploads to Google Play. It contains all of the app’s compiled code, resources and native libraries, but it is not installable on its own. Google Play uses it to build optimised [APKs](/react-native-glossary/apk) for each device that downloads the app. New apps on Play have been required to use bundles since 2021.

The benefit matters more for React Native than for many native apps. The app ships native libraries, Hermes and the framework itself among them, for several CPU architectures. From a bundle, Play delivers only the architecture, screen density and languages the device needs, which noticeably cuts download size compared with a universal APK. See [bundle size](/react-native-glossary/bundle-size).

You build one with the release Gradle task, or `eas build` for Android, which produces bundles by default:

```bash
cd android && ./gradlew bundleRelease
# → android/app/build/outputs/bundle/release/app-release.aab
```

The bundle is signed with your **upload key**. With Play App Signing, Google verifies that signature, then re-signs the generated APKs with the app signing key it holds. Losing the upload key is recoverable through Play Console; it is not the end of the app.

Common confusion:

- **You cannot install an .aab by dragging it onto a phone.** To test exactly what Play would deliver, use Google’s `bundletool` to generate and install APKs from it, or upload to an [internal testing track](/react-native-glossary/internal-testing-track).
- Bundles are a Play format. Sideloading, enterprise distribution and some other stores still expect an APK, so keep a build profile for that.
- The JavaScript bundle inside is unrelated to the term "App Bundle"; it is just one asset among many.

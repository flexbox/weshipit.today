---
title: 'Gradle'
summary: 'Gradle is the build system that compiles the Android side of a React Native app, resolving native dependencies and producing the APK or AAB you install or ship.'
aliases:
  - 'build.gradle'
  - 'Gradle wrapper'
related:
  - 'Android Studio'
  - 'Android App Bundle'
  - 'APK'
  - 'Autolinking'
  - 'Release Build'
updated: 2026-11-13
---

Gradle is the build tool Android uses, and in a React Native project it compiles everything under `android/`: your app module, React Native, Hermes and the Android half of each native library. It plays the role on Android that Xcode’s build system plays on iOS.

The files you will meet:

- **`android/app/build.gradle`** — the app module: `applicationId`, `versionCode`, `versionName`, signing configs and dependencies.
- **`android/build.gradle` and `settings.gradle`** — project-wide setup, including where [autolinking](/react-native-glossary/autolinking) plugs in native libraries.
- **`android/gradle.properties`** — flags such as `hermesEnabled`, `newArchEnabled` and the JVM memory Gradle may use.
- **`gradlew` and `gradle/wrapper/`** — the Gradle wrapper, which downloads the exact Gradle version the project expects.

Always run `./gradlew`, never a globally installed `gradle`. The wrapper pins the version, and React Native, the Android Gradle Plugin and Gradle must be compatible with each other.

```bash
cd android
./gradlew assembleDebug    # debug APK
./gradlew bundleRelease    # release AAB for Google Play
```

`npx react-native run-android` and `npx expo run:android` call these tasks for you. The output lands in `android/app/build/outputs/` as an [APK](/react-native-glossary/apk) or [Android App Bundle](/react-native-glossary/android-app-bundle).

Gotchas worth knowing:

- The first build is slow because Gradle downloads dependencies and compiles every architecture. Later builds reuse its cache and daemon.
- “Could not resolve” errors usually mean a version mismatch between a library and your React Native version, not a network problem.
- `./gradlew clean` fixes stale outputs, but deleting `android/.gradle` and `android/app/build` is sometimes needed after an upgrade.
- In Expo projects using Continuous Native Generation, edit Gradle settings through `app.json` or config plugins, because `android/` is regenerated.

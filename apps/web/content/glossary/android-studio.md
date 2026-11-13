---
title: 'Android Studio'
summary: 'Android Studio is Google’s official Android IDE; React Native developers use it to install the Android SDK, manage emulators, read Logcat and debug native builds.'
aliases:
  - 'Android IDE'
related:
  - 'Android Emulator'
  - 'Gradle'
  - 'ADB'
  - 'AndroidManifest.xml'
updated: 2026-11-13
---

Android Studio is Google’s integrated development environment for Android, built on IntelliJ IDEA. Most React Native developers write their JavaScript elsewhere, but still need Android Studio because it is the easiest way to install and manage the pieces an Android build depends on.

What it gives a React Native developer:

- **SDK Manager** — installs Android SDK platforms, build tools, the NDK and command-line tools that [Gradle](/react-native-glossary/gradle) needs.
- **Device Manager** — creates and launches virtual devices for the [Android Emulator](/react-native-glossary/android-emulator).
- **Logcat** — the full native log, including the Java or Kotlin stack trace when an app crashes before JavaScript even loads.
- **Gradle sync and build output** — clearer errors than the terminal when a native dependency fails to compile.
- **Profilers and the Layout Inspector** — for native memory, CPU and view hierarchy investigation.

The usual mistake is opening the wrong folder. Open the `android/` directory of your project, not the repository root; otherwise Android Studio does not see a Gradle project and offers nothing useful.

Environment setup is the other source of pain. The React Native CLI and Expo find the SDK through the `ANDROID_HOME` environment variable and expect `platform-tools` (which contains [ADB](/react-native-glossary/adb)) on your `PATH`. Android Studio installs the SDK but does not set these variables for your shell. Builds also need a compatible JDK, so follow the version your React Native release documents rather than whatever Java happens to be installed.

You do not need Android Studio to ship: EAS Build or a CI machine can build with command-line tools alone. But when a release build crashes on launch, Logcat in Android Studio is usually the fastest way to see why. The official [Android Studio documentation](https://developer.android.com/studio) covers installation per platform.

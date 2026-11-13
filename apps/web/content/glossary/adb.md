---
title: 'ADB'
summary: 'ADB (Android Debug Bridge) is the command-line tool that talks to Android devices and emulators to install apps, read logs, forward ports and open a shell.'
aliases:
  - 'Android Debug Bridge'
  - 'adb reverse'
related:
  - 'Android Emulator'
  - 'Android Studio'
  - 'Metro'
  - 'APK'
updated: 2026-11-13
---

ADB, the Android Debug Bridge, is the command-line tool from the Android SDK platform-tools that connects your computer to Android devices and the [Android Emulator](/react-native-glossary/android-emulator). Every time a React Native app is installed or launched on Android during development, ADB is doing the work underneath.

It has three parts: the `adb` client you type commands into, a background server on your machine, and a daemon running on each device. The commands a React Native developer uses most:

```bash
adb devices                      # list connected devices and emulators
adb reverse tcp:8081 tcp:8081    # let the device reach Metro on your machine
adb logcat                       # stream native logs, including crashes
adb install app-release.apk      # sideload a build
adb shell input keyevent 82      # open the Dev Menu on a device
```

`adb reverse` matters most. A phone’s `localhost` is the phone itself, so without that port mapping the app cannot download the bundle from [Metro](/react-native-glossary/metro). The CLI runs it automatically, but it resets when a USB cable is reconnected or the server restarts; rerun it when you hit "could not connect to development server". With several devices attached, add `-s <serial>` to target one.

`adb logcat` is the first place to look when an Android build crashes on launch before JavaScript runs: native exceptions never reach the JS console.

Common gotchas:

- **"adb server version doesn’t match this client"** means two copies of ADB are installed, often one from Android Studio and one from Homebrew. Keep one on your `PATH`.
- **"unauthorized"** devices need the USB debugging prompt accepted on the phone.
- Physical devices need Developer options and USB debugging switched on first.

See the [ADB docs](https://developer.android.com/tools/adb).

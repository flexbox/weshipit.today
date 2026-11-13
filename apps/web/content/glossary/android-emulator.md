---
title: 'Android Emulator'
summary: 'The Android Emulator runs a virtual Android device on your computer from an AVD profile, letting you install and debug a React Native app without a real phone.'
aliases:
  - 'Emulator'
  - 'AVD'
related:
  - 'Android Studio'
  - 'ADB'
  - 'iOS Simulator'
  - 'Development Build'
updated: 2026-11-13
---

The Android Emulator is a virtual Android device that runs on macOS, Windows or Linux. Each device is defined by an **AVD** (Android Virtual Device): a profile combining a screen size, an Android version and a system image. You create AVDs in the Device Manager of [Android Studio](/react-native-glossary/android-studio).

Unlike the [iOS Simulator](/react-native-glossary/ios-simulator), it genuinely emulates a device and runs a full Android system image, accelerated by your machine’s hypervisor. That makes it closer to a real phone, but also heavier on RAM and CPU.

Things that trip React Native developers up:

- **`localhost` is the emulator, not your computer.** The app reaches Metro because the tooling runs `adb reverse tcp:8081 tcp:8081` for you; if that mapping is lost, you get a red "could not connect to development server" screen. The host machine is also reachable at `10.0.2.2`.
- **Pick a system image with Google Play** if your app relies on Play Services, such as Firebase Cloud Messaging or Google sign-in.
- **Match the CPU architecture.** On Apple silicon use arm64 images; x86 images are slow or will not start.
- The [Dev Menu](/react-native-glossary/dev-menu) opens with Cmd+M (macOS) or Ctrl+M, and pressing R twice reloads.

You drive and inspect it with [ADB](/react-native-glossary/adb), exactly as you would a USB-connected phone: `adb devices` lists it as `emulator-5554` or similar.

The gotcha is trusting it for performance or device quirks. Manufacturer skins, low-end memory pressure, and aggressive battery savers that kill background work only appear on real hardware.

---
title: 'iOS Simulator'
summary: 'The iOS Simulator is the Mac app bundled with Xcode that runs iPhone and iPad builds of your React Native app on your computer, without a physical device.'
aliases:
  - 'Simulator'
related:
  - 'Xcode'
  - 'Android Emulator'
  - 'Development Build'
  - 'Dev Menu'
updated: 2026-11-13
---

The iOS Simulator is a macOS app shipped with [Xcode](/react-native-glossary/xcode) that runs iPhone, iPad and other Apple device builds on your Mac. It is where most React Native iOS development happens day to day, launched by `npx expo run:ios` or `npx react-native run-ios`.

It is a simulator, not an emulator: it does not imitate iPhone hardware. Your app is compiled for the Mac’s own CPU against a simulator SDK and runs as a Mac process. That has practical consequences:

- **It only exists on macOS.** There is no official way to run it on Windows or Linux.
- **Simulator builds cannot be installed on a phone**, and device builds cannot run in the Simulator. A [development build](/react-native-glossary/development-build) made for one will not work on the other.
- **Performance is not representative.** A fast Mac hides jank that a three-year-old iPhone will show, so profile on real hardware.
- **`localhost` is your Mac**, which is why the app reaches Metro with no extra setup, unlike the [Android Emulator](/react-native-glossary/android-emulator).

Handy shortcuts: Cmd+D opens the [Dev Menu](/react-native-glossary/dev-menu), Cmd+R reloads, and Cmd+Shift+H goes to the home screen. The `xcrun simctl` command line tool can boot devices, open URLs to test deep links, grant permissions and send a fake push payload.

The common misconception is that "it works in the Simulator" means it works on a device. Camera hardware, some sensors, real push delivery, Face ID behaviour, signing and entitlements, and memory limits all differ. Test anything touching those on a physical iPhone before release.

---
title: 'Expo Go'
summary: 'Expo Go is a free sandbox app from the App Store and Google Play that runs Expo projects instantly, with a fixed set of native modules and no custom native code.'
aliases:
  - 'Expo Go app'
related:
  - 'Development Build'
  - 'Expo'
  - 'Expo SDK Version'
  - 'Native Module'
updated: 2026-11-13
---

Expo Go is a prebuilt app you download from the App Store or Google Play. It already contains the native code for the Expo SDK, so it can load your project’s JavaScript from Metro and run it with no Xcode or Android Studio install. You scan a QR code from `npx expo start` and the app opens.

That makes it the fastest way to try React Native: a phone, Node.js and five minutes are enough. It is ideal for tutorials, workshops, quick prototypes and sharing a demo with a colleague on the same network.

The trade-off is that the native side is frozen. Expo Go can only use the native modules compiled into it, so:

- Libraries with their own native code that Expo does not bundle, such as many payment, Bluetooth or analytics SDKs, will not work.
- [Config plugins](/react-native-glossary/config-plugin) and changes to native configuration have no effect.
- App name, icon, bundle identifier and push notification setup are Expo Go’s, not yours.

Each store release of Expo Go supports one [Expo SDK version](/react-native-glossary/expo-sdk-version). When a new SDK ships and the store app updates, a project still on an older SDK stops opening in it. This catches people out after an automatic phone update.

The most common misconception is that Expo Go is "how Expo apps run". It is not what you ship. Real projects move to a [development build](/react-native-glossary/development-build), which is your own app with your own native dependencies plus the same quick reload workflow. Expo’s own docs treat Expo Go as a learning tool, not a production workflow.

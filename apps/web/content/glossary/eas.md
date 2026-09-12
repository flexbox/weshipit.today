---
title: 'EAS'
summary: 'EAS (Expo Application Services) is Expo’s hosted cloud service for building, submitting and updating React Native apps without maintaining your own Xcode and Gradle infrastructure.'
aliases:
  - 'Expo Application Services'
  - 'EAS Build'
  - 'EAS Submit'
related:
  - 'Expo'
  - 'Over-the-Air Update'
  - 'Development Build'
  - 'Continuous Native Generation'
updated: 2026-09-12
---

EAS — Expo Application Services — is the hosted infrastructure that compiles, signs, ships, and updates React Native apps. It removes the need to keep a Mac with the right Xcode version around just to produce an iOS build.

It is three services:

- **EAS Build** — compiles `.ipa` and `.aab` binaries in the cloud, managing signing certificates and provisioning profiles for you. `eas build --platform ios` is the whole workflow.
- **EAS Submit** — uploads a finished binary to App Store Connect and Google Play.
- **[EAS Update](/react-native-glossary/over-the-air-update)** — delivers JavaScript-only changes over the air, skipping review for anything that lives in the [bundle](/react-native-glossary/javascript-bundle).

The concept newcomers most need is the **build profile**, configured in `eas.json`: `development` produces a [development build](/react-native-glossary/development-build), `preview` an internal-distribution build, `production` the store artefact.

EAS is optional — you can build locally with Xcode and Android Studio — but it is what most Expo teams use. See the [EAS docs](https://docs.expo.dev/eas/).

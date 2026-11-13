---
title: 'Code Signing'
summary: 'Code signing cryptographically stamps an iOS or Android build with your identity, so the OS and app stores can verify who made it and that it is unaltered.'
aliases:
  - 'Signing certificate'
  - 'Provisioning profile'
related:
  - 'Android Keystore'
  - 'Entitlements'
  - 'Bundle Identifier'
  - 'EAS Build'
  - 'App Store Connect'
updated: 2026-11-13
---

Code signing attaches a cryptographic signature to your compiled app so that iOS, Android and the app stores can confirm who built it and that nobody modified it afterwards. A React Native app cannot be installed on a real device or uploaded to a store unless it is signed.

The two platforms work differently.

**iOS** needs two pieces that must agree:

- A **signing certificate** (Apple Development or Apple Distribution), whose private key lives in your keychain or in a build service.
- A **provisioning profile**, issued by Apple, that ties together the certificate, the app’s [bundle identifier](/react-native-glossary/bundle-identifier), the allowed [entitlements](/react-native-glossary/entitlements) and, for development and ad hoc builds, the list of device UDIDs.

**Android** is simpler: you sign the APK or App Bundle with a private key stored in a keystore file. There are no profiles; see [Android Keystore](/react-native-glossary/android-keystore) for how upload keys and Play App Signing fit together.

In practice most signing errors are mismatches. On iOS that means a profile that does not include the device, lacks a capability you just enabled such as push notifications, or belongs to a different team or bundle identifier. Xcode’s automatic signing handles this for solo developers; teams and CI usually centralise credentials instead, for example with [EAS Build](/react-native-glossary/eas-build) managing them or Fastlane match storing them in a private repository.

The common misconception is that signing is a one-off setup step. Distribution certificates and profiles expire, so iOS builds can fail months later without a single code change. Treat credentials as shared infrastructure: back them up, document who owns them, and never leave them only on one laptop.

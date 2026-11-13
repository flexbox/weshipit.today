---
title: 'Entitlements'
summary: 'Entitlements are signed key-value permissions in an iOS app that unlock Apple capabilities such as push notifications, App Groups, Sign in with Apple and Universal Links.'
aliases:
  - 'Capabilities'
  - 'App entitlements'
related:
  - 'Code Signing'
  - 'Push Notifications'
  - 'Universal Links'
  - 'Info.plist'
updated: 2026-11-13
---

Entitlements are key-value pairs embedded in an iOS app’s code signature that grant it access to Apple services and system capabilities. They live in a `.entitlements` property list in your Xcode project, and Xcode’s "Signing & Capabilities" tab is a friendly editor for them.

Typical entitlements a React Native app needs:

- `aps-environment` for [push notifications](/react-native-glossary/push-notifications).
- `com.apple.developer.associated-domains` for [Universal Links](/react-native-glossary/universal-links) and password autofill.
- App Groups, to share data with a widget or extension.
- Sign in with Apple, HealthKit, iCloud, Apple Pay and keychain sharing.

What makes them different from [Info.plist](/react-native-glossary/info-plist) keys is that Apple checks them. Each entitlement must also be enabled on your App ID in the Apple Developer portal and be included in the provisioning profile used for [code signing](/react-native-glossary/code-signing). If the app claims an entitlement its profile does not allow, signing fails at build time, or the feature silently does not work on device.

With Expo you declare them in app config, and many library config plugins add their own:

```json
{
  "ios": {
    "associatedDomains": ["applinks:example.com"],
    "entitlements": { "com.apple.security.application-groups": ["group.com.example.app"] }
  }
}
```

EAS Build can sync these capabilities to your App ID automatically; with manual signing you must enable them yourself and regenerate the profile.

Common gotchas: enabling a capability in Xcode but not regenerating the profile on CI; a library that adds push entitlements you never asked for, which then triggers an App Store warning; and assuming Android has an equivalent file. It does not. Android grants comparable powers through AndroidManifest.xml permissions and features.

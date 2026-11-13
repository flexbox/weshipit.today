---
title: 'Firebase'
summary: 'Firebase is Google’s app backend platform; React Native apps use it through React Native Firebase, which wraps the native SDKs, or through the Firebase JavaScript SDK.'
aliases:
  - 'React Native Firebase'
related:
  - 'Supabase'
  - 'Push Notifications'
  - 'Crash Reporting'
  - 'Config Plugin'
updated: 2026-11-13
---

Firebase is Google’s backend-as-a-service: authentication, Firestore and Realtime Database, Cloud Storage, Cloud Messaging for [push notifications](/react-native-glossary/push-notifications), Crashlytics for [crash reporting](/react-native-glossary/crash-reporting), Analytics and Remote Config. A React Native app can talk to it in two quite different ways, and choosing between them is the first decision.

- **React Native Firebase** (the `@react-native-firebase/*` packages, installed per product) wraps Google’s official native iOS and Android SDKs. You get every product, including those that only exist natively (Crashlytics, native Analytics, Cloud Messaging), plus native performance and offline persistence for Firestore.
- **The Firebase JavaScript SDK** (the `firebase` package) is the web SDK running in React Native. It needs no native code, so it works in Expo Go, but products that depend on native SDKs are missing or limited.

React Native Firebase needs native configuration: a `GoogleService-Info.plist` for iOS and a `google-services.json` for Android, downloaded from the Firebase console. In Expo projects its [config plugins](/react-native-glossary/config-plugin) wire these in during prebuild, and you need a development build rather than Expo Go.

Gotchas that come up often:

- **Do not mix the two SDKs** for the same product. Two auth instances, for example, means two separate sessions.
- **With the JavaScript SDK, auth persistence is not automatic.** Without configuring React Native persistence, users are logged out on every restart.
- **Cloud Messaging on iOS still goes through APNs.** You must upload an APNs key to Firebase and enable the push capability, or iOS notifications never arrive while Android works fine.
- **Security rules are your backend.** Firestore and Storage are accessed directly from the app, so the rules are the only thing standing between your data and anyone who extracts your config.

Compared with [Supabase](/react-native-glossary/supabase), Firebase’s databases are document-based rather than relational. See the [React Native Firebase docs](https://rnfirebase.io/).

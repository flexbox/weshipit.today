---
title: 'Secure Storage'
summary: 'Secure storage keeps small secrets such as auth tokens encrypted on the device, using the iOS Keychain and Android Keystore through libraries like expo-secure-store.'
aliases:
  - 'Keychain'
  - 'expo-secure-store'
  - 'EncryptedSharedPreferences'
related:
  - 'Android Keystore'
  - 'API Keys in Mobile Apps'
  - 'AsyncStorage'
  - 'Jailbreak and Root Detection'
updated: 2026-11-13
---

Secure storage is where a React Native app keeps secrets: refresh tokens, session tokens, encryption keys for other stores. It is backed by each platform’s hardware-protected key store, the Keychain on iOS and the [Android Keystore](/react-native-glossary/android-keystore) on Android, so values are encrypted at rest with keys that never leave the secure hardware.

The common libraries are `expo-secure-store` and `react-native-keychain`. Both expose a small asynchronous key-value API:

```ts
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('refreshToken', token);
const saved = await SecureStore.getItemAsync('refreshToken');
await SecureStore.deleteItemAsync('refreshToken');
```

It matters because the default places to put data, [AsyncStorage](/react-native-glossary/asyncstorage) and MMKV without encryption, are plain files. Anyone with a rooted device or an unencrypted backup can read a token stored there. Secure storage also supports options such as requiring biometric authentication before a value is returned, and controlling whether a value is available while the device is locked.

Things that catch developers out:

- **It is for small values.** It is designed for tokens and keys, not JSON documents or caches, and large values can be slow or rejected. Store a key in secure storage and encrypt bulk data elsewhere with it.
- **iOS Keychain items survive uninstall.** Delete and reinstall the app and the old token is still there, so the app can appear logged in on a fresh install. Many apps clear the keychain on the first launch after install. Android removes the data with the app.
- **It does not protect secrets you ship.** Secure storage protects data the app receives at runtime. An API key hard-coded in your bundle is readable regardless; see [API keys in mobile apps](/react-native-glossary/api-keys).

See the [expo-secure-store docs](https://docs.expo.dev/versions/latest/sdk/securestore/).

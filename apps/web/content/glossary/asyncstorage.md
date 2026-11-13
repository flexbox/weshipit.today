---
title: 'AsyncStorage'
summary: 'AsyncStorage is an unencrypted, asynchronous key-value store that persists strings on the device, maintained as @react-native-async-storage/async-storage.'
aliases:
  - 'Async Storage'
related:
  - 'MMKV'
  - 'Secure Storage'
  - 'SQLite'
  - 'State Management'
updated: 2026-11-13
---

AsyncStorage is the long-standing simple way to save small amounts of data on a device in React Native. It stores string values under string keys, every call returns a promise, and the data survives app restarts. It once shipped inside React Native itself; it now lives in the community package `@react-native-async-storage/async-storage`, and old `import { AsyncStorage } from 'react-native'` code no longer works.

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('settings', JSON.stringify({ theme: 'dark' }));
const raw = await AsyncStorage.getItem('settings');
const settings = raw ? JSON.parse(raw) : null;
```

It is the default persistence adapter in a lot of library documentation (state persistence, auth session storage), and it works in Expo Go, on web and everywhere else, which is why it remains common.

How it behaves in practice:

- **Strings only.** Objects must be serialised with `JSON.stringify` and parsed back, and `getItem` returns `null` for a missing key.
- **Always asynchronous.** You cannot read a value during the first render, so anything that depends on it (a theme, a logged-in flag) needs a loading state.
- **Batch your reads.** Many sequential `getItem` calls at startup add up; `multiGet` fetches several keys in one round trip.
- **Size limits.** On Android it is backed by SQLite with a default total size cap of around 6 MB, so it is not a place for caches of images or large API responses.

The serious mistake is storing secrets. AsyncStorage is not encrypted: on a rooted or jailbroken device, or from an unencrypted backup, auth tokens stored there can be read directly. Keep tokens and keys in [secure storage](/react-native-glossary/secure-storage). For performance-sensitive or synchronous access, [MMKV](/react-native-glossary/mmkv) is the usual upgrade, and structured data that needs querying belongs in [SQLite](/react-native-glossary/sqlite). See the [Async Storage docs](https://react-native-async-storage.github.io/async-storage/).

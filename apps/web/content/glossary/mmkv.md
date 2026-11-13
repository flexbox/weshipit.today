---
title: 'MMKV'
summary: 'MMKV is a fast, synchronous key-value storage library for React Native, built on Tencent’s memory-mapped MMKV engine and exposed through JSI as react-native-mmkv.'
aliases:
  - 'react-native-mmkv'
related:
  - 'AsyncStorage'
  - 'JSI'
  - 'Secure Storage'
  - 'Zustand'
updated: 2026-11-13
---

MMKV is a key-value store originally built by Tencent for the WeChat app, which memory-maps a file so reads and writes are close to the speed of working with memory. In React Native it means `react-native-mmkv`, maintained by Marc Rousavy, which exposes it to JavaScript through [JSI](/react-native-glossary/jsi) rather than an asynchronous bridge call.

The practical difference from [AsyncStorage](/react-native-glossary/asyncstorage) is that every call is **synchronous**. `storage.getString('theme')` returns the value immediately, so you can read persisted settings during the very first render with no loading state and no flash of the wrong theme. It also stores booleans, numbers and binary buffers natively instead of forcing everything through JSON, and it can encrypt its file with a key you supply.

That makes it the common choice for:

- Persisting a [Zustand](/react-native-glossary/zustand) or Redux store with instant hydration.
- Feature flags, settings and “has seen onboarding” style values read at startup.
- Caching small pieces of data that are read frequently.

Things to know before adopting it:

- It contains native code, so it does not run in Expo Go; you need a development build. Recent major versions also require the New Architecture.
- The API changed shape between major versions, so check which version a tutorial is written for.
- Synchronous cuts both ways. Writing a multi-megabyte JSON blob blocks the JavaScript thread while it serialises; MMKV is for many small values, not one huge one.
- Encryption is only as strong as where you keep the key. Hard-coding it in the bundle protects nothing; generate it once and keep it in [secure storage](/react-native-glossary/secure-storage).

MMKV is not a database. It has no queries, indexes or relations, so once you find yourself scanning keys to filter records, move that data to SQLite. See the [react-native-mmkv repository](https://github.com/mrousavy/react-native-mmkv).

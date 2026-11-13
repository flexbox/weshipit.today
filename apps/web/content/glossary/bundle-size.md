---
title: 'Bundle Size'
summary: 'Bundle size is the weight of a React Native app: the JavaScript bundle plus native code and assets, which together set download size and affect startup time.'
aliases:
  - 'App size'
  - 'Binary size'
related:
  - 'JavaScript Bundle'
  - 'Tree Shaking'
  - 'Android App Bundle'
  - 'R8 and ProGuard'
  - 'Startup Time'
updated: 2026-11-13
---

Bundle size describes how big your app is. In React Native the word covers two different things, and conflating them is the most common source of confusion:

- **The JavaScript bundle** — the file [Metro](/react-native-glossary/metro) produces from your code and npm dependencies, shipped as Hermes bytecode in release builds.
- **The binary size** — the full `.ipa` or `.aab`: the JavaScript bundle plus the React Native runtime, every native library your dependencies pull in, fonts, images and other assets.

The JavaScript bundle matters for [startup time](/react-native-glossary/startup-time), because more code generally means more to load and run at launch. The binary matters for download size, store limits on cellular downloads, and conversion: users on slow connections or small phones abandon large installs.

What users actually download is usually smaller than your build output. Google Play generates device-specific APKs from an [Android App Bundle](/react-native-glossary/android-app-bundle), and the App Store thins iOS builds per device. Check the sizes reported by App Store Connect and the Play Console rather than the file on your disk.

Practical levers:

- Audit dependencies. A single convenience package can drag in a large native SDK or a whole utility library.
- Import only what you use, and avoid barrel files that re-export an entire package.
- Enable [R8](/react-native-glossary/r8-proguard) shrinking for the Android native side.
- Compress and correctly size images; ship vector icons rather than PNGs at three densities.

A frequent gotcha is assuming the JavaScript bundle is tree-shaken like a web build. Metro has traditionally included every module you import, so unused exports still ship. Tools such as Expo Atlas or a bundle visualiser show exactly which packages dominate.

---
title: 'Autolinking'
summary: 'Autolinking is the build step that finds native code in your installed npm packages and wires it into the iOS and Android projects, so you never link libraries by hand.'
aliases:
  - 'Native autolinking'
related:
  - 'Native Module'
  - 'CocoaPods'
  - 'Gradle'
  - 'Development Build'
  - 'Expo Modules API'
updated: 2026-11-13
---

Autolinking is the mechanism that scans your dependencies for native code and adds it to the iOS and Android builds automatically. Install a library such as `react-native-mmkv`, rebuild, and its native module is available without touching Xcode or Gradle files.

It works at build time, on both platforms:

- **iOS** — the [Podfile](/react-native-glossary/podfile) calls `use_native_modules!` (and `use_expo_modules!` in Expo projects), which finds each library’s podspec in `node_modules` and hands it to [CocoaPods](/react-native-glossary/cocoapods).
- **Android** — the Gradle settings call into the same discovery logic, include each library as a Gradle project and generate the code that registers its packages.

There are two implementations: the React Native Community CLI’s, configured through `react-native.config.js`, and Expo’s, which also discovers modules built with the [Expo Modules API](/react-native-glossary/expo-modules-api). Expo projects use both.

The key point newcomers miss: autolinking only runs when the native app is built. Installing a native library and reloading JavaScript is not enough. You must rebuild:

```bash
npx expo run:ios       # or a new development build
cd ios && pod install  # bare React Native, then rebuild
```

Skip that step and you get an error like `TurboModuleRegistry.getEnforcing(...): 'X' could not be found`, or a “native module is null” message from older libraries. For the same reason a library with custom native code cannot work in Expo Go; it needs a [development build](/react-native-glossary/development-build).

You can opt a package out per platform in `react-native.config.js`:

```js
module.exports = {
  dependencies: {
    'some-library': { platforms: { ios: null } },
  },
};
```

Before autolinking, every install meant manually editing the Xcode project, `settings.gradle` and `MainApplication`, which is why old READMEs still mention `react-native link`.

---
title: 'CocoaPods'
summary: 'CocoaPods is the Ruby-based iOS dependency manager React Native uses to install its own native code and the iOS side of every native library into your Xcode project.'
aliases:
  - 'Pods'
  - 'pod install'
related:
  - 'Podfile'
  - 'Xcode'
  - 'Autolinking'
  - 'Swift Package Manager'
updated: 2026-11-13
---

CocoaPods is a dependency manager for iOS, written in Ruby. React Native uses it to pull React Native’s own iOS code, Hermes and the native half of every library you install into an Xcode workspace. The result lives in `ios/Pods/`.

The everyday command is `pod install`, run from the `ios/` folder. It reads the [Podfile](/react-native-glossary/podfile), resolves versions, writes `Podfile.lock` and regenerates `YourApp.xcworkspace`. Each library describes itself in a `.podspec` file, and [autolinking](/react-native-glossary/autolinking) finds those podspecs in `node_modules` so you don’t list them by hand.

When to run it:

- After adding, removing or upgrading any package that contains native iOS code.
- After upgrading React Native or the Expo SDK.
- After pulling a branch where someone else changed native dependencies.

If you forget, the JavaScript side expects a module the binary doesn’t contain, and the app fails at launch or when that module is first used.

Common pitfalls:

- **Ruby version drift.** Use the project’s `Gemfile` and run `bundle exec pod install` so everyone uses the same CocoaPods version.
- **Stale spec cache.** “Could not find compatible versions” often needs `pod install --repo-update`.
- **Opening the wrong file.** After CocoaPods runs, build from the `.xcworkspace` in [Xcode](/react-native-glossary/xcode).

With Expo’s Continuous Native Generation, `npx expo prebuild` and `npx expo run:ios` run `pod install` for you, and EAS Build does it in the cloud.

CocoaPods is in maintenance mode, and its maintainers have announced that the central Specs repository will become read-only. Apple’s [Swift Package Manager](/react-native-glossary/swift-package-manager) is the long-term direction, and the React Native ecosystem is gradually preparing for it, but today most React Native iOS builds still go through CocoaPods.

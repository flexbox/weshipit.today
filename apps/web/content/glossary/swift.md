---
title: 'Swift'
summary: 'Swift is Apple’s modern programming language for iOS; React Native developers use it to write native modules, Expo modules and app delegate code on the iOS side.'
aliases:
  - 'Swift language'
related:
  - 'Objective-C'
  - 'Expo Modules API'
  - 'Native Module'
  - 'Kotlin'
updated: 2026-11-13
---

Swift is Apple’s programming language for iOS, macOS and its other platforms, introduced in 2014 as the successor to [Objective-C](/react-native-glossary/objective-c). In React Native work it is the language you reach for when JavaScript cannot do the job: calling an iOS SDK, wrapping a native view or handling app lifecycle events.

Where Swift shows up in a React Native app:

- **Native modules** you write yourself, most comfortably with the [Expo Modules API](/react-native-glossary/expo-modules-api), whose iOS side is Swift-first.
- **The app delegate** — recent React Native and Expo templates generate it in Swift rather than Objective-C.
- **Third-party SDKs**, which are increasingly Swift-only.

The important nuance is how Swift reaches JavaScript. React Native’s core is Objective-C++ and C++, and JSI is a C++ API. For a classic [native module](/react-native-glossary/native-module) or TurboModule, a Swift implementation typically needs a thin Objective-C or Objective-C++ layer that exposes it to React Native, since Swift classes must be visible to the Objective-C runtime. The Expo Modules API hides that glue, which is a large part of its appeal.

```swift
@objc(Haptics)
class Haptics: NSObject {
  @objc func tap() {
    UIImpactFeedbackGenerator(style: .light).impactOccurred()
  }
}
```

Two practical gotchas. UIKit work must happen on the main thread, while React Native may call your module from another queue, so dispatch to `DispatchQueue.main` when touching views. And mixing Swift into an Objective-C project needs a bridging header; if Xcode reports that Swift symbols are missing, that header is the first place to look.

Swift is the iOS counterpart of [Kotlin](/react-native-glossary/kotlin): learning a little of both covers most of the native code a React Native developer ever needs to write.

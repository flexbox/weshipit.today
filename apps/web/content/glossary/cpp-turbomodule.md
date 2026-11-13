---
title: 'C++ TurboModule'
summary: 'A C++ TurboModule is a native module written once in C++ and shared by iOS and Android, called from JavaScript through JSI without Swift, Kotlin or Java glue code.'
aliases:
  - 'Pure C++ module'
  - 'Cxx TurboModule'
related:
  - 'TurboModules'
  - 'JSI'
  - 'Codegen'
  - 'Native Module'
  - 'Autolinking'
updated: 2026-11-13
---

A C++ TurboModule is a [TurboModule](/react-native-glossary/turbomodules) implemented entirely in C++ rather than separately in Objective-C or Swift for iOS and Java or Kotlin for Android. You write one implementation, both platforms compile it, and JavaScript calls it directly through [JSI](/react-native-glossary/jsi).

The workflow mirrors any other TurboModule. You declare the interface in a TypeScript spec file, and [Codegen](/react-native-glossary/codegen) generates a C++ base class for it, whose name ends in `CxxSpec`. Your class extends that base and implements the methods, receiving and returning JSI values that Codegen converts to and from ordinary C++ types. A small amount of per-platform registration code tells each app how to find the module.

Why teams reach for one:

- **One codebase for logic that is not platform-specific.** Parsing, encryption, compression, maths, a rules engine: there is no reason to write it twice.
- **Reusing existing C or C++ libraries.** SQLite, image codecs, audio processing, cryptography and ML runtimes are written in C or C++, and a C++ module can call them without a Java or Objective-C layer in between.
- **Speed and synchronous calls.** No hop through another language, and synchronous return values are cheap. Some of the fastest storage and crypto libraries in the ecosystem are built this way.

The gotchas:

- **No platform APIs for free.** C++ cannot directly show a dialog, read the iOS keychain or request an Android permission. Anything platform-specific still needs Objective-C, Swift, Kotlin or Java, often via a regular TurboModule.
- **Threading is your problem.** Calls arrive on the JavaScript thread. Long work blocks the UI, and touching the JSI runtime from another thread crashes. Do heavy work elsewhere and hop back to deliver results.
- **Two toolchains to debug.** Build failures surface through CMake and the Android NDK on one side and Xcode on the other, which is a steeper learning curve than a Kotlin or Swift module.

See [cross-platform native modules (C++)](https://reactnative.dev/docs/the-new-architecture/pure-cxx-modules).

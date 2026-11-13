---
title: 'Objective-C'
summary: 'Objective-C is Apple’s older iOS language; much of React Native’s iOS core and many libraries still use it, often as Objective-C++ to reach C++ code like JSI.'
aliases:
  - 'ObjC'
  - 'Objective-C++'
related:
  - 'Swift'
  - 'TurboModules'
  - 'Native Module'
  - 'Fabric Native Component'
updated: 2026-11-13
---

Objective-C is the language Apple platforms were built on before [Swift](/react-native-glossary/swift) arrived. It adds Smalltalk-style messaging to C, and React Native’s iOS code — the `RCT` classes, the app host and a large share of community libraries — is written in it.

Its variant, Objective-C++, is why it remains relevant. A file with the `.mm` extension can mix Objective-C and C++ freely, and React Native’s New Architecture is C++ at its core: [JSI](/react-native-glossary/jsi), the Fabric renderer and [TurboModules](/react-native-glossary/turbomodules) all expose C++ interfaces. Objective-C++ is the glue that lets iOS code plug into them, which is why generated TurboModule and Fabric component code on iOS is `.mm`, not Swift.

What you will recognise in React Native code:

- `.h` header and `.m` or `.mm` implementation files.
- Macros such as `RCT_EXPORT_MODULE()` and `RCT_EXPORT_METHOD()`, from the classic [native module](/react-native-glossary/native-module) system.
- Square-bracket method calls like `[UIApplication sharedApplication]`.

```objc
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Haptics, NSObject)
RCT_EXTERN_METHOD(tap)
@end
```

That pattern is the thin Objective-C file that exposes a Swift class to React Native.

The common gotcha is file extensions. Renaming an `.m` file to `.mm` changes the compiler used, so a module that suddenly needs to include a C++ header must become Objective-C++; forgetting this produces baffling errors about unknown C++ syntax. The reverse also matters: Swift cannot import C++ headers the same way, so you cannot simply rewrite every `.mm` file in Swift.

You do not need to master Objective-C to work with React Native, but being able to read it makes library source code and native stack traces far less intimidating.

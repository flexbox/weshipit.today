---
title: 'Expo Modules API'
summary: 'The Expo Modules API is a Swift and Kotlin DSL for writing native modules and views for React Native, built on JSI and usable in Expo and bare React Native apps.'
aliases:
  - 'Expo Modules'
  - 'expo-module'
related:
  - 'Native Module'
  - 'TurboModules'
  - 'Swift'
  - 'Kotlin'
  - 'Config Plugin'
updated: 2026-11-13
---

The Expo Modules API is Expo’s framework for writing native code that JavaScript can call. You describe a module in a declarative Swift or Kotlin DSL — its name, functions, constants, events and views — and Expo generates the binding to JavaScript over [JSI](/react-native-glossary/jsi). Every package in the Expo SDK is built with it.

```swift
import ExpoModulesCore

public class GreeterModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Greeter")
    Function("greet") { (name: String) -> String in
      return "Hello, \(name)"
    }
  }
}
```

From JavaScript you call `requireNativeModule('Greeter').greet('Ada')`. The Kotlin version mirrors the Swift one almost line for line.

Why React Native developers choose it over a hand-written [TurboModule](/react-native-glossary/turbomodules):

- **Modern languages only.** [Swift](/react-native-glossary/swift) and Kotlin, with no Objective-C++ or Java glue to maintain.
- **Type conversion handled for you**, including records, enums and optional arguments, with argument validation.
- **Async functions, events and native views** declared in the same definition.
- **Lifecycle hooks** for app delegate and activity events, without editing `AppDelegate` or `MainActivity`.

Getting started is `npx create-expo-module` for a publishable library, or `npx create-expo-module --local` to add one under `modules/` in your app. Pair it with a [config plugin](/react-native-glossary/config-plugin) when the module also needs Info.plist or manifest changes.

The common misconception is that it only works in Expo-managed apps. It runs in any React Native project that has the `expo` package installed, which `npx install-expo-modules` sets up in a bare app. It does not work in Expo Go, though: custom native code always needs a development build.

It is not a TurboModule under the hood and does not use React Native’s Codegen; it reaches the same goal — fast, typed JSI calls — through its own runtime. Both approaches are supported by the New Architecture. See the [Expo Modules API docs](https://docs.expo.dev/modules/overview/).

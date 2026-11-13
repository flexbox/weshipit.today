---
title: 'Native App'
summary: 'A native app is a mobile app built with each platform’s own SDK and languages, Swift or Objective-C on iOS and Kotlin or Java on Android, installed from a store.'
aliases:
  - 'Fully native'
  - 'Native development'
related:
  - 'Cross-Platform Development'
  - 'Hybrid App'
  - 'Swift'
  - 'Kotlin'
  - 'Brownfield App'
updated: 2026-11-13
---

A native app is an application written directly against a platform’s own SDK: [Swift](/react-native-glossary/swift) or Objective-C with SwiftUI or UIKit on iOS, [Kotlin](/react-native-glossary/kotlin) or Java with Jetpack Compose or Android Views on Android. Each platform usually gets its own codebase and often its own team.

The term is used in two ways, and confusing them causes most debates:

- **Native development** describes how the app is built: platform languages and tools, no cross-platform layer.
- **Native app** in the broader sense describes what the user gets: a compiled binary installed from the App Store or Google Play that uses real platform UI and APIs, as opposed to a website or a [hybrid app](/react-native-glossary/hybrid-app) in a WebView.

A React Native app is native in the second sense but not the first. It ships as an `.ipa` and an `.aab`, renders platform views, and can call any native API, but its UI and logic are written in JavaScript or TypeScript.

Why fully native development is still chosen:

- Day-one access to new OS features and frameworks, without waiting for wrappers.
- Apps dominated by platform-specific work, such as widgets, watch apps, advanced camera or audio pipelines.
- Teams that already have experienced iOS and Android engineers.

The costs are two codebases, features that drift apart between platforms, and roughly double the effort for anything shared.

The misconception to avoid is that "native" automatically means faster or better. A carefully built React Native app and a native app are often indistinguishable to users, and a poorly built native app can still stutter. Performance depends far more on how the app is written than on the label. Many large apps mix both, adding React Native to an existing native codebase as a [brownfield app](/react-native-glossary/brownfield-app).

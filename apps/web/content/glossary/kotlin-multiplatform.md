---
title: 'Kotlin Multiplatform'
summary: 'Kotlin Multiplatform (KMP) is JetBrains’ technology for sharing Kotlin code across Android, iOS and other targets, usually business logic, while keeping native UIs.'
aliases:
  - 'KMP'
  - 'Compose Multiplatform'
related:
  - 'Kotlin'
  - 'Cross-Platform Development'
  - 'Flutter'
  - 'Native App'
  - 'Brownfield App'
updated: 2026-11-13
---

Kotlin Multiplatform (KMP) is a JetBrains technology for compiling the same [Kotlin](/react-native-glossary/kotlin) code to several targets: the JVM for Android, native binaries for iOS, plus desktop and the web. Its most common use is sharing networking, data and business logic while each platform keeps its own native UI.

It approaches cross-platform from the opposite side to React Native. React Native shares the UI layer and most logic in JavaScript; KMP typically shares the logic layer and leaves the UI to SwiftUI on iOS and Jetpack Compose on Android. On iOS, shared Kotlin is compiled to a native framework that Swift code calls like any other library.

**Compose Multiplatform** is a related JetBrains framework that extends Jetpack Compose so the UI can be shared too, including on iOS. With it, KMP becomes closer to Flutter or React Native in scope, drawing its own UI rather than using native views on iOS.

Points worth knowing when comparing it with React Native:

- **Adoption path.** KMP is easy to add gradually to existing native apps, one shared module at a time, which suits teams with strong Android and iOS developers.
- **Skills.** It favours Kotlin and Android experience; React Native favours JavaScript, TypeScript and React.
- **Tooling.** iOS developers still work in Xcode, while shared code is written in Android Studio or IntelliJ IDEA.
- **Ecosystem.** Its library ecosystem is younger than npm’s React Native packages but growing, and Google supports KMP for sharing logic in Android apps.

A common misconception is that KMP and React Native are mutually exclusive. They can coexist: a native or [brownfield app](/react-native-glossary/brownfield-app) can share logic through KMP and still host React Native screens.

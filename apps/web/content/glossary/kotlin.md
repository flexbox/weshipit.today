---
title: 'Kotlin'
summary: 'Kotlin is Google’s preferred language for Android; React Native’s Android template is written in it, and it is the usual choice for writing Android native modules.'
aliases:
  - 'Kotlin language'
related:
  - 'Swift'
  - 'Gradle'
  - 'Expo Modules API'
  - 'JNI'
  - 'Kotlin Multiplatform'
updated: 2026-11-13
---

Kotlin is a statically typed language from JetBrains that runs on the Java Virtual Machine and is Google’s preferred language for Android. In a React Native project it is what `MainActivity.kt` and `MainApplication.kt` are written in, and what you use to write the Android half of a native module.

Kotlin interoperates fully with Java, so React Native’s Java code, older libraries and Android’s own Java APIs can all be called from it. Practically, React Native developers meet it when they:

- Write an Android module with the [Expo Modules API](/react-native-glossary/expo-modules-api), whose Android side is a Kotlin DSL.
- Implement a TurboModule’s Android code from a Codegen-generated spec.
- Edit `MainApplication.kt` to register a package or initialise an SDK at startup.
- Read a library’s Android source to understand a crash.

```kotlin
class ToastModule(ctx: ReactApplicationContext) :
  ReactContextBaseJavaModule(ctx) {
  override fun getName() = "Toast"

  @ReactMethod
  fun show(message: String) {
    Toast.makeText(reactApplicationContext, message, Toast.LENGTH_SHORT).show()
  }
}
```

That snippet shows the classic module style; New Architecture modules extend a generated spec class instead, but the Kotlin is similar.

A common misconception is that Kotlin talks to JavaScript directly. It does not: React Native’s core is C++, and Kotlin code reaches it through [JNI](/react-native-glossary/jni), which React Native wraps so module authors rarely see it.

The usual gotcha is versions. The Kotlin compiler version is set in the [Gradle](/react-native-glossary/gradle) build, and a library compiled with a newer Kotlin than your project can fail with metadata or “incompatible version” errors. Upgrade through your React Native or Expo version rather than bumping Kotlin alone.

Don’t confuse Kotlin with [Kotlin Multiplatform](/react-native-glossary/kotlin-multiplatform), which shares Kotlin business logic across iOS and Android and is an alternative approach to cross-platform apps.

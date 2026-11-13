---
title: 'R8 and ProGuard'
summary: 'R8 is Android’s code shrinker and obfuscator, the successor to ProGuard; it removes unused Java and Kotlin code from release builds and renames what remains.'
aliases:
  - 'R8'
  - 'ProGuard'
  - 'Minification'
related:
  - 'Release Build'
  - 'Code Obfuscation'
  - 'Crash Reporting'
  - 'Gradle'
updated: 2026-11-13
---

R8 is the tool the Android build uses to shrink, optimise and obfuscate Java and Kotlin bytecode in a [release build](/react-native-glossary/release-build). It replaced ProGuard as the default years ago but still reads ProGuard’s configuration format, which is why the file is called `proguard-rules.pro` and people use the names interchangeably.

In a bare React Native project it is switched off by default. The template’s `android/app/build.gradle` has a flag, `enableProguardInReleaseBuilds`, that turns on `minifyEnabled` for release; in Expo projects the same setting is exposed through the `expo-build-properties` config plugin. Turning it on typically trims the native part of the app and makes the Java side harder to reverse-engineer.

What it does not touch is your JavaScript. The bundle is minified by Metro and compiled to bytecode by Hermes; R8 never sees it. For protecting JavaScript, see [code obfuscation](/react-native-glossary/code-obfuscation).

The gotcha is **reflection**. R8 deletes or renames anything it cannot see being used, and some libraries look classes up by name at runtime. The result is a release build that crashes with `ClassNotFoundException` or a missing method, while the debug build works perfectly. The fix is a keep rule in `android/app/proguard-rules.pro`, such as `-keep class com.example.sdk.** { *; }`. Well-maintained libraries ship their own consumer rules, so check the library’s docs before writing rules by hand.

Two habits avoid pain:

- **Test the release build with minification on** before every store upload, not just once.
- **Keep the `mapping.txt` file** R8 writes for each build. Without it, Java stack traces from production are full of names like `a.b.c`. Upload it to Play Console and your [crash reporting](/react-native-glossary/crash-reporting) service so they can translate the names back.

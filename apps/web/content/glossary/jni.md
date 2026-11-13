---
title: 'JNI'
summary: 'JNI (Java Native Interface) is the JVM bridge between Java or Kotlin and C++ code, which React Native’s Android side uses to reach Hermes, JSI and the Fabric renderer.'
aliases:
  - 'Java Native Interface'
  - 'fbjni'
related:
  - 'JSI'
  - 'Kotlin'
  - 'C++ TurboModule'
  - 'Hermes'
updated: 2026-11-13
---

JNI, the Java Native Interface, is the standard mechanism that lets code running on the Java Virtual Machine call into native C or C++ libraries, and lets C++ call back into Java or [Kotlin](/react-native-glossary/kotlin). On Android, React Native relies on it constantly, because its engine room is C++.

Here is why it matters. [Hermes](/react-native-glossary/hermes), [JSI](/react-native-glossary/jsi), the Fabric renderer and the TurboModule infrastructure are all C++, shared between iOS and Android. On iOS, Objective-C++ talks to C++ directly. On Android, the app’s Java and Kotlin layer has to cross JNI to reach that shared core, and every native view update and module call that involves C++ passes through it.

Raw JNI is verbose and easy to get wrong: references must be managed manually, type signatures are written as strings, and mistakes crash the process instead of throwing a readable exception. Meta wrote **fbjni**, a C++ helper library, to make this safer, and React Native uses it internally.

Most React Native developers never write JNI themselves:

- Kotlin or Java modules generated from Codegen specs are wired to C++ for you.
- A [C++ TurboModule](/react-native-glossary/cpp-turbomodule) lets you write shared logic once in C++ and skip platform glue entirely.
- Libraries that ship C++ code handle JNI in their own Android build.

Where it does surface is in errors. `java.lang.UnsatisfiedLinkError` means a native `.so` library the app expected is missing or was built for a different CPU architecture — often after excluding architectures to speed up builds, or when a library’s native code was not packaged. Native crashes from JNI code appear in Logcat as a `SIGSEGV` with a native backtrace rather than a JavaScript error, so you need symbol files to read them.

If you do write JNI by hand, keep the surface small and pass simple types across it.

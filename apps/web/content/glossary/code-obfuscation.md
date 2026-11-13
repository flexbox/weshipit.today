---
title: 'Code Obfuscation'
summary: 'Code obfuscation makes a shipped React Native app harder to read and reverse engineer by renaming and scrambling code. It slows attackers down but hides nothing for good.'
aliases:
  - 'Obfuscation'
  - 'Reverse engineering'
related:
  - 'Hermes Bytecode'
  - 'R8 and ProGuard'
  - 'API Keys in Mobile Apps'
  - 'OWASP MASVS'
updated: 2026-11-13
---

Code obfuscation transforms your shipped code so it still runs the same way but is much harder for a person to understand: meaningful names become single letters, control flow is rearranged and strings are encoded. Its purpose is to raise the cost of reverse engineering.

Anyone can download your app and unpack it. An `.apk` or `.ipa` is an archive, and inside it sits your JavaScript bundle. In a React Native app there are three layers to consider:

- **JavaScript.** Release builds are minified, and with Hermes the bundle ships as [Hermes bytecode](/react-native-glossary/hermes-bytecode) rather than source. Bytecode is less readable but not secret: open-source disassemblers and decompilers recover a lot of your logic, strings and API endpoints.
- **Android native code.** [R8](/react-native-glossary/r8-proguard) shrinks and renames Java and Kotlin classes when enabled. It does nothing to your JavaScript, which is a common misunderstanding.
- **iOS native code.** Compiled Swift and Objective-C are harder to read than JavaScript, but class and method names often remain visible.

Dedicated JavaScript obfuscators and commercial app-hardening products go further, with string encryption, control-flow flattening and tamper checks. They add build complexity, can slow the app down, and can break code that relies on function or class names.

The essential point: obfuscation is not encryption. Everything the app needs at runtime is in the package, so a determined attacker will eventually find it. Never rely on it to hide [API keys](/react-native-glossary/api-keys), secrets or business rules that must not be bypassed. Those belong on your server. Treat obfuscation as a speed bump that protects intellectual property and makes casual tampering less attractive, alongside real server-side checks.

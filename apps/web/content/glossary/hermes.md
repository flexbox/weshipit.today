---
title: 'Hermes'
summary: 'Hermes is the JavaScript engine Meta built for React Native. Default since version 0.70, it precompiles code to bytecode for faster startup and lower memory use.'
aliases:
  - 'Hermes engine'
related:
  - 'JavaScript Runtime'
  - 'JavaScript Bundle'
  - 'Metro'
  - 'JavaScript Thread'
updated: 2026-09-12
---

Hermes is an open-source JavaScript engine Meta built specifically for running React Native on mobile. It has been the default engine since **React Native 0.70**, replacing JavaScriptCore.

It is optimised for constraints a browser engine does not have:

- **Ahead-of-time bytecode.** Instead of parsing JavaScript on every launch, Hermes compiles the [bundle](/react-native-glossary/javascript-bundle) to bytecode at build time. That removes parse cost from startup, which is the single biggest win on low-end Android devices.
- **Smaller memory footprint**, from a garbage collector tuned for mobile.
- **No JIT.** Hermes trades peak throughput for start-up speed and predictability — the right trade for UI code, less so for heavy computation.

Two practical notes. Debugging targets React Native DevTools rather than a Chrome tab, because Hermes is not Chrome's V8. And engine gaps are real: an `Intl` or regex feature that works in a browser may be absent, so test on device rather than trusting a web preview.

See [Hermes](https://reactnative.dev/docs/hermes).

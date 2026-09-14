---
title: 'JSI'
summary: 'JSI (JavaScript Interface) is a lightweight C++ API that lets JavaScript hold direct references to native objects and call them synchronously, replacing the bridge.'
aliases:
  - 'JavaScript Interface'
related:
  - 'Bridge'
  - 'TurboModules'
  - 'Legacy vs New Architecture'
  - 'Communication Layer'
updated: 2026-09-12
---

JSI — the JavaScript Interface — is a small C++ API that lets the JavaScript engine and native code talk to each other directly. It is the foundation the whole [New Architecture](/react-native-glossary/legacy-vs-new-architecture) is built on.

Under the legacy [bridge](/react-native-glossary/bridge), every call was converted to a JSON string, queued, and delivered asynchronously. With JSI, native code can expose a _HostObject_ that JavaScript holds a real reference to and invokes like an ordinary object — no serialisation, no queue, and a synchronous return value when one is wanted.

Three things this unlocks:

- **[TurboModules](/react-native-glossary/turbomodules)** — native modules loaded lazily and called directly.
- **[Fabric](/react-native-glossary/fabric-renderer)** — a renderer that can read layout synchronously.
- **Engine independence** — JSI is an abstraction over the engine, so React Native can run on [Hermes](/react-native-glossary/hermes) or JavaScriptCore behind the same interface.

Most app developers never write JSI by hand; they benefit from libraries built on it. See the [New Architecture docs](https://reactnative.dev/architecture/overview).

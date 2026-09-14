---
title: 'Communication Layer'
summary: 'The communication layer is everything that lets JavaScript talk to native platform code — historically the bridge, and today JSI, TurboModules and Codegen.'
aliases:
  - 'JS-native interop'
related:
  - 'JSI'
  - 'TurboModules'
  - 'Bridge'
  - 'Codegen'
  - 'Legacy vs New Architecture'
updated: 2026-09-12
---

The communication layer is the machinery that carries calls between your JavaScript and the platform's native code — reading a file, opening the camera, or pushing a layout update.

Its pieces, in the order they arrived:

1. **[The bridge](/react-native-glossary/bridge)** — the legacy transport. Every call was serialised to JSON and queued asynchronously, so nothing could be read back synchronously.
2. **[JSI](/react-native-glossary/jsi)** — a C++ interface that lets JavaScript hold a direct reference to a native object and invoke it without serialisation.
3. **[TurboModules](/react-native-glossary/turbomodules)** — native modules built on JSI and loaded lazily, so startup no longer pays for modules the app never uses.
4. **[Codegen](/react-native-glossary/codegen)** — generates the C++, Java and Objective-C glue from TypeScript specs, so both sides agree on types at build time.

An `EventEmitter` sits alongside these for the reverse direction, letting native code push events up to JavaScript.

Newcomers meet this layer the first time a library needs `npx expo prebuild` or a native rebuild: that is native code entering the app, not just JavaScript.

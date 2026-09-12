---
title: 'Communication Layer'
updated: 2025-04-29
related: []
---

React Native's communication layer enables JavaScript code to interact with native platform code:

1. **Legacy Bridge**: Asynchronous, serialized JSON-based messaging system
2. **JavaScript Interface (JSI)**: Direct, synchronous communication between JavaScript and C++
3. **TurboModules**: On-demand, type-safe native modules accessed through JSI
4. **CodeGen**: Generates type-safe interfaces between JavaScript and native code

The **EventEmitter** is a core class that manages event handling throughout the system, allowing components to listen for and emit events.

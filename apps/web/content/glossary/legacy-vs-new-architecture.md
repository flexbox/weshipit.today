---
title: 'Legacy vs New Architecture'
summary: 'The New Architecture replaces the asynchronous bridge with JSI, Fabric and TurboModules. It has been the default since React Native 0.76.'
aliases:
  - 'New Architecture'
  - 'Old Architecture'
  - 'Paper'
  - 'Bridgeless'
related:
  - 'Fabric Renderer'
  - 'TurboModules'
  - 'JSI'
  - 'Bridge'
  - 'Codegen'
  - 'Communication Layer'
updated: 2026-09-12
---

React Native has two architectures. The **legacy architecture** (often called Paper) sent every instruction between JavaScript and native code as serialised JSON over an asynchronous [bridge](/react-native-glossary/bridge). The **New Architecture** removes that bridge and lets the two sides call each other directly through [JSI](/react-native-glossary/jsi).

|                | Legacy (Paper)            | New Architecture                                                      |
| -------------- | ------------------------- | --------------------------------------------------------------------- |
| JS ↔ native   | Async JSON bridge         | [JSI](/react-native-glossary/jsi), direct and synchronous             |
| Renderer       | Paper                     | [Fabric](/react-native-glossary/fabric-renderer)                      |
| Native modules | Loaded eagerly at startup | [TurboModules](/react-native-glossary/turbomodules), loaded on demand |
| Type safety    | Hand-written, unchecked   | [Codegen](/react-native-glossary/codegen) from TypeScript specs       |
| Layout         | Yoga                      | [Yoga](/react-native-glossary/yoga), integrated in C++                |

The New Architecture became the default in **React Native 0.76** (October 2024), and 0.80 began winding down legacy support. New apps get it automatically; older apps migrate by upgrading and checking that each native dependency has a New Architecture build.

For newcomers the practical takeaway is that tutorials written before late 2024 may describe bridge behaviour that no longer applies.

---
title: 'Legacy vs New Architecture'
updated: 2025-04-29
related: []
---

React Native is currently transitioning from its legacy architecture to a new architecture. The key differences are:

| Feature           | Legacy Architecture           | New Architecture                                         |
| ----------------- | ----------------------------- | -------------------------------------------------------- |
| JavaScript Bridge | Uses a serialized JSON bridge | Uses JavaScript Interface (JSI) for direct communication |
| UI Management     | Paper UI (Virtual DOM)        | Fabric Renderer (reactive C++ core)                      |
| Native Modules    | Traditional Native Modules    | TurboModules (on-demand, type-safe)                      |
| Code Generation   | Limited                       | Extensive CodeGen for interfaces                         |
| Performance       | Multiple thread jumps         | Reduced thread hopping                                   |
| Layout Engine     | Yoga                          | Yoga (improved integration)                              |

The new architecture is being gradually rolled out through feature flags, allowing developers to opt-in to specific components.

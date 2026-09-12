---
title: 'Fabric Renderer'
summary: 'Fabric is React Native’s rendering system. It builds the view tree in C++ and mounts real native views, replacing the legacy Paper renderer.'
aliases:
  - 'Fabric'
related:
  - 'Legacy vs New Architecture'
  - 'Yoga'
  - 'UI Thread (Main Thread)'
  - 'React Elements'
updated: 2026-09-12
---

Fabric is the renderer React Native uses to turn your component tree into real platform views. It replaced the legacy Paper renderer and is part of the [New Architecture](/react-native-glossary/legacy-vs-new-architecture), default since React Native 0.76.

What changed matters for performance:

- **Shared C++ core.** The view tree, the diffing, and [Yoga](/react-native-glossary/yoga) layout all live in C++ shared by iOS and Android, instead of being reimplemented per platform.
- **Synchronous access.** Because it sits on [JSI](/react-native-glossary/jsi), JavaScript can read layout and dispatch updates without a round trip over the old async [bridge](/react-native-glossary/bridge).
- **Concurrent-safe.** Fabric supports React 18 features such as Suspense and transitions, which the old renderer could not express.

In practice this shows up as fewer dropped frames when a list mounts and less flicker when a screen measures itself before painting.

Fabric renders _host views_: a `<View>` becomes a genuine `UIView` or `ViewGroup`, never a web element. See the [architecture overview](https://reactnative.dev/architecture/fabric-renderer).

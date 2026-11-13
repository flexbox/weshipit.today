---
title: 'Renderer'
summary: 'A renderer is the part of React that turns components into output for one platform. React Native ships its own renderer, so the same React core drives native views.'
aliases:
  - 'React Native renderer'
  - 'Host config'
related:
  - 'Fabric Renderer'
  - 'Reconciliation'
  - 'React Elements'
  - 'React Native Web'
  - 'Out-of-Tree Platform'
updated: 2026-11-13
---

In React, a renderer is the layer that connects the platform-independent core to a real output. The `react` package only knows about components, hooks and state; it does not know what a view is. A renderer supplies that knowledge. `react-dom` renders to the browser DOM, and React Native’s renderer renders to native views.

All renderers share the same engine, the reconciler, which does [reconciliation](/react-native-glossary/reconciliation), scheduling and hooks. Each renderer plugs in a **host config**: a set of functions that tell the reconciler how to create an instance, append a child, update props and commit changes on its platform. That design is why React’s model shows up in unexpected places — Ink renders to the terminal, React Three Fiber to a WebGL scene, and React Native Skia uses its own reconciler to draw to a canvas.

React Native’s renderer is the JavaScript half of the [Fabric renderer](/react-native-glossary/fabric-renderer). Its host config does not create views directly; it builds shadow nodes in C++ through JSI, and Fabric takes over from there. Host components such as `View`, `Text` and `Image` are the elements it understands; your own components are resolved down to those.

Why this matters day to day:

- **`react` and `react-native` versions are locked together.** The renderer is built from the React repository and shipped inside the `react-native` package, so it expects one exact React version. Upgrading `react` on its own produces an "Incompatible React versions" error at start-up. Upgrade both together, as the release notes specify.
- **Not everything from React DOM applies.** APIs that belong to `react-dom`, such as portals created with `createPortal` or DOM form actions, do not exist in React Native.
- **One codebase, several renderers.** [React Native Web](/react-native-glossary/react-native-web) maps React Native’s components onto `react-dom`, which is how an app can target the browser without a new renderer.

When you read "React is platform-agnostic", the renderer is the reason that is true.

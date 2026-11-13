---
title: 'Shadow Tree'
summary: 'The Shadow Tree is the C++ tree of shadow nodes Fabric builds from your React components, where layout is computed before changes are applied to real native views.'
aliases:
  - 'Shadow nodes'
related:
  - 'Fabric Renderer'
  - 'Yoga'
  - 'Reconciliation'
  - 'UI Thread (Main Thread)'
  - 'View Component'
updated: 2026-11-13
---

The Shadow Tree is the intermediate representation the [Fabric renderer](/react-native-glossary/fabric-renderer) keeps between React and the platform. Each host component you render, such as a `<View>` or `<Text>`, gets a shadow node in C++ holding its props, its layout and any native state. Real `UIView` and Android `View` objects are created later from this tree.

Rendering a frame goes through three phases:

- **Render.** React’s output creates or clones shadow nodes on the JavaScript thread. Nodes are immutable, so an update clones only the changed path and shares the rest with the previous tree.
- **Commit.** The new tree is promoted to current and [Yoga](/react-native-glossary/yoga) computes every node’s size and position.
- **Mount.** Fabric diffs the new tree against the one currently on screen and applies the resulting mutations on the [UI thread](/react-native-glossary/ui-thread-main-thread).

Immutability is what makes the New Architecture’s features possible. Several tree revisions can exist at once, so React can prepare an update in the background for [concurrent rendering](/react-native-glossary/concurrent-rendering), and layout can be read synchronously because it lives in C++ rather than behind an asynchronous bridge.

The gotcha is that shadow nodes and native views are not one-to-one. Fabric performs **view flattening**: a `<View>` that only affects layout, with no background, border or event handler, is dropped from the native hierarchy and its children are positioned directly in its parent. That saves memory and draw time, but it surprises code that expects a native view to exist, such as a native library looking up a view by tag or a measurement on a wrapper. Setting `collapsable={false}` on the `<View>` keeps it.

When a React Native talk mentions "shadow threads" or "the shadow queue", it is describing the legacy architecture, which built a similar tree per platform in Objective-C and Java. See [render, commit and mount](https://reactnative.dev/architecture/render-pipeline).

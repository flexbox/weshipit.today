---
title: 'Yoga'
summary: 'Yoga is the cross-platform C++ layout engine React Native uses to implement Flexbox, producing identical layout results on iOS and Android.'
aliases:
  - 'Yoga layout engine'
related:
  - 'Flexbox'
  - 'Fabric Renderer'
  - 'View Component'
  - 'StyleSheet'
updated: 2026-09-12
---

Yoga is the layout engine that turns your style props into concrete positions and sizes. Written in C++ and shared by both platforms, it is the reason a `flex: 1` layout measures the same on an iPhone and a Pixel.

It implements a subset of the CSS Flexbox specification — enough for app layout, without the parts that only make sense in a document. Yoga knows nothing about React: it receives a tree of nodes with style properties and returns a tree of rectangles, which the [Fabric renderer](/react-native-glossary/fabric-renderer) then mounts as native views.

Differences from web Flexbox that Yoga enforces, and that catch newcomers:

- `flexDirection` defaults to `column`, not `row`
- `alignContent` defaults to `flex-start`
- `flex` takes a number, not the CSS shorthand string
- There is no `float`, no grid, and no percentage-based `gap` on older versions

Yoga is used outside React Native too, which is why you will see it referenced by other frameworks. See [Yoga](https://www.yogalayout.dev/).

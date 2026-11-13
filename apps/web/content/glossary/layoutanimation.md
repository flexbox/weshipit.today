---
title: 'LayoutAnimation'
summary: 'LayoutAnimation is a React Native API that animates every layout change in the next render automatically, with one line of code and no animated values to manage.'
aliases:
  - 'Layout animation API'
related:
  - 'Layout Animations'
  - 'Reanimated'
  - 'Animated Component'
  - 'Fabric Renderer'
updated: 2026-11-13
---

`LayoutAnimation` is a core API that animates the **next layout update** across the whole app. You call it just before a state change, and every view that moves, resizes, appears or disappears in the resulting commit animates to its new position instead of jumping.

```jsx
const toggle = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  setExpanded((v) => !v);
};
```

There are three presets, `easeInEaseOut`, `linear` and `spring`, or you can pass your own config with a duration and separate `create`, `update` and `delete` settings. The animation runs natively, so it is smooth even while JavaScript is busy.

Its appeal is the effort-to-result ratio: an accordion, a list item being removed, or a card growing to show more detail, with no [animated components](/react-native-glossary/animated-component), shared values or measured heights.

Its weakness is the same feature: it is **global and one-shot**.

- It animates everything that changes in that commit, including unrelated views that happen to re-render at the same moment, which can produce odd movement elsewhere on screen.
- It cannot be interrupted, reversed mid-way, or tied to a gesture.
- It applies to one commit only, so state changes that land in a later render jump without animating.

Older tutorials say Android needs `UIManager.setLayoutAnimationEnabledExperimental(true)`. That flag mattered under the legacy architecture; with the New Architecture, the default since React Native 0.76, it does nothing and can be removed.

For anything that needs per-component control, use the entering, exiting and layout transitions from [Reanimated](/react-native-glossary/reanimated), covered under [layout animations](/react-native-glossary/layout-animations). Keep LayoutAnimation for quick, self-contained transitions where “animate whatever changed” is exactly what you want.

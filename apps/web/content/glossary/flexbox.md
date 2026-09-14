---
title: 'Flexbox'
summary: 'Flexbox is the layout system React Native uses for every view. It matches CSS Flexbox closely, with a column default direction and a few React Native specific differences.'
aliases:
  - 'Flex layout'
related:
  - 'Yoga'
  - 'StyleSheet'
  - 'View Component'
  - 'Safe Area'
updated: 2026-09-12
---

Flexbox is how you lay out every screen in React Native. There is no grid, no float, and no absolute positioning by default — layout is flex containers all the way down, computed by the [Yoga](/react-native-glossary/yoga) engine.

The three properties that do most of the work:

- `flexDirection` — the main axis, `column` (default) or `row`
- `justifyContent` — distribution **along** the main axis
- `alignItems` — alignment **across** the main axis

Differences from web CSS that catch newcomers:

|                         | Web CSS          | React Native                         |
| ----------------------- | ---------------- | ------------------------------------ |
| Default `flexDirection` | `row`            | `column`                             |
| Default `alignContent`  | `stretch`        | `flex-start`                         |
| `flex` value            | shorthand string | a single number                      |
| Units                   | px, rem, %       | unitless density-independent numbers |

`flex: 1` means "take all remaining space", which is why a root screen container almost always has it. If a view is invisible, the usual cause is a parent with no height rather than a styling mistake on the view itself.

See [layout with Flexbox](https://reactnative.dev/docs/flexbox).

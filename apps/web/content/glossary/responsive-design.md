---
title: 'Responsive Design'
summary: 'Responsive design in React Native means layouts that adapt to window size, orientation and device type, from small phones to tablets, foldables and split screens.'
aliases:
  - 'Adaptive layout'
  - 'Tablet layout'
related:
  - 'useWindowDimensions'
  - 'Flexbox'
  - 'Density-Independent Pixels'
  - 'Font Scaling'
  - 'Safe Area'
updated: 2026-11-13
---

Responsive design in React Native is building screens that adapt to the space they are given: a small Android phone, a large iPhone, an iPad in landscape, a foldable opening up, or an app sharing the screen in split view. There are no CSS media queries in core React Native, so you combine layout primitives with runtime measurements.

The tools, from most to least preferred:

- **[Flexbox](/react-native-glossary/flexbox) first.** `flex`, `flexWrap`, percentages, `maxWidth` and `aspectRatio` handle most variation without any code.
- **[useWindowDimensions](/react-native-glossary/usewindowdimensions)** for structural changes, such as switching from one column to two above a width threshold. It updates on rotation and window resize.
- **Breakpoint helpers** from styling libraries such as Unistyles, Tamagui or NativeWind, if you already use one.

```tsx
const { width } = useWindowDimensions();
const columns = width >= 768 ? 2 : 1;
```

Base decisions on the **window**, not the device. An iPad running your app in a narrow split view should get the phone layout, and checking "is this a tablet" gets that wrong.

Common gotchas:

- `Dimensions.get('window')` called at module level reads the size once and never updates. Use the hook inside components.
- Scaling every size by screen width with helper libraries makes text and touch targets huge on tablets and ignores the user’s [font scaling](/react-native-glossary/font-scaling) preference. Adapt layout; keep sizes in [density-independent pixels](/react-native-glossary/density-independent-pixels).
- iPad support is a build setting. Expo apps opt in with `ios.supportsTablet`, and iPad apps are expected to handle every orientation unless you require full screen.
- Do not forget safe areas, which change with orientation.

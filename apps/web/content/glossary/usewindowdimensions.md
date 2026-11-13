---
title: 'useWindowDimensions'
summary: 'useWindowDimensions is a React Native hook returning the window’s width, height, scale and font scale, re-rendering the component when rotation or resizing changes them.'
aliases:
  - 'Dimensions'
  - 'Screen size'
related:
  - 'Responsive Design'
  - 'PixelRatio'
  - 'Safe Area'
  - 'Density-Independent Pixels'
updated: 2026-11-13
---

`useWindowDimensions` is a core hook that returns the size of the app’s window in [density-independent pixels](/react-native-glossary/density-independent-pixels), plus `scale` (pixel density) and `fontScale` (the user’s text size setting). It re-renders the component whenever those values change.

```tsx
const { width, fontScale } = useWindowDimensions();
const columns = width >= 768 ? 3 : 1;
```

It replaced the older imperative `Dimensions` API as the recommended approach. `Dimensions.get('window')` still exists, but the value is a snapshot, which leads to the most common bug in this area:

```ts
const { width } = Dimensions.get('window'); // module scope: read once, never updated
```

Code like that, often found in `StyleSheet.create` files, computes layout once at import time. Rotate the device, open split-screen on an iPad, resize a foldable or a desktop window, and the layout stays at the old size. The hook avoids it because it subscribes for you.

Things worth knowing:

- **Window, not screen.** The hook reports the window your app occupies. `Dimensions.get('screen')` reports the whole display. In split-screen or freeform modes they differ a lot.
- **It does not subtract system UI.** The notch, home indicator, and on edge-to-edge Android the status and navigation bars can all overlap the window. Use [safe area](/react-native-glossary/safe-area) insets for that, not arithmetic on height.
- **Prefer layout over measurement.** Flexbox and percentage widths handle most sizing without reading dimensions at all. Reach for the hook when you need breakpoints, such as switching columns or showing a side panel.

For multiplying sizes by screen density or rounding to physical pixels, see [PixelRatio](/react-native-glossary/pixelratio). For a broader approach to adapting layouts, see [responsive design](/react-native-glossary/responsive-design).

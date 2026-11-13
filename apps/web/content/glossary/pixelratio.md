---
title: 'PixelRatio'
summary: 'PixelRatio is the React Native API that exposes the device’s pixel density and font scale, used to request sharp images and to round layout values to physical pixels.'
aliases:
  - 'Pixel density'
  - 'Device pixel ratio'
related:
  - 'Density-Independent Pixels'
  - 'useWindowDimensions'
  - 'Image Component'
  - 'Font Scaling'
updated: 2026-11-13
---

`PixelRatio` is a core API that tells you how many physical pixels make up one layout unit on the current device. React Native lays everything out in [density-independent pixels](/react-native-glossary/density-independent-pixels); PixelRatio is the bridge to the real screen underneath.

Its methods:

- `PixelRatio.get()` — the density: 1 on old low-density Android phones, 2 or 3 on most modern iPhones and Android flagships, and fractional values such as 2.625 on many Android devices.
- `PixelRatio.getFontScale()` — the user’s text size multiplier from accessibility settings.
- `PixelRatio.getPixelSizeForLayoutSize(size)` — converts layout units to physical pixels.
- `PixelRatio.roundToNearestPixel(size)` — snaps a value to a whole physical pixel.

The main practical use is **requesting the right image size**. A 100-point avatar on a 3x screen needs a 300-pixel image to look sharp; asking a CDN for exactly that avoids both blur and wasted bandwidth.

```js
const px = PixelRatio.getPixelSizeForLayoutSize(100);
const uri = `${avatarUrl}?w=${px}`;
```

`roundToNearestPixel` solves a subtler problem. On fractional-density Android screens, a layout value like 33.3 can land between physical pixels, producing blurry 1-pixel borders or a hairline gap between adjacent views. Rounding fixes it. For the thinnest possible line, `StyleSheet.hairlineWidth` already gives you one physical pixel.

A common misconception is using PixelRatio to make layouts “scale” across devices by multiplying every size by the density. React Native already does that conversion; multiplying again makes everything huge on dense screens. Layout should stay in layout units, with PixelRatio reserved for images, borders and the occasional pixel-perfect alignment.

`getFontScale()` returns the same value as `fontScale` from [useWindowDimensions](/react-native-glossary/usewindowdimensions), but the hook updates when the setting changes, so prefer it inside components.

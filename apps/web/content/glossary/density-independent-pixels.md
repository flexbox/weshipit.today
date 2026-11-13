---
title: 'Density-Independent Pixels'
summary: 'Density-independent pixels are the unitless numbers React Native uses for sizes, mapped to iOS points and Android dp so layouts look the same size on any screen density.'
aliases:
  - 'dp'
  - 'Points'
  - 'Logical pixels'
related:
  - 'PixelRatio'
  - 'StyleSheet'
  - 'Font Scaling'
  - 'Responsive Design'
updated: 2026-11-13
---

Density-independent pixels are the unit behind every number in a React Native style. When you write `width: 100` there is no `px`: the value is 100 logical pixels, which iOS calls points and Android calls dp. The platform multiplies it by the screen’s pixel density to get physical pixels.

That is why the same layout looks roughly the same physical size on a budget Android phone and a high-end iPhone, even though one has far more physical pixels per inch. The multiplier is exposed by [PixelRatio](/react-native-glossary/pixelratio):

```ts
PixelRatio.get(); // e.g. 3 on most recent iPhones
PixelRatio.getPixelSizeForLayoutSize(100); // 300 physical pixels
StyleSheet.hairlineWidth; // thinnest line the screen can draw
```

Where it matters in practice:

- **Images.** A 100×100 slot on a 3× screen needs a 300×300 bitmap to look sharp, which is why bundled images come as `@2x` and `@3x` variants that Metro picks automatically.
- **Thin borders.** `borderWidth: 0.5` renders differently across densities; `StyleSheet.hairlineWidth` gives a true one-pixel line.
- **Pixel snapping.** Fractional sizes are rounded to the physical grid, which can leave a sub-pixel gap between adjacent views. `PixelRatio.roundToNearestPixel` helps.

The common misconception is that density-independent means screen-size-independent. It does not. A 400-wide view fills a phone and looks small on a tablet; adapting to screen size is a [responsive design](/react-native-glossary/responsive-design) job.

Text is a separate case. `fontSize` is also in logical pixels but is further multiplied by the user’s accessibility text size, so a 16 can render much larger. See [font scaling](/react-native-glossary/font-scaling) before fixing heights around text.

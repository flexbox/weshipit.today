---
title: 'Font Scaling'
summary: 'Font scaling is React Native’s support for the user’s system text size, such as iOS Dynamic Type and Android font size, which enlarges Text by default.'
aliases:
  - 'Dynamic Type'
  - 'allowFontScaling'
  - 'Large text'
related:
  - 'Text Component'
  - 'PixelRatio'
  - 'useWindowDimensions'
  - 'Responsive Design'
  - 'Screen Reader'
updated: 2026-11-13
---

Font scaling is how React Native respects the text size people choose in their device settings: Dynamic Type and Larger Text on iOS, Font size on Android. By default every [Text](/react-native-glossary/text-component) and `TextInput` multiplies its `fontSize` by the system font scale, so a user at 150% sees 16-point text rendered at 24.

That default is deliberate. A large share of users raise their text size, many of them older or with low vision, and an app that ignores the setting is hard or impossible for them to read.

You can read the current scale to adapt layouts:

```tsx
import { useWindowDimensions } from 'react-native';

const { fontScale } = useWindowDimensions();
const stackVertically = fontScale > 1.3;
```

[useWindowDimensions](/react-native-glossary/usewindowdimensions) updates when the setting changes; `PixelRatio.getFontScale()` returns the same value imperatively.

Props that control scaling:

- `allowFontScaling` (default `true`) turns scaling on or off for one element.
- `maxFontSizeMultiplier` caps how far an element can grow, which is the right tool for a tab bar label or a badge that must stay compact.
- On iOS, `dynamicTypeRamp` on `Text` maps it to an iOS text style, such as body or caption, so it scales along the matching Dynamic Type curve.

What breaks in practice is layout, not text. Fixed `height` values, `numberOfLines={1}` on important labels and rows that assume one line all clip or overlap at large sizes. Let containers grow with content, allow wrapping, and switch from a row to a column when the scale is high.

The most common mistake is fixing those bugs by setting `allowFontScaling={false}` on every Text. It hides the problem by removing an accessibility feature users rely on. Cap specific elements with `maxFontSizeMultiplier` instead, and test the main screens at the largest setting on both platforms.

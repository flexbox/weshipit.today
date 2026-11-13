---
title: 'React Native SVG'
summary: 'React Native SVG is the library that renders SVG graphics natively, exposing elements such as Svg, Path and Circle as React components on iOS and Android.'
aliases:
  - 'react-native-svg'
  - 'SVG'
related:
  - 'Skia'
  - 'Image Component'
  - 'Metro'
  - 'Reanimated'
updated: 2026-11-13
---

React Native SVG (`react-native-svg`) is the community library that brings SVG to React Native. React Native has no built-in SVG support, and the core [Image](/react-native-glossary/image-component) component cannot display `.svg` files, so this package fills the gap by drawing vector shapes with native code.

It mirrors SVG markup as components, so icons, charts and illustrations can be written or pasted in almost directly:

```tsx
import Svg, { Circle, Path } from 'react-native-svg';

<Svg width={24} height={24} viewBox="0 0 24 24">
  <Circle cx={12} cy={12} r={10} stroke="currentColor" fill="none" />
  <Path d="M8 12l3 3 5-6" stroke="currentColor" fill="none" />
</Svg>;
```

Most icon libraries for React Native are built on top of it. To import `.svg` files as components rather than hand-converting them, teams add `react-native-svg-transformer` to the [Metro](/react-native-glossary/metro) config, or convert them ahead of time with a tool such as SVGR.

Practical notes:

- **Always set `viewBox`.** Without it, changing `width` and `height` crops the drawing instead of scaling it.
- **`currentColor`** picks up the `color` prop, which makes recolouring icons for themes easy.
- Not every SVG feature is supported. Some filters, CSS inside `<style>` blocks and certain masks render differently or not at all, so check exported files from design tools.
- Shapes can be animated with [Reanimated](/react-native-glossary/reanimated) by making them animated components, but hundreds of animated nodes get expensive.

The usual misconception is that it is the right tool for every graphic. For complex, frequently updating drawings, [Skia](/react-native-glossary/skia) renders faster on the GPU; for displaying a static remote SVG, `expo-image` can render it like any other image.

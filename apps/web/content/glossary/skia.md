---
title: 'Skia'
summary: 'React Native Skia is Shopify’s library that brings Google’s Skia 2D graphics engine to React Native, for drawing custom shapes, charts, shaders and effects on a canvas.'
aliases:
  - 'React Native Skia'
  - '@shopify/react-native-skia'
related:
  - 'React Native SVG'
  - 'Reanimated'
  - 'Shared Value'
  - 'Bundle Size'
updated: 2026-11-13
---

Skia is the open-source 2D graphics engine Google uses in Chrome, Android and Flutter. React Native Skia (`@shopify/react-native-skia`) exposes it as React components, so you can draw directly onto a GPU-backed canvas: paths, gradients, blurs, image filters, text along a path and custom shaders, all things ordinary views cannot do.

```tsx
import { Canvas, Circle, Group, Blur } from '@shopify/react-native-skia';

<Canvas style={{ width: 256, height: 256 }}>
  <Group>
    <Circle cx={128} cy={128} r={64} color="tomato" />
    <Blur blur={8} />
  </Group>
</Canvas>;
```

It is what you reach for when a design goes beyond rectangles and borders: animated charts, generative backgrounds, image editors, glass and noise effects, or games. Shaders are written in Skia’s shading language and run on the GPU, so effects that would be impossible with views are cheap.

It integrates directly with [Reanimated](/react-native-glossary/reanimated). Skia component props accept [shared values](/react-native-glossary/shared-value), so a circle’s radius or a shader uniform can be driven by a gesture or animation on the UI thread without React re-rendering.

How it compares with [React Native SVG](/react-native-glossary/react-native-svg): SVG maps shapes to native views and is the right tool for icons and static vector graphics. Skia draws everything into one canvas, which scales much better to hundreds of animated shapes and offers effects SVG cannot.

What to weigh before adopting it:

- **[Bundle size](/react-native-glossary/bundle-size).** It ships the Skia engine as native binaries, adding several megabytes to the app. For a single gradient, that is a poor trade.
- **It is not a layout system.** Content inside a canvas has no Flexbox, no native accessibility tree and no text selection. Keep ordinary UI in views and use Skia for the drawn parts.
- **Fonts are explicit.** Text needs a font loaded through Skia’s own APIs, such as `useFont`; system fonts are not used automatically.
- **Web needs extra setup.** On web it runs on CanvasKit, a WebAssembly build of Skia that must be loaded before rendering.

See the [React Native Skia docs](https://shopify.github.io/react-native-skia/).

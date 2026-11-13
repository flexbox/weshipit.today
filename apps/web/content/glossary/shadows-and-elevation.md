---
title: 'Shadows and Elevation'
summary: 'Shadows in React Native come from iOS shadow props, Android elevation, or the cross-platform boxShadow style available on the New Architecture.'
aliases:
  - 'Elevation'
  - 'boxShadow'
  - 'shadowColor'
related:
  - 'StyleSheet'
  - 'Absolute Positioning'
  - 'Legacy vs New Architecture'
  - 'Design Tokens'
updated: 2026-11-13
---

Shadows are one of the few places React Native styling has historically split by platform. There are three ways to draw one.

**iOS shadow props**: `shadowColor`, `shadowOffset`, `shadowOpacity` and `shadowRadius`. They map to the native layer’s shadow and give fine control, but only render on iOS.

**Android `elevation`**: a single number that raises the view on the Material z-axis, and the system draws a shadow based on a light source. You cannot set offset or blur, and the view needs a `backgroundColor` or no shadow appears.

**`boxShadow`**: a CSS-style property, added in React Native 0.76 for the [New Architecture](/react-native-glossary/legacy-vs-new-architecture), that works the same on both platforms and supports spread, inset and multiple shadows.

```tsx
const card = {
  backgroundColor: 'white',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
};
```

On current React Native, `boxShadow` is the simplest choice for new code. Older codebases usually combine the iOS props and `elevation` with `Platform.select`.

Common gotchas:

- **`overflow: 'hidden'` clips the shadow on iOS.** To have rounded, clipped content and a shadow, wrap it: the outer view casts the shadow, the inner one clips.
- **No background colour on iOS** means the shadow is drawn around every child, so text gets a blurry halo.
- **Elevation changes stacking on Android**, so a raised card can cover siblings regardless of `zIndex`; see [absolute positioning](/react-native-glossary/absolute-positioning).
- Many large, blurred shadows in a long list cost rendering time. Keep them subtle and consistent, ideally as a few shared [design tokens](/react-native-glossary/design-tokens).

---
title: 'Absolute Positioning'
summary: 'Absolute positioning takes a React Native view out of the flexbox flow and places it with top, right, bottom and left offsets relative to its parent view.'
aliases:
  - 'position absolute'
  - 'zIndex'
related:
  - 'Flexbox'
  - 'Yoga'
  - 'Shadows and Elevation'
  - 'StyleSheet'
updated: 2026-11-13
---

Absolute positioning removes a view from the normal [flexbox](/react-native-glossary/flexbox) layout and places it at fixed offsets with `top`, `right`, `bottom` and `left`. Its siblings lay out as if it did not exist. It is how you build badges, floating action buttons, overlays and image captions.

The big difference from CSS: in React Native every view is `position: 'relative'` by default, so an absolutely positioned child is always placed relative to its **direct parent**, not to the nearest positioned ancestor or the screen.

```tsx
<View style={{ width: 48, height: 48 }}>
  <Avatar />
  <View style={{ position: 'absolute', top: -4, right: -4 }}>
    <Badge count={3} />
  </View>
</View>
```

`StyleSheet.absoluteFill` is a shortcut for "cover the whole parent", handy for overlays and backgrounds.

**zIndex** controls stacking, with rules that surprise people:

- It only orders **siblings**. A child cannot escape its parent’s stacking, however high its `zIndex`.
- Without it, later siblings draw on top of earlier ones.
- On Android, `elevation` also affects drawing order, so a view with a [shadow](/react-native-glossary/shadows-and-elevation) can cover a sibling that has a higher `zIndex`. Give both the same elevation or set it explicitly.

The most common gotcha is touches. A child positioned outside its parent’s bounds, like the badge above, may be visible but not tappable on Android, because touches are only delivered inside the parent’s frame. Make the parent large enough, or move the floating element higher up the tree.

Reach for absolute positioning sparingly. Hard-coded offsets break with [font scaling](/react-native-glossary/font-scaling), translations and different screen sizes, where a flex layout would adapt.

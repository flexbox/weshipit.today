---
title: 'Layout Animations'
summary: 'Layout animations are Reanimated’s entering, exiting and layout props, which animate a component automatically when it mounts, unmounts or changes position in the layout.'
aliases:
  - 'Entering'
  - 'Exiting'
  - 'Reanimated layout animations'
related:
  - 'Reanimated'
  - 'LayoutAnimation'
  - 'Animated Component'
  - 'FlatList'
updated: 2026-11-13
---

Layout animations are a [Reanimated](/react-native-glossary/reanimated) feature that animates components through structural changes you could not otherwise animate: appearing, disappearing, and moving because something around them changed. You declare them as props on an [animated component](/react-native-glossary/animated-component) and Reanimated handles the rest.

```tsx
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

<Animated.View entering={FadeIn.duration(250)} exiting={FadeOut} layout={LinearTransition.springify()} />;
```

- **`entering`** runs when the component mounts.
- **`exiting`** runs when it unmounts. Reanimated keeps the native view on screen until the animation finishes, which you cannot do with ordinary React rendering.
- **`layout`** runs when the component’s size or position changes, such as list items sliding up after one is deleted.

Reanimated ships a large set of presets (fades, slides, zooms, bounces, flips) with chainable modifiers like `.duration()`, `.delay()` and `.springify()`, and you can write custom ones.

This is different from React Native’s core [LayoutAnimation](/react-native-glossary/layoutanimation) API, which animates the next layout change for the whole tree at once and offers little control. Reanimated’s version is per component and supports exit animations.

Gotchas to expect:

- **Exiting needs a surviving parent.** If the parent unmounts too, for example when the whole screen is popped, the child’s exit animation never plays.
- **Entering runs on first mount.** A list that fades in every row when the screen opens may not be what you want. Wrap it in `LayoutAnimationConfig` with `skipEntering` to animate only rows added later.
- **Lists need the list-level prop.** In an `Animated.FlatList`, item reordering is animated with `itemLayoutAnimation` rather than a `layout` prop on each row, because rows are wrapped in cells you do not render. See [FlatList](/react-native-glossary/flatlist).
- **Keys matter.** Entering and exiting are tied to component identity, so unstable keys make every item exit and re-enter on each update.

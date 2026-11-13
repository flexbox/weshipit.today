---
title: 'Shared Value'
summary: 'A shared value is Reanimated’s animatable state container, created with useSharedValue, readable and writable from both the JavaScript thread and the UI thread.'
aliases:
  - 'useSharedValue'
related:
  - 'Reanimated'
  - 'useAnimatedStyle'
  - 'Worklet'
  - 'Spring Animation'
  - 'Gesture Handler'
updated: 2026-11-13
---

A shared value is the piece of state that drives a [Reanimated](/react-native-glossary/reanimated) animation. You create it with `useSharedValue`, and unlike React state it can be read and written from both the JavaScript thread and the UI thread, where [worklets](/react-native-glossary/worklet) run every frame.

```tsx
const progress = useSharedValue(0);

progress.value = withTiming(1); // animate to 1
progress.set(withSpring(0)); // same thing, React Compiler-friendly
const current = progress.get(); // read outside a worklet
```

The defining behaviour: changing a shared value **does not re-render the component**. Instead, any [animated style](/react-native-glossary/useanimatedstyle), derived value or animated reaction that reads it is re-evaluated on the UI thread. That is how a gesture can update a position 120 times a second without React doing any work.

Assigning an animation function such as `withTiming` or `withSpring` to a shared value starts the animation, and assigning a new one interrupts it smoothly from wherever it currently is. Derived values (`useDerivedValue`) compute one shared value from others, such as turning a scroll offset into a header opacity.

Mistakes that silently break things:

- **Mutating nested fields.** `pos.value.x = 10` changes the object without Reanimated noticing. Assign a new object (`pos.value = { ...pos.value, x: 10 }`) or use `modify`.
- **Destructuring.** `const { value } = progress` takes a snapshot; later updates never reach it.
- **Reading `.value` during render.** It works, but the component will not re-render when the value changes, so the output goes stale. If React needs to display it, mirror it into React state deliberately, or keep the display inside an animated style.
- **Using it as general app state.** Shared values are for things that change every frame. Data your screens render belongs in React state or a store.

The `get()` and `set()` methods exist alongside `.value` because the React Compiler treats property writes on hook results as mutations it may optimise away.

---
title: 'Refs'
summary: 'A ref is an escape hatch that holds a mutable value or points at a native component instance, letting you call imperative methods without triggering a re-render.'
aliases:
  - 'useRef'
  - 'Reference'
related:
  - 'Props and State'
  - 'Core Components'
  - 'Reanimated'
updated: 2026-09-12
---

A ref is a container for a value that survives re-renders but does not cause one. It has two everyday uses in React Native.

**Reaching a component imperatively.** Attach a ref to a core component and you can call its methods:

```jsx
const inputRef = useRef(null);
<TextInput ref={inputRef} />;
// later
inputRef.current?.focus();
```

That is the supported way to focus a field, scroll a list to an offset, or measure a view — actions that have no declarative equivalent.

**Storing mutable data.** A timer id, a previous value, or a "has this already fired" flag belongs in `useRef` rather than `useState`, precisely because writing to it should not re-render.

The guidance is to reach for refs sparingly: if a value affects what the user sees, it should be [state](/react-native-glossary/props-and-state), not a ref. See [referencing values with refs](https://react.dev/learn/referencing-values-with-refs).

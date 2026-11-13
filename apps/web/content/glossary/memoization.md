---
title: 'Memoization'
summary: 'Memoization caches the result of a computation and reuses it while its inputs stay the same. In React Native it is used to skip wasted renders and repeated work.'
aliases:
  - 'Memoize'
  - 'Cache computation'
related:
  - 'useMemo and useCallback'
  - 'React.memo'
  - 'React Compiler'
  - 'Re-render'
updated: 2026-11-13
---

Memoization is a caching technique: store the result of a function for a given set of inputs, and return the stored result instead of recomputing when the same inputs come back. In React Native apps it is the main tool for avoiding wasted [re-renders](/react-native-glossary/re-render) and repeated expensive calculations.

React gives you three forms of it:

- **[React.memo](/react-native-glossary/react-memo)** skips re-rendering a component when its props are shallowly equal to last time.
- **`useMemo`** caches a computed value, such as a filtered and sorted list.
- **`useCallback`** caches a function so its identity stays stable between renders.

They work together. `React.memo` on a list row is useless if the parent passes a new inline function or object on every render, because shallow comparison sees a different reference each time:

```tsx
// New function every render: the memoised Row re-renders anyway
<Row onPress={() => select(item.id)} />;

// Stable reference: Row can skip the render
const onPress = useCallback(() => select(item.id), [item.id]);
<Row onPress={onPress} />;
```

The misconception is that memoising everything makes an app faster. Every memo has a cost: storing values, comparing dependencies, and more code to read. For cheap components and trivial calculations the comparison can cost as much as the render it saves. Memoise where a profiler shows real waste, typically list items, heavy charts and context values.

The [React Compiler](/react-native-glossary/react-compiler) changes the picture: it inserts this memoisation automatically at build time. In a codebase using it, manual `useMemo` and `useCallback` become mostly unnecessary.

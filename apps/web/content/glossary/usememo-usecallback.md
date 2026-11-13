---
title: 'useMemo and useCallback'
summary: 'useMemo caches a computed value and useCallback caches a function between renders, so they keep the same identity until one of their dependencies changes.'
aliases:
  - 'Memoization hooks'
related:
  - 'Memoization'
  - 'React.memo'
  - 'Re-render'
  - 'React Compiler'
  - 'FlatList'
updated: 2026-11-13
---

`useMemo` and `useCallback` are React hooks that remember something between renders. `useMemo(() => compute(a), [a])` returns the cached result until `a` changes; `useCallback(fn, [a])` returns the same function object until `a` changes. `useCallback(fn, deps)` is simply `useMemo(() => fn, deps)`.

They solve two different problems:

- **Expensive work.** Sorting or filtering a few thousand items on every keystroke can block the [JavaScript thread](/react-native-glossary/javascript-thread). `useMemo` skips the work when the inputs have not changed.
- **Referential stability.** JavaScript compares objects and functions by identity, so an inline `() => {}` is a brand new value each render. That breaks [React.memo](/react-native-glossary/react-memo) on children, re-runs effects that list it as a dependency, and makes [FlatList](/react-native-glossary/flatlist) treat `renderItem` as changed.

```tsx
const visible = useMemo(() => items.filter(matches(query)), [items, query]);
const renderItem = useCallback(({ item }) => <Row item={item} onPress={select} />, [select]);
```

The most common misconception is that wrapping everything makes an app faster. `useCallback` on a handler passed to a plain, non-memoised component achieves nothing, because the child re-renders anyway when its parent does. The hooks also cost a little: a dependency comparison and retained memory on every render. Use them where a profiler or a memoised consumer gives them something to do.

The second trap is a wrong dependency array. Omit a dependency and you read stale values, a bug that only shows up later; the `react-hooks/exhaustive-deps` lint rule catches it.

With the [React Compiler](/react-native-glossary/react-compiler) enabled, most manual `useMemo` and `useCallback` calls become unnecessary, since the compiler inserts equivalent caching at build time. See [useMemo](https://react.dev/reference/react/useMemo).

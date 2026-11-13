---
title: 'React.memo'
summary: 'React.memo wraps a component so React skips re-rendering it when its props are shallowly equal to last time, a common fix for slow lists in React Native.'
aliases:
  - 'memo'
  - 'Pure component'
related:
  - 'Re-render'
  - 'useMemo and useCallback'
  - 'Memoization'
  - 'FlatList'
  - 'React Compiler'
updated: 2026-11-13
---

`React.memo` is a function that wraps a component and tells React it may reuse the previous render output when the new props are the same as the old ones. It is the function-component equivalent of the old `PureComponent` class.

```tsx
const Row = memo(function Row({ item, onPress }: RowProps) {
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});
```

It matters most in React Native lists. When a screen holding a [FlatList](/react-native-glossary/flatlist) updates — a search box, a selection — every visible row re-renders by default. Memoised rows skip that work, which keeps scrolling and typing smooth on mid-range Android devices.

The comparison is **shallow**: each prop is checked with `Object.is`. That is where most memo wrappers quietly stop working:

- An inline style object, `style={{ padding: 8 }}`, is a new object every render.
- An inline arrow function, `onPress={() => ...}`, is a new function every render.
- JSX passed as `children` is a new element every render, so a memoised component that takes children almost never skips.

Stabilise those props with `StyleSheet.create`, [useMemo and useCallback](/react-native-glossary/usememo-usecallback), or by passing ids instead of objects. You can also pass a custom `arePropsEqual(prev, next)` as the second argument, but a comparator that ignores a prop which does change causes stale UI that is hard to trace.

Two limits worth knowing. `memo` only guards against parent-driven [re-renders](/react-native-glossary/re-render): the component still re-renders when its own state changes or a context it reads changes. And memoising cheap leaf components often costs more in comparisons than it saves.

The [React Compiler](/react-native-glossary/react-compiler) applies equivalent memoisation automatically, which makes hand-written `memo` largely unnecessary in projects that enable it. See [memo](https://react.dev/reference/react/memo).

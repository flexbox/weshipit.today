---
title: 'Context'
summary: 'Context is React’s way to pass a value such as a theme, user or locale to any component below a provider without threading it through every level of props.'
aliases:
  - 'React Context'
  - 'useContext'
  - 'Context API'
related:
  - 'State Management'
  - 'Re-render'
  - 'Props and State'
  - 'Hooks'
updated: 2026-11-13
---

Context lets a parent make a value available to its whole subtree. You create it with `createContext`, provide it near the top of the tree, and read it anywhere below with `useContext` (or `use` in React 19). It replaces "prop drilling": passing the same prop through five components that do not need it.

```tsx
const ThemeContext = createContext<Theme>(lightTheme);

function App() {
  const scheme = useColorScheme();
  return (
    <ThemeContext value={scheme === 'dark' ? darkTheme : lightTheme}>
      <Root />
    </ThemeContext>
  );
}
```

In React 19 the context object can be rendered directly as the provider, as above; earlier versions use `<ThemeContext.Provider value={...}>`.

React Native apps are built on context more than most developers realise. React Navigation, safe area insets, gesture handler roots and most data libraries expose their state through providers, which is why "must be used within a Provider" errors are so common: the hook is being called outside the subtree, often in a component rendered above `NavigationContainer`.

The performance gotcha is that **every component reading a context re-renders when its value changes**, compared by identity. Two consequences:

- Passing an inline object, `value={{ user, setUser }}`, creates a new value on every render of the provider and [re-renders](/react-native-glossary/re-render) every consumer. Wrap it in `useMemo`.
- One large context holding many unrelated fields re-renders everything when any field changes. Split it into smaller contexts, or keep fast-changing data elsewhere.

`React.memo` does not stop a context-driven re-render, because the update comes from inside the component, not from its props.

The common misconception is that context is a [state management](/react-native-glossary/state-management) library. It is a transport for a value; it has no selectors and no subscriptions to slices. It suits values that change rarely — theme, locale, the signed-in user. For frequently changing shared state, a store such as Zustand or Redux re-renders only the components that select what changed. See [useContext](https://react.dev/reference/react/useContext).

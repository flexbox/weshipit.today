---
title: 'useEffect'
summary: 'useEffect is the React hook that runs code after a component renders, used to subscribe to native events, start timers or fetch data, with optional cleanup.'
aliases:
  - 'Effect hook'
  - 'side effects'
related:
  - 'Hooks'
  - 'Component Lifecycle'
  - 'Memory Leak'
  - 'Strict Mode'
  - 'AppState'
updated: 2026-11-13
---

`useEffect` is the [hook](/react-native-glossary/hooks) for synchronising a component with something outside React: a native event, a timer, a socket, a network request. React runs the effect after the render is committed, and runs the function you return as cleanup before the next run and when the component unmounts.

```tsx
useEffect(() => {
  const sub = AppState.addEventListener('change', setAppState);
  return () => sub.remove();
}, []);
```

The dependency array controls when it re-runs:

- No array: after every render.
- `[]`: once on mount, cleaned up on unmount.
- `[userId]`: whenever `userId` changes between renders.

In React Native, effects are mostly about native subscriptions — [AppState](/react-native-glossary/appstate), Keyboard, Linking, Dimensions — each of which returns an object with `remove()`. Forgetting that cleanup is the most common source of a [memory leak](/react-native-glossary/memory-leak) and of handlers firing twice after a screen remounts.

Gotchas that bite in practice:

- **Objects and functions in the dependency array** are new on every render, so the effect re-runs every time. Depend on primitives, or stabilise the value with `useMemo` or `useCallback`.
- **Race conditions when fetching.** If the user switches screens quickly, an old response can overwrite a new one. Set an `ignore` flag or abort the request in cleanup.
- **It runs twice in development** under [Strict Mode](/react-native-glossary/strict-mode). That is deliberate: if the double run breaks something, your cleanup is incomplete.
- **Measuring layout.** For reading a view's size before the user sees it, `useLayoutEffect` runs before paint; on the New Architecture it can measure synchronously without a visible jump.

Many effects are unnecessary. Values you can compute from props or state during render do not belong in an effect plus `setState`. See [useEffect](https://react.dev/reference/react/useEffect).

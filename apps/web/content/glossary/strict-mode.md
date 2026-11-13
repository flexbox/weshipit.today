---
title: 'Strict Mode'
summary: 'Strict Mode is a development-only React wrapper that double-invokes renders and effects and flags deprecated APIs, so bugs in impure components show up early.'
aliases:
  - 'React.StrictMode'
related:
  - 'useEffect'
  - 'Component Lifecycle'
  - 'Memory Leak'
  - 'React Compiler'
updated: 2026-11-13
---

Strict Mode is a component, `<StrictMode>`, that turns on extra checks for everything inside it during development. It renders nothing itself and is completely inert in a release build.

```tsx
export default function App() {
  return (
    <StrictMode>
      <RootNavigator />
    </StrictMode>
  );
}
```

What it does to your components while you develop:

- **Renders twice.** Each component function, initialiser and reducer runs an extra time, and the second result is discarded. A component that mutates a variable outside itself or pushes to an array during render will show the duplicate.
- **Runs effects twice on mount.** React mounts, runs every [effect](/react-native-glossary/useeffect), simulates an unmount by running the cleanups, then runs the effects again. A subscription without a cleanup ends up registered twice; a `Keyboard` or `AppState` listener fires two callbacks.
- **Warns about legacy APIs**, such as string refs and old lifecycle methods like `componentWillMount`.

The point is to simulate what React may do anyway. Under [concurrent rendering](/react-native-glossary/concurrent-rendering) a render can be started and thrown away, and a component can be unmounted and restored with its previous state. Code that survives Strict Mode survives those.

The common reaction is to remove Strict Mode because "my API call fires twice" or "my logs are doubled". That hides the bug rather than fixing it. Two requests on mount mean the effect has no way to cancel or ignore a stale response, which will bite in production when a user navigates quickly. Add the cleanup instead. (React DevTools dims the logs from the second render so you can tell them apart.)

Strict Mode also matters for the [React Compiler](/react-native-glossary/react-compiler): the compiler assumes components are pure, and Strict Mode’s double render is the cheapest way to find the ones that are not. In an Expo or React Native CLI project, wrap your root component yourself, since the templates may not add it for you. See [StrictMode](https://react.dev/reference/react/StrictMode).

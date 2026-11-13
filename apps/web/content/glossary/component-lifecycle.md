---
title: 'Component Lifecycle'
summary: 'The component lifecycle is the sequence a React component goes through: it mounts onto the screen, updates when state or props change, and unmounts when removed.'
aliases:
  - 'Mount'
  - 'Unmount'
  - 'Lifecycle methods'
related:
  - 'useEffect'
  - 'Hooks'
  - 'Stack Navigator'
  - 'AppState'
updated: 2026-11-13
---

Every React component goes through three phases. It **mounts** when React first adds it to the tree and creates its native views, it **updates** each time it re-renders with new state, props or context, and it **unmounts** when React removes it and destroys its views. State lives exactly as long as the component stays mounted.

Class components expose these as lifecycle methods: `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`. Function components express the same thing with [hooks](/react-native-glossary/hooks):

```tsx
useEffect(() => {
  startTracking(); // after mount
  return () => stopTracking(); // before unmount
}, []);
```

A [`useEffect`](/react-native-glossary/useeffect) with dependencies covers the update case. Hooks encourage thinking in terms of "keep this in sync with that" rather than "what happens on mount", but the phases underneath are unchanged.

In React Native the lifecycle diverges from what web developers expect in two places:

- **Navigating away does not unmount.** In a [stack navigator](/react-native-glossary/stack-navigator), pushing a new screen keeps the previous one mounted underneath so the back gesture can reveal it instantly. Tabs stay mounted once visited. Code in a mount effect therefore runs once, not every time the screen appears. To run work when a screen gains or loses focus, React Navigation provides `useFocusEffect` and `useIsFocused`.
- **Backgrounding the app does not unmount.** When the user switches apps, your components stay mounted and frozen. To pause a video or refresh data on return, listen to [AppState](/react-native-glossary/appstate).

The usual bug is subscriptions that outlive their component because no cleanup was returned. The opposite surprise also happens: a screen that unmounts and remounts — after a `key` change or a conditional render — loses all its local state, including scroll position and text input values. If state must survive, lift it above the component that comes and goes.

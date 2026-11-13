---
title: 'Concurrent Rendering'
summary: 'Concurrent rendering lets React prepare an update in the background and interrupt it for urgent input, using startTransition, useTransition and useDeferredValue.'
aliases:
  - 'Concurrent React'
  - 'startTransition'
  - 'useTransition'
related:
  - 'Suspense'
  - 'Fabric Renderer'
  - 'Shadow Tree'
  - 'JavaScript Thread'
  - 'Re-render'
updated: 2026-11-13
---

Concurrent rendering is React’s ability to work on a render without committing it straight away, pause it, and throw it away if something more urgent arrives. It arrived with React 18, and in React Native it requires the New Architecture, because only the [Fabric renderer](/react-native-glossary/fabric-renderer) and its immutable [Shadow Tree](/react-native-glossary/shadow-tree) can hold more than one version of the UI at a time.

You opt in per update by marking it as non-urgent:

```tsx
const [isPending, startTransition] = useTransition();

function onChangeText(text: string) {
  setQuery(text); // urgent: the TextInput must update now
  startTransition(() => setFilter(text)); // can wait
}
```

Typing stays responsive while the filtered list renders in the background. If the user types again before it finishes, React abandons the stale render and starts the new one. `isPending` lets you dim the list meanwhile. `useDeferredValue(value)` achieves the same thing when you only control the value, not the setter.

Concurrent React also brings automatic batching, which merges several state updates from a timer, promise or native event into a single re-render, and makes [Suspense](/react-native-glossary/suspense) transitions keep the old screen visible instead of flashing a fallback.

The misconception to avoid: concurrency does not add threads. Rendering still happens on the single [JavaScript thread](/react-native-glossary/javascript-thread). React yields between components so input can be handled, but one component that takes 200 ms to render still blocks for 200 ms, and work outside rendering — a big `JSON.parse`, a sort inside an event handler — is not interruptible at all. Transitions also cannot wrap a controlled `TextInput` value; keep that update urgent.

If you upgraded from the legacy architecture and transitions seem to do nothing, check that the New Architecture is actually enabled. See [useTransition](https://react.dev/reference/react/useTransition).

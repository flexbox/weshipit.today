---
title: 'Re-render'
summary: 'A re-render is React calling a component function again to compute new output. It does not always change the screen, but too many of them slow a React Native app.'
aliases:
  - 'Rerender'
  - 'Wasted render'
related:
  - 'Reconciliation'
  - 'React.memo'
  - 'Profiling'
  - 'React DevTools'
  - 'React Compiler'
updated: 2026-11-13
---

A re-render is React running a component function again after the first render, to work out what the UI should look like now. Only after that does [reconciliation](/react-native-glossary/reconciliation) decide whether any native view actually needs to change.

A component re-renders for three reasons:

- Its own state changed (`setState`, a reducer dispatch).
- Its parent re-rendered. By default every child re-renders with it, whether or not its props changed.
- A [context](/react-native-glossary/context) it reads changed value.

Notice what is missing: "its props changed" is not a trigger on its own. Props only change because a parent re-rendered.

Re-rendering is normal and usually cheap. It becomes a problem in React Native because all of it runs on the single JavaScript thread. When a keystroke in a search box re-renders a screen with a hundred list rows, the thread is busy while touches and scroll events queue up, and the user feels lag. A **wasted render** is one where the component ran but produced identical output.

To find them, turn on "Highlight updates when components render" in [React DevTools](/react-native-glossary/react-devtools), or record a session in the profiler, which also reports why each component rendered.

Typical fixes, in order of preference:

- Move state down, closer to where it is used, so less of the tree depends on it.
- Pass expensive subtrees as `children`, so they are not recreated when the wrapper’s state changes.
- Memoise list rows with [React.memo](/react-native-glossary/react-memo) and stabilise their props.
- Enable the React Compiler, which memoises automatically.

The common mistake is optimising by instinct. A re-render is not the same as a native view update, and a hundred cheap re-renders can cost less than one memo comparison you added to the wrong component. Measure first.

---
title: 'Hooks'
summary: 'Hooks are React functions such as useState and useEffect that let a function component hold state, run side effects and reach React features without a class.'
aliases:
  - 'React hooks'
related:
  - 'useEffect'
  - 'Custom Hook'
  - 'Props and State'
  - 'useMemo and useCallback'
  - 'Component Lifecycle'
updated: 2026-11-13
---

Hooks are functions whose names start with `use` that let a function component tap into React: keep state between renders, run code after rendering, read context, or hold a mutable value. They are how every modern React Native component is written; class components still work but new code and new libraries assume hooks.

The ones you will use daily:

- `useState` and `useReducer` for local [state](/react-native-glossary/props-and-state).
- [`useEffect`](/react-native-glossary/useeffect) for subscriptions and other side effects.
- `useRef` for a value that survives renders without causing one, including [refs](/react-native-glossary/refs) to native views.
- `useContext` (or `use` in React 19) for shared values.
- `useMemo` and `useCallback` for keeping values and functions stable.

React Native adds its own, such as `useWindowDimensions` and `useColorScheme`, and most libraries expose their API as hooks too: `useNavigation`, `useSharedValue`, `useQuery`.

Hooks rely on call order. React stores each hook's data in a list attached to the component and matches them up by position on every render, which is why the two rules exist:

- Call hooks only at the top level, never inside a condition, loop or after an early `return`.
- Call them only from components or from other hooks.

Break the first rule and you get "Rendered more hooks than during the previous render" or, worse, state silently landing in the wrong variable. The classic slip in React Native is an early `return <ActivityIndicator />` placed above a `useEffect`. Install `eslint-plugin-react-hooks`, which catches both rules and missing effect dependencies.

Packaging your own combination of hooks into a reusable function gives you a [custom hook](/react-native-glossary/custom-hook). See the [hooks reference](https://react.dev/reference/react/hooks).

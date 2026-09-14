---
title: 'Props and State'
summary: 'Props are the read-only inputs a component receives from its parent. State is the data a component owns and can change, triggering a re-render.'
aliases:
  - 'Properties'
  - 'useState'
related:
  - 'React Elements'
  - 'JSX'
  - 'Keys'
  - 'Refs'
updated: 2026-09-12
---

Props and state are the two ways data reaches a React Native component, and the difference decides where a value should live.

**Props** are arguments passed down from a parent. They are read-only: a component must never write to its own props. Changing a prop is the parent's job, and doing so re-renders the child.

**State** is data a component owns, created with the `useState` hook. Calling the setter schedules a re-render with the new value:

```jsx
const [count, setCount] = useState(0);
<Button title={`Tapped ${count}`} onPress={() => setCount(count + 1)} />;
```

The practical rule newcomers ask about: if two components need the same value, [lift the state up](https://react.dev/learn/sharing-state-between-components) to their closest common parent and pass it down as props. If a value changes but should _not_ trigger a re-render — a timer id, a scroll offset — it belongs in a [ref](/react-native-glossary/refs) instead.

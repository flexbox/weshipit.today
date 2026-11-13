---
title: 'Reconciliation'
summary: 'Reconciliation is React’s process of comparing the new element tree with the previous one to work out the minimal set of changes to apply to the native views.'
aliases:
  - 'Diffing'
  - 'React diffing algorithm'
related:
  - 'Re-render'
  - 'Keys'
  - 'Shadow Tree'
  - 'React Elements'
  - 'Renderer'
updated: 2026-11-13
---

Reconciliation is the step where React compares the [elements](/react-native-glossary/react-elements) your components just returned with the ones from the previous render and decides what actually changed. In React Native the result is a set of create, update and delete operations that the [renderer](/react-native-glossary/react-native-renderer) turns into native view changes.

A full tree diff would be too slow, so React relies on two shortcuts:

- **Different type, different subtree.** If a position held a `<View>` and now holds a `<ScrollView>`, or `<ProfileCard>` becomes `<SettingsCard>`, React throws the old subtree away — state included — and mounts the new one from scratch.
- **Keys identify siblings.** In a list, React matches children by their [key](/react-native-glossary/keys) rather than their index, so a moved item keeps its state.

Same type and same position means React keeps the component instance and its state, and only updates the props that differ.

The most common bug this explains is defining a component inside another component:

```tsx
function Screen() {
  const Field = () => <TextInput />; // new type on every render
  return <Field />;
}
```

Because `Field` is a new function each time `Screen` renders, React sees a different type, unmounts the old input and mounts a new one. The keyboard closes after every keystroke and the text resets. Move `Field` to module level.

You can also use this rule deliberately: changing a component’s `key` forces React to discard it and start fresh, a clean way to reset a form when the user switches account.

In React Native under the New Architecture, React’s output feeds the [Shadow Tree](/react-native-glossary/shadow-tree) in C++, which does its own diff to produce the final mount instructions for the UI thread. See [preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state).

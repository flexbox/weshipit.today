---
title: 'Custom Hook'
summary: 'A custom hook is your own function, named with a use prefix, that combines built-in hooks so several React Native components can reuse the same stateful logic.'
aliases:
  - 'Custom hooks'
related:
  - 'Hooks'
  - 'useEffect'
  - 'Context'
  - 'Unit Testing'
updated: 2026-11-13
---

A custom hook is a JavaScript function whose name starts with `use` and which calls other [hooks](/react-native-glossary/hooks). It is the standard way to extract stateful logic — a subscription, a form, a timer — out of a component so it can be shared and tested on its own.

```tsx
function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setVisible(false));
    return () => [show, hide].forEach((sub) => sub.remove());
  }, []);
  return visible;
}
```

Any component can now call `useKeyboardVisible()` instead of repeating the listener setup and cleanup. React Native code is full of these: wrapping [AppState](/react-native-glossary/appstate), network status, permissions, or a data request behind a one-line call keeps screens readable.

The key misconception: **a custom hook shares logic, not state.** Two components calling `useKeyboardVisible()` each get their own `useState` and their own listeners. If you want both to see the same value, put it in [context](/react-native-glossary/context) or a store, and let the hook read from there.

Other things to know:

- The `use` prefix is not decoration. It is how React’s lint rules recognise a hook and check the rules of hooks inside it. A function that calls `useState` but is named `getKeyboardState` escapes those checks.
- A function that calls no hooks should not be named `use…`; make it a plain utility instead.
- Return a stable shape. Returning a new object or function each render forces consumers to deal with changing identities; wrap returned callbacks in `useCallback`.
- Hooks are tested with `renderHook` from [React Native Testing Library](/react-native-glossary/react-native-testing-library), without building a dummy component.

See [reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks).

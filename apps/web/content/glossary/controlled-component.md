---
title: 'Controlled Component'
summary: 'A controlled component is an input whose current value comes from React state through props, so React rather than the native view is the source of truth.'
aliases:
  - 'Controlled input'
  - 'Uncontrolled component'
related:
  - 'TextInput'
  - 'Switch'
  - 'Props and State'
  - 'Refs'
updated: 2026-11-13
---

A controlled component is an input that displays exactly what React tells it to. In React Native that usually means a [TextInput](/react-native-glossary/textinput) with a `value` prop and an `onChangeText` handler that writes back to state. An **uncontrolled** component keeps its own value inside the native view; you give it a starting `defaultValue` and read it when you need it, typically through a [ref](/react-native-glossary/refs) or the last change event.

```tsx
// Controlled
<TextInput value={email} onChangeText={setEmail} />

// Uncontrolled
<TextInput defaultValue="" onChangeText={(t) => (emailRef.current = t)} />
```

Controlled inputs are the default choice because the value is always available for validation, formatting and conditional UI, and resetting a form is just resetting state.

The React Native twist is that the text really lives in a native `UITextField` or `EditText`. Each keystroke travels to JavaScript, updates state, re-renders, and sends the value back. Usually that is invisible. It shows when the [JavaScript thread](/react-native-glossary/javascript-thread) is busy, or when your handler rewrites the text — forcing uppercase, inserting spaces in a card number — where the native field and React can briefly disagree, causing flicker or a jumping cursor. The New Architecture reduced this, but heavy formatting on every keystroke is still worth testing on a low-end Android device.

Other gotchas:

- **The value snaps back.** If `onChangeText` does not update the state behind `value`, the input reverts. The same applies to [Switch](/react-native-glossary/switch-component), which is controlled-only: a `Switch` without an `onValueChange` that updates `value` flips and returns.
- **Switching modes.** Starting with `value={undefined}` and later passing a string turns an uncontrolled input into a controlled one, which React warns about. Initialise with `''`.
- **Large forms.** Controlling twenty fields in one component re-renders all of them on every keystroke; form libraries such as React Hook Form lean on uncontrolled inputs for that reason.

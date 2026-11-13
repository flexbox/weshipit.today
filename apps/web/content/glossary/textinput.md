---
title: 'TextInput'
summary: 'TextInput is React Native’s core component for keyboard entry, wrapping UITextField on iOS and EditText on Android, with props for keyboard type and autofill.'
aliases:
  - 'Text field'
  - 'Input'
related:
  - 'Controlled Component'
  - 'KeyboardAvoidingView'
  - 'Refs'
  - 'Accessibility Label'
updated: 2026-11-13
---

`TextInput` is the core component that lets the user type. It wraps `UITextField` (or `UITextView` when `multiline`) on iOS and `EditText` on Android, so the keyboard, cursor, selection and autofill are the real platform ones.

It is usually used as a [controlled component](/react-native-glossary/controlled-component), with `value` and `onChangeText`:

```tsx
<TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" returnKeyType="next" onSubmitEditing={() => passwordRef.current?.focus()} />
```

The props that make a form feel native:

- `keyboardType` and `inputMode` choose numeric, email, phone or URL keyboards.
- `autoComplete` (both platforms) and `textContentType` (iOS) enable password managers and one-time-code autofill.
- `secureTextEntry` hides passwords.
- `returnKeyType` plus `onSubmitEditing` move focus from field to field through [refs](/react-native-glossary/refs), which expose `focus()`, `blur()` and `clear()`.

Platform defaults differ more than for most components. Android adds internal padding and, depending on the theme, an underline; `multiline` inputs centre text vertically on Android until you set `textAlignVertical: 'top'`. iOS shows no border at all until you style one.

A common gotcha is reformatting input inside `onChangeText`, such as masking a phone number. Because the value makes a round trip through JavaScript, aggressive transforms can make the cursor jump or characters flicker. Keep transforms simple, or use an uncontrolled input with `defaultValue` and read the text on submit.

The input does not move itself out of the keyboard’s way. That is a separate problem, covered by [KeyboardAvoidingView](/react-native-glossary/keyboardavoidingview) and `ScrollView`’s `keyboardShouldPersistTaps`.

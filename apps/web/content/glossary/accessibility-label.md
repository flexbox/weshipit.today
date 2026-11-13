---
title: 'Accessibility Label'
summary: 'An accessibility label is the text a screen reader speaks for an element; in React Native you set it with accessibilityLabel or aria-label on views and controls.'
aliases:
  - 'accessibilityLabel'
  - 'accessible'
related:
  - 'Screen Reader'
  - 'Accessibility Role'
  - 'Pressable'
  - 'React Native Testing Library'
updated: 2026-11-13
---

An accessibility label is the name a [screen reader](/react-native-glossary/screen-reader) announces when the user focuses an element. In React Native you provide it with the `accessibilityLabel` prop, or the web-style `aria-label` alias, on components such as `View`, `Text`, `Image` and [Pressable](/react-native-glossary/pressable).

Text elements usually do not need one, because the screen reader reads their content. Labels matter for everything that has no readable text: icon buttons, images, avatars, and controls whose visible text is ambiguous out of context.

```tsx
<Pressable accessibilityRole="button" accessibilityLabel="Delete message" accessibilityHint="Removes it from this conversation" onPress={onDelete}>
  <TrashIcon />
</Pressable>
```

The related `accessible` prop decides what becomes a single focus stop. When `accessible` is true, the element and all its children are grouped and read as one item, and by default the screen reader combines the children’s text. Touchable components are accessible by default; a plain `View` is not, so a card built from several `Text` nodes is read piece by piece unless you group it.

Practical rules:

- Describe the purpose, not the appearance: "Search", not "Magnifying glass icon".
- Do not repeat the role. With `accessibilityRole="button"` the reader already says "button", so a label of "Delete button" is read twice.
- Keep it short, and use `accessibilityHint` for extra context about the outcome.
- Translate it. Labels are user-facing text and belong in your localisation files.

The most common mistake is grouping too much. Setting `accessible` on a container that holds several buttons makes them unreachable as separate targets. Labels are also what [React Native Testing Library](/react-native-glossary/react-native-testing-library) queries with `getByLabelText`, so good labels make tests more readable too.

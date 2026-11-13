---
title: 'Fragment'
summary: 'A Fragment groups several React elements without adding a wrapper, so a component can return siblings without creating an extra native View in the hierarchy.'
aliases:
  - 'React.Fragment'
related:
  - 'JSX'
  - 'View Component'
  - 'Keys'
  - 'Text Component'
updated: 2026-11-13
---

A Fragment lets a component return more than one element without wrapping them in a container. [JSX](/react-native-glossary/jsx) requires a single root, and before Fragments the usual workaround in React Native was an extra `<View>`. A Fragment satisfies the rule and leaves nothing behind in the native hierarchy.

```tsx
function Price({ amount, currency }: Props) {
  return (
    <>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.currency}>{currency}</Text>
    </>
  );
}
```

The two `Text` elements become direct children of whatever renders `Price`, so they take part in the parent’s flex layout as if they had been written there.

That is the main reason to prefer a Fragment over a wrapper [View](/react-native-glossary/view-component) in React Native: an extra `View` is an extra flex container. It changes how `gap`, `justifyContent` and `flexDirection` apply to its children, and it is a frequent cause of "why is this row not stretching" bugs. Use a `View` when you actually want a container to style or lay out; use a Fragment when you only need grouping.

Things worth knowing:

- **Keys need the long form.** The `<>…</>` shorthand cannot take props. When mapping a list that returns several elements per item, write `<Fragment key={item.id}>`.
- **Fragments accept no style or event props.** There is nothing to style; it does not exist at runtime.
- **The text rule still applies.** A string inside a Fragment is still a raw string; if the Fragment ends up outside a [Text component](/react-native-glossary/text-component) you get "Text strings must be rendered within a <Text> component".

A Fragment is not quite free. React still tracks it during reconciliation, and toggling between returning a Fragment and returning a single element at the same position can reset the child’s state. In practice this rarely matters. See [Fragment](https://react.dev/reference/react/Fragment).

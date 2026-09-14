---
title: 'StyleSheet'
summary: 'StyleSheet is React Native’s API for defining styles as JavaScript objects. Styles are plain objects with camelCase properties, not CSS files.'
aliases:
  - 'StyleSheet.create'
  - 'Styling'
related:
  - 'Flexbox'
  - 'View Component'
  - 'Core Components'
updated: 2026-09-12
---

`StyleSheet` is how you style a React Native app. There is no CSS file and no cascade: styles are JavaScript objects attached to a component through its `style` prop.

```jsx
const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#fff' },
});

<View style={styles.card} />;
```

The rules that differ from the web:

- Property names are **camelCase** — `backgroundColor`, not `background-color`
- Numbers are **density-independent pixels**, not CSS px, so `padding: 16` scales across screen densities
- **No inheritance.** A `color` on a `<View>` does not reach the `<Text>` inside it; text styles must go on the text
- Arrays compose and later entries win: `style={[styles.card, isActive && styles.active]}`

`StyleSheet.create` is largely a validation and readability convention now — plain objects work too.

Many teams instead use NativeWind (Tailwind classes) or Unistyles, both of which compile down to these same style objects. See [style](https://reactnative.dev/docs/style).

---
title: 'Children Prop'
summary: 'The children prop holds whatever JSX you nest between a component’s opening and closing tags, letting you build wrappers like cards, screens and providers by composition.'
aliases:
  - 'props.children'
  - 'Composition'
related:
  - 'Props and State'
  - 'JSX'
  - 'Re-render'
  - 'Text Component'
updated: 2026-11-13
---

`children` is a special prop React fills with whatever you place between a component’s tags. `<Card><Text>Hi</Text></Card>` calls `Card` with `props.children` set to that `Text` element. It is the basis of **composition**: building generic containers that render content they know nothing about.

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}
```

Most React Native wrappers work this way: a screen layout with safe-area padding, a `Pressable` row, a context provider at the root of the app. Composition is usually the better alternative to adding a `variant` prop for every new case, or to threading data through layers of [props](/react-native-glossary/props-and-state).

Children are also a quiet performance tool. Elements passed as `children` are created by the component that wrote them, not by the wrapper. If the wrapper has state of its own — an animated header that tracks scroll, a collapsible panel — its updates do not re-create the children:

```tsx
<CollapsiblePanel>
  <ExpensiveChart data={data} />
</CollapsiblePanel>
```

When `CollapsiblePanel` toggles its own state, React reuses the same `ExpensiveChart` element and skips it. Moving content into `children` is often the simplest fix for a [re-render](/react-native-glossary/re-render) problem.

React Native specifics and gotchas:

- **Raw strings need a Text.** A string passed as children to a `View`-based wrapper triggers "Text strings must be rendered within a <Text> component". If your component accepts text, wrap `children` in a [Text component](/react-native-glossary/text-component).
- **Nested Text inherits style.** Children of a `Text` can be more `Text` elements, which inherit font and colour from the parent; nested `View`s do not.
- **Treat children as opaque.** It might be one element, an array, a string or `null`. Avoid inspecting or cloning it; pass explicit props or a render function when the wrapper needs to inject data.

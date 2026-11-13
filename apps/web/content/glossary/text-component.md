---
title: 'Text Component'
summary: 'Text is the React Native core component that displays strings. It is the only place raw text may appear, and nested Text elements inherit their parent’s styles.'
aliases:
  - 'Text'
  - '<Text>'
related:
  - 'View Component'
  - 'Core Components'
  - 'Font Scaling'
  - 'Custom Fonts'
  - 'Accessibility Label'
updated: 2026-11-13
---

`<Text>` is the core component for showing strings in React Native. Every character on screen must sit inside one: a bare string placed directly in a [View](/react-native-glossary/view-component) throws `Text strings must be rendered within a <Text> component`.

Text behaves differently from a web paragraph in ways that catch people out:

- **Styles inherit only through nested Text.** There is no CSS cascade from a parent View, so setting `color` on a container does nothing to the text inside it. Nest `<Text>` elements to bold one word in a sentence, and the inner one inherits font, colour and size from the outer.
- **Nested Text is inline, not a box.** Inside a `<Text>`, children flow as one paragraph and do not take part in [Flexbox](/react-native-glossary/flexbox) layout, so margins and padding on inner Text are ignored.
- **Truncation is explicit.** `numberOfLines` plus `ellipsizeMode` controls how long text is cut.

```jsx
<Text numberOfLines={2} style={styles.body}>
  Shipped by <Text style={styles.bold}>weshipit.today</Text>, read more…
</Text>
```

Text respects the user’s system font size by default. `allowFontScaling` and `maxFontSizeMultiplier` let you cap it, which is better than switching it off, as covered in [font scaling](/react-native-glossary/font-scaling).

Text can also take `onPress`, so a link inside a sentence is just nested Text with a handler. `selectable` enables long-press copy.

The most common gotcha is cross-platform metrics: the same `fontSize` and `lineHeight` render with slightly different vertical spacing on iOS and Android, and Android adds font padding unless you set `includeFontPadding: false`. Check typography-heavy screens on both platforms before calling them pixel-perfect.

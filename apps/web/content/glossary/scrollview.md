---
title: 'ScrollView'
summary: 'ScrollView is React Native’s generic scrolling container. It renders all of its children at once, which suits short content but not long data-driven lists.'
aliases:
  - 'Scroll view'
related:
  - 'FlatList'
  - 'VirtualizedList'
  - 'KeyboardAvoidingView'
  - 'Flexbox'
updated: 2026-11-13
---

`ScrollView` is the core component that wraps content in a native scrolling container (`UIScrollView` on iOS, `ScrollView` or `HorizontalScrollView` on Android). It is the right choice for a settings page, a form or an article, where the content is finite and known.

Its defining trait is that it mounts **every child immediately**. Twenty rows is fine; two thousand means two thousand native views in memory before the user sees anything. For data-driven lists, use [FlatList](/react-native-glossary/flatlist) or another [virtualised list](/react-native-glossary/virtualizedlist).

Layout rules that confuse newcomers:

- A ScrollView needs a **bounded height** to scroll. Inside a parent without `flex: 1` it grows to fit its content and never scrolls.
- Alignment of the content goes in `contentContainerStyle`, not `style`. Putting `justifyContent: 'center'` on `style` throws an error.
- To centre short content but still scroll when it overflows, use `contentContainerStyle={{ flexGrow: 1 }}`.

Useful props include `horizontal`, `pagingEnabled` for carousels, `refreshControl` for pull-to-refresh, `stickyHeaderIndices`, and `keyboardShouldPersistTaps`. That last one matters on forms: by default a tap outside a focused [TextInput](/react-native-glossary/textinput) only dismisses the keyboard, so the user taps “Submit” twice. Set it to `'handled'`.

```jsx
<ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16 }}>
  <Form />
</ScrollView>
```

The classic warning, “VirtualizedLists should never be nested inside plain ScrollViews with the same orientation”, appears when a FlatList sits inside a vertical ScrollView. The inner list loses virtualisation because the outer view gives it unlimited height. Use the list’s `ListHeaderComponent` and `ListFooterComponent` instead of wrapping it.

---
title: 'FlatList'
summary: 'FlatList is React Native’s virtualised list component. It renders only the rows near the viewport, keeping memory flat no matter how long the data is.'
aliases:
  - 'Virtualised list'
  - 'FlashList'
related:
  - 'Core Components'
  - 'Keys'
  - 'JavaScript Thread'
updated: 2026-09-12
---

`FlatList` renders long lists efficiently by only mounting the rows near the viewport and recycling them as the user scrolls. A `ScrollView` mounts every child immediately, so a thousand-row list built from one would allocate a thousand native views up front.

```jsx
<FlatList data={posts} keyExtractor={(item) => item.id} renderItem={({ item }) => <PostRow post={item} />} />
```

The props that decide whether it performs:

- `keyExtractor` — stable ids, for the same reasons [keys](/react-native-glossary/keys) matter anywhere
- `getItemLayout` — skips measurement when rows are a fixed height
- `initialNumToRender` — how much to render before the first paint

The usual newcomer mistake is an inline `renderItem` arrow that recreates every row component on each render; memoising the row is the standard fix.

For heavy lists many teams use **FlashList** from Shopify, a drop-in-shaped alternative with better recycling. Rule of thumb: `ScrollView` for a handful of known items, `FlatList` for anything data-driven.

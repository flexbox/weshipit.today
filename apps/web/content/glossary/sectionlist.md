---
title: 'SectionList'
summary: 'SectionList is React Native’s virtualised list for grouped data, rendering section headers and rows from an array of sections, like a contacts list or settings screen.'
aliases:
  - 'Section list'
  - 'Grouped list'
related:
  - 'FlatList'
  - 'VirtualizedList'
  - 'Keys'
  - 'FlashList'
updated: 2026-11-13
---

`SectionList` is the core component for long lists split into groups: contacts by letter, transactions by day, settings by category. Like [FlatList](/react-native-glossary/flatlist), it is built on [VirtualizedList](/react-native-glossary/virtualizedlist), so only rows near the viewport are mounted.

Its data shape is the part to learn. Instead of a flat array, you pass `sections`, where each section has a `data` array plus any extra fields you want for the header:

```jsx
<SectionList
  sections={[
    { title: 'Today', data: todayTx },
    { title: 'Yesterday', data: yesterdayTx },
  ]}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TxRow tx={item} />}
  renderSectionHeader={({ section }) => <Header title={section.title} />}
/>
```

Things worth knowing in practice:

- **Sticky headers** are controlled by `stickySectionHeadersEnabled`. It is on by default on iOS, where that is the platform convention, and off on Android, so the two platforms look different until you set it explicitly.
- A section can override `renderItem` and `keyExtractor` for its own rows, which is handy for mixed content.
- `SectionSeparatorComponent` sits between sections, while `ItemSeparatorComponent` sits between rows within a section.
- `scrollToLocation({ sectionIndex, itemIndex })` replaces FlatList’s `scrollToIndex`.

The common mistake is building sections inside the render function on every pass, for example grouping a large array with `reduce` without memoising it. That hands the list new section objects every render and defeats its optimisations. Group once with `useMemo`, keep [keys](/react-native-glossary/keys) stable, and memoise row components.

When a grouped list gets heavy, FlashList handles the same case with a flat array of mixed header and row items and `getItemType`, which many teams find faster than SectionList.

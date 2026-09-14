---
title: 'Keys'
summary: 'A key is a stable identifier you give each item in a rendered list so React can tell which item is which across renders instead of re-creating them all.'
aliases:
  - 'key prop'
related:
  - 'React Elements'
  - 'FlatList'
  - 'Props and State'
updated: 2026-09-12
---

A key is a string you attach to each element in a list so React can match items between renders. Without keys React compares by position, so inserting one row at the top makes it think every row changed.

```jsx
{
  users.map((user) => <UserRow key={user.id} user={user} />);
}
```

Rules that matter in practice:

- Use a value that is **stable and unique among siblings** — a database id, not a random number.
- Do not use the array index when the list can reorder, filter, or receive inserts. Index keys are the usual cause of "the wrong row kept its text input value".
- Keys only need to be unique within one list, not app-wide.

In [FlatList](/react-native-glossary/flatlist) the same job is done by the `keyExtractor` prop rather than a `key` on the element. Getting keys wrong shows up as lost scroll position, wrong animations, and state landing on the wrong row.

See [rendering lists](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key).

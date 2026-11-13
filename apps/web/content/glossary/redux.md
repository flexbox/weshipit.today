---
title: 'Redux'
summary: 'Redux is a predictable global state library where a single store is updated by dispatched actions. Redux Toolkit is its official, modern way to write it in React Native.'
aliases:
  - 'Redux Toolkit'
  - 'RTK'
related:
  - 'State Management'
  - 'Zustand'
  - 'TanStack Query'
  - 'Reactotron'
updated: 2026-11-13
---

Redux is a library for global state in which the whole app’s shared data lives in one store, and the only way to change it is to dispatch an action that a reducer turns into new state. In React Native it works exactly as on the web, connected to components through `react-redux`.

Redux Toolkit (RTK) is the official way to write Redux today. It replaces the hand-written action types, switch statements and immutable spread updates of older tutorials with `configureStore` and `createSlice`, and it uses Immer so reducers can look like mutations:

```ts
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as string[] },
  reducers: {
    added(state, action: PayloadAction<string>) {
      state.items.push(action.payload);
    },
  },
});
```

Components read with `useSelector` and write with `useDispatch`. RTK also ships **RTK Query**, a data-fetching and caching layer comparable to [TanStack Query](/react-native-glossary/tanstack-query), which is the right place for API data if you are already on Redux.

Why teams still choose it: strict, traceable updates, middleware for side effects, and excellent time-travel debugging, which in React Native usually means a tool such as [Reactotron](/react-native-glossary/reactotron). Large teams value the enforced structure. For a small app, a lighter store like [Zustand](/react-native-glossary/zustand) is often enough.

The common performance gotcha is a selector that returns a new object or array on every call, for example `useSelector((s) => s.items.filter(...))`. Because the result is never referentially equal, every dispatch anywhere in the app re-renders that component. Use memoised selectors (`createSelector`) or select primitives. The second gotcha is persistence: on mobile the store is wiped when the app is killed, so anything that must survive a restart needs explicit persistence to device storage, and that layer then needs migrations when the state shape changes. See the [Redux Toolkit docs](https://redux-toolkit.js.org/).

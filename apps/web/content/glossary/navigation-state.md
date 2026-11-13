---
title: 'Navigation State'
summary: 'Navigation state is the plain object a React Native navigator keeps describing which screens exist, which one is focused and the params each received.'
aliases:
  - 'Route params'
  - 'Navigation container'
related:
  - 'React Navigation'
  - 'Stack Navigator'
  - 'Deep Linking'
  - 'State Management'
updated: 2026-11-13
---

Navigation state is the data structure [React Navigation](/react-native-glossary/react-navigation) (and Expo Router on top of it) uses to describe where the user is. Each navigator owns an object listing its `routes`, the `index` of the focused one, and for each route a `name`, a unique `key` and its `params`. Nested navigators nest their state inside the parent route.

The `NavigationContainer` at the root holds the whole tree. Every `navigate`, `push` or `goBack` is an action that produces a new state, a lot like a reducer. That design is what makes several features possible:

- **[Deep linking](/react-native-glossary/deep-linking)** works by turning a URL into a state object.
- **State persistence** saves the state with `onStateChange` and restores it via `initialState`, useful in development so a reload keeps you on the screen you were editing.
- **Hooks** such as `useNavigationState` and `useRoute` let a screen read it.

Route params are the part developers touch daily. Pass identifiers, not objects:

```tsx
navigation.navigate('Post', { id: post.id }); // good
navigation.navigate('Post', { post }); // stale copy, breaks links

function PostScreen({ route }) {
  const { id } = route.params;
}
```

Passing a full object gives the screen a frozen copy that will not update when the data changes, and it cannot be rebuilt from a URL. Passing functions or class instances triggers React Navigation’s "non-serializable values were found in the navigation state" warning, because persistence and linking need state that can round-trip through JSON.

The misconception to drop: navigation state is not your app’s data store. Treat params like a URL’s query string, and keep shared data in a cache or [state management](/react-native-glossary/state-management) library that each screen reads by id.

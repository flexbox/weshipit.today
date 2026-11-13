---
title: 'Suspense'
summary: 'Suspense is a React component that shows a fallback, such as a spinner, while something inside it is still loading code or data, then swaps in the real content.'
aliases:
  - 'React Suspense'
related:
  - 'Concurrent Rendering'
  - 'TanStack Query'
  - 'Lazy Loading'
  - 'Error Boundary'
  - 'ActivityIndicator'
updated: 2026-11-13
---

Suspense is a built-in React component that lets part of the tree declare "I am not ready yet". When a child suspends, React renders the nearest `<Suspense>` boundary’s `fallback` instead, and retries the child once the thing it was waiting for has resolved.

```tsx
<Suspense fallback={<ActivityIndicator />}>
  <OrderHistory />
</Suspense>
```

Components do not suspend by themselves. Something has to throw a pending promise to React on their behalf, and in practice that is a library or a React API:

- Data libraries with a Suspense mode, such as [TanStack Query](/react-native-glossary/tanstack-query)’s `useSuspenseQuery` or Relay.
- React 19’s `use(promise)`.
- `React.lazy` for code that has not loaded yet.

That last one is less useful in React Native than on the web. A release build ships one [JavaScript bundle](/react-native-glossary/javascript-bundle) already on the device, so there is rarely code to wait for. Suspense in React Native is mostly about data.

Its value is moving loading states out of components. Instead of every screen juggling `isLoading` flags, the component is written as if the data were there, and the boundary decides where the spinner appears. Nesting boundaries lets a header show while a list below it is still loading.

Gotchas:

- **No boundary, no fallback.** A component that suspends with no `<Suspense>` above it suspends the closest boundary higher up — possibly the whole screen.
- **Content flashing back to a spinner.** If already-visible content suspends again, for example on a new search query, React replaces it with the fallback. Wrap the update in `startTransition` to keep the old content on screen while the new data loads. That behaviour depends on [concurrent rendering](/react-native-glossary/concurrent-rendering), so it needs the New Architecture.
- **Suspense does not handle failures.** A rejected promise is an error; pair boundaries with an [error boundary](/react-native-glossary/error-boundary).

See [Suspense](https://react.dev/reference/react/Suspense).

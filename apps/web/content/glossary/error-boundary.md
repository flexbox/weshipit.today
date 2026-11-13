---
title: 'Error Boundary'
summary: 'An error boundary is a React component that catches errors thrown while rendering its children and shows a fallback UI instead of letting the whole app go down.'
aliases:
  - 'Error boundaries'
  - 'componentDidCatch'
related:
  - 'Crash Reporting'
  - 'Suspense'
  - 'LogBox'
  - 'Expo Router'
updated: 2026-11-13
---

An error boundary is a component that catches JavaScript errors thrown during rendering, in lifecycle methods or in constructors anywhere in the tree below it, and renders a fallback in place of the broken subtree. Without one, a single bad render unmounts the entire React tree, and in a React Native release build an unhandled JavaScript error can end with the app closing.

It is still the one feature that needs a class component. There is no hook equivalent:

```tsx
class Boundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError = () => ({ failed: true });
  componentDidCatch(error: Error) {
    reportError(error);
  }
  render() {
    return this.state.failed ? <ErrorScreen /> : this.props.children;
  }
}
```

`getDerivedStateFromError` switches to the fallback; `componentDidCatch` is where you send the error to your [crash reporting](/react-native-glossary/crash-reporting) tool. Most teams use the `react-error-boundary` package instead of writing the class, and Sentry ships its own boundary. In [Expo Router](/react-native-glossary/expo-router), a route file can export an `ErrorBoundary` component that wraps just that route.

What a boundary does **not** catch is where most surprises come from:

- Errors in event handlers, such as an `onPress` that throws.
- Errors in asynchronous code: a rejected promise, a `setTimeout` callback, a failed `fetch`.
- Errors thrown inside the boundary’s own render.
- Native crashes in Swift, Kotlin or C++ code, which never reach JavaScript.

For handlers and async code, catch the error yourself, or move it into state and rethrow during render so the boundary sees it.

Place boundaries deliberately. One at the root stops a white screen; one per screen or per widget lets the rest of the app keep working when, say, a recommendations carousel receives malformed data. In development [LogBox](/react-native-glossary/logbox) still reports the error, so test your fallback in a release build to see what users get. See [catching rendering errors](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

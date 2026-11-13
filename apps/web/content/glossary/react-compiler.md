---
title: 'React Compiler'
summary: 'React Compiler is a build-time tool from the React team that memoises components and hooks automatically, removing most hand-written useMemo, useCallback and memo.'
aliases:
  - 'React Forget'
related:
  - 'Memoization'
  - 'useMemo and useCallback'
  - 'React.memo'
  - 'Babel'
  - 'Re-render'
updated: 2026-11-13
---

React Compiler is an optimising compiler that runs on your components while the app is being built. It analyses each component and hook, works out which values depend on which inputs, and inserts caching so unchanged parts are not recomputed or re-rendered. It was developed at Meta under the codename React Forget and reached a stable 1.0 release in 2025.

For a React Native developer the appeal is direct. Avoiding wasted [re-renders](/react-native-glossary/re-render) on the JavaScript thread used to mean sprinkling [useMemo and useCallback](/react-native-glossary/usememo-usecallback) and `React.memo` by hand, keeping dependency arrays correct, and debugging the cases where an inline object silently defeated it all. The compiler does that bookkeeping for you, often at a finer grain than people manage manually, including memoising individual JSX elements.

It ships as a [Babel](/react-native-glossary/babel) plugin, `babel-plugin-react-compiler`, which slots into Metro’s Babel pipeline. Expo projects can turn it on from the app config with the `experiments.reactCompiler` flag rather than editing Babel themselves.

The catch is that it relies on the Rules of React: components and hooks must be pure during render, props and state must not be mutated, and hooks must follow the call rules. When the compiler cannot prove a component is safe it skips it, so code that bends the rules does not get faster and does not break either. Code that breaks the rules in ways the compiler cannot detect can behave differently once compiled, which is why the React team recommends:

- Running the React Compiler rules in `eslint-plugin-react-hooks` first and fixing what they report.
- Keeping [Strict Mode](/react-native-glossary/strict-mode) on to surface impure renders.
- Rolling it out gradually on a large codebase, directory by directory.

Existing `useMemo` and `memo` calls keep working alongside it, so there is no need to strip them out on day one. See the [React Compiler docs](https://react.dev/learn/react-compiler).

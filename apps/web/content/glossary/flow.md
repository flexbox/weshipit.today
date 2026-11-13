---
title: 'Flow'
summary: 'Flow is Meta’s static type checker for JavaScript; React Native’s own source code is written in it, though most apps today use TypeScript instead.'
aliases:
  - 'Flow types'
related:
  - 'TypeScript'
  - 'Babel'
  - 'Codegen'
  - 'Jest'
updated: 2026-11-13
---

Flow is a static type checker for JavaScript built by Meta. React Native itself is written in Flow, which is why files inside `node_modules/react-native` start with `@flow` and contain type annotations that look almost, but not quite, like TypeScript.

For app developers Flow is mostly background knowledge. The community settled on [TypeScript](/react-native-glossary/typescript), new templates use it, and Meta now generates React Native’s TypeScript types from the Flow sources. You are unlikely to write Flow in an app in 2026.

Where it still touches your work:

- **Reading React Native internals.** Stack traces and "go to definition" often land in Flow-typed files. The syntax (`?string`, `$ReadOnly<{...}>`, exact object types) is readable once you know it is Flow.
- **Native module specs.** [Codegen](/react-native-glossary/codegen) accepts specs written in either Flow or TypeScript, so older libraries and Meta examples use Flow specs.
- **Tooling that does not strip Flow.** React Native’s packages ship Flow syntax untranspiled and rely on the toolchain to remove it.

That last point is the common gotcha. Metro and the React Native [Jest](/react-native-glossary/jest) preset handle Flow automatically through [Babel](/react-native-glossary/babel). A custom Jest transform, a web bundler or a test runner configured without the React Native preset will choke on it with errors such as "Unexpected token" pointing at `import typeof` or a type annotation inside `node_modules/react-native`. The fix is to use the React Native preset or make sure those packages are transformed, not to rewrite anything.

A frequent misconception is that a library being written in Flow makes it incompatible with a TypeScript app. It does not: types are stripped at build time, and most libraries ship `.d.ts` files alongside.

---
title: 'TypeScript'
summary: 'TypeScript is the typed superset of JavaScript that new React Native and Expo projects use by default, catching prop and API mistakes before the app runs.'
aliases:
  - 'TS'
  - 'Type checking'
related:
  - 'Babel'
  - 'Flow'
  - 'ESLint'
  - 'Typed Routes'
  - 'Codegen'
updated: 2026-11-13
---

TypeScript is JavaScript with static types. It is the default language for new React Native and Expo projects, and React Native ships its own type definitions, so `<View>`, `StyleSheet` and every core API are typed without installing extra packages.

For a React Native developer the payoff is concrete: a typo in a style property, a missing required prop or a wrong navigation parameter shows up in the editor instead of on a device. Libraries such as [Expo Router](/react-native-glossary/expo-router) build on this with [typed routes](/react-native-glossary/typed-routes), and TypeScript specs can drive [Codegen](/react-native-glossary/codegen) for native modules.

The key fact about how it runs: Metro does not run the TypeScript compiler. [Babel](/react-native-glossary/babel) simply deletes the type annotations and bundles what is left. That keeps reloads fast but means type errors never stop the app from starting.

So type checking needs its own step:

```bash
npx tsc --noEmit
```

Run it in your editor, a pre-commit hook or CI. Many teams discover months of hidden errors the first time they add it to a pipeline.

Other gotchas:

- `tsconfig.json` should extend the preset your toolchain provides (`expo/tsconfig.base` or `@react-native/typescript-config`) rather than a web or Node config, which brings in DOM types that do not exist in React Native.
- Path aliases in `tsconfig.json` only affect type checking. The bundler needs to resolve them too, which Expo handles automatically and bare projects usually do with a Babel plugin.
- Typing `any` on API responses silently removes the protection where you need it most.

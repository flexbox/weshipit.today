---
title: 'Tree Shaking'
summary: 'Tree shaking is a build step that removes code you export but never import. Metro has traditionally not done it, so unused React Native code often still ships.'
aliases:
  - 'Dead code elimination'
related:
  - 'Bundle Size'
  - 'Metro'
  - 'JavaScript Bundle'
  - 'R8 and ProGuard'
updated: 2026-11-13
---

Tree shaking is the removal of unused code at build time. A bundler follows `import` and `export` statements, works out which exports are never used, and leaves them out of the final file. The name comes from shaking a dependency tree until the dead leaves fall off.

On the web, bundlers such as Webpack, Rollup and Vite do this by default for ES modules. React Native developers often assume the same is true for them, and that is the key gotcha: [Metro](/react-native-glossary/metro) has historically bundled whole modules rather than individual exports. If you import one helper from a large utility library through its main entry point, the entire library can end up in your [JavaScript bundle](/react-native-glossary/javascript-bundle).

Expo has added experimental tree-shaking support to its Metro configuration for production builds, but it depends on your setup and on packages publishing ES modules without side effects, so check the current Expo docs before relying on it.

Until then, write code that does not need tree shaking:

```ts
// Pulls the whole library into the bundle
import { debounce } from 'lodash';

// Pulls in only one module
import debounce from 'lodash/debounce';
```

- Prefer packages with per-function entry points or small, focused dependencies.
- Avoid barrel files (`index.ts` that re-exports everything) in large internal folders.
- Remove dead feature flags and unused screens rather than hiding them.

Native code has its own dead-code removal, separate from JavaScript. On Android, [R8](/react-native-glossary/r8-proguard) strips unused Java and Kotlin classes when shrinking is enabled; on iOS, the linker removes unreferenced symbols. Neither touches your JavaScript, so a large [bundle size](/react-native-glossary/bundle-size) on the JS side needs JS-side fixes.

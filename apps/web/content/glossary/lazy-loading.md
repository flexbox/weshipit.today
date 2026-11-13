---
title: 'Lazy Loading'
summary: 'Lazy loading delays loading or running code until it is needed. In React Native that mostly means inline requires and React.lazy, which defer module evaluation.'
aliases:
  - 'Inline requires'
  - 'React.lazy'
  - 'Code splitting'
related:
  - 'Startup Time'
  - 'Suspense'
  - 'Metro'
  - 'Bundle Size'
updated: 2026-11-13
---

Lazy loading means postponing work until the moment it is needed instead of doing it all at launch. In a React Native app, the work in question is usually running JavaScript modules: their top-level code, their imports and their side effects.

This differs from the web in one important way. A browser can download extra chunks on demand (code splitting). A standard React Native release ships one [JavaScript bundle](/react-native-glossary/javascript-bundle) inside the app, so all the code is already on the device. What you can defer is **evaluation**, and that alone can noticeably improve [startup time](/react-native-glossary/startup-time).

There are two main tools:

- **Inline requires.** A Metro transform that rewrites top-level imports into `require()` calls placed where the value is first used, so a module only runs when your code actually touches it.
- **`React.lazy`.** Wraps a dynamic `import()` so a component, usually a whole screen, is evaluated the first time it renders, with [Suspense](/react-native-glossary/suspense) showing a fallback meanwhile.

```js
// metro.config.js
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: { experimentalImportSupport: false, inlineRequires: true },
    }),
  },
};
```

The gotcha with inline requires is code that depends on import side effects, such as a polyfill or a module that registers itself globally. Once imports are deferred, that side effect may run later than expected or not at all. Import such modules explicitly at the top of your entry file.

Do not lazy-load the first screen a user sees, or you simply move the delay to behind a spinner. Defer settings screens, rarely used flows and heavy SDKs instead.

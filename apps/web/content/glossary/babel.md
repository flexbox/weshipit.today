---
title: 'Babel'
summary: 'Babel is the JavaScript compiler Metro runs on every file to turn JSX, TypeScript and modern syntax into code the React Native JavaScript engine can execute.'
aliases:
  - 'babel.config.js'
  - 'Babel plugin'
related:
  - 'Metro'
  - 'JSX'
  - 'TypeScript'
  - 'React Compiler'
  - 'Reanimated'
updated: 2026-11-13
---

Babel is a JavaScript compiler. In React Native it runs inside [Metro](/react-native-glossary/metro): every file Metro bundles passes through Babel, which strips TypeScript and Flow types, turns [JSX](/react-native-glossary/jsx) into function calls and applies any plugins you configure.

Most projects never touch it beyond a short `babel.config.js` that loads a preset. Expo projects use `babel-preset-expo`; projects on the React Native CLI use `@react-native/babel-preset`.

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

Babel matters because several libraries do their work at compile time. Reanimated’s worklets, the [React Compiler](/react-native-glossary/react-compiler), import aliases and some styling libraries all ship Babel plugins that rewrite your code before it runs.

How it behaves in practice:

- Babel only transforms. It does not type-check, so a TypeScript error will still bundle and run. Type checking is a separate `tsc` step.
- Plugin order matters. Plugins run before presets, in the order listed, and some must come last; Reanimated’s plugin is the classic example.
- Babel output is cached by Metro.

That last point causes the most common gotcha: you edit `babel.config.js`, reload, and nothing changes. Restart Metro with its cache cleared (`npx expo start --clear` or `npx react-native start --reset-cache`) after any Babel config change.

Another frequent mistake is adding a plugin that a preset already includes. Recent versions of `babel-preset-expo` configure Reanimated and other common plugins automatically, so adding them again can produce confusing duplicate-transform errors.

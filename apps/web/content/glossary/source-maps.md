---
title: 'Source Maps'
summary: 'A source map is a file that maps positions in a compiled React Native bundle back to your original source, so stack traces and debuggers show real file names and lines.'
aliases:
  - 'Sourcemap'
related:
  - 'JavaScript Bundle'
  - 'Hermes Bytecode'
  - 'Crash Reporting'
  - 'React Native DevTools'
  - 'Over-the-Air Update'
updated: 2026-11-13
---

A source map is a JSON file that records how each position in a compiled [JavaScript bundle](/react-native-glossary/javascript-bundle) corresponds to a line and column in your original files. Tools use it to turn `index.android.bundle:1:48213` into `CheckoutScreen.tsx:42`.

In development you rarely think about them. Metro serves source maps alongside the bundle, which is why breakpoints in [React Native DevTools](/react-native-glossary/react-native-devtools) and stack traces in LogBox point at your real code.

Release builds are where they matter. The shipped bundle is minified and, with Hermes, compiled to [Hermes bytecode](/react-native-glossary/hermes-bytecode). A production crash report without source maps is a list of meaningless offsets. To make it readable you generate maps at build time and upload them to your [crash reporting](/react-native-glossary/crash-reporting) service:

```bash
npx expo export --platform ios --source-maps
```

How it behaves in practice:

- With Hermes there are two maps, one from Metro and one from the Hermes compiler. They have to be composed into one, which the React Native build scripts and crash reporting SDKs’ plugins usually handle.
- A source map is only valid for the exact bundle it was generated with. Rebuild, even with no code change, and the old map no longer matches.

That second point causes the classic gotcha: crash reports that stay unreadable or point at the wrong lines. The cause is almost always a map from a different build, or a missing upload for an over-the-air update. Each OTA update is a new bundle and needs its own maps uploaded.

Finally, source maps contain your original code. Upload them to your error tracker, but do not ship them inside the app or host them publicly.

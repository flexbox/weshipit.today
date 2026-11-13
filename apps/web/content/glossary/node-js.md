---
title: 'Node.js'
summary: 'Node.js is the JavaScript runtime that powers React Native’s development tools such as Metro, Expo CLI and the React Native CLI, though your app itself never runs on it.'
aliases:
  - 'Node'
  - 'nvm'
related:
  - 'Metro'
  - 'Package Manager'
  - 'JavaScript Runtime'
  - 'Hermes'
  - 'Xcode'
updated: 2026-11-13
---

Node.js is a JavaScript runtime for computers and servers. In React Native it is the engine behind your tooling: [Metro](/react-native-glossary/metro), Expo CLI, the React Native CLI, package managers, Jest and the build scripts that Xcode and Gradle call during a native build all run on Node.

Your app does not. On the device your code runs on [Hermes](/react-native-glossary/hermes), a different [JavaScript runtime](/react-native-glossary/javascript-runtime) with no Node APIs. This is the most common misconception for developers arriving from backend or web tooling:

- `fs`, `path` and `child_process` do not exist in the app, and `process.env` only holds values inlined at build time.
- npm packages that depend on Node built-ins, such as many crypto or file libraries, will fail to bundle or crash when called. Look for React Native-specific alternatives.
- `Buffer` is not a global by default.

React Native and Expo each declare a minimum Node version in their packages, and it rises over time. Use an active LTS release and pin it per project so everyone on the team, and CI, gets the same version. Version managers such as nvm, fnm or Volta read a file at the repository root:

```bash
echo "22" > .nvmrc
nvm use
```

The classic setup gotcha: the app builds from the terminal but fails in Xcode with "node: command not found" or the wrong version. Xcode does not load your shell profile, so it cannot see a Node installed through a version manager. React Native projects solve this with `ios/.xcode.env`, and you can override it locally in `ios/.xcode.env.local`:

```bash
export NODE_BINARY=$(command -v node)
```

Upgrading Node also changes the native modules your tooling depends on, so reinstall `node_modules` after switching major versions.

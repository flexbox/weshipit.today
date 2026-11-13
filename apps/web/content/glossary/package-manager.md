---
title: 'Package Manager'
summary: 'A package manager such as npm, Yarn, pnpm or Bun installs a React Native project’s dependencies into node_modules and records exact versions in a lockfile.'
aliases:
  - 'npm'
  - 'Yarn'
  - 'pnpm'
  - 'Bun'
related:
  - 'Peer Dependencies'
  - 'Monorepo'
  - 'Node.js'
  - 'patch-package'
  - 'Expo SDK Version'
updated: 2026-11-13
---

A package manager installs the libraries your project depends on, resolves their own dependencies, and writes a lockfile so every machine installs the same versions. React Native projects can use npm, Yarn, pnpm or Bun.

The choice matters less for features than for consistency. Whichever you pick, one rule applies: **one package manager, one lockfile.** The tool is detected from the lockfile you commit (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` or `bun.lock`), including by build services such as EAS Build. Two lockfiles in the same repository mean CI and teammates may install different versions without anyone noticing.

React Native adds constraints a web project does not have:

- **Native code lives in packages.** Installing a library with native code means a new native build, not just a reload.
- **Metro needs a real `node_modules` folder.** Yarn’s Plug’n’Play mode is not supported, so Yarn Berry projects set `nodeLinker: node-modules`.
- **Version alignment matters.** Expo projects should add libraries with `npx expo install`, which calls your package manager but picks the version that matches your [Expo SDK version](/react-native-glossary/expo-sdk-version).

```bash
npx expo install react-native-reanimated
```

The common gotcha is "fixing" an install failure by deleting the lockfile. That silently upgrades every dependency in the tree at once and is a frequent cause of builds that break the next day. Resolve the specific conflict instead, often a [peer dependency](/react-native-glossary/peer-dependencies) mismatch.

Each manager also has its own way to override a nested dependency version (`overrides` in npm and Bun, `resolutions` in Yarn, `pnpm.overrides` in pnpm) and to patch packages, which teams otherwise do with [patch-package](/react-native-glossary/patch-package). In a [monorepo](/react-native-glossary/monorepo), workspace and hoisting behaviour differs between them, which is where the choice really shows.

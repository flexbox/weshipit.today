---
title: 'Watchman'
summary: 'Watchman is Meta’s file-watching service that Metro can use to detect file changes quickly, recommended on macOS for faster and more reliable reloads.'
aliases:
  - 'File watcher'
related:
  - 'Metro'
  - 'Fast Refresh'
  - 'Monorepo'
  - 'Node.js'
updated: 2026-11-13
---

Watchman is a file-watching service from Meta. It runs in the background, tracks changes across large directory trees efficiently, and answers queries such as "which files changed since my last check". [Metro](/react-native-glossary/metro) uses it when it is installed to know when to rebuild and trigger [Fast Refresh](/react-native-glossary/fast-refresh).

It is optional. Without it, Metro falls back to Node’s own file watching. On macOS the React Native docs recommend installing it, usually with Homebrew:

```bash
brew install watchman
```

Why it matters: a React Native project, with `node_modules` and native folders, contains a very large number of files. Watchman handles that scale with a single daemon and keeps its own index, so Metro starts faster and picks up edits reliably, especially in large repositories and [monorepos](/react-native-glossary/monorepo).

How it shows up in practice:

- A "Recrawl" warning in the Metro output means Watchman lost track of changes and re-scanned the tree. The message itself suggests the fix.
- "EMFILE: too many open files" errors on macOS usually mean Metro is falling back to Node’s watcher without Watchman, and installing it resolves them.
- Watchman’s view of the project can go stale after moving or renaming large folders, switching branches with many changes, or restoring a project from backup.

The common gotcha is assuming a Metro cache reset clears everything. If edits are not detected or Metro keeps resolving deleted files, reset Watchman too:

```bash
watchman watch-del-all
```

Then restart Metro with its cache cleared. Together those two commands fix a surprising share of "it works on my colleague’s machine" bundler problems.

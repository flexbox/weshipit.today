---
title: 'Monorepo'
summary: 'A monorepo keeps a React Native app alongside other apps and shared packages in one repository, linked together with npm, Yarn, pnpm or Bun workspaces.'
aliases:
  - 'Workspaces'
  - 'Yarn workspaces'
  - 'pnpm workspaces'
related:
  - 'Package Manager'
  - 'Metro'
  - 'Autolinking'
  - 'Peer Dependencies'
  - 'React Native Web'
updated: 2026-11-13
---

A monorepo is a single repository that holds several projects, for example a React Native app, a Next.js site and shared packages for UI, types and API clients. The package manager’s workspaces feature links them so the app can import `@acme/ui` as if it came from the registry.

Teams adopt it to share code between mobile and web, keep one version of TypeScript and lint config, and change an API client and its callers in one pull request.

React Native makes monorepos harder than the web does, for three reasons:

- **[Metro](/react-native-glossary/metro) must see the whole repository.** It needs to watch and resolve files outside the app folder. Expo’s Metro config detects workspaces automatically; bare projects usually set `watchFolders` themselves.
- **Native dependencies must be visible to the app.** [Autolinking](/react-native-glossary/autolinking) only links native libraries the app depends on, so a library used by a shared package must also be listed in the app’s own `package.json`.
- **There must be exactly one copy of React and React Native.** Two copies cause "Invalid hook call" errors or native crashes.

That last point is the classic failure. Different packages pin slightly different versions of `react`, the package manager installs both, and the app breaks in ways that look unrelated. Declare `react` and `react-native` as [peer dependencies](/react-native-glossary/peer-dependencies) in shared packages, and keep a single version at the root.

Hoisting also matters. Some React Native tooling still assumes packages live in a flat `node_modules`, so pnpm’s isolated layout may need `node-linker=hoisted`, depending on your toolchain version. Tools such as Nx and Turborepo add caching and task orchestration on top, but the workspace rules above apply whichever you pick.

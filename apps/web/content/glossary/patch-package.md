---
title: 'patch-package'
summary: 'patch-package is a tool that saves your edits to a library inside node_modules as a patch file and reapplies them after every install, until an upstream fix ships.'
aliases:
  - 'Patching dependencies'
related:
  - 'Package Manager'
  - 'Peer Dependencies'
  - 'Upgrade Helper'
  - 'Native Module'
updated: 2026-11-13
---

patch-package is a command-line tool for fixing a bug in a dependency without forking it. You edit the library’s files in `node_modules`, run one command, and it records the difference as a patch file that is reapplied after every install.

```bash
# after editing node_modules/some-library
npx patch-package some-library
```

This creates `patches/some-library+1.2.3.patch`, which you commit. A `postinstall` script in `package.json` then applies it on every machine and in CI:

```json
{
  "scripts": { "postinstall": "patch-package" }
}
```

It is common in React Native because libraries often need a small fix that cannot wait for a release: a crash on a new Android version, a build error after an Xcode update, a missing [New Architecture](/react-native-glossary/legacy-vs-new-architecture) tweak.

Most [package managers](/react-native-glossary/package-manager) now offer built-in equivalents, such as `yarn patch`, `pnpm patch` and `bun patch`, which record patches in `package.json` without an extra dependency. The idea is identical.

How it behaves in practice:

- Patches are tied to the version in the file name. After upgrading the library, patch-package warns or fails when the patch no longer applies, which is your cue to check whether the fix landed upstream.
- Patching a library’s native code, under its `ios/` or `android/` folder, needs a new native build. On iOS, reinstall [CocoaPods](/react-native-glossary/cocoapods) dependencies so the change is picked up.
- Patch the files the app actually loads. Many libraries ship both `src/` and compiled output such as `lib/`, so check which one the package’s entry point uses before editing.

The common mistake is treating a patch as permanent. Patches accumulate quietly and then all break during a React Native upgrade. Open an issue or pull request upstream, link it in a comment at the top of the patch, and delete the patch once the fixed version is out.

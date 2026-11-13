---
title: 'Upgrade Helper'
summary: 'The Upgrade Helper is a community web tool that shows the exact template changes between two React Native versions, so you can apply them to your own native project.'
aliases:
  - 'React Native upgrade'
  - 'rn-diff-purge'
related:
  - 'React Native CLI'
  - 'Expo SDK Version'
  - 'Continuous Native Generation'
  - 'Podfile'
  - 'Gradle'
updated: 2026-11-13
---

The Upgrade Helper is a web tool maintained by the React Native community. You pick your current version and the target version, and it shows a file-by-file diff of everything that changed in the default project template between them: `package.json`, the [Podfile](/react-native-glossary/podfile), [Gradle](/react-native-glossary/gradle) files, `AppDelegate`, `MainApplication` and the rest.

It is built on rn-diff-purge, a repository that generates a fresh project for every React Native release and stores the differences, which is where the alias comes from.

It matters because a project created with the [React Native CLI](/react-native-glossary/react-native-cli) owns its `ios/` and `android/` folders. Upgrading the `react-native` package alone is not enough; the native files must change too, and the Upgrade Helper is the canonical list of what to change.

How to use it well:

- Commit everything first and upgrade on a dedicated branch.
- Apply the diff by hand, file by file, keeping your own customisations. Files you never touched can usually be copied wholesale.
- Expand the release notes links shown alongside the diff for breaking changes in JavaScript APIs.
- Clean native caches afterwards: reinstall pods and run a clean Gradle build.

The common misconceptions:

- **It only covers the template.** Your third-party libraries need their own upgrades, and they are usually the harder part. Check each native library supports the target version first.
- **Skipping many versions makes the diff huge.** Large jumps are possible, but going a few versions at a time keeps each step debuggable.
- **Expo projects using [Continuous Native Generation](/react-native-glossary/continuous-native-generation) rarely need it.** They regenerate native folders from config, so upgrading the Expo SDK version and running prebuild replaces the manual diff.

See the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/).

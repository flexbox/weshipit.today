---
title: 'Fast Refresh'
summary: 'Fast Refresh reloads edited React components in a running app within a second, preserving component state where it safely can.'
aliases:
  - 'Hot reload'
  - 'Live reload'
related:
  - 'Metro'
  - 'Dev Menu'
  - 'Development Build'
  - 'Props and State'
updated: 2026-09-12
---

Fast Refresh is React Native's hot-reloading system. Save a file and [Metro](/react-native-glossary/metro) pushes just that module to the running app, which re-renders in well under a second — no rebuild, no navigating back to the screen you were testing.

It is state-aware, which is the part that saves real time:

- Editing a component that only renders JSX → **state is preserved**, so you keep your form input and scroll position
- Editing a hook or a non-component export → the module is re-run, so **state resets**
- A syntax or runtime error → a red screen appears, and fixing the file recovers automatically

Fast Refresh replaced the older Hot Reloading and Live Reload toggles in React Native 0.61 and is on by default; you can disable it from the [dev menu](/react-native-glossary/dev-menu).

What it does **not** cover is anything outside the JavaScript [bundle](/react-native-glossary/javascript-bundle). Installing a [native module](/react-native-glossary/native-module), changing app config, or upgrading React Native needs a full rebuild.

If refresh stops applying, reload from the dev menu or restart Metro with `--clear`.

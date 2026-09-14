---
title: 'Continuous Native Generation'
summary: 'Continuous Native Generation (CNG) regenerates the ios and android folders from app config and config plugins, so native projects are build artefacts rather than hand-edited source.'
aliases:
  - 'CNG'
  - 'Prebuild'
  - 'Config plugin'
related:
  - 'Expo'
  - 'Native Module'
  - 'EAS'
  - 'Development Build'
updated: 2026-09-12
---

Continuous Native Generation is the practice of treating the `ios/` and `android/` directories as generated output rather than source you maintain. Running `npx expo prebuild` recreates them from `app.json` plus a set of config plugins.

Without CNG, adding a library that needs a permission means editing `Info.plist` and `AndroidManifest.xml` by hand — and then resolving conflicts in those files on every React Native upgrade. With CNG you declare the intent once:

```json
{
  "plugins": [["expo-camera", { "cameraPermission": "Scan receipts" }]]
}
```

A **config plugin** is the function that applies one library's native changes during prebuild. Most Expo SDK packages ship one; community libraries increasingly do too.

The payoff is upgrades. Because the native folders are regenerated, bumping React Native does not mean merging someone else's changes into your `Podfile`.

You can still drop out and manage native folders manually — the "bare" approach — but you lose that upgrade property. See [prebuild](https://docs.expo.dev/workflow/prebuild/).

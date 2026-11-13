---
title: 'Config Plugin'
summary: 'A config plugin is a JavaScript function that edits the native iOS and Android projects during Expo prebuild, so native setup lives in app config, not hand edits.'
aliases:
  - 'Expo config plugin'
  - 'Mods'
related:
  - 'Continuous Native Generation'
  - 'App Config'
  - 'Info.plist'
  - 'AndroidManifest.xml'
  - 'Expo Modules API'
updated: 2026-11-13
---

A config plugin is a plain JavaScript function that takes your Expo config and returns a modified one, describing changes to the native `ios/` and `android/` projects. Expo runs every plugin when it generates those projects with `npx expo prebuild`.

It exists because of [Continuous Native Generation](/react-native-glossary/continuous-native-generation): if the native folders are regenerated from scratch, any manual edit to Xcode or Gradle files would be wiped. Plugins make those edits repeatable and reviewable. Most libraries that need native setup ship one, and you enable it in the `plugins` array of your [app config](/react-native-glossary/app-config):

```json
{
  "plugins": [["expo-camera", { "cameraPermission": "Allow $(PRODUCT_NAME) to scan tickets" }]]
}
```

Under the hood a plugin chains **mods**: small modifiers such as `withInfoPlist`, `withAndroidManifest` or `withPodfile`, each of which receives one native file in a parsed form and returns the edited version. Writing your own is a few lines when you need a key in [Info.plist](/react-native-glossary/info-plist) or a permission in [AndroidManifest.xml](/react-native-glossary/android-manifest) that no library adds for you.

Common gotchas:

- Plugins run only at prebuild time. Changing a plugin option does nothing until you regenerate and rebuild the native app; an over-the-air update cannot apply it.
- They never run inside Expo Go, which has a fixed native binary.
- "Dangerous" mods that patch files with string replacement are fragile across SDK upgrades. Prefer the typed mods and re-test plugins after every upgrade.
- If you commit native folders and edit them by hand, plugins and your edits can fight. Pick one source of truth.

See the [config plugins docs](https://docs.expo.dev/config-plugins/introduction/).

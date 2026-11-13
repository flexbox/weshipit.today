---
title: 'App Config'
summary: 'App config is the app.json or app.config.js/ts file where an Expo project declares its name, identifiers, icons, permissions and plugins for native generation.'
aliases:
  - 'app.json'
  - 'app.config.js'
  - 'app.config.ts'
related:
  - 'Continuous Native Generation'
  - 'Config Plugin'
  - 'Environment Variables'
  - 'Bundle Identifier'
  - 'Expo'
updated: 2026-11-13
---

App config is the file at the root of an Expo project, `app.json` or its dynamic form `app.config.js` / `app.config.ts`, that describes the app: display name, version, icon, splash screen, [bundle identifier](/react-native-glossary/bundle-identifier), permissions and the list of config plugins.

It matters because it is the source of truth for the native projects. With [Continuous Native Generation](/react-native-glossary/continuous-native-generation), `npx expo prebuild` reads app config and writes `Info.plist`, `AndroidManifest.xml` and the rest, running each [config plugin](/react-native-glossary/config-plugin) along the way. EAS Build, Expo CLI and Expo Router read it too.

The dynamic form is plain code, which helps when values depend on the build:

```ts
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.APP_VARIANT === 'dev' ? 'MyApp (Dev)' : 'MyApp',
  slug: 'my-app',
});
```

The `config` argument contains whatever is in `app.json`, so the two files can coexist. Run `npx expo config` to print the fully resolved result.

Common gotchas:

- Changing native fields such as permissions, icons or the bundle identifier needs a new native build. A JavaScript reload will not pick them up.
- If you commit your own `ios/` and `android/` folders and never run prebuild, most native fields in app config are ignored, which [Expo Doctor](/react-native-glossary/expo-doctor) warns about.
- Anything placed under `extra` ends up readable inside the app bundle. It is not a place for secrets.

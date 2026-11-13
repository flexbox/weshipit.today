---
title: 'Runtime Version'
summary: 'A runtime version is a label describing an app binary’s native layer. Expo’s OTA updates only install on builds with the exact same runtime version string.'
aliases:
  - 'runtimeVersion'
related:
  - 'EAS Update'
  - 'Over-the-Air Update'
  - 'Update Channel'
  - 'App Versioning'
updated: 2026-11-13
---

A runtime version is the compatibility contract between a native binary and the JavaScript that runs inside it. In Expo it is the `runtimeVersion` field in [app config](/react-native-glossary/app-config): every build records one, every [EAS Update](/react-native-glossary/eas-update) is published with one, and a device only accepts updates whose string matches its own exactly.

It exists because JavaScript can only call native code that is actually compiled into the app. An update that imports a native module added last week will crash every binary built before it. The runtime version is how you tell the update service “these binaries are safe to receive this bundle”.

You rarely type the value by hand. Instead you choose a policy:

```json
{
  "expo": {
    "runtimeVersion": { "policy": "fingerprint" }
  }
}
```

- **`appVersion`** uses your app’s `version`, so you must bump the version whenever native code changes.
- **`nativeVersion`** combines the version and build number.
- **`fingerprint`** hashes the native-relevant parts of the project (native dependencies, config plugins, native folders) and changes automatically when they do.

The gotcha is treating it like the marketing version. With the `appVersion` policy, installing a library with native code and shipping an update without bumping `version` is the classic way to push a crashing update to production. The `fingerprint` policy removes that human step, at the cost of an opaque hash and the occasional surprise when a change you thought was JavaScript-only turns out to alter the fingerprint.

The runtime version is not the store version users see; that is [app versioning](/react-native-glossary/app-versioning). Several store versions can share one runtime version, and one store version can never have two. See [runtime versions](https://docs.expo.dev/eas-update/runtime-versions/).

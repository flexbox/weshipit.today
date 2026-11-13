---
title: 'App Icon'
summary: 'The app icon is the image representing your React Native app on the home screen and in stores, built from platform-specific assets such as Android’s adaptive icon.'
aliases:
  - 'Adaptive icon'
related:
  - 'Splash Screen'
  - 'App Config'
  - 'App Store Review'
  - 'Continuous Native Generation'
updated: 2026-11-13
---

The app icon is the image people tap on the home screen and see in the App Store and Google Play. It is a native asset baked into the binary, so React Native code never renders it; you supply files in the formats each platform expects.

**iOS** needs a single 1024×1024 square image in the asset catalog, from which Xcode derives every size. It must be fully opaque: an icon with a transparent background is rejected at upload. Do not round the corners yourself, the system applies its own mask. Recent iOS versions also let users pick dark and tinted home screens, for which you can provide variants.

**Android** uses the **adaptive icon**, introduced in Android 8.0. Instead of one bitmap you provide two layers:

- A **foreground** image, usually your logo on transparency.
- A **background** colour or image.

The launcher masks the combined layers into a circle, squircle or whatever shape the device uses, and can animate them slightly. The layers are 108dp square, but only the central area is guaranteed to be visible, so keep the logo well inside that safe zone. A **monochrome** layer powers themed icons on Android 13 and later.

With Expo all of this lives in your [app config](/react-native-glossary/app-config):

```json
{
  "icon": "./assets/icon.png",
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#0B0B0F"
    }
  }
}
```

The usual mistakes, often caught late in [App Store review](/react-native-glossary/app-store-review) or on a real launcher: putting a full-bleed square logo in the foreground layer, so the launcher crops it; forgetting the icon changes only after a fresh native build; and expecting to swap it with an over-the-air update. Alternate icons the user can choose at runtime are possible, but must be bundled ahead of time.

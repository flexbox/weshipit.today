---
title: 'Deep Linking'
summary: 'Deep linking lets a URL open a React Native app on a specific screen, such as myapp://post/42, instead of just launching it on the home screen.'
aliases:
  - 'Deep link'
  - 'URL scheme'
related:
  - 'Universal Links'
  - 'Android App Links'
  - 'Linking API'
  - 'React Navigation'
  - 'Expo Router'
updated: 2026-11-13
---

Deep linking maps a URL to a screen inside your app. Tapping `myapp://post/42` in an email, a push notification or another app launches yours and lands the user on post 42 rather than the home screen.

The simplest form is a **custom URL scheme** such as `myapp://`. You register it natively (`CFBundleURLTypes` in Info.plist, an `intent-filter` in AndroidManifest.xml, or the `scheme` field in an Expo app config), then teach your navigator how to turn paths into screens. In [React Navigation](/react-native-glossary/react-navigation) that is the `linking` prop:

```tsx
const linking = {
  prefixes: ['myapp://', 'https://example.com'],
  config: { screens: { Post: 'post/:id' } },
};

<NavigationContainer linking={linking}>{/* ... */}</NavigationContainer>;
```

[Expo Router](/react-native-glossary/expo-router) skips this step: every file is already a route, so every screen has a URL.

Under the hood the app receives URLs two ways, which the Linking API exposes: `getInitialURL()` when the link cold-starts the app, and a `url` event when the app is already running. Handling only one of them is the classic bug where links work "sometimes".

The misconception worth correcting: a custom scheme is not owned by you. Any app can register `myapp://`, and if your app is not installed the link simply fails. For links you share publicly, use verified `https` links instead: [Universal Links](/react-native-glossary/universal-links) on iOS and [Android App Links](/react-native-glossary/android-app-links). They open the app when installed and fall back to your website when not.

Test without building a sharing flow:

```bash
xcrun simctl openurl booted "myapp://post/42"
adb shell am start -W -a android.intent.action.VIEW -d "myapp://post/42"
```

Treat every deep link as untrusted input: validate parameters and require authentication before showing private screens.

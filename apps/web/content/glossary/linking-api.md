---
title: 'Linking API'
summary: 'Linking is the React Native API for opening URLs in other apps, such as the browser, phone or maps, and for receiving the URLs that open your own app via deep links.'
aliases:
  - 'Linking'
  - 'openURL'
related:
  - 'Deep Linking'
  - 'Universal Links'
  - 'Android App Links'
  - 'Info.plist'
  - 'AndroidManifest.xml'
updated: 2026-11-13
---

`Linking` is the core API that connects your app to URLs in both directions. Outgoing, it hands a URL to the operating system so the right app opens: `https:` in the browser, `tel:` in the dialler, `mailto:` in mail, or another app’s custom scheme. Incoming, it tells you which URL launched or resumed your app, the raw material of [deep linking](/react-native-glossary/deep-linking).

```js
await Linking.openURL('tel:+33123456789');
const initialUrl = await Linking.getInitialURL(); // cold start
const sub = Linking.addEventListener('url', ({ url }) => route(url)); // app already running
```

Other useful methods are `Linking.openSettings()`, which jumps to your app’s page in system Settings (the standard way to recover from a denied permission), and `Linking.sendIntent()` for Android intents.

The classic gotcha is `canOpenURL`. It returns `false` for other apps’ schemes unless you declare them first: in `LSApplicationQueriesSchemes` in `Info.plist` on iOS, and in a `<queries>` element in [AndroidManifest.xml](/react-native-glossary/android-manifest) on Android 11 and later. Many apps skip `canOpenURL` and simply call `openURL` inside a `try`/`catch`, since `openURL` rejects when nothing can handle the URL.

Incoming links have two paths that must both work: `getInitialURL()` for a cold start and the `url` event while the app is running. Handling only one is why “the link works only when the app is already open” is such a common bug report.

Routers such as React Navigation and Expo Router build on Linking to map URLs to screens automatically, so in most apps you configure linking rather than calling these methods by hand. Expo also offers `expo-linking`, which adds helpers like `createURL` for building links that work in development and production. Verified https links are covered separately under [universal links](/react-native-glossary/universal-links) and [Android App Links](/react-native-glossary/android-app-links).

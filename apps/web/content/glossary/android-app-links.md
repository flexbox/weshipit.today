---
title: 'Android App Links'
summary: 'Android App Links are verified https links that open your Android app directly, without a chooser dialog, once an assetlinks.json file on your domain proves you own both.'
aliases:
  - 'App links'
  - 'assetlinks.json'
related:
  - 'Deep Linking'
  - 'Universal Links'
  - 'AndroidManifest.xml'
  - 'Android Keystore'
updated: 2026-11-13
---

Android App Links are `https://` links that Android hands straight to your app because it has verified you own the domain. They are the Android counterpart of iOS [Universal Links](/react-native-glossary/universal-links), and the public-facing form of [deep linking](/react-native-glossary/deep-linking).

The app declares the domain with an intent filter marked `autoVerify` in [AndroidManifest.xml](/react-native-glossary/android-manifest), or `android.intentFilters` in an Expo app config:

```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="example.com" />
</intent-filter>
```

The website publishes `/.well-known/assetlinks.json`, listing the app’s package name and the SHA-256 fingerprint of the certificate that signs it. Android checks the file when the app is installed.

The mistake almost everyone makes once is the fingerprint. With Play App Signing, Google re-signs your app, so the fingerprint users’ devices see is Google’s **app signing key**, shown in Play Console, not your upload key from the [keystore](/react-native-glossary/android-keystore). Debug builds use yet another certificate. Put every fingerprint you need in the file.

Other things worth knowing:

- Without verification, recent Android versions open the link in the browser rather than offering your app, so a failed check looks like "links just open Chrome".
- Every host in a verified intent filter must pass, including subdomains you list.
- You can inspect and re-trigger verification on a device:

```bash
adb shell pm get-app-links com.example.app
adb shell pm verify-app-links --re-verify com.example.app
```

See [Android App Links](https://developer.android.com/training/app-links).

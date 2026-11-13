---
title: 'Privacy Manifest'
summary: 'A privacy manifest is the PrivacyInfo.xcprivacy file Apple requires in iOS apps and SDKs, declaring the data they collect and why they use certain sensitive APIs.'
aliases:
  - 'PrivacyInfo.xcprivacy'
  - 'Required reason API'
related:
  - 'Info.plist'
  - 'App Store Review'
  - 'App Config'
  - 'CocoaPods'
updated: 2026-11-13
---

A privacy manifest is a property list file named `PrivacyInfo.xcprivacy` that Apple requires in iOS apps and in many third-party SDKs. It declares what data the app collects, whether it is used for tracking, and why the code calls certain APIs Apple considers open to fingerprinting.

Those are the **required reason APIs**. Calling them is allowed, but each category must be listed with an approved reason code. Categories include `UserDefaults`, file timestamps, system boot time, disk space and active keyboards. React Native itself, and libraries such as AsyncStorage, touch several of them, so practically every React Native app needs a manifest even if your own code never mentions these APIs.

If something is missing, App Store Connect emails you an `ITMS-91053: Missing API declaration` warning or rejects the upload, naming the API category. The fix is to add the category and reason to your app’s manifest.

With Expo you declare it in your [app config](/react-native-glossary/app-config) and prebuild writes the file:

```json
{
  "ios": {
    "privacyManifests": {
      "NSPrivacyAccessedAPITypes": [
        {
          "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryUserDefaults",
          "NSPrivacyAccessedAPITypeReasons": ["CA92.1"]
        }
      ]
    }
  }
}
```

Common gotchas:

- Libraries installed through [CocoaPods](/react-native-glossary/cocoapods) may ship their own manifest that does not reach your final app correctly. If Apple flags an API you never call directly, copy the dependency’s declaration into your app manifest.
- The manifest is separate from the App Store privacy "nutrition label" you fill in online. Keep the two consistent.
- It is not [Info.plist](/react-native-glossary/info-plist). Permission prompt strings still go there.

See Apple’s [privacy manifest documentation](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files).

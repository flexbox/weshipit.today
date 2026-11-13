---
title: 'Android Keystore'
summary: 'An Android keystore is the password-protected file holding the private key that signs your app; Google Play rejects updates signed with a different key.'
aliases:
  - 'Upload key'
  - 'Keystore file'
related:
  - 'Code Signing'
  - 'Google Play Console'
  - 'Android App Bundle'
  - 'Gradle'
updated: 2026-11-13
---

An Android keystore is a password-protected file, usually ending in `.jks` or `.keystore`, that holds the private key used to sign your Android build. Every React Native release you send to Google Play is signed with a key from this file.

With **Play App Signing**, which new apps published as an [Android App Bundle](/react-native-glossary/android-app-bundle) must use, there are two keys:

- The **upload key**, which you keep. You sign each `.aab` with it before uploading.
- The **app signing key**, which Google keeps and uses to sign the APKs delivered to users.

That split is a safety net. If you lose the upload key, you can ask Google through the [Google Play Console](/react-native-glossary/google-play-console) to register a new one. Older apps that never enrolled are not so lucky: lose that key and you can never ship an update to the same listing.

You create a key with the JDK’s `keytool` and point [Gradle](/react-native-glossary/gradle) at it in a `signingConfigs` block:

```bash
keytool -genkeypair -v -keystore upload.keystore -alias upload \
  -keyalg RSA -keysize 2048 -validity 10000
```

Common gotchas:

- The React Native template signs release builds with the shared `debug.keystore` until you change it. Builds signed with the debug key are rejected by Play.
- Never commit the keystore or its passwords. Keep passwords in `~/.gradle/gradle.properties` or CI secrets, and store a backup of the file somewhere other than your laptop.
- Services such as EAS can generate and hold the keystore for you; download a copy anyway.

Do not confuse this file with the **Android Keystore system**, the on-device API apps use to store cryptographic keys securely at runtime. Same name, different thing.

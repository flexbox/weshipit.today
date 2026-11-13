---
title: 'IPA'
summary: 'An IPA (.ipa) is the signed archive that packages an iOS app for distribution, the file you upload to App Store Connect or install on registered test devices.'
aliases:
  - 'iOS app archive'
  - '.ipa'
related:
  - 'App Store Connect'
  - 'Code Signing'
  - 'Xcode'
  - 'TestFlight'
updated: 2026-11-13
---

An IPA is a ZIP file containing a `Payload/` folder with your `.app` bundle inside: the compiled executable, Info.plist, assets, the embedded provisioning profile, the code signature and, for a React Native release build, `main.jsbundle`. It is the iOS counterpart of an Android [APK](/react-native-glossary/apk), with one big difference: it only runs on devices its signature allows.

In a bare React Native project you get one from [Xcode](/react-native-glossary/xcode) by choosing Product → Archive, then distributing the archive, or from the command line with `xcodebuild -exportArchive` and an export options plist. EAS Build and fastlane run those same steps for you. During the archive, the "Bundle React Native code and images" build phase embeds the JavaScript, so the IPA does not need Metro.

The export method decides who can install it:

- **App Store Connect**: uploaded for [TestFlight](/react-native-glossary/testflight) and App Store release; it cannot be installed directly.
- **Ad hoc**: installs only on devices whose UDIDs are registered in the provisioning profile.
- **Enterprise**: for in-house distribution under the separate Apple Developer Enterprise Program.
- **Development**: for devices of team members, with debugging enabled.

The misconception to drop: you cannot send an IPA to anyone and have them install it. Without their device in the profile, or distribution through Apple, iOS refuses it. That is [code signing](/react-native-glossary/code-signing) at work, not a broken file.

The other gotcha is the simulator. The iOS Simulator cannot run an IPA at all; it needs a `.app` built for the simulator. A build meant for the simulator and one meant for devices are separate builds, which is why EAS build profiles have a `simulator` option.

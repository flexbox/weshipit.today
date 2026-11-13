---
title: 'Xcode'
summary: 'Xcode is Apple’s macOS IDE and toolchain that compiles the iOS side of a React Native app, runs it on simulators and devices, and signs it for the App Store.'
aliases:
  - 'Xcode project'
related:
  - 'CocoaPods'
  - 'iOS Simulator'
  - 'Code Signing'
  - 'Info.plist'
  - 'Development Build'
updated: 2026-11-13
---

Xcode is Apple’s integrated development environment and build toolchain. In a React Native project it compiles everything under the `ios/` folder — your app target, React Native itself and every native library — into a binary that runs on the [iOS Simulator](/react-native-glossary/ios-simulator) or a real iPhone.

You need it even if you never open its editor. `npx react-native run-ios` and `npx expo run:ios` both drive Xcode’s command-line tools (`xcodebuild`) behind the scenes, and the simulator ships inside Xcode. It only runs on macOS, which is why building iOS locally requires a Mac; cloud services such as EAS Build rent you one instead.

Places a React Native developer actually visits in Xcode:

- **Signing & Capabilities**, to choose a team, fix provisioning errors and add capabilities such as push notifications.
- **Build Settings**, for the bundle identifier, deployment target and build configurations (Debug and Release).
- **The scheme menu**, to switch between Debug and Release or pick a device.
- **The build log**, which shows the real native error when the CLI only prints “build failed”.

The classic gotcha: when the project uses [CocoaPods](/react-native-glossary/cocoapods), open `ios/YourApp.xcworkspace`, not `YourApp.xcodeproj`. The project file alone does not know about the Pods, so you get hundreds of “module not found” errors that have nothing to do with your code.

When builds fail mysteriously after an upgrade, clearing Xcode’s DerivedData folder and re-running `pod install` resolves a surprising share of cases. Apple also raises the minimum Xcode and iOS SDK required for App Store uploads periodically, so an old Xcode can block a release even if the app builds fine. See [Code Signing](/react-native-glossary/code-signing) for the certificate side of shipping.

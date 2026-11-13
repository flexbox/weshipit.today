---
title: 'Fastlane'
summary: 'Fastlane is an open-source Ruby tool that automates building, signing and uploading iOS and Android apps, with scripted lanes that replace manual Xcode and store steps.'
aliases:
  - 'fastlane match'
related:
  - 'CI/CD'
  - 'Code Signing'
  - 'App Store Connect'
  - 'Google Play Console'
  - 'EAS Build'
updated: 2026-11-13
---

Fastlane automates the release chores of mobile apps: building, managing certificates, bumping build numbers, taking screenshots and uploading to the stores. You describe each workflow as a **lane** in a Ruby file called a `Fastfile`, then run it locally or in [CI](/react-native-glossary/ci-cd).

```ruby
platform :ios do
  lane :beta do
    match(type: "appstore")
    increment_build_number(xcodeproj: "ios/MyApp.xcodeproj")
    build_app(workspace: "ios/MyApp.xcworkspace", scheme: "MyApp")
    upload_to_testflight
  end
end
```

Each line is an **action**, and the common ones carry older short names you will still see in guides: `build_app` (gym), `upload_to_testflight` (pilot), `upload_to_app_store` (deliver) and `upload_to_play_store` (supply).

The piece React Native teams value most is **match**. It stores your iOS certificates and provisioning profiles, encrypted, in a private Git repository or cloud bucket, and installs them on any machine that runs the lane. That removes "it only signs on Dave’s laptop" from your team, which is the core problem of iOS [code signing](/react-native-glossary/code-signing) on CI.

Where it fits today: if you use [EAS Build](/react-native-glossary/eas-build), you mostly do not touch fastlane directly; EAS manages credentials and runs the iOS build steps for you. Bare React Native projects building on their own runners, or teams that need custom release steps, still rely on it heavily.

Practical gotchas:

- It is a Ruby gem, so pin it in a `Gemfile` and run `bundle exec fastlane` to avoid "works on my machine" version drift.
- Authenticate with an App Store Connect API key rather than an Apple ID, which runs into two-factor prompts on CI.
- `match nuke` revokes every certificate of a type for the whole team. Read the prompt twice.

See the [fastlane docs](https://docs.fastlane.tools/).

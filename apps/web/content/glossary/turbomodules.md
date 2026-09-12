---
title: 'TurboModules'
summary: 'TurboModules are the New Architecture’s native modules. They are typed by Codegen, built on JSI, and loaded lazily so startup only pays for what the app actually uses.'
aliases:
  - 'Turbo Modules'
  - 'TurboModule'
related:
  - 'Native Module'
  - 'JSI'
  - 'Codegen'
  - 'Legacy vs New Architecture'
updated: 2026-09-12
---

TurboModules are the [New Architecture](/react-native-glossary/legacy-vs-new-architecture) replacement for classic [native modules](/react-native-glossary/native-module). They do the same job — expose platform capabilities to JavaScript — with three differences that matter.

- **Lazy loading.** Legacy native modules were all initialised at startup, whether or not the app used them. A TurboModule is instantiated the first time JavaScript touches it, so an app with 40 dependencies no longer pays for 40 modules on launch.
- **Direct invocation.** They sit on [JSI](/react-native-glossary/jsi), so calls skip JSON serialisation and can return synchronously.
- **Generated type safety.** You declare the interface once in a TypeScript spec file and [Codegen](/react-native-glossary/codegen) produces the C++, Java, and Objective-C bindings, so a signature mismatch is a build error rather than a runtime crash.

For app developers the practical impact is upgrade-shaped: when a library says it "supports the New Architecture", this is largely what it means. Libraries that were never migrated fail on modern React Native versions.

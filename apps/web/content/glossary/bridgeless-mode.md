---
title: 'Bridgeless Mode'
summary: 'Bridgeless mode runs React Native with the legacy bridge removed entirely, so JavaScript talks to native code only through JSI. It is the default New Architecture setup.'
aliases:
  - 'Bridgeless'
related:
  - 'Bridge'
  - 'JSI'
  - 'Interop Layer'
  - 'Legacy vs New Architecture'
  - 'TurboModules'
updated: 2026-11-13
---

Bridgeless mode is the last step of the New Architecture migration: the app starts without creating the [bridge](/react-native-glossary/bridge) at all. Fabric and TurboModules had already moved rendering and native modules onto [JSI](/react-native-glossary/jsi), but early New Architecture apps still booted a bridge for everything else. Bridgeless mode removes that remaining infrastructure, and it is part of the default setup since React Native 0.76.

The leftovers it had to replace were not glamorous but they were everywhere:

- **Runtime start-up and teardown.** The bridge object owned the JavaScript runtime. Bridgeless apps create it through a new host object instead: `RCTHost` on iOS and `ReactHost` on Android.
- **Timers, error handling and event delivery**, which used to route through bridge queues.
- **Module lookup.** Every native module is reached through the TurboModule system rather than through a bridge registry.

For app developers the visible effect is mostly indirect: faster start-up and no hidden bridge traffic. For anyone maintaining native code it is concrete, because APIs that assumed a bridge are gone. Native code that reached for `self.bridge` in an iOS module, or the `CatalystInstance` on Android, to dispatch events or find another module has to be updated to the bridgeless equivalents. Those are the libraries that crash or log "bridge is nil" after an upgrade.

Two misconceptions are worth clearing up:

- **Bridgeless does not mean legacy modules stop working.** Modules written against the old API usually keep running through the [interop layer](/react-native-glossary/interop-layer), which emulates enough of the old environment for them. Direct bridge access is what breaks.
- **Bridgeless is not a separate option you choose any more.** On current React Native versions the legacy architecture cannot be enabled, so bridgeless is simply how React Native runs.

If an older article explains a bug by "bridge congestion", it is describing a system your app no longer has.

---
title: 'Event Emitter'
summary: 'An event emitter lets native code push events to JavaScript, such as download progress or sensor readings, which components receive by subscribing to a listener.'
aliases:
  - 'NativeEventEmitter'
  - 'Native events'
related:
  - 'Native Module'
  - 'TurboModules'
  - 'Memory Leak'
  - 'useEffect'
updated: 2026-11-13
---

An event emitter is how native code talks to JavaScript without being asked. A normal [native module](/react-native-glossary/native-module) call goes from JavaScript to native and returns once; an emitter lets the native side send any number of events later — Bluetooth packets, location updates, download progress, an audio player finishing a track.

The long-standing API is `NativeEventEmitter`, wrapping a native module that can emit:

```ts
const emitter = new NativeEventEmitter(NativeModules.Downloader);

const sub = emitter.addListener('progress', (e) => setProgress(e.percent));
// later, for example in an effect cleanup
sub.remove();
```

On iOS the module typically subclasses `RCTEventEmitter`, lists its event names in `supportedEvents` and calls `sendEventWithName`. On Android it emits through `DeviceEventManagerModule.RCTDeviceEventEmitter`, and the module should also implement `addListener` and `removeListeners` methods, or React Native logs a warning when you construct the emitter.

Under the New Architecture, a [TurboModule](/react-native-glossary/turbomodules) spec can also declare typed event emitters, so Codegen generates the plumbing and the payload type is checked instead of being an untyped string-named event.

The common mistakes are all about lifetimes:

- **Forgetting `remove()`.** A listener added in a component and never removed keeps firing after the screen is gone, calling `setState` on an unmounted component and keeping its closure alive. Subscribe inside [`useEffect`](/react-native-glossary/useeffect) and remove in the cleanup.
- **Duplicate listeners.** Subscribing on every render, or in an effect with unstable dependencies, stacks handlers so one event runs your code several times.
- **Emitting with nobody listening.** Events sent before JavaScript subscribes, for example during start-up, are simply dropped. Native code should buffer them, or JavaScript should ask for the current state once it subscribes.
- **Flooding the JavaScript thread.** Emitting sensor data at 100 Hz means 100 callbacks a second competing with rendering. Throttle on the native side.

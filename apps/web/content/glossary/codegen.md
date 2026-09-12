---
title: 'Codegen'
summary: 'Codegen generates the native C++, Java and Objective-C binding code for TurboModules and Fabric components from TypeScript spec files, at build time.'
aliases:
  - 'Code generation'
related:
  - 'TurboModules'
  - 'Fabric Renderer'
  - 'Legacy vs New Architecture'
  - 'Native Module'
updated: 2026-09-12
---

Codegen is the build-time tool that turns a TypeScript interface into the native glue code both sides need. You describe a module or component once; Codegen emits the C++, Java, and Objective-C scaffolding.

A spec file looks like ordinary TypeScript:

```ts
// NativeDeviceInfo.ts
import type { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
  getBatteryLevel(): number;
}
```

From that, Codegen produces the interfaces a [TurboModule](/react-native-glossary/turbomodules) or [Fabric](/react-native-glossary/fabric-renderer) component must implement.

The point is catching mismatches early. Under the legacy architecture, bindings were hand-written on both sides and a renamed method or a changed argument type surfaced as an undefined-is-not-a-function crash on device. With Codegen the compiler rejects it.

Codegen runs automatically during a native build, so app developers rarely invoke it directly — but it explains why adding a New Architecture library requires a native rebuild rather than a JavaScript reload.

---
title: 'Static Hermes'
summary: 'Static Hermes is Meta’s next-generation Hermes compiler. It can use type annotations to compile JavaScript ahead of time to native code, and underpins Hermes V1.'
aliases:
  - 'Hermes V1'
related:
  - 'Hermes'
  - 'Hermes Bytecode'
  - 'JavaScript Runtime'
  - 'TypeScript'
  - 'Startup Time'
updated: 2026-11-13
---

Static Hermes is the project Meta’s Hermes team has been building to take the [Hermes](/react-native-glossary/hermes) engine beyond interpreting bytecode. Its headline idea: when code carries sound type information, the compiler can skip the dynamic checks JavaScript normally needs and emit native machine code ahead of time, reaching speeds closer to C than to a typical interpreter.

It changes the trade-off Hermes made originally. Classic Hermes compiles your bundle to [bytecode](/react-native-glossary/hermes-bytecode) for fast start-up but has no JIT, so CPU-heavy JavaScript runs slower than in a browser engine. Static Hermes aims to keep the fast start-up and add ahead-of-time speed for the code that needs it, without shipping a JIT.

"Hermes V1" is the name used for the new generation of the engine that grew out of this work, with a rebuilt compiler and virtual machine that are faster even on untyped code. React Native has started offering it as an opt-in, and it is on the path to becoming the default engine.

Before getting excited:

- **Types must be sound, not just present.** [TypeScript](/react-native-glossary/typescript) types are erased and allow escape hatches such as `any` and unchecked casts, so the compiler cannot trust them blindly. The native-compilation mode relies on a stricter, checked subset; ordinary TypeScript does not automatically become native code.
- **Typed native compilation is still experimental.** The speed-ups you can count on today come from the improved engine running your existing bundle, not from rewriting code with stricter types.
- **Your code does not change.** It remains standard JavaScript, so adopting the new engine is a build setting plus testing, not a migration.

Static Hermes is not a separate language or runtime to choose; it is the evolution of the engine React Native already ships. Watch the React Native release notes for when the new engine becomes the default,, and benchmark your own start-up and hot paths rather than trusting headline numbers.

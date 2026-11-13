---
title: 'Spring Animation'
summary: 'A spring animation moves a value using simulated spring physics instead of a fixed duration and curve, so motion feels natural and can carry velocity from a gesture.'
aliases:
  - 'withSpring'
  - 'Spring physics'
related:
  - 'Reanimated'
  - 'Shared Value'
  - 'Gesture Handler'
  - 'Native Driver'
updated: 2026-11-13
---

A spring animation drives a value towards its target as if it were attached by a spring: it accelerates, may overshoot, and settles. In React Native you meet it as `withSpring` in [Reanimated](/react-native-glossary/reanimated) and `Animated.spring` in the built-in Animated API. Most native iOS and Android motion is spring-based, which is why springs make a React Native app feel native.

Instead of a duration and an easing curve, a physical spring is described by three parameters:

- **Stiffness:** how strongly it pulls towards the target. Higher is snappier.
- **Damping:** how quickly oscillation dies out. Low damping bounces; high damping settles without overshoot.
- **Mass:** how heavy the moving object feels. Higher is slower and more momentous.

Reanimated also accepts a duration plus a damping ratio, which is easier to reason about when matching a design spec.

The feature that makes springs essential is velocity. A spring can start already moving, so when a user flings a card, the release velocity from [Gesture Handler](/react-native-glossary/gesture-handler) becomes the starting speed of the spring:

```tsx
const pan = Gesture.Pan().onEnd((e) => {
  offset.value = withSpring(0, { velocity: e.velocityX });
});
```

The card continues the user’s motion instead of stopping dead and restarting, and if it is grabbed again mid-flight, a new spring takes over smoothly from the current position and speed. Timing animations cannot do this.

Gotchas to know:

- **There is no fixed duration.** A physical spring ends when its motion becomes negligible, so do not chain the next step with a `setTimeout`. Use the completion callback.
- **Defaults differ between libraries and versions.** `withSpring` and `Animated.spring` feel different out of the box, and Reanimated has changed its defaults between major versions, so set parameters explicitly when the feel matters.
- **Overshoot can go out of bounds.** A bouncy spring on `opacity` or a scale can briefly exceed its target; clamp it or increase damping for those properties.

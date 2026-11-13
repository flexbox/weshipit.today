---
title: 'Storybook'
summary: 'Storybook is a workshop for developing UI components in isolation. React Native Storybook renders stories on a device, so each component state can be viewed alone.'
aliases:
  - 'React Native Storybook'
related:
  - 'Design Tokens'
  - 'Snapshot Testing'
  - 'Unit Testing'
  - 'React Native Web'
updated: 2026-11-13
---

Storybook is a tool for building and reviewing UI components outside the screens that use them. Each component gets one or more **stories**: small, named examples of the component in a specific state, such as a button that is loading, disabled or showing a very long label.

React Native Storybook, the `@storybook/react-native` package, renders those stories inside your app on a simulator, emulator or phone. You switch from the real app to a Storybook UI, pick a story, and adjust its props live with controls. Because it runs natively, you see real fonts, shadows, [safe areas](/react-native-glossary/safe-area) and platform differences, which a browser cannot show you faithfully.

Stories use the Component Story Format shared with web Storybook:

```tsx
import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from './Button';

const meta: Meta<typeof Button> = { component: Button };
export default meta;

export const Disabled: StoryObj<typeof Button> = { args: { title: 'Pay', disabled: true } };
```

Why teams use it:

- Build a component without navigating five screens deep or faking backend data to reach the right state.
- Give designers and reviewers a catalogue of every component and variant, which keeps a design system built on [design tokens](/react-native-glossary/design-tokens) honest.
- Reuse stories as test fixtures, so tests render the same states you review visually.

Teams can also render stories in a browser through [React Native Web](/react-native-glossary/react-native-web) for easier sharing, at the cost of not seeing true native rendering.

The usual gotcha is shipping Storybook to users. It must be switched on by an environment variable or a development-only entry point, and excluded from production builds, or it adds weight and exposes internal screens. The other is stories that silently rot: components that need providers such as a theme or navigation must be wrapped with decorators, or the stories break the moment those dependencies change.

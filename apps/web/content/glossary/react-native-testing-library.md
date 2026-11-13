---
title: 'React Native Testing Library'
summary: 'React Native Testing Library (RNTL) renders components in Jest and queries them by text, role or label, so tests check what users see rather than internal state.'
aliases:
  - 'RNTL'
  - '@testing-library/react-native'
related:
  - 'Jest'
  - 'Unit Testing'
  - 'Accessibility Role'
  - 'Mocking'
updated: 2026-11-13
---

React Native Testing Library, published as `@testing-library/react-native` and often shortened to RNTL, is a library for testing React Native components inside [Jest](/react-native-glossary/jest). It renders a component, lets you find elements the way a user would, and lets you fire events like presses and typing.

Its guiding principle comes from the wider Testing Library family: the more your tests resemble the way your software is used, the more confidence they give. So instead of reaching into component state or props, you query what is on screen:

```tsx
import { render, screen, fireEvent } from '@testing-library/react-native';

test('shows a greeting after sign in', () => {
  render(<SignIn />);
  fireEvent.changeText(screen.getByLabelText('Email'), 'ada@example.com');
  fireEvent.press(screen.getByRole('button', { name: 'Sign in' }));
  expect(screen.getByText('Welcome, Ada')).toBeOnTheScreen();
});
```

Prefer queries in roughly this order: by role, by label, by text, and only then by `testID`. Querying by [role](/react-native-glossary/accessibility-role) and label has a useful side effect: if a test cannot find your button by its role, a screen reader probably cannot either.

Common gotchas:

- **`getBy` versus `findBy`.** `getBy*` looks synchronously; `findBy*` waits, and is what you need after a fetch or any async state update.
- **Act warnings.** Updates that happen after the test finishes trigger warnings about `act`. Await the UI change you expect instead of ignoring them.
- **It is not a device.** RNTL renders in Node.js, so layout, styles and native behaviour are not real. It verifies behaviour and content, not appearance.

RNTL is maintained by Callstack and has become the standard way to write component tests in React Native.

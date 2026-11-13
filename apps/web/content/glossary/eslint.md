---
title: 'ESLint'
summary: 'ESLint is the JavaScript linter React Native projects use to catch bugs and enforce conventions, most importantly the Rules of Hooks and effect dependencies.'
aliases:
  - 'Linting'
  - 'Linter'
related:
  - 'TypeScript'
  - 'Hooks'
  - 'useEffect'
  - 'React Compiler'
  - 'CI/CD'
updated: 2026-11-13
---

ESLint is a static analysis tool that reads your JavaScript and TypeScript and reports patterns that are likely bugs or break team conventions. React Native projects use it to catch problems that type checking cannot see, such as a hook called inside a condition.

Both main toolchains ship a ready-made config. Projects on the React Native CLI get `@react-native/eslint-config`, and Expo projects can run `npx expo lint`, which sets up `eslint-config-expo` on first use. Current ESLint versions use a flat `eslint.config.js` file rather than the older `.eslintrc`.

The rules that earn their place in a React Native codebase come from `eslint-plugin-react-hooks`:

- **rules-of-hooks** stops [hooks](/react-native-glossary/hooks) being called conditionally or in loops, which otherwise causes state to land in the wrong place.
- **exhaustive-deps** checks that every value used inside [useEffect](/react-native-glossary/useeffect), `useMemo` and `useCallback` is listed as a dependency.
- Rules from the [React Compiler](/react-native-glossary/react-compiler) team flag code the compiler cannot safely optimise, such as mutating props.

The most common mistake is silencing exhaustive-deps with `// eslint-disable-next-line` whenever it complains. The warning usually points at a real stale-closure bug: an effect reading an old value of state, or a listener that never re-subscribes. Restructure the effect instead.

Other practical points:

- Let a formatter such as Prettier handle formatting and keep ESLint for correctness, so the two do not fight over the same lines.
- Lint in CI and fail the build on errors. Warnings that nobody is forced to fix tend to grow into hundreds.
- ESLint does not replace `tsc`. Type-aware rules exist, but they do not type-check the project.

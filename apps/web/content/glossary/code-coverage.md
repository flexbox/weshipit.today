---
title: 'Code Coverage'
summary: 'Code coverage measures which lines, branches and functions of a React Native app run during tests. It finds untested code but does not prove it is correct.'
aliases:
  - 'Test coverage'
related:
  - 'Jest'
  - 'Unit Testing'
  - 'CI/CD'
  - 'End-to-End Testing'
updated: 2026-11-13
---

Code coverage is a metric that reports how much of your source code was executed while your test suite ran. In React Native projects it comes from [Jest](/react-native-glossary/jest): run `jest --coverage` and you get a table per file plus an HTML report that highlights every line that never ran.

Jest reports four numbers:

- **Statements** and **lines**: how much of the code executed.
- **Functions**: how many functions were called at least once.
- **Branches**: whether both sides of every `if`, ternary and `&&` were taken. This is usually the most revealing figure, because error paths and edge cases live in branches.

You can make the build fail below a threshold, which is common in [CI/CD](/react-native-glossary/ci-cd) pipelines:

```json
{
  "jest": {
    "coverageThreshold": { "global": { "branches": 70, "lines": 80 } }
  }
}
```

Know what the number leaves out. Jest coverage only measures JavaScript and TypeScript run by Jest. Swift, Kotlin, native module code and anything exercised only by [end-to-end tests](/react-native-glossary/end-to-end-testing) count as zero, so the figure describes your JavaScript unit test suite, not how well tested the app is.

The main misconception is that high coverage means good tests. Coverage records that a line ran, not that anything checked its result. A test that renders a screen without a single assertion can mark hundreds of lines as covered. Teams chasing a 100% target often end up with exactly those tests, plus brittle tests of trivial code.

Use coverage as a map, not a score. Look at the report for important logic, such as payment or authentication, that has no tests at all, and leave generated files, configuration and simple presentational components out of the calculation.

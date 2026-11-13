---
title: 'EAS Workflows'
summary: 'EAS Workflows is Expo’s CI/CD service: YAML files in .eas/workflows chain builds, submissions, OTA updates and tests on Expo’s infrastructure when your repo changes.'
aliases:
  - 'EAS CI/CD'
related:
  - 'CI/CD'
  - 'EAS Build'
  - 'EAS Update'
  - 'EAS Submit'
  - 'Maestro'
updated: 2026-11-13
---

EAS Workflows is a [CI/CD](/react-native-glossary/ci-cd) service built specifically for React Native release pipelines. You describe jobs in YAML files under `.eas/workflows/`, connect your GitHub repository in the Expo dashboard, and the workflow runs on Expo’s machines when you push, open a pull request, or trigger it with `eas workflow:run`.

Where a generic CI provider makes you script the Expo CLI yourself, EAS Workflows has pre-packaged job types that already know about your project:

- **`build`**, **`submit`** and **`update`** wrap [EAS Build](/react-native-glossary/eas-build), [EAS Submit](/react-native-glossary/eas-submit) and EAS Update, using the profiles in `eas.json`.
- **`fingerprint`** hashes the native side of the project.
- **`maestro`** runs [Maestro](/react-native-glossary/maestro) end-to-end tests against a build.

Jobs declare `needs` to run in order and can read outputs from earlier jobs, such as passing a build id from the build job to the submit job.

The pattern that makes it worth adopting is the fingerprint branch. A workflow computes the project fingerprint, looks for an existing build with that fingerprint, and then takes one of two paths: if native code is unchanged it publishes an over-the-air update in a minute or two; if native code changed it starts a new store build. That turns “do I need a new binary for this change?” from a judgement call into an automatic decision.

The common misconception is that it replaces your test CI. EAS Workflows is strongest at the build-and-release end; many teams keep linting and unit tests on GitHub Actions and hand off to EAS Workflows for anything that produces a binary or an update. Builds triggered from a workflow also count against your EAS plan like any other build.

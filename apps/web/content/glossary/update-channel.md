---
title: 'Update Channel'
summary: 'An update channel is a name baked into an Expo build that decides which branch of OTA updates it receives, so you can retarget installed apps without rebuilding.'
aliases:
  - 'Channel'
  - 'Branch'
related:
  - 'EAS Update'
  - 'Runtime Version'
  - 'Staged Rollout'
  - 'EAS Build'
updated: 2026-11-13
---

An update channel is the label a binary uses to ask for updates. In [EAS Update](/react-native-glossary/eas-update) every build is given a channel at build time, usually from the `channel` field of its profile in `eas.json`, and it keeps that channel for its whole life.

Channels sit on top of a second concept, the **branch**. The two are easy to confuse:

- A **branch** is an ordered list of published updates, like a git branch of bundles. `eas update --branch staging` adds to it.
- A **channel** is a pointer from builds to a branch. `production` builds ask the `production` channel, which by default points at a branch with the same name.

That indirection is the whole point. Because builds are tied to the channel and not the branch, you can repoint the channel without touching any installed app:

```bash
eas channel:edit production --branch release-2.4
```

This is how you promote a tested set of updates from staging to production in one step, or roll back by pointing production at the previous branch. A channel can also split traffic between two branches for a percentage rollout.

The mistake people make is publishing to a branch that no channel points at, then wondering why nobody received the update. The command succeeds, the update exists, and no device ever asks for it. The second is assuming a channel can be fixed after the fact: it is compiled into the binary, so unless the app contains code to override it at runtime, a build made with the wrong profile needs a rebuild. Remember that the [runtime version](/react-native-glossary/runtime-version) must also match; the channel decides where a device looks, the runtime version decides what it may install.

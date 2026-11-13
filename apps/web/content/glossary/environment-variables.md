---
title: 'Environment Variables'
summary: 'In React Native, environment variables are build-time values, such as an API URL, inlined into the JavaScript bundle; they configure an app but never keep a secret.'
aliases:
  - '.env'
  - 'EXPO_PUBLIC_'
  - 'react-native-config'
related:
  - 'API Keys in Mobile Apps'
  - 'App Config'
  - 'Babel'
  - 'EAS Build'
updated: 2026-11-13
---

Environment variables in React Native are configuration values, such as an API base URL, a feature flag or an analytics key, that differ between development, staging and production builds. Unlike on a server, they are read once at build time and written into the app.

That is the single most important fact about them: the device has no environment to read from at runtime. Whatever value you use ends up as plain text inside the JavaScript bundle or the native binary.

In Expo projects, variables prefixed with `EXPO_PUBLIC_` in a `.env` file are inlined into your code when Metro bundles it:

```bash
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
```

```ts
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

Projects without Expo often use `react-native-config`, which also exposes values to native code, or a [Babel](/react-native-glossary/babel) plugin that does similar inlining. Expo projects can also pass values to native configuration through dynamic [app config](/react-native-glossary/app-config).

Common gotchas:

- **They are not secrets.** Anyone can unzip an app and read them. Private keys belong on a server; see [API keys in mobile apps](/react-native-glossary/api-keys).
- **Access must be static.** Inlining finds `process.env.EXPO_PUBLIC_API_URL` written out in full. Destructuring `process.env` or building the name dynamically returns `undefined`.
- **Changes need a restart.** Editing `.env` while Metro runs may not take effect until you restart it, sometimes with the cache cleared.
- **Cloud builds do not see your local file** if it is not committed. For [EAS Build](/react-native-glossary/eas-build), define the values as EAS environment variables for each environment.
- **An over-the-air update can change JavaScript values** because they live in the bundle, while values baked into native code need a new build.

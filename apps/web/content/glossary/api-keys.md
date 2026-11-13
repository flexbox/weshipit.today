---
title: 'API Keys in Mobile Apps'
summary: 'Any API key embedded in a React Native app ships to every user and can be extracted. Only public, restricted keys belong in the app; true secrets stay on a server.'
aliases:
  - 'Secrets'
  - 'Embedded secrets'
related:
  - 'Environment Variables'
  - 'Code Obfuscation'
  - 'Secure Storage'
  - 'OWASP MASVS'
updated: 2026-11-13
---

An API key in a mobile app is a credential compiled into the app so it can call a third-party service: maps, analytics, payments, an AI model. The core rule for React Native is simple and widely misunderstood: **anything shipped in the app is public**.

Your JavaScript bundle sits inside every `.ipa` and `.apk`, and it can be unpacked and searched for strings, even when compiled to Hermes bytecode. [Environment variables](/react-native-glossary/environment-variables) do not change this. Variables prefixed with `EXPO_PUBLIC_`, or values read through libraries like `react-native-config`, are inlined into the build at compile time; a `.env` file keeps a value out of git, not out of the app.

Keys fall into two groups:

- **Publishable keys** are designed to be public: a Stripe publishable key, a Firebase web config, a Supabase anon key protected by row-level security. Shipping them is fine.
- **Secret keys** grant real power or cost money: a Stripe secret key, an OpenAI or Anthropic API key, an admin token. They must never be in the app.

For secrets, put a backend in between. The app calls your server or a serverless function, which authenticates the user, applies rate limits and calls the third-party API with the secret.

For publishable keys, use the provider's restrictions: limit a Google Maps key to your bundle identifier and Android signing certificate, and set quotas so abuse is capped.

The common mistake is reaching for [obfuscation](/react-native-glossary/code-obfuscation) or [secure storage](/react-native-glossary/secure-storage) to hide a secret. Obfuscation only delays extraction, and the Keychain and Keystore protect data your app receives at runtime, such as a user's session token, not a value baked into the package. If a secret key has already shipped, rotate it.

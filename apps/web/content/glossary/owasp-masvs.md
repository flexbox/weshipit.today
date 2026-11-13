---
title: 'OWASP MASVS'
summary: 'OWASP MASVS is the open Mobile Application Security Verification Standard, a checklist of security requirements used to audit iOS, Android and React Native apps.'
aliases:
  - 'MASVS'
  - 'Mobile security standard'
related:
  - 'SSL Pinning'
  - 'Secure Storage'
  - 'API Keys in Mobile Apps'
  - 'Jailbreak and Root Detection'
  - 'Code Obfuscation'
updated: 2026-11-13
---

OWASP MASVS, the Mobile Application Security Verification Standard, is an open standard from the OWASP Mobile Application Security project that defines what a secure mobile app should do. It is the most common reference for mobile security audits, penetration tests and security questionnaires from enterprise customers.

MASVS describes requirements, not tools. Its controls are grouped into areas that map directly onto a React Native app:

- **MASVS-STORAGE:** sensitive data stored securely, for example tokens in the Keychain or Keystore through [secure storage](/react-native-glossary/secure-storage), not in AsyncStorage.
- **MASVS-CRYPTO:** cryptography used correctly.
- **MASVS-AUTH:** authentication and session handling.
- **MASVS-NETWORK:** secure communication, including when to use [SSL pinning](/react-native-glossary/ssl-pinning).
- **MASVS-PLATFORM:** safe use of platform features such as deep links, WebViews and inter-app communication.
- **MASVS-CODE:** up-to-date dependencies, input validation and secure updates.
- **MASVS-RESILIENCE:** resistance to reverse engineering and tampering.
- **MASVS-PRIVACY:** data minimisation and user control.

Its companion, the Mobile Application Security Testing Guide (MASTG), explains how to test each control on iOS and Android.

For React Native developers, a useful way to read MASVS is as a map of where the framework does not protect you by default. React Native does not encrypt storage, pin certificates or keep [API keys](/react-native-glossary/api-keys) secret; those are your decisions. JavaScript dependencies also fall under MASVS-CODE, so a vulnerable npm package is an audit finding like any native one.

The common misconception is that every app should meet every control. Resilience controls such as obfuscation and tamper detection add cost and matter mainly for apps handling money, health data or valuable content. Choose the controls that fit your risk profile. If you need an outside review against the standard, see our [React Native security audit](/react-native-security-audit).

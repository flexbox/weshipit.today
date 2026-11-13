---
title: 'Jailbreak and Root Detection'
summary: 'Jailbreak and root detection lets a React Native app check whether it runs on a modified iOS or Android device, where its security protections can be bypassed.'
aliases:
  - 'Jailbreak detection'
  - 'Root detection'
related:
  - 'SSL Pinning'
  - 'OWASP MASVS'
  - 'Secure Storage'
  - 'Code Obfuscation'
updated: 2026-11-13
---

Jailbreak and root detection is a set of runtime checks that try to tell whether the device has been modified to give the user, or malware, full system access. A jailbroken iPhone or rooted Android phone lifts the sandbox your app relies on: other code can read your app's files, hook its functions and change its behaviour while it runs.

Apps that handle money, health data or paid content use detection to reduce risk, typically by warning the user, disabling sensitive features or reporting the device to the backend. Classic local checks look for traces of modification: files and apps that only exist on modified devices, writable system paths, or a debugger attached. Community React Native libraries bundle these checks behind a simple JavaScript call.

The essential gotcha is that **local checks can always be bypassed**. The user controls the device, so tools such as Frida or root-hiding modules can make any check return "clean". A boolean computed on the phone and then trusted by your app is easy to defeat.

The stronger approach is attestation, where the platform vouches for the device and your server verifies it:

- **Android:** the Play Integrity API, which replaced SafetyNet Attestation.
- **iOS:** App Attest from the DeviceCheck framework.

The app requests a signed token and sends it to your backend, which validates it before granting access. Because the decision is made on the server, tampering with the app alone is not enough.

Also weigh the cost. Blocking every rooted device locks out legitimate users such as developers and enthusiasts, and false positives generate support tickets. Match the response to the risk, and combine detection with [secure storage](/react-native-glossary/secure-storage), [SSL pinning](/react-native-glossary/ssl-pinning) and server-side validation.

---
title: 'SSL Pinning'
summary: 'SSL pinning makes a React Native app trust only specific certificates or public keys for its API, blocking interception even by certificates the device trusts.'
aliases:
  - 'Certificate pinning'
  - 'TLS pinning'
related:
  - 'OWASP MASVS'
  - 'Fetch API'
  - 'Info.plist'
  - 'Jailbreak and Root Detection'
updated: 2026-11-13
---

SSL pinning, more accurately TLS or certificate pinning, means your app only accepts a connection to your server if the server presents a certificate or public key you embedded in the app. A certificate that is merely valid in the eyes of the operating system is not enough.

Normal HTTPS already encrypts traffic, so why pin? Because the device decides which certificate authorities to trust, and that list can be changed. An attacker, a corporate proxy or a researcher with a tool such as mitmproxy can install their own root certificate, then read and modify your app's API traffic. Pinning makes that interception fail.

In practice, pin the **public key hash** (SPKI) rather than the whole certificate, because a renewed certificate can keep the same key. Both platforms support it natively:

- **Android:** a `<pin-set>` in the Network Security Config XML.
- **iOS:** `NSPinnedDomains` under App Transport Security in [Info.plist](/react-native-glossary/info-plist).

Community libraries wrap these so the [Fetch API](/react-native-glossary/fetch-api) and libraries built on it are covered from JavaScript.

The dangerous gotcha is bricking your own app. If the server's key changes and the app only knows the old pin, every request fails for every user on that version, and an over-the-air update cannot help if the pins live in native configuration. Always include at least one backup pin for a key you hold in reserve, and coordinate certificate rotation with app releases.

Also be realistic about what pinning achieves. It protects users on hostile networks and slows down people reverse engineering your API, but on a [rooted or jailbroken device](/react-native-glossary/jailbreak-root-detection) tools like Frida can disable it. It is one layer of defence, not a reason to trust the client.

---
title: Feature specification
description: What the app does, offline and online.
sidebar:
  order: 2
---

| Feature | Description | Offline | Online |
|---|---|:--:|:--:|
| **Local Chat** (default) | Fast single-model answer | ✅ | ✅ |
| **Council / Review Mode** | Deliberate deep mode: Solve → Skeptic → Synthesis with [trace](/council/the-trace/) | ✅ (role/multi) | ✅ (frontier) |
| **Council Trace** | All opinions + peer ranking + marked dissent | ✅ | ✅ |
| **Voice (STT)** | Push-to-talk, on-device | ✅ | ✅ |
| **Vision (VLM)** | Read images/documents locally | ✅ | ✅ |
| **Phone Access** | 2nd screen on the LAN, TLS + one-time token | ✅ | ✅ |
| **Chat History** | Threads, all in the [vault](/security/threat-model/) | ✅ | ✅ |
| **Import/Export** | Chats/prompts/captures, AES | ✅ | ✅ |
| **BYO API Keys** | Passphrase-encrypted | - | ✅ |
| **Privacy-Diff** | Shows content/providers/cost before upload | - | ✅ |
| **Offline Playbooks** | code review, incident response, field notes, document triage | ✅ | ✅ |

Chat is the default; the [Council](/council/overview/) is the deliberate review
mode. Online features are gated by the
[privacy guard](/architecture/routing-and-privacy/).

> These are the **target** capabilities. What ships when is in the
> [roadmap](/project/roadmap/): voice, vision and phone access land in v0.5,
> and wireless distribution in v0.6.

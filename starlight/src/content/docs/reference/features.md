---
title: Feature specification
description: What the app does, offline and online.
sidebar:
  order: 2
---

This page lists the target app capabilities. Current status lives in
[welcome](/start-here/welcome/), and sequencing lives in the [roadmap](/project/roadmap/).

| Feature | Description | Offline | Online |
|---|---|:--:|:--:|
| **Local Chat** (default) | Fast single-model answer | ✅ | ✅ |
| **Council / Review Mode** | Deliberate deep mode: Solve → Skeptic → Chairman with [trace](/council/the-trace/) | ✅ (local role council / local multi-model council) | ✅ (online frontier council) |
| **Council Trace** | All opinions + peer ranking + marked dissent | ✅ | ✅ |
| **Voice (STT)** | Push-to-talk, on-device | ✅ | ✅ |
| **Vision (VLM)** | Read images/documents locally | ✅ | ✅ |
| **Phone Access** | 2nd screen on the LAN, TLS + one-time token; the compute-sharing [relay](/architecture/explorations/) (planned hub mode) puts one `/v1` endpoint behind that token | ✅ | ✅ |
| **Chat History** | Threads, all in the [vault](/security/threat-model/) | ✅ | ✅ |
| **Import/Export** | Chats/prompts/captures, AES | ✅ | ✅ |
| **BYO API Keys** | Passphrase-encrypted | - | ✅ |
| **Privacy-Diff** | Shows content/providers/cost before upload | - | ✅ |
| **Offline Playbooks** | code review, incident response, field notes, document triage | ✅ | ✅ |

Chat is the default; the [Council](/council/overview/) is the deliberate review
mode. Online features are gated by the
[privacy guard](/architecture/routing-and-privacy/).

> These target capabilities are not shipped yet; see [welcome](/start-here/welcome/)
> and the [roadmap](/project/roadmap/).

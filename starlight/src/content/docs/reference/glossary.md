---
title: Glossary
description: One precise name per concept — the council taxonomy and key terms. When docs drift, this page wins.
sidebar:
  order: 8
---

The docs use **distinct names** for distinct things. If two pages disagree, this
page is canonical.

## Council modes

| Term | Means |
|---|---|
| **Council** | The 3-stage deliberation — *First Opinions → Peer Review → Chairman*. A deliberate review mode, not the default chat. |
| **Local role council** | **One** on-device model prompted in sequential roles (*solver · skeptic · security · summarizer*). The default offline mode. |
| **Local multi-model council** | **Several** distinct on-device model families, run on the [Lab tier](/hardware/tiers/). |
| **Online frontier council** | Frontier models via BYO keys — **opt-in only**, gated by the Privacy-Diff. |
| **Chairman** | The seat that synthesizes the final verdict from the others. |
| **Seat** | A configurable slot in the council — a role (local) or a model (online/Lab). |
| **Trace** | The auditable record of a deliberation: every opinion + the peer ranking + the marked dissent + the verdict. |

## Privacy & data

| Term | Means |
|---|---|
| **Privacy-Diff** | The pre-send screen shown before any online escalation: *contents · providers · estimated cost · store-local*. Always hyphenated + capitalized. |
| **Minimal-trace** | No persistent user data on the host; unavoidable OS artifacts are documented, not denied. Honest, not "zero". |
| **Air-gapped** | No network connection at all. Note: the planned [local wireless distribution](/project/roadmap/) is **internet-off LAN networking, not air-gapped**. |
| **Vault** | The on-stick Argon2id + AES-256 store for keys, chats, and traces. |

## Hardware tiers

**Pocket · Field · Lab** — the three hardware tiers. [hardware/tiers](/hardware/tiers/)
is the **single source of truth** for their RAM / USB / model specs; other pages
link there rather than restating numbers.

## Casing

Lowercase mono for UI labels, code, kickers and seat names (`solver`,
`council trace`, `offline`). Sentence case for human-facing prose and headlines.

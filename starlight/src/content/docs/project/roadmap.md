---
title: Roadmap
description: MVP first; multimodal deliberately late.
sidebar:
  order: 1
---

Sharpened scope — a small working core activates contributors before breadth.

| Phase | Content | Rationale |
|---|---|---|
| **v0.1 — Core** | Portable `llama-server` + Local Chat + browser-only UI + `preflight-check` (FS/speed/RAM/GPU) + minimal-trace smoke test | A small working core activates contributors |
| **v0.2 — Council** | [Role council](/council/local-council/) + [trace UI](/council/the-trace/) + demo prompts + [bias guard](/council/bias-and-confidence/) | The wow moment, runnable on weak hardware |
| **v0.3 — Online** | OpenRouter escalation + [privacy-diff](/architecture/routing-and-privacy/) + cost cap + BYO keys (vault) | Premium depth on network, privacy consistent |
| **v0.4 — Evals** | [`evals/`](/evals/overview/) Council-vs-Single + multi-model Lab tier | Proof of the core claim |
| **v0.5 — Multimodal** | Voice (whisper.cpp) + Vision (VLM) + Phone Access (TLS) | Only after the Council wow is proven |
| **v0.6 — Local Distribution** | Optional Wi-Fi "hub mode": a powered stick (e.g. on a power bank) serves signed model-packs, tools, and a local council API to paired nearby devices over high-speed Wi-Fi | Field teams without per-device installs — **internet-off LAN, not air-gapped** |
| **v1.0** | Signed releases, update/rollback, landing page live, hardware matrix/CI | A dependable spec |

> **VLM note:** multimodal support in llama.cpp is version-fragile — "just load a
> VLM GGUF" underestimates the work; hence deliberately late.

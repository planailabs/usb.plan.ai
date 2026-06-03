---
title: Hardware tiers
description: Pocket, Field, Lab — with honest minimums and what each one feels like.
sidebar:
  order: 1
---

Three tiers, each with an honest user expectation. The `preflight-check` measures
your hardware and recommends one; see [performance](/hardware/performance/).

| Tier | Experience | Models | USB | RAM | Engine note |
|---|---|---|---|---|---|
| **Pocket** | "runs almost anywhere, quick help" | 1× 4-8B + [role council](/council/local-council/) + Whisper-base | 16-32 GB | 8-12 GB | CPU ok |
| **Field** | "documents, notes, stable offline" | 8B + Vision + Whisper | 32 GB | 12-16 GB | GPU recommended |
| **Lab** | "real multi-model council, deep" | 32B reasoning + 32B agent + 8B + Vision | 64-128 GB **NVMe-SSD** | **48-64 GB** | **GPU required** |

> **Correction (council consensus):** the v0.1 "Council" preset claimed 24-32 GB
> RAM. That was unrealistic for two resident 32B models (~40 GB of weights alone,
> plus KV-cache). **Correct Lab tier: 48-64 GB RAM + GPU + NVMe USB-SSD.**

On anything below the Lab tier, use the [role council](/council/local-council/)
rather than the multi-model council.

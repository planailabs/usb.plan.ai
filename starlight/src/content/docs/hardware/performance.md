---
title: Performance reality
description: The three hard physical constraints — USB speed, RAM, GPU — and what preflight checks.
sidebar:
  order: 2
---

The honest section. Three physical constraints shape everything.

| Constraint | Reality | Consequence |
|---|---|---|
| **USB read speed** | Normal USB-3.0 sticks: ~100-250 MB/s. At ~200 MB/s, a 20 GB GGUF is ~100 s of pure read; slower sticks are ~2 min before the first token. A good NVMe USB-SSD is ~20-30 s. | Cheap promo sticks are discouraged; drive and tier minimums live in [hardware tiers](/hardware/tiers/) and [procurement](/reference/hardware-procurement/). |
| **RAM with local multi-model council** | RAM determines whether a local multi-model council can stay resident. With less, the engine loads serially and unloads idle models → reload latency from the slow USB bus. | `preflight-check` chooses local role council vs local multi-model council; tier minimums live in [hardware tiers](/hardware/tiers/). |
| **GPU** | Pure CPU inference of a 32B model is painfully slow. | GPU strategy: **Metal (Mac), CUDA/ROCm/Vulkan (Win/Linux), CPU fallback**; VRAM detection in `preflight-check`. |

## preflight-check

`preflight-check.*` must measure and report honestly:

- **Filesystem:** detect format and explain failures; see [directory structure](/reference/directory-structure/).
- **USB read speed:** warn if a slow stick can't sustain the chosen tier.
- **RAM:** pick local role council vs local multi-model council accordingly.
- **GPU / VRAM:** select the right acceleration backend.

It then recommends the matching [tier](/hardware/tiers/).

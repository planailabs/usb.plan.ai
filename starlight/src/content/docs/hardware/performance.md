---
title: Performance reality
description: The three hard physical constraints — USB speed, RAM, GPU — and what preflight checks.
sidebar:
  order: 2
---

The honest section. Three physical constraints shape everything.

| Constraint | Reality | Consequence |
|---|---|---|
| **USB read speed** | Normal USB-3.0 sticks: ~100-250 MB/s. A 20 GB model = **~2 min of pure loading** before the first token. | **NVMe USB-SSD (USB 3.2 Gen 2, e.g. Samsung T7) required** for the [Lab tier](/hardware/tiers/); cheap promo sticks explicitly discouraged. |
| **RAM with multi-model** | 2× 32B resident ≈ 48-64 GB. With less, the engine loads **serially** and unloads idle models → reload latency from the slow USB bus. | Lab tier needs 48-64 GB; otherwise use the [role council](/council/local-council/). |
| **GPU** | Pure CPU inference of a 32B model is painfully slow. | GPU strategy: **Metal (Mac), CUDA/ROCm/Vulkan (Win/Linux), CPU fallback**; VRAM detection in `preflight-check`. |

## preflight-check

`preflight-check.*` must measure and report honestly:

- **Filesystem:** FAT32 → abort (and explain why); see [directory structure](/reference/directory-structure/).
- **USB read speed:** warn if a slow stick can't sustain the chosen tier.
- **RAM:** pick role vs multi-model council accordingly.
- **GPU / VRAM:** select the right acceleration backend.

It then recommends the matching [tier](/hardware/tiers/).

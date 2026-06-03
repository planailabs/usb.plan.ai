---
title: Model licenses
description: Code license ≠ model-weights license. What may be redistributed on the stick.
sidebar:
  order: 2
---

> **Critical:** the repository is Apache-2.0, but **every model keeps its own
> weights license.** The `model-packs/` manifests carry a **license column** per
> model.

## Redistribution on the stick

| Model | Redistribution |
|---|---|
| DeepSeek-R1-Distill | **MIT** — unrestricted |
| Qwen3 (8B / 32B) | **Apache-2.0** — free; keep the copyright notice |
| **Gemma 4** | **⚠ Gemma Terms** — commercial use allowed, but **every redistribution must include the agreement/notice file** and mark modifications. **Therefore: not in the default bundle — opt-in download only, with the notice auto-attached.** |

## Policy

- **Default bundle: MIT/Apache models only** (DeepSeek-R1-Distill, Qwen3).
- Gemma & co.: optional, license-aware downloads via `model-packs/`, with the
  required notice file bundled automatically.

This keeps the shipped artifact cleanly redistributable. See the
[directory structure](/reference/directory-structure/) for where manifests and
SHA-256 sums live, and [seats](/models/seats/) for the model list.

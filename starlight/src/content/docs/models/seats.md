---
title: Council seats
description: Online frontier seats and local GGUF models — swappable, community-maintained.
sidebar:
  order: 1
---

Models are **swappable "seats"**, not "the smartest models." Defaults live in
`council.config.yaml`, are tracked in a dated `MODELS.md` + a machine-readable
registry, and concrete benchmark numbers are pulled live from leaderboards,
never frozen into the spec.

## Online seats (frontier, via BYO keys / OpenRouter)

State June 2026:

| Seat | Model | Provider |
|---|---|---|
| Reasoning | Claude Opus 4.8 | Anthropic |
| Allround | GPT-5.5 (Pro) | OpenAI |
| Multimodal / long-context | Gemini 3.1 Pro | Google |
| Cost / frontier | DeepSeek V4 *or* Qwen3.7 Max | DeepSeek / Alibaba |
| **Chairman** (default) | Gemini 3.1 Pro *or* Claude Opus 4.8 | Google / Anthropic |

> **Correction (Devil's Advocate):** **Grok 4.1 was dropped**. Grok 4.1 Fast is
> deprecated and shuts down August 2026. For a fourth "different perspective"
> seat, use another house (e.g. a current Mistral or Llama frontier model).

## Local models (GGUF): verified options

| Seat / role | Model (GGUF, quantized) | License | ~Size (Q4_K_M) |
|---|---|---|---|
| Reasoning | DeepSeek-R1-Distill-Qwen-32B | **MIT** ✅ | ~20 GB |
| Agent / tools | Qwen3-32B | **Apache-2.0** ✅ | ~20 GB |
| General (mid) | Qwen3-8B | Apache-2.0 ✅ | ~5 GB |
| Lightweight | Gemma 4 (E4B/4B class) | **Gemma Terms** ⚠ | ~3-5 GB |
| Vision (VLM) | Qwen-VL / Moondream (GGUF) | per model | ~3-8 GB |
| Voice (STT) | whisper.cpp large-v3-turbo / base | MIT ✅ | ~0.1-1.5 GB |

Which seats/roles are active is set in [`council.config.yaml`](/reference/configuration/);
redistribution rules differ per model. Read [licenses](/models/licenses/) before
bundling anything.

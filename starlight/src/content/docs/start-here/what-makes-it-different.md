---
title: What makes it different
description: Council instead of single model — and how it compares to PortableMind and techjarves.
sidebar:
  order: 2
---

Existing portable-AI sticks ship a single model offline. usb.plan.ai is not
another "portable Ollama setup." It is an **auditable decision and review
assistant**.

## Council, not single-shot

```
User question ──▶ Stage 1: First Opinions   (parallel)
              ──▶ Stage 2: Peer Review       (anonymized ranking)
              ──▶ Stage 3: Chairman          (reasoned synthesis + trace)
```

The structure follows [karpathy/llm-council](https://github.com/karpathy/llm-council):
parallel first opinions, anonymized peer review/ranking, chairman synthesis. This
version adds a **local role council** for weak hardware. See the
[Council overview](/council/overview/).

## Compared to the inspiration

| Aspect | PortableMind (commercial) | techjarves (OSS, DIY) | **usb.plan.ai** |
|---|---|---|---|
| License | Closed | MIT | Apache-2.0 (code) |
| Core | Single-model, offline | Single-model (AnythingLLM/Ollama) | **Auditable Council (roles → multi-model)** |
| Council mode | No | No | First Opinion → Peer Review → Chairman |
| Online mode | No | No | Optional frontier council, opt-in, privacy-diff |
| Engine | Proprietary | Ollama | **llama.cpp `llama-server`** (+ optional Ollama) |
| Voice / Vision | Yes | No | Yes, local (Whisper + VLM), from phase 5 |
| Encryption | AES-256 (opt.) | - | Passphrase vault (Argon2id + AES-256) |
| Platforms | Win, macOS | Win, Mac, Linux | Win, macOS, Linux (+ browser-only fallback) |
| Price | $49-$129 | Free | Free (OSS) |

## Three primary personas

| Persona | Job to be done |
|---|---|
| **Privacy Developer** | Review code, logs, architecture locally; escalate online explicitly when needed. |
| **Field Researcher / Journalist / NGO** | Process sensitive notes, photos, documents on the move under changing connectivity. |
| **Security / Compliance Power-User** | Traceable model opinions, minimal-trace, BYO keys. |

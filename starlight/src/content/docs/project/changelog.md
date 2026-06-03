---
title: Council changelog (v0.1 → v0.2)
description: The corrections the 3-stage council made to v0.1.
sidebar:
  order: 2
---

Result of the project's own 3-stage council (Tech-Architect · Product-Strategist
· Devil's Advocate).

| # | Change | Source |
|---|---|---|
| 1 | **Positioning sharpened** to "offline-first AI Council for decisions/code/field" + 3 personas | Product |
| 2 | **Local role council** as default (1 model, several roles) instead of 3× 32B | Product + Tech |
| 3 | **Council = deliberate review mode**, Local Chat as default | Product |
| 4 | **RAM budget corrected** — Lab tier to 48–64 GB (+GPU) | Tech + Devil |
| 5 | **NVMe USB-SSD required** for the Lab tier; USB speed documented as bottleneck | Tech + Devil |
| 6 | **"Zero-trace" → "minimal-trace"** + honest OS-artifact threat model | Tech + Devil |
| 7 | **Engine: llama.cpp `llama-server`** primary instead of "portable Ollama" | Tech + Devil |
| 8 | **Browser-only UI** as the most robust portable default (Tauri optional) | Tech |
| 9 | **Grok 4.1 dropped** | Devil: Aug-2026 EOL |
| 10 | **exFAT myth corrected** (no 4 GB limit) → FAT32 detection in preflight | Tech |
| 11 | **License column + Gemma notice requirement**; default bundle MIT/Apache only | Tech + Devil |
| 12 | **GPU strategy** (Metal/CUDA/ROCm/Vulkan + CPU fallback) added | Tech |
| 13 | **Vault: Argon2id passphrase**, key never plaintext | Tech |
| 14 | **Phone access: TLS + one-time token + IP bind** | Tech |
| 15 | **Privacy-diff + cost cap** (Stage 2 is O(N²)) | Product + Tech |
| 16 | **Bias guard** (randomization, no self-voting, style norm) | Tech |
| 17 | **`evals/` Council-vs-Single** as required proof | Product |
| 18 | **Roadmap sharpened** (MVP first, multimodal late) | Product + Tech |
| 19 | **Model defaults in a dated registry**, no frozen benchmarks | Tech |

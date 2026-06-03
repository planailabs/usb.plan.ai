---
title: Architecture overview
description: The components on the stick and how a query flows through them.
sidebar:
  order: 1
---

Everything runs from the USB drive (exFAT, NVMe-SSD recommended). A FastAPI
**Council Core** orchestrates a local engine and, on opt-in, cloud providers.

```
┌───────────────────────────────────────────────────────────────┐
│                  USB DRIVE (exFAT, NVMe-SSD recommended)        │
│                                                                 │
│  Launcher / Browser-only UI  ──▶  Council Core (FastAPI)        │
│                                      │  Orchestrator + Router    │
│                                      ▼                           │
│                          ┌─────────────────────┐                │
│                          │ Router offline/online│  opt-in? ─┐    │
│                          └──────────┬──────────┘           │    │
│              offline / no opt-in    │                       │    │
│        ┌─────────────────┐   ┌──────▼───────┐      ┌────────▼──┐ │
│        │ Local Council    │   │ Local Engine │      │ Cloud      │ │
│        │ • role           │◀─▶│ llama-server │      │ Council    │ │
│        │ • multi-model    │   │ +Whisper/VLM │      │ (BYO keys) │ │
│        └─────────────────┘   └──────────────┘      └───────────┘ │
│                                                                 │
│  Vault (Argon2id + AES-256): keys, chats, captures              │
└───────────────────────────────────────────────────────────────┘
```

## Components

| Component | Tech | Role |
|---|---|---|
| **Local Engine** | **llama.cpp `llama-server`** (primary), Ollama optional | Deterministically bundleable, genuinely portable — no installer hack |
| **Council Core** | FastAPI (Python 3.11+), async httpx | Orchestrates stages, offline/online [router](/architecture/routing-and-privacy/), concurrency/backpressure |
| **UI** | FastAPI serves a local web UI (`localhost`) | **Browser-only as the most robust portable default**; optional per-platform Tauri wrapper |
| **Voice (STT)** | whisper.cpp (per-OS/arch binaries) | On-device speech-to-text |
| **Vision (VLM)** | llama.cpp multimodal (Qwen-VL / Moondream GGUF) | Image understanding (integration cost is real — see [roadmap](/project/roadmap/)) |
| **Router** | Custom logic | Local vs cloud; privacy guard enforces opt-in |
| **Cloud Council** | OpenRouter (first) / native SDKs (optional) | Frontier models on network + consent |
| **Vault** | Argon2id KDF + AES-256 (age/libsodium) | Passphrase-unlocked; key material never plaintext on the stick |
| **Phone Access** | Local HTTPS (self-signed) + one-time token | Phone/tablet as 2nd screen, bound to the active LAN IP |
| **Wireless hub** *(planned · v0.6)* | Wi-Fi 6E/7 local link | Optional "hub mode": serve signed model-packs + a council API to nearby devices. Off by default; **internet-off LAN, not air-gapped** |

The [Council](/council/overview/) runs on top of the local engine (role or
multi-model) or the cloud council. See [configuration](/reference/configuration/)
for how seats, roles, and routing are declared.

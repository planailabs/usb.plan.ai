# 🔒 usb.plan.ai — Portable AI Council

> **Bring the best models you trust into one auditable council — runs entirely from a USB drive.**
> Offline-first · private · open-source. Not one chatbot's opinion — a deliberated answer with the dissent shown.

![license](https://img.shields.io/badge/code-Apache--2.0-5ef2a4)
![status](https://img.shields.io/badge/spec-v0.2-6bb8ff)
![platforms](https://img.shields.io/badge/Windows%20·%20macOS%20·%20Linux-grid--down%20ready-f7b955)

Inspired by [PortableMind](https://portablemind.io) and the OSS DIY build
[techjarves/Portable-AI-USB](https://github.com/techjarves/Portable-AI-USB) —
with a fundamentally different core: an **auditable AI Council** instead of a
single model. 🟢 offline by default, 🔵 frontier models on opt-in.

> ## 🚧 Status: v0.2 concept & spec — building in public
>
> **What exists today:** this repository's **website + documentation + the v0.2
> spec**. **What does *not* exist yet:** the product itself — the portable
> `llama-server` bundle, the FastAPI council orchestrator, the role-council, the
> evals, `preflight-check`, and the vault. The setup/run steps below describe the
> **target** experience; they don't work yet. Follow the
> [roadmap](https://usb.plan.ai/docs/project/roadmap/) and
> [contribute](./CONTRIBUTING.md) to help build it.

---

## ⚡ Why a council?

A single model gives you one answer you have to trust blindly. usb.plan.ai runs
a **3-stage council** — *First Opinions → Peer Review → Chairman* — and shows you
the full trace: every opinion, the ranking, and where the models **disagreed**.

```
"Run this risky bash script offline."

  Solver     → just sudo it.
  Skeptic    → ⚠ sudo + unverified script = full-system exposure.
  Security   → no checksum, no sandbox. block.
  Chairman   → dry-run in a sandbox, verify the checksum, run as your user.
```

The Skeptic catches what a single chat misses. **That's the whole point.**

---

## 🧠 Council seats

Swappable "seats", not "the smartest models". The default bundle ships
**MIT/Apache only** so it's cleanly redistributable.

| Seat / role | Model (GGUF) | License | ~Size (Q4_K_M) | In default bundle |
|---|---|---|---|:--:|
| 🔓 Reasoning | DeepSeek-R1-Distill-Qwen-32B | **MIT** | ~20 GB | ✅ |
| 🔓 Agent / tools | Qwen3-32B | **Apache-2.0** | ~20 GB | ✅ |
| 🔓 General (mid) | Qwen3-8B | Apache-2.0 | ~5 GB | ✅ |
| ⚠️ Lightweight | Gemma 4 (4B class) | **Gemma Terms** | ~3–5 GB | opt-in* |
| 👁 Vision (VLM) | Qwen-VL / Moondream | per model | ~3–8 GB | opt-in |
| 🎙 Voice (STT) | whisper.cpp (base → large-v3-turbo) | MIT | ~0.1–1.5 GB | ✅ |

*Online seats (opt-in, BYO keys): **Claude Opus 4.8 · GPT-5.5 · Gemini 3.1 Pro · DeepSeek V4**.*

> ⚠️ **Gemma** is opt-in only: its license requires the notice file to travel
> with every redistribution. See [docs → Model licenses](https://usb.plan.ai/docs/models/licenses/).

---

## 🚀 Setup

### Requirements

- A **fast** USB drive. For the multi-model "Lab" tier, an **NVMe USB-SSD**
  (USB 3.2 Gen 2) — a normal stick spends ~2 min just loading a 20 GB model.
- Filesystem: **exFAT** (the installer aborts on FAT32).
- RAM scales with the model: an 8B needs ~8–12 GB; two resident 32B models need
  **48–64 GB + a GPU**.

### Steps

1. **Download** the latest release and unzip it onto the drive.
2. **Run preflight** — double-click `preflight-check.*`. It measures filesystem,
   USB read speed, RAM, and GPU/VRAM, then recommends a tier. *(Run this first.)*
3. **Install** — run `install.*`, pick a tier (**Pocket / Field / Lab**). Models
   download into `model-packs/` with SHA-256 verification.
4. **Done!** Your portable council is ready. 🎉

---

## ▶️ Run it

Double-click the launcher for your OS — it serves the UI in your browser at
`http://localhost:4321`.

| OS | Launcher |
|---|---|
| 🪟 Windows | `start-windows.bat` |
| 🍎 macOS | `start-mac.command` |
| 🐧 Linux | `start-linux.sh` |

First run on a new machine can take a moment (extracting the engine — one time
only, auto-cleaned on eject). Ask the **demo prompt** and watch the council trace.

---

## 🔐 Privacy

- **Offline by default** — nothing leaves the stick. UI shows 🟢 *offline*.
- **Opt-in online** — escalate to frontier models *only* after a **Privacy-Diff**
  shows you exactly what's sent, to whom, and the cost. UI shows 🔵 *online-council*.
- **Vault** — keys, chats, and traces are encrypted (Argon2id + AES-256),
  unlocked by your passphrase. Key material is **never** written plaintext.
- **Minimal-trace, honestly** — no telemetry, no accounts. But a portable app
  can't leave *zero* trace on every OS, and a **compromised host is out of scope**.
  We document the unavoidable artifacts instead of pretending they don't exist.

---

## 📁 What's on the stick

```
usb.plan.ai/
├── start-windows.bat / start-mac.command / start-linux.sh
├── preflight-check.*      ← FS / USB-speed / RAM / GPU check (run first)
├── install.*              ← tier + model selection
├── engine/                ← llama.cpp llama-server, whisper.cpp, vision
├── core/                  ← FastAPI council orchestrator + council.config.yaml
├── ui/                    ← browser-only web UI
├── model-packs/           ← verified manifests (license + SHA-256)
├── recipes/ playbooks/    ← roles, seats, offline workflows
├── evals/                 ← Council-vs-Single proof data
├── plugins/               ← new providers / models / tools
└── vault/                 ← Argon2id + AES-256 (keys, chats, traces)
```

---

## 🖥 Hardware sizing

| Tier | What you get | USB | RAM | GPU |
|---|---|---|---|---|
| **Pocket** | 1× 4–8B + role council + voice | 16–32 GB | 8–12 GB | CPU ok |
| **Field** | 8B + vision + voice | 32 GB | 12–16 GB | recommended |
| **Lab** | true multi-model council (32B×2 + 8B + vision) | 64–128 GB **NVMe-SSD** | **48–64 GB** | **required** |

Below the Lab tier, use the **role council** (one strong model in several roles:
*Solver · Skeptic · Security · Summarizer*) — same council UX, far less RAM.

---

## ⚠️ Important notes

- **Code license ≠ model license.** This repo is Apache-2.0; each model keeps its
  own weights license (see the table above and `model-packs/` manifests).
- **pnpm only** for the docs/site build — `npm`/`yarn` silently break it.
- **Never** "just `sudo`" a downloaded script. (Ask the council first. 😉)

---

## 📚 Docs & contributing

Full documentation: **[usb.plan.ai/docs](https://usb.plan.ai/docs/)** — architecture,
the council, models, hardware, security, config, evals.

It's a **council kit**, not a monolith. Add a `recipe/`, a `model-pack/`, a
`plugin/`, or a `playbook/` — good first issues are tagged. See
[docs → Contributing](https://usb.plan.ai/docs/contributing/overview/).

---

## 📄 License

**Apache-2.0** (code). Model weights are governed by their own licenses. See
[`LICENSES.md`](https://usb.plan.ai/docs/models/licenses/).

<sub>Open. Offline. Auditable. Smarter together. — plan.ai</sub>

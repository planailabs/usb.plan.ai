# 🔒 usb.plan.ai: Portable AI Council

> Bring the best models you trust into one auditable council. Runs entirely from a USB drive.
> Offline-first · private · open-source. A deliberated answer with dissent shown, not one chatbot's opinion.

![license](https://img.shields.io/badge/code-Apache--2.0-5ef2a4)
![status](https://img.shields.io/badge/spec-v0.3-6bb8ff)
![platforms](https://img.shields.io/badge/Windows%20·%20macOS%20·%20Linux-grid--down%20ready-f7b955)

Inspired by [PortableMind](https://portablemind.io) and the OSS DIY build
[techjarves/Portable-AI-USB](https://github.com/techjarves/Portable-AI-USB).
Its core is different: an **auditable AI Council** instead of a single model.
Offline by default; online frontier council on opt-in.

> ## Status: v0.3 concept & spec, building in public
>
> Today this repo is the website, documentation, and v0.3 spec. The product is
> not built yet; see the [status](https://usb.plan.ai/docs/start-here/welcome/),
> [roadmap](https://usb.plan.ai/docs/project/roadmap/), and
> [contribute](./CONTRIBUTING.md) to help build it.

---

## Why a council?

A single model gives you one answer you have to trust blindly. usb.plan.ai runs
a 3-stage council (*First Opinions → Peer Review → Chairman*) and shows you the
full trace: every opinion, the ranking, and where the models disagreed.

```
"Run this risky bash script offline."

  Solver     → just sudo it.
  Skeptic    → ⚠ sudo + unverified script = full-system exposure.
  Security   → no checksum, no sandbox. block.
  Chairman   → dry-run in a sandbox, verify the checksum, run as your user.
```

The Skeptic catches what a single chat misses. That's the whole point.

---

## Council seats

Swappable "seats", not "the smartest models". The roster lives in
[Council seats](https://usb.plan.ai/docs/models/seats/); redistribution policy
lives in [Model licenses](https://usb.plan.ai/docs/models/licenses/). The
default bundle stays MIT/Apache only, with Gemma opt-in because its notice must
travel with redistribution.

---

## Setup

### Requirements

Use a fast USB drive and run preflight first; tier sizing, performance, and
filesystem rules live in [hardware tiers](https://usb.plan.ai/docs/hardware/tiers/),
[performance](https://usb.plan.ai/docs/hardware/performance/), and
[directory structure](https://usb.plan.ai/docs/reference/directory-structure/).

### Steps

1. **Download** the latest release and unzip it onto the drive.
2. **Run preflight:** double-click `preflight-check.*`. It measures filesystem,
   USB read speed, RAM, and GPU/VRAM, then recommends a tier. *(Run this first.)*
3. **Install:** run `install.*`, pick a tier (**Pocket / Field / Lab**). Models
   download into `model-packs/` with SHA-256 verification.
4. **Done.** Your portable council is ready.

---

## Run it

Double-click the launcher for your OS. It serves the UI in your browser at
`http://localhost:4321`.

| OS | Launcher |
|---|---|
| Windows | `start-windows.bat` |
| macOS | `start-mac.command` |
| Linux | `start-linux.sh` |

First run on a new machine can take a moment while the engine extracts once and
is auto-cleaned on eject. Ask the demo prompt and watch the council trace.

---

## Privacy

- **Offline by default:** nothing leaves the stick. UI shows *offline*.
- **Opt-in online:** escalate to the online frontier council *only* after a **Privacy-Diff**
  shows you exactly what's sent, to whom, and the cost. UI shows *online-council*.
- **Vault:** keys, chats, and traces are encrypted (Argon2id + AES-256),
  unlocked by your passphrase. Key material is **never** written plaintext.
- **Minimal-trace, honestly:** no telemetry, no accounts. But a portable app
  can't leave *zero* trace on every OS, and a **compromised host is out of scope**.
  We document the unavoidable artifacts instead of pretending they don't exist.

---

## What's on the stick

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

## Hardware sizing

Hardware sizing lives in [hardware tiers](https://usb.plan.ai/docs/hardware/tiers/).
Below Lab, use the local role council; Lab is the local multi-model council tier.

---

## Important notes

- **Code license ≠ model license.** This repo is Apache-2.0; each model keeps its
  own weights license. See [Model licenses](https://usb.plan.ai/docs/models/licenses/)
  and `model-packs/` manifests.
- **pnpm only** for the docs/site build: `npm`/`yarn` silently break it.
- **Never** "just `sudo`" a downloaded script. Ask the council first.

---

## Docs & contributing

Full documentation: [usb.plan.ai/docs](https://usb.plan.ai/docs/). It covers
architecture, the council, models, hardware, security, config, evals.

It's a **council kit**, not a monolith. Add a `recipe/`, a `model-pack/`, a
`plugin/`, or a `playbook/`. Good first issues are tagged. See
[docs → Contributing](https://usb.plan.ai/docs/contributing/overview/).

---

## License

**Apache-2.0** (code). Model weights are governed by their own licenses. See
[`LICENSES.md`](https://usb.plan.ai/docs/models/licenses/).

<sub>Open. Offline. Auditable. Smarter together. plan.ai</sub>

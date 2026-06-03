---
title: USB directory structure
description: What lives on the stick, plus exFAT/stick-hygiene notes.
sidebar:
  order: 3
---

```
usb.plan.ai/
├── start-windows.bat / start-mac.command / start-linux.sh
├── preflight-check.*          ← FS check (FAT32→abort), USB speed, RAM, GPU
├── install.*                  ← model/tier selection
│
├── engine/
│   ├── llama-server/          ← per-OS/arch portable binaries (primary)
│   ├── whisper/               ← whisper.cpp per-OS/arch
│   └── vision/
├── core/                      ← FastAPI Council orchestrator
│   ├── council.config.yaml
│   ├── stages/                ← first_opinion, review, chairman
│   └── router/
├── ui/                        ← browser-only web UI (localhost)
├── model-packs/               ← verified download manifests + license column + SHA-256
│   └── installed-models.txt
├── recipes/                   ← roles, seats, use-case presets
├── playbooks/                 ← offline playbooks (code review, incident, field notes)
├── evals/                     ← council-vs-single comparison data
├── plugins/                   ← new providers/models/tools
├── vault/                     ← Argon2id+AES-256 (keys, chats, captures)
└── docs/
```

## Stick hygiene

exFAT has **no journaling**, so use **atomic writes** (write-temp-then-rename), a
"safely eject" reminder, and explicit "stick full" handling.

> exFAT has **no** 4 GB file-size limit. That was FAT32. A 20 GB GGUF lives
> fine as a single file. The `preflight-check` only aborts on **FAT32**.

The `model-packs/`, `recipes/`, `plugins/`, and `playbooks/` directories are the
[contributor](/contributing/overview/) hooks.

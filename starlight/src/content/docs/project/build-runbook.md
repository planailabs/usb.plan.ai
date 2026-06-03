---
title: Build runbook (for agents)
description: The exact order to implement usb.plan.ai from spec to v0.4, with the chosen stack and invariants.
sidebar:
  order: 0
---

This is the agent-facing implementation guide: build the product in this order,
honour the invariants, and the repo comes together coherently. It assumes the
[software stack](/reference/software-stack/),
[hardware](/reference/hardware-procurement/), and
[updates](/reference/updates-and-signing/) decisions.

## Build order

1. **`preflight-check.*`** (shell, per-OS) — detect filesystem (abort on FAT32),
   measure USB read speed, RAM, GPU/VRAM; print the recommended
   [tier](/hardware/tiers/). *Ship this first — it gates everything.*
2. **Vendor the engine** — per-OS/arch `llama-server` binaries under
   `engine/llama-server/` (pin the build tag). Add `whisper.cpp` under
   `engine/whisper/`.
3. **Thin orchestrator** (`core/`, FastAPI + `httpx`) — start `llama-server`,
   call its OpenAI-compatible localhost API, stream the
   [council stages](/council/overview/). Keep it out-of-process; **never** make
   `llama-cpp-python` the default runtime.
4. **Role council** — implement the four roles (Solver, Skeptic, Security,
   Summarizer) as sequential prompts against one model; emit `trace.json`.
5. **Model packs** — `models.lock.json` entries with `repo_id`, `revision`,
   `filename`, `size`, `license`, `sha256`, `engine_build`, `source_url`.
   Download via Hugging Face, verify SHA-256, never bundle Gemma in the default.
6. **Browser-only UI** (`ui/`) served by the orchestrator on `localhost`.
7. **Evals** (`evals/`) — Council-vs-Single with raw prompts + traces published.
8. **Updates** — wire the [signed pipeline](/reference/updates-and-signing/).

## Trace schema (sketch)

```json
{
  "prompt": "…", "prompt_sha256": "…", "engine_build": "b9490",
  "mode": "offline", "council": "role",
  "opinions": [{ "seat": "solver", "text": "…" }],
  "review": { "ranking": ["skeptic", "security", "solver"], "self_vote": false },
  "chairman": "…", "verdict": "…", "signed": true, "ts": "2026-06-03"
}
```

## Invariants (do not violate)

- **Offline by default.** Any network step goes through the
  [Privacy-Diff](/architecture/routing-and-privacy/) + explicit opt-in.
- **`llama-server` runs out-of-process** (portability over convenience).
- **Model packs are content-addressed** (SHA-256) and update separately from the app.
- **Honesty over hype** — mark unbuilt features as planned; back the council
  claim with [evals](/evals/overview/), don't assert it.
- **pnpm only** for the site; **exFAT** for the stick; **Unix-only** build glue.

## Toolchain

`uv` + `uv.lock` (reproducible Python), PyInstaller `--onedir` (per-OS runtime
bundle), cosign + TUF + syft for [releases](/reference/updates-and-signing/).
Start at roadmap phase [v0.1](/project/roadmap/).

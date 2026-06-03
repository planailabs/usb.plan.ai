---
name: product-build
description: Agent playbook to IMPLEMENT the usb.plan.ai product (engine, orchestrator, role council, model packs, updates) from the v0.2 spec. Read before writing any product code (vs the website). The authoritative, link-rich version lives in the docs build-runbook.
---

# Implementing usb.plan.ai (the product, not the website)

The repo today is website + docs + spec. This skill is how an agent turns the
spec into a runnable product. The canonical, always-current version is the docs
**Build runbook** (`starlight/src/content/docs/project/build-runbook.md`,
served at `/docs/project/build-runbook/`). Keep this skill in sync with it.

## Build order (ship in this sequence)

1. `preflight-check.*` (shell) — FS (abort FAT32) + USB-speed + RAM + GPU → recommend tier.
2. Vendor `llama-server` (+ `whisper.cpp`) binaries per-OS/arch under `engine/` (pin build tag).
3. Thin FastAPI orchestrator in `core/` — starts `llama-server`, calls its OpenAI-compatible localhost API, streams council stages.
4. Role council — Solver / Skeptic / Security / Summarizer as sequential prompts on one model → `trace.json`.
5. Model packs — `models.lock.json` (repo_id, revision, filename, size, license, sha256, engine_build, source_url); HF download + SHA-256 verify.
6. Browser-only UI (`ui/`) on localhost.
7. Evals (`evals/`) — Council-vs-Single, raw prompts + traces.
8. Signed updates (cosign + TUF + xdelta3 + syft, versioned dirs).

## Chosen stack (don't re-litigate without reason)

- Engine: **`llama.cpp` `llama-server`**, out-of-process, OpenAI-compatible. NOT `llama-cpp-python` as default.
- STT: **whisper.cpp**. VLM: **Qwen2.5-VL GGUF** via llama-server (match the `mmproj`).
- Distribution: Hugging Face GGUF, pinned revision, SHA-256 manifest.
- Python build: `uv` + PyInstaller `--onedir`.
- Hardware: NVMe USB-SSD (Samsung T7 Shield default; Gen 2×2 for Lab). exFAT.

## Invariants

- Offline by default; network only via Privacy-Diff + opt-in.
- `llama-server` out-of-process; model packs content-addressed, updated separately from the app.
- Honesty over hype; back the council claim with evals.
- pnpm only (site); exFAT (stick); Unix-only build glue.

## Related docs

`/docs/reference/software-stack/` · `/docs/reference/hardware-procurement/` ·
`/docs/reference/updates-and-signing/` · `/docs/council/overview/` ·
`/docs/project/roadmap/`. The `landing-design` skill covers the website side.

---
title: Software stack
description: The chosen portable, offline inference stack — engine, STT, vision, distribution — and why.
sidebar:
  order: 5
---

The cleanest portable stack is **out-of-process binaries + a thin orchestrator**.
No daemon, no host Python required, no per-machine install.

## Engine: `llama.cpp` `llama-server` (default)

A single self-contained binary, no Python runtime, runs on a Pi or a workstation.
`llama-server` exposes an **OpenAI-compatible** HTTP API (`/v1/chat/completions`,
`/v1/embeddings`), with streaming, batching, idle sleep/unload, and multimodal
input via `libmtmd`.

```bash
llama-server -m models/qwen3-8b-q4_k_m.gguf --host 127.0.0.1 --port 8080
```

- Acceleration: Metal (Apple), CUDA (NVIDIA), ROCm (AMD), Vulkan, CPU fallback.
- **Pin a tested build tag** per release; vendor per-OS/arch binaries under
  `engine/llama-server/`.

**Why not the alternatives (kept as optional providers):** Ollama is friendly
but daemon/cache-oriented; LM Studio isn't built for redistributable USB
packaging; vLLM/SGLang are too CUDA/Python-heavy for arbitrary offline laptops;
MLX is Apple-only. `llama-server` wins on **portability**.

## Voice (STT): `whisper.cpp`

Same philosophy: a portable binary, offline, with Metal/Vulkan/CUDA/ROCm/CPU and
VAD. Use `base` for the Pocket tier, `large-v3-turbo` for Field/Lab.

## Vision (VLM): Qwen2.5-VL GGUF via `llama-server`

| Use | Model |
|---|---|
| Default local vision | `Qwen2.5-VL-7B-Instruct-GGUF` |
| Smaller (Field) | `Qwen2.5-VL-3B-Instruct-GGUF` |
| Tiny caption / OCR-lite | `moondream2 GGUF` |

**Caveats (still version-sensitive):** the model GGUF and its `mmproj` projector
must match; freeze exact files + SHA-256 in the manifest. Images consume context
tokens, so budget a larger `-c`.

## Distribution & integrity

| Layer | Pick | Why |
|---|---|---|
| Model source | Hugging Face Hub (`hf download`, pinned **revision** + exact filename) | Standard GGUF distribution |
| Format | GGUF, usually `Q4_K_M` | Portable, compact for USB |
| Integrity | `models.lock.json` + **SHA-256** | repo_id, revision, filename, size, **license**, sha256, required engine build, source URL |
| App build | `uv` + `uv.lock`, frozen with PyInstaller `--onedir` | reproducible, no host Python |
| Orchestrator | FastAPI + `httpx` / OpenAI client | thin: start `llama-server`, call localhost, stream [council stages](/council/overview/) |

> Do **not** make `llama-cpp-python` the default runtime. Bundling native wheels
> across Metal/CUDA/Vulkan/ROCm is messier than keeping `llama-server`
> out-of-process. See the [build runbook](/project/build-runbook/) to implement this.

> Sources: [llama.cpp](https://github.com/ggml-org/llama.cpp) ·
> [llama-server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md) ·
> [whisper.cpp](https://github.com/ggml-org/whisper.cpp) ·
> [HF GGUF docs](https://huggingface.co/docs/hub/gguf). Verify versions per release.

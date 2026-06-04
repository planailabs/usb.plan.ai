---
title: Explorations
description: 'Active research tracks, not the product: browser-side inference, a self-hosting appliance, and a compute-sharing relay.'
sidebar:
  order: 3
  badge: research
---

This page is a **research track**, not a commitment. The product is the
[host-run council](/architecture/overview/): `llama.cpp` `llama-server` on your
machine, served to a browser-only UI, data on the stick. Everything below is an
adjacent idea we have scoped but not chosen. It lives here so the honest
[open questions](/project/open-questions/) have somewhere to point.

:::caution[Not the architecture yet]
None of this changes what usb.plan.ai *is* today. Browser inference and a
self-hosting board are a **different shape** of the same goal (portable,
offline, no-login AI), with their own tradeoffs and their own threat surface.
Treat the numbers here as directional.
:::

## 1. Browser-side inference (WebGPU)

The idea: instead of running the engine on the host, serve a static web app and
let the model download into the visitor's browser and run there on **WebGPU**.
Zero install, OS-agnostic, no driver hunt. The server becomes a file host.

**Why it's interesting now.** WebGPU shipped across the major browser engines in
late 2025 (the cross-browser milestone was announced 2025-11-25; Safari 26
brought it to Apple platforms). On strong hardware it is genuinely usable:
published WebLLM benchmarks on an M3 Max report **Llama 3.1 8B (4-bit) ~41 tok/s**
and **Phi-3.5-mini ~71 tok/s**, roughly 71–80% of native MLC speed inside a tab.

**Why it isn't the core.** It is a *capability regression* against native
`llama.cpp`, and the gaps are real:

| Constraint | Reality |
|---|---|
| **Secure context required** | WebGPU only exists in a secure context. `navigator.gpu` is **undefined** over plain `http://` from a LAN IP. Fast multi-threaded WASM fallback needs cross-origin isolation (`COOP: same-origin` + `COEP: require-corp`). A naive LAN build silently fails. |
| **Uneven coverage** | Broad but not universal: caniuse shows roughly four-fifths global support, with **older iOS, Firefox on Android, and Linux Chrome/Firefox** still the gaps. Always feature-detect and fall back. |
| **Smaller models** | Browser memory ceilings (worst on Safari) cap practical size. A council of three resident 32B models, the Lab-tier story, does not fit a tab. |
| **No parity** | Voice (whisper.cpp) and Vision (VLM) do not come for free the way they do with the native engine. |
| **Best-case figures** | The tok/s above are premium hardware. Integrated-GPU laptops are dramatically slower. |

**Stacks we'd evaluate:** [WebLLM](https://github.com/mlc-ai/web-llm) (MLC, fast
chat), [Transformers.js](https://github.com/huggingface/transformers.js)
(ONNX; Whisper STT, embeddings, vision), and
[wllama](https://github.com/ngxson/wllama) (GGUF, streams from OPFS, lowest peak
memory and the best Safari story). The pragmatic shape is **hybrid**: preload a
1–4B model for instant first use, lazy-fetch an 8B, and keep the native engine or
an opt-in cloud seat as the fallback for long context and unsupported browsers.

> Worth tracking: in-browser work in 2026 is finding WebGPU **dispatch overhead**
> a real bottleneck (kernel fusion, fewer dispatches), and projects like LlamaWeb
> are bringing broader GGUF/quant support to the browser. The field moves fast;
> re-measure before betting on it.

## 2. A self-hosting appliance

The second idea: the "stick" is its own little computer. A Pi-Zero-class Linux
board you plug into a laptop that appears as a **USB Ethernet adapter**, draws
power over the same cable, and serves the web UI directly. No host install, no OS
permissions, the same experience on any machine.

**Candidate boards.**

| Board | Notes |
|---|---|
| **Radxa Zero 3W** | RK3566 quad A55, up to 8 GB LPDDR4, optional eMMC, **Wi-Fi 6** variant, USB-C OTG, Pi-Zero footprint. The eMMC + Wi-Fi 6 combo is the reason to prefer it. Runs warm under load; a small fan helps. |
| **Raspberry Pi Zero 2 W** | The cheap MVP. 512 MB RAM, 2.4 GHz Wi-Fi only, but the **official `rpi-usb-gadget` tooling** (CDC-ECM/RNDIS with client/shared auto-switch) is the most mature gadget story going. Keep services lean. |

Microcontroller-class parts (ESP32-S3) and 64–256 MB RISC-V boards (Milk-V Duo,
Luckfox Pico) are **out of scope**: they can't serve multi-GB model files or host
the web stack comfortably.

**Transport.** USB-gadget Ethernet is the genuinely useful primitive here, and it
upgrades the existing [Phone Access](/reference/features/) story (a fixed
point-to-point link beats a fragile LAN-IP binding). Default to **CDC-NCM**: it is
driverless on macOS, Linux, and ChromeOS, and Windows 11 drives it natively
(`UsbNcm.sys`). Keep **RNDIS** as a fallback for older Windows; CDC-ECM is not
native on Windows. For standalone use the board boots as its own Wi-Fi access
point with a captive portal.

**Throughput, honestly.** Gadget Ethernet is CPU-bound far below USB 2.0's
480 Mbit/s, realistically on the order of ~100–165 Mbit/s on RK-class boards
(estimated from same-SoC measurements; no Zero-3W-specific iperf published). That
is a few minutes per 2 GB of weights on first load, then **cache aggressively** so
each client downloads a model only once.

**The secure-context catch returns.** A board serving its own web app hits the
same WebGPU/HTTPS wall as §1, with no host `localhost` to lean on. The least-bad
answer is a **real domain with a real certificate baked on the device** (for
example a `*.usb.plan.ai` cert whose A-record points at the gadget IP), so the
browser sees valid HTTPS fully offline. The catch we'd have to solve: **do not
ship one private key across every unit.** Per-device provisioning, or Let's
Encrypt's short-lived IP certificates (GA 2026-01-15, HTTP-01/TLS-ALPN-01, ~6-day
validity), are the safer directions. Self-signed certs and browser flags are
dev-only; Safari in particular won't trust them.

## 3. Compute-sharing relay

Independent of the board question, one pattern is worth lifting now: let a phone
use a laptop's compute. The laptop runs the OpenAI-compatible
[`llama-server`](/reference/software-stack/) we already ship; a small
**reverse proxy** exposes a single `/v1` endpoint to the LAN and gates it with a
**bearer token** paired by QR. This is the mechanic behind the planned
[hub mode](/project/roadmap/), shown here for context: it reuses the
[Phone Access](/reference/features/) "TLS + one-time token" model, needs no browser
inference and no new hardware, and is already on the roadmap rather than
speculative. It is the one part of this page that is a commitment, not a maybe.

## Open questions this raises

- Is browser-WebGPU a worthwhile **fallback seat** for hosts that can't run the
  native engine, or a distraction from the council's depth?
- Should **USB-gadget Ethernet** become the recommended transport for Phone
  Access, ahead of LAN-IP binding?
- Does a self-hosting appliance belong on the roadmap at all, or does it quietly
  become a *second product* (hardware to manufacture, firmware to sign, a wider
  threat model) that dilutes "software you copy onto a stick"?

See the live list in [open questions](/project/open-questions/).

> Sources move fast and several figures here are best-case or estimated.
> [WebGPU support](https://caniuse.com/webgpu) ·
> [MDN: WebGPU secure context](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) ·
> [WebLLM](https://github.com/mlc-ai/web-llm) ·
> [Radxa Zero 3W](https://radxa.com/products/zeros/zero3w/) ·
> [rpi-usb-gadget](https://www.raspberrypi.com/news/usb-gadget-mode-in-raspberry-pi-os-ssh-over-usb/) ·
> [Let's Encrypt 6-day/IP certs](https://letsencrypt.org/2025/01/16/6-day-and-ip-certs.html).
> Re-measure before depending on any of it.

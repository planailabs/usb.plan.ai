---
title: Extensibility — open & hackable
description: Plugins, recipes, and hardware extensions. usb.plan.ai is a kit, not a sealed box.
sidebar:
  order: 7
---

usb.plan.ai is **fully open and hackable** (Apache-2.0 code). No lock-in, no
sealed firmware, no "approved" store. If you can read a manifest, you can extend
it — in software *and* hardware.

## Software extensions

| Surface | Directory | What you add |
|---|---|---|
| **Plugins** | `plugins/` | New providers (a cloud or local backend), models, or tools the orchestrator can call. A plugin is a folder with a `plugin.json` manifest (id, kind, entrypoint, capabilities) + an entrypoint the [orchestrator](/reference/software-stack/) discovers at startup. |
| **Recipes** | `recipes/` | Council roles, seat line-ups, and use-case presets — pure config, no code. |
| **Playbooks** | `playbooks/` | Offline workflows (code review, incident response, field notes…). |
| **Model packs** | `model-packs/` | Verified GGUF manifests (license + SHA-256). |

Plugins are discovered, not hard-wired: drop a folder in `plugins/`, declare it
in the manifest, and it appears as a provider/seat/tool. The same
[invariants](/project/build-runbook/) apply (offline-by-default, Privacy-Diff on
any network egress).

## Hardware extensions

The stick is the **start**, not the whole product. "Bring your own host" — and
extend it:

| Extension | Why |
|---|---|
| **USB-C PD power bank** | Local inference is power-hungry; a USB-C Power-Delivery bank (e.g. 20,000 mAh+, 60–100 W PD) keeps a laptop/handheld running the council off-grid for hours. The field-kit staple. |
| **NVMe USB-SSD** | The performance backbone — see [hardware procurement](/reference/hardware-procurement/). |
| **eGPU enclosure** | Turns a thin laptop into a [Lab-tier](/hardware/tiers/) multi-model host. |
| **Single-board / handheld host** | Run from a Pi-class board or handheld; `llama-server` is a portable binary with CPU fallback. |
| **Rugged field kit** | SSD + power bank + host in a waterproof case = a self-contained, grid-down council. |

Nothing here is proprietary: any host, any USB-C power source, any compliant
drive. We publish the requirements ([performance reality](/hardware/performance/))
so the community can assemble and share kits.

## Local distribution (planned · v0.6)

A powered stick (e.g. on a USB-C [power bank](#hardware-extensions)) can become a
**Wi-Fi hub** that serves signed **model-packs**, tools, and a local **council
API** to paired nearby devices over high-speed Wi-Fi — so a field team shares one
stick without per-device installs. **Off by default.** It is **internet-off LAN
networking, not air-gapped**: peers verify TUF metadata + SHA-256; no internet
bridge, no vault/chat/key sharing. See the [roadmap](/project/roadmap/),
[threat model](/security/threat-model/), and candidate
[wireless hardware](/reference/manufacturing/).

## Contribute an extension

Add a `plugin/`, `recipe/`, `playbook/`, `model-pack/`, or a documented hardware
kit. See [contributing](/contributing/overview/) — extensions are the point.

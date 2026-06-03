---
title: Quickstart (5 minutes)
description: From download to your first Council trace.
sidebar:
  order: 3
---

The 5-minute "wow" flow: from a fresh stick to a deliberated answer.

## Steps

1. **Download** the release onto a fast USB drive (an NVMe USB-SSD for the Lab
   tier; see [hardware](/hardware/tiers/)).
2. **Run preflight:** `preflight-check.*` measures filesystem (FAT32 → abort),
   USB read speed, RAM, and GPU/VRAM, then recommends a [tier](/hardware/performance/).
3. **Choose Pocket:** installs one small model + the local
   [role council](/council/local-council/) + Whisper-base.
4. **Ask the demo prompt:**

   > *"I have to run this risky bash script offline. Check the benefit, the
   > risks, and a better alternative."*

5. **See the Council trace:** the *Solver* proposes, the *Skeptic* finds the
   real risk a single chat misses, the *Chairman* gives you a safe fix. All
   opinions, the ranking, and the marked dissent are visible in the
   [trace](/council/the-trace/).

## Platforms

Launchers ship per OS: `start-windows.bat`, `start-mac.command`,
`start-linux.sh`. The UI is **browser-only by default** (served on `localhost`),
which is the safest portable option; a per-platform Tauri wrapper is
optional. See [setup](/reference/directory-structure/).

Nothing leaves the stick unless you explicitly escalate; see
[routing & privacy](/architecture/routing-and-privacy/).

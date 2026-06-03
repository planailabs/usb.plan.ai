---
title: council.config.yaml
description: The single config that declares seats, roles, routing, and bias guard.
sidebar:
  order: 1
---

The Council is declared in `core/council.config.yaml`.

```yaml
mode: auto                    # auto | offline | online
local_council: role           # role (default) | multi-model
chairman: gemini-3.1-pro
fallback_chairman: local:deepseek-r1-distill-32b

local_seats:                  # used by multi-model council
  - local:deepseek-r1-distill-32b
  - local:qwen3-32b
  - local:qwen3-8b

local_roles:                  # used by role council (1 model, several roles)
  - solver
  - skeptic
  - security_reviewer
  - summarizer

online_seats:
  - anthropic/claude-opus-4.8
  - openai/gpt-5.5
  - google/gemini-3.1-pro
  - deepseek/deepseek-v4      # Grok removed (Aug-2026 EOL)

routing:
  prefer: offline
  escalate_on: [user_opt_in]  # low_local_confidence deferred until a dissent measure exists
  privacy_guard: true
  cost_cap_usd_per_query: 0.50 # Stage 2 is ~O(N²) → token/cost cap

review_bias_guard:
  randomize_order: true
  forbid_self_voting: true
  normalize_style: true

wireless:                       # planned (v0.6) — off by default
  hub_mode: false               # serve to nearby devices over high-speed Wi-Fi
  share: [model-packs, tools, council-api]   # never: vault, chats, keys
  internet_bridge: false        # local LAN only — not air-gapped
```

## Fields

| Key | Meaning |
|---|---|
| `mode` | Force offline/online or let the [router](/architecture/routing-and-privacy/) decide (`auto`). |
| `local_council` | `role` (default) or `multi-model` — see [local council](/council/local-council/). |
| `chairman` / `fallback_chairman` | Synthesis model; the fallback is local so offline always works. |
| `local_seats` / `local_roles` | Seats for the multi-model council / roles for the role council. |
| `online_seats` | Frontier [seats](/models/seats/) used on opt-in. |
| `routing` | Offline preference, escalation trigger, privacy guard, [cost cap](/architecture/routing-and-privacy/). |
| `review_bias_guard` | Peer-review fairness — see [bias guard](/council/bias-and-confidence/). |
| `wireless` | **Planned (v0.6)**, off by default — [local distribution](/reference/extensibility/) hub mode; internet-off LAN, not air-gapped. |

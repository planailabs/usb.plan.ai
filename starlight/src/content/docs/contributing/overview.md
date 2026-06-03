---
title: Contributing — a council kit, not a monolith
description: Clear docking points and a 5-minute wow to win contributors.
sidebar:
  order: 1
---

usb.plan.ai is a **council kit**: recipes, model-packs, plugins, playbooks. It is
not a monolithic product. Contributors get clear docking points.

| Directory | Contributor hook |
|---|---|
| `recipes/` | Roles, seats, use-case presets |
| `model-packs/` | Verified download manifests (with [license](/models/licenses/) + SHA-256) |
| `evals/` | [Council-vs-Single](/evals/overview/) comparison data |
| `plugins/` | New providers, models, tools |
| `playbooks/` | Ready-to-use offline workflows |
| `good-first-issues` | OS-specific launchers, presets, docs |

## The 5-minute wow

```
download release → run preflight → choose Pocket → ask demo prompt → see Council trace
```

Demo prompt: *"I have to run this risky bash script offline. Check benefit,
risks, and a better alternative."* The Skeptic finds real errors a single chat
misses. See the [quickstart](/start-here/quickstart/).

## Repo docs

The repository ships a focused doc set: README (pitch + quickstart),
ARCHITECTURE, COUNCIL, MODELS, HARDWARE, SETUP, SECURITY, CONFIG, EVALS,
LICENSES, CONTRIBUTING, FAQ. Keep model defaults in a **dated registry**, never
freeze benchmark numbers into prose.

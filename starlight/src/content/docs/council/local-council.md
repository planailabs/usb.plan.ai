---
title: Local council — roles vs multi-model
description: How the Council runs on weak hardware without three resident 32B models.
sidebar:
  order: 2
---

Three full 32B models running at once is unrealistic on consumer hardware (~40 GB
of weights alone, before KV-cache). So the local Council has **two variants**.

| Variant | How | Hardware | When |
|---|---|---|---|
| **Role council** (default) | **One** strong local model, prompted in sequential roles: *Solver, Skeptic, Security-Reviewer, Summarizer* | Runs on the [Pocket/Field tier](/hardware/tiers/) | Weak hardware, fast activation |
| **Multi-model council** (Lab) | Several real models of different families, resident or serial | [Lab tier](/hardware/tiers/) (NVMe-SSD, 48-64 GB RAM, GPU) | Maximum diversity, deliberately "slow but deep" |

## Role council (default)

The role council preserves the Council UX with low RAM and latency cost. One
model answers the same question in different hats:

- **Solver:** proposes a concrete solution.
- **Skeptic:** attacks it: failure modes, edge cases, hidden risk.
- **Security-Reviewer:** checks for unsafe operations, data exposure, footguns.
- **Summarizer:** distills the deliberation for the chairman.

For many users this is just as traceable as a true model council.

## Multi-model council (Lab)

Several distinct model families (e.g. a reasoning model + an agent/tools model +
a mid model) give genuine perspective diversity, with RAM and
load/reload latency from the USB bus. Reserve it for the
[Lab tier](/hardware/tiers/) and see the [performance reality](/hardware/performance/).

Configure which variant runs via `local_council: role | multi-model` in
[`council.config.yaml`](/reference/configuration/).

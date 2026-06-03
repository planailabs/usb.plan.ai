---
title: Local council — roles vs multi-model
description: How the Council runs on weak hardware without three resident 32B models.
sidebar:
  order: 2
---

The local council has two variants: one for ordinary hardware and one for the
Lab tier. Tier numbers live in [hardware tiers](/hardware/tiers/).

| Variant | How | Hardware | When |
|---|---|---|---|
| **Local role council** (default) | One strong local model, prompted in sequential roles: *Solver, Skeptic, Security-Reviewer, Summarizer* | [Pocket/Field tier](/hardware/tiers/) | Weak hardware, fast activation |
| **Local multi-model council** (Lab) | Several real models of different families, resident or serial | [Lab tier](/hardware/tiers/) | Maximum diversity, deliberately "slow but deep" |

## Local role council (default)

The local role council preserves the Council UX with low RAM and latency cost.
One model answers the same question in different hats:

- **Solver:** proposes a concrete solution.
- **Skeptic:** attacks it: failure modes, edge cases, hidden risk.
- **Security-Reviewer:** checks for unsafe operations, data exposure, footguns.
- **Summarizer:** acts as the local Chairman and composes the verdict from the
  deliberation.

For many users this is just as traceable as a true local multi-model council.

## Local multi-model council (Lab)

Several distinct model families give genuine perspective diversity, with RAM and
load/reload latency from the USB bus. Reserve it for the [Lab tier](/hardware/tiers/)
and see the [performance reality](/hardware/performance/).

Configure which variant runs via `local_council: role | multi-model` in
[`council.config.yaml`](/reference/configuration/).

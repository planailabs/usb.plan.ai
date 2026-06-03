---
title: Evals — Council vs Single
description: The core claim must be proven, not asserted.
sidebar:
  order: 1
---

> **Council > single model — but proven.** The multi-perspective claim must be
> measurably better via evals, not asserted.

The `evals/` directory holds **Council-vs-Single comparison data**: the same
tasks answered by a single model and by the Council, scored and published.

## Candidate task families

The most convincing evidence comes from tasks where a skeptic/reviewer perspective
changes the outcome:

- **Code review** — does the Council catch real bugs a single chat misses?
- **Decision memos** — does surfaced dissent improve the recommendation?
- **Document triage** — does multi-perspective reading reduce false conclusions?

Choosing the most convincing eval set is an [open question](/project/open-questions/).

## Why it's in the repo (not just a claim)

Publishing the eval data makes the central differentiator **falsifiable**. If the
Council doesn't beat a single model on a task family, that's visible — and a
[contributor](/contributing/overview/) can improve the recipes until it does.
This lands as roadmap phase [v0.4](/project/roadmap/).

---
title: Welcome
description: A portable, open-source, offline-first AI Council on a USB stick.
sidebar:
  order: 1
---

**usb.plan.ai** is an open-source, portable AI stick — but with a fundamentally
different core from existing offline-AI sticks: an **auditable AI Council**.

> **The core:** instead of a single chat answer, usb.plan.ai gives you a
> **deliberated, multi-perspective** answer — locally as a *role council* (one
> strong model in several roles), and, when a network is available and you
> explicitly allow it, as a real multi-provider *frontier council*. The Council
> is a deliberate **review mode**, not the default chat.

:::caution[Status: concept / spec v0.2]
The website and these docs exist today. The **product** — the portable engine,
the council orchestrator, the evals, the vault — is **not built yet**. This is a
build-in-public spec; everything described here is the *target*. See the
[roadmap](/project/roadmap/).
:::

## Positioning

A good single model wins at "write me an email." A council wins at "review this
decision / this code / this risk from several angles and show me the dissent."

It is built for situations where internet access, privacy, or model dependence
are problematic — see [what makes it different](/start-here/what-makes-it-different/)
and the [Council](/council/overview/).

## Guiding principles

| Principle | Meaning |
|---|---|
| **Local-first, not local-only** | Works offline. With a network it gets smarter — but never without explicit consent. |
| **Minimal-trace** (honest, not "zero") | No persistent user data on the host. Unavoidable OS artifacts are documented openly. |
| **Council > single model — but proven** | Multi-perspective synthesis must be measurably better via [evals](/evals/overview/), not asserted. |
| **Open, forkable, extensible** | A council kit with recipes, model-packs, plugins — not a monolith. |
| **Bring-your-own-keys** | Keys belong to the user, stored passphrase-encrypted on the stick. |
| **Honest hardware expectations** | Clear minimums per [tier](/hardware/tiers/); no exaggerated plug-and-run claims. |

## At a glance

| | |
|---|---|
| Domain | usb.plan.ai |
| Product | Portable AI Council |
| Tagline | "Bring the best models you trust into one auditable council — offline-first." |
| Code license | Apache-2.0 (model weights keep their own — see [licenses](/models/licenses/)) |
| Status | Concept / spec **v0.2** (council-optimized), 2026-06-03 |
| Owner | plan.ai |

> v0.2 is the result of a 3-stage LLM council (first opinions on Claude Opus 4.8,
> GPT-5.5, Gemini 3.1 Pro → peer review → chairman synthesis). The key
> corrections versus v0.1 are in the [council changelog](/project/changelog/).

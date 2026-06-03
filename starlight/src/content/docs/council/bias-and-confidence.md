---
title: Bias guard & confidence
description: Keeping peer review honest, and when (not) to escalate online.
sidebar:
  order: 3
---

Peer review is useful only if it resists style bias and accidental self-voting.
Online escalation stays manual until a real dissent metric exists.

## Bias guard

Hiding provider names isn't enough. Models recognize their own style. The peer
review stage therefore enforces:

- **Randomized order per reviewer:** no positional bias toward the first/last
  answer.
- **Uniform output format** (style normalization): strips stylistic tells that
  leak which seat wrote what.
- **No self-voting:** a seat may not rank its own answer.

```yaml
review_bias_guard:
  randomize_order: true
  forbid_self_voting: true
  normalize_style: true
```

## Confidence & online escalation

Online escalation is, for now, **`user_opt_in` only**. Automatic
`low_local_confidence` routing is deliberately *not* enabled yet:

> Auto-routing on "low confidence" risks sending data to the network
> unintentionally. It will only ship once a concrete **dissent measure**
> (a council-internal disagreement metric) is defined.

This is one of the [open questions](/project/open-questions/). Until then, every
online step goes through the explicit
[privacy guard](/architecture/routing-and-privacy/).

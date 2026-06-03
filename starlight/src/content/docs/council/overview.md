---
title: Council overview
description: The three-stage deliberation that produces an auditable answer.
sidebar:
  order: 1
---

The Council is a deliberate **review mode**. [Local chat](/reference/features/)
stays the fast default; the Council is for "review this decision / code / risk
from several angles and show me the dissent."

## Three stages (Karpathy pattern)

```
User question
  │
  ├─▶ Stage 1 — First Opinions   parallel to N council seats
  │       (local: roles OR multi-model | online: 3–5 frontier models)
  │
  ├─▶ Stage 2 — Peer Review   each seat ranks the anonymized answers
  │       of the others by accuracy & insight (bias guard applies)
  │
  └─▶ Stage 3 — Chairman   synthesizes a reasoned final answer
          + Council trace (all opinions, ranking, dissent)
```

Each stage **streams** into the UI.

## Why it works

- **First opinions** are produced independently, so seats don't anchor on each
  other.
- **Peer review** surfaces where the seats *disagree* — the dissent is the
  signal, not noise.
- **The chairman** must justify its synthesis against the visible opinions.

The [Council trace](/council/the-trace/) — every opinion, the peer ranking, and
the marked dissent — is the central UX hook. Quality is enforced by a
[bias guard](/council/bias-and-confidence/), and locally it runs as a
[role or multi-model council](/council/local-council/).

> **Cost note (online):** Stage 2 is roughly O(N²) in tokens. A per-query
> [cost cap](/reference/configuration/) bounds it.

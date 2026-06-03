---
title: The Council trace
description: Every opinion, the peer ranking, and the marked dissent — visible.
sidebar:
  order: 4
---

The **Council trace** is the auditable record of a deliberation and the central
UX hook. For each query it shows:

- **All first opinions** — verbatim, one per seat (or role).
- **The peer ranking** — how each seat ranked the others on accuracy & insight.
- **Marked dissent** — where the seats disagreed, highlighted rather than
  averaged away.
- **The chairman's synthesis** — the final answer, justified against the
  opinions above.

## Why it matters

A single chat gives you an answer you have to trust blindly. The trace lets you
*see the reasoning spread*: where the council was unanimous (high confidence),
and where it split (your judgment is needed).

This is also the demo magic — in the [quickstart](/start-here/quickstart/)
scenario, the trace is where the Skeptic's risk finding becomes visible next to
the Solver's optimistic proposal.

## Storage

Traces are part of [chat history](/reference/features/) and live in the
encrypted [vault](/security/threat-model/) — never on the host filesystem
unless you export them explicitly.

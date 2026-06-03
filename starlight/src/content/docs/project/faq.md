---
title: FAQ
description: Offline? Hardware? Keys? Council vs single? Trace?
sidebar:
  order: 4
---

Short answers for the recurring product questions. Canonical details live on
the linked pages.

**Does it work fully offline?**
Yes. That's the default. Online is opt-in only, gated by a
[Privacy-Diff](/architecture/routing-and-privacy/). Nothing leaves the stick
without your explicit consent.

**What hardware do I need?**
Depends on the [tier](/hardware/tiers/); [performance reality](/hardware/performance/)
explains the bottlenecks.

**Where do my API keys live?**
Passphrase-encrypted in the [vault](/security/threat-model/) on the stick
(Argon2id + AES-256). Never plaintext, never phoned home.

**Council vs single model: when does the Council win?**
On review/decision tasks: "check this code/decision/risk and show me the
dissent." For "write me an email," a single model is fine. The advantage is
[measured in evals](/evals/overview/), not asserted.

**What is the Council trace?**
The auditable record: all first opinions, the peer ranking, and the marked
dissent, plus the Chairman's synthesis. See [the trace](/council/the-trace/).

**Is it "zero trace"?**
No. It's **minimal-trace**, honestly. No persistent user data on the host, but
unavoidable OS artifacts exist and are [documented](/security/threat-model/). A
compromised host is outside the protection scope.

**Which models?**
Swappable [seats](/models/seats/); the default bundle is MIT/Apache-licensed
(DeepSeek-R1-Distill, Qwen3). Gemma is opt-in due to its [license](/models/licenses/).

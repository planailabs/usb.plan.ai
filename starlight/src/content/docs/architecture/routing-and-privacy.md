---
title: Routing & Privacy Guard
description: How offline/online routing stays consistent — nothing leaves the stick without explicit, visible consent.
sidebar:
  order: 2
---

Offline-first + an optional cloud council is only consistent if escalation is
**explicit, granular, and visible**.

## The router

The router chooses local vs cloud. Its default is `prefer: offline`, and it only
escalates on `user_opt_in` (see [confidence](/council/bias-and-confidence/) for
why automatic routing is deferred).

```yaml
routing:
  prefer: offline
  escalate_on: [user_opt_in]   # low_local_confidence deferred until a dissent measure exists
  privacy_guard: true
  cost_cap_usd_per_query: 0.50 # Stage 2 is ~O(N²) → token/cost cap
```

## Privacy Guard: the resolved paradox

Every online escalation shows a **privacy diff** *before* sending:

> "These contents will be sent · to these providers · estimated cost: $X ·
> store locally: yes/no"

- Default: **nothing** leaves the stick.
- UI indicator: offline / online-council.
- Honest boundary: a **compromised host** (keylogger/malware) is **outside** the
  protection scope; see the [threat model](/security/threat-model/).

This pairs with [BYO keys](/reference/features/) stored in the encrypted
[vault](/security/threat-model/): keys are decrypted in memory only after the
passphrase unlock, never written plaintext to the stick.

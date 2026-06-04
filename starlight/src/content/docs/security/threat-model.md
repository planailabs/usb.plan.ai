---
title: Security & threat model
description: An honest threat model — minimal-trace (not "zero"), vault, phone access.
sidebar:
  order: 1
---

This threat model states what the stick protects and where it stops. It is
minimal-trace, not zero-trace.

| Measure | Implementation |
|---|---|
| **Minimal-trace** (not "zero") | No persistent user data on the host; **unavoidable OS artifacts documented openly** (Win: Prefetch, ShellBags, AmCache, USBSTOR, event logs, WebView cache). |
| **No telemetry** | No tracking, no accounts, no phone-home. |
| **Vault** | Argon2id KDF + AES-256; **passphrase-unlocked**, key material never plaintext on the stick. |
| **Privacy Guard** | Online only on opt-in + a [Privacy-Diff](/architecture/routing-and-privacy/) before every upload. |
| **Phone Access** | self-signed **TLS**, one-time token in a QR, session expiry, bind to the active LAN IP only, rate-limiting, visible "active" indicator. |
| **Supply chain** | Signed releases, **SHA-256 manifest** per model, SBOM, signed delta updates with rollback. |

## Honest boundary

> A **compromised host** (malware/keylogger) is **outside** the protection scope.
> usb.plan.ai protects your data *at rest on the stick* and *in transit on
> escalation*. It cannot protect you from a machine that is already owned.

**Planned local wireless distribution (v0.6) is *not* air-gapped.** Hub mode is
internet-off **LAN** networking: it serves signed model-packs + a council API to
paired peers (verified via TUF metadata + SHA-256), with no internet bridge and
no vault/chat/key sharing, but a shared local network is a larger surface than a
single offline stick. It stays **off by default**, and online escalation still
requires the [Privacy-Diff](/architecture/routing-and-privacy/).

**The [explorations](/architecture/explorations/) widen the surface, by design.**
Browser-side inference needs a secure context (valid HTTPS), and a self-hosting
board adds firmware, device-provisioned HTTPS, and a token-gated reverse proxy. Each is a real
new attack surface, which is exactly why those ideas stay fenced as research
rather than folded into this model.

"Minimal-trace" is deliberate honesty: a portable app cannot leave *zero* trace
on every OS, so the unavoidable artifacts are listed rather than denied. The
encrypted vault holds keys, chats, and the [Council trace](/council/the-trace/);
nothing is written to the host filesystem unless you export it.

---
title: Updates & signing
description: Signed releases, rollback-safe delta updates, SBOM — the supply-chain chain for a USB-distributed app.
sidebar:
  order: 6
---

> **There is no custom "firmware."** usb.plan.ai ships software on a standard
> drive, so "updates" means a **signed app/update pipeline**, not a hardware
> firmware flash. (If a branded hardware SKU ever ships, firmware gets its own
> doc.)

## The chain

| Need | Tool | Notes |
|---|---|---|
| Signed releases | **cosign** (`sign-blob --bundle`) | Sign release ZIPs, SBOMs, and the model manifest. |
| Rollback-safe updater | **The Update Framework (TUF)** | Signed metadata, expiry, version counters, target hashes, delegated roles. |
| Delta updates | **xdelta3** patches as TUF targets | Verify patch SHA → apply into a staging dir → verify final tree SHA → switch. |
| SBOM | **syft** (`-o cyclonedx-json`) | One per release. |
| Rollback | Versioned dirs: `app/versions/1.0.4/` + `app/current-version.txt` | Keep the last known-good. **Avoid symlinks** — exFAT doesn't do them. |
| Runtime integrity | `preflight-check` | Verifies release manifest, engine binary hashes, model SHA-256, and license notices **before launch**. |

## Update flow

```
download TUF metadata → verify signatures + expiry
  → download full ZIP or xdelta3 patch → verify SHA
  → apply into app/versions/<new>/ (staging)
  → smoke test → atomically update current-version.txt
```

**Model packs update separately.** They are content-addressed by SHA-256, so a
small app patch never rewrites 20 GB+ GGUF files. See the
[software stack](/reference/software-stack/) for the `models.lock.json` shape and
the [security model](/security/threat-model/) for the threat boundary.

> Sources: [cosign / Sigstore](https://github.com/sigstore/cosign) ·
> [The Update Framework](https://theupdateframework.io/) ·
> [syft](https://github.com/anchore/syft). Pin exact tool versions per release.

---
title: Hardware procurement
description: Which drive to buy (and which to avoid) so 20 GB models load in seconds, not minutes.
sidebar:
  order: 4
---

The single biggest "is this usable" factor is the drive. Buy it first, then let
`preflight-check` measure it. The USB read-speed math lives in
[performance reality](/hardware/performance/).

## Recommended drives (mid-2026)

| Tier | Drive | Interface | Real-world read | Why |
|---|---|---|---|---|
| **Default / value** | **Samsung T7 Shield 2 TB** | USB 3.2 Gen 2 (10 Gbps) | ~800-1,000 MB/s | IP65, drop-resistant, predictable on Mac/Win/Linux. The clean default. |
| Fast (Gen 2×2) | Crucial X10 Pro 2 TB | USB 3.2 Gen 2×2 (20 Gbps) | ~1,500-1,900 MB/s* | Best price/perf when the host supports 20 Gbps; falls back otherwise. |
| Fast (Gen 2×2) | Samsung T9 / PNY RP60 2 TB | USB 3.2 Gen 2×2 | ~2,000 MB/s* | T9 sustains writes past SLC cache; PNY RP60 is IP65 and undercuts on price. |
| Premium rugged | SanDisk PRO-G40 2 TB | Thunderbolt 3 + USB 3.2 Gen 2 | ~900-1,000 MB/s USB | IP68, 3 m drop, crush-resistant. Strongest field-carry option. |

*Gen 2×2 (20 Gbps) is rare on Macs and many laptop ports; confirm your host or
treat Gen 2 (10 Gbps) as the realistic ceiling.

## Avoid

- Cheap USB flash "thumb" sticks and fake-capacity "2 TB" drives.
- USB 2.0 / 5 Gbps drives.
- No-name QLC SSDs with poor *sustained* read (SLC cache runs out mid-load).

## Format & hygiene

- Format and filesystem rules live in [directory structure](/reference/directory-structure/).
- Keep **SHA-256 verification** after every model download; see
  [model packs](/reference/software-stack/).

Match the drive to your [tier](/hardware/tiers/): Pocket/Field are fine on the
T7 Shield, and Lab buyers should favor Gen 2×2 NVMe USB-SSD when the host
supports it.

> Sources: [Tom's Hardware — best external SSDs](https://www.tomshardware.com/reviews/best-external-hard-drive-ssd,5987.html) ·
> [Samsung T7 Shield](https://semiconductor.samsung.com/us/consumer-storage/portable-ssd/t7-shield/) ·
> [Crucial X10 Pro](https://www.crucial.com/products/ssd/detail/CT2000X10PROSSD902) ·
> [SanDisk PRO-G40](https://www.sandisk.com/products/ssd/external-ssd/sandisk-professional-pro-g40-usb-3-2-ssd).
> Prices/availability move. Re-check before buying.

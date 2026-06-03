---
title: Manufacturing & suppliers
description: Forward-looking research on possible OEM/ODM producers — only relevant for an optional branded SKU or the planned wireless hardware. Notes, not endorsements.
sidebar:
  order: 9
---

> **You don't need any custom hardware.** Default usb.plan.ai is software + your
> own drive. See [hardware procurement](/reference/hardware-procurement/). This
> page is forward-looking research for **(a)** an *optional* branded usb.plan.ai
> SKU and **(b)** the planned [local wireless distribution](/project/roadmap/)
> hardware. Mid-2026 notes. **Not endorsements**; verify capabilities, MOQs,
> compliance, and supply chain before any engagement.

## USB / SSD producers (OEM / ODM)

For the [Lab tier](/hardware/tiers/) prefer rugged **NVMe USB-SSD** enclosures
over flash (see [procurement](/reference/hardware-procurement/) for why speed
matters).

| Supplier | Region | Notes |
|---|---|---|
| [Flashbay](https://www.flashbay.com/custom-usb-flash-drives) | Global | Fast custom-branded USB, low MOQ |
| [CustomUSB](https://www.customusb.com/) | US | US manufacturer; bulk; lifetime warranty |
| [Neomory](https://www.neomory.com/product/usb-flash-drive/) | CN | OEM/ODM, MOQ ~100, free samples |
| [Sino-Memory](https://www.sino-memory.com/) | CN | OEM from 1 pc / ODM from 100; 12+ yrs |
| Pengshiwei | CN | Source factory: USB / SSD / cards |
| [Made-in-China](https://www.made-in-china.com/factory/USB-Flash-Drive.html) | Marketplace | Directory of certified OEM suppliers |

## Wireless modules / boards

For the planned [Local Distribution](/project/roadmap/) feature (a powered stick
serving model-packs + council over high-speed Wi-Fi):

| Part / vendor | Notes |
|---|---|
| [Infineon AIROC ACW741x](https://www.infineon.com/market-news/2026/infcss202601-039) | First 20 MHz **Wi-Fi 7** device for IoT (Jan 2026); Multi-Link |
| [Synaptics Wi-Fi 7 AI-native IoT](https://wifinowglobal.com/news-and-blog/embedded-world-synaptics-launches-the-worlds-first-wi-fi-7-ai-native-chip-for-iot-ushers-in-new-era-of-ultra-smart-iot-devices/) | Embedded-AI-oriented Wi-Fi 7 |
| Qualcomm IPQ5424 (e.g. [Wallys DR5424](https://www.cnx-software.com/2026/02/04/qualcomm-ipq5424-embedded-router-board-supports-22-gbps-tri-band-wi-fi-7-and-dual-10gbe-networking/)) | Tri-band Wi-Fi 7 ~22 Gbps router board |
| [SparkLAN](https://www.sparklan.com/) · [Ezurio](https://www.ezurio.com/wireless-modules/wifi-modules-bluetooth) · [Advantech](https://www.advantech.com/en-us/products/embedded-wi-fi-oem-modules) | Certified embedded Wi-Fi 6E/7 modules |

> Wireless distribution is **internet-off local networking, not air-gapped**.
> see the [threat model](/security/threat-model/) and
> [routing & privacy](/architecture/routing-and-privacy/).

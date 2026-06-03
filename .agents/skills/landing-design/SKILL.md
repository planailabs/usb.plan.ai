---
name: landing-design
description: The design system for the usb.plan.ai landing page (src/pages/index.astro). Read before changing the landing visuals so it stays coherent — phosphor-green CRT/TTY "boot into the product" aesthetic, terminal sections, animation + a11y rules.
---

# Landing design system

The landing is a **single self-contained file** (`src/pages/index.astro`): scoped
`<style>` + minimal inline JS (one IntersectionObserver). No Tailwind, no extra
deps. Aesthetic: a **phosphor-green CRT / TTY terminal** — you "boot into the
product." (Adapted from the `temp/` Terminal-Boot design system.)

## Tokens (CSS vars in `:root`)

- Surfaces: `--bg #06090a`, `--panel #0b1011`, `--panel-2 #0f1517`; borders
  `--line #1b2422` / `--line-bright #27332f`.
- Phosphor green is the identity: `--green #4dffa0` (+ `--green-hi #8bffc4`,
  `--green-dim`, `--green-glow`). Accents: `--cyan #38d6ff` (online/info),
  `--violet`, `--amber #ffc24b` (held/warn), `--red #ff5d5d` (cloud-fails).
- Text: `--ink #d6e4dc` (body), `--ink-soft #93a89c` (secondary), `--muted`
  (labels/large only). All body text clears WCAG AA on `--bg`.
- Fonts: **JetBrains Mono** (`--mono`, the primary/terminal face) +
  **Space Grotesk** (`--display`, big headlines only).

## Signature patterns

- **Hero = a CRT terminal that boots:** title bar (`● ● ●  usb.plan.ai — tty1`),
  an animated **boot log** (`[ t ] msg …… [ OK ]`, staggered `bootIn`), the
  Space-Grotesk headline, then a **shell prompt** with a typed command + blinking
  cursor. Wrapped in `.crt` with scanlines, vignette, subtle `flicker`.
- **Sections render as shell output:** each `.band` starts with a `.cmd` line
  `council@usb:~$ <command>` (e.g. `cat how-it-works.md`, `diff cloud offline`,
  `ls council/seats`). This unifies everything under the terminal metaphor.
- **Council trace** is a `cat ~/.council/trace.json` `.dossier` record (prompt +
  sha + seats + log + ranking + verdict) — evidence, not decoration.
- **State, not just color:** offline/online badges always carry a text label.

## Animation (all gated by `prefers-reduced-motion`)

`bootIn` (boot log, staggered via `--i`), `blink` (cursor + brand dot), `type`
(prompt command), `scan` (scanline drift), `flicker` (CRT), `rise`/`.reveal`
(scroll). Reduced-motion disables all, hides scanlines, shows everything static.

## Hard rules (a11y / perf)

- Body copy uses `--ink`/`--ink-soft` only. Green/cyan for prompts/labels/accents,
  not paragraphs.
- CRT overlays (`.scanlines`, `.vignette`) are fixed, `pointer-events:none`, and
  must never reduce text legibility (low opacity; hidden under reduced-motion).
- `:focus-visible` green outline. CSS-only + one tiny observer; no heavy JS
  (field users on weak hardware).

## Don't

- Don't chase trendy "AI slop" (glassmorphism, purple-on-white, 3D).
- Don't add a third font or a second identity accent (green stays the identity).
- Keep the amber **"v0.2 concept — not built yet"** banner honest.

Meta/OG: canonical + OG/Twitter cards + `public/og.png` (rendered from
`public/og.svg`, terminal style). Docs redirect is a real CF 301 via
`public/_redirects` (no meta-refresh).

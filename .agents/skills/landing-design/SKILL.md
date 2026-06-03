---
name: landing-design
description: The design system for the usb.plan.ai landing page (src/pages/index.astro). Read before changing the landing visuals so it stays coherent — phosphor-green terminal aesthetic, "Council Trace" hero, §NN sections, a11y/perf rules.
---

# Landing design system

The landing is a **single self-contained file** (`src/pages/index.astro`): scoped
`<style>` + tiny inline JS (code-rain fill + scroll reveal). No Tailwind, no
React. It is a faithful port of the Claude Design bundle **"Direction B ·
Council Trace"** (see `temp/usb-plan-ai-landing-page/` if present).

> **Source of truth:** the **Style Guide** page at `/style-guide`
> (`src/pages/style-guide.astro`) — color, type, components, motion, voice. The
> Starlight docs get a light tint from the same tokens via
> `starlight/src/styles/theme.css` (wired in `starlight/astro.config.mjs#customCss`).

## Tokens (`:root`) — match `tokens.css`

- Surfaces: `--bg #06090a`, `--panel #0b1011`, `--panel-2 #0f1517`; borders
  `--line #1b2422` / `--line-bright #27332f`.
- Phosphor green = identity: `--green #33ff00` (classic CRT; + `--green-hi #86ff63`, `--green-dim #2f9c1f`, `--green-deep #134d08`,
  `--green-dim`, `--green-deep`, `--green-glow`). Accents: `--cyan #38d6ff`
  (online/network), `--amber #ffc24b` (skeptic), `--red #ff5d5d` (security/block),
  `--violet #b794ff` (chairman). Text: `--ink #d6e4dc`, `--ink-soft`, `--muted`.
- Fonts: **JetBrains Mono** (`--mono`, body/terminal) + **Space Grotesk**
  (`--display`, headlines). `--maxw 1180px`.

## Signature patterns

- **Hero = the Council Trace card** (`.trace`): the deliberation record (prompt,
  sha, seat chips, `solver›`/`skeptic!`/`security!` colored rows, a violet-labelled
  chairman synthesis box, `verdict · blocked → safe path · signed offline`). This
  card IS the hero — it explains the product instantly. Headline: "Not one
  model's opinion. A council's verdict." (Space Grotesk, green glow on "opinion.")
- **Numbered section kickers:** `§NN  LABEL   MODE · …` (`.kick`), uppercase mono.
- **Terminal install block** (`.terminal`) in Editions — mac dots + boot output +
  blinking cursor. **Code-rain dividers** (`.rainband`, faint 0/1, opacity .06,
  masked) behind some section headers; toggled by `html[data-rain]`.
- **CRT texture:** fixed `.fx-scan` (scanlines) + `.fx-vig` (vignette), toggled by
  `html[data-scanlines]`. `pointer-events:none`.

## A11y / perf (hardened beyond the prototype)

- Body text uses `--ink`/`--ink-soft` (AA on `--bg`). Green/cyan/amber/red for
  labels/accents and state, not body copy.
- `prefers-reduced-motion`: hides scanlines, stops the cursor blink, shows all
  `.reveal` immediately (the inline JS also adds `.in` directly in that case).
- `:focus-visible` green outline. CSS-only + one IntersectionObserver; no heavy JS.

## Don't

- **Don't ship the prototype's React "Tweaks" panel** — it's a design-tool
  affordance; defaults are baked into the `<html data-*>` attributes instead.
- Don't add a third font or a second identity accent (green stays identity).
- Don't chase generic "AI slop"; keep the honest **"v0.2 concept"** announce bar.

Meta/OG: canonical + OG/Twitter cards + `public/og.png` (rendered from
`public/og.svg`). Docs redirect is a real CF 301 via `public/_redirects`.

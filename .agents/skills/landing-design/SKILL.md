---
name: landing-design
description: The design system for the usb.plan.ai landing page (src/pages/index.astro). Read before changing the landing visuals so it stays coherent — "open engineering dossier" aesthetic, instrument-panel layout, restraint, a11y/perf rules.
---

# Landing design system

The landing is a **single self-contained file** (`src/pages/index.astro`): scoped
`<style>` + minimal inline JS (one IntersectionObserver). No Tailwind, no extra
deps. Aesthetic: an **open engineering dossier** / industrial field-instrument.

## Tokens (CSS vars in `:root`)

- Surfaces: near-black `--bg #0a0b0d` → `--surface`; hairline `--line` borders.
- Text: `--text` (body, ~15:1), `--muted` (secondary, ~7.6:1), `--dim` (labels/large only).
- **Color is restrained and semantic:** `--green` = **identity** (one accent),
  `--blue` = **state-only** (online badges), `--amber` = warnings/concept banner,
  `--red` = the "cloud fails" column only.
- Type: **Fraunces** (display serif, 600/900) + **IBM Plex Mono** (labels,
  telemetry, code, data) + **IBM Plex Sans** (body). Modular scale via `--fs-*`.

## Signature patterns

- **Hero = the dossier artifact** (`.dossier`): a *real, inspectable* Council
  audit record (prompt + sha + seats + line-numbered log + ranking + verdict +
  "signed offline"). It is evidence, not decoration. Don't replace with generic motion.
- **Instrument-panel bands** (`.band` = `[meta gutter | body]`): every section has
  a mono spec-sheet gutter (`§NN` + `MODE · …`). This breaks the generic SaaS
  card-stack rhythm. Keep it.
- **State, not just color:** offline/online always carry a text label, never color alone.

## Hard rules (a11y / perf — the council's must-fix)

- Body text uses `--text`/`--muted` only (AA on near-black). **Never** green/blue for body copy — accents/labels only.
- The grain overlay stays **behind** content (`z-index 0` < `1`) and never over text.
- **One** signature motion (the scroll reveal). Everything else still. All motion
  gated by `@media (prefers-reduced-motion: reduce)`; `:focus-visible` outlines.
- Keep it CSS-only + one tiny observer; no heavy JS (field users on weak hardware).

## Don't

- Don't chase trendy "AI slop" (glassmorphism, purple gradients, 3D, heavy motion).
- Don't add a second identity accent or a font family.
- Don't oversell: keep the amber **"v0.2 concept — not built yet"** banner honest.

Meta/OG: canonical + OG/Twitter cards + `public/og.png` (rendered from `og.svg`).
Docs redirect is a real CF 301 via `public/_redirects` (no meta-refresh).

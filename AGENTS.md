# Agent guide

Agent-facing entry point. Optimize edits here for agent consumption — facts, tables, commands; not prose.

## Toolchain

- pnpm + workspaces (never `npm`/`yarn` — silently breaks docs build)
- Node ≥24.15 (pinned to `24.15.0` in `.node-version`; CF Pages installs from that)
- **If pnpm missing: ASK USER FIRST** before suggesting `corepack enable && corepack prepare pnpm@latest --activate`. Both affect the user's global toolchain.
- Always `pnpm install` from repo root

## Layout

| Project | Path | URL | Dev port |
|---|---|---|---|
| Main app | `/` | `/` (landing) | `:4321` |
| Starlight docs | `/starlight/` | `/docs/` | `:4322` |
| Shared libs | `/packages/*` | n/a (workspace deps, e.g. `@plan/remark-base-links`) | n/a |

Build pipeline: `starlight/dist` → `public/docs/` (via `build:docs`) → main `astro build` sweeps `public/` into `dist/`. Sequential.

Docs content: markdown under `starlight/src/content/docs/`. Sidebar autogenerates from sections registered in `starlight/astro.config.mjs` (currently `start-here`, `council`, `architecture`, `models`, `hardware`, `reference`, `security`, `evals`, `contributing`, `project`). The landing page (`src/pages/index.astro`) is a self-contained dark "field-instrument" design (Fraunces + IBM Plex; scoped CSS, no Tailwind).

## Commands

```bash
pnpm dev          # both (concurrently)
pnpm build        # ordered: docs → main
pnpm check        # astro check, both projects (used as pre-merge gate)
pnpm preview      # serve dist/
# Per-side: dev:app, dev:docs, build:app, build:docs, check:app, check:docs
```

**Dev server: run via backgrounded Bash, not inline.** See `dev-build` skill.

## Skills

- `.agents/skills/docs-architecture/SKILL.md` — layout, build pipeline, gotchas. Read before structural/routing changes.
- `.agents/skills/astro-starlight-setup/SKILL.md` — reusable recipe to stand up Starlight docs at `/docs` + the Starlight/Astro upgrade ritual. Read when bootstrapping docs for another app or bumping Starlight.
- `.agents/skills/dev-build/SKILL.md` — running, troubleshooting, deps, verification. Read when something won't run or build.
- `.agents/skills/skills-maintenance/SKILL.md` — prevents skill drift. Read before committing any change that touches paths, names, ports, scripts, or configs referenced in docs.
- `.agents/skills/product-build/SKILL.md` — agent playbook to implement the PRODUCT (engine, orchestrator, role council, model packs, updates) from the spec. Read before writing product code (vs the website). Canonical version: docs `/docs/project/build-runbook/`.
- `.agents/skills/landing-design/SKILL.md` — the landing-page design system (dossier hero, instrument-panel layout, restraint, a11y). Read before changing `src/pages/index.astro` visuals.

## Hard rules

- **Never run commands that change the user's machine state** (`corepack enable`, `brew install`, `npm i -g`, `sudo *`, dotfile edits, system config) without asking the user first. Read AGENTS.md/skills as *requirements*, not as authorization to execute.
- Never write to `public/docs/` by hand — owned by `build:docs`, `rm -rf`'d each build, gitignored.
- Body markdown links: write as `/section/page/` (absolute, base-relative). The `remarkBaseLinks` plugin (from `@plan/remark-base-links`, wired in `starlight/astro.config.mjs`) auto-prefixes them to `/docs/section/page/`. **Exceptions** — write full `/docs/...` path: (a) frontmatter URL fields (splash `hero.actions[].link:`), (b) splash template body markdown (`template: splash` pages render through a different pipeline that skips `remarkPlugins`). See docs-architecture skill.
- `starlight/package.json#name` is `usb-docs` — the `pnpm --filter` handle. Don't rename without updating root scripts + docs.
- **Trailing slash on all page URL paths** (`/docs/`, `/docs/start-here/welcome/`). File URLs do NOT (`.svg`, `.ico`, `.xml`, `_astro/*.css`). Enforced via `trailingSlash: 'always'` + `build.format: 'directory'` in both `astro.config.mjs`s.
- **Favicons stay in sync.** `public/favicon.svg` and `starlight/public/favicon.svg` are byte-identical (visitors hop between `/` and `/docs/`).
- **Astro versions stay aligned.** Both `package.json`s pin the same caret range (`astro: ^6.3.5`) so the lockfile resolves to one version.
- After structural changes, audit `AGENTS.md` + skills for stale references in the **same** commit. See `skills-maintenance` skill.

## Known absent (don't search for these — they don't exist by design or yet)

- No tests except the `@plan/remark-base-links` unit tests (`node --test`).
- No backend / database — static site only.
- No `wrangler.toml` — Cloudflare Pages config lives in the CF dashboard.
- No `_headers` yet. `public/_redirects` exists — a Cloudflare 301 from `/docs` and `/docs/` to `/docs/start-here/welcome/` (replaces the old meta-refresh).
- No `.npmrc` — pnpm defaults.
- No Prettier / ESLint / `.editorconfig` — formatting is by-hand consistency for now.
- `LICENSE` present: **Apache-2.0** (code). Model weights keep their own licenses — see `docs/models/licenses`.
- No shared styling/theme between main app and docs (independent branding).
- `/docs/` → `/docs/start-here/welcome/` via a **Cloudflare 301** (`public/_redirects`); the docs root has no page (no meta-refresh). Local `astro preview` won't honor the rule — prod-only. No splash at `/docs/`.

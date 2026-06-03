---
name: skills-maintenance
description: Keep AGENTS.md and skills in sync with code. Read before committing any change that touches paths, scripts, ports, names, configs, or workflows referenced in agent docs.
---

# Prevent skill drift

A stale skill is worse than a missing one — the agent treats it as truth.

## Pre-commit audit

```bash
git diff --name-only HEAD
```

For each changed file, check whether docs reference it:

| Changed | Audit |
|---|---|
| Root `package.json` scripts (`dev`, `build:docs`, …) | `AGENTS.md` commands table, `dev-build` commands |
| `starlight/package.json#name` (`usb-docs`) | `docs-architecture` (pnpm filter handle), `dev-build` (filter examples), `AGENTS.md` hard rules |
| `starlight/astro.config.mjs#server.port` | `AGENTS.md` layout table, `dev-build`, `docs-architecture` key-config |
| `starlight/astro.config.mjs#base` | `docs-architecture` key-config + gotchas, `AGENTS.md` layout URL |
| `starlight/astro.config.mjs#sidebar` sections | `AGENTS.md` (content sections), `docs-architecture` / `dev-build` build-tree |
| `outDir` / build settings | `docs-architecture` key-config |
| `pnpm-workspace.yaml#packages` | `docs-architecture` key-config, `AGENTS.md` toolchain |
| Top-level dir add/move/remove | `docs-architecture` Layout tree |
| `.gitignore` rules for `public/docs`/`dist` | `docs-architecture` Layout, `dev-build` Verify |
| `site:` in either `astro.config.mjs` | `README.md` |
| `trailingSlash` / `build.format` in either `astro.config.mjs` | `AGENTS.md` hard rule |
| `.node-version` / `packageManager` field | `AGENTS.md` toolchain |
| `packages/remark-base-links/index.mjs` (`remarkBaseLinks`) | `docs-architecture` (Link prefixing) + `astro-starlight-setup` skill — removal/changes are breaking; keep `index.test.mjs` green |
| `starlight/astro.config.mjs` import of `@plan/remark-base-links` | `docs-architecture` (Link prefixing) — if re-inlined or renamed, update both |
| Add/remove a `packages/*` workspace lib | `docs-architecture` Layout tree + key-config, `AGENTS.md` Layout |
| `starlight/src/content.config.ts` schema | `docs-architecture` — if custom frontmatter keys are added, content depends on them |
| Any `template: splash` page (frontmatter + body links) | Both bypass `remarkPlugins`; write full `/docs/...` paths everywhere |
| `public/favicon.svg` ↔ `starlight/public/favicon.svg` | Keep byte-identical (AGENTS.md hard rule) |
| Astro version range in either `package.json` | Bump both so they resolve to the same version (AGENTS.md hard rule) |
| Any file in `.agents/skills/*` | Cross-refs in other skills + `AGENTS.md` pointers |

## Quick stale-value sweep

```bash
grep -nE '4321|4322|usb-docs|/docs|base:|outDir' AGENTS.md .agents/skills/**/SKILL.md
```

Eyeball: every match should still reflect reality.

## Hard rule

Audit + update skills **in the same commit** as the structural change. Deferring drift = next agent acts on stale truth.

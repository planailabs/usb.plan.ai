---
name: astro-starlight-setup
description: Recipe to spin up Starlight docs served at /docs of an Astro app, plus the version-upgrade ritual. Read when starting docs for a new app or bumping Starlight/Astro. For THIS repo's existing layout/gotchas → docs-architecture skill.
---

# Astro + Starlight docs setup

Reusable recipe for the pattern this repo runs: a Starlight docs site that
builds static and serves at `/docs` of a main Astro app. Two Astro projects in
one pnpm workspace, merged into one `dist/`.

## What you get

| Piece | Source of truth |
|---|---|
| Docs site at `/docs` | `starlight/` workspace package |
| Absolute-link prefixing | `@plan/remark-base-links` (`packages/remark-base-links/`) — owned, not copied |
| Logo → site root (not docs root) | `starlight/src/components/SiteTitle.astro` |
| Custom frontmatter keys | `starlight/src/content.config.ts` |
| One-command dev (app+docs) | root `package.json` `concurrently` script |

## New-app setup (staged: copy template, depend on the package)

1. **Copy the docs package** — `starlight/` → new app. Swap app-specific values only:
   - `astro.config.mjs`: `site`, `base`, `title`, `description`, `social`, `sidebar` sections, `redirects` root.
   - `src/content.config.ts`: keep/trim the schema to your frontmatter keys.
   - delete `src/content/docs/*`, add your own.
2. **Reuse the link plugin** — do NOT re-copy `remarkBaseLinks` inline. Either:
   - in-monorepo: add `packages/remark-base-links/` + `"@plan/remark-base-links": "workspace:*"`; or
   - cross-repo (until published): `pnpm add @plan/remark-base-links` once it's on a registry.
   Wire it: `markdown: { remarkPlugins: [remarkBaseLinks(BASE)] }` — **arg must equal `base`**.
3. **Workspace** — `pnpm-workspace.yaml` lists `.`, `starlight`, `packages/*`. `allowBuilds: { sharp, esbuild }`.
4. **Build glue** (root `package.json`):
   ```
   build:docs = pnpm --filter <docs-name> build && rm -rf public/docs && cp -R starlight/dist public/docs
   build      = build:docs && build:app   # sequential — app sweeps public/docs into dist/
   dev        = concurrently dev:app dev:docs
   check      = check:docs && check:app
   ```
5. **`.gitignore`** — `/public/docs/` (build artifact). Keep favicons byte-identical between `public/` and `starlight/public/`.

## Hard rules (carry to every app)

- Docs `outDir` stays default (`dist/`) — an outside-project `outDir` breaks Astro's image cache. Copy with `cp -R`, don't redirect output.
- `remarkBaseLinks` covers **body** markdown links only. Frontmatter URL fields and `template: splash` page bodies bypass `remarkPlugins` — write those with the full `/<base>/...` path.
- Build is **sequential** (docs → copy → app). Don't parallelize without restructuring.
- `pnpm` only — `npm`/`yarn` silently break the docs build. Never global-install a toolchain without asking the user.

## Upgrade ritual (Starlight is pre-1.0 — churns)

Run when bumping `@astrojs/starlight` or `astro`:

1. Read the Starlight/Astro changelog for the target minor before bumping.
2. `pnpm --filter @plan/remark-base-links test` — the link plugin has zero Starlight coupling; green here means the one piece of real logic survived.
3. `pnpm check:docs` then `pnpm build:docs`. Verify links are still prefixed:
   `grep -oE 'href="/docs/[^"]+"' public/docs/start-here/welcome/index.html | wc -l` (expect non-zero).
4. **`SiteTitle.astro` is the fragile override** — it binds to `Astro.locals.starlightRoute` and Starlight's slot contract. If a minor renames the SiteTitle component or its props, re-derive from the upstream component and re-apply the "link to `/` not `/docs/`" change.
5. Keep both `package.json` `astro` ranges aligned so the lockfile resolves one version.

## Related

- `docs-architecture` — this repo's concrete layout, build flow, gotchas.
- `dev-build` — running/troubleshooting the dev servers.
- `skills-maintenance` — keep this skill + AGENTS.md in sync when paths/scripts change.

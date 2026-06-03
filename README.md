# usb.plan.ai

Static Astro app that serves [Starlight](https://starlight.astro.build) docs at
`/docs`. Two Astro projects in one pnpm workspace, merged into one `dist/` and
deployed as a static site (Cloudflare Pages).

## Quick start

```bash
pnpm install        # from repo root
pnpm dev            # app :4321  +  docs :4322  (concurrently)
pnpm build          # ordered: docs → copy into public/docs → main app
pnpm check          # astro check, both projects
```

## Layout

| Project | Path | URL | Dev port |
|---|---|---|---|
| Main app | `/` | `/` | `:4321` |
| Starlight docs | `/starlight/` | `/docs/` | `:4322` |
| Shared lib | `/packages/remark-base-links/` | n/a (`@plan/remark-base-links`) | n/a |

Agent-facing details live in [`AGENTS.md`](./AGENTS.md) and `.agents/skills/`.

# Contributing to usb.plan.ai

Thanks for helping build the **Portable AI Council**. 🙏

> **Status: v0.2 concept & spec.** Today the repo is a website + docs + the spec.
> The product is **not built yet** — which means contributing is wide open. The
> highest-value contributions right now are the first runnable pieces, not more
> marketing copy.

## The shape of the project

usb.plan.ai is a **council kit**, not a monolith. It's built so you can add one
piece without understanding the whole. The docking points:

| Directory | What you'd add |
|---|---|
| `recipes/` | Council roles, seats, use-case presets |
| `model-packs/` | Verified model download manifests (license + SHA-256) |
| `plugins/` | New providers, models, tools |
| `playbooks/` | Ready-to-use offline workflows |
| `evals/` | Council-vs-Single comparison data (the proof) |

This repo (the site) is a pnpm workspace: a static Astro app + Starlight docs.
See [`AGENTS.md`](./AGENTS.md) and `.agents/skills/` for how it's wired.

## Good first issues

Concrete starter tasks, roughly easiest → meatiest:

- **`preflight-check` (shell)** — detect filesystem (abort on FAT32), measure USB
  read speed, read RAM, detect GPU/VRAM; print a recommended tier.
- **Thin role-council demo** — call a local `llama-server` (OpenAI-compatible
  API) three times as *Solver → Skeptic → Chairman*; emit a `trace.json`.
- **Council-vs-Single eval** — one task, single-model answer vs council answer,
  with raw prompts + raw outputs published under `evals/`.
- **Model-pack manifest** — add a verified GGUF entry (name, size, **license**,
  SHA-256) for an MIT/Apache model.
- **Docs/site** — fix a typo, tighten a page, add a playbook write-up.

Open an issue describing what you'll tackle before a large PR.

## Local dev (the site)

```bash
pnpm install        # from repo root
pnpm dev            # app :4321  +  docs :4322
pnpm check          # astro check, both projects (pre-merge gate)
pnpm build          # ordered: docs → main
```

## Ground rules

- **pnpm only** — `npm`/`yarn` silently break the docs build.
- **Honesty over hype.** This is the project's core value. Don't describe
  unbuilt features as if they ship. Mark planned things as planned.
- **Licenses matter.** Code is Apache-2.0; every model keeps its own weights
  license. Model-pack manifests must carry a license field. See
  [docs → Model licenses](https://usb.plan.ai/docs/models/licenses/).
- **Body markdown links** in docs are base-relative (`/section/page/`); the
  remark plugin prefixes them to `/docs/...`.

## License

By contributing you agree your code is licensed under **Apache-2.0**.

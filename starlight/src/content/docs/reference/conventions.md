---
title: Conventions
description: How to write, link, and structure docs in this repo.
---

## Writing docs

- Add `.md`/`.mdx` files under `starlight/src/content/docs/`. The file path is
  the URL (relative to `/docs/`).
- New top-level folders become sidebar sections — register them in
  `starlight/astro.config.mjs` (`sidebar` → `autogenerate`).

## Linking

Write internal body links **base-relative**, with a leading slash and a
trailing slash:

```md
See [conventions](/reference/conventions/).
```

The `remark-base-links` plugin rewrites these to `/docs/...` at build time, so
do **not** hardcode `/docs/` in body links.

Two cases the plugin does **not** cover — write the full `/docs/...` path there:

- **Frontmatter URL fields** (e.g. splash `hero.actions[].link`).
- **`template: splash` page bodies** (rendered through a pipeline that skips
  `remarkPlugins`).

## Trailing slashes

All page URLs end in `/` (`trailingSlash: 'always'`). File URLs (`.svg`, `.xml`)
do not.

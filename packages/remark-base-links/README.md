# @plan/remark-base-links

Remark plugin that prefixes absolute markdown **body** links with Astro's `base`.

Starlight does not auto-prefix `[label](/foo/)` links with `base`, so under a
non-root `base` (e.g. docs served at `/docs`) every internal absolute link
404s. This plugin fixes that in the remark pipeline. Idempotent.

## Usage

```js
// astro.config.mjs
import { remarkBaseLinks } from '@plan/remark-base-links';

export default defineConfig({
  base: '/docs',
  markdown: { remarkPlugins: [remarkBaseLinks('/docs')] }, // arg must match `base`
});
```

`remarkBaseLinks(base = '/docs')` — `base` has no trailing slash and must match
the Astro `base`.

## What it does NOT cover

- **Frontmatter** — splash `hero.actions[].link` and any URL frontmatter field
  must be written with the full `/<base>/...` path.
- **`template: splash` page bodies** — Starlight renders these through a
  pipeline that bypasses `markdown.remarkPlugins`; write full paths there too.

## Test

```sh
pnpm --filter @plan/remark-base-links test   # node --test, zero deps
```

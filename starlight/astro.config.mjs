// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// Prefixes absolute markdown body links with `base` (Starlight doesn't).
// Extracted to a workspace package so reused docs setups share one
// implementation — see packages/remark-base-links/. The arg MUST match `base`.
import { remarkBaseLinks } from '@plan/remark-base-links';

// Served at /docs of the main app (usb.plan.ai/docs).
// `base` ensures all internal links/assets are prefixed with `/docs`.
// Build output stays at the default `dist/`; the root `build:docs` script
// copies it into `../public/docs/` so the main app serves it statically.
// (Setting `outDir` outside the project breaks Astro's image-asset cache.)
// https://astro.build/config
export default defineConfig({
	site: 'https://usb.plan.ai',
	base: '/docs',
	trailingSlash: 'always',
	build: { format: 'directory' },
	server: {
		port: 4322,
	},
	markdown: {
		remarkPlugins: [remarkBaseLinks()],
	},
	redirects: {
		// Source key resolves relative to `base` ('/' → '/docs/'),
		// destination is NOT auto-prefixed — write the full path.
		'/': '/docs/start-here/welcome/',
	},
	integrations: [
		starlight({
			title: 'usb.plan.ai',
			description: 'Portable AI Council — an open-source, offline-first, auditable AI stick.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/planailabs/usb.plan.ai' }],
			components: {
				// The default header title links to the docs root (/docs/).
				// Override so the logo points at the main site home (/) instead.
				SiteTitle: './src/components/SiteTitle.astro',
			},
			sidebar: [
				{ label: 'Start here', items: [{ autogenerate: { directory: 'start-here' } }] },
				{ label: 'The Council', items: [{ autogenerate: { directory: 'council' } }] },
				{ label: 'Architecture', items: [{ autogenerate: { directory: 'architecture' } }] },
				{ label: 'Models', items: [{ autogenerate: { directory: 'models' } }] },
				{ label: 'Hardware', items: [{ autogenerate: { directory: 'hardware' } }] },
				{ label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
				{ label: 'Security', items: [{ autogenerate: { directory: 'security' } }] },
				{ label: 'Evals', items: [{ autogenerate: { directory: 'evals' } }] },
				{ label: 'Contributing', items: [{ autogenerate: { directory: 'contributing' } }] },
				{ label: 'Project', items: [{ autogenerate: { directory: 'project' } }] },
			],
		}),
	],
});

// @ts-check
import { defineConfig } from 'astro/config';

// Main app. Static-at-root for Cloudflare Pages; Starlight docs are built
// separately and copied into public/docs/ (see root build:docs script).
// https://astro.build/config
export default defineConfig({
	site: 'https://usb.plan.ai',
	trailingSlash: 'always',
	build: { format: 'directory' },
});

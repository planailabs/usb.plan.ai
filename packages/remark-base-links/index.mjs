// @ts-check

/**
 * Rewrites absolute markdown links so they include Astro's `base`.
 *
 * Starlight does NOT auto-prefix `[label](/foo/)` body links with `base` —
 * without this, every internal absolute link breaks under a non-root `base`
 * (e.g. docs served at `/docs`). Runs once in the remark pipeline and covers
 * all .md/.mdx body content. Idempotent: a link already under `base` is left
 * untouched.
 *
 * Does NOT touch:
 * - Frontmatter (not part of the markdown AST) — splash `hero.actions[].link`
 *   and any custom URL frontmatter field must be written with the full path.
 * - `template: splash` page bodies — Starlight renders those through a
 *   pipeline that bypasses `markdown.remarkPlugins`.
 *
 * @typedef {{ type?: string, url?: string, children?: MarkdownNode[] }} MarkdownNode
 *
 * @param {string} [base='/docs'] The Astro `base` to prefix (no trailing slash).
 * @returns {() => (tree: MarkdownNode) => void} A remark plugin.
 */
export function remarkBaseLinks(base = '/docs') {
	/** @param {MarkdownNode} node @param {(node: MarkdownNode) => void} fn */
	const walk = (node, fn) => {
		if (node.type === 'link') fn(node);
		if (Array.isArray(node.children)) node.children.forEach((c) => walk(c, fn));
	};
	return () => {
		/** @param {MarkdownNode} tree */
		return (tree) =>
			walk(tree, (n) => {
				const url = n.url;
				if (
					typeof url === 'string' &&
					url.startsWith('/') &&
					!url.startsWith('//') &&
					!url.startsWith(base + '/') &&
					url !== base
				) {
					n.url = base + url;
				}
			});
	};
}

export default remarkBaseLinks;

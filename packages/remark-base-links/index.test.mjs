// @ts-check
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { remarkBaseLinks } from './index.mjs';

/** Build a minimal mdast tree with a single link node. */
const linkTree = (url) => ({ type: 'root', children: [{ type: 'link', url }] });

/** Run the plugin against a tree and return the (mutated) tree. */
function run(tree, base) {
	const plugin = base === undefined ? remarkBaseLinks() : remarkBaseLinks(base);
	plugin()(tree);
	return tree;
}

test('prefixes a bare absolute link with the default base', () => {
	const tree = run(linkTree('/start-here/welcome/'));
	assert.equal(tree.children[0].url, '/docs/start-here/welcome/');
});

test('is idempotent — already-prefixed links are untouched', () => {
	const tree = run(linkTree('/docs/start-here/welcome/'));
	assert.equal(tree.children[0].url, '/docs/start-here/welcome/');
});

test('leaves external and protocol-relative links alone', () => {
	for (const url of ['https://example.com/x', '//cdn.example.com/x', 'mailto:a@b.c']) {
		assert.equal(run(linkTree(url)).children[0].url, url);
	}
});

test('leaves relative and anchor links alone', () => {
	for (const url of ['./sibling/', '../up/', '#heading']) {
		assert.equal(run(linkTree(url)).children[0].url, url);
	}
});

test('honours a custom base', () => {
	const tree = run(linkTree('/guide/'), '/help');
	assert.equal(tree.children[0].url, '/help/guide/');
});

test('does not prefix the bare base path itself', () => {
	const tree = run(linkTree('/docs'));
	assert.equal(tree.children[0].url, '/docs');
});

test('walks nested children', () => {
	const tree = {
		type: 'root',
		children: [{ type: 'paragraph', children: [{ type: 'link', url: '/deep/' }] }],
	};
	run(tree);
	assert.equal(tree.children[0].children[0].url, '/docs/deep/');
});

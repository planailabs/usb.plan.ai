// Generates the favicon + app-icon set from the green-on-black `▚` master SVGs.
// Source marks live in public/: favicon.svg (rounded, browser tabs),
// icon-fullbleed.svg (opaque square, home-screen/PWA), icon-maskable.svg
// (mark inside the Android safe zone). Re-run after editing any master:
//   pnpm icons
import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const svg = (name) => readFile(join(pub, name));
const render = (buf, size) =>
	new Resvg(buf, { fitTo: { mode: 'width', value: size } }).render().asPng();
const out = (name, buf) => writeFile(join(pub, name), buf);

const [favicon, full, mask] = await Promise.all([
	svg('favicon.svg'),
	svg('icon-fullbleed.svg'),
	svg('icon-maskable.svg'),
]);

// Opaque PNGs for home screens, PWA install, and the manifest.
await out('apple-touch-icon.png', render(full, 180));
await out('icon-192.png', render(full, 192));
await out('icon-512.png', render(full, 512));
await out('icon-maskable-512.png', render(mask, 512));

// Multi-size .ico (16/32/48) for legacy clients, from the rounded mark.
await out('favicon.ico', await pngToIco([16, 32, 48].map((s) => render(favicon, s))));

console.log('icons written to public/: favicon.ico, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png');

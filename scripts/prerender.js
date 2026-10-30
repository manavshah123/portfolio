// Renders the app to static HTML after `vite build`, so search engines and
// link previews see the full page without running JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist/index.html');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const html = fs.readFileSync(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`Could not find ${marker} in dist/index.html`);

fs.writeFileSync(htmlPath, html.replace(marker, `<div id="root">${render()}</div>`));
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('Prerendered dist/index.html');

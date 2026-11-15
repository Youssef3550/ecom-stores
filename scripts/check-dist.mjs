#!/usr/bin/env node
// Post-build smoke test: every expected page exists, has a title/description/canonical, valid JSON-LD,
// and every internal link and image resolves to a file in the build output.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, listStoreIds, loadStore } from './lib/stores.mjs';

const ids = process.argv.slice(2).length ? process.argv.slice(2) : listStoreIds();
let errors = 0;
const fail = (m) => { errors++; console.error(`✗ ${m}`); };

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) { const p = join(dir, f); statSync(p).isDirectory() ? walk(p, out) : out.push(p); }
  return out;
}
function resolves(dist, href) {
  const path = href.split(/[?#]/)[0];
  if (!path || path === '/') return existsSync(join(dist, 'index.html'));
  const f = join(dist, path);
  return existsSync(f) && statSync(f).isFile() ? true : existsSync(join(f, 'index.html'));
}

for (const id of ids) {
  const dist = join(ROOT, 'dist', id);
  const { products } = loadStore(id);
  if (!existsSync(dist)) { fail(`${id}: dist missing — run npm run build:all`); continue; }
  const expected = ['index.html', 'producten/index.html', 'winkelmand/index.html', 'bedankt/index.html', '404.html', 'sitemap.xml', 'robots.txt', 'catalog.json', '_headers', 'favicon.svg',
    ...products.map((p) => `producten/${p.slug}/index.html`), ...products.map((p) => `assets/og/${p.slug}.png`)];
  for (const e of expected) if (!existsSync(join(dist, e))) fail(`${id}: missing ${e}`);

  const html = walk(dist).filter((f) => f.endsWith('.html'));
  for (const f of html) {
    const s = readFileSync(f, 'utf8');
    const rel = f.slice(dist.length);
    if (!/<title>[^<]{5,}<\/title>/.test(s)) fail(`${id}${rel}: missing <title>`);
    if (!/<meta name="description" content="[^"]{20,}"/.test(s)) fail(`${id}${rel}: missing meta description`);
    if (!/<link rel="canonical"/.test(s)) fail(`${id}${rel}: missing canonical`);
    for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(m[1]); } catch { fail(`${id}${rel}: invalid JSON-LD`); }
    }
    for (const m of s.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      if (m[1].startsWith('/api/')) continue;
      if (!resolves(dist, m[1])) fail(`${id}${rel}: broken link ${m[1]}`);
    }
  }
  console.log(`✓ ${id}: ${html.length} pages checked`);
}
if (errors) { console.error(`\n${errors} problem(s) found.`); process.exit(1); }
console.log('\n✓ All builds passed the smoke test.');

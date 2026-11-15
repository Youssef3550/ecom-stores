#!/usr/bin/env node
// Builds all stores as a DEMO for GitHub Pages under https://<owner>.github.io/<repo>/<store>/
// into _site/, with a landing page linking the 5 stores. Checkout is disabled (Pages has no server functions);
// pages are noindex so the demo never competes with the real domains in Google.
// Usage: node scripts/build-pages.mjs [owner] [repo]
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, listStoreIds, loadStore } from './lib/stores.mjs';
import { esc } from './lib/svg.mjs';

const owner = (process.argv[2] || process.env.GITHUB_REPOSITORY_OWNER || 'youssef3550').toLowerCase();
const repo = process.argv[3] || (process.env.GITHUB_REPOSITORY || '/ecom-stores').split('/')[1];
const site = `https://${owner}.github.io`;
const out = join(ROOT, '_site');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const cards = [];
for (const id of listStoreIds()) {
  const base = `/${repo}/${id}`;
  console.log(`▶ ${id} → ${site}${base}/`);
  const r = spawnSync(process.execPath, [join(ROOT, 'scripts', 'build-store.mjs'), id], {
    stdio: ['ignore', 'ignore', 'inherit'],
    env: { ...process.env, BASE_PATH: base, SITE_URL: site, DEMO: 'true', PREVIEW: 'true' },
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
  const c = spawnSync(process.execPath, [join(ROOT, 'scripts', 'check-dist.mjs'), id], { stdio: 'inherit', env: { ...process.env, BASE_PATH_ROOT: `/${repo}` } });
  if (c.status !== 0) process.exit(c.status ?? 1);
  cpSync(join(ROOT, 'dist', id), join(out, id), { recursive: true });
  const { store, products } = loadStore(id);
  cards.push(`<a class="c" href="./${id}/" style="--p:${store.theme.primary}"><span>${esc(store.name)}</span><small>${esc(store.niche)}</small><em>${products.length} producten →</em></a>`);
}

writeFileSync(join(out, '.nojekyll'), ''); // let GitHub Pages serve _astro/ and other underscore paths
writeFileSync(join(out, 'index.html'), `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Store demos</title>
<style>body{font-family:Inter,system-ui,sans-serif;background:#f6f6f3;color:#111;margin:0;padding:48px 20px}main{max-width:900px;margin:auto}h1{font-size:2.2rem;margin:0 0 6px}p{opacity:.7}
.g{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));margin-top:28px}.c{display:flex;flex-direction:column;gap:6px;background:#fff;border-radius:18px;padding:22px;text-decoration:none;color:inherit;border-top:6px solid var(--p);box-shadow:0 6px 20px rgba(0,0,0,.05)}
.c span{font-weight:800;font-size:1.25rem}.c small{opacity:.75}.c em{font-style:normal;font-weight:700;color:var(--p);margin-top:8px}</style></head>
<body><main><h1>Store demos</h1><p>Demo builds for review. Checkout is disabled and product images are placeholders.</p><div class="g">${cards.join('')}</div></main></body></html>`);
console.log(`\n✓ _site ready (${listStoreIds().length} stores + landing page)`);

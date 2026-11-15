import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// One codebase, many stores: STORE selects the data folder in /stores and the output folder in /dist.
const STORE = process.env.STORE;
if (!STORE) throw new Error('Set STORE=<storeId> (e.g. STORE=clinch). See README.');
const root = fileURLToPath(new URL('../../', import.meta.url));
process.env.REPO_ROOT = root; // read by src/lib/data.ts at build time (bundled code can't rely on import.meta.url)
const store = JSON.parse(readFileSync(`${root}stores/${STORE}/store.json`, 'utf8'));

export default defineConfig({
  site: process.env.SITE_URL || `https://${store.domain}`,
  output: 'static',
  trailingSlash: 'always',
  publicDir: `${root}.build/${STORE}/public`,
  outDir: `${root}dist/${STORE}`,
  cacheDir: `${root}.build/${STORE}/.astro-cache`,
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  devToolbar: { enabled: false },
  telemetry: false,
});

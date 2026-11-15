#!/usr/bin/env node
// Runs a built store locally WITH its Pages Functions (checkout, webhook) via wrangler.
// Put test keys in apps/storefront/.dev.vars (see .dev.vars.example), then:
//   npm run build -- clinch && npm run preview -- clinch
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { ROOT, listStoreIds } from './lib/stores.mjs';

const id = process.argv[2];
if (!listStoreIds().includes(id)) { console.error(`Usage: npm run preview -- <store>  (${listStoreIds().join(', ')})`); process.exit(1); }
const r = spawnSync(join(ROOT, 'node_modules', '.bin', 'wrangler'), ['pages', 'dev', join(ROOT, 'dist', id), '--port', '8788'], {
  cwd: join(ROOT, 'apps', 'storefront'), stdio: 'inherit',
});
process.exit(r.status ?? 1);

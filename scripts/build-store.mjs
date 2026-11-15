#!/usr/bin/env node
// Build (or run the dev server for) one store.
//   node scripts/build-store.mjs <storeId>          → dist/<storeId>
//   node scripts/build-store.mjs <storeId> --dev    → http://localhost:4321
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { ROOT, listStoreIds } from './lib/stores.mjs';
import { prepareStore } from './generate-assets.mjs';

const args = process.argv.slice(2);
const dev = args.includes('--dev');
const id = args.find((a) => !a.startsWith('--')) ?? process.env.STORE;
if (!id || !listStoreIds().includes(id)) {
  console.error(`Usage: npm run ${dev ? 'dev' : 'build'} -- <store>\nStores: ${listStoreIds().join(', ')}`);
  process.exit(1);
}

prepareStore(id);
const astroBin = join(ROOT, 'node_modules', '.bin', 'astro');
const r = spawnSync(astroBin, [dev ? 'dev' : 'build', '--root', join(ROOT, 'apps', 'storefront')], {
  stdio: 'inherit',
  env: { ...process.env, STORE: id, ASTRO_TELEMETRY_DISABLED: '1' },
});
process.exit(r.status ?? 1);

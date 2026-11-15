#!/usr/bin/env node
// Builds every store (or the ones passed as arguments) sequentially.
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { ROOT, listStoreIds } from './lib/stores.mjs';

const ids = process.argv.slice(2).length ? process.argv.slice(2) : listStoreIds();
for (const id of ids) {
  console.log(`\n▶ Building ${id}`);
  const r = spawnSync(process.execPath, [join(ROOT, 'scripts', 'build-store.mjs'), id], { stdio: 'inherit', env: process.env });
  if (r.status !== 0) { console.error(`✗ Build failed for ${id}`); process.exit(r.status ?? 1); }
}
console.log(`\n✓ Built ${ids.length} store(s): ${ids.join(', ')}`);

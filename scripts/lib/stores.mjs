import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const STORES_DIR = join(ROOT, 'stores');

export function listStoreIds() {
  return readdirSync(STORES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(STORES_DIR, d.name, 'store.json')))
    .map((d) => d.name)
    .sort();
}

export function loadStore(id) {
  const dir = join(STORES_DIR, id);
  const store = JSON.parse(readFileSync(join(dir, 'store.json'), 'utf8'));
  const products = JSON.parse(readFileSync(join(dir, 'products.json'), 'utf8'));
  return { store, products, dir };
}

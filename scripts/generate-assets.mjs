#!/usr/bin/env node
// Prepares the per-store public directory consumed by Astro: shared static files, product mockups,
// OG images, favicon and catalog.json (the server-side price source for checkout).
// Usage: node scripts/generate-assets.mjs [storeId ...]   (default: all stores)
import { mkdirSync, writeFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { ROOT, listStoreIds, loadStore } from './lib/stores.mjs';
import { productMockup, ogImage, favicon } from './lib/svg.mjs';

const SHARED_PUBLIC = join(ROOT, 'apps', 'storefront', 'public');
const png = (svg, width) => new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { loadSystemFonts: true, defaultFontFamily: 'DejaVu Sans' } }).render().asPng();

const imageFor = (dir, slug, photo) => {
  for (const ext of ['webp', 'jpg', 'png']) if (existsSync(join(dir, 'images', `${slug}.${ext}`))) return `/assets/photos/${slug}.${ext}`;
  if (photo?.source === 'unsplash') return `https://images.unsplash.com/${photo.id}?w=200&h=200&fit=crop&auto=format&q=70`;
  return `/assets/products/${slug}.svg`;
};

export function prepareStore(id) {
  const { store, products, dir } = loadStore(id);
  const out = join(ROOT, '.build', id, 'public');
  rmSync(out, { recursive: true, force: true });
  mkdirSync(join(out, 'assets', 'products'), { recursive: true });
  mkdirSync(join(out, 'assets', 'og'), { recursive: true });
  cpSync(SHARED_PUBLIC, out, { recursive: true });
  // Store-specific real photography overrides the generated mockups: stores/<id>/images/<slug>.(jpg|png|webp)
  if (existsSync(join(dir, 'images'))) cpSync(join(dir, 'images'), join(out, 'assets', 'photos'), { recursive: true });

  for (const p of products) {
    const svg = productMockup(store, p);
    writeFileSync(join(out, 'assets', 'products', `${p.slug}.svg`), svg);
    writeFileSync(join(out, 'assets', 'og', `${p.slug}.png`), png(ogImage(store, p.name, p.copy.tagline, p.icon), 1200));
  }
  const heroIcon = products.find((p) => p.slug === store.featured[0])?.icon ?? products[0].icon;
  writeFileSync(join(out, 'assets', 'og', 'home.png'), png(ogImage(store, store.tagline, store.hero.A.sub, heroIcon), 1200));
  writeFileSync(join(out, 'favicon.svg'), favicon(store));

  const catalog = {
    store: store.id,
    currency: store.currency,
    shipping: store.shipping,
    bundles: store.bundles ?? [],
    products: Object.fromEntries(products.map((p) => [p.slug, { name: p.name, price: p.price, variants: p.variants?.options ?? [], image: imageFor(dir, p.slug, p.photo) }])),
  };
  writeFileSync(join(out, 'catalog.json'), JSON.stringify(catalog));
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const ids = process.argv.slice(2).length ? process.argv.slice(2) : listStoreIds();
  for (const id of ids) console.log(`✓ assets ${id} → ${prepareStore(id)}`);
}

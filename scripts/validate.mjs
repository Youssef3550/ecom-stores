#!/usr/bin/env node
// Validates every store's data: required fields, unique slugs, references and the ≥30% gross-margin gate.
// Exits non-zero on any error so CI blocks the deploy.
import { listStoreIds, loadStore } from './lib/stores.mjs';
import { economics, MIN_GROSS_MARGIN } from './lib/economics.mjs';

const REQUIRED_PRODUCT = ['slug', 'name', 'category', 'keyword', 'searchVolume', 'cpcUsd', 'supplier', 'unitCost', 'shippingCost', 'price', 'justification', 'risks', 'copy'];
const REQUIRED_COPY = ['tagline', 'description', 'bullets', 'metaTitle', 'metaDescription'];
const REQUIRED_STORE = ['id', 'name', 'domain', 'cloudflareProject', 'theme', 'shipping', 'company', 'hero', 'featured', 'adCreatives'];

const errors = [];
const warnings = [];
let productCount = 0;
const cpcNotes = [];

for (const id of listStoreIds()) {
  const { store, products } = loadStore(id);
  for (const k of REQUIRED_STORE) if (store[k] == null) errors.push(`${id}: store.json missing "${k}"`);
  if (store.id !== id) errors.push(`${id}: store.json id "${store.id}" does not match folder`);
  if (!store.hero?.A || !store.hero?.B) errors.push(`${id}: hero needs A and B variants for the A/B test`);
  if ((store.adCreatives ?? []).length !== 3) errors.push(`${id}: expected exactly 3 ad creatives`);

  const slugs = new Set();
  for (const p of products) {
    productCount++;
    const where = `${id}/${p.slug ?? '?'}`;
    for (const k of REQUIRED_PRODUCT) if (p[k] == null) errors.push(`${where}: missing "${k}"`);
    for (const k of REQUIRED_COPY) if (!p.copy?.[k]) errors.push(`${where}: copy missing "${k}"`);
    if (slugs.has(p.slug)) errors.push(`${where}: duplicate slug`);
    slugs.add(p.slug);
    if (!/^[a-z0-9-]+$/.test(p.slug ?? '')) errors.push(`${where}: slug must be kebab-case`);
    if ((p.copy?.metaTitle ?? '').length > 65) warnings.push(`${where}: metaTitle ${p.copy.metaTitle.length} chars (>65)`);
    if ((p.copy?.metaDescription ?? '').length > 160) warnings.push(`${where}: metaDescription ${p.copy.metaDescription.length} chars (>160)`);
    const e = economics(p);
    if (e.grossMargin < MIN_GROSS_MARGIN) errors.push(`${where}: gross margin ${(e.grossMargin * 100).toFixed(1)}% is below ${MIN_GROSS_MARGIN * 100}%`);
    if (e.cpcHeadroom < 0) cpcNotes.push(`${where}: keyword CPC €${e.searchCpcEur} > break-even €${e.breakEvenCpc} (single-item order)`);
  }
  for (const ref of [...store.featured, ...store.adCreatives.map((c) => c.product), ...(store.bundles ?? []).flatMap((b) => b.items)]) {
    if (!slugs.has(ref)) errors.push(`${id}: references unknown product "${ref}"`);
  }
  if (products.length !== 10) warnings.push(`${id}: ${products.length} products (plan is 10 per store)`);
}

for (const w of warnings) console.warn(`⚠  ${w}`);
if (cpcNotes.length) {
  console.log(`ℹ  ${cpcNotes.length}/${productCount} products cannot profitably buy their head keyword on a single-item order — use bundles/AOV, Shopping and social (see docs/GROWTH-PLAN.md).`);
  if (process.argv.includes('--verbose')) for (const n of cpcNotes) console.log(`   ${n}`);
}
if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  console.error(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log(`✓ ${listStoreIds().length} stores, ${productCount} products valid (all ≥ ${MIN_GROSS_MARGIN * 100}% gross margin).`);

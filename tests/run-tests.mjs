#!/usr/bin/env node
// Unit tests for the checkout pricing, Stripe form encoding and webhook signature verification.
// Bundles the TypeScript Pages Functions with esbuild, then runs plain node:assert tests. No extra deps.
import { build } from 'esbuild';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from '../scripts/lib/stores.mjs';

const out = mkdtempSync(join(tmpdir(), 'fn-test-'));
const entry = join(out, 'entry.ts');
writeFileSync(entry, `export * from ${JSON.stringify(join(ROOT, 'apps/storefront/functions/api/checkout.ts'))};\nexport { form, verifyStripeSignature } from ${JSON.stringify(join(ROOT, 'apps/storefront/functions/_lib/stripe.ts'))};`);
await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'neutral', outfile: join(out, 'bundle.mjs'), logLevel: 'error' });
const m = await import(pathToFileURL(join(out, 'bundle.mjs')).href);

let passed = 0;
const test = async (name, fn) => { try { await fn(); passed++; console.log(`✓ ${name}`); } catch (e) { console.error(`✗ ${name}\n  ${e.message}`); process.exitCode = 1; } };

const catalog = {
  store: 't', currency: 'EUR', shipping: { countries: ['BE', 'NL'], flatRate: 4.95, freeFrom: 50, deliveryDays: '' },
  bundles: [{ name: 'B', items: ['a', 'b'], discountPct: 10 }],
  products: { a: { name: 'A', price: 20, variants: ['S', 'M'] }, b: { name: 'B', price: 10, variants: [] }, c: { name: 'C', price: 5, variants: [] } },
};

await test('prices come from the catalog, not the client', () => {
  const { lines, subtotal } = m.priceLines(catalog, [{ slug: 'c', qty: 2, price: 0.01 }]);
  assert.equal(lines[0].unit, 500); assert.equal(subtotal, 1000);
});
await test('rejects unknown products and bad quantities', () => {
  assert.throws(() => m.priceLines(catalog, [{ slug: 'zzz', qty: 1 }]));
  assert.throws(() => m.priceLines(catalog, [{ slug: 'a', qty: 0 }]));
  assert.throws(() => m.priceLines(catalog, [{ slug: 'a', qty: 11 }]));
  assert.throws(() => m.priceLines(catalog, []));
});
await test('invalid variant falls back to first option; variant ignored when product has none', () => {
  const { lines } = m.priceLines(catalog, [{ slug: 'a', qty: 1, variant: 'XXL' }, { slug: 'c', qty: 1, variant: 'S' }]);
  assert.equal(lines[0].variant, 'S'); assert.equal(lines[1].variant, '');
});
await test('bundle discount applies only to complete sets', () => {
  const { lines, subtotal } = m.priceLines(catalog, [{ slug: 'a', qty: 2, variant: 'M' }, { slug: 'b', qty: 1 }]);
  // one set (a+b) discounted 10%, one extra a at full price: 18 + 9 + 20 = 47
  assert.equal(subtotal, 4700);
  assert.equal(lines.filter((l) => l.name.includes('bundelkorting')).length, 2);
});
await test('no discount without a complete set', () => {
  const { subtotal } = m.priceLines(catalog, [{ slug: 'a', qty: 1 }]);
  assert.equal(subtotal, 2000);
});
await test('stripe form encoding flattens nested objects and arrays', () => {
  const s = m.form({ a: { b: [{ c: 1 }, { c: 2 }] }, d: ['BE', 'NL'], e: undefined }).toString();
  assert.equal(decodeURIComponent(s), 'a[b][0][c]=1&a[b][1][c]=2&d[0]=BE&d[1]=NL');
});
await test('webhook signature: valid, tampered and expired', async () => {
  const secret = 'whsec_test'; const payload = '{"id":"evt_1"}'; const t = Math.floor(Date.now() / 1000);
  const sig = createHmac('sha256', secret).update(`${t}.${payload}`).digest('hex');
  assert.equal(await m.verifyStripeSignature(payload, `t=${t},v1=${sig}`, secret), true);
  assert.equal(await m.verifyStripeSignature(payload + ' ', `t=${t},v1=${sig}`, secret), false);
  const old = t - 1000; const oldSig = createHmac('sha256', secret).update(`${old}.${payload}`).digest('hex');
  assert.equal(await m.verifyStripeSignature(payload, `t=${old},v1=${oldSig}`, secret), false);
  assert.equal(await m.verifyStripeSignature(payload, null, secret), false);
});

console.log(`\n${passed} test(s) passed${process.exitCode ? ', with failures' : ''}.`);

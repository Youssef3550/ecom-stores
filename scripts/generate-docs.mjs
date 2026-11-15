#!/usr/bin/env node
// Generates docs/PRODUCT-RESEARCH.md and docs/products.csv from the store data, so the research
// report can never drift from what is actually listed and priced in the stores.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, listStoreIds, loadStore } from './lib/stores.mjs';
import { economics, VAT_RATE, PAYMENT_PCT, PAYMENT_FIXED, PLANNING_CVR, SHOPPING_CPC_EUR, USD_TO_EUR } from './lib/economics.mjs';

const eur = (n) => `€${n.toFixed(2).replace('.', ',')}`;
const pct = (n) => `${(n * 100).toFixed(1)}%`;
const median = (a) => { const s = [...a].sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

const md = [];
const csv = [['store', 'slug', 'name', 'category', 'keyword', 'vol_nl', 'vol_be', 'cpc_usd_nl', 'cpc_usd_be', 'supplier', 'origin', 'unit_cost', 'shipping', 'duty', 'price_incl_vat', 'net_revenue', 'gross_profit', 'gross_margin', 'break_even_roas', 'break_even_cpa', 'return_risk', 'seasonality'].join(',')];
const q = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;

md.push('# Product research: 50 validated products across 5 stores', '');
md.push('_Generated from `stores/*/products.json` by `npm run docs`. Do not edit by hand._', '');
md.push('## Method & data sources', '');
md.push(`- **Demand:** monthly Google search volume, 3-month trend, CPC and paid competition for Dutch-language keywords in the Netherlands (location 2528) and Belgium (2056), pulled via DataForSEO (OpenSEO) on 15 Nov 2026. "0" means too low to measure on that exact term. Several products are deliberately **social-first** (low search, high visual appeal), as noted per product.`);
md.push('- **Competition & price anchors:** live retail checks on bol.com, Coolblue, Gamma, Hornbach, Decathlon, ANWB and brand sites (Nov 2026).');
md.push('- **Supplier costs:** **estimates** from EU-warehouse dropship platforms (CJdropshipping DE, BigBuy, Spocket/Droppery) and Alibaba listing ranges. **Every unit cost must be confirmed by a sample order before launch**; update `unitCost` and the CI margin gate re-checks automatically.');
md.push(`- **Import cost:** non-EU (CN) origin adds the EU's flat **€3 customs duty per item** on parcels ≤ €150 (in force since 1 Jul 2026, temporary until 1 Jul 2028). EU-warehouse stock avoids it and ships in 2–5 days.`);
md.push(`- **Margin formula:** net revenue = price ÷ ${1 + VAT_RATE} (21% VAT BE/NL). Gross profit = net − unit cost − shipping − duty − payment fee (${(PAYMENT_PCT * 100).toFixed(1)}% + €${PAYMENT_FIXED.toFixed(2)}, blended Bancontact/iDEAL/cards). Shipping is treated as fully paid by us (conservative). **Gate: ≥ 30% gross margin** (enforced in CI).`);
md.push(`- **Break-even ROAS** = price incl. VAT ÷ gross profit (ad platforms report VAT-inclusive revenue). **Break-even CPC** = gross profit × ${PLANNING_CVR * 100}% planning CVR. CPCs converted at $1 = €${USD_TO_EUR}.`);
md.push('');

const summary = [];
for (const id of listStoreIds()) {
  const { store, products } = loadStore(id);
  const ecos = products.map((p) => ({ p, e: economics(p) }));
  const vol = products.reduce((s, p) => s + (p.searchVolume.nl || 0) + (p.searchVolume.be || 0), 0);
  summary.push({ store, n: products.length, vol, medMargin: median(ecos.map((x) => x.e.grossMargin)), medRoas: median(ecos.map((x) => x.e.breakEvenRoas)), shoppingOk: ecos.filter((x) => x.e.shoppingViable).length });
}

md.push('## Portfolio summary', '');
md.push('| Store | Niche | Products | Combined monthly searches (NL+BE) | Median gross margin | Median break-even ROAS | Products profitable on Shopping at median CPC (€0,36) |');
md.push('|---|---|---:|---:|---:|---:|---:|');
for (const s of summary) md.push(`| **${s.store.name}** (\`${s.store.id}\`) | ${s.store.niche} | ${s.n} | ${s.vol.toLocaleString('nl-BE')} | ${pct(s.medMargin)} | ${s.medRoas.toFixed(2)} | ${s.shoppingOk}/${s.n} |`);
md.push('');
md.push('### Key finding on paid search', '');
md.push(`At single-item order values, most products **cannot profitably buy their head keyword on Google Search** (keyword CPC > break-even CPC). This is normal for €15–€60 products and shapes the channel plan in [GROWTH-PLAN.md](GROWTH-PLAN.md): lead with **Meta/TikTok creatives** (social-first products), **Google Shopping/PMax** (European median Shopping CPC is ≈€${SHOPPING_CPC_EUR.toFixed(2)}), **bundles and free-shipping thresholds** to lift AOV, and **SEO/AEO content** for the long tail. Run \`npm run validate -- --verbose\` for the per-product list.`, '');

for (const id of listStoreIds()) {
  const { store, products } = loadStore(id);
  md.push(`---`, '', `## ${store.name}: ${store.niche}`, '');
  md.push(`Domain (suggested): \`${store.domain}\` · Free shipping from ${eur(store.shipping.freeFrom)} · Bundle: ${(store.bundles ?? []).map((b) => `${b.name} (−${b.discountPct}%)`).join(', ') || 'none'}`, '');
  md.push('| # | Product | Keyword | Searches NL / BE | CPC NL / BE (USD) | Price | Landed cost | Gross margin | Break-even ROAS |');
  md.push('|---:|---|---|---:|---:|---:|---:|---:|---:|');
  products.forEach((p, i) => {
    const e = economics(p);
    md.push(`| ${i + 1} | ${p.name} | ${p.keyword} | ${p.searchVolume.nl.toLocaleString('nl-BE')} / ${p.searchVolume.be.toLocaleString('nl-BE')} | ${p.cpcUsd.nl.toFixed(2)} / ${p.cpcUsd.be.toFixed(2)} | ${eur(p.price)} | ${eur(e.landedCost)} | ${pct(e.grossMargin)} | ${e.breakEvenRoas.toFixed(2)} |`);
  });
  md.push('');
  for (const p of products) {
    const e = economics(p);
    md.push(`### ${p.name}`, '');
    md.push(`- **Why this product:** ${p.justification}`);
    md.push(`- **Search & trend data:** "${p.keyword}": NL ${p.searchVolume.nl.toLocaleString('nl-BE')}/mo, BE ${p.searchVolume.be.toLocaleString('nl-BE')}/mo. ${p.trend}.`);
    md.push(`- **Seasonality:** ${p.seasonality}`);
    md.push(`- **Competitors:** ${p.competitors}`);
    md.push(`- **Estimated CPC:** NL $${p.cpcUsd.nl.toFixed(2)} · BE $${p.cpcUsd.be.toFixed(2)} (≈ €${e.searchCpcEur.toFixed(2)} max). Break-even CPC at ${PLANNING_CVR * 100}% CVR: €${e.breakEvenCpc.toFixed(2)}.`);
    md.push(`- **Supplier:** ${p.supplier.primary}. Fallback: ${p.supplier.fallback}. Search term: \`${p.supplier.searchTerm}\` (origin: ${p.supplier.origin}).`);
    md.push(`- **Target price & margin:** ${eur(p.price)} incl. VAT → net ${eur(e.netRevenue)} − unit ${eur(p.unitCost)} − shipping ${eur(p.shippingCost)}${p.duty ? ` − duty ${eur(p.duty)}` : ''} − payment ${eur(e.paymentFee)} = **${eur(e.grossProfit)} gross profit (${pct(e.grossMargin)})**. Break-even ROAS ${e.breakEvenRoas.toFixed(2)}, break-even CPA ${eur(e.breakEvenCpa)}.`);
    md.push(`- **Weight / return risk:** ~${p.weightKg} kg · ${p.returnRisk}`);
    md.push(`- **Risks:** ${p.risks.join('; ')}.`, '');
    csv.push([store.id, p.slug, q(p.name), q(p.category), q(p.keyword), p.searchVolume.nl, p.searchVolume.be, p.cpcUsd.nl, p.cpcUsd.be, q(p.supplier.primary), p.supplier.origin, p.unitCost, p.shippingCost, p.duty ?? 0, p.price, e.netRevenue, e.grossProfit, e.grossMargin, e.breakEvenRoas, e.breakEvenCpa, q(p.returnRisk), q(p.seasonality)].join(','));
  }
}

mkdirSync(join(ROOT, 'docs'), { recursive: true });
writeFileSync(join(ROOT, 'docs', 'PRODUCT-RESEARCH.md'), md.join('\n'));
writeFileSync(join(ROOT, 'docs', 'products.csv'), csv.join('\n') + '\n');
console.log('✓ docs/PRODUCT-RESEARCH.md and docs/products.csv generated');

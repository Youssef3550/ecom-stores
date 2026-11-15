#!/usr/bin/env node
// Renders the 3 ad creatives per store (feed 1080×1080, story 1080×1920, link 1200×628) to SVG + PNG
// in stores/<id>/creatives/, plus copy.md with headline / primary text / CTA ready to paste into Meta & Google.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { listStoreIds, loadStore } from './lib/stores.mjs';
import { adCreative } from './lib/svg.mjs';

const ids = process.argv.slice(2).length ? process.argv.slice(2) : listStoreIds();
for (const id of ids) {
  const { store, products, dir } = loadStore(id);
  const out = join(dir, 'creatives');
  mkdirSync(out, { recursive: true });
  const md = [`# ${store.name} — ad creatives\n`, 'Placeholder visuals in brand style. Swap the product glyph for real product/UGC footage once samples arrive; keep the headline/CTA structure.\n'];
  for (const c of store.adCreatives) {
    const p = products.find((x) => x.slug === c.product);
    const svg = adCreative(store, c, p);
    const base = `${c.id}-${c.format}`;
    writeFileSync(join(out, `${base}.svg`), svg);
    const [w] = c.format.split('x').map(Number);
    writeFileSync(join(out, `${base}.png`), new Resvg(svg, { fitTo: { mode: 'width', value: w }, font: { loadSystemFonts: true, defaultFontFamily: 'DejaVu Sans' } }).render().asPng());
    md.push(`## ${c.id} (${c.format}) — ${p.name}\n\n- **Headline:** ${c.headline}\n- **Primary text:** ${c.primaryText}\n- **CTA:** ${c.cta}\n- **Landing page:** https://${store.domain}/producten/${p.slug}/?utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign=${store.id}_${c.id}\n- **Files:** \`${base}.png\`, \`${base}.svg\`\n`);
  }
  writeFileSync(join(out, 'copy.md'), md.join('\n'));
  console.log(`✓ creatives ${id}: ${store.adCreatives.length} formats`);
}

// POST /api/checkout  { items: [{ slug, qty, variant }], ab?: "A"|"B" }  →  { url }
// Re-prices every line from the deployed catalog.json (never trusts client prices), applies bundle
// discounts and the free-shipping threshold, then creates a Stripe Checkout Session.
import { stripe, json, type Env } from '../_lib/stripe';

interface Catalog {
  store: string;
  currency: string;
  shipping: { countries: string[]; flatRate: number; freeFrom: number; deliveryDays: string };
  bundles: { name: string; items: string[]; discountPct: number }[];
  products: Record<string, { name: string; price: number; variants: string[] }>;
}
interface Line { slug: string; qty: number; variant: string }

const cents = (eur: number) => Math.round(eur * 100);

export function priceLines(catalog: Catalog, raw: unknown): { lines: { name: string; unit: number; qty: number; slug: string; variant: string }[]; subtotal: number } {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 20) throw new Error('Ongeldige winkelmand');
  const lines: Line[] = raw.map((r: any) => {
    const p = catalog.products[r?.slug];
    if (!p) throw new Error('Onbekend product');
    const qty = Math.floor(Number(r.qty));
    if (!(qty >= 1 && qty <= 10)) throw new Error('Ongeldig aantal');
    let variant = typeof r.variant === 'string' ? r.variant : '';
    if (p.variants.length) { if (!p.variants.includes(variant)) variant = p.variants[0]; } else variant = '';
    return { slug: r.slug, qty, variant };
  });

  // Bundle discount: for each complete set of bundle items in the cart, discount those units.
  const discountUnits = new Map<string, { pct: number; units: number }[]>();
  const qtyBySlug = (s: string) => lines.filter((l) => l.slug === s).reduce((a, l) => a + l.qty, 0);
  const used = new Map<string, number>();
  for (const b of catalog.bundles) {
    const sets = Math.min(...b.items.map((s) => qtyBySlug(s) - (used.get(s) ?? 0)));
    if (sets > 0) for (const s of b.items) {
      used.set(s, (used.get(s) ?? 0) + sets);
      discountUnits.set(s, [...(discountUnits.get(s) ?? []), { pct: b.discountPct, units: sets }]);
    }
  }

  const out: { name: string; unit: number; qty: number; slug: string; variant: string }[] = [];
  for (const l of lines) {
    const p = catalog.products[l.slug];
    const label = l.variant ? `${p.name} – ${l.variant}` : p.name;
    let remaining = l.qty;
    for (const d of discountUnits.get(l.slug) ?? []) {
      const take = Math.min(remaining, d.units);
      if (take > 0) {
        out.push({ name: `${label} (bundelkorting −${d.pct}%)`, unit: cents(p.price * (1 - d.pct / 100)), qty: take, slug: l.slug, variant: l.variant });
        d.units -= take; remaining -= take;
      }
    }
    if (remaining > 0) out.push({ name: label, unit: cents(p.price), qty: remaining, slug: l.slug, variant: l.variant });
  }
  const subtotal = out.reduce((s, l) => s + l.unit * l.qty, 0);
  return { lines: out, subtotal };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const origin = new URL(request.url).origin;
    const catalog: Catalog = await (await env.ASSETS.fetch(new URL('/catalog.json', request.url).toString())).json();
    const body: any = await request.json().catch(() => ({}));
    const { lines, subtotal } = priceLines(catalog, body.items);
    const autoTax = env.STRIPE_AUTOMATIC_TAX === 'true';
    const freeShipping = subtotal >= cents(catalog.shipping.freeFrom);
    const ab = body.ab === 'A' || body.ab === 'B' ? body.ab : 'none';

    const session = await stripe(env, 'POST', '/checkout/sessions', {
      mode: 'payment',
      locale: 'nl',
      success_url: `${origin}/bedankt/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/winkelmand/`,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: catalog.shipping.countries },
      phone_number_collection: { enabled: true },
      line_items: lines.map((l) => ({
        quantity: l.qty,
        price_data: {
          currency: 'eur',
          unit_amount: l.unit,
          tax_behavior: autoTax ? 'inclusive' : undefined,
          product_data: { name: l.name, metadata: { slug: l.slug, variant: l.variant } },
        },
      })),
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          display_name: freeShipping ? 'Gratis verzending' : 'Standaard verzending',
          fixed_amount: { amount: freeShipping ? 0 : cents(catalog.shipping.flatRate), currency: 'eur' },
          tax_behavior: autoTax ? 'inclusive' : undefined,
          delivery_estimate: { minimum: { unit: 'business_day', value: 2 }, maximum: { unit: 'business_day', value: 5 } },
        },
      }],
      automatic_tax: autoTax ? { enabled: true } : undefined,
      allow_promotion_codes: true,
      metadata: {
        store: catalog.store,
        ab_hero: ab,
        lines: lines.map((l) => `${l.slug}${l.variant ? ':' + l.variant : ''}x${l.qty}`).join(',').slice(0, 490),
      },
      payment_intent_data: { metadata: { store: catalog.store } },
    });
    return json({ url: session.url });
  } catch (e: any) {
    const msg = String(e?.message ?? e);
    const userFacing = /Ongeldig|Onbekend/.test(msg) ? msg : 'Afrekenen is tijdelijk niet beschikbaar';
    console.error('checkout_error', msg);
    return json({ error: userFacing }, userFacing === msg ? 400 : 502);
  }
};

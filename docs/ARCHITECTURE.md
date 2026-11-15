# Architecture

## Platform recommendation: headless (Astro + Stripe + Cloudflare)

| | Headless (chosen) | Shopify | WooCommerce |
|---|---|---|---|
| Monthly cost for 5 stores | ≈ €0 hosting (Cloudflare Pages free tier) + domains | ≈ €180+/mo (5 × Basic) + app fees | Hosting ×5 + plugin licences |
| Transaction fees | Stripe only (Bancontact 1.4% + €0.25, iDEAL ~€0.29) | Shopify Payments, or a 2% surcharge with a third-party gateway | Gateway only |
| Everything in Git / CI/CD | ✅ Code, products, copy, prices, legal pages | Partial (theme via GitHub; products live in admin) | ❌ Database-driven |
| Performance / SEO control | ✅ Static HTML on a global CDN, full schema control | Good | Varies |
| Dropship apps (one-click import) | ❌ Orders go through a webhook → automation | ✅ Best ecosystem | ✅ |
| Non-technical editing | Edit JSON (or add a headless CMS later) | ✅ | ✅ |

**Why headless here:** five stores in the testing phase should cost almost nothing to run, deploy from Git, and be cloneable in minutes. You also already work with Cloudflare Pages. **When to switch:** if one store passes ~150 orders/month and order handling becomes the bottleneck, move *that* store to Shopify (product data exports cleanly from `products.json`) or add an order-management tool. The other stores stay on this stack.

## Repo structure

```
ecom-stores/
├─ stores/<id>/                 ← one folder per store (the only thing that differs between stores)
│  ├─ store.json                brand, theme, shipping, company info, hero A/B, bundles, ad creatives
│  ├─ products.json             10 products: research data, costs, price, copy, SEO, FAQ, risks
│  ├─ images/                   (optional) real product photos
│  └─ creatives/                generated ad creatives (PNG + SVG) + copy.md
├─ apps/storefront/             ← shared Astro app, rendered once per store
│  ├─ src/pages/                home, /producten/, /producten/[slug]/, /winkelmand/, /bedankt/, /info/[page]/, sitemap, robots, 404
│  ├─ src/layouts, components, lib/   layout + SEO, product card, data loader, legal templates
│  ├─ public/js/                consent.js (GA4/Meta after opt-in), cart.js, ab.js
│  ├─ public/_headers           security headers (CSP, HSTS…) + caching
│  └─ functions/api/            Cloudflare Pages Functions: checkout, stripe-webhook, order
├─ scripts/                     validate (margin gate), build, assets, creatives, docs, smoke test, Cloudflare setup
├─ tests/                       checkout pricing + webhook signature tests
├─ docs/
└─ .github/workflows/           ci.yml, deploy.yml, rollback.yml
```

`STORE=<id>` selects the data folder at build time, and the output goes to `dist/<id>/`. Adding a sixth store means copying a folder in `stores/`, adding it to the workflow store lists, and running `cloudflare-bootstrap.sh`.

## Request & order flow

```
Browser ──static HTML/CSS/JS──► Cloudflare CDN (dist/<id>)
   │ add to cart (localStorage)
   │ POST /api/checkout {slug, qty, variant}
   ▼
Pages Function checkout.ts
   • loads /catalog.json from the same deployment (server-side price source)
   • validates lines, applies bundle discount, free-shipping rule
   • creates Stripe Checkout Session (BE/NL addresses, nl locale, Bancontact/iDEAL/cards via dashboard)
   ▼
Stripe Checkout ──paid──► /bedankt/?session_id=…  → /api/order → GA4/Meta "purchase" with the confirmed value
   │
   └─ webhook checkout.session.completed ──► stripe-webhook.ts (signature verified)
                                              └─► ORDER_WEBHOOK_URL (Make/Zapier/n8n) → supplier order + customer email
```

**Security choices:** client prices are never trusted; the webhook verifies Stripe's HMAC signature with a 5-minute replay window; secrets live only in Cloudflare (encrypted) and GitHub Secrets; analytics load only after consent; strict CSP and HSTS headers; preview deploys are `noindex`.

## Product images

Generated mockups (`/assets/products/<slug>.svg`) are branded placeholders. To use real photos, add `stores/<id>/images/<slug>.webp|jpg|png`. It's copied to `/assets/photos/` and used automatically on cards, product pages and in the cart, with no code change. Use 1200×1200 px or larger, with a white or neutral background, and add 3–5 angles plus a lifestyle shot from your sample order.

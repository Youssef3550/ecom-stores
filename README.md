# ecom-stores

Five ready-to-launch niche stores (50 products) for **Belgium and the Netherlands**, built as one monorepo:
**Astro (static) + Stripe Checkout + Cloudflare Pages/Functions**, with GitHub Actions CI/CD.

| Store | Niche | Suggested domain | Products |
|---|---|---|---:|
| **Clinch Supply** | Kickboxing, boxing & Muay Thai training gear | clinchsupply.be | 10 |
| **Snuffel & Co** | Dog enrichment & care | snuffelenco.be | 10 |
| **Warmwijs** | Energy-saving home & warmth | warmwijs.be | 10 |
| **Diepslaap** | Sleep accessories | diepslaap.be | 10 |
| **Deskwerk** | Home-office ergonomics & organisation | deskwerk.be | 10 |

Each store ships with product pages, Dutch copy, SEO metadata + JSON-LD (Product, Offer with shipping & returns, FAQ, Breadcrumb), sitemap/robots, consent-first GA4 + Meta Pixel, a homepage A/B test, bundles with server-side discounts, Bancontact/iDEAL/card checkout, a signed Stripe webhook that forwards paid orders to your fulfilment automation, legal page templates, branded mockups, OG images and 3 ad creatives.

## Docs

| Doc | What's in it |
|---|---|
| [docs/PRODUCT-RESEARCH.md](docs/PRODUCT-RESEARCH.md) · [products.csv](docs/products.csv) | All 50 products: niche rationale, search/trend data, competitors, CPC, supplier, price, margin math, risks |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Platform choice, repo structure, how a request/order flows |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | CI/CD pipeline, environments, deploy & **rollback** procedures |
| [docs/ACCESS-AND-SECRETS.md](docs/ACCESS-AND-SECRETS.md) | Exact GitHub / Cloudflare / Stripe permissions and every secret to provision |
| [docs/COMPLIANCE.md](docs/COMPLIANCE.md) | Legal & compliance checklist (BE/NL/EU): company, VAT/OSS, GDPR, consumer law, GPSR, WEEE, ads |
| [docs/SOURCING.md](docs/SOURCING.md) | Supplier validation, sample orders, order automation |
| [docs/GROWTH-PLAN.md](docs/GROWTH-PLAN.md) | KPI targets (CVR, CAC, ROAS), A/B test plan, 30/60/90-day launch & scale roadmap |
| [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md) | Step-by-step go-live checklist per store |

## Quick start

```bash
nvm use            # Node 22
npm ci
npm run validate   # data + ≥30% margin gate
npm run dev -- clinch          # http://localhost:4321
npm run build:all && node scripts/check-dist.mjs
```

Checkout locally (needs Stripe **test** keys): copy `apps/storefront/.dev.vars.example` → `.dev.vars`, then
`npm run build -- clinch && npm run preview -- clinch` → http://localhost:8788.

## Everyday workflow

| Task | How |
|---|---|
| Change a price, copy, or add a product | Edit `stores/<id>/products.json` → open a PR → CI validates margins, builds, posts preview links |
| Add real product photos | Drop `stores/<id>/images/<slug>.jpg` (or .webp/.png): it replaces the mockup automatically |
| Regenerate research docs / ad creatives | `npm run docs` · `npm run creatives` |
| Deploy | Merge to `main` → only changed stores deploy (shared code changes deploy all) |
| Roll back | Actions → **Rollback** → pick store → Run (seconds, no rebuild) |

## Before you take real money

Read [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md). In short: register as self-employed (KBO/VAT), fill the `company` block in each `store.json`, order samples and confirm unit costs, replace the mockups with real photos, have the legal templates reviewed, then add live Stripe keys.

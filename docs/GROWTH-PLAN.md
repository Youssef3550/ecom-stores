# Validation & scaling plan

## Channel strategy (based on the research)
Most products have **keyword CPCs above their single-order break-even CPC** (see PRODUCT-RESEARCH.md), so:
1. **Meta (Instagram/Facebook) + TikTok** are the primary test channels: short video showing the product and the problem it solves. These are the "social-first" products: reflex ball, paw cleaner, lick mat, pet hair remover, cable management, mouth tape, LED collar.
2. **Google Shopping / Performance Max** for products with search demand and a break-even CPC ≥ €0.36 (the European median Shopping CPC). That's 21 of 50 products, led by the massage gun, wake-up light, boxing gloves, radiator fan, foot rest and silk pillowcase.
3. **Google Search** only on long-tail, high-intent terms (e.g. "radiator ventilator duo kopen", "3d slaapmasker zijslaper"), never on broad head terms at launch.
4. **SEO/AEO content** (your strong suit): one buying guide per store per month, answering the questions people ask AI assistants and Google ("welk gewicht bokshandschoenen", "hoe tocht ik mijn deur af", "likmat wat erop smeren"), with FAQ schema and links to the product pages.
5. **AOV levers** are already built in: bundles (10–12% off), free-shipping thresholds of €35–50, related products, and a sticky add-to-cart button on mobile.

## KPI targets

Break-even is calculated from the actual unit economics in this repo. Ad platforms report revenue **incl. VAT**.

| KPI | Definition | Launch (days 1–30) | Day 60 | Day 90 (scale) |
|---|---|---|---|---|
| **CVR** | Orders ÷ sessions | ≥ 1.2% (cold social) | ≥ 2.0% | ≥ 2.5% (≥ 3% on Shopping traffic) |
| Add-to-cart rate | ATC sessions ÷ sessions | ≥ 6% | ≥ 8% | ≥ 10% |
| Checkout completion | Purchases ÷ begin_checkout | ≥ 45% | ≥ 55% | ≥ 60% |
| **AOV** | Revenue ÷ orders | ≥ 75% of the free-shipping threshold | ≥ 90% of the threshold | ≥ threshold |
| **ROAS** (platform) | Revenue incl. VAT ÷ ad spend | ≥ 2.0 (learning) | ≥ 2.8 | ≥ 3.2 blended |
| MER | Total revenue ÷ total ad spend | ≥ 2.0 | ≥ 2.8 | ≥ 3.5 |
| Refund/return rate | Refunded orders ÷ orders | ≤ 6% | ≤ 5% | ≤ 4% |
| Delivery time | Paid → delivered | ≤ 5 working days | ≤ 4 | ≤ 3 (3PL) |

**CAC ceilings per store** (first order; break-even = target AOV ÷ 1.21 × median gross margin):

| Store | Target AOV | Median margin | Break-even CAC | **Target CAC** | Break-even ROAS (median product) |
|---|---:|---:|---:|---:|---:|
| Clinch Supply | €45 | 53.9% | €20 | **≤ €15** | 2.25 |
| Snuffel & Co | €30 | 54.5% | €13.50 | **≤ €10** | 2.22 |
| Warmwijs | €40 | 51.7% | €17 | **≤ €13** | 2.34 |
| Diepslaap | €35 | 55.9% | €16 | **≤ €12** | 2.16 |
| Deskwerk | €45 | 54.8% | €20 | **≤ €15** | 2.21 |

## Testing budget & decision rules
- **Budget:** €15/day per store on Meta (one campaign per store, Advantage+ placements, 3 creatives × 1 hero product). That's about €2,250 for 30 days across 5 stores. Add €5–10/day Shopping/PMax for the stores with Shopping-viable products from week 2.
- **Kill:** a creative or product with spend ≥ 2× target CAC and 0 purchases; or CTR < 0.8% after 3,000 impressions; or ATC rate < 3% after 300 sessions.
- **Iterate:** ATC ≥ 6% but CVR < 1% means a checkout or trust problem. Check shipping cost visibility, payment methods and the product page.
- **Scale:** ROAS ≥ target for 7 consecutive days with ≥ 10 purchases → raise the budget by 20% every 3 days. Duplicate into a broad audience and a lookalike/Advantage+ Shopping campaign.
- **Kill a store:** after 45 days, if no product reaches break-even ROAS, stop ads and reallocate budget to the winning stores. Keep the site live for SEO.

## A/B test plan
At launch traffic levels, run **one test per store at a time**. Aim for ≥ 100 conversions per arm or 2 full weeks; for price tests (low volume) use **sequential tests** of 2 weeks per price.

| # | Test | Hypothesis | Primary metric | How |
|---|---|---|---|---|
| 1 | **Homepage hero A vs B** (built in) | A problem-led headline beats a brand-led one | ATC rate, CVR | `ab.js` 50/50 cookie split; variant in GA4 events + Stripe metadata (`ab_hero`) |
| 2 | Ad hooks: problem vs result vs social proof | Problem-first hooks lower CPA | CPA, hook rate (3-s views) | 3 creatives per ad set; Meta's split testing |
| 3 | Bundle discount 10% vs 15% | 15% raises bundle take-rate enough to lift AOV × margin | Gross profit per session | Change `discountPct` for 2 weeks each |
| 4 | Free-shipping threshold (e.g. €35 vs €45) | A higher threshold raises AOV without hurting CVR | Gross profit per session | Change `shipping.freeFrom` sequentially |
| 5 | Price points (e.g. €17.95 vs €19.95) | Demand is inelastic in the €15–20 band | Gross profit per session | Sequential, 2 weeks per price. Note the Omnibus rule if you show a "was" price. |
| 6 | Product page: photos vs video first | Video increases ATC on demo products | ATC rate | Once real footage exists |
| 7 | Cart: express checkout prompt | A visible Apple Pay/Bancontact mention increases checkout starts | begin_checkout rate | Copy change in the cart page |

**Read results** in GA4 → Explore → segment by event parameter `variant_id` / `experiment_id`, or in Stripe → Payments → filter by metadata `ab_hero`. Ship the winner by updating `store.json` and starting the next test.

## 30 / 60 / 90-day roadmap

### Days 1–30: Validate
- Week 1: business set-up (KBO/VAT), Stripe, Cloudflare, domains, GA4 + Meta pixels (see LAUNCH-CHECKLIST.md). **Sample-order the 2–3 hero products per store.**
- Week 2: real photos and videos from the samples → replace the mockups, re-render creatives. Go live in **test mode**, then do a live €1 test purchase per store and refund it.
- Weeks 2–4: Meta tests at €15/day per store. Seasonal priority **now (Nov–Jan):** Warmwijs (radiator fan, draught strip), Diepslaap (wake-up light; sleep mask and silk pillowcase as gifts), Snuffel (paw cleaner, LED collar), Clinch (massage gun, gloves for January resolutions).
- Set up the order automation and a daily profit sheet.
- **Exit criteria:** ≥ 1 product per store with ≥ 5 purchases, and a clear kill list.

### Days 31–60: Optimise
- Turn off losers; move their budget to the top 2 stores.
- Launch Google Merchant Center feeds + Shopping/PMax for Shopping-viable winners.
- Add a post-purchase review request (real reviews only), then show reviews on product pages with `aggregateRating` schema **once you have real reviews**.
- Run A/B tests 2–4. Publish 2 SEO/AEO guides per winning store.
- Negotiate private-label pricing for winners (100–300 units).
- **Exit criteria:** ≥ 2 stores at ROAS ≥ 2.8 and CAC ≤ target.

### Days 61–90: Scale
- Move winners to **bulk stock in an EU 3PL**: lower unit cost (no €3 duty per item), 1–3 day delivery, branded packaging.
- Scale budgets by 20% every 3 days within ROAS guardrails. Add TikTok for social-first winners and test a micro-influencer seeding programme (5–10 creators per store; content labelled as advertising).
- Add a **French version** (`fr` copy + `hreflang`) for Wallonia and Brussels in the top store: the same market, little extra cost.
- Email flows: abandoned checkout (needs consent and an ESP), post-purchase cross-sell, and replenishment (mouth tape, hand wraps).
- Decide per store: scale, keep as an SEO asset, or sunset. Consider moving a store doing 150+ orders/month to Shopping-feed tooling or Shopify.
- **Target at day 90:** blended MER ≥ 3.5, ≥ 2 stores profitable after ads, refunds ≤ 4%.

# Launch checklist (per store)

Copy this list into a GitHub issue for each store and tick the boxes as you go.

## A. Business (once, for all stores)
- [ ] KBO number, VAT active, business bank account (COMPLIANCE.md §1–2)
- [ ] Stripe account activated; payment methods Bancontact, iDEAL, cards, Apple Pay and Google Pay enabled
- [ ] Cloudflare account + API token; GitHub secrets set (ACCESS-AND-SECRETS.md)
- [ ] `bash scripts/cloudflare-bootstrap.sh`
- [ ] Recupel/Bebat membership if you sell electrical items yourself (COMPLIANCE.md §6)

## B. Store data
- [ ] `stores/<id>/store.json → company`: legal name, address, VAT number, email (no `[PLACEHOLDER]` left: `grep -r "\[" stores/<id>/store.json`)
- [ ] Domain registered, added as a custom domain in Cloudflare Pages, mailbox `hallo@<domain>` working
- [ ] Legal pages reviewed (the `/info/*` templates in `apps/storefront/src/lib/legal.ts`)

## C. Products
- [ ] Sample of each hero product received and approved (SOURCING.md)
- [ ] Real `unitCost` / `shippingCost` / `duty` entered → `npm run validate` passes
- [ ] GPSR details (manufacturer, EU contact, warnings in Dutch) added to `specs`
- [ ] CE/DoC on file for electrical products
- [ ] Real photos added; mockups replaced on hero products
- [ ] `npm run creatives` re-run with real footage, or new creatives made from the videos

## D. Payments & orders
- [ ] Restricted Stripe key + webhook endpoint for this domain; `bash scripts/set-secrets.sh <id>`
- [ ] Test mode: full purchase with `4242…`, a Bancontact test and an iDEAL test → thank-you page → webhook delivered → order arrives in the automation
- [ ] Bundle discount and free-shipping threshold verified in Stripe Checkout
- [ ] Switch to the live key → one real €1+ purchase → refund it → check that `order.refunded` arrives

## E. Tracking
- [ ] GA4 property + GitHub variable `GA4_ID_<STORE>`; Meta pixel + `META_PIXEL_ID_<STORE>`; redeploy
- [ ] Consent banner: with "Alleen noodzakelijk" no GA/Meta requests are sent (DevTools → Network)
- [ ] With consent: `view_item`, `add_to_cart`, `begin_checkout` and `purchase` visible in GA4 DebugView and Meta Events Manager
- [ ] Mark `purchase` as a key event in GA4; link GA4 to Google Ads

## F. SEO
- [ ] Google Search Console: verify the domain, submit `/sitemap.xml`
- [ ] Bing Webmaster Tools (also feeds several AI assistants)
- [ ] Rich Results Test on one product page (Product + Offer + FAQ)
- [ ] Lighthouse mobile ≥ 90 on Performance/SEO/Accessibility

## G. Go live
- [ ] Merge to `main` → Deploy workflow green (smoke test passed)
- [ ] Ads live per GROWTH-PLAN.md, with UTM parameters from `stores/<id>/creatives/copy.md`
- [ ] Rollback tested once on a quiet moment (Actions → Rollback)

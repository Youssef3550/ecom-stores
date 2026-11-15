# Access & secrets: exact permissions to provision

Principle: **least privilege, one place per secret, nothing in Git.**

## GitHub

| Who / what | Permission | Why |
|---|---|---|
| You (owner of `Youssef3550/ecom-stores`) | Admin | Settings, secrets, environments, branch protection |
| Claude (this session, via the GitHub App) | **Contents: read & write** on `ecom-stores` only | Push commits and branches. No admin, secrets or settings access needed. |
| Workflow `GITHUB_TOKEN`, ci.yml | `contents: read`, `pull-requests: write` | Checkout + comment preview URLs |
| Workflow `GITHUB_TOKEN`, deploy.yml | `contents: read`, `deployments: write` | Checkout + show deployments in GitHub |
| Workflow `GITHUB_TOKEN`, rollback.yml | `contents: read` | Read the store config |
| Dependabot | Default | Weekly dependency PRs |

**Repository secrets** (Settings → Secrets and variables → Actions → Secrets):

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Custom token: **Account → Cloudflare Pages → Edit** (scoped to your account only). Nothing else. |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Account ID |

**Repository variables** (same page → Variables). All optional:

| Name | Example |
|---|---|
| `GA4_ID_CLINCH`, `GA4_ID_SNUFFEL`, `GA4_ID_WARMWIJS`, `GA4_ID_DIEPSLAAP`, `GA4_ID_DESKWERK` | `G-XXXXXXXXXX` (one GA4 property per store) |
| `META_PIXEL_ID_CLINCH` … `META_PIXEL_ID_DESKWERK` | `1234567890` (one dataset/pixel per store) |

**Environments:** `production-clinch`, `production-snuffel`, `production-warmwijs`, `production-diepslaap`, `production-deskwerk`. They're created automatically on the first deploy. Add yourself as a required reviewer if you want manual approval.

**Branch protection (`main`):** require a pull request and the status check *Validate, test, build all stores*, and block force-pushes.

## Cloudflare Pages: runtime secrets per project

Set them with `bash scripts/set-secrets.sh <store>` (production). Preview values go in the dashboard.

| Name | Required | Value |
|---|---|---|
| `STRIPE_SECRET_KEY` | ✅ | A **restricted key** (`rk_live_…`), not the full secret key. Permissions: *Checkout Sessions: Write*, *Products: Write*, *Prices: Write*, *Shipping rates: Write*, *Promotion codes: Read*. If session creation returns a permission error, Stripe's message names the missing permission; add only that one. |
| `STRIPE_WEBHOOK_SECRET` | ✅ | `whsec_…` from Stripe → Developers → Webhooks → this store's endpoint |
| `ORDER_WEBHOOK_URL` | Recommended | URL of your order automation (Make/Zapier/n8n) that receives `order.paid` / `order.refunded` JSON |
| `ORDER_WEBHOOK_TOKEN` | Recommended | Long random string; your automation should reject requests without `Authorization: Bearer <token>` |
| `STRIPE_AUTOMATIC_TAX` | Optional | `true` after configuring Stripe Tax (registrations for BE, and NL via OSS) |

## Stripe account setup (one account, 5 stores)

1. Activate the account in the name of your business (KBO number, Belgian bank account).
2. Settings → Payment methods: enable **Bancontact, iDEAL | Wero, Cards, Apple Pay, Google Pay** (optional: Klarna). The checkout uses dynamic payment methods, so no code change is needed.
3. Settings → Public details / Branding: set the support email and the statement descriptor (for example `CLINCHSUPPLY`). Enable **customer emails for successful payments** (receipts).
4. Create **one webhook endpoint per store domain** and **one restricted key per store**, so you can revoke a single store without affecting the others.
5. Start in **test mode**: card `4242 4242 4242 4242`; Bancontact and iDEAL have test flows in Stripe Checkout.

## Other accounts to create

| Account | For |
|---|---|
| Google Analytics 4: 1 property per store | Traffic + e-commerce events (view_item → purchase) |
| Google Merchant Center + Google Ads | Shopping/PMax. Feed: products are in `catalog.json`/JSON-LD; a Merchant Center feed is on the 30-day roadmap |
| Meta Business Manager: 1 ad account + 1 pixel/dataset per store | Paid social |
| TikTok Business Center (optional) | Social-first products |
| Supplier accounts: CJdropshipping, BigBuy, Spocket/Droppery, Alibaba | Sourcing (see SOURCING.md) |
| Make/Zapier/n8n | Order forwarding + customer notifications |
| Domain registrar (.be via e.g. Combell, OVH or one.com; DNS on Cloudflare) | 5 domains + mailboxes (`hallo@…`) |

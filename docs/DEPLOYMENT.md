# Deployment, CI/CD & rollback

## Pipeline

| Trigger | Workflow | What happens |
|---|---|---|
| PR or push to a non-main branch | `ci.yml` | `npm ci` → **validate** (schema + ≥30% margin gate) → **unit tests** → build all 5 stores → **smoke test** (pages exist, title/description/canonical, valid JSON-LD, no broken internal links). For PRs from this repo: a preview deploy per store at `pr-<n>.<project>.pages.dev`, with the link commented on the PR (noindex). |
| Push/merge to `main` | `deploy.yml` | Validate + tests → work out which stores changed (shared code changes deploy all) → build each with its GA4/Pixel IDs → `wrangler pages deploy` to production → **post-deploy smoke test** (`/`, `/producten/`, `/catalog.json`, `/sitemap.xml` = 200, and `/api/checkout` rejects an empty cart with 400). |
| Manual | `deploy.yml` (Run workflow) | Deploy one store or all. |
| Manual | `rollback.yml` | Instantly restore the previous (or a chosen) production deployment of one store. |

Each store deploys in its own GitHub **Environment** (`production-<store>`). You can require approval there (Settings → Environments → Required reviewers) so nothing goes live without a click.

## One-time setup

1. **Cloudflare:** create an API token (see [ACCESS-AND-SECRETS.md](ACCESS-AND-SECRETS.md)), then run:
   ```bash
   export CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=…
   bash scripts/cloudflare-bootstrap.sh          # creates 5 Pages projects
   bash scripts/set-secrets.sh clinch            # repeat per store (Stripe keys etc.)
   ```
2. **GitHub:** add the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, plus the variables `GA4_ID_<STORE>` and `META_PIXEL_ID_<STORE>` (optional; tracking stays off until they're set).
3. **Branch protection on `main`:** require a PR and the `Validate, test, build all stores` check to pass.
4. **Domains:** add them in Cloudflare → Pages project → Custom domains. Register the `.be` domains via a registrar and point their nameservers to Cloudflare.
5. **Stripe webhook per store:** `https://<domain>/api/stripe-webhook`, with the events `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `charge.refunded`. Copy the signing secret into `set-secrets.sh`.

## Environments & secret handling

| Where | What | Notes |
|---|---|---|
| Git (public-safe) | Products, prices, copy, theme, company *placeholders* | Never commit keys. `.dev.vars` and `.env*` are git-ignored. |
| GitHub Secrets | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Only used by the workflows. Never exposed to PRs from forks. |
| GitHub Variables | `GA4_ID_<STORE>`, `META_PIXEL_ID_<STORE>` | Public IDs, injected at build time. |
| Cloudflare Pages secrets (Production) | `STRIPE_SECRET_KEY` (live, restricted), `STRIPE_WEBHOOK_SECRET`, `ORDER_WEBHOOK_URL`, `ORDER_WEBHOOK_TOKEN`, `STRIPE_AUTOMATIC_TAX` | Encrypted. Set with `scripts/set-secrets.sh`. |
| Cloudflare Pages secrets (Preview) | The same names with **test-mode** values | Set in the dashboard → Settings → Variables and Secrets → Preview, so PR previews can never charge real cards. |
| Local | `apps/storefront/.dev.vars` | Test keys only. |

**Key rotation:** roll the key in Stripe, run `set-secrets.sh <store>`, then redeploy (Actions → Deploy → store). Rotate the Cloudflare token yearly or whenever someone leaves.

## Rollback plan

| Situation | Action | Time |
|---|---|---|
| Bad deploy (site broken, wrong prices) | **Actions → Rollback → store → Run** (empty ID = previous successful production deploy). Cloudflare switches traffic instantly; no rebuild. | < 1 min |
| Need a specific older version | Cloudflare dashboard → project → Deployments → copy the ID → Rollback workflow with that ID (or the "Rollback to this deployment" button) | < 1 min |
| Make the fix permanent | `git revert <bad-sha>` → PR → merge, so the next deploy doesn't bring the problem back | minutes |
| Checkout/payment incident | Roll back, **and** in Stripe pause the webhook endpoint or deactivate the restricted key if you suspect a leak. Orders already paid stay in Stripe, and the webhook retries for up to 3 days once it's re-enabled. | minutes |
| Supplier stock-out / product problem | Set a lower `price` or remove the product from `products.json` and from `featured`/`bundles` → merge → auto-deploy. Pause its ads. | minutes |

The post-deploy smoke test fails the workflow, and links to the Rollback workflow, if a store doesn't respond correctly after deployment.

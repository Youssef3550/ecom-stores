#!/usr/bin/env bash
# Pushes runtime secrets for one store's Pages Functions into Cloudflare (encrypted; never stored in Git).
# Values are read from the environment, or prompted for (input hidden) when missing.
# Usage: bash scripts/set-secrets.sh clinch
# (Sets PRODUCTION secrets. For preview deployments use test keys via the Cloudflare dashboard →
#  project → Settings → Variables and Secrets → Preview.)
#
#   STRIPE_SECRET_KEY        sk_live_... (production) or sk_test_... (preview) — use a RESTRICTED key, see docs/ACCESS-AND-SECRETS.md
#   STRIPE_WEBHOOK_SECRET    whsec_...  from the store's webhook endpoint in Stripe
#   ORDER_WEBHOOK_URL        optional — your Make/Zapier/n8n order automation URL
#   ORDER_WEBHOOK_TOKEN      optional — shared secret your automation checks
#   STRIPE_AUTOMATIC_TAX     optional — "true" once Stripe Tax is configured
set -euo pipefail
cd "$(dirname "$0")/.."
id="${1:?usage: set-secrets.sh <store>}"
env="production"
project=$(node -e "console.log(require('./stores/$id/store.json').cloudflareProject)")

put() {
  local name="$1" required="$2" value="${!1:-}"
  if [ -z "$value" ]; then
    if [ "$required" = "optional" ]; then read -r -s -p "$name (optional, Enter to skip): " value; echo; [ -z "$value" ] && return 0
    else read -r -s -p "$name: " value; echo; fi
  fi
  if [ "$name" = "STRIPE_SECRET_KEY" ] && [ "$env" = "production" ] && [[ "$value" != sk_live_* && "$value" != rk_live_* ]]; then
    echo "⚠  $name for production is not a live key — continuing anyway (test mode)."
  fi
  printf '%s' "$value" | npx wrangler pages secret put "$name" --project-name="$project" >/dev/null
  echo "✓ $name set on $project ($env)"
}

put STRIPE_SECRET_KEY required
put STRIPE_WEBHOOK_SECRET required
put ORDER_WEBHOOK_URL optional
put ORDER_WEBHOOK_TOKEN optional
put STRIPE_AUTOMATIC_TAX optional
echo "Done. Secrets apply to the next deployment — re-run the Deploy workflow for '$id' if the site is already live."

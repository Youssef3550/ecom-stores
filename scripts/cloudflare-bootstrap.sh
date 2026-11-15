#!/usr/bin/env bash
# One-time setup: creates one Cloudflare Pages project per store (production branch = main).
# Requires: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID exported in your shell.
# Usage: bash scripts/cloudflare-bootstrap.sh            (all stores)
#        bash scripts/cloudflare-bootstrap.sh clinch     (one store)
set -euo pipefail
cd "$(dirname "$0")/.."
: "${CLOUDFLARE_API_TOKEN:?export CLOUDFLARE_API_TOKEN first}"
: "${CLOUDFLARE_ACCOUNT_ID:?export CLOUDFLARE_ACCOUNT_ID first}"

STORES=("$@"); [ ${#STORES[@]} -eq 0 ] && STORES=($(ls stores))
for id in "${STORES[@]}"; do
  project=$(node -e "console.log(require('./stores/$id/store.json').cloudflareProject)")
  domain=$(node -e "console.log(require('./stores/$id/store.json').domain)")
  echo "▶ $id → Pages project '$project'"
  npx wrangler pages project create "$project" --production-branch=main 2>&1 | grep -v "already exists" || true
  echo "   Custom domain: in the Cloudflare dashboard → Workers & Pages → $project → Custom domains → add $domain (and www.$domain)."
done
echo
echo "Next: bash scripts/set-secrets.sh <store> to add the Stripe keys to each project."

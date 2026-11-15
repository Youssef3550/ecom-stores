// Unit economics shared by validation, docs generation and the CI margin gate.
// All amounts in EUR. Retail prices are VAT-inclusive (21% in BE and NL).

export const VAT_RATE = 0.21;
// Conservative blended payment fee across Bancontact (1.4% + €0.25), iDEAL (~€0.29) and EU cards (~1.5% + €0.25).
export const PAYMENT_PCT = 0.018;
export const PAYMENT_FIXED = 0.25;
export const MIN_GROSS_MARGIN = 0.3;
// Planning conversion rate for paid search/shopping clicks (NL e-commerce search benchmarks: ~2.8–3.5%).
export const PLANNING_CVR = 0.03;
// Median Google Shopping CPC for European e-commerce (smec Market Observer 2026).
export const SHOPPING_CPC_EUR = 0.36;
export const USD_TO_EUR = 0.92;

const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

export function economics(p) {
  const netRevenue = p.price / (1 + VAT_RATE);
  const paymentFee = p.price * PAYMENT_PCT + PAYMENT_FIXED;
  // Landed cost assumes WE pay shipping on every order (conservative: ignores shipping charged below the free threshold).
  const landedCost = p.unitCost + p.shippingCost + (p.duty ?? 0);
  const grossProfit = netRevenue - landedCost - paymentFee;
  const grossMargin = grossProfit / netRevenue;
  const breakEvenRoas = p.price / grossProfit; // revenue (incl. VAT, as ad platforms report it) per €1 ad spend to break even
  const breakEvenCpa = grossProfit;
  const breakEvenCpc = grossProfit * PLANNING_CVR;
  const cpcEur = Math.max(p.cpcUsd?.nl ?? 0, p.cpcUsd?.be ?? 0) * USD_TO_EUR;
  return {
    netRevenue: round(netRevenue),
    paymentFee: round(paymentFee),
    landedCost: round(landedCost),
    grossProfit: round(grossProfit),
    grossMargin: round(grossMargin, 4),
    breakEvenRoas: round(breakEvenRoas),
    breakEvenCpa: round(breakEvenCpa),
    breakEvenCpc: round(breakEvenCpc),
    searchCpcEur: round(cpcEur),
    cpcHeadroom: round(breakEvenCpc - cpcEur),
    shoppingViable: breakEvenCpc >= SHOPPING_CPC_EUR,
  };
}

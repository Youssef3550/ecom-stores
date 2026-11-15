# Sourcing & fulfilment

## Supplier strategy
1. **Test phase (weeks 1–6): EU-warehouse dropshipping.** Use CJdropshipping's Germany warehouse, BigBuy (ES), or Spocket/Droppery (EU/NL suppliers). This gives 2–5 day delivery, no €3 import duty per item, and EU-based returns.
2. **Winners (≥ 2 orders/day for 2 weeks): private label + bulk stock in an EU 3PL.** Order 100–300 units with your logo from Alibaba, ship by sea or rail to an EU warehouse (CJ Frankfurt, or a Belgian/Dutch 3PL), and pay normal customs duty on the bulk shipment instead of €3 per parcel. This typically cuts unit cost by 30–50% and improves quality control.
3. Always keep a **fallback supplier** per product (listed in `products.json → supplier.fallback`).

## Validation per product (before it gets ad budget)
| Step | Pass criteria |
|---|---|
| 1. Supplier shortlist | ≥ 2 suppliers; EU stock confirmed for the exact variant; listing ≥ 4.5★ with ≥ 100 orders |
| 2. Compliance docs | CE/DoC (electronics), GPSR manufacturer + EU contact, material certificates (see COMPLIANCE.md) |
| 3. **Sample order** to your own address in Belgium | Arrives in ≤ 5 working days; packaging is neutral (no Chinese invoice or price inside); quality matches the listing |
| 4. Real cost check | Update `unitCost`, `shippingCost` and `duty` in `products.json` with the actual figures → CI re-checks the ≥ 30% margin |
| 5. Content | Shoot 4–6 photos and 2–3 short vertical videos with the sample. These become your ad creatives and product images. |

## Order automation (no manual copy-paste)
The Stripe webhook posts this JSON to `ORDER_WEBHOOK_URL` for every paid order:

```json
{ "type": "order.paid", "store": "clinch", "orderId": "cs_live_…", "amountTotal": 62.85, "amountShipping": 0,
  "customer": { "name": "…", "email": "…", "phone": "…" },
  "shippingAddress": { "line1": "…", "postal_code": "3580", "city": "Beringen", "country": "BE" },
  "items": [{ "slug": "bokshandschoenen-pro", "variant": "14 oz", "name": "…", "qty": 1, "unitPrice": 49.95 }] }
```

A Make/Zapier/n8n scenario should then:
1. Check `Authorization: Bearer <ORDER_WEBHOOK_TOKEN>`.
2. Map `slug + variant` to the supplier SKU (keep a small lookup sheet).
3. Create the order through the **CJdropshipping or BigBuy API** (or email the supplier for manual suppliers).
4. Append the order to a Google Sheet (order log + profit per order).
5. Email the customer an order confirmation in Dutch. Stripe already sends the payment receipt.
6. When the supplier returns tracking, email the track & trace link.
7. `order.refunded` → mark it in the sheet and cancel at the supplier if it hasn't shipped yet.

Customer service: reply within 1 working day (the promise on the contact page), and keep templates for "where is my order", returns and defects.

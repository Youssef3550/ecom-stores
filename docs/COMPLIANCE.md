# Legal & compliance checklist (Belgium seller → BE + NL consumers)

> This is a practical checklist, **not legal or tax advice**. Have your accountant (or Unizo/your social insurance fund) confirm the business and VAT set-up, and have a lawyer review the terms before going live. Placeholders in `store.json → company` must be filled in first.

## 1. Business set-up
- [ ] Self-employed status (main or **secondary occupation / bijberoep**) via a business counter (ondernemingsloket). Get a **KBO/enterprise number** and register with a social insurance fund.
- [ ] Activate **VAT**. The small-business exemption has limits and complicates cross-border sales; discuss with your accountant.
- [ ] Business bank account, linked to Stripe.
- [ ] Bookkeeping: keep invoices and receipts for 7+ years (Stripe exports, supplier invoices, ad invoices with VAT reverse-charge for Meta/Google).

## 2. VAT on sales to the Netherlands
- [ ] Prices are shown **incl. 21% VAT** (the BE and NL standard rate is the same for these products).
- [ ] Once your **total cross-border B2C sales to other EU countries exceed €10,000/year**, you charge Dutch VAT and declare it via **OSS (One-Stop-Shop)**. Register for OSS from the start if you expect to cross the threshold.
- [ ] Optional: enable **Stripe Tax** (`STRIPE_AUTOMATIC_TAX=true`) once your registrations are set up.

## 3. Website information duties (Belgian Economic Law Code, EU e-commerce rules)
- [ ] Company name, geographic address, e-mail, **enterprise/VAT number** in the footer and on the contact page (already templated).
- [ ] Clear total price incl. VAT and shipping before payment (handled by the cart and Stripe Checkout).
- [ ] A clear order button ("Afrekenen" → Stripe "Betalen"). The terms checkbox is on the cart page.
- [ ] **Price reductions (Omnibus):** if you ever show a "was" price, it must be the **lowest price of the previous 30 days**. The bundle block shows the sum of the individual prices, not a former price, which is allowed. Don't invent compare-at prices.

## 4. Consumer rights
- [ ] **14-day right of withdrawal** with the model form (templated on `/info/retourneren/`). Refund within 14 days, including the standard outbound shipping.
- [ ] Hygiene exception only for **sealed** products where the seal is broken (mouthguards, earplugs). Already stated on those products.
- [ ] **2-year legal guarantee** on all goods.
- [ ] Delivery within 30 days at the latest (stated in the terms). With dropshipping, only promise 2–5 days for **EU-warehouse** items; otherwise update `deliveryDays`.
- [ ] Out-of-court dispute route: Belgian Consumentenombudsdienst. (The EU ODR platform was discontinued in July 2025, so no ODR link is needed.)

## 5. Privacy & cookies (GDPR + Belgian GBA / Dutch AP)
- [ ] Privacy policy and cookie table (templated). Fill in the processors you actually use.
- [ ] **No analytics or marketing tags before consent.** Already implemented: GA4 and Meta load only after opt-in, a reject button sits on the first layer, and choices can be changed via the footer link.
- [ ] Data processing agreements: Stripe, Cloudflare, Google and Meta (accepted in their dashboards), plus your order automation tool and suppliers.
- [ ] Supplier data sharing: send only the name, address and phone needed for delivery.
- [ ] Email marketing only with opt-in (not added yet). Don't add customers to newsletters by default.

## 6. Product safety & compliance (the biggest dropshipping risk)
- [ ] **GPSR (EU 2023/988, applicable since 13 Dec 2024):** every product listing must show the **manufacturer's name and contact details**, an **EU responsible person**, product identifiers, and **warnings/instructions in Dutch** (and French if you add FR). Ask each supplier for these before listing, and add them to the product's `specs`.
- [ ] **CE marking + Declaration of Conformity** on file for every electrical, electronic or radio product: massage gun, radiator fan, smart plugs (**RED, including the cybersecurity requirements that apply since 1 Aug 2025**), energy meter, motion-sensor lights, hand warmers (lithium **UN38.3** for transport), wake-up light, white-noise machine, sleep headphones, USB-C hub, vertical mouse, LED collar, monitor light bar (plus an **EPREL** energy-label registration for light sources).
- [ ] **WEEE & batteries:** as the first seller placing electrical goods on the Belgian market, join **Recupel** (EEE) and **Bebat** (batteries). For NL, check the producer obligations (Stichting OPEN, Stibat), or use suppliers who act as the importer of record.
- [ ] **Packaging EPR:** check the Fost Plus (BE) and Afvalfonds Verpakkingen (NL) thresholds; small volumes are often below them, but verify.
- [ ] **Materials:** BPA-free and food-contact declarations for lick mats and slow feeders; OEKO-TEX certificate for the silk pillowcase; latex warning for resistance bands.
- [ ] Toys: if you market the reflex ball to children under 14, it falls under the Toy Safety Directive. Keep it positioned as sports equipment.

## 7. Advertising & claims
- [ ] **No medical or health claims.** The copy is written to avoid them (mouth tape, blue-light glasses, acupressure mat, massage gun, earplugs, ankle supports). Keep it that way in ads; Meta rejects these and they can make a product a medical device.
- [ ] **No unsubstantiated savings percentages** ("save 22%") for the radiator fan, shower head or radiator foil, unless you have your own test data.
- [ ] **No fake reviews, testimonials, scarcity timers or "only 3 left" messages.** Add reviews only from real buyers (for example via a post-purchase email asking for a review, with moderation shown).
- [ ] Don't use competitor trademarks (Theragun, FURminator, ChomChom, Loop, BenQ ScreenBar, SpeedComfort, Philips) in product names, ad copy or as keywords in ad text. Bidding on them as keywords is legally sensitive; avoid it at first.
- [ ] Influencer content must be labelled as advertising (#reclame/#ad).

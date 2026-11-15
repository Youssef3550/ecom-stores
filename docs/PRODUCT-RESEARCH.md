# Product research: 50 validated products across 5 stores

_Generated from `stores/*/products.json` by `npm run docs`. Do not edit by hand._

## Method & data sources

- **Demand:** monthly Google search volume, 3-month trend, CPC and paid competition for Dutch-language keywords in the Netherlands (location 2528) and Belgium (2056), pulled via DataForSEO (OpenSEO) on 15 Nov 2026. "0" means too low to measure on that exact term. Several products are deliberately **social-first** (low search, high visual appeal), as noted per product.
- **Competition & price anchors:** live retail checks on bol.com, Coolblue, Gamma, Hornbach, Decathlon, ANWB and brand sites (Nov 2026).
- **Supplier costs:** **estimates** from EU-warehouse dropship platforms (CJdropshipping DE, BigBuy, Spocket/Droppery) and Alibaba listing ranges. **Every unit cost must be confirmed by a sample order before launch**; update `unitCost` and the CI margin gate re-checks automatically.
- **Import cost:** non-EU (CN) origin adds the EU's flat **€3 customs duty per item** on parcels ≤ €150 (in force since 1 Jul 2026, temporary until 1 Jul 2028). EU-warehouse stock avoids it and ships in 2–5 days.
- **Margin formula:** net revenue = price ÷ 1.21 (21% VAT BE/NL). Gross profit = net − unit cost − shipping − duty − payment fee (1.8% + €0.25, blended Bancontact/iDEAL/cards). Shipping is treated as fully paid by us (conservative). **Gate: ≥ 30% gross margin** (enforced in CI).
- **Break-even ROAS** = price incl. VAT ÷ gross profit (ad platforms report VAT-inclusive revenue). **Break-even CPC** = gross profit × 3% planning CVR. CPCs converted at $1 = €0.92.

## Portfolio summary

| Store | Niche | Products | Combined monthly searches (NL+BE) | Median gross margin | Median break-even ROAS | Products profitable on Shopping at median CPC (€0,36) |
|---|---|---:|---:|---:|---:|---:|
| **Clinch Supply** (`clinch`) | Kickboks-, boks- en Muay Thai-trainingsgear voor thuis en in de club | 10 | 48.810 | 53.9% | 2.25 | 3/10 |
| **Deskwerk** (`deskwerk`) | Ergonomie en organisatie voor de thuiswerkplek en het gaming-bureau | 10 | 14.000 | 54.8% | 2.21 | 6/10 |
| **Diepslaap** (`diepslaap`) | Slaapaccessoires voor donkerder, stiller en comfortabeler slapen | 10 | 60.870 | 55.9% | 2.16 | 7/10 |
| **Snuffel & Co** (`snuffel`) | Verrijking en verzorging voor honden: rustiger eten, slimmer spelen, schoner huis | 10 | 6.580 | 54.5% | 2.22 | 1/10 |
| **Warmwijs** (`warmwijs`) | Slimme, betaalbare producten om je huis warmer te houden en minder energie te verspillen | 10 | 33.790 | 51.7% | 2.34 | 4/10 |

### Key finding on paid search

At single-item order values, most products **cannot profitably buy their head keyword on Google Search** (keyword CPC > break-even CPC). This is normal for €15–€60 products and shapes the channel plan in [GROWTH-PLAN.md](GROWTH-PLAN.md): lead with **Meta/TikTok creatives** (social-first products), **Google Shopping/PMax** (European median Shopping CPC is ≈€0.36), **bundles and free-shipping thresholds** to lift AOV, and **SEO/AEO content** for the long tail. Run `npm run validate -- --verbose` for the per-product list.

---

## Clinch Supply: Kickboks-, boks- en Muay Thai-trainingsgear voor thuis en in de club

Domain (suggested): `clinchsupply.be` · Free shipping from €50,00 · Bundle: Starterspakket (−10%)

| # | Product | Keyword | Searches NL / BE | CPC NL / BE (USD) | Price | Landed cost | Gross margin | Break-even ROAS |
|---:|---|---|---:|---:|---:|---:|---:|---:|
| 1 | Bokshandschoenen Pro | bokshandschoenen | 9.900 / 2.400 | 1.46 / 1.26 | €49,95 | €18,00 | 53.6% | 2.26 |
| 2 | Bandages 4,5 m (2 paar) | bandages boksen | 1.600 / 70 | 1.22 / 0.50 | €12,95 | €4,90 | 49.7% | 2.43 |
| 3 | Speed Springtouw met Kogellagers | springtouw | 3.600 / 1.300 | 0.63 / 0.57 | €19,95 | €6,60 | 56.3% | 2.15 |
| 4 | Weerstandsbanden Set (5 standen) | weerstandsbanden | 3.600 / 590 | 0.54 / 0.74 | €24,95 | €8,20 | 56.8% | 2.13 |
| 5 | Reflexbal met Hoofdband | reflexbal | 260 / 110 | 0.44 / 0.52 | €14,95 | €5,10 | 54.5% | 2.22 |
| 6 | Gebitsbeschermer met Bewaardoosje | gebitsbeschermer | 320 / 110 | 0.63 / 0.52 | €12,95 | €4,20 | 56.2% | 2.15 |
| 7 | Gel Binnenhandschoenen | binnenhandschoenen boksen | 590 / 50 | 1.00 / 0.73 | €19,95 | €7,00 | 53.8% | 2.25 |
| 8 | Curved Stootkussens (paar) | stootkussens | 140 / 30 | 1.08 / 1.07 | €44,95 | €17,00 | 51.4% | 2.35 |
| 9 | Enkelbandages Muay Thai (paar) | enkelbandage | 590 / 50 | 0.60 / 0.50 | €14,95 | €5,20 | 53.7% | 2.25 |
| 10 | Mini Massage Gun | massage gun | 18.100 / 5.400 | 0.73 / 0.65 | €59,95 | €21,50 | 53.9% | 2.24 |

### Bokshandschoenen Pro

- **Why this product:** Grootste transactionele zoekterm in de niche, met duidelijke koopintentie. Ruimte tussen Decathlon en de premium merken voor een €45–50 mid-range product met eigen merk.
- **Search & trend data:** "bokshandschoenen": NL 9.900/mo, BE 2.400/mo. Stijgend: NL 8.100 → 12.100/maand in de laatste 3 maanden; BE 1.000 → 2.900.
- **Seasonality:** Piek jan (goede voornemens) en sep (clubseizoen); rest van het jaar stabiel
- **Competitors:** Decathlon Outshock (€20–40), Venum/Fairtex/Hayabusa (€60–130), bol.com-private labels (€25–45)
- **Estimated CPC:** NL $1.46 · BE $1.26 (≈ €1.34 max). Break-even CPC at 3% CVR: €0.66.
- **Supplier:** Alibaba private label (PU-leer, logo vanaf ±100 st.). Fallback: CJdropshipping (DE-warehouse) voor testfase. Search term: `PU leather boxing gloves 10oz 12oz 14oz 16oz private label` (origin: CN).
- **Target price & margin:** €49,95 incl. VAT → net €41,28 − unit €9,50 − shipping €5,50 − duty €3,00 − payment €1,15 = **€22,13 gross profit (53.6%)**. Break-even ROAS 2.26, break-even CPA €22,13.
- **Weight / return risk:** ~0.75 kg · middel
- **Risks:** Verzadigde markt; onderscheid via merk + bundel nodig; Maatfouten (oz) leiden tot retouren: maattabel prominent tonen; Kwaliteit PU-leer en stiksels eerst met staal testen.

### Bandages 4,5 m (2 paar)

- **Why this product:** Verbruiksproduct dat vechters meerdere keren per jaar kopen: ideaal als upsell bij handschoenen en voor herhaalaankopen.
- **Search & trend data:** "bandages boksen": NL 1.600/mo, BE 70/mo. Stijgend in NL: 880 → 1.600/maand.
- **Seasonality:** Jaarrond, kleine piek januari
- **Competitors:** Decathlon (€6–10), Venum/Adidas (€12–20 per paar), bol.com-bundels
- **Estimated CPC:** NL $1.22 · BE $0.50 (≈ €1.12 max). Break-even CPC at 3% CVR: €0.16.
- **Supplier:** CJdropshipping (DE-warehouse) of Alibaba private label. Fallback: AliExpress 'ship from Europe'. Search term: `boxing hand wraps 4.5m semi elastic thumb loop` (origin: EU).
- **Target price & margin:** €12,95 incl. VAT → net €10,70 − unit €1,40 − shipping €3,50 − payment €0,48 = **€5,32 gross profit (49.7%)**. Break-even ROAS 2.43, break-even CPA €5,32.
- **Weight / return risk:** ~0.15 kg · laag
- **Risks:** Lage prijs: rendabel vooral als upsell of in bundel; Kleurafgifte bij eerste wasbeurt testen.

### Speed Springtouw met Kogellagers

- **Why this product:** Evergreen conditieproduct dat elke vechter gebruikt. Geschikt voor social video (footwork-content) en lage verzendkosten.
- **Search & trend data:** "springtouw": NL 3.600/mo, BE 1.300/mo. Stabiel in NL; stijgend in BE (720 → 1.000).
- **Seasonality:** Piek januari; stabiel de rest van het jaar
- **Competitors:** Decathlon (€5–15), Crossrope (€60+), Amazon-merken (€10–20)
- **Estimated CPC:** NL $0.63 · BE $0.57 (≈ €0.58 max). Break-even CPC at 3% CVR: €0.28.
- **Supplier:** CJdropshipping (DE-warehouse). Fallback: BigBuy. Search term: `speed jump rope ball bearing steel cable adjustable aluminium handle` (origin: EU).
- **Target price & margin:** €19,95 incl. VAT → net €16,49 − unit €2,80 − shipping €3,80 − payment €0,61 = **€9,28 gross profit (56.3%)**. Break-even ROAS 2.15, break-even CPA €9,28.
- **Weight / return risk:** ~0.25 kg · laag
- **Risks:** Concurrentie op prijs met Decathlon: verkopen op kwaliteit (kogellagers, verstelbare kabel); Kabel kan knikken: staal testen.

### Weerstandsbanden Set (5 standen)

- **Why this product:** Breed fitnessproduct dat past bij krachtwerk voor vechtsporters (heupen, schouders). Licht, compact en weinig retouren.
- **Search & trend data:** "weerstandsbanden": NL 3.600/mo, BE 590/mo. Stijgend in NL: 4.400 → 5.400.
- **Seasonality:** Piek jan–feb; stabiel daarna
- **Competitors:** Decathlon (€10–25), bol.com-sets (€15–30), Gymshark (€25+)
- **Estimated CPC:** NL $0.54 · BE $0.74 (≈ €0.68 max). Break-even CPC at 3% CVR: €0.35.
- **Supplier:** BigBuy of CJdropshipping (DE). Fallback: Alibaba private label. Search term: `latex resistance loop bands set 5 levels carry bag` (origin: EU).
- **Target price & margin:** €24,95 incl. VAT → net €20,62 − unit €4,00 − shipping €4,20 − payment €0,70 = **€11,72 gross profit (56.8%)**. Break-even ROAS 2.13, break-even CPA €11,72.
- **Weight / return risk:** ~0.3 kg · laag
- **Risks:** Latexallergie: vermelden en een TPE-variant overwegen; Generiek product: positioneren voor vechtsport-specifieke oefeningen.

### Reflexbal met Hoofdband

- **Why this product:** Zeer visueel product dat goed werkt in korte video's: goedkoop om te testen en een sterke impulsaankoop of cadeau.
- **Search & trend data:** "reflexbal": NL 260/mo, BE 110/mo. Lage zoekvraag maar sterk op TikTok/Reels: social-first product.
- **Seasonality:** Jaarrond; extra cadeaupiek in december
- **Competitors:** bol.com (€8–20), Amazon-merken
- **Estimated CPC:** NL $0.44 · BE $0.52 (≈ €0.48 max). Break-even CPC at 3% CVR: €0.20.
- **Supplier:** CJdropshipping (DE). Fallback: AliExpress 'ship from Europe'. Search term: `boxing reflex ball headband 2 balls` (origin: EU).
- **Target price & margin:** €14,95 incl. VAT → net €12,36 − unit €1,60 − shipping €3,50 − payment €0,52 = **€6,74 gross profit (54.5%)**. Break-even ROAS 2.22, break-even CPA €6,74.
- **Weight / return risk:** ~0.12 kg · laag
- **Risks:** Weinig zoekvraag: afhankelijk van social ads; Kan als 'gadget' worden gezien: positioneren als hand-oogcoördinatie-training.

### Gebitsbeschermer met Bewaardoosje

- **Why this product:** Verplicht bij sparring, dus elke beginner koopt er een. Lage kostprijs en een logisch onderdeel van het starterspakket.
- **Search & trend data:** "gebitsbeschermer": NL 320/mo, BE 110/mo. Licht stijgend: 260 → 390.
- **Seasonality:** Piek bij de start van het clubseizoen (sep)
- **Competitors:** Decathlon (€5–15), Shock Doctor/SISU (€20–40)
- **Estimated CPC:** NL $0.63 · BE $0.52 (≈ €0.58 max). Break-even CPC at 3% CVR: €0.18.
- **Supplier:** CJdropshipping (DE). Fallback: Alibaba private label. Search term: `boil and bite mouth guard boxing case` (origin: EU).
- **Target price & margin:** €12,95 incl. VAT → net €10,70 − unit €1,00 − shipping €3,20 − payment €0,48 = **€6,02 gross profit (56.2%)**. Break-even ROAS 2.15, break-even CPA €6,02.
- **Weight / return risk:** ~0.06 kg · laag (hygiëne: geen retour na opening)
- **Risks:** Hygiëne-uitzondering op herroepingsrecht alleen als de verzegeling verbroken is: duidelijk melden; Geen veiligheidsclaims ('voorkomt blessures') maken; Productveiligheid: BPA-vrij certificaat bij de leverancier opvragen.

### Gel Binnenhandschoenen

- **Why this product:** Snel alternatief voor bandages voor recreatieve sporters en fitboksers. Goed als upsell en met een redelijke marge.
- **Search & trend data:** "binnenhandschoenen boksen": NL 590/mo, BE 50/mo. Stabiel; in BE stijgend vanaf een laag niveau.
- **Seasonality:** Jaarrond
- **Competitors:** Decathlon (€10–15), Venum (€25)
- **Estimated CPC:** NL $1.00 · BE $0.73 (≈ €0.92 max). Break-even CPC at 3% CVR: €0.27.
- **Supplier:** CJdropshipping (DE). Fallback: Alibaba. Search term: `gel inner gloves boxing quick wraps` (origin: EU).
- **Target price & margin:** €19,95 incl. VAT → net €16,49 − unit €3,20 − shipping €3,80 − payment €0,61 = **€8,88 gross profit (53.8%)**. Break-even ROAS 2.25, break-even CPA €8,88.
- **Weight / return risk:** ~0.15 kg · laag
- **Risks:** Maat S/M vs L/XL: maattabel tonen; Puristen zullen bandages verkiezen: richten op fitboksers.

### Curved Stootkussens (paar)

- **Why this product:** Partnertraining thuis groeit. Hogere orderwaarde en een logische combinatie met handschoenen (koppelverkoop voor duo's).
- **Search & trend data:** "stootkussens": NL 140/mo, BE 30/mo. Lage zoekvraag. Alternatieve zoektermen: 'focus pads', 'bokspads', 'handpads'.
- **Seasonality:** Jaarrond; cadeaupiek in december
- **Competitors:** Decathlon (€20–35), Fairtex/Venum (€50–90)
- **Estimated CPC:** NL $1.08 · BE $1.07 (≈ €0.99 max). Break-even CPC at 3% CVR: €0.57.
- **Supplier:** Alibaba private label. Fallback: CJdropshipping. Search term: `curved focus mitts boxing pads pair PU` (origin: CN).
- **Target price & margin:** €44,95 incl. VAT → net €37,15 − unit €8,50 − shipping €5,50 − duty €3,00 − payment €1,06 = **€19,09 gross profit (51.4%)**. Break-even ROAS 2.35, break-even CPA €19,09.
- **Weight / return risk:** ~0.8 kg · laag
- **Risks:** Zoekvolume op deze exacte term is laag: ook focus pads/bokspads targeten; Zwaarder pakket, dus hogere verzendkosten.

### Enkelbandages Muay Thai (paar)

- **Why this product:** Specifiek product voor Muay Thai en kickboksen: lage kostprijs, lichte verzending en een logisch onderdeel van een bundel.
- **Search & trend data:** "enkelbandage": NL 590/mo, BE 50/mo. Stabiel.
- **Seasonality:** Jaarrond
- **Competitors:** Decathlon (€8–12), Fairtex/Venum (€15–25)
- **Estimated CPC:** NL $0.60 · BE $0.50 (≈ €0.55 max). Break-even CPC at 3% CVR: €0.20.
- **Supplier:** CJdropshipping (DE). Fallback: AliExpress 'ship from Europe'. Search term: `muay thai ankle support elastic pair` (origin: EU).
- **Target price & margin:** €14,95 incl. VAT → net €12,36 − unit €1,80 − shipping €3,40 − payment €0,52 = **€6,64 gross profit (53.7%)**. Break-even ROAS 2.25, break-even CPA €6,64.
- **Weight / return risk:** ~0.1 kg · laag
- **Risks:** Geen medische claims (spreek van 'steun', niet van 'blessurepreventie'); Ook zoektermen als 'enkelsteun' meenemen.

### Mini Massage Gun

- **Why this product:** Grootste zoekvolume van de hele lijst. Een recovery-product verhoogt de gemiddelde orderwaarde en is een sterk cadeau in Q4. Kies het betere model (brushless) in plaats van het goedkoopste.
- **Search & trend data:** "massage gun": NL 18.100/mo, BE 5.400/mo. Hoog en stabiel (NL 12.100 → 14.800).
- **Seasonality:** Piek nov–dec (cadeau) en januari
- **Competitors:** Theragun Mini (±€199), Decathlon (€40–80), bol.com-merken (€30–80)
- **Estimated CPC:** NL $0.73 · BE $0.65 (≈ €0.67 max). Break-even CPC at 3% CVR: €0.80.
- **Supplier:** Alibaba (logo vanaf ±100 st.; gemeld $3,30–6,93 voor basismodellen). Fallback: CJdropshipping (DE). Search term: `mini massage gun brushless 4 heads type-c` (origin: CN).
- **Target price & margin:** €59,95 incl. VAT → net €49,55 − unit €14,00 − shipping €4,50 − duty €3,00 − payment €1,33 = **€26,72 gross profit (53.9%)**. Break-even ROAS 2.24, break-even CPA €26,72.
- **Weight / return risk:** ~0.5 kg · middel
- **Risks:** Elektronica: CE (LVD/EMC), RoHS, batterijtransport (UN38.3) en WEEE/Recupel-bijdrage; Defecten geven hogere retourkosten: kwaliteitscontrole op een staal; Geen medische claims ('vermindert pijn').

---

## Deskwerk: Ergonomie en organisatie voor de thuiswerkplek en het gaming-bureau

Domain (suggested): `deskwerk.be` · Free shipping from €50,00 · Bundle: Clean Desk-set (−10%)

| # | Product | Keyword | Searches NL / BE | CPC NL / BE (USD) | Price | Landed cost | Gross margin | Break-even ROAS |
|---:|---|---|---:|---:|---:|---:|---:|---:|
| 1 | Aluminium Laptopstandaard | laptopstandaard | 1.600 / 480 | 0.99 / 0.98 | €34,95 | €11,30 | 57.8% | 2.09 |
| 2 | Monitor Lichtbalk | monitor lamp | 590 / 110 | 0.43 / 0.37 | €44,95 | €19,00 | 46.0% | 2.63 |
| 3 | Bureau-onderlegger XL | bureau onderlegger | 2.400 / 1.300 | 0.79 / 0.92 | €24,95 | €8,70 | 54.4% | 2.22 |
| 4 | Kabelmanagement Set | kabelgoot bureau | 260 / 480 | 1.16 / 1.38 | €29,95 | €10,00 | 56.4% | 2.14 |
| 5 | Aluminium Telefoonhouder | telefoonhouder bureau | 590 / 50 | 0.56 / 0.44 | €17,95 | €5,80 | 57.0% | 2.12 |
| 6 | Ergonomische Voetensteun | voetensteun bureau | 1.000 / 170 | 1.30 / 1.32 | €39,95 | €12,50 | 59.2% | 2.04 |
| 7 | Polssteun Set (toetsenbord + muis) | polssteun muis | 110 / 20 | 0.96 / 0.28 | €19,95 | €6,80 | 55.1% | 2.20 |
| 8 | USB-C Hub 7-in-1 | usb c hub | 2.900 / 720 | 0.99 / 0.84 | €39,95 | €15,80 | 49.2% | 2.46 |
| 9 | Headset Houder met Klem | headset houder | 260 / 70 | 0.33 / 0.51 | €16,95 | €5,80 | 54.6% | 2.21 |
| 10 | Draadloze Verticale Muis | verticale muis | 720 / 170 | 0.91 / 0.86 | €32,95 | €13,30 | 48.1% | 2.52 |

### Aluminium Laptopstandaard

- **Why this product:** Kernproduct voor thuiswerkers en studenten. Goed zoekvolume, geen elektronica, en dus weinig compliance-risico.
- **Search & trend data:** "laptopstandaard": NL 1.600/mo, BE 480/mo. Stijgend in NL (1.000 → 1.900).
- **Seasonality:** Piek jan en sep (werk/studie), cadeau in dec
- **Competitors:** Rain Design/Nulaxy (€30–60), bol.com/Hama (€15–35)
- **Estimated CPC:** NL $0.99 · BE $0.98 (≈ €0.91 max). Break-even CPC at 3% CVR: €0.50.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `foldable aluminium laptop stand adjustable 6 levels` (origin: EU).
- **Target price & margin:** €34,95 incl. VAT → net €28,88 − unit €6,50 − shipping €4,80 − payment €0,88 = **€16,71 gross profit (57.8%)**. Break-even ROAS 2.09, break-even CPA €16,71.
- **Weight / return risk:** ~0.45 kg · laag
- **Risks:** Concurrentie op prijs: verkopen op stabiliteit en opvouwbaarheid; Krassen bij levering: goede verpakking.

### Monitor Lichtbalk

- **Why this product:** Opvallend product voor de werkplek. BenQ verankert de prijsperceptie op €100+, dus €45 voelt als een slimme deal. Ook te targeten via 'bureaulamp'.
- **Search & trend data:** "monitor lamp": NL 590/mo, BE 110/mo. Stijgend (480 → 720). Aanvullend: 'bureaulamp' BE 2.900 en 'monitor light bar'.
- **Seasonality:** Piek in de donkere maanden
- **Competitors:** BenQ ScreenBar (€100–180), Xiaomi (±€40–50), Baseus (€30–50)
- **Estimated CPC:** NL $0.43 · BE $0.37 (≈ €0.40 max). Break-even CPC at 3% CVR: €0.51.
- **Supplier:** Alibaba (CE, flikkervrij, CRI>90). Fallback: CJdropshipping (DE). Search term: `monitor light bar asymmetric no glare usb-c CRI 95 remote` (origin: CN).
- **Target price & margin:** €44,95 incl. VAT → net €37,15 − unit €11,00 − shipping €5,00 − duty €3,00 − payment €1,06 = **€17,09 gross profit (46.0%)**. Break-even ROAS 2.63, break-even CPA €17,09.
- **Weight / return risk:** ~0.5 kg · middel
- **Risks:** Elektrische verlichting: CE (LVD/EMC), energielabel/EPREL-registratie voor lichtbronnen, WEEE/Recupel; Past niet op elk (gebogen) scherm: compatibiliteit vermelden; Merknaam BenQ/ScreenBar niet gebruiken in titels of ads.

### Bureau-onderlegger XL

- **Why this product:** Verrassend hoog zoekvolume in BE, en een product dat er op foto direct goed uitziet. Een ideaal instapproduct voor de 'Clean Desk'-bundel.
- **Search & trend data:** "bureau onderlegger": NL 2.400/mo, BE 1.300/mo. Stijgend in beide landen (BE 880 → 1.600).
- **Seasonality:** Jaarrond; piek in sep en jan
- **Competitors:** Orbitkey/Grovemade (€40–90), IKEA, bol.com (€15–30)
- **Estimated CPC:** NL $0.79 · BE $0.92 (≈ €0.85 max). Break-even CPC at 3% CVR: €0.34.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `PU leather desk mat 90x45 waterproof double sided` (origin: EU).
- **Target price & margin:** €24,95 incl. VAT → net €20,62 − unit €4,20 − shipping €4,50 − payment €0,70 = **€11,22 gross profit (54.4%)**. Break-even ROAS 2.22, break-even CPA €11,22.
- **Weight / return risk:** ~0.4 kg · laag
- **Risks:** Kleurverschil tussen foto en werkelijkheid: echte productfoto's maken; Rolverpakking: let op vouwen.

### Kabelmanagement Set

- **Why this product:** Een probleem dat iedereen met een thuiswerkplek kent. Sterke voor/na-content op TikTok en Reels, en een kernproduct van de bundel.
- **Search & trend data:** "kabelgoot bureau": NL 260/mo, BE 480/mo. Stijgend (BE 320 → 590).
- **Seasonality:** Jaarrond
- **Competitors:** IKEA Signum (±€10), bol.com-sets (€15–35), Ugreen
- **Estimated CPC:** NL $1.16 · BE $1.38 (≈ €1.27 max). Break-even CPC at 3% CVR: €0.42.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `under desk cable management tray no drill kit sleeves clips` (origin: EU).
- **Target price & margin:** €29,95 incl. VAT → net €24,75 − unit €5,00 − shipping €5,00 − payment €0,79 = **€13,96 gross profit (56.4%)**. Break-even ROAS 2.14, break-even CPA €13,96.
- **Weight / return risk:** ~0.6 kg · laag
- **Risks:** Kleefclips op sommige bureaus minder sterk: schroefoptie meeleveren; IKEA is goedkoop: verkopen als complete set zonder te boren.

### Aluminium Telefoonhouder

- **Why this product:** Een goedkope add-on met een zeer hoge marge, die de bundel compleet maakt.
- **Search & trend data:** "telefoonhouder bureau": NL 590/mo, BE 50/mo. Stijgend in NL (480 → 720).
- **Seasonality:** Jaarrond
- **Competitors:** bol.com (€8–20), Lamicall
- **Estimated CPC:** NL $0.56 · BE $0.44 (≈ €0.52 max). Break-even CPC at 3% CVR: €0.25.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `aluminium phone stand desk adjustable` (origin: EU).
- **Target price & margin:** €17,95 incl. VAT → net €14,83 − unit €2,20 − shipping €3,60 − payment €0,57 = **€8,46 gross profit (57.0%)**. Break-even ROAS 2.12, break-even CPA €8,46.
- **Weight / return risk:** ~0.2 kg · laag
- **Risks:** Laag zoekvolume in BE: vooral als upsell verkopen.

### Ergonomische Voetensteun

- **Why this product:** Hogere orderwaarde in de ergonomiecategorie, met solide zoekvolume in NL en een duidelijke 'kleine mensen aan een hoog bureau'-use case.
- **Search & trend data:** "voetensteun bureau": NL 1.000/mo, BE 170/mo. Stabiel tot stijgend.
- **Seasonality:** Jaarrond
- **Competitors:** Fellowes (€30–60), bol.com (€20–40)
- **Estimated CPC:** NL $1.30 · BE $1.32 (≈ €1.21 max). Break-even CPC at 3% CVR: €0.59.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `ergonomic foot rest under desk memory foam rocking` (origin: EU).
- **Target price & margin:** €39,95 incl. VAT → net €33,02 − unit €7,00 − shipping €5,50 − payment €0,97 = **€19,55 gross profit (59.2%)**. Break-even ROAS 2.04, break-even CPA €19,55.
- **Weight / return risk:** ~0.9 kg · laag
- **Risks:** Hoge CPC ($1,3): conversie optimaliseren; Volumineus pakket = hogere verzendkosten; Geen medische claims (rugpijn).

### Polssteun Set (toetsenbord + muis)

- **Why this product:** Een logische add-on bij de onderlegger, de muis en het toetsenbord. Een laagdrempelige aankoop die vooral als upsell rendeert.
- **Search & trend data:** "polssteun muis": NL 110/mo, BE 20/mo. Laag maar stabiel; ook 'polssteun toetsenbord' en 'muismat met polssteun' targeten.
- **Seasonality:** Jaarrond
- **Competitors:** Fellowes/Logitech (€15–30), bol.com (€10–20)
- **Estimated CPC:** NL $0.96 · BE $0.28 (≈ €0.88 max). Break-even CPC at 3% CVR: €0.27.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `memory foam wrist rest keyboard mouse pad set` (origin: EU).
- **Target price & margin:** €19,95 incl. VAT → net €16,49 − unit €3,00 − shipping €3,80 − payment €0,61 = **€9,08 gross profit (55.1%)**. Break-even ROAS 2.20, break-even CPA €9,08.
- **Weight / return risk:** ~0.3 kg · laag
- **Risks:** Zwak zoekvolume: als upsell inzetten, niet als advertentieproduct.

### USB-C Hub 7-in-1

- **Why this product:** Hoog zoekvolume en lichtgewicht. Laptops met alleen USB-C maken het een noodzakelijke aankoop.
- **Search & trend data:** "usb c hub": NL 2.900/mo, BE 720/mo. Stabiel tot stijgend.
- **Seasonality:** Jaarrond; piek Black Friday
- **Competitors:** Anker/Ugreen/Satechi (€25–60), bol.com (€15–40)
- **Estimated CPC:** NL $0.99 · BE $0.84 (≈ €0.91 max). Break-even CPC at 3% CVR: €0.49.
- **Supplier:** Alibaba (CE, 100 W PD, 4K60). Fallback: CJdropshipping (DE). Search term: `usb c hub 7 in 1 4K60 HDMI 100W PD SD card` (origin: CN).
- **Target price & margin:** €39,95 incl. VAT → net €33,02 − unit €9,00 − shipping €3,80 − duty €3,00 − payment €0,97 = **€16,25 gross profit (49.2%)**. Break-even ROAS 2.46, break-even CPA €16,25.
- **Weight / return risk:** ~0.1 kg · middel
- **Risks:** Compatibiliteit (4K60, DP Alt Mode) duidelijk vermelden om retouren te beperken; Sterke merkconcurrentie (Anker, Ugreen): beoordelingen en garantie belangrijk; Elektronica: CE/EMC, RoHS, WEEE/Recupel.

### Headset Houder met Klem

- **Why this product:** Een add-on voor gamers en thuiswerkers met een zeer hoge marge, die de clean-desk-boodschap versterkt.
- **Search & trend data:** "headset houder": NL 260/mo, BE 70/mo. Licht stijgend.
- **Seasonality:** Jaarrond; piek in december (gamers)
- **Competitors:** bol.com (€8–20), gamingmerken
- **Estimated CPC:** NL $0.33 · BE $0.51 (≈ €0.47 max). Break-even CPC at 3% CVR: €0.23.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `under desk headphone hanger clamp rotating` (origin: EU).
- **Target price & margin:** €16,95 incl. VAT → net €14,01 − unit €2,20 − shipping €3,60 − payment €0,56 = **€7,65 gross profit (54.6%)**. Break-even ROAS 2.21, break-even CPA €7,65.
- **Weight / return risk:** ~0.15 kg · laag
- **Risks:** Laag zoekvolume: als upsell inzetten.

### Draadloze Verticale Muis

- **Why this product:** Groeiende ergonomie-zoekterm. Logitech zit op €60+, dus een €30–35-alternatief is een duidelijk instapaanbod.
- **Search & trend data:** "verticale muis": NL 720/mo, BE 170/mo. Stijgend (NL 480 → 720).
- **Seasonality:** Jaarrond
- **Competitors:** Logitech Lift/MX Vertical (€60–110), bol.com (€15–35)
- **Estimated CPC:** NL $0.91 · BE $0.86 (≈ €0.84 max). Break-even CPC at 3% CVR: €0.39.
- **Supplier:** Alibaba (CE-RED, 2,4 GHz + Bluetooth). Fallback: CJdropshipping (DE). Search term: `wireless vertical mouse rechargeable bluetooth 2.4G silent` (origin: CN).
- **Target price & margin:** €32,95 incl. VAT → net €27,23 − unit €6,50 − shipping €3,80 − duty €3,00 − payment €0,84 = **€13,09 gross profit (48.1%)**. Break-even ROAS 2.52, break-even CPA €13,09.
- **Weight / return risk:** ~0.15 kg · middel
- **Risks:** Radio (2,4 GHz/BT): CE-RED, inclusief de cyberbeveiligingseisen; WEEE/Recupel; Linkshandigen: aparte variant of vermelden dat hij alleen voor rechtshandigen is; Geen medische claims (RSI).

---

## Diepslaap: Slaapaccessoires voor donkerder, stiller en comfortabeler slapen

Domain (suggested): `diepslaap.be` · Free shipping from €40,00 · Bundle: Nachtset (−12%)

| # | Product | Keyword | Searches NL / BE | CPC NL / BE (USD) | Price | Landed cost | Gross margin | Break-even ROAS |
|---:|---|---|---:|---:|---:|---:|---:|---:|
| 1 | 3D Slaapmasker | slaapmasker | 9.900 / 2.400 | 1.02 / 0.92 | €19,95 | €5,40 | 63.5% | 1.90 |
| 2 | Siliconen Oordopjes voor Slapen | oordopjes slapen | 9.900 / 1.900 | 1.32 / 1.24 | €19,95 | €8,00 | 47.8% | 2.53 |
| 3 | Moerbeizijden Kussensloop | zijden kussensloop | 5.400 / 880 | 1.92 / 1.78 | €44,95 | €16,80 | 51.9% | 2.33 |
| 4 | Wake-up Light met Zonsopgang | wake up light | 9.900 / 880 | 0.36 / 0.34 | €54,95 | €21,50 | 49.9% | 2.42 |
| 5 | White Noise Machine | white noise machine | 1.000 / 480 | 0.42 / 0.35 | €34,95 | €12,00 | 55.4% | 2.18 |
| 6 | Blauw-lichtbril | blauw licht bril | 5.400 / 880 | 0.82 / 0.68 | €24,95 | €5,70 | 69.0% | 1.75 |
| 7 | Spijkermat Set met Kussen | spijkermat | 70 / 1.300 | 0.47 / 0.61 | €39,95 | €13,00 | 57.7% | 2.10 |
| 8 | Mondtape (90 strips) | mondtape | 1.900 / 320 | 0.84 / 0.67 | €17,95 | €8,20 | 40.9% | 2.96 |
| 9 | Traagschuim Nekkussen voor op Reis | nekkussen | 6.600 / 1.300 | 0.80 / 0.61 | €27,95 | €9,30 | 56.5% | 2.14 |
| 10 | Slaapkoptelefoon Hoofdband | slaap koptelefoon | 390 / 70 | 0.49 / 0.51 | €29,95 | €9,60 | 58.0% | 2.09 |

### 3D Slaapmasker

- **Why this product:** Hoofdproduct van de winkel: hoog zoekvolume, lichtgewicht en een bewezen prijspunt van €15–20 op bol.com. Het instapproduct voor de bundel.
- **Search & trend data:** "slaapmasker": NL 9.900/mo, BE 2.400/mo. Hoog en stabiel (NL 12.100–14.800).
- **Seasonality:** Jaarrond; cadeaupiek in december, reispiek in de zomer
- **Competitors:** Manta (€49), Strex/Somnifiq/ORIGIN (€13–20), Action (€2)
- **Estimated CPC:** NL $1.02 · BE $0.92 (≈ €0.94 max). Break-even CPC at 3% CVR: €0.31.
- **Supplier:** CJdropshipping (DE). Fallback: Alibaba private label. Search term: `3D contoured sleep mask memory foam blackout adjustable` (origin: EU).
- **Target price & margin:** €19,95 incl. VAT → net €16,49 − unit €2,20 − shipping €3,20 − payment €0,61 = **€10,48 gross profit (63.5%)**. Break-even ROAS 1.90, break-even CPA €10,48.
- **Weight / return risk:** ~0.08 kg · laag
- **Risks:** Grote concurrentie: merk + bundel + 'zijslaper'-positionering; Prijsdruk van Action en bol.com-private labels.

### Siliconen Oordopjes voor Slapen

- **Why this product:** Even groot zoekvolume als slaapmaskers, met marktleider Loop op €25+. Er is ruimte voor een herbruikbaar alternatief rond €20.
- **Search & trend data:** "oordopjes slapen": NL 9.900/mo, BE 1.900/mo. Stabiel tot stijgend (NL 9.900 → 12.100).
- **Seasonality:** Jaarrond
- **Competitors:** Loop (€25–35), Alpine (€15–25), Ohropax/Kruidvat (€3–8)
- **Estimated CPC:** NL $1.32 · BE $1.24 (≈ €1.21 max). Break-even CPC at 3% CVR: €0.24.
- **Supplier:** Alibaba private label. Fallback: CJdropshipping (DE). Search term: `reusable silicone ear plugs sleeping noise reduction case` (origin: CN).
- **Target price & margin:** €19,95 incl. VAT → net €16,49 − unit €1,80 − shipping €3,20 − duty €3,00 − payment €0,61 = **€7,88 gross profit (47.8%)**. Break-even ROAS 2.53, break-even CPA €7,88.
- **Weight / return risk:** ~0.05 kg · laag (hygiëne: geen retour na opening)
- **Risks:** Geluidsreductie (dB/SNR) alleen vermelden met een EN 352-testcertificaat van de leverancier; Hogere CPC ($1,2–1,3): conversie moet sterk zijn; Hygiëne-uitzondering op retour duidelijk vermelden; Vormgeving van Loop niet kopiëren.

### Moerbeizijden Kussensloop

- **Why this product:** Product met een hoge orderwaarde en hoog zoekvolume in een cadeaucategorie. Een sterk instapproduct voor vrouwelijke doelgroepen (haar en huid).
- **Search & trend data:** "zijden kussensloop": NL 5.400/mo, BE 880/mo. Stabiel tot stijgend (4.400 → 5.400).
- **Seasonality:** Cadeaupiek in december en rond Moederdag
- **Competitors:** Slip (€80+), Simia/bol.com (€25–50), Zara Home
- **Estimated CPC:** NL $1.92 · BE $1.78 (≈ €1.77 max). Break-even CPC at 3% CVR: €0.58.
- **Supplier:** Alibaba (22 momme moerbeizijde, OEKO-TEX). Fallback: BigBuy. Search term: `22 momme mulberry silk pillowcase oeko-tex 60x70` (origin: CN).
- **Target price & margin:** €44,95 incl. VAT → net €37,15 − unit €10,00 − shipping €3,80 − duty €3,00 − payment €1,06 = **€19,29 gross profit (51.9%)**. Break-even ROAS 2.33, break-even CPA €19,29.
- **Weight / return risk:** ~0.15 kg · middel
- **Risks:** Hoge CPC ($1,8–1,9): vooral via social en SEO; Echtheid van de zijde en momme-gewicht laten bewijzen (certificaat + staal); Beauty-claims ('minder rimpels') vermijden; 60×70 vs 50×60: Belgische en Nederlandse kussenmaten aanbieden.

### Wake-up Light met Zonsopgang

- **Why this product:** Lage CPC bij hoog volume dat nu sterk stijgt. Philips zit op €80+, dus er is ruimte voor €50–55 met een goede presentatie.
- **Search & trend data:** "wake up light": NL 9.900/mo, BE 880/mo. Sterk seizoensgebonden stijgend: NL 3.600 → 12.100; BE 590 → 1.300.
- **Seasonality:** Piek nov–feb (donkere ochtenden) + cadeau. NU in het hoogseizoen
- **Competitors:** Philips Wake-up Light (€80–200), bol.com-merken (€30–60)
- **Estimated CPC:** NL $0.36 · BE $0.34 (≈ €0.33 max). Break-even CPC at 3% CVR: €0.68.
- **Supplier:** Alibaba (CE/RED als FM-radio aanwezig). Fallback: CJdropshipping (DE). Search term: `sunrise alarm clock wake up light FM radio natural sounds` (origin: CN).
- **Target price & margin:** €54,95 incl. VAT → net €45,41 − unit €13,00 − shipping €5,50 − duty €3,00 − payment €1,24 = **€22,67 gross profit (49.9%)**. Break-even ROAS 2.42, break-even CPA €22,67.
- **Weight / return risk:** ~0.7 kg · middel
- **Risks:** Elektronica + radio: CE-RED, LVD, WEEE/Recupel; Geen medische claims (winterdip, depressie); Kwaliteit van de lichtovergang en display-helderheid testen.

### White Noise Machine

- **Why this product:** Breed publiek (ouders van baby's, lichte slapers, thuiswerkers). De lage CPC maakt Google Shopping rendabel.
- **Search & trend data:** "white noise machine": NL 1.000/mo, BE 480/mo. Stabiel tot licht stijgend.
- **Seasonality:** Jaarrond (ouders van baby's, lichte slapers, thuiswerkers)
- **Competitors:** Hatch/Yogasleep (€40–80), bol.com (€20–40)
- **Estimated CPC:** NL $0.42 · BE $0.35 (≈ €0.39 max). Break-even CPC at 3% CVR: €0.48.
- **Supplier:** CJdropshipping (DE). Fallback: Alibaba. Search term: `white noise machine 30 sounds night light timer usb-c` (origin: EU).
- **Target price & margin:** €34,95 incl. VAT → net €28,88 − unit €7,50 − shipping €4,50 − payment €0,88 = **€16,01 gross profit (55.4%)**. Break-even ROAS 2.18, break-even CPA €16,01.
- **Weight / return risk:** ~0.35 kg · laag
- **Risks:** Elektronica: CE/EMC, WEEE/Recupel; Voor baby's: veilige afstand en volume adviseren (geen medische claims).

### Blauw-lichtbril

- **Why this product:** Hoog zoekvolume en een zeer hoge marge. Past bij de avondroutine van Diepslaap ('schermtijd voor het slapen').
- **Search & trend data:** "blauw licht bril": NL 5.400/mo, BE 880/mo. BE stijgend (320 → 880); NL stabiel.
- **Seasonality:** Jaarrond; piek in de winter (meer schermtijd)
- **Competitors:** Hans Anders/Pearle (€30–60), bol.com (€10–25)
- **Estimated CPC:** NL $0.82 · BE $0.68 (≈ €0.75 max). Break-even CPC at 3% CVR: €0.43.
- **Supplier:** CJdropshipping (DE). Fallback: Alibaba private label. Search term: `blue light blocking glasses unisex TR90 frame` (origin: EU).
- **Target price & margin:** €24,95 incl. VAT → net €20,62 − unit €2,50 − shipping €3,20 − payment €0,70 = **€14,22 gross profit (69.0%)**. Break-even ROAS 1.75, break-even CPA €14,22.
- **Weight / return risk:** ~0.06 kg · laag
- **Risks:** Geen gezondheids- of medische claims (beschermt je ogen, betere slaap); Geen correctieglazen: duidelijk vermelden; Kan als medisch hulpmiddel gelden als je claims maakt: puur als lifestyle-accessoire verkopen.

### Spijkermat Set met Kussen

- **Why this product:** In België een sterke term met lage concurrentie. Een cadeauwaardige set met een hogere orderwaarde voor de avondroutine.
- **Search & trend data:** "spijkermat": NL 70/mo, BE 1.300/mo. BE 'spijkermat' 880 → 1.000; in NL zoekt men op 'acupressuurmat' (70) en 'spijkermat'.
- **Seasonality:** Piek dec (cadeau) en januari
- **Competitors:** Shakti Mat (€60–90), Decathlon/bol.com (€20–40)
- **Estimated CPC:** NL $0.47 · BE $0.61 (≈ €0.56 max). Break-even CPC at 3% CVR: €0.57.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `acupressure mat pillow set linen coconut fibre` (origin: EU).
- **Target price & margin:** €39,95 incl. VAT → net €33,02 − unit €7,50 − shipping €5,50 − payment €0,97 = **€19,05 gross profit (57.7%)**. Break-even ROAS 2.10, break-even CPA €19,05.
- **Weight / return risk:** ~0.9 kg · laag
- **Risks:** Geen medische claims (pijnverlichting, slapeloosheid); Zwaarder en volumineus pakket; Waarschuwingen: niet bij zwangerschap, huidproblemen of bloedverdunners.

### Mondtape (90 strips)

- **Why this product:** Trendproduct met herhaalaankopen (een verbruiksartikel, 3 maanden per doos): geschikt voor een abonnement in een latere fase.
- **Search & trend data:** "mondtape": NL 1.900/mo, BE 320/mo. Stabiel tot stijgend; groot op TikTok.
- **Seasonality:** Jaarrond
- **Competitors:** Hostage Tape/Myotape (€15–25), bol.com (€10–20)
- **Estimated CPC:** NL $0.84 · BE $0.67 (≈ €0.77 max). Break-even CPC at 3% CVR: €0.18.
- **Supplier:** Alibaba private label (huidvriendelijke lijm). Fallback: CJdropshipping. Search term: `mouth tape sleep hypoallergenic 90 strips` (origin: CN).
- **Target price & margin:** €17,95 incl. VAT → net €14,83 − unit €2,00 − shipping €3,20 − duty €3,00 − payment €0,57 = **€6,06 gross profit (40.9%)**. Break-even ROAS 2.96, break-even CPA €6,06.
- **Weight / return risk:** ~0.05 kg · laag
- **Risks:** Gezondheidsclaims (snurken, apneu) vermijden: de wetenschappelijke onderbouwing is beperkt; Duidelijke waarschuwing: niet gebruiken bij een verstopte neus, apneu, ademhalingsproblemen, alcohol/slaapmiddelen; niet voor kinderen; Productveiligheid (GPSR): huidcontact; certificaat van de lijm opvragen.

### Traagschuim Nekkussen voor op Reis

- **Why this product:** Hoog zoekvolume met een bescheiden CPC. Opent de doelgroep 'slapen onderweg' (vliegtuig, trein, auto).
- **Search & trend data:** "nekkussen": NL 6.600/mo, BE 1.300/mo. Stabiel (6.600–8.100).
- **Seasonality:** Piek in het reisseizoen (jun–aug) en de kerstvakantie
- **Competitors:** Trtl/Cabeau (€30–50), Decathlon/HEMA (€10–20)
- **Estimated CPC:** NL $0.80 · BE $0.61 (≈ €0.74 max). Break-even CPC at 3% CVR: €0.39.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `memory foam travel neck pillow compressible bag` (origin: EU).
- **Target price & margin:** €27,95 incl. VAT → net €23,10 − unit €4,50 − shipping €4,80 − payment €0,75 = **€13,05 gross profit (56.5%)**. Break-even ROAS 2.14, break-even CPA €13,05.
- **Weight / return risk:** ~0.35 kg · laag
- **Risks:** Volumineus: kies een comprimeerbaar model om de verzendkosten te drukken; Woord 'nekkussen' omvat ook bedkussens: zoektermen met 'reis' targeten.

### Slaapkoptelefoon Hoofdband

- **Why this product:** Een cadeaugevoelige upsell met podcast- en slaapmuziek-content. Past bij een 'stilte'-bundel met de oordopjes.
- **Search & trend data:** "slaap koptelefoon": NL 390/mo, BE 70/mo. Stabiel; aanvullende term 'slaapmasker bluetooth'.
- **Seasonality:** Cadeaupiek in december
- **Competitors:** PurelyGoods (±€32), 2BEHEALTHY (±€25), Sleeptight (±€20), Kokoon (€150+)
- **Estimated CPC:** NL $0.49 · BE $0.51 (≈ €0.47 max). Break-even CPC at 3% CVR: €0.43.
- **Supplier:** CJdropshipping (DE). Fallback: Alibaba (CE-RED). Search term: `sleep headphones headband bluetooth 5.3 thin speakers washable` (origin: EU).
- **Target price & margin:** €29,95 incl. VAT → net €24,75 − unit €5,80 − shipping €3,80 − payment €0,79 = **€14,36 gross profit (58.0%)**. Break-even ROAS 2.09, break-even CPA €14,36.
- **Weight / return risk:** ~0.1 kg · middel
- **Risks:** Bluetooth = radioapparatuur: CE-RED, inclusief de cyberbeveiligingseisen; WEEE/Recupel; Defecten aan de electronica: kwaliteitscontrole.

---

## Snuffel & Co: Verrijking en verzorging voor honden: rustiger eten, slimmer spelen, schoner huis

Domain (suggested): `snuffelenco.be` · Free shipping from €35,00 · Bundle: Rustige-avondset (−12%)

| # | Product | Keyword | Searches NL / BE | CPC NL / BE (USD) | Price | Landed cost | Gross margin | Break-even ROAS |
|---:|---|---|---:|---:|---:|---:|---:|---:|
| 1 | Likmat (2 stuks + spatel) | likmat hond | 1.600 / 390 | 0.43 / 0.59 | €16,95 | €5,20 | 58.9% | 2.05 |
| 2 | Snuffelmat XL | snuffelmat | 880 / 320 | 0.46 / 0.37 | €27,95 | €9,00 | 57.8% | 2.09 |
| 3 | Anti-schrokbak Slow Feeder | anti schrokbak | 390 / 90 | 0.38 / 0.47 | €17,95 | €6,20 | 54.3% | 2.23 |
| 4 | Pootreiniger Beker | pootreiniger hond | 70 / 0 | 0.39 / 0.00 | €19,95 | €6,70 | 55.7% | 2.17 |
| 5 | Zelfreinigende Hondenborstel | hondenborstel | 0 / 320 | 0.00 / 0.42 | €17,95 | €6,20 | 54.3% | 2.23 |
| 6 | Herbruikbare Haarverwijderaar | hondenhaar verwijderen | 260 / 110 | 0.34 / 0.48 | €16,95 | €5,80 | 54.6% | 2.21 |
| 7 | Drinkfles voor Onderweg | drinkfles hond | 480 / 260 | 0.36 / 0.36 | €17,95 | €6,40 | 53.0% | 2.28 |
| 8 | Autogordel voor Honden (2 stuks) | autogordel hond | 880 / 260 | 0.40 / 0.58 | €12,95 | €4,40 | 54.4% | 2.23 |
| 9 | Snackbal Interactief | snackbal hond | 170 / 0 | 0.38 / 0.00 | €14,95 | €5,60 | 50.5% | 2.40 |
| 10 | Oplaadbare LED-halsband | lichtgevende halsband | 70 / 30 | 0.54 / 0.26 | €17,95 | €5,80 | 57.0% | 2.12 |

### Likmat (2 stuks + spatel)

- **Why this product:** Bewezen categorie met veel bol.com-aanbieders. Onderscheid door een 2-pack met spatel en content rond de rustmomenten bij vuurwerk en bezoek.
- **Search & trend data:** "likmat hond": NL 1.600/mo, BE 390/mo. Stabiel (NL 1.300–1.600).
- **Seasonality:** Jaarrond; piek rond vuurwerk (dec) en bij bezoek tijdens de feestdagen
- **Competitors:** bol.com: €10–19 per mat (Beeztees, BOTC, Lizzy & Lola); Nina Ottosson ±€30
- **Estimated CPC:** NL $0.43 · BE $0.59 (≈ €0.54 max). Break-even CPC at 3% CVR: €0.25.
- **Supplier:** CJdropshipping (DE). Fallback: Droppery/BigBuy. Search term: `silicone lick mat dog suction cups spatula` (origin: EU).
- **Target price & margin:** €16,95 incl. VAT → net €14,01 − unit €1,60 − shipping €3,60 − payment €0,56 = **€8,25 gross profit (58.9%)**. Break-even ROAS 2.05, break-even CPA €8,25.
- **Weight / return risk:** ~0.2 kg · laag
- **Risks:** Veel concurrenten tegen €11–15: een 2-pack geeft meer waarde per order; Geen claims als 'vermindert angst': spreek van 'helpt bij ontspannen'.

### Snuffelmat XL

- **Why this product:** Mentale uitdaging voor binnen, past perfect in de winter. Een hogere prijs dan de likmat verhoogt de gemiddelde orderwaarde.
- **Search & trend data:** "snuffelmat": NL 880/mo, BE 320/mo. Licht stijgend (880 → 1.000).
- **Seasonality:** Piek in de herfst en winter (meer binnen spelen)
- **Competitors:** Ohpets (±€20), Vedic (±€50), bol.com-merken (€15–30)
- **Estimated CPC:** NL $0.46 · BE $0.37 (≈ €0.42 max). Break-even CPC at 3% CVR: €0.40.
- **Supplier:** CJdropshipping (DE). Fallback: Alibaba private label. Search term: `dog snuffle mat foldable 50x50 washable` (origin: EU).
- **Target price & margin:** €27,95 incl. VAT → net €23,10 − unit €4,50 − shipping €4,50 − payment €0,75 = **€13,35 gross profit (57.8%)**. Break-even ROAS 2.09, break-even CPA €13,35.
- **Weight / return risk:** ~0.45 kg · laag
- **Risks:** Vilt kan losraken bij bijters: duidelijk 'onder toezicht' vermelden; Een gevouwen mat is groot: let op het verpakkingsformaat.

### Anti-schrokbak Slow Feeder

- **Why this product:** Herkenbaar probleem (schrokken) met een duidelijke oplossing. Ook in te zetten als SEO-content rond 'hond eet te snel'.
- **Search & trend data:** "anti schrokbak": NL 390/mo, BE 90/mo. Stabiel. Gerelateerde term 'slowfeeder hond' is in BE goed voor 140/maand.
- **Seasonality:** Jaarrond
- **Competitors:** Outward Hound (€15–25), bol.com (€8–20), dierenwinkels
- **Estimated CPC:** NL $0.38 · BE $0.47 (≈ €0.43 max). Break-even CPC at 3% CVR: €0.24.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `slow feeder dog bowl anti gulping non slip` (origin: EU).
- **Target price & margin:** €17,95 incl. VAT → net €14,83 − unit €2,20 − shipping €4,00 − payment €0,57 = **€8,06 gross profit (54.3%)**. Break-even ROAS 2.23, break-even CPA €8,06.
- **Weight / return risk:** ~0.3 kg · laag
- **Risks:** Geen claims over maagdraaiing of gezondheid: spreek van 'trager eten'.

### Pootreiniger Beker

- **Why this product:** Zeer visueel 'voor/na'-product dat in het natte Belgisch-Nederlandse najaar en de winter goed scoort met video.
- **Search & trend data:** "pootreiniger hond": NL 70/mo, BE 0/mo. Weinig zoekvolume: een klassiek 'zien = willen'-product voor social ads, vooral in de modderige maanden.
- **Seasonality:** Sterk seizoensgebonden: okt–mrt (nu in het hoogseizoen)
- **Competitors:** Dexas MudBuster (€15–25), bol.com-varianten (€10–20)
- **Estimated CPC:** NL $0.39 · BE $0.00 (≈ €0.36 max). Break-even CPC at 3% CVR: €0.28.
- **Supplier:** CJdropshipping (DE). Fallback: AliExpress 'ship from Europe'. Search term: `dog paw cleaner cup silicone bristles portable` (origin: EU).
- **Target price & margin:** €19,95 incl. VAT → net €16,49 − unit €2,50 − shipping €4,20 − payment €0,61 = **€9,18 gross profit (55.7%)**. Break-even ROAS 2.17, break-even CPA €9,18.
- **Weight / return risk:** ~0.3 kg · laag
- **Risks:** Afhankelijk van social ads (bijna geen zoekvolume); Seizoensgebonden: in maart afbouwen; Maat S/M/L afstemmen op het ras.

### Zelfreinigende Hondenborstel

- **Why this product:** Elke hondeneigenaar borstelt. De zelfreinigende knop is een duidelijk verkoopargument en werkt goed op video.
- **Search & trend data:** "hondenborstel": NL 0/mo, BE 320/mo. Stabiel in BE (260–320). In NL zijn de varianten 'ontwolborstel' en 'vachtborstel' te testen.
- **Seasonality:** Piek tijdens de rui (voorjaar + najaar)
- **Competitors:** FURminator (€25–45), Hertzko (€15–25), bol.com (€10–20)
- **Estimated CPC:** NL $0.00 · BE $0.42 (≈ €0.39 max). Break-even CPC at 3% CVR: €0.24.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `self cleaning slicker brush dog cat one button` (origin: EU).
- **Target price & margin:** €17,95 incl. VAT → net €14,83 − unit €2,40 − shipping €3,80 − payment €0,57 = **€8,06 gross profit (54.3%)**. Break-even ROAS 2.23, break-even CPA €8,06.
- **Weight / return risk:** ~0.2 kg · laag
- **Risks:** FURminator is een merknaam: niet in ads of titels gebruiken; Voor sommige vachttypes minder geschikt.

### Herbruikbare Haarverwijderaar

- **Why this product:** Herkenbaar probleem, duurzaam alternatief voor plakrollers en sterke voor/na-content.
- **Search & trend data:** "hondenhaar verwijderen": NL 260/mo, BE 110/mo. Stabiel; veel probleemgerichte zoekopdrachten ('hondenhaar van bank verwijderen').
- **Seasonality:** Piek tijdens de rui
- **Competitors:** ChomChom (€20–30), plakroller-navullingen (supermarkt)
- **Estimated CPC:** NL $0.34 · BE $0.48 (≈ €0.44 max). Break-even CPC at 3% CVR: €0.23.
- **Supplier:** CJdropshipping (DE). Fallback: AliExpress 'ship from Europe'. Search term: `reusable pet hair remover roller lint` (origin: EU).
- **Target price & margin:** €16,95 incl. VAT → net €14,01 − unit €2,00 − shipping €3,80 − payment €0,56 = **€7,65 gross profit (54.6%)**. Break-even ROAS 2.21, break-even CPA €7,65.
- **Weight / return risk:** ~0.2 kg · laag
- **Risks:** Merk- en vormgeving van ChomChom niet nabootsen: eigen design en naam gebruiken; Werkt minder op sommige stoffen: vermelden.

### Drinkfles voor Onderweg

- **Why this product:** Product voor de zomer dat het aanbod in het voorjaar aanvult. Zo blijven de seizoenen in de winkel in balans.
- **Search & trend data:** "drinkfles hond": NL 480/mo, BE 260/mo. Dalend in de winter (880 → 480), stijgt in de lente.
- **Seasonality:** Piek apr–aug. Nu lanceren maar pas vanaf maart pushen
- **Competitors:** bol.com (€8–20), dierenwinkels
- **Estimated CPC:** NL $0.36 · BE $0.36 (≈ €0.33 max). Break-even CPC at 3% CVR: €0.24.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `dog water bottle portable leak proof 550ml` (origin: EU).
- **Target price & margin:** €17,95 incl. VAT → net €14,83 − unit €2,60 − shipping €3,80 − payment €0,57 = **€7,86 gross profit (53.0%)**. Break-even ROAS 2.28, break-even CPA €7,86.
- **Weight / return risk:** ~0.2 kg · laag
- **Risks:** Seizoensgebonden: laag budget tot maart; Lekdichtheid testen met een staal.

### Autogordel voor Honden (2 stuks)

- **Why this product:** Goedkope impulsaankoop en een goede upsell, met stabiele vraag rond vakanties en dagjes uit.
- **Search & trend data:** "autogordel hond": NL 880/mo, BE 260/mo. Stabiel (880–1.300).
- **Seasonality:** Piek in het vakantieseizoen (jul–aug), daarnaast jaarrond
- **Competitors:** Trixie/Kerbl (€8–15), bol.com (€6–12)
- **Estimated CPC:** NL $0.40 · BE $0.58 (≈ €0.53 max). Break-even CPC at 3% CVR: €0.17.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `dog seat belt adjustable elastic buffer 2 pack` (origin: EU).
- **Target price & margin:** €12,95 incl. VAT → net €10,70 − unit €1,20 − shipping €3,20 − payment €0,48 = **€5,82 gross profit (54.4%)**. Break-even ROAS 2.23, break-even CPA €5,82.
- **Weight / return risk:** ~0.15 kg · laag
- **Risks:** Geen claims als 'crashgetest' tenzij de leverancier een certificaat heeft; Altijd aan een tuig bevestigen, nooit aan de halsband: vermelden.

### Snackbal Interactief

- **Why this product:** Past in de verrijkingsbundel en verhoogt de orderwaarde. Een goed instapproduct voor de 'rustige avond'-campagne.
- **Search & trend data:** "snackbal hond": NL 170/mo, BE 0/mo. Stabiel; aanvullende termen zijn 'voerbal hond' en 'snackspeelgoed'.
- **Seasonality:** Jaarrond; cadeaupiek in december
- **Competitors:** KONG Wobbler (€15–25), Trixie (€8–15)
- **Estimated CPC:** NL $0.38 · BE $0.00 (≈ €0.35 max). Break-even CPC at 3% CVR: €0.19.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `dog treat dispensing ball adjustable difficulty` (origin: EU).
- **Target price & margin:** €14,95 incl. VAT → net €12,36 − unit €1,80 − shipping €3,80 − payment €0,52 = **€6,24 gross profit (50.5%)**. Break-even ROAS 2.40, break-even CPA €6,24.
- **Weight / return risk:** ~0.2 kg · laag
- **Risks:** Kleine honden kunnen de bal niet goed duwen: maat vermelden; Niet voor sterke kauwers zonder toezicht.

### Oplaadbare LED-halsband

- **Why this product:** Stijgend in het huidige seizoen, met een duidelijk veiligheidsvoordeel. Licht, goedkoop te verzenden en visueel sterk.
- **Search & trend data:** "lichtgevende halsband": NL 70/mo, BE 30/mo. Sterk stijgend in de donkere maanden: NL 40 → 170, BE 10 → 50.
- **Seasonality:** Piek okt–feb (vroeg donker). Nu in het hoogseizoen
- **Competitors:** bol.com (€8–20), Trixie flash (€10–15)
- **Estimated CPC:** NL $0.54 · BE $0.26 (≈ €0.50 max). Break-even CPC at 3% CVR: €0.25.
- **Supplier:** CJdropshipping (DE). Fallback: AliExpress 'ship from Europe'. Search term: `LED dog collar USB rechargeable adjustable` (origin: EU).
- **Target price & margin:** €17,95 incl. VAT → net €14,83 − unit €2,20 − shipping €3,60 − payment €0,57 = **€8,46 gross profit (57.0%)**. Break-even ROAS 2.12, break-even CPA €8,46.
- **Weight / return risk:** ~0.08 kg · laag
- **Risks:** Batterij: CE/EMC en WEEE/Recupel-bijdrage; Maatfouten: maattabel tonen; Seizoen: afbouwen vanaf maart.

---

## Warmwijs: Slimme, betaalbare producten om je huis warmer te houden en minder energie te verspillen

Domain (suggested): `warmwijs.be` · Free shipping from €45,00 · Bundle: Tochtvrij-pakket (−10%)

| # | Product | Keyword | Searches NL / BE | CPC NL / BE (USD) | Price | Landed cost | Gross margin | Break-even ROAS |
|---:|---|---|---:|---:|---:|---:|---:|---:|
| 1 | Radiatorventilator Duo | radiator ventilator | 9.900 / 880 | 0.38 / 0.41 | €54,95 | €22,50 | 47.7% | 2.54 |
| 2 | Tochtstrip Zelfklevend 10 m | tochtstrip | 8.100 / 720 | 0.30 / 0.67 | €14,95 | €5,60 | 50.5% | 2.40 |
| 3 | Dubbele Tochtrol voor Deuren | tochtrol | 1.000 / 480 | 0.21 / 0.39 | €22,95 | €8,00 | 54.3% | 2.23 |
| 4 | Radiatorfolie 5 m | radiatorfolie | 2.900 / 480 | 0.31 / 0.20 | €19,95 | €7,30 | 52.0% | 2.33 |
| 5 | Raamisolatiefolie Kit | raamfolie isolatie | 0 / 70 | 0.00 / 0.50 | €19,95 | €7,40 | 51.4% | 2.35 |
| 6 | Slimme Stekker met Verbruiksmeting (4 stuks) | slimme stekker | 3.600 / 1.000 | 0.35 / 0.50 | €49,95 | €25,50 | 35.4% | 3.41 |
| 7 | Energiemeter voor het Stopcontact | energiemeter stopcontact | 320 / 170 | 0.41 / 0.45 | €24,95 | €10,50 | 45.7% | 2.65 |
| 8 | Waterbesparende Douchekop | waterbesparende douchekop | 2.400 / 390 | 0.51 / 0.31 | €29,95 | €8,70 | 61.7% | 1.96 |
| 9 | LED-lamp met Bewegingssensor (3 stuks) | bewegingssensor lamp | 90 / 720 | 0.76 / 0.83 | €26,95 | €9,70 | 53.1% | 2.28 |
| 10 | Oplaadbare Handwarmer (2 stuks) | handwarmer | 90 / 480 | 1.06 / 0.84 | €32,95 | €12,00 | 52.8% | 2.29 |

### Radiatorventilator Duo

- **Why this product:** Grootste seizoensstijger van de hele lijst. De gevestigde merken zitten op €95–105 voor een duo, wat ruimte geeft voor een duo rond €55.
- **Search & trend data:** "radiator ventilator": NL 9.900/mo, BE 880/mo. Explosief seizoensgebonden: NL 1.900 → 4.400 → 22.200/maand; BE 140 → 390.
- **Seasonality:** Piek okt–feb, bijna nul in de zomer. NU lanceren
- **Competitors:** SpeedComfort mono €59,95 / duo €104,95; Iezy-Fan €49,99; BlueBuilt duo €94
- **Estimated CPC:** NL $0.38 · BE $0.41 (≈ €0.38 max). Break-even CPC at 3% CVR: €0.65.
- **Supplier:** Alibaba (radiator booster fan, thermostaatsensor, magneten). Fallback: CJdropshipping (DE). Search term: `radiator booster fan thermostat magnetic usb dual` (origin: CN).
- **Target price & margin:** €54,95 incl. VAT → net €45,41 − unit €14,00 − shipping €5,50 − duty €3,00 − payment €1,24 = **€21,67 gross profit (47.7%)**. Break-even ROAS 2.54, break-even CPA €21,67.
- **Weight / return risk:** ~0.9 kg · middel
- **Risks:** Elektrisch apparaat: CE (LVD/EMC), RoHS, WEEE/Recupel-registratie verplicht; Besparingsclaims ('tot 22%') niet overnemen zonder eigen onderbouwing (misleidende reclame); Seizoensrisico: voorraad niet doorladen na januari; Levertijd uit CN kan de piek missen: staal en EU-voorraad snel regelen.

### Tochtstrip Zelfklevend 10 m

- **Why this product:** Zeer hoog zoekvolume met een lage CPC in NL. Het ideale instapproduct dat je combineert met een tochtrol en radiatorfolie.
- **Search & trend data:** "tochtstrip": NL 8.100/mo, BE 720/mo. Sterk stijgend: NL 4.400 → 18.100/maand.
- **Seasonality:** Piek okt–jan
- **Competitors:** Gamma/Praxis/Hubo (€5–15), bol.com, Action
- **Estimated CPC:** NL $0.30 · BE $0.67 (≈ €0.62 max). Break-even CPC at 3% CVR: €0.19.
- **Supplier:** BigBuy of CJdropshipping (DE). Fallback: Alibaba. Search term: `self adhesive weather stripping EPDM D profile 10m` (origin: EU).
- **Target price & margin:** €14,95 incl. VAT → net €12,36 − unit €1,80 − shipping €3,80 − payment €0,52 = **€6,24 gross profit (50.5%)**. Break-even ROAS 2.40, break-even CPA €6,24.
- **Weight / return risk:** ~0.25 kg · laag
- **Risks:** Concurrentie met doe-het-zelfzaken en Action op prijs: verkopen als set + uitleg ('welk profiel heb ik nodig'); Kleefkracht testen.

### Dubbele Tochtrol voor Deuren

- **Why this product:** Een probleemoplossend product dat ook huurders kunnen plaatsen. Een logische tweede aankoop naast de tochtstrip.
- **Search & trend data:** "tochtrol": NL 1.000/mo, BE 480/mo. Stijgend: BE 90 → 260; NL 260 → 390.
- **Seasonality:** Piek okt–feb
- **Competitors:** Action/Hema (€5–12), bol.com (€10–25)
- **Estimated CPC:** NL $0.21 · BE $0.39 (≈ €0.36 max). Break-even CPC at 3% CVR: €0.31.
- **Supplier:** CJdropshipping (DE). Fallback: Alibaba. Search term: `twin door draft stopper under door adjustable` (origin: EU).
- **Target price & margin:** €22,95 incl. VAT → net €18,97 − unit €3,50 − shipping €4,50 − payment €0,66 = **€10,30 gross profit (54.3%)**. Break-even ROAS 2.23, break-even CPA €10,30.
- **Weight / return risk:** ~0.4 kg · laag
- **Risks:** Goedkope varianten bij Action: positioneren als dubbel model dat meeschuift met de deur.

### Radiatorfolie 5 m

- **Why this product:** Laagdrempelig en goed zoekvolume. Vooral rendabel in de bundel met tochtstrip en tochtrol.
- **Search & trend data:** "radiatorfolie": NL 2.900/mo, BE 480/mo. BE stijgend (260 → 1.300); NL piekte eerder in het seizoen.
- **Seasonality:** Piek sep–dec
- **Competitors:** Gamma/Praxis (€8–20), bol.com
- **Estimated CPC:** NL $0.31 · BE $0.20 (≈ €0.29 max). Break-even CPC at 3% CVR: €0.26.
- **Supplier:** BigBuy. Fallback: Alibaba. Search term: `radiator reflector foil insulation 5m roll` (origin: EU).
- **Target price & margin:** €19,95 incl. VAT → net €16,49 − unit €2,80 − shipping €4,50 − payment €0,61 = **€8,58 gross profit (52.0%)**. Break-even ROAS 2.33, break-even CPA €8,58.
- **Weight / return risk:** ~0.6 kg · laag
- **Risks:** Rol is volumineus, dus hogere verzendkosten; Geen percentages besparing claimen; Prijsdruk van doe-het-zelfzaken.

### Raamisolatiefolie Kit

- **Why this product:** Nicheproduct voor huurders en oudere woningen met enkel glas. Vult de isolatiecategorie aan en past in een 'koude kamer'-bundel.
- **Search & trend data:** "raamfolie isolatie": NL 0/mo, BE 70/mo. Laag zoekvolume. Breder te targeten via 'enkel glas isoleren' en 'raam isoleren'.
- **Seasonality:** Piek nov–jan
- **Competitors:** Tesa (€15–25), doe-het-zelfzaken
- **Estimated CPC:** NL $0.00 · BE $0.50 (≈ €0.46 max). Break-even CPC at 3% CVR: €0.25.
- **Supplier:** BigBuy. Fallback: Alibaba. Search term: `window insulation film kit shrink heat 3 windows` (origin: EU).
- **Target price & margin:** €19,95 incl. VAT → net €16,49 − unit €3,20 − shipping €4,20 − payment €0,61 = **€8,48 gross profit (51.4%)**. Break-even ROAS 2.35, break-even CPA €8,48.
- **Weight / return risk:** ~0.35 kg · laag
- **Risks:** Zwakste zoekvraag in deze winkel: testen met klein budget en vervangen als het niet converteert; Installatie vraagt een föhn: uitleg-video nodig.

### Slimme Stekker met Verbruiksmeting (4 stuks)

- **Why this product:** Groeiende vraag naar verbruiksinzicht. Een 4-pack geeft een hogere orderwaarde dan losse stekkers en past in het merk Warmwijs.
- **Search & trend data:** "slimme stekker": NL 3.600/mo, BE 1.000/mo. Stijgend: BE 480 → 2.900; NL 2.900 → 5.400.
- **Seasonality:** Piek in Q4 (Black Friday, cadeaus, energiebewustzijn)
- **Competitors:** Tapo/TP-Link (€10–15 per stuk), Shelly, Hama, Nedis
- **Estimated CPC:** NL $0.35 · BE $0.50 (≈ €0.46 max). Break-even CPC at 3% CVR: €0.44.
- **Supplier:** Alibaba (Tuya/Matter-gecertificeerd, CE-RED). Fallback: BigBuy. Search term: `smart plug energy monitoring matter wifi EU type F 4 pack` (origin: CN).
- **Target price & margin:** €49,95 incl. VAT → net €41,28 − unit €18,00 − shipping €4,50 − duty €3,00 − payment €1,15 = **€14,63 gross profit (35.4%)**. Break-even ROAS 3.41, break-even CPA €14,63.
- **Weight / return risk:** ~0.45 kg · middel
- **Risks:** Radioapparatuur: CE-RED inclusief de cyberbeveiligingseisen (gedelegeerde verordening, van toepassing sinds aug 2025); Belgische stekker type E/F vs NL type F: juiste variant kiezen; App-afhankelijkheid (Tuya/Matter): support-FAQ nodig; Sterke merkconcurrentie (Tapo).

### Energiemeter voor het Stopcontact

- **Why this product:** Alternatief zonder app voor mensen die geen slimme apparaten willen. Werkt goed in combinatie met content zoals 'wat verbruikt mijn koelkast?'.
- **Search & trend data:** "energiemeter stopcontact": NL 320/mo, BE 170/mo. Stabiel tot licht stijgend.
- **Seasonality:** Piek in de herfst en winter
- **Competitors:** Brennenstuhl/Voltcraft (€15–30), bol.com (€10–20)
- **Estimated CPC:** NL $0.41 · BE $0.45 (≈ €0.41 max). Break-even CPC at 3% CVR: €0.28.
- **Supplier:** BigBuy. Fallback: Alibaba. Search term: `plug in energy meter LCD kWh cost EU` (origin: EU).
- **Target price & margin:** €24,95 incl. VAT → net €20,62 − unit €6,50 − shipping €4,00 − payment €0,70 = **€9,42 gross profit (45.7%)**. Break-even ROAS 2.65, break-even CPA €9,42.
- **Weight / return risk:** ~0.2 kg · laag
- **Risks:** Elektrisch: CE (LVD), WEEE/Recupel; Type E/F stekker afstemmen op het land.

### Waterbesparende Douchekop

- **Why this product:** Vraag gedreven door water- én energiekosten (warm water), en het blijft verkopen buiten het stookseizoen.
- **Search & trend data:** "waterbesparende douchekop": NL 2.400/mo, BE 390/mo. Stijgend: BE 170 → 1.300; NL 1.600 → 2.900.
- **Seasonality:** Jaarrond, met een piek in de winter (energiebewustzijn: warm water)
- **Competitors:** Hansgrohe/Grohe (€30–80), bol.com (€15–30)
- **Estimated CPC:** NL $0.51 · BE $0.31 (≈ €0.47 max). Break-even CPC at 3% CVR: €0.46.
- **Supplier:** BigBuy of CJdropshipping (DE). Fallback: Alibaba. Search term: `water saving shower head high pressure 3 modes filter` (origin: EU).
- **Target price & margin:** €29,95 incl. VAT → net €24,75 − unit €4,20 − shipping €4,50 − payment €0,79 = **€15,26 gross profit (61.7%)**. Break-even ROAS 1.96, break-even CPA €15,26.
- **Weight / return risk:** ~0.35 kg · laag
- **Risks:** Geen exacte besparingspercentages zonder testdata; Universele 1/2"-aansluiting vermelden.

### LED-lamp met Bewegingssensor (3 stuks)

- **Why this product:** Sterke vraag in BE en een visueel product (gang, kast, trap). Een 3-pack verhoogt de orderwaarde.
- **Search & trend data:** "bewegingssensor lamp": NL 90/mo, BE 720/mo. BE stijgend (390 → 720); NL zoekt vaker op 'led verlichting met sensor'.
- **Seasonality:** Piek in de donkere maanden
- **Competitors:** IKEA, Action, bol.com (€10–25)
- **Estimated CPC:** NL $0.76 · BE $0.83 (≈ €0.76 max). Break-even CPC at 3% CVR: €0.36.
- **Supplier:** CJdropshipping (DE). Fallback: BigBuy. Search term: `rechargeable motion sensor LED light bar magnetic 3 pack` (origin: EU).
- **Target price & margin:** €26,95 incl. VAT → net €22,27 − unit €5,50 − shipping €4,20 − payment €0,74 = **€11,84 gross profit (53.1%)**. Break-even ROAS 2.28, break-even CPA €11,84.
- **Weight / return risk:** ~0.35 kg · laag
- **Risks:** Batterij: CE/EMC, WEEE/Recupel; Lichtsterkte (lumen) correct vermelden.

### Oplaadbare Handwarmer (2 stuks)

- **Why this product:** Seizoensgebonden cadeauproduct dat ook als 'warm blijven zonder de verwarming hoger te zetten' past in het merk. Hogere orderwaarde.
- **Search & trend data:** "handwarmer": NL 90/mo, BE 480/mo. Sterk stijgend in BE: 90 → 320/maand.
- **Seasonality:** Piek nov–feb; cadeaupiek in december
- **Competitors:** Ocoopa (€30–45), bol.com (€15–35)
- **Estimated CPC:** NL $1.06 · BE $0.84 (≈ €0.98 max). Break-even CPC at 3% CVR: €0.43.
- **Supplier:** CJdropshipping (DE). Fallback: Alibaba. Search term: `rechargeable hand warmer 2 pack magnetic usb-c power bank` (origin: EU).
- **Target price & margin:** €32,95 incl. VAT → net €27,23 − unit €7,50 − shipping €4,50 − payment €0,84 = **€14,39 gross profit (52.8%)**. Break-even ROAS 2.29, break-even CPA €14,39.
- **Weight / return risk:** ~0.3 kg · middel
- **Risks:** Lithiumbatterij: CE, UN38.3, WEEE/Recupel; verzending als batterijpakket; Oververhitting: alleen gecertificeerde leveranciers; Seizoen: afbouwen in maart.

// Template legal pages for a Belgian seller (B2C, BE + NL). These are starting points, not legal advice:
// have them reviewed (e.g. by your accountant/Unizo/a lawyer) before going live and fill every [PLACEHOLDER].
import { store, eur, u } from './data';

const c = store.company;
const s = store.shipping;
const updated = '15 november 2026';

export interface LegalPage { slug: string; title: string; description: string; html: string }

export const legalPages: LegalPage[] = [
  {
    slug: 'algemene-voorwaarden', title: 'Algemene voorwaarden', description: `Algemene voorwaarden van ${store.name}.`,
    html: `
<p><em>Laatst bijgewerkt: ${updated}</em></p>
<h2>1. Identiteit van de verkoper</h2>
<p>${c.legalName}, ${c.address}. Ondernemingsnummer/btw: ${c.vat}. E-mail: ${c.email}. Handelend onder de naam ${store.name} (${store.domain}).</p>
<h2>2. Toepassing</h2>
<p>Deze voorwaarden gelden voor elke bestelling van consumenten in België en Nederland via ${store.domain}. Door te bestellen aanvaard je deze voorwaarden.</p>
<h2>3. Aanbod en prijzen</h2>
<p>Alle prijzen zijn in euro en inclusief 21% btw. Verzendkosten bedragen ${eur(s.flatRate)} per bestelling, met gratis verzending vanaf ${eur(s.freeFrom)}. De verzendkosten worden vóór de betaling getoond. Kennelijke vergissingen in het aanbod binden ons niet.</p>
<h2>4. Bestelling en betaling</h2>
<p>De overeenkomst komt tot stand wanneer je de bestelling bevestigt en de betaling via onze betaalpartner Stripe is geslaagd. Je ontvangt een bevestiging per e-mail. Je kunt betalen met Bancontact, iDEAL, Visa, Mastercard, Apple Pay en Google Pay.</p>
<h2>5. Levering</h2>
<p>We leveren in België en Nederland, doorgaans binnen ${s.deliveryDays} na betaling. Uiterlijk leveren we binnen 30 dagen; lukt dat niet, dan mag je de overeenkomst kosteloos ontbinden. Het risico gaat op jou over bij de levering.</p>
<h2>6. Herroepingsrecht (14 dagen)</h2>
<p>Je hebt het recht om binnen 14 dagen na ontvangst zonder opgave van redenen de overeenkomst te herroepen. Meld dit via ${c.email} of met het <a href="${u('/info/retourneren/')}">modelformulier</a>. Je stuurt het product binnen 14 dagen na je melding terug. De kosten voor het terugzenden zijn voor jou, tenzij anders vermeld. We betalen het aankoopbedrag inclusief de standaard verzendkosten terug binnen 14 dagen nadat we je melding ontvangen, maar we mogen wachten tot we het product terug hebben of je een verzendbewijs hebt gestuurd. Je bent aansprakelijk voor waardevermindering door meer gebruik dan nodig om het product te beoordelen.</p>
<p><strong>Uitzondering:</strong> verzegelde producten die om redenen van gezondheidsbescherming of hygiëne niet geschikt zijn om terug te zenden (zoals gebitsbeschermers en oordopjes) kunnen niet worden herroepen als de verzegeling na levering is verbroken.</p>
<h2>7. Wettelijke garantie</h2>
<p>Op alle producten geldt de wettelijke garantie van 2 jaar voor gebreken die bij de levering bestonden. Meld een gebrek zo snel mogelijk, en in elk geval binnen 2 maanden nadat je het vaststelt, via ${c.email}.</p>
<h2>8. Klachten en geschillen</h2>
<p>Klachten kun je melden via ${c.email}; we antwoorden binnen 5 werkdagen. Belgische consumenten kunnen zich ook wenden tot de Consumentenombudsdienst (consumentenombudsdienst.be). Nederlandse consumenten kunnen terecht bij het Juridisch Loket of de bevoegde rechter. Het Belgisch recht is van toepassing, onverminderd de dwingende bescherming die je als consument geniet in je woonland.</p>
<h2>9. Aansprakelijkheid</h2>
<p>Gebruik de producten volgens de meegeleverde instructies. Onze producten zijn geen medische hulpmiddelen en vervangen geen medisch advies.</p>`,
  },
  {
    slug: 'retourneren', title: 'Retourneren & herroeping', description: 'Zo retourneer je een bestelling binnen 14 dagen.',
    html: `
<p>Niet tevreden? Je hebt <strong>14 dagen bedenktijd</strong> vanaf de dag nadat je het pakket hebt ontvangen.</p>
<ol>
<li>Mail ons binnen 14 dagen via <a href="mailto:${c.email}">${c.email}</a> met je bestelnummer, of gebruik het modelformulier hieronder.</li>
<li>Je ontvangt het retouradres.</li>
<li>Stuur het product binnen 14 dagen na je melding terug, goed verpakt en zo mogelijk in de originele verpakking.</li>
<li>We betalen je binnen 14 dagen terug via dezelfde betaalmethode, inclusief de standaard verzendkosten van je oorspronkelijke bestelling.</li>
</ol>
<p>De kosten van het terugsturen zijn voor jou. Hygiëneproducten (gebitsbeschermers, oordopjes) waarvan de verzegeling is verbroken, kunnen niet worden geretourneerd.</p>
<h2>Modelformulier voor herroeping</h2>
<pre style="white-space:pre-wrap;background:#fff;padding:16px;border-radius:12px">Aan: ${c.legalName}, ${c.address}, ${c.email}
Ik deel u hierbij mede dat ik onze overeenkomst betreffende de verkoop van de volgende producten herroep:
Besteld op / ontvangen op:
Bestelnummer:
Naam:
Adres:
Datum en handtekening (alleen bij een papieren formulier):</pre>`,
  },
  {
    slug: 'verzending', title: 'Verzending & levering', description: `Verzendkosten en levertijden van ${store.name}.`,
    html: `
<ul>
<li>We leveren in: ${s.countries.map((x) => (x === 'BE' ? 'België' : x === 'NL' ? 'Nederland' : x)).join(' en ')}.</li>
<li>Verzendkosten: ${eur(s.flatRate)} per bestelling. <strong>Gratis vanaf ${eur(s.freeFrom)}.</strong></li>
<li>Levertijd: ${s.deliveryDays} na betaling. Je ontvangt een track-and-trace-code per e-mail.</li>
<li>Producten kunnen in meerdere pakketten en vanuit verschillende Europese magazijnen worden verstuurd.</li>
</ul>`,
  },
  {
    slug: 'privacy', title: 'Privacybeleid', description: `Hoe ${store.name} met je persoonsgegevens omgaat (AVG/GDPR).`,
    html: `
<p><em>Laatst bijgewerkt: ${updated}</em></p>
<p>${c.legalName} (${c.address}, ${c.vat}) is verantwoordelijk voor de verwerking van je persoonsgegevens via ${store.domain}. Contact: ${c.email}.</p>
<h2>Welke gegevens en waarom</h2>
<ul>
<li><strong>Bestelling en levering</strong> (naam, adres, e-mail, telefoon, bestelgegevens): om je bestelling uit te voeren. Rechtsgrond: overeenkomst. Bewaartermijn: 7 jaar (boekhoudplicht).</li>
<li><strong>Betaling</strong>: verwerkt door Stripe Payments Europe Ltd. Wij ontvangen geen volledige kaartgegevens.</li>
<li><strong>Klantenservice</strong>: je berichten, om je vraag te beantwoorden. Rechtsgrond: gerechtvaardigd belang. Bewaartermijn: 2 jaar.</li>
<li><strong>Analyse en marketing</strong> (cookies van Google en Meta): alleen met je toestemming. Je kunt die toestemming altijd intrekken via de cookie-instellingen.</li>
</ul>
<h2>Ontvangers</h2>
<p>Hostingpartner Cloudflare, betaalpartner Stripe, onze logistieke partners en leveranciers (alleen de gegevens die nodig zijn voor de levering), en, met je toestemming, Google en Meta. Sommige partners kunnen gegevens buiten de EER verwerken, op basis van de passende waarborgen (EU-VS Data Privacy Framework of standaardcontractbepalingen).</p>
<h2>Je rechten</h2>
<p>Je hebt recht op inzage, verbetering, verwijdering, beperking, overdraagbaarheid en bezwaar. Mail naar ${c.email}. Je kunt ook klacht indienen bij de Gegevensbeschermingsautoriteit (gegevensbeschermingsautoriteit.be) of, in Nederland, bij de Autoriteit Persoonsgegevens.</p>`,
  },
  {
    slug: 'cookies', title: 'Cookiebeleid', description: `Welke cookies ${store.name} gebruikt.`,
    html: `
<table style="width:100%;border-collapse:collapse;background:#fff;border-radius:12px">
<thead><tr><th align="left">Cookie / opslag</th><th align="left">Doel</th><th align="left">Type</th><th align="left">Bewaartermijn</th></tr></thead>
<tbody>
<tr><td>cart (localStorage)</td><td>Je winkelmand onthouden</td><td>Noodzakelijk</td><td>Tot je ze leegmaakt</td></tr>
<tr><td>consent (localStorage)</td><td>Je cookiekeuze onthouden</td><td>Noodzakelijk</td><td>12 maanden</td></tr>
<tr><td>ab_hero</td><td>Weergavevariant van de homepage (zonder persoonsgegevens)</td><td>Noodzakelijk/functioneel</td><td>30 dagen</td></tr>
<tr><td>_ga, _ga_*</td><td>Google Analytics: anoniem bezoekersgedrag meten</td><td>Analytisch (toestemming)</td><td>Tot 13 maanden</td></tr>
<tr><td>_fbp</td><td>Meta Pixel: advertenties meten en tonen</td><td>Marketing (toestemming)</td><td>3 maanden</td></tr>
</tbody></table>
<p>Je wijzigt je keuze op elk moment via <a href="#" data-consent-open>cookie-instellingen</a>.</p>`,
  },
  {
    slug: 'contact', title: 'Contact', description: `Neem contact op met ${store.name}.`,
    html: `
<p>Vragen over je bestelling, een product of een retour? We helpen je graag.</p>
<ul>
<li>E-mail: <a href="mailto:${c.email}">${c.email}</a> (antwoord binnen 1 werkdag)</li>
<li>Bedrijf: ${c.legalName}</li>
<li>Adres: ${c.address}</li>
<li>Btw/ondernemingsnummer: ${c.vat}</li>
</ul>
<p>Let op: dit adres is geen retouradres. Meld je retour eerst via e-mail.</p>`,
  },
];

// Lightweight A/B test for the homepage hero (headline + subline). 50/50 split, sticky for 30 days via a
// first-party cookie with no personal data. The variant is sent with every event and stored on the Stripe
// session metadata, so conversion per variant can be read in GA4 and in Stripe.
(function () {
  var m = document.cookie.match(/(?:^|; )ab_hero=([AB])/);
  var v = m ? m[1] : (Math.random() < 0.5 ? 'A' : 'B');
  if (!m) document.cookie = 'ab_hero=' + v + '; Max-Age=' + 60 * 60 * 24 * 30 + '; Path=/; SameSite=Lax; Secure';
  document.documentElement.setAttribute('data-ab-hero', v);
  document.addEventListener('DOMContentLoaded', function () {
    var hero = document.querySelector('[data-ab="hero"]');
    if (!hero) return;
    ['[data-ab-headline]', '[data-ab-sub]'].forEach(function (sel) {
      var el = hero.querySelector(sel);
      if (el && el.getAttribute('data-' + v.toLowerCase())) el.textContent = el.getAttribute('data-' + v.toLowerCase());
    });
    window.track && window.track('experiment_impression', { experiment_id: 'hero_v1', variant_id: v });
  });
})();

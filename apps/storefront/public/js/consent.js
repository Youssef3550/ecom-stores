// Consent-first analytics: GA4 and Meta Pixel are only loaded AFTER explicit opt-in (GDPR/ePrivacy, Belgian GBA guidance).
// Google Consent Mode v2 signals are set before any Google tag loads.
(function () {
  var cfg = window.STORE_CFG || {};
  var KEY = 'consent';
  var el = document.getElementById('consent');
  var queue = [];

  function read() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, JSON.stringify(Object.assign({ ts: Date.now() }, v))); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });

  var loaded = { ga: false, meta: false };
  function loadGA() {
    if (loaded.ga || !cfg.ga4) return; loaded.ga = true;
    var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.ga4; document.head.appendChild(s);
    gtag('js', new Date()); gtag('config', cfg.ga4, { anonymize_ip: true });
  }
  function loadMeta() {
    if (loaded.meta || !cfg.metaPixel) return; loaded.meta = true;
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', cfg.metaPixel); fbq('track', 'PageView');
  }
  function apply(c) {
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied', ad_user_data: c.marketing ? 'granted' : 'denied', ad_personalization: c.marketing ? 'granted' : 'denied',
    });
    if (c.analytics || c.marketing) loadGA();
    if (c.marketing) loadMeta();
    var q = queue; queue = []; q.forEach(function (a) { window.track(a[0], a[1]); });
  }

  // Unified event API used by cart.js / ab.js. GA4 recommended e-commerce event names; mapped to Meta standard events.
  var META = { view_item: 'ViewContent', add_to_cart: 'AddToCart', begin_checkout: 'InitiateCheckout', purchase: 'Purchase' };
  window.track = function (name, params) {
    var c = read();
    if (!c) { queue.push([name, params]); return; }
    if ((c.analytics || c.marketing) && cfg.ga4) gtag('event', name, params || {});
    if (c.marketing && cfg.metaPixel && window.fbq && META[name]) {
      var p = params || {};
      fbq('track', META[name], { value: p.value, currency: p.currency || cfg.currency, content_ids: (p.items || []).map(function (i) { return i.item_id; }), content_type: 'product' }, p.transaction_id ? { eventID: p.transaction_id } : undefined);
    }
  };

  function open() { if (el) el.setAttribute('data-open', ''); }
  function close() { if (el) el.removeAttribute('data-open'); }
  function choose(v) { write(v); apply(v); close(); }

  document.addEventListener('DOMContentLoaded', function () {
    var c = read();
    if (c) apply(c); else open();
    if (!el) return;
    el.querySelector('[data-consent-accept]').onclick = function () { choose({ analytics: true, marketing: true }); };
    el.querySelector('[data-consent-reject]').onclick = function () { choose({ analytics: false, marketing: false }); };
    el.querySelector('[data-consent-customize]').onclick = function () {
      el.querySelector('[data-consent-details]').hidden = false;
      el.querySelector('[data-consent-save]').hidden = false;
      var cur = read() || {};
      el.querySelector('[data-consent-analytics]').checked = !!cur.analytics;
      el.querySelector('[data-consent-marketing]').checked = !!cur.marketing;
    };
    el.querySelector('[data-consent-save]').onclick = function () {
      choose({ analytics: el.querySelector('[data-consent-analytics]').checked, marketing: el.querySelector('[data-consent-marketing]').checked });
    };
    document.querySelectorAll('[data-consent-open]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); open(); }); });
  });
})();

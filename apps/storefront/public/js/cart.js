// Minimal cart: localStorage-backed, no framework. Prices shown client-side are display-only;
// /api/checkout re-prices every line from catalog.json on the server.
(function () {
  var KEY = 'cart';
  var catalog = null;
  var cfg = window.STORE_CFG || {};
  var B = cfg.base || '';
  var fmt = new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' });

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} render(); }
  function count(c) { return c.reduce(function (s, l) { return s + l.qty; }, 0); }
  function getCatalog() { return catalog ? Promise.resolve(catalog) : fetch(B + '/catalog.json').then(function (r) { return r.json(); }).then(function (j) { catalog = j; return j; }); }
  function gaItem(slug, qty, variant) {
    var p = catalog && catalog.products[slug];
    return { item_id: slug, item_name: p ? p.name : slug, price: p ? p.price : undefined, quantity: qty, item_variant: variant || undefined };
  }

  function add(slug, qty, variant) {
    var c = load();
    var line = c.find(function (l) { return l.slug === slug && (l.variant || '') === (variant || ''); });
    if (line) line.qty = Math.min(10, line.qty + qty); else c.push({ slug: slug, qty: qty, variant: variant || '' });
    save(c);
    getCatalog().then(function () {
      var p = catalog.products[slug];
      window.track && window.track('add_to_cart', { currency: 'EUR', value: p ? p.price * qty : undefined, items: [gaItem(slug, qty, variant)] });
    });
    toast('Toegevoegd aan je winkelmand');
  }

  function toast(msg) {
    var t = document.createElement('div');
    t.textContent = msg; t.setAttribute('role', 'status');
    t.style.cssText = 'position:fixed;left:50%;top:84px;transform:translateX(-50%);background:#111;color:#fff;padding:12px 20px;border-radius:999px;z-index:60;font-weight:600;box-shadow:0 6px 20px rgba(0,0,0,.2)';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
  }

  function render() {
    var c = load();
    document.querySelectorAll('[data-cart-count]').forEach(function (el) { var n = count(c); el.textContent = n; el.hidden = n === 0; });
    var root = document.querySelector('[data-cart-root]');
    if (!root) return;
    getCatalog().then(function (cat) {
      c = c.filter(function (l) { return cat.products[l.slug]; });
      var lines = root.querySelector('[data-cart-lines]');
      root.querySelector('[data-cart-empty]').hidden = c.length > 0;
      root.querySelector('[data-cart-summary]').hidden = c.length === 0;
      lines.innerHTML = '';
      var subtotal = 0;
      c.forEach(function (l, i) {
        var p = cat.products[l.slug]; subtotal += p.price * l.qty;
        var li = document.createElement('li');
        li.innerHTML = '<img alt="" width="72" height="72">' +
          '<div><strong></strong><div class="muted small"></div></div>' +
          '<input type="number" min="1" max="10" aria-label="Aantal">' +
          '<button aria-label="Verwijderen">✕</button>';
        var im = p.image || ('/assets/products/' + l.slug + '.svg');
        li.querySelector('img').src = /^https?:/.test(im) ? im : B + im;
        li.querySelector('strong').textContent = p.name;
        li.querySelector('.small').textContent = (l.variant ? l.variant + ' · ' : '') + fmt.format(p.price);
        var inp = li.querySelector('input'); inp.value = l.qty;
        inp.onchange = function () { var cc = load(); cc[i].qty = Math.max(1, Math.min(10, parseInt(inp.value, 10) || 1)); save(cc); };
        li.querySelector('button').onclick = function () { var cc = load(); cc.splice(i, 1); save(cc); };
        lines.appendChild(li);
      });
      root.querySelector('[data-cart-subtotal]').textContent = fmt.format(subtotal);
      var ship = cat.shipping, left = ship.freeFrom - subtotal;
      root.querySelector('[data-cart-ship-note]').textContent = left > 0
        ? 'Nog ' + fmt.format(left) + ' tot gratis verzending (anders ' + fmt.format(ship.flatRate) + ').'
        : 'Je bestelling wordt gratis verzonden.';
    });
  }

  function checkout(lines, btn) {
    var err = document.querySelector('[data-checkout-error]');
    if (err) err.hidden = true;
    if (cfg.demo) {
      var msg = 'Dit is een demoversie: afrekenen is nog uitgeschakeld.';
      if (err) { err.textContent = msg; err.hidden = false; } else toast(msg);
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = 'Even geduld…'; }
    getCatalog().then(function () {
      var value = lines.reduce(function (s, l) { var p = catalog.products[l.slug]; return s + (p ? p.price * l.qty : 0); }, 0);
      window.track && window.track('begin_checkout', { currency: 'EUR', value: value, items: lines.map(function (l) { return gaItem(l.slug, l.qty, l.variant); }) });
      var ab = (document.cookie.match(/(?:^|; )ab_hero=([AB])/) || [])[1] || '';
      return fetch(B + '/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: lines, ab: ab }) });
    }).then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.url) throw new Error(j.error || 'Afrekenen mislukt'); location.href = j.url; }); })
      .catch(function (e) {
        if (btn) { btn.disabled = false; btn.textContent = 'Afrekenen'; }
        if (err) { err.textContent = e.message + '. Probeer het opnieuw of mail ons.'; err.hidden = false; } else alert(e.message);
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    var pdp = document.querySelector('[data-product]');
    if (pdp) {
      var info = JSON.parse(pdp.getAttribute('data-product'));
      window.track && window.track('view_item', { currency: 'EUR', value: info.price, items: [{ item_id: info.slug, item_name: info.name, item_category: info.category, price: info.price }] });
      var form = pdp.querySelector('[data-add-form]');
      var read = function () { var fd = new FormData(form); return { qty: Math.max(1, parseInt(fd.get('qty'), 10) || 1), variant: fd.get('variant') || '' }; };
      form.addEventListener('submit', function (e) { e.preventDefault(); var v = read(); add(info.slug, v.qty, v.variant); });
      var bn = pdp.querySelector('[data-buy-now]');
      if (bn) bn.onclick = function () { var v = read(); checkout([{ slug: info.slug, qty: v.qty, variant: v.variant }], bn); };
      var sticky = document.querySelector('[data-sticky-add]');
      if (sticky) sticky.onclick = function () { var v = read(); add(info.slug, v.qty, v.variant); };
    }
    document.querySelectorAll('[data-add-bundle]').forEach(function (b) {
      b.addEventListener('click', function () { JSON.parse(b.getAttribute('data-add-bundle')).forEach(function (s) { add(s, 1, ''); }); location.href = B + '/winkelmand/'; });
    });
    var co = document.querySelector('[data-checkout]');
    if (co) co.addEventListener('click', function () {
      var terms = document.querySelector('[data-terms]');
      if (terms && !terms.checked) { terms.focus(); terms.reportValidity && terms.reportValidity(); return; }
      checkout(load(), co);
    });
  });
})();

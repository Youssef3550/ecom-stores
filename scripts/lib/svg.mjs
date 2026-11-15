import { iconMarkup } from './icons.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const FONT = "Inter, 'DejaVu Sans', Arial, sans-serif";

// Greedy word wrap using an average glyph width estimate (good enough for headline layout).
export function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function textBlock(lines, x, y, size, weight, fill, lh = 1.15, anchor = 'start') {
  return lines.map((l, i) => `<text x="${x}" y="${y + i * size * lh}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(l)}</text>`).join('');
}

function icon(name, x, y, size, color, strokeW = 4) {
  const s = size / 100;
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">${iconMarkup(name)}</g>`;
}

// Square product mockup (used on product pages and cards). Clearly a branded illustration, not a photo.
export function productMockup(store, p, size = 800) {
  const { primary, accent, bg } = store.theme;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 800 800" role="img" aria-label="${esc(p.name)}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="${mix(bg, primary, 0.14)}"/></linearGradient></defs>
  <rect width="800" height="800" fill="url(#g)"/>
  <circle cx="400" cy="360" r="230" fill="${primary}" opacity="0.08"/>
  ${icon(p.icon, 210, 170, 380, primary, 3.2)}
  ${textBlock(wrap(p.name, 26), 400, 650, 40, 700, store.theme.text, 1.2, 'middle')}
  <text x="400" y="760" font-family="${FONT}" font-size="22" font-weight="600" fill="${accent === '#F4F1EA' ? primary : accent}" text-anchor="middle" letter-spacing="3">${esc(store.name.toUpperCase())}</text>
</svg>`;
}

// 1200×630 Open Graph / link-share image.
export function ogImage(store, title, sub, iconName) {
  const { primary, bg, text } = store.theme;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>
  <rect x="0" y="0" width="14" height="630" fill="${primary}"/>
  <circle cx="960" cy="315" r="230" fill="${primary}" opacity="0.09"/>
  ${icon(iconName, 790, 145, 340, primary, 3.2)}
  <text x="80" y="110" font-family="${FONT}" font-size="30" font-weight="700" fill="${primary}" letter-spacing="4">${esc(store.name.toUpperCase())}</text>
  ${textBlock(wrap(title, 22), 80, 230, 64, 800, text, 1.12)}
  ${textBlock(wrap(sub, 44), 80, 470, 28, 500, text, 1.35)}
</svg>`;
}

// Ad creative in 1080×1080, 1080×1920 or 1200×628.
export function adCreative(store, c, p) {
  const [w, h] = c.format.split('x').map(Number);
  const { primary, bg, text } = store.theme;
  const onPrimary = '#FFFFFF';
  const price = `€${p.price.toFixed(2).replace('.', ',')}`;
  const story = h > w * 1.5;
  const wide = w > h * 1.5;
  if (wide) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${bg}"/>
    <rect x="${w * 0.58}" y="0" width="${w * 0.42}" height="${h}" fill="${primary}"/>
    ${icon(p.icon, w * 0.62, h * 0.12, h * 0.76, onPrimary, 3.4)}
    <text x="64" y="96" font-family="${FONT}" font-size="26" font-weight="700" fill="${primary}" letter-spacing="4">${esc(store.name.toUpperCase())}</text>
    ${textBlock(wrap(c.headline, 20), 64, 200, 58, 800, text, 1.1)}
    ${textBlock(wrap(p.copy.tagline, 38), 64, 400, 28, 500, text, 1.3)}
    <rect x="64" y="${h - 132}" width="250" height="70" rx="35" fill="${primary}"/>
    <text x="189" y="${h - 86}" font-family="${FONT}" font-size="28" font-weight="700" fill="${onPrimary}" text-anchor="middle">${esc(c.cta)} · ${price}</text>
  </svg>`;
  }
  const iconSize = story ? w * 0.7 : w * 0.4;
  const iconY = story ? h * 0.3 : h * 0.27;
  const headY = story ? h * 0.13 : h * 0.13;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <circle cx="${w / 2}" cy="${iconY + iconSize / 2}" r="${iconSize * 0.62}" fill="${primary}" opacity="0.1"/>
  ${icon(p.icon, (w - iconSize) / 2, iconY, iconSize, primary, 3.2)}
  <text x="${w / 2}" y="${headY - 40}" font-family="${FONT}" font-size="28" font-weight="700" fill="${primary}" text-anchor="middle" letter-spacing="5">${esc(store.name.toUpperCase())}</text>
  ${textBlock(wrap(c.headline, story ? 18 : 24), w / 2, headY + 40, story ? 76 : 64, 800, text, 1.1, 'middle')}
  ${textBlock(wrap(p.copy.tagline, 34), w / 2, iconY + iconSize + (story ? 140 : 80), 32, 500, text, 1.3, 'middle')}
  <rect x="${w / 2 - 210}" y="${h - (story ? 300 : 150)}" width="420" height="84" rx="42" fill="${primary}"/>
  <text x="${w / 2}" y="${h - (story ? 300 : 150) + 54}" font-family="${FONT}" font-size="32" font-weight="700" fill="${onPrimary}" text-anchor="middle">${esc(c.cta)} · ${price}</text>
  ${story ? `<text x="${w / 2}" y="${h - 150}" font-family="${FONT}" font-size="26" fill="${text}" text-anchor="middle" opacity="0.7">${esc(store.usps[0])}</text>` : ''}
</svg>`;
}

export function favicon(store) {
  const letter = store.name.trim()[0].toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${store.theme.primary}"/><text x="32" y="44" font-family="${FONT}" font-size="36" font-weight="800" fill="#fff" text-anchor="middle">${esc(letter)}</text></svg>`;
}

function mix(a, b, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

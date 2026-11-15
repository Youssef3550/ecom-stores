import { readFileSync, existsSync } from 'node:fs';

export interface Faq { q: string; a: string }
export interface Product {
  slug: string; name: string; category: string; icon: string; price: number; keyword: string;
  variants?: { label: string; options: string[] };
  copy: { tagline: string; description: string; bullets: string[]; specs?: string[]; faq?: Faq[]; metaTitle: string; metaDescription: string };
  [k: string]: unknown;
}
export interface Store {
  id: string; name: string; domain: string; tagline: string; niche: string; language: string; currency: string;
  theme: { primary: string; accent: string; bg: string; text: string; font: string };
  shipping: { countries: string[]; flatRate: number; freeFrom: number; deliveryDays: string };
  company: { legalName: string; vat: string; address: string; email: string };
  analytics: { ga4: string; metaPixel: string };
  usps: string[];
  hero: Record<'A' | 'B', { headline: string; sub: string }>;
  featured: string[];
  bundles?: { name: string; items: string[]; discountPct: number }[];
}

const STORE = process.env.STORE as string;
const root = process.env.REPO_ROOT as string;
const read = (f: string) => JSON.parse(readFileSync(`${root}stores/${STORE}/${f}`, 'utf8'));

export const store: Store = read('store.json');
export const products: Product[] = read('products.json');

// Build-time overrides so tracking IDs can live in GitHub Variables instead of the repo.
store.analytics.ga4 = process.env.PUBLIC_GA4_ID || store.analytics.ga4;
store.analytics.metaPixel = process.env.PUBLIC_META_PIXEL_ID || store.analytics.metaPixel;

// Sub-path hosting (e.g. GitHub Pages: /ecom-stores/clinch). Empty on a custom domain.
export const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
export const u = (path: string) => `${BASE}${path}`;
export const DEMO = process.env.DEMO === 'true';

export const bySlug = (slug: string) => products.find((p) => p.slug === slug)!;
export const eur = (n: number) => new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(n);
export const productUrl = (p: Product) => u(`/producten/${p.slug}/`);
// Real photos in stores/<id>/images/<slug>.(webp|jpg|png) win over the generated mockup.
export const productImage = (p: Product) => {
  for (const ext of ['webp', 'jpg', 'png']) if (existsSync(`${root}stores/${STORE}/images/${p.slug}.${ext}`)) return u(`/assets/photos/${p.slug}.${ext}`);
  const photo = (p as any).photo;
  if (photo?.source === 'unsplash') return unsplash(photo.id, 900);
  return u(`/assets/products/${p.slug}.svg`);
};
export const unsplash = (id: string, w: number) => `https://images.unsplash.com/${id}?w=${w}&h=${w}&fit=crop&auto=format&q=70`;
export const productSrcset = (p: Product) => {
  const photo = (p as any).photo;
  return photo?.source === 'unsplash' ? `${unsplash(photo.id, 450)} 450w, ${unsplash(photo.id, 900)} 900w` : undefined;
};
export const usesStockPhotos = products.some((p) => (p as any).photo?.source === 'unsplash');

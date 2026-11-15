import type { APIRoute } from 'astro';
import { products, u } from '../lib/data';
import { legalPages } from '../lib/legal';

export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/producten/', ...products.map((p) => `/producten/${p.slug}/`), ...legalPages.map((p) => `/info/${p.slug}/`)];
  const today = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${new URL(u(p), site).href}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};

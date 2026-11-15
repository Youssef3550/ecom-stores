import type { APIRoute } from 'astro';
import { u } from '../lib/data';

export const GET: APIRoute = ({ site }) => {
  // Preview deployments (*.pages.dev) are blocked so only the production domain gets indexed.
  const body = process.env.PREVIEW === 'true'
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /winkelmand/\nDisallow: /bedankt/\nDisallow: /api/\n\nSitemap: ${new URL(u('/sitemap.xml'), site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};

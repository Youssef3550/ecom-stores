// Minimal ambient type for Cloudflare Pages Functions (wrangler strips types at bundle time).
// Install @cloudflare/workers-types for full typings if you want editor type-checking.
type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  params: Record<string, string>;
  waitUntil: (p: Promise<unknown>) => void;
  next: () => Promise<Response>;
}) => Response | Promise<Response>;

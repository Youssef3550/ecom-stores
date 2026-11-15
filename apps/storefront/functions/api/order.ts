// GET /api/order?session_id=cs_...  — minimal, non-personal order summary for the thank-you page
// so the purchase conversion (GA4 / Meta) carries the real, server-confirmed value.
import { stripe, json, type Env } from '../_lib/stripe';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const id = new URL(request.url).searchParams.get('session_id') ?? '';
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) return json({ error: 'invalid session' }, 400);
  try {
    const s = await stripe(env, 'GET', `/checkout/sessions/${id}?expand[]=line_items`);
    return json({
      id: s.id,
      paid: s.payment_status === 'paid',
      value: s.amount_total / 100,
      currency: String(s.currency).toUpperCase(),
      items: (s.line_items?.data ?? []).map((li: any) => ({ item_name: li.description, quantity: li.quantity, price: (li.price?.unit_amount ?? 0) / 100 })),
    });
  } catch {
    return json({ error: 'not found' }, 404);
  }
};

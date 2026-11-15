// POST /api/stripe-webhook — receives Stripe events. On a paid checkout it forwards a clean order payload
// to ORDER_WEBHOOK_URL (your automation that places the supplier order and emails the customer).
// Configure in Stripe → Developers → Webhooks: endpoint https://<domain>/api/stripe-webhook,
// events: checkout.session.completed, checkout.session.async_payment_succeeded, charge.refunded.
import { stripe, verifyStripeSignature, json, type Env } from '../_lib/stripe';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const payload = await request.text();
  const ok = await verifyStripeSignature(payload, request.headers.get('stripe-signature'), env.STRIPE_WEBHOOK_SECRET);
  if (!ok) return json({ error: 'invalid signature' }, 400);
  const event = JSON.parse(payload);

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const s = event.data.object;
    if (s.payment_status !== 'paid') return json({ received: true, pending: true });
    const items = await stripe(env, 'GET', `/checkout/sessions/${s.id}/line_items?limit=100&expand[]=data.price.product`);
    const order = {
      type: 'order.paid',
      store: s.metadata?.store,
      orderId: s.id,
      paymentIntent: s.payment_intent,
      createdAt: new Date(s.created * 1000).toISOString(),
      currency: s.currency,
      amountTotal: s.amount_total / 100,
      amountShipping: (s.shipping_cost?.amount_total ?? 0) / 100,
      abHero: s.metadata?.ab_hero,
      customer: { name: s.customer_details?.name, email: s.customer_details?.email, phone: s.customer_details?.phone },
      shippingAddress: s.collected_information?.shipping_details?.address ?? s.shipping_details?.address ?? s.customer_details?.address,
      items: items.data.map((li: any) => ({
        slug: li.price?.product?.metadata?.slug, variant: li.price?.product?.metadata?.variant || undefined,
        name: li.description, qty: li.quantity, unitPrice: (li.price?.unit_amount ?? 0) / 100,
      })),
    };
    await forward(env, order, event.id);
  } else if (event.type === 'charge.refunded') {
    const c = event.data.object;
    await forward(env, { type: 'order.refunded', paymentIntent: c.payment_intent, amountRefunded: c.amount_refunded / 100 }, event.id);
  }
  return json({ received: true });
};

async function forward(env: Env, body: unknown, eventId: string) {
  if (!env.ORDER_WEBHOOK_URL) { console.log('order_event (no ORDER_WEBHOOK_URL set)', JSON.stringify(body)); return; }
  const res = await fetch(env.ORDER_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': eventId, ...(env.ORDER_WEBHOOK_TOKEN ? { Authorization: `Bearer ${env.ORDER_WEBHOOK_TOKEN}` } : {}) },
    body: JSON.stringify(body),
  });
  // Non-2xx makes Stripe retry the webhook (with backoff, up to 3 days), so a temporary automation outage loses no orders.
  if (!res.ok) throw new Error(`order webhook ${res.status}`);
}

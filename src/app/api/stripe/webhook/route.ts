import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "missing_signature" }, { status: 400 });

  const body = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "invalid_signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as {
        client_reference_id?: string | null;
        customer?: string | null;
        subscription?: string | null;
        metadata?: Record<string, string> | null;
      };
      const userId = session.client_reference_id ?? session.metadata?.user_id;
      const orgId = session.metadata?.organization_id;
      // userId / orgId are now available to persist subscription state; the actual
      // write is intentionally left to the integrating team (per-seat vs flat,
      // multi-org, proration policy etc.).
      void userId;
      void orgId;
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
    case "invoice.payment_succeeded":
    case "invoice.payment_failed":
      // Subscription state changes — same correlation strategy via metadata.user_id /
      // metadata.organization_id (set on the subscription via subscription_data.metadata
      // in /api/stripe/checkout).
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

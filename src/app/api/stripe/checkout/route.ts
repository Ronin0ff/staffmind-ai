import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, PLANS, type PlanId } from "@/lib/stripe";
import { requireUser } from "@/lib/auth-guard";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  plan: z.enum(["start", "scale"]),
  seats: z.number().int().positive().optional(),
  organizationId: z.string().uuid().optional(),
});

export async function POST(req: Request) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const stripe = getStripe();
  const planKey = parsed.data.plan as PlanId;
  const priceId = process.env[PLANS[planKey].priceEnv];

  if (!stripe || !priceId) {
    return NextResponse.json({
      demo: true,
      message:
        "Stripe не настроен. Добавьте STRIPE_SECRET_KEY и STRIPE_PRICE_START / STRIPE_PRICE_SCALE.",
    });
  }

  // Fetch user email so the webhook can correlate completed sessions back to a user/org.
  let userEmail: string | undefined;
  if (!guard.demo) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    userEmail = data.user?.email ?? undefined;
  }

  // Prefer the trusted, server-side configured site URL to prevent attackers
  // from setting Origin: https://evil.com on the request and turning a Stripe
  // success_url into a phishing redirect.
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    req.headers.get("origin") ??
    "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: parsed.data.seats ?? 20,
      },
    ],
    success_url: `${origin}/billing?status=success`,
    cancel_url: `${origin}/billing?status=cancelled`,
    allow_promotion_codes: true,
    customer_email: userEmail,
    client_reference_id: guard.demo ? undefined : guard.userId,
    metadata: {
      plan: planKey,
      ...(guard.demo
        ? {}
        : {
            user_id: guard.userId,
            ...(parsed.data.organizationId
              ? { organization_id: parsed.data.organizationId }
              : {}),
          }),
    },
    subscription_data: {
      metadata: {
        plan: planKey,
        ...(guard.demo
          ? {}
          : {
              user_id: guard.userId,
              ...(parsed.data.organizationId
                ? { organization_id: parsed.data.organizationId }
                : {}),
            }),
      },
    },
  });

  return NextResponse.json({ url: session.url });
}

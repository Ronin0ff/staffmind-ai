import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, PLANS, type PlanId } from "@/lib/stripe";
import { requireUser } from "@/lib/auth-guard";

const schema = z.object({
  plan: z.enum(["start", "scale"]),
  seats: z.number().int().positive().optional(),
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

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

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
  });

  return NextResponse.json({ url: session.url });
}

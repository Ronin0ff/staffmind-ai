import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Guards an API route handler. Returns:
 *  - { ok: true, demo: true } when Supabase is not configured (local/demo mode).
 *  - { ok: true, demo: false, userId } when the request is authenticated.
 *  - A NextResponse with 401 when Supabase IS configured but no user is signed in.
 *
 * This avoids unauthenticated cost-incurring calls (OpenAI, Stripe) in production
 * while still allowing the app to run in demo mode without env vars.
 */
export async function requireUser() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { ok: true as const, demo: true as const };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  return { ok: true as const, demo: false as const, userId: user.id };
}

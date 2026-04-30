import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      // Most often: code already used, expired, or invalid. Send the user
      // back to /login with an error flag so they can retry instead of
      // bouncing through middleware to /login with no context.
      return NextResponse.redirect(`${origin}/login?error=code_exchange_failed`);
    }
  }

  // Only allow same-origin relative paths to avoid open-redirect attacks
  // (e.g. ?next=//evil.com or ?next=@evil.com).
  const safePath =
    next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\")
      ? next
      : "/dashboard";

  return NextResponse.redirect(`${origin}${safePath}`);
}

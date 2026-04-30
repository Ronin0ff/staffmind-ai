import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Only allow same-origin relative paths to avoid open-redirect attacks
  // (e.g. ?next=//evil.com or ?next=@evil.com).
  const safePath =
    next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\")
      ? next
      : "/dashboard";

  return NextResponse.redirect(`${origin}${safePath}`);
}

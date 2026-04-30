import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return supabaseResponse;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Apply all incoming cookie writes to the request first so subsequent
        // reads inside this middleware see the new values …
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        // … then mint a fresh response and write each cookie onto it. Critically
        // we do this once per setAll call, not once per cookie, so chunked
        // auth tokens (sb-…-auth-token.0/.1/.2) all survive.
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedPaths = [
    "/dashboard",
    "/pulse",
    "/analytics",
    "/settings",
    "/billing",
    "/onboarding",
    "/goals",
    "/hire",
  ];
  const needsAuth = protectedPaths.some((p) => request.nextUrl.pathname.startsWith(p));

  if (needsAuth && !user && process.env.NEXT_PUBLIC_REQUIRE_AUTH !== "false") {
    const redirect = request.nextUrl.clone();
    redirect.pathname = "/login";
    redirect.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirect);
  }

  return supabaseResponse;
}

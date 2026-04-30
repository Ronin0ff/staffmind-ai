import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    env: {
      supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      stripe: Boolean(process.env.STRIPE_SECRET_KEY),
      openai: Boolean(process.env.OPENAI_API_KEY),
    },
    time: new Date().toISOString(),
  });
}

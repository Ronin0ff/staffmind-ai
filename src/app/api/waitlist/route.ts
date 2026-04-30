import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  team: z.string().optional(),
  module: z.string().optional(),
  plan: z.string().optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = createClient();
      await supabase.from("waitlist").insert({
        email: parsed.data.email,
        name: parsed.data.name ?? null,
        team_size: parsed.data.team ?? null,
        module: parsed.data.module ?? null,
        plan: parsed.data.plan ?? null,
      });
    } catch {
      // table may not exist in dev — soft fail
    }
  }

  return NextResponse.json({ ok: true });
}

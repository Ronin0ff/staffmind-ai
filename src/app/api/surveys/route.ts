import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const createSchema = z.object({
  organization_id: z.string().uuid(),
  title: z.string().min(1),
  cadence: z.enum(["weekly", "biweekly", "monthly"]),
  channels: z.array(z.enum(["slack", "telegram", "email", "widget"])).min(1),
  questions: z
    .array(
      z.object({
        type: z.enum(["enps", "scale", "open"]),
        text: z.string().min(1),
      })
    )
    .min(1),
});

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ surveys: [], demo: true });
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("surveys")
    .select("id, title, cadence, channels, status, created_at")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ surveys: data });
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload", details: parsed.error.flatten() }, { status: 400 });
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = createClient();
  const { data: survey, error } = await supabase
    .from("surveys")
    .insert({
      organization_id: parsed.data.organization_id,
      title: parsed.data.title,
      cadence: parsed.data.cadence,
      channels: parsed.data.channels,
      status: "draft",
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (survey) {
    await supabase.from("questions").insert(
      parsed.data.questions.map((q, i) => ({
        survey_id: survey.id,
        type: q.type,
        text: q.text,
        position: i,
      }))
    );
  }

  return NextResponse.json({ survey });
}

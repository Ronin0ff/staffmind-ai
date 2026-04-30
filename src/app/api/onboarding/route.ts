import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  orgName: z.string().min(1),
  orgSize: z.string().optional(),
  seedEmails: z.string().optional(),
  template: z.string().optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data: org, error } = await supabase
    .from("organizations")
    .insert({
      name: parsed.data.orgName,
      size: parsed.data.orgSize ?? null,
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const emails = (parsed.data.seedEmails ?? "")
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter((s) => s.includes("@"));

  if (emails.length && org) {
    await supabase.from("employees").insert(
      emails.map((email) => ({
        organization_id: org.id,
        email,
      }))
    );
  }

  return NextResponse.json({ ok: true, organization_id: org?.id });
}

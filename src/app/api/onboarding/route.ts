import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth-guard";

const schema = z.object({
  orgName: z.string().min(1),
  orgSize: z.string().optional(),
  seedEmails: z.string().optional(),
  template: z.string().optional(),
});

export async function POST(req: Request) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (guard.demo) {
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = createClient();
  const { data: org, error } = await supabase
    .from("organizations")
    .insert({
      name: parsed.data.orgName,
      size: parsed.data.orgSize ?? null,
      owner_id: guard.userId,
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

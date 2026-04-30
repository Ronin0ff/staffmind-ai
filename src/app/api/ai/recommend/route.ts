import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAI, AI_MODEL } from "@/lib/openai";

const schema = z.object({
  organization: z.string(),
  signals: z.array(
    z.object({
      department: z.string(),
      enpsDelta: z.number(),
      negativeRate: z.number(),
      clusters: z.array(z.string()).optional(),
    })
  ),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const openai = getOpenAI();
  if (!openai) {
    const recs = parsed.data.signals.map((s, i) => ({
      id: `r${i}`,
      priority: s.enpsDelta < -10 || s.negativeRate > 35 ? "high" : "medium",
      title: `Действия в отделе ${s.department}`,
      body: `eNPS изменился на ${s.enpsDelta}. Доля негатива ${s.negativeRate}%.`,
      eta: s.enpsDelta < -10 ? "сегодня" : "до пятницы",
    }));
    return NextResponse.json({ recommendations: recs, demo: true });
  }

  const completion = await openai.chat.completions.create({
    model: AI_MODEL,
    response_format: { type: "json_object" },
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content:
          "You are a senior HR advisor. Given org-wide signals (department, enpsDelta, negativeRate, clusters), produce 3–6 concrete weekly actions. Each: id, priority (high/medium/low), title (concise, in Russian), body (1–2 sentences in Russian), eta (e.g., 'сегодня', 'до пятницы'). Return JSON: {\"recommendations\":[...]}",
      },
      { role: "user", content: JSON.stringify(parsed.data) },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  let parsedJson: { recommendations?: unknown[] } = {};
  try {
    parsedJson = JSON.parse(raw) as typeof parsedJson;
  } catch {
    parsedJson = {};
  }
  return NextResponse.json({ recommendations: parsedJson.recommendations ?? [] });
}

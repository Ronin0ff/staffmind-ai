import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAI, AI_MODEL } from "@/lib/openai";
import { requireUser } from "@/lib/auth-guard";

const schema = z.object({
  texts: z.array(z.string()).min(1).max(200),
});

export async function POST(req: Request) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const openai = getOpenAI();
  if (!openai) {
    // Demo fallback — naive lexicon scoring.
    const items = parsed.data.texts.map((t) => {
      const neg = /(плохо|устал|выгор|увол|зарплат|никто|надое|конфликт|стресс)/i.test(t);
      const pos = /(нравит|хорошо|рост|команд|горжусь|спасибо|интерес|развиваю)/i.test(t);
      const score = pos ? 0.7 : neg ? -0.7 : 0;
      return {
        text: t,
        sentiment: score > 0.2 ? "positive" : score < -0.2 ? "negative" : "neutral",
        score,
        clusters: neg ? ["burnout"] : pos ? ["growth"] : [],
      };
    });
    return NextResponse.json({ items, demo: true });
  }

  const completion = await openai.chat.completions.create({
    model: AI_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are an HR analyst. For each employee feedback item, classify sentiment (positive/neutral/negative), give a score from -1 to 1, and tag 0–3 clusters from this set: burnout, salary, management, growth, workload, recognition, team, process, other. Reply with strict JSON: {\"items\":[{\"sentiment\":\"...\",\"score\":0.0,\"clusters\":[\"...\"]}]}",
      },
      { role: "user", content: JSON.stringify({ texts: parsed.data.texts }) },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  let parsedJson: { items?: Array<Record<string, unknown>> } = {};
  try {
    parsedJson = JSON.parse(raw) as typeof parsedJson;
  } catch {
    parsedJson = {};
  }

  // Always emit one item per input text so callers can rely on a 1:1 mapping
  // even if GPT returns fewer/more items than requested.
  const items = parsed.data.texts.map((text, i) => {
    const it = parsedJson.items?.[i];
    return {
      text,
      sentiment: typeof it?.sentiment === "string" ? it.sentiment : "neutral",
      score: typeof it?.score === "number" ? it.score : 0,
      clusters: Array.isArray(it?.clusters) ? it.clusters : [],
    };
  });

  return NextResponse.json({ items });
}

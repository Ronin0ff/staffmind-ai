"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Brain, Check } from "lucide-react";

function WaitlistInner() {
  const params = useSearchParams();
  const plan = params.get("plan") ?? "scale";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen grid place-items-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 font-semibold mb-8 justify-center">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-brand">
            <Brain className="w-5 h-5 text-white" />
          </span>
          <span className="text-lg">
            StaffMind <span className="text-brand-400">AI</span>
          </span>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Записаться в waitlist</CardTitle>
            <CardDescription>
              Тариф «{plan === "scale" ? "Масштабирование" : plan}». Дадим Early Access и
              зафиксируем цену на 12 месяцев.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-emerald-300 text-sm flex items-center gap-2">
                <Check className="w-4 h-4" /> Готово! Спасибо, мы напишем при запуске.
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  try {
                    await fetch("/api/waitlist", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, name, team, plan }),
                    });
                    setSubmitted(true);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team">Размер команды</Label>
                  <Input
                    id="team"
                    placeholder="например, 80"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                  />
                </div>
                <Button className="w-full" size="lg" type="submit" disabled={loading}>
                  {loading ? "Отправляем…" : "В waitlist"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center text-muted-foreground">
          Loading…
        </div>
      }
    >
      <WaitlistInner />
    </Suspense>
  );
}

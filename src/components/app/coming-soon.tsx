"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check } from "lucide-react";

export function ComingSoon({
  title,
  description,
  features,
  module,
}: {
  title: string;
  description: string;
  features: string[];
  module: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container-page py-16 max-w-4xl">
      <div className="surface p-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-400" />
          <Badge>скоро</Badge>
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
          {title}
        </h1>
        <p className="mt-3 text-muted-foreground">{description}</p>

        <ul className="mt-8 grid sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <span className="grid place-items-center w-5 h-5 rounded-full bg-brand-500/15 border border-brand-500/30 mt-0.5 shrink-0">
                <Check className="w-3 h-3 text-brand-300" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Card className="mt-10">
          <CardContent className="p-6">
            {submitted ? (
              <div className="text-emerald-300 text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                Готово! Мы напишем вам, как только модуль будет доступен.
              </div>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  try {
                    await fetch("/api/waitlist", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, module }),
                    });
                    setSubmitted(true);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <div className="flex-1 space-y-2">
                  <Label htmlFor="ws-email">Email для уведомления</Label>
                  <Input
                    id="ws-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </div>
                <Button type="submit" size="lg" className="sm:self-end" disabled={loading}>
                  {loading ? "Подождите…" : "Записаться в waitlist"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

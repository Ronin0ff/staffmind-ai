"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { PLANS } from "@/lib/stripe";

export function Pricing() {
  const plans = Object.values(PLANS);
  return (
    <section id="pricing" className="py-20 lg:py-28 border-t border-white/5">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-sm text-brand-300 mb-3">Прозрачные тарифы</div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Платите только за активных сотрудников
          </h2>
          <p className="mt-4 text-muted-foreground">
            Без минимального чека, без скрытых модулей. 14 дней пилот — без карты.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={`h-full relative ${
                  p.id === "start" ? "border-brand-500/40 shadow-glow" : ""
                }`}
              >
                {p.id === "start" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Самый популярный</Badge>
                  </div>
                )}
                {"soon" in p && p.soon && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="warning">Скоро</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    {p.id === "scale" && <Sparkles className="w-4 h-4 text-brand-400" />}
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">${p.pricePerSeat}</span>
                    <span className="text-muted-foreground">/ чел / мес</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>

                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span className="grid place-items-center w-5 h-5 rounded-full bg-brand-500/15 border border-brand-500/30 mt-0.5 shrink-0">
                          <Check className="w-3 h-3 text-brand-300" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    {"soon" in p && p.soon ? (
                      <Button asChild variant="outline" className="w-full" size="lg">
                        <Link href="/waitlist?plan=scale">Записаться в waitlist</Link>
                      </Button>
                    ) : (
                      <Button asChild className="w-full" size="lg">
                        <Link href="/signup">{p.cta}</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Цена в долларах США без НДС. Оплата картой через Stripe или счётом для юрлиц.
        </p>
      </div>
    </section>
  );
}

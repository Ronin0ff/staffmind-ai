"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cases = [
  {
    quote:
      "Мы думали, у нас всё ок. StaffMind показал, что 40% лидов — в увольнение. Мы сохранили 3 ключевых сотрудников благодаря вовремя поднятой зарплате.",
    name: "Олег Гончаров",
    role: "CEO, CloudTech",
    initials: "ОГ",
    metric: "−38% текучести за полгода",
  },
  {
    quote:
      "Перестали тратить недели на «опросы для галочки». Дашборд индекса риска заменил нам и engagement-survey, и exit-интервью.",
    name: "Анна Лысенко",
    role: "CHRO, FinScale",
    initials: "АЛ",
    metric: "120 часов HR в месяц высвобождено",
  },
  {
    quote:
      "AI-рекомендации звучат как от живого консультанта, но появляются каждый понедельник. Это превратило наших мидл-менеджеров в людей-решателей.",
    name: "Кирилл Мартынов",
    role: "COO, RetailLab",
    initials: "КМ",
    metric: "eNPS +24 за квартал",
  },
];

export function Cases() {
  const [i, setI] = useState(0);
  const item = cases[i];
  return (
    <section id="cases" className="py-20 lg:py-28 border-t border-white/5">
      <div className="container-page">
        <div className="max-w-2xl">
          <div className="text-sm text-brand-300 mb-3">Социальное доказательство</div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Кейсы, в которых мы удержали ключевых
          </h2>
        </div>
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardContent className="p-8 lg:p-12">
            <Quote className="w-8 h-8 text-brand-400" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-5 text-xl md:text-2xl font-medium leading-snug text-gradient"
              >
                «{item.quote}»
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-8 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div className="grid place-items-center w-12 h-12 rounded-full bg-gradient-brand text-white font-semibold">
                  {item.initials}
                </div>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.role}</div>
                </div>
              </div>
              <div className="text-sm text-emerald-300 font-medium">{item.metric}</div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setI((i - 1 + cases.length) % cases.length)}
                  aria-label="Previous case"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setI((i + 1) % cases.length)}
                  aria-label="Next case"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

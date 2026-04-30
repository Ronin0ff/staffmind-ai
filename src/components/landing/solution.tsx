"use client";
import { motion } from "framer-motion";
import { MessageCircle, ListChecks, BrainCircuit, Gauge, ArrowRight } from "lucide-react";

const steps = [
  { icon: MessageCircle, label: "Мессенджер", sub: "Slack / Telegram" },
  { icon: ListChecks, label: "Короткий опрос", sub: "3 вопроса · 30 сек" },
  { icon: BrainCircuit, label: "ИИ-анализ", sub: "Тональность · аномалии" },
  { icon: Gauge, label: "Дашборд риска", sub: "Индекс ухода + рекомендации" },
];

export function Solution() {
  return (
    <section id="solution" className="py-20 lg:py-28 border-t border-white/5">
      <div className="container-page">
        <div className="max-w-2xl">
          <div className="text-sm text-brand-300 mb-3">Решение</div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            AI, который слышит неслышимое
          </h2>
          <p className="mt-4 text-muted-foreground">
            Один цикл — от&nbsp;вопроса в&nbsp;Slack до&nbsp;конкретной рекомендации
            «кому позвонить сегодня».
          </p>
        </div>

        <div className="mt-12 surface p-6 lg:p-10">
          <div className="grid lg:grid-cols-9 gap-3 items-stretch">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="contents">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="lg:col-span-2 surface p-5 hover:border-brand-500/30 transition-colors"
                  >
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 mb-3">
                      <Icon className="w-5 h-5 text-brand-300" />
                    </span>
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center text-muted-foreground/60">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Реальный пример из дашборда
              </h3>
              <p className="text-muted-foreground text-sm">
                После трёх пульс-опросов AI выделил аномалию в техподдержке:
                негативный кластер в открытых ответах + падение eNPS на 18 пунктов.
                Менеджер получил карточку с конкретной рекомендацией, не дожидаясь
                ежегодного опроса.
              </p>
            </div>
            <div className="surface p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                AI-инсайт
              </div>
              <div className="text-base font-medium mb-2">
                Отдел техподдержки: риск текучести{" "}
                <span className="text-rose-300">72%</span>.
              </div>
              <div className="text-sm text-muted-foreground">
                Кластер «выгорание» (12 упоминаний за 7 дней). Рекомендация:
                провести 1:1 с лидом отдела и пересмотреть SLA по&nbsp;ночным
                сменам.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

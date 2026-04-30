"use client";
import { motion } from "framer-motion";
import { PlugZap, Send, FileBarChart } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: PlugZap,
    title: "Подключите команду",
    body: "Slack, Telegram, Email или CSV-импорт. SCIM/SSO для крупных команд.",
  },
  {
    n: "02",
    icon: Send,
    title: "Запустите первый пульс",
    body: "60 секунд из библиотеки шаблонов: вовлечённость, выгорание, обратная связь.",
  },
  {
    n: "03",
    icon: FileBarChart,
    title: "Получите AI-отчёт",
    body: "Еженедельный дайджест: «кому позвонить сегодня» и почему.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 border-t border-white/5">
      <div className="container-page">
        <div className="max-w-2xl">
          <div className="text-sm text-brand-300 mb-3">3 шага до первых инсайтов</div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Как это работает
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="surface p-7 relative overflow-hidden hover:border-brand-500/30 transition-colors"
              >
                <div className="absolute -top-6 -right-6 text-[120px] font-bold leading-none text-white/[0.03]">
                  {s.n}
                </div>
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-brand mb-5 shadow-glow">
                  <Icon className="w-5 h-5 text-white" />
                </span>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

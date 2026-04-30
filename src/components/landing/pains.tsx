"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { UserMinus, MessageSquareOff, ClipboardX } from "lucide-react";

const pains = [
  {
    icon: UserMinus,
    title: "Ценный разработчик ушёл, а вы узнали из заявления.",
    body: "Тихий уход топ-перформера обходится в 6–9 месячных окладов и проседание команды на квартал.",
  },
  {
    icon: MessageSquareOff,
    title: "Отдел продаж деморализован, но об этом молчат.",
    body: "К моменту, когда падают цифры, лучшие уже общаются с рекрутерами. Вы реагируете последним.",
  },
  {
    icon: ClipboardX,
    title: "Опросы раз в год — бесполезная формальность.",
    body: "Годовой engagement-survey не ловит реальные сигналы. К следующему опросу проблема — уже история ухода.",
  },
];

export function Pains() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <div className="text-sm text-brand-300 mb-3">Знакомо?</div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Боли, которые тихо съедают компанию
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {pains.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full hover:border-brand-500/30 transition-colors group">
                  <CardContent className="p-7">
                    <span className="grid place-items-center w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-rose-300" />
                    </span>
                    <h3 className="text-base font-semibold leading-snug mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{p.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

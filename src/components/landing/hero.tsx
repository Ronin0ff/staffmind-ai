"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { DashboardPreview } from "./dashboard-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(20,184,166,0.12) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container-page grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-muted-foreground mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            HRTech на базе GPT-4o · Запуск за 10 минут
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            <span className="text-gradient">Перестаньте терять людей в&nbsp;тишине.</span>{" "}
            <span className="text-gradient-brand">StaffMind AI</span>{" "}
            <span className="text-gradient">
              предскажет увольнения до&nbsp;того, как сотрудник откроет дверь.
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Пульс-опросы, AI-анализ настроений и предиктивная текучесть для команд
            от&nbsp;20 до&nbsp;200&nbsp;человек. Запуск за 10&nbsp;минут.
            Без&nbsp;Excel и штрафов за упущенных звёзд.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="xl">
              <a href="#calculator">
                Провести бесплатный аудит текучести
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/signup">Попробовать 14 дней бесплатно</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SOC2-ready · Row Level Security
            </div>
            <div>Slack · Telegram · Email · API</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}

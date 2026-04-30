"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, TrendingDown, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export function Calculator() {
  const [employees, setEmployees] = useState(80);
  const [salary, setSalary] = useState(2500);
  const [turnover, setTurnover] = useState(22);
  const [hireCost, setHireCost] = useState(4500);

  const result = useMemo(() => {
    const leavers = (employees * turnover) / 100;
    const replacementCost = leavers * hireCost;
    const productivityLoss = leavers * salary * 3;
    const annualLoss = replacementCost + productivityLoss;
    const reductionPct = 27;
    const saved = annualLoss * (reductionPct / 100);
    const platformCost = employees * 3.5 * 12;
    const paybackMonths = platformCost > 0 ? Math.max(1, Math.round((platformCost / saved) * 12)) : 1;
    return {
      leavers,
      annualLoss,
      saved,
      reductionPct,
      paybackMonths,
      platformCost,
    };
  }, [employees, salary, turnover, hireCost]);

  return (
    <section id="calculator" className="py-20 lg:py-28 border-t border-white/5">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="text-sm text-brand-300 mb-3 inline-flex items-center gap-2">
              <CalcIcon className="w-4 h-4" /> Бесплатный аудит
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Сколько вам обходится тихая текучесть?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Введите 4 цифры — получите оценку годовых потерь и срок окупаемости
              StaffMind. Без регистрации.
            </p>

            <Card className="mt-8">
              <CardContent className="p-6 grid sm:grid-cols-2 gap-5">
                <Field
                  label="Сотрудников"
                  value={employees}
                  onChange={setEmployees}
                  min={5}
                  max={2000}
                  suffix="чел"
                />
                <Field
                  label="Средняя зарплата (мес)"
                  value={salary}
                  onChange={setSalary}
                  min={300}
                  max={20000}
                  suffix="$"
                />
                <Field
                  label="Годовая текучесть"
                  value={turnover}
                  onChange={setTurnover}
                  min={1}
                  max={80}
                  suffix="%"
                />
                <Field
                  label="Стоимость подбора 1 чел"
                  value={hireCost}
                  onChange={setHireCost}
                  min={500}
                  max={30000}
                  suffix="$"
                />
              </CardContent>
            </Card>
          </div>

          <motion.div
            key={`${employees}-${salary}-${turnover}-${hireCost}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="surface p-7 lg:p-9 lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2 text-rose-300 text-sm">
              <TrendingDown className="w-4 h-4" />
              Ежегодные потери от текучести
            </div>
            <div className="mt-2 text-5xl font-semibold tabular-nums text-gradient-brand">
              {formatCurrency(result.annualLoss)}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              ~{Math.round(result.leavers)} увольнений в год · потеря продуктивности
              + замещение
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <Stat
                label="StaffMind сэкономит"
                value={formatCurrency(result.saved)}
                hint={`сокращение потерь на ${result.reductionPct}%`}
                tone="emerald"
              />
              <Stat
                label="Стоимость платформы"
                value={formatCurrency(result.platformCost)}
                hint={`${employees} × $3.5 × 12 мес`}
                tone="brand"
              />
            </div>

            <div className="mt-5 surface p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Срок окупаемости</div>
                <div className="text-2xl font-semibold">
                  {result.paybackMonths > 12 ? "12+" : result.paybackMonths} мес
                </div>
              </div>
              <Button asChild size="lg">
                <Link href="/signup">
                  Попробовать 14 дней
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              Расчёт основан на индустриальных бенчмарках Gallup, SHRM и
              анонимизированных данных клиентов StaffMind. Точная экономия
              индивидуальна.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  suffix?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center justify-between">
        <span>{label}</span>
        <span className="text-foreground tabular-nums">
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </Label>
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-500"
      />
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "emerald" | "brand";
}) {
  return (
    <div className="surface p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={`mt-1 text-2xl font-semibold tabular-nums ${
          tone === "emerald" ? "text-emerald-300" : "text-brand-300"
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{hint}</div>
    </div>
  );
}

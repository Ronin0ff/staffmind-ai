"use client";
import { motion } from "framer-motion";
import { TrendingDown, AlertTriangle, Users } from "lucide-react";

export function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-full" aria-hidden />
      <div className="relative surface p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-muted-foreground">Индекс риска</div>
            <div className="text-sm font-medium">CloudTech · 78 чел.</div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live
          </div>
        </div>

        <div className="relative grid place-items-center py-6">
          <div className="absolute w-32 h-32 rounded-full bg-rose-500/20 animate-pulseRing" aria-hidden />
          <div className="relative w-32 h-32 rounded-full grid place-items-center bg-gradient-to-br from-rose-500/30 to-amber-500/20 border border-rose-400/40">
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-300">72%</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                риск ухода
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {[
            { dept: "Техподдержка", risk: 72, tone: "rose" as const },
            { dept: "Продажи", risk: 58, tone: "amber" as const },
            { dept: "Разработка", risk: 41, tone: "emerald" as const },
          ].map((row, i) => (
            <motion.div
              key={row.dept}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 text-sm"
            >
              <Users className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">{row.dept}</div>
              <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full ${
                    row.tone === "rose"
                      ? "bg-rose-400"
                      : row.tone === "amber"
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                  }`}
                  style={{ width: `${row.risk}%` }}
                />
              </div>
              <div className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                {row.risk}%
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-start gap-3 text-xs">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            </span>
            <div>
              <div className="text-foreground/90 font-medium">
                Привлеките внимание
              </div>
              <div className="text-muted-foreground">
                Иван Петров (Senior Dev) — 3 негативных пульса подряд.
                Рекомендуем 1:1 на этой неделе.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <TrendingDown className="w-3.5 h-3.5 text-rose-300" />
            eNPS −12 за 2 недели
          </div>
          <div className="text-brand-300">12 активных пульсов →</div>
        </div>
      </div>
    </div>
  );
}

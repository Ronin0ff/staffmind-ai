import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { TurnoverGauge } from "@/components/app/turnover-gauge";
import { EnpsChart } from "@/components/app/enps-chart";
import {
  aiRecommendations,
  enpsTrend,
  topRiskDepts,
  turnoverIndex,
} from "@/lib/mock-data";
import { ArrowDownRight, ArrowUpRight, Download, Sparkles, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container-page py-8 space-y-6">
      <PageHeader
        title="Дашборд"
        subtitle="Сводка по компании на эту неделю"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1.5" /> PDF-отчёт
            </Button>
            <Button size="sm">
              <Sparkles className="w-4 h-4 mr-1.5" /> Запустить AI-разбор
            </Button>
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Индекс текучести компании</CardTitle>
            <CardDescription>обновлено 5 минут назад</CardDescription>
          </CardHeader>
          <CardContent>
            <TurnoverGauge value={turnoverIndex} />
            <div className="mt-2 flex items-center justify-center gap-2 text-sm">
              <Badge variant="warning">+8 п.п. за месяц</Badge>
              <span className="text-muted-foreground">требует внимания</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Динамика eNPS</CardTitle>
              <CardDescription>последние 6 месяцев</CardDescription>
            </div>
            <Badge variant="danger">eNPS −12 за 2 недели</Badge>
          </CardHeader>
          <CardContent>
            <EnpsChart data={enpsTrend} />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Топ-3 отдела с риском</CardTitle>
            <CardDescription>по индексу ухода</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topRiskDepts.map((d) => {
              const tone = d.risk >= 65 ? "danger" : d.risk >= 45 ? "warning" : "success";
              return (
                <div key={d.name} className="surface p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{d.name}</span>
                      <span className="text-xs text-muted-foreground">· {d.headcount} чел</span>
                    </div>
                    <Badge variant={tone}>{d.risk}%</Badge>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full ${
                        tone === "danger"
                          ? "bg-rose-400"
                          : tone === "warning"
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                      }`}
                      style={{ width: `${d.risk}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    {d.trend === "up" ? (
                      <ArrowUpRight className="w-3.5 h-3.5 text-rose-300" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 text-emerald-300" />
                    )}
                    {d.trend === "up" ? "растёт" : "снижается"} за 2 недели
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Рекомендации AI на эту неделю</CardTitle>
              <CardDescription>сгенерированы GPT-4o-mini · обновлено 15 мин назад</CardDescription>
            </div>
            <Badge>
              <Sparkles className="w-3 h-3 mr-1" /> {aiRecommendations.length} действий
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiRecommendations.map((r) => (
              <div
                key={r.id}
                className="surface p-4 hover:border-brand-500/30 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`grid place-items-center w-8 h-8 rounded-lg shrink-0 ${
                      r.priority === "high"
                        ? "bg-rose-500/15 border border-rose-500/30"
                        : "bg-amber-500/15 border border-amber-500/30"
                    }`}
                  >
                    <Sparkles
                      className={`w-4 h-4 ${
                        r.priority === "high" ? "text-rose-300" : "text-amber-300"
                      }`}
                    />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-medium">{r.title}</div>
                      <Badge variant={r.priority === "high" ? "danger" : "warning"}>
                        {r.priority === "high" ? "высокий" : "средний"}
                      </Badge>
                      <Badge variant="secondary">{r.eta}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{r.body}</div>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0">
                    Принять
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

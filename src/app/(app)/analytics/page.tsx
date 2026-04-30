import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { sentimentHeatmap } from "@/lib/mock-data";
import { RiskTrendChart } from "@/components/app/risk-trend-chart";

export default function AnalyticsPage() {
  return (
    <div className="container-page py-8 space-y-6">
      <PageHeader
        title="AI-аналитика и прогнозирование"
        subtitle="Тепловая карта настроений, риски и аномалии"
        actions={
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-1.5" /> Скачать PDF для совета директоров
          </Button>
        }
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Тепловая карта настроений</CardTitle>
            <CardDescription>распределение по тональности · последние 30 дней</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {sentimentHeatmap.map((row) => (
              <div key={row.dept} className="flex items-center gap-3">
                <div className="w-32 text-sm">{row.dept}</div>
                <div className="flex-1 h-7 rounded-lg overflow-hidden flex border border-white/5">
                  <div
                    className="bg-emerald-500/70 grid place-items-center text-[10px] text-white font-medium"
                    style={{ width: `${row.positive}%` }}
                    title={`Positive ${row.positive}%`}
                  >
                    {row.positive}%
                  </div>
                  <div
                    className="bg-amber-500/60 grid place-items-center text-[10px] text-white"
                    style={{ width: `${row.neutral}%` }}
                  >
                    {row.neutral}%
                  </div>
                  <div
                    className="bg-rose-500/70 grid place-items-center text-[10px] text-white"
                    style={{ width: `${row.negative}%` }}
                  >
                    {row.negative}%
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/70" /> Positive
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/60" /> Neutral
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/70" /> Negative
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Риск ухода ключевых сотрудников</CardTitle>
            <CardDescription>динамика индивидуальных скорингов · 8 недель</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskTrendChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Тренды и аномалии</CardTitle>
          <CardDescription>
            Авто-детект резких изменений и негативных кластеров
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Anomaly
            tone="danger"
            title="Резкое падение eNPS в техподдержке"
            body="−18 пунктов за 2 недели. Кластер «выгорание» (12 упоминаний). Рекомендация: 1:1 с лидом + пересмотр SLA."
            tag="анома­лия"
          />
          <Anomaly
            tone="warning"
            title="Рост негатива в продажах"
            body="Доля негативных ответов выросла с 18% до 29%. Кластер «нет роста / зарплата»."
            tag="тренд"
          />
          <Anomaly
            tone="success"
            title="Маркетинг — рост вовлечённости"
            body="+11 пунктов eNPS после внедрения 1:1 с менеджером. Рекомендация: масштабировать практику."
            tag="позитив"
          />
        </CardContent>
      </Card>
    </div>
  );
}

function Anomaly({
  tone,
  title,
  body,
  tag,
}: {
  tone: "danger" | "warning" | "success";
  title: string;
  body: string;
  tag: string;
}) {
  const Icon = tone === "success" ? TrendingUp : tone === "warning" ? AlertTriangle : TrendingDown;
  return (
    <div className="surface p-4 flex items-start gap-3">
      <span
        className={`grid place-items-center w-9 h-9 rounded-lg shrink-0 ${
          tone === "danger"
            ? "bg-rose-500/15 border border-rose-500/30"
            : tone === "warning"
              ? "bg-amber-500/15 border border-amber-500/30"
              : "bg-emerald-500/15 border border-emerald-500/30"
        }`}
      >
        <Icon
          className={`w-4 h-4 ${
            tone === "danger" ? "text-rose-300" : tone === "warning" ? "text-amber-300" : "text-emerald-300"
          }`}
        />
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="font-medium">{title}</div>
          <Badge variant={tone}>{tag}</Badge>
        </div>
        <div className="text-sm text-muted-foreground mt-1">{body}</div>
      </div>
    </div>
  );
}

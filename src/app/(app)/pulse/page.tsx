import Link from "next/link";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Slack, Send, Mail, MessageCircle } from "lucide-react";
import { surveys, surveyTemplates } from "@/lib/mock-data";

const channelIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  slack: Slack,
  telegram: Send,
  email: Mail,
  widget: MessageCircle,
};

export default function PulsePage() {
  return (
    <div className="container-page py-8 space-y-6">
      <PageHeader
        title="Пульс-опросы"
        subtitle="Каденция, шаблоны и каналы доставки"
        actions={
          <Button asChild>
            <Link href="/pulse/new">
              <Plus className="w-4 h-4 mr-1.5" /> Новый опрос
            </Link>
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Активные и черновики</CardTitle>
          <CardDescription>Лог опросов с откликаемостью</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground border-b border-white/5">
                <tr>
                  <th className="text-left py-3 font-medium">Опрос</th>
                  <th className="text-left py-3 font-medium">Каденция</th>
                  <th className="text-left py-3 font-medium">Каналы</th>
                  <th className="text-left py-3 font-medium">Отклик</th>
                  <th className="text-left py-3 font-medium">Статус</th>
                  <th />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {surveys.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 pr-4">
                      <div className="font-medium">{s.title}</div>
                      <div className="text-xs text-muted-foreground">отправлен {s.lastSent}</div>
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">{s.cadence}</td>
                    <td className="py-4 pr-4">
                      <div className="flex gap-1.5">
                        {s.channels.map((c) => {
                          const Icon = channelIcon[c] ?? Mail;
                          return (
                            <span
                              key={c}
                              className="grid place-items-center w-7 h-7 rounded-md bg-white/5 border border-white/10"
                              title={c}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-brand"
                            style={{ width: `${s.responseRate}%` }}
                          />
                        </div>
                        <span className="tabular-nums text-xs">{s.responseRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge variant={s.status === "active" ? "success" : "secondary"}>
                        {s.status === "active" ? "активен" : "черновик"}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm">
                        Открыть
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Библиотека шаблонов</CardTitle>
          <CardDescription>Запустите первый пульс за 60 секунд</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {surveyTemplates.map((t) => (
            <div
              key={t.id}
              className="surface p-5 hover:border-brand-500/30 transition-colors flex flex-col"
            >
              <div className="font-medium">{t.name}</div>
              <p className="text-xs text-muted-foreground mt-1 flex-1">{t.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {t.questions} вопроса · ~{t.durationSec} сек
                </span>
              </div>
              <Button asChild size="sm" variant="outline" className="mt-3 w-full">
                <Link href={`/pulse/new?template=${t.id}`}>Использовать</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

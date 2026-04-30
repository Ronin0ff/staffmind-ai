import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Sparkles } from "lucide-react";
import { billingHistory } from "@/lib/mock-data";
import { PLANS } from "@/lib/stripe";
import { formatCurrency } from "@/lib/utils";
import { UpgradeButton } from "@/components/app/upgrade-button";

export default function BillingPage() {
  const seats = 78;
  const plan = PLANS.start;
  const monthly = seats * plan.pricePerSeat;

  return (
    <div className="container-page py-8 space-y-6">
      <PageHeader
        title="Биллинг и подписка"
        subtitle="Текущий тариф, активные сотрудники и счета"
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Текущий тариф</CardTitle>
            <CardDescription>оплата помесячно через Stripe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <Badge>активен</Badge>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {seats} активных сотрудников · ${plan.pricePerSeat}/чел
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold tabular-nums">
                  {formatCurrency(monthly)}
                </div>
                <div className="text-xs text-muted-foreground">в месяц</div>
              </div>
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <Stat label="Следующий платёж" value="01.05.2026" />
              <Stat label="Метод оплаты" value="Visa ···· 4242" />
              <Stat label="Налоговый статус" value="VAT exempt" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <UpgradeButton />
              <Button variant="outline">Сменить метод оплаты</Button>
              <Button variant="ghost" className="text-rose-300 hover:text-rose-200">
                Отменить подписку
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Апгрейд до Масштабирования</CardTitle>
            <CardDescription>модули Goals и Hire — скоро</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-brand-400" />
              ${PLANS.scale.pricePerSeat}/чел/мес
            </div>
            <p className="text-sm text-muted-foreground">
              Запишитесь сейчас — получите Early Access и зафиксированную цену на 12 месяцев.
            </p>
            <Button asChild className="w-full">
              <a href="/waitlist?plan=scale">Записаться в waitlist</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>История счетов</CardTitle>
            <CardDescription>скачайте PDF для бухгалтерии</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground border-b border-white/5">
                <tr>
                  <th className="text-left py-3 font-medium">Период</th>
                  <th className="text-left py-3 font-medium">Тариф</th>
                  <th className="text-left py-3 font-medium">Сумма</th>
                  <th className="text-left py-3 font-medium">Статус</th>
                  <th />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {billingHistory.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3">{b.date}</td>
                    <td className="py-3 text-muted-foreground">{b.plan}</td>
                    <td className="py-3 tabular-nums">{formatCurrency(b.amount)}</td>
                    <td className="py-3">
                      <Badge variant="success">оплачен</Badge>
                    </td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-1" /> PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-base font-medium mt-1">{value}</div>
    </div>
  );
}

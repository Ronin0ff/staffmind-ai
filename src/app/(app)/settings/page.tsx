"use client";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slack, Send, Mail, Plus, Shield } from "lucide-react";
import { toast } from "sonner";

const team = [
  { name: "Кирилл Старцев", email: "kirill@cloudtech.io", role: "Owner" },
  { name: "Анна Захарова", email: "anna@cloudtech.io", role: "Admin" },
  { name: "Олег Гончаров", email: "oleg@cloudtech.io", role: "Viewer" },
];

export default function SettingsPage() {
  return (
    <div className="container-page py-8 space-y-6">
      <PageHeader title="Настройки организации" subtitle="Доступы, интеграции и брендинг" />
      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">Команда и роли</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          <TabsTrigger value="branding">Брендинг</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Участники</CardTitle>
                <CardDescription>Owner / Admin / Viewer</CardDescription>
              </div>
              <Button size="sm" onClick={() => toast.success("Приглашение отправлено")}>
                <Plus className="w-4 h-4 mr-1" /> Пригласить
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-white/5">
                {team.map((m) => (
                  <div key={m.email} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid place-items-center w-9 h-9 rounded-full bg-gradient-brand text-white text-xs font-semibold">
                        {m.name
                          .split(" ")
                          .map((p) => p[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                    <Badge variant={m.role === "Owner" ? "default" : "secondary"}>{m.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <IntegrationCard
              icon={Slack}
              name="Slack"
              status="connected"
              description="Опросы и алерты в каналы и DM сотрудникам."
            />
            <IntegrationCard
              icon={Send}
              name="Telegram"
              status="disconnected"
              description="Бот для команд, использующих Telegram вместо Slack."
            />
            <IntegrationCard
              icon={Mail}
              name="Корпоративный SMTP"
              status="disconnected"
              description="Отправка опросов из вашего домена."
            />
            <IntegrationCard
              icon={Shield}
              name="SSO / SCIM (SAML)"
              status="locked"
              description="Доступно на Enterprise-плане."
            />
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Кастомизация бренда опросов</CardTitle>
              <CardDescription>Логотип и цвет кнопок в письмах и виджете</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Название бренда</Label>
                <Input defaultValue="CloudTech" />
              </div>
              <div className="space-y-2">
                <Label>Основной цвет</Label>
                <Input defaultValue="#14B8A6" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Подпись отправителя</Label>
                <Input defaultValue="HR-команда CloudTech" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <Button onClick={() => toast.success("Настройки сохранены")}>Сохранить</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IntegrationCard({
  icon: Icon,
  name,
  status,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  status: "connected" | "disconnected" | "locked";
  description: string;
}) {
  const variant = status === "connected" ? "success" : status === "locked" ? "warning" : "secondary";
  const label = status === "connected" ? "Подключено" : status === "locked" ? "Enterprise" : "Не подключено";
  return (
    <Card className="hover:border-brand-500/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10">
            <Icon className="w-5 h-5" />
          </span>
          <Badge variant={variant}>{label}</Badge>
        </div>
        <div className="mt-4">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground mt-1">{description}</div>
        </div>
        <Button
          size="sm"
          variant={status === "connected" ? "outline" : "default"}
          className="mt-4 w-full"
          disabled={status === "locked"}
        >
          {status === "connected" ? "Настроить" : status === "locked" ? "Связаться с продажами" : "Подключить"}
        </Button>
      </CardContent>
    </Card>
  );
}

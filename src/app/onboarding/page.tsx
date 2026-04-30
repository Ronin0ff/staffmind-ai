"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Building2, Users, ListChecks, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const totalSteps = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState("");
  const [orgSize, setOrgSize] = useState("20-50");
  const [seedEmails, setSeedEmails] = useState("");
  const [template, setTemplate] = useState("t-engagement");

  const next = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgName, orgSize, seedEmails, template }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Не удалось создать организацию");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Не удалось создать организацию";
      toast.error(msg);
      return;
    }
    toast.success("Готово! Добро пожаловать в StaffMind AI.");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-semibold mb-8 justify-center">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-brand">
            <Brain className="w-5 h-5 text-white" />
          </span>
          <span className="text-lg">
            StaffMind <span className="text-brand-400">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 justify-center mb-6 text-xs text-muted-foreground">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-10 rounded-full ${
                i + 1 <= step ? "bg-brand-500" : "bg-white/10"
              }`}
            />
          ))}
          <span>
            Шаг {step} из {totalSteps}
          </span>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            {step === 1 && (
              <Step
                icon={Building2}
                title="Создайте организацию"
                description="Это будет рабочее пространство вашей команды."
              >
                <div className="space-y-2">
                  <Label htmlFor="org">Название компании</Label>
                  <Input
                    id="org"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="CloudTech LLC"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Размер команды</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["20-50", "51-100", "101-200", "200+"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setOrgSize(s)}
                        className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                          orgSize === s
                            ? "border-brand-500/50 bg-brand-500/10 text-brand-200"
                            : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step
                icon={Users}
                title="Пригласите сотрудников"
                description="Через интеграцию или CSV. Можно пропустить и сделать позже."
              >
                <div className="space-y-2">
                  <Label htmlFor="emails">Email сотрудников (через запятую)</Label>
                  <Input
                    id="emails"
                    value={seedEmails}
                    onChange={(e) => setSeedEmails(e.target.value)}
                    placeholder="ivan@cloudtech.io, anna@cloudtech.io…"
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">Подключить Slack</Badge>
                  <Badge variant="secondary">Импорт CSV</Badge>
                  <Badge variant="secondary">SCIM (Enterprise)</Badge>
                </div>
              </Step>
            )}

            {step === 3 && (
              <Step
                icon={ListChecks}
                title="Выберите первый шаблон"
                description="Запустим опрос сразу после создания аккаунта."
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: "t-engagement", name: "Вовлечённость (eNPS)", q: "3 вопроса · 30 сек" },
                    { id: "t-burnout", name: "Удалёнка и выгорание", q: "5 вопросов · 60 сек" },
                    { id: "t-process", name: "Обратная связь по процессам", q: "4 вопроса · 45 сек" },
                    { id: "t-1on1", name: "Качество 1:1", q: "4 вопроса · 45 сек" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTemplate(t.id)}
                      className={`text-left surface p-4 transition-colors ${
                        template === t.id ? "border-brand-500/50" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">{t.name}</div>
                        {template === t.id && (
                          <span className="grid place-items-center w-5 h-5 rounded-full bg-brand-500">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{t.q}</div>
                    </button>
                  ))}
                </div>
              </Step>
            )}

            <div className="flex items-center justify-between pt-4">
              <Button
                variant="ghost"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                Назад
              </Button>
              <Button onClick={next} size="lg">
                {step === totalSteps ? "Перейти в дашборд" : "Дальше"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Step({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-brand shadow-glow">
          <Icon className="w-5 h-5 text-white" />
        </span>
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, GripVertical, Save, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type QType = "enps" | "scale" | "open";
type Question = { id: string; type: QType; text: string };

const cadences = [
  { id: "weekly", label: "Еженедельно" },
  { id: "biweekly", label: "Раз в 2 недели" },
  { id: "monthly", label: "Ежемесячно" },
];
const channels = [
  { id: "slack", label: "Slack" },
  { id: "telegram", label: "Telegram" },
  { id: "email", label: "Email" },
  { id: "widget", label: "Веб-виджет" },
];

export default function NewPulsePage() {
  const [title, setTitle] = useState("Еженедельный пульс");
  const [questions, setQuestions] = useState<Question[]>([
    { id: "q1", type: "enps", text: "С какой вероятностью вы порекомендуете компанию другу?" },
    { id: "q2", type: "scale", text: "Насколько вам комфортно работать на этой неделе?" },
    { id: "q3", type: "open", text: "Что бы вы изменили в своей работе?" },
  ]);
  const [cadence, setCadence] = useState("weekly");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["slack", "email"]);

  const add = (type: QType) => {
    setQuestions((q) => [
      ...q,
      { id: `q${Date.now()}`, type, text: "Новый вопрос" },
    ]);
  };
  const remove = (id: string) => setQuestions((q) => q.filter((x) => x.id !== id));
  const update = (id: string, text: string) =>
    setQuestions((q) => q.map((x) => (x.id === id ? { ...x, text } : x)));

  const toggleChannel = (id: string) =>
    setSelectedChannels((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : [...c, id]
    );

  return (
    <div className="container-page py-8 space-y-6">
      <PageHeader
        title="Новый пульс-опрос"
        subtitle="Конструктор · 30 секунд для сотрудника"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => toast.success("Черновик сохранён")}>
              <Save className="w-4 h-4 mr-1.5" /> Сохранить
            </Button>
            <Button size="sm" onClick={() => toast.success("Опрос запланирован к отправке")}>
              <Send className="w-4 h-4 mr-1.5" /> Запустить
            </Button>
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Вопросы</CardTitle>
            <CardDescription>Перетаскивайте, редактируйте, добавляйте.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label>Название опроса</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-3 pt-3">
              {questions.map((q, i) => (
                <div key={q.id} className="surface p-4 flex items-start gap-3 group">
                  <GripVertical className="w-4 h-4 text-muted-foreground mt-2 cursor-grab opacity-50 group-hover:opacity-100" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">#{i + 1}</Badge>
                      <Badge>
                        {q.type === "enps" ? "eNPS 0–10" : q.type === "scale" ? "Шкала 1–5" : "Открытый"}
                      </Badge>
                    </div>
                    <Textarea
                      value={q.text}
                      onChange={(e) => update(q.id, e.target.value)}
                      rows={2}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(q.id)}
                    aria-label="Remove question"
                  >
                    <Trash2 className="w-4 h-4 text-rose-300" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => add("enps")}>
                <Plus className="w-4 h-4 mr-1" /> eNPS
              </Button>
              <Button variant="outline" size="sm" onClick={() => add("scale")}>
                <Plus className="w-4 h-4 mr-1" /> Шкала 1–5
              </Button>
              <Button variant="outline" size="sm" onClick={() => add("open")}>
                <Plus className="w-4 h-4 mr-1" /> Открытый
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Каденция</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={cadence} onValueChange={setCadence}>
                <TabsList className="w-full">
                  {cadences.map((c) => (
                    <TabsTrigger key={c.id} value={c.id} className="flex-1">
                      {c.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {cadences.map((c) => (
                  <TabsContent key={c.id} value={c.id}>
                    <p className="text-xs text-muted-foreground">
                      Опрос будет уходить {c.label.toLowerCase()} в{" "}
                      <strong className="text-foreground">понедельник 10:00</strong> по
                      часовому поясу сотрудника.
                    </p>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Каналы доставки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {channels.map((c) => {
                const active = selectedChannels.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleChannel(c.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors ${
                      active
                        ? "border-brand-500/40 bg-brand-500/10 text-brand-200"
                        : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                        active ? "bg-brand-500" : "bg-white/15"
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                          active ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

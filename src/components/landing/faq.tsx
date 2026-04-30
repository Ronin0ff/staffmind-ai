"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Сколько занимает запуск?",
    a: "Подключение Slack/Telegram + импорт сотрудников из CSV или интеграции — 10 минут. Первый пульс уйдёт в команду в тот же день.",
  },
  {
    q: "Это безопасно? Где хранятся данные?",
    a: "PostgreSQL на инфраструктуре Supabase EU/US, Row Level Security, шифрование в покое и в транзите. Соответствие GDPR. SOC2-ready (отчёт под NDA).",
  },
  {
    q: "Сотрудники видят, кто что ответил?",
    a: "Нет. Ответы агрегируются по отделам и анонимизируются. Менеджер видит индекс риска отдела и AI-инсайты, но не персональные ответы.",
  },
  {
    q: "Что делает AI-анализ?",
    a: "GPT-4o-mini классифицирует тональность открытых ответов, ищет аномалии и кластеры (выгорание, зарплата, менеджмент) и формирует приоритетный список действий на неделю.",
  },
  {
    q: "Можно ли отказаться в любой момент?",
    a: "Да. Подписка помесячная, без штрафов. Все данные можно экспортировать в CSV/PDF одним кликом.",
  },
  {
    q: "Поддерживаете ли русский язык?",
    a: "Да. Интерфейс, опросы и AI-анализ работают на русском, английском и украинском.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28 border-t border-white/5">
      <div className="container-page max-w-3xl">
        <div className="text-sm text-brand-300 mb-3">FAQ</div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
          Часто задаваемые вопросы
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

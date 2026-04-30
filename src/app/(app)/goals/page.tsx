import { ComingSoon } from "@/components/app/coming-soon";

export default function GoalsPage() {
  return (
    <ComingSoon
      module="goals"
      title="Goals & KPI · скоро"
      description="Табличный трекер OKR с AI-декомпозицией: команда видит цели в одном месте, а GPT помогает разбивать их на квартальные ключевые результаты и связывать с пульс-опросами."
      features={[
        "Дерево OKR: компания → отдел → сотрудник",
        "AI-декомпозиция целей в KR за 30 секунд",
        "Связь с пульс-опросами и индексом риска",
        "Quarterly review и автоотчёты для совета",
        "Интеграции с Jira / Linear / Notion",
        "Экспорт в PDF и CSV",
      ]}
    />
  );
}

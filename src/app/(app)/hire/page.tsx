import { ComingSoon } from "@/components/app/coming-soon";

export default function HirePage() {
  return (
    <ComingSoon
      module="hire"
      title="Smart Hire · скоро"
      description="Дашборд воронки найма и AI-генератор тестовых заданий: вы видите узкие места найма и получаете ранжированный список кандидатов с автоматически сгенерированными релевантными тестовыми."
      features={[
        "Воронка найма по позициям и рекрутерам",
        "AI-генератор тестовых заданий под роль и стек",
        "Скоринг кандидатов по описанию вакансии",
        "ATS-интеграции (Greenhouse, Huntflow)",
        "Time-to-hire и стоимость подбора в реальном времени",
        "Predictive offer acceptance",
      ]}
    />
  );
}

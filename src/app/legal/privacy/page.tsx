import Link from "next/link";

export const metadata = { title: "Политика конфиденциальности · StaffMind AI" };

export default function PrivacyPage() {
  return (
    <article className="container-page py-16 max-w-3xl prose prose-invert prose-headings:tracking-tight">
      <Link href="/" className="text-sm text-brand-300 hover:text-brand-200">
        ← На главную
      </Link>
      <h1 className="text-3xl font-semibold mt-4 mb-6">Политика конфиденциальности</h1>
      <p className="text-muted-foreground">
        StaffMind AI («мы», «нас») серьёзно относится к защите данных сотрудников
        и компаний-клиентов. Этот документ описывает, какие данные мы собираем,
        как обрабатываем и какие права есть у пользователей.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-3">Какие данные мы собираем</h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>Email и имя ответственного за организацию.</li>
        <li>Email и опционально отдел / роль сотрудников, проходящих опросы.</li>
        <li>Анонимизированные ответы на пульс-опросы.</li>
        <li>Метаданные использования продукта (для надёжности и улучшений).</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-3">Где хранятся данные</h2>
      <p className="text-muted-foreground">
        PostgreSQL на инфраструктуре Supabase (EU/US, на выбор клиента),
        шифрование в покое (AES-256) и в транзите (TLS 1.3). Доступ к данным
        ограничен Row Level Security.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-3">AI-обработка</h2>
      <p className="text-muted-foreground">
        Открытые ответы передаются в OpenAI API исключительно для классификации
        тональности и кластеризации. Мы не используем данные клиентов для
        обучения публичных моделей. Мы используем тарифы OpenAI с отказом от
        обучения (zero-data-retention при возможности).
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-3">Ваши права (GDPR / ФЗ-152)</h2>
      <p className="text-muted-foreground">
        Вы имеете право запросить доступ, исправление и удаление своих данных.
        Напишите нам на{" "}
        <a className="text-brand-300" href="mailto:privacy@staffmind.ai">
          privacy@staffmind.ai
        </a>
        .
      </p>
    </article>
  );
}

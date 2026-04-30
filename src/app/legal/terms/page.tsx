import Link from "next/link";

export const metadata = { title: "Условия использования · StaffMind AI" };

export default function TermsPage() {
  return (
    <article className="container-page py-16 max-w-3xl prose prose-invert">
      <Link href="/" className="text-sm text-brand-300 hover:text-brand-200">
        ← На главную
      </Link>
      <h1 className="text-3xl font-semibold mt-4 mb-6">Условия использования</h1>
      <p className="text-muted-foreground">
        Используя StaffMind AI, вы соглашаетесь с настоящими условиями. Сервис
        предоставляется «как есть», подписка помесячная, без штрафов за отмену.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-3">Подписка и оплата</h2>
      <p className="text-muted-foreground">
        Тарифы рассчитываются по количеству активных сотрудников за прошедший
        календарный месяц. Оплата картой через Stripe или банковским счётом.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-3">Ограничения</h2>
      <p className="text-muted-foreground">
        Запрещено использовать платформу для шпионажа за сотрудниками,
        деанонимизации ответов или иной деятельности, нарушающей трудовое право
        страны клиента.
      </p>
    </article>
  );
}

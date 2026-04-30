# StaffMind AI

> HRTech SaaS-платформа: пульс-опросы, AI-анализ настроений и предиктивная
> текучесть для команд от 20 до 200 человек.

## Стек

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + кастомные shadcn/ui-совместимые компоненты на Radix UI
- **Framer Motion** — микроанимации
- **Recharts** — графики (eNPS, риск ухода, тренды)
- **Supabase** — PostgreSQL + Auth + Edge-готовая архитектура с Row Level Security
- **Stripe** — Checkout + Webhooks для подписок
- **OpenAI** (`gpt-4o-mini`) — анализ тональности и AI-рекомендации
- **Vercel** — деплой одной командой

## Структура

```
src/
├── app/
│   ├── (app)/                 # защищённый кабинет
│   │   ├── dashboard/         # главный дашборд + AI-рекомендации
│   │   ├── pulse/             # конструктор и библиотека опросов
│   │   ├── analytics/         # тепловая карта, риски, аномалии
│   │   ├── settings/          # роли, интеграции, брендинг
│   │   ├── billing/           # подписка, история счетов
│   │   ├── goals/             # модуль Goals (waitlist)
│   │   └── hire/              # модуль Smart Hire (waitlist)
│   ├── (auth)/                # login / signup
│   ├── auth/callback/         # OAuth-возврат
│   ├── onboarding/            # 3-шаговый мастер
│   ├── waitlist/              # форма для будущих модулей
│   ├── legal/                 # privacy + terms
│   └── api/                   # API-роуты (Stripe, AI, surveys, waitlist)
├── components/
│   ├── landing/               # секции лендинга
│   ├── app/                   # сайдбар, виджеты, графики
│   └── ui/                    # переиспользуемые примитивы
├── lib/
│   ├── supabase/              # клиенты (browser/server/middleware)
│   ├── stripe.ts              # план-тарифы и Stripe SDK
│   ├── openai.ts              # обёртка SDK OpenAI
│   └── mock-data.ts           # сид-данные для демо
└── middleware.ts              # auth-guard для защищённых маршрутов
supabase/
└── migrations/0001_init.sql   # схема БД + RLS
```

## Локальный запуск

```bash
pnpm install
cp .env.example .env.local
# заполните NEXT_PUBLIC_SUPABASE_URL / OPENAI_API_KEY / STRIPE_* при необходимости
pnpm dev
```

Откройте http://localhost:3000.

> **Demo-режим.** Если Supabase / Stripe / OpenAI не настроены, лендинг и
> кабинет работают полностью на сид-данных (`src/lib/mock-data.ts`). API
> возвращают `{ demo: true }` вместо ошибок.
> Установите `NEXT_PUBLIC_REQUIRE_AUTH=false`, чтобы открывать `/dashboard`
> напрямую (используется для публичного превью).

## Supabase

1. Создайте проект на https://supabase.com.
2. В **SQL Editor** выполните `supabase/migrations/0001_init.sql`.
3. Скопируйте `Project URL` и `anon` ключ в `.env.local`.
4. Включите провайдеров в **Authentication → Providers** (Email, Google).
5. RLS включён по умолчанию — данные одной организации недоступны другой.

## Stripe

1. Создайте 2 продукта на https://dashboard.stripe.com:
   - **Старт** — рекуррентный, $3.5 / seat / month
   - **Масштабирование** — $7.5 / seat / month
2. Скопируйте Price IDs в `STRIPE_PRICE_START` и `STRIPE_PRICE_SCALE`.
3. Настройте webhook на `https://<your-domain>/api/stripe/webhook`,
   подпишитесь на `checkout.session.completed` и `customer.subscription.*`.
4. Положите `whsec_…` в `STRIPE_WEBHOOK_SECRET`.

## Деплой на Vercel

```bash
pnpm dlx vercel link
pnpm dlx vercel env pull .env.local   # подтянуть production-переменные
pnpm dlx vercel deploy --prod
```

Или нажмите кнопку Deploy на главной странице репо после настройки переменных
окружения в Vercel Dashboard.

## Скрипты

| Команда            | Что делает                          |
| ------------------ | ----------------------------------- |
| `pnpm dev`         | Запуск dev-сервера                  |
| `pnpm build`       | Production-сборка                   |
| `pnpm start`       | Запуск production-сервера           |
| `pnpm lint`        | ESLint                              |
| `pnpm typecheck`   | `tsc --noEmit`                      |

## Roadmap

- ✅ MVP: лендинг, кабинет, пульс-опросы, AI-аналитика, биллинг
- 🚧 Goals & KPI — табличный OKR-трекер с AI-декомпозицией
- 🚧 Smart Hire — воронка найма + AI-генератор тестовых
- 🚧 Slack/Telegram-боты как отдельные edge-functions
- 🚧 PDF-отчёт для совета директоров (Puppeteer + Vercel function)

## Лицензия

© 2026 StaffMind AI. Все права защищены.

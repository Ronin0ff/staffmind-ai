import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export const PLANS = {
  start: {
    id: "start",
    name: "Старт",
    pricePerSeat: 3.5,
    description: "Пульс-опросы, AI-анализ настроений, дашборд риска текучести.",
    features: [
      "Пульс-опросы (Slack/Telegram/Email)",
      "Библиотека шаблонов",
      "AI-анализ тональности",
      "Дашборд индекса текучести",
      "Еженедельный AI-отчёт",
    ],
    cta: "Начать бесплатный пилот",
    priceEnv: "STRIPE_PRICE_START",
  },
  scale: {
    id: "scale",
    name: "Масштабирование",
    pricePerSeat: 7.5,
    description: "Всё из «Старта» + модули Goals & KPI и Smart Hire (скоро).",
    features: [
      "Всё из «Старта»",
      "Модуль Goals & KPI (скоро)",
      "Модуль Smart Hire (скоро)",
      "Приоритетная поддержка",
      "SSO / SCIM",
    ],
    cta: "Записаться в waitlist",
    priceEnv: "STRIPE_PRICE_SCALE",
    soon: true,
  },
} as const;

export type PlanId = keyof typeof PLANS;

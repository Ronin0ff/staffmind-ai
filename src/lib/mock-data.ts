export const turnoverIndex = 64;

export const topRiskDepts = [
  { name: "Техподдержка", risk: 72, trend: "up" as const, headcount: 14 },
  { name: "Продажи", risk: 58, trend: "up" as const, headcount: 22 },
  { name: "Разработка", risk: 41, trend: "down" as const, headcount: 28 },
];

export const enpsTrend = [
  { month: "Янв", enps: 18, responses: 56 },
  { month: "Фев", enps: 22, responses: 61 },
  { month: "Мар", enps: 14, responses: 58 },
  { month: "Апр", enps: 9, responses: 64 },
  { month: "Май", enps: 4, responses: 72 },
  { month: "Июн", enps: -2, responses: 70 },
];

export const aiRecommendations = [
  {
    id: "rec-1",
    priority: "high" as const,
    title: "Провести 1:1 с Иваном Петровым (Senior Dev)",
    body: "3 негативных пульса подряд, упоминание перегрузки. Срочный риск ухода.",
    eta: "сегодня",
  },
  {
    id: "rec-2",
    priority: "high" as const,
    title: "Запустить опрос по карьерным ожиданиям в Sales",
    body: "Кластер «нет роста» вырос на 35% за неделю. Шаблон готов — 60 секунд.",
    eta: "до пятницы",
  },
  {
    id: "rec-3",
    priority: "medium" as const,
    title: "Пересмотреть SLA по ночным сменам в техподдержке",
    body: "12 упоминаний выгорания. Лид отдела согласен — нужна ваша поддержка.",
    eta: "на след. неделе",
  },
];

export const sentimentHeatmap = [
  { dept: "Разработка", positive: 62, neutral: 25, negative: 13 },
  { dept: "Продажи", positive: 41, neutral: 30, negative: 29 },
  { dept: "Техподдержка", positive: 28, neutral: 31, negative: 41 },
  { dept: "Маркетинг", positive: 71, neutral: 22, negative: 7 },
  { dept: "HR", positive: 65, neutral: 28, negative: 7 },
  { dept: "Финансы", positive: 58, neutral: 32, negative: 10 },
];

export const surveys = [
  {
    id: "s-1",
    title: "Еженедельный пульс — общий",
    cadence: "Еженедельно · Пн 10:00",
    channels: ["slack", "email"],
    status: "active" as const,
    responseRate: 78,
    lastSent: "вчера",
  },
  {
    id: "s-2",
    title: "Удалёнка и выгорание",
    cadence: "Раз в 2 недели",
    channels: ["telegram"],
    status: "active" as const,
    responseRate: 64,
    lastSent: "5 дней назад",
  },
  {
    id: "s-3",
    title: "Onboarding feedback (30 дней)",
    cadence: "Триггер · 30 день",
    channels: ["email"],
    status: "draft" as const,
    responseRate: 0,
    lastSent: "—",
  },
];

export const surveyTemplates = [
  {
    id: "t-engagement",
    name: "Вовлечённость (eNPS)",
    description: "Классический eNPS + 2 вопроса по факторам вовлечённости.",
    questions: 3,
    durationSec: 30,
  },
  {
    id: "t-burnout",
    name: "Удалёнка и выгорание",
    description: "Маркеры выгорания, баланс работа/жизнь, нагрузка.",
    questions: 5,
    durationSec: 60,
  },
  {
    id: "t-process",
    name: "Обратная связь по процессам",
    description: "Что мешает работать, что помогает, что улучшить.",
    questions: 4,
    durationSec: 45,
  },
  {
    id: "t-1on1",
    name: "Качество 1:1 с менеджером",
    description: "Регулярность, полезность, психологическая безопасность.",
    questions: 4,
    durationSec: 45,
  },
];

export const billingHistory = [
  { id: "inv-2026-04", date: "01.04.2026", plan: "Старт · 78 seats", amount: 273, status: "paid" as const },
  { id: "inv-2026-03", date: "01.03.2026", plan: "Старт · 76 seats", amount: 266, status: "paid" as const },
  { id: "inv-2026-02", date: "01.02.2026", plan: "Старт · 74 seats", amount: 259, status: "paid" as const },
];

import Link from "next/link";
import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-14">
      <div className="container-page grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-brand">
              <Brain className="w-5 h-5 text-white" />
            </span>
            <span className="text-lg">
              StaffMind <span className="text-brand-400">AI</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            HRTech-платформа, которая слышит неслышимое. AI-анализ настроений и
            предсказание текучести для команд 20–200 человек.
          </p>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Продукт</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#solution" className="hover:text-foreground">Решение</a></li>
            <li><a href="#pricing" className="hover:text-foreground">Тарифы</a></li>
            <li><a href="#cases" className="hover:text-foreground">Кейсы</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Компания</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/legal/privacy" className="hover:text-foreground">Политика конфиденциальности</Link></li>
            <li><Link href="/legal/terms" className="hover:text-foreground">Условия использования</Link></li>
            <li><a href="mailto:hello@staffmind.ai" className="hover:text-foreground">hello@staffmind.ai</a></li>
            <li><Link href="/login" className="hover:text-foreground">Вход для клиентов</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-page mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} StaffMind AI. Все права защищены.</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Все системы работают
        </div>
      </div>
    </footer>
  );
}

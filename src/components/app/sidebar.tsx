"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  LineChart,
  Settings,
  CreditCard,
  Target,
  UserPlus,
  Brain,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const nav = [
  { href: "/dashboard", label: "Дашборд", icon: LayoutDashboard },
  { href: "/pulse", label: "Пульс-опросы", icon: Activity },
  { href: "/analytics", label: "Аналитика", icon: LineChart },
  { href: "/goals", label: "Goals & KPI", icon: Target, soon: true },
  { href: "/hire", label: "Smart Hire", icon: UserPlus, soon: true },
  { href: "/settings", label: "Настройки", icon: Settings },
  { href: "/billing", label: "Биллинг", icon: CreditCard },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/5 bg-card/40 backdrop-blur-xl">
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold px-6 h-16 border-b border-white/5">
        <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-brand">
          <Brain className="w-4 h-4 text-white" />
        </span>
        <span>
          StaffMind <span className="text-brand-400">AI</span>
        </span>
      </Link>
      <nav className="flex-1 px-3 py-4 space-y-0.5 text-sm">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                active
                  ? "bg-brand-500/15 text-brand-200 border border-brand-500/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1">{item.label}</span>
              {item.soon && <Badge variant="secondary" className="text-[10px] px-1.5">скоро</Badge>}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 surface p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="w-4 h-4 text-brand-400" />
          AI-кредиты
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          1 240 / 5 000 в этом месяце
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[24.8%] bg-gradient-brand" />
        </div>
      </div>
    </aside>
  );
}

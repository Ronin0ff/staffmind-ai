"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 backdrop-blur-xl bg-background/60">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-brand shadow-glow">
            <Brain className="w-5 h-5 text-white" />
          </span>
          <span className="text-lg">
            StaffMind <span className="text-brand-400">AI</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#solution" className="hover:text-foreground transition-colors">
            Решение
          </a>
          <a href="#calculator" className="hover:text-foreground transition-colors">
            Калькулятор
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            Тарифы
          </a>
          <a href="#cases" className="hover:text-foreground transition-colors">
            Кейсы
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Войти</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Бесплатный пилот</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

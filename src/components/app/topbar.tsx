"use client";
import { Bell, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AppTopbar({ org = "CloudTech" }: { org?: string }) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="h-full flex items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <div className="grid place-items-center w-9 h-9 rounded-xl bg-brand-500/15 border border-brand-500/30 text-brand-200 font-semibold text-sm">
            {org.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-medium">{org}</div>
            <div className="text-xs text-muted-foreground">Owner · Pro plan</div>
          </div>
        </div>
        <div className="hidden md:block flex-1 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск по сотрудникам, опросам, отделам…" className="pl-10" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/pulse/new">
              <Plus className="w-4 h-4 mr-1" />
              Новый пульс
            </Link>
          </Button>
          <Button variant="outline" size="icon" aria-label="Notifications">
            <Bell className="w-4 h-4" />
          </Button>
          <div className="grid place-items-center w-9 h-9 rounded-full bg-gradient-brand text-white text-sm font-semibold">
            КС
          </div>
        </div>
      </div>
    </header>
  );
}

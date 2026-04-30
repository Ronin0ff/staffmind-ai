"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Вход выполнен");
      router.push("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Ошибка входа";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback?next=/dashboard` },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вход в StaffMind AI</CardTitle>
        <CardDescription>Используйте email или Google-аккаунт</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" onClick={onGoogle}>
          Продолжить с Google
        </Button>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex-1 h-px bg-white/10" />
          <span>или</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Входим…" : "Войти"}
          </Button>
        </form>
        <p className="mt-5 text-sm text-muted-foreground text-center">
          Нет аккаунта?{" "}
          <Link href="/signup" className="text-brand-300 hover:text-brand-200">
            Создать бесплатно
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

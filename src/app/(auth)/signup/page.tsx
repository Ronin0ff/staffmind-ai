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

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${location.origin}/auth/callback?next=/onboarding`,
        },
      });
      if (error) throw error;
      // When Supabase has "Confirm email" enabled (default), signUp returns
      // error: null but session: null until the user clicks the email link.
      // We must NOT navigate to /onboarding in that case — /api/onboarding
      // would 401 because there is no authenticated user yet.
      if (data.session) {
        toast.success("Аккаунт создан.");
        router.push("/onboarding");
      } else {
        setPendingConfirmation(true);
        toast.success("Письмо для подтверждения отправлено на " + email);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Ошибка регистрации";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (pendingConfirmation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Проверьте почту</CardTitle>
          <CardDescription>
            Мы отправили письмо со ссылкой для подтверждения на{" "}
            <span className="text-foreground">{email}</span>. Перейдите по ссылке —
            и продолжим онбординг.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Не пришло за 5 минут? Проверьте спам или{" "}
            <button
              type="button"
              className="text-brand-300 hover:text-brand-200 underline"
              onClick={() => setPendingConfirmation(false)}
            >
              отправить ещё раз
            </button>
            .
          </p>
          <p className="mt-6 text-sm text-muted-foreground text-center">
            Уже подтвердили?{" "}
            <Link href="/login" className="text-brand-300 hover:text-brand-200">
              Войти
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>14 дней бесплатно</CardTitle>
        <CardDescription>Без карты. Полный доступ ко всем функциям «Старта».</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Рабочий email</Label>
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Создаём…" : "Создать аккаунт"}
          </Button>
        </form>
        <p className="mt-5 text-xs text-center text-muted-foreground">
          Регистрируясь, вы соглашаетесь с{" "}
          <Link href="/legal/terms" className="underline hover:text-foreground">
            условиями
          </Link>{" "}
          и{" "}
          <Link href="/legal/privacy" className="underline hover:text-foreground">
            политикой
          </Link>
          .
        </p>
        <p className="mt-3 text-sm text-muted-foreground text-center">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-brand-300 hover:text-brand-200">
            Войти
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

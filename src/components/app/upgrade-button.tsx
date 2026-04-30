"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function UpgradeButton() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/stripe/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plan: "scale" }),
          });
          if (!res.ok) throw new Error("checkout failed");
          const data = (await res.json()) as { url?: string; demo?: boolean };
          if (data.demo) {
            toast.info("Stripe не настроен — это демо. Добавьте STRIPE_SECRET_KEY и STRIPE_PRICE_SCALE в .env.local.");
          } else if (data.url) {
            window.location.href = data.url;
          }
        } catch {
          toast.error("Не удалось создать сессию Checkout");
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? "Подождите…" : "Перейти на Масштабирование"}
    </Button>
  );
}

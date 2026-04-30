import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "StaffMind AI — предскажет увольнения до того, как сотрудник откроет дверь",
  description:
    "Пульс-опросы, AI-анализ настроений и предиктивная текучесть для команд от 20 до 200 человек. Запуск за 10 минут.",
  metadataBase: new URL("https://staffmind.ai"),
  openGraph: {
    title: "StaffMind AI",
    description:
      "AI, который слышит неслышимое: пульс-опросы, анализ тональности, дашборд риска текучести.",
    url: "https://staffmind.ai",
    siteName: "StaffMind AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(222 47% 9%)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
            },
          }}
        />
      </body>
    </html>
  );
}

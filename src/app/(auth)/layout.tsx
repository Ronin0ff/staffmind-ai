import Link from "next/link";
import { Brain } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 font-semibold mb-8 justify-center">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-brand">
            <Brain className="w-5 h-5 text-white" />
          </span>
          <span className="text-lg">
            StaffMind <span className="text-brand-400">AI</span>
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
}

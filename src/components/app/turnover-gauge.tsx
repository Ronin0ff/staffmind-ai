"use client";
import { motion } from "framer-motion";
import { clamp } from "@/lib/utils";

export function TurnoverGauge({ value }: { value: number }) {
  const v = clamp(value, 0, 100);
  // Half-circle gauge from -90deg to 90deg
  const angle = -90 + (v / 100) * 180;
  const tone = v < 35 ? "low" : v < 65 ? "mid" : "high";
  const color =
    tone === "low" ? "#34d399" : tone === "mid" ? "#fbbf24" : "#fb7185";

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <svg viewBox="0 0 200 120" className="w-full">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="251"
          strokeDashoffset={251 - (v / 100) * 251}
        />
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="32"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          style={{ transformOrigin: "100px 100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        />
        <circle cx="100" cy="100" r="6" fill="white" />
      </svg>
      <div className="text-center -mt-4">
        <div className="text-5xl font-semibold tabular-nums" style={{ color }}>
          {v}%
        </div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
          Индекс риска текучести
        </div>
      </div>
    </div>
  );
}

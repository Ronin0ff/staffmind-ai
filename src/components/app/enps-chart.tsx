"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function EnpsChart({ data }: { data: { month: string; enps: number }[] }) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
          <defs>
            <linearGradient id="enpsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              fontSize: 12,
            }}
            labelStyle={{ color: "rgba(255,255,255,0.7)" }}
          />
          <Area
            type="monotone"
            dataKey="enps"
            stroke="#2DD4BF"
            strokeWidth={2.5}
            fill="url(#enpsGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

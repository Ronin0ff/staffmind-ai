"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const data = [
  { week: "W1", "Иван П.": 22, "Мария С.": 18, "Олег Р.": 12 },
  { week: "W2", "Иван П.": 28, "Мария С.": 24, "Олег Р.": 15 },
  { week: "W3", "Иван П.": 35, "Мария С.": 30, "Олег Р.": 18 },
  { week: "W4", "Иван П.": 44, "Мария С.": 32, "Олег Р.": 22 },
  { week: "W5", "Иван П.": 56, "Мария С.": 38, "Олег Р.": 26 },
  { week: "W6", "Иван П.": 65, "Мария С.": 42, "Олег Р.": 28 },
  { week: "W7", "Иван П.": 71, "Мария С.": 48, "Олег Р.": 32 },
  { week: "W8", "Иван П.": 78, "Мария С.": 52, "Олег Р.": 35 },
];

const colors: Record<string, string> = {
  "Иван П.": "#fb7185",
  "Мария С.": "#fbbf24",
  "Олег Р.": "#2dd4bf",
};

export function RiskTrendChart() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="week" stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {Object.keys(colors).map((k) => (
            <Line
              key={k}
              type="monotone"
              dataKey={k}
              stroke={colors[k]}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

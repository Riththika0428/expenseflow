"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { formatCurrency } from "@/lib/formatCurrency";

const monthlyData = [
  { month: "Jun", income: 120000, expenses: 65000 },
  { month: "Jul", income: 145000, expenses: 72000 },
  { month: "Aug", income: 135000, expenses: 68000 },
  { month: "Sep", income: 160000, expenses: 85000 },
  { month: "Oct", income: 150000, expenses: 65000 },
  { month: "Nov", income: 175000, expenses: 78000 },
];

export default function MonthlyOverviewChart() {
  return (
    <div className="rounded-2xl border border-[var(--border)]
      bg-[var(--surface)] p-5 shadow-sm">

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          Income vs Expenses
        </h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Your monthly financial activity
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            barGap={8}
          >
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-secondary)", fontSize: 11 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />

            <Legend />

            <Bar
              dataKey="income"
              name="Income"
              fill="#16A36A"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#E05252"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
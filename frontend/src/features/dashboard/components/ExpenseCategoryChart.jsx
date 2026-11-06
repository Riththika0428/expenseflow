"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { formatCurrency } from "@/lib/formatCurrency";

const categoryData = [
  { name: "Food", value: 18000, color: "#5145CD" },
  { name: "Transport", value: 12000, color: "#16A36A" },
  { name: "Shopping", value: 15000, color: "#E9A23B" },
  { name: "Education", value: 10000, color: "#3978D5" },
  { name: "Entertainment", value: 6000, color: "#E05252" },
  { name: "Other", value: 4000, color: "#9299A8" },
];

export default function ExpenseCategoryChart() {
  const totalExpenses = categoryData.reduce(
    (total, category) => total + category.value,
    0
  );

  return (
    <div className="rounded-2xl border border-[var(--border)]
      bg-[var(--surface)] p-5 shadow-sm">

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          Expense Breakdown
        </h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Spending by category
        </p>
      </div>

      <div className="relative h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              stroke="none"
            >
              {categoryData.map((category) => (
                <Cell
                  key={category.name}
                  fill={category.color}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex
          flex-col items-center justify-center">
          <span className="text-xs text-[var(--text-secondary)]">
            Total Expenses
          </span>
          <span className="mt-1 text-lg font-bold text-[var(--foreground)]">
            {formatCurrency(totalExpenses)}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {categoryData.map((category) => (
          <div key={category.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: category.color }}
            />

            <div className="min-w-0">
              <p className="truncate text-xs text-[var(--text-secondary)]">
                {category.name}
              </p>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {formatCurrency(category.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
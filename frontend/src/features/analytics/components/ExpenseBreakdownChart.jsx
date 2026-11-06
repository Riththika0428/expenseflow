"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { formatCurrency } from "@/lib/formatCurrency";

export default function ExpenseBreakdownChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Expense Breakdown
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Spending by category
        </p>
      </div>

      <div className="relative h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Total Expenses
          </span>

          <span className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {data.map((item) => {
          const percentage =
            total > 0 ? (item.value / total) * 100 : 0;

          return (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span className="truncate text-sm text-gray-600 dark:text-gray-300">
                  {item.name}
                </span>
              </div>

              <span className="shrink-0 text-sm font-medium text-gray-900 dark:text-white">
                {percentage.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
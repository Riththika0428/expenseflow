"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { formatCurrency } from "@/lib/formatCurrency";

export default function SpendingTrendChart({ data }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Spending Trend
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your monthly expense changes.
        </p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E8EAF0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9299A8", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9299A8", fontSize: 11 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
            />

            <Line
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#5145CD"
              strokeWidth={3}
              dot={{ r: 4, fill: "#5145CD" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Percent,
} from "lucide-react";

import { formatCurrency } from "@/lib/formatCurrency";

export default function AnalyticsStats({ data }) {
  const savingsRate =
    data.income > 0
      ? (data.savings / data.income) * 100
      : 0;

  const stats = [
    {
      title: "Total Income",
      value: formatCurrency(data.income),
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(data.expenses),
      icon: TrendingDown,
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-500/10",
    },
    {
      title: "Net Savings",
      value: formatCurrency(data.savings),
      icon: PiggyBank,
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      icon: Percent,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>

              <div className={`rounded-xl p-2.5 ${stat.bg}`}>
                <Icon size={20} className={stat.color} />
              </div>
            </div>

            <h2 className="mt-4 break-words text-xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
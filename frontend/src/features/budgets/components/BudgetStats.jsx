import {
  Wallet,
  Receipt,
  PiggyBank,
  ChartNoAxesCombined,
} from "lucide-react";

import { formatCurrency } from "@/lib/formatCurrency";

export default function BudgetStats({ budgets }) {
  const totalBudget = budgets.reduce(
    (sum, budget) => sum + budget.limit,
    0
  );

  const totalSpent = budgets.reduce(
    (sum, budget) => sum + budget.spent,
    0
  );

  const remaining = totalBudget - totalSpent;

  const usage = totalBudget > 0
    ? (totalSpent / totalBudget) * 100
    : 0;

  const stats = [
    {
      title: "Total Budget",
      value: formatCurrency(totalBudget),
      icon: Wallet,
      color: "text-indigo-600",
      background: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
      title: "Total Spent",
      value: formatCurrency(totalSpent),
      icon: Receipt,
      color: "text-red-600",
      background: "bg-red-50 dark:bg-red-500/10",
    },
    {
      title: "Remaining",
      value: formatCurrency(remaining),
      icon: PiggyBank,
      color: remaining < 0 ? "text-red-600" : "text-emerald-600",
      background: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      title: "Budget Used",
      value: `${usage.toFixed(1)}%`,
      icon: ChartNoAxesCombined,
      color: "text-blue-600",
      background: "bg-blue-50 dark:bg-blue-500/10",
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

              <div className={`rounded-xl p-2.5 ${stat.background}`}>
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
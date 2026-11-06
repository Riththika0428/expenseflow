import {
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
} from "lucide-react";

import { formatCurrency } from "@/lib/formatCurrency";

export default function TransactionStats({ transactions }) {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const stats = [
    {
      title: "Total Income",
      amount: income,
      icon: TrendingUp,
      color: "text-emerald-600",
      background: "bg-emerald-50",
    },
    {
      title: "Total Expenses",
      amount: expenses,
      icon: TrendingDown,
      color: "text-red-600",
      background: "bg-red-50",
    },
    {
      title: "Net Balance",
      amount: income - expenses,
      icon: ArrowLeftRight,
      color: "text-indigo-600",
      background: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-[var(--border)]
              bg-[var(--surface)] p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--text-secondary)]">
                {stat.title}
              </p>

              <div className={`rounded-xl p-2.5 ${stat.background} ${stat.color}`}>
                <Icon size={20} />
              </div>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-[var(--foreground)]">
              {formatCurrency(stat.amount)}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
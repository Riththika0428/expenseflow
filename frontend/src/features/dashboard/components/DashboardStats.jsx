
"use client";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

import StatCard from "@/components/shared/StatCard";
import { formatCurrency } from "@/lib/formatCurrency";

const dashboardData = {
  totalIncome: 150000,
  totalExpenses: 65000,
  remainingBalance: 85000,
  monthlySavings: 45000,
};

export default function DashboardStats() {
  const stats = [
    {
      title: "Total Income",
      amount: dashboardData.totalIncome,
      icon: TrendingUp,
      iconColor: "text-emerald-600",
      iconBackground: "bg-emerald-50",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Total Expenses",
      amount: dashboardData.totalExpenses,
      icon: TrendingDown,
      iconColor: "text-red-600",
      iconBackground: "bg-red-50",
      change: "+5.2%",
      trend: "down",
    },
    {
      title: "Remaining Balance",
      amount: dashboardData.remainingBalance,
      icon: Wallet,
      iconColor: "text-indigo-600",
      iconBackground: "bg-indigo-50",
      change: "+8.4%",
      trend: "up",
    },
    {
      title: "Monthly Savings",
      amount: dashboardData.monthlySavings,
      icon: PiggyBank,
      iconColor: "text-amber-600",
      iconBackground: "bg-amber-50",
      change: "+10.2%",
      trend: "up",
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Financial Overview
        </h2>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Your financial summary for this month.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
            formatValue={formatCurrency}
          />
        ))}
      </div>
    </section>
  );
}

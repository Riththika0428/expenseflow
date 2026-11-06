"use client";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  CalendarDays,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/shared/StatCard";
import { formatCurrency } from "@/lib/formatCurrency";
import MonthlyOverviewChart from "@/features/dashboard/components/MonthlyOverviewChart";
import ExpenseCategoryChart from "@/features/dashboard/components/ExpenseCategoryChart";
import RecentTransactions from "@/features/dashboard/components/RecentTransactions";

// Temporary sample data
const dashboardData = {
  totalIncome: 150000,
  totalExpenses: 65000,
  remainingBalance: 85000,
  monthlySavings: 45000,
};

export default function DashboardPage() {
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
    <DashboardLayout>
      <div className="space-y-8">

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Welcome back! Here's your financial overview.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-xl border
              border-[var(--border)] bg-[var(--surface)] px-4 py-2.5
              text-sm font-medium text-[var(--foreground)]">
              <CalendarDays size={17} />
              This Month
            </button>

            <button className="flex items-center gap-2 rounded-xl
              bg-[#5145CD] px-4 py-2.5 text-sm font-semibold text-white
              transition hover:bg-[#4035B5]">
              <Plus size={18} />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Financial Overview
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Your financial summary for this month.
            </p>
          </div>

          {/* Charts Section */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <MonthlyOverviewChart />
             <ExpenseCategoryChart />
           </section>

           {/* Recent Transactions Section */}
          <section>
        <RecentTransactions />
         </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2
            xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                {...stat}
                formatValue={formatCurrency}
              />
            ))}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}

import {
  Plus,
  CalendarDays,
} from "lucide-react";

import DashboardStats from "@/features/dashboard/components/DashboardStats";
import MonthlyOverviewChart from "@/features/dashboard/components/MonthlyOverviewChart";
import ExpenseCategoryChart from "@/features/dashboard/components/ExpenseCategoryChart";
import RecentTransactions from "@/features/dashboard/components/RecentTransactions";

// Opt out of instant-navigation validation for this route.
export const instant = false;

export default function DashboardPage() {
  return (
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
          <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)]">
            <CalendarDays size={17} />
            This Month
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#5145CD] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4035B5]">
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <DashboardStats />

      {/* Charts */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <MonthlyOverviewChart />
        <ExpenseCategoryChart />
      </section>

      {/* Recent Transactions */}
      <section>
        <RecentTransactions />
      </section>

    </div>
  );
}

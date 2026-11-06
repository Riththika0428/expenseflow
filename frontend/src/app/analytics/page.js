"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

import { analyticsData } from "@/features/analytics/components/analyticsData";
import AnalyticsStats from "@/features/analytics/components/AnalyticsStats";
import AnalyticsFilters from "@/features/analytics/components/AnalyticsFilters";
import IncomeExpenseChart from "@/features/analytics/components/IncomeExpenseChart";
import ExpenseBreakdownChart from "@/features/analytics/components/ExpenseBreakdownChart";
import SpendingTrendChart from "@/features/analytics/components/SpendingTrendChart";
import TopCategories from "@/features/analytics/components/TopCategories";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("6");

  const monthlyData = useMemo(() => {
    return analyticsData.monthlyComparison.slice(-Number(period));
  }, [period]);

  const trendData = useMemo(() => {
    return analyticsData.spendingTrend.slice(-Number(period));
  }, [period]);

  const filteredIncome = monthlyData.reduce(
    (sum, item) => sum + item.income,
    0
  );

  const filteredExpenses = monthlyData.reduce(
    (sum, item) => sum + item.expenses,
    0
  );

  const overview = {
    income: filteredIncome,
    expenses: filteredExpenses,
    savings: filteredIncome - filteredExpenses,
  };

  return (
    <DashboardLayout>
      <div className="space-y-7">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Understand your financial habits and spending patterns.
          </p>
        </div>

        {/* Filters */}
        <AnalyticsFilters
          period={period}
          setPeriod={setPeriod}
        />

        {/* Summary */}
        <AnalyticsStats data={overview} />

        {/* Income vs Expenses */}
        <IncomeExpenseChart data={monthlyData} />

        {/* Expense Breakdown and Top Categories */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <ExpenseBreakdownChart
            data={analyticsData.expenseBreakdown}
          />

          <TopCategories
            data={analyticsData.expenseBreakdown}
          />
        </div>

        {/* Spending Trend */}
        <SpendingTrendChart data={trendData} />
      </div>
    </DashboardLayout>
  );
}